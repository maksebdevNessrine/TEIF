/**
 * Puppeteer singleton instance manager for efficient PDF generation
 * Reuses browser instance across requests to avoid launch overhead
 */
import puppeteer from 'puppeteer';
let browserInstance = null;
let pagePool = [];
const MAX_CONCURRENT_PAGES = 5;
/**
 * Launch or retrieve existing browser instance
 */
export async function getBrowser() {
    if (browserInstance) {
        return browserInstance;
    }
    try {
        browserInstance = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage', // Overcome limited resource problems
                '--disable-gpu',
            ],
        });
        console.log('[Puppeteer] Browser instance launched');
        // Set up crash handling
        browserInstance.on('disconnected', () => {
            console.warn('[Puppeteer] Browser disconnected, will relaunch on next use');
            browserInstance = null;
            pagePool = [];
        });
        return browserInstance;
    }
    catch (error) {
        console.error('[Puppeteer] Failed to launch browser:', error);
        throw error;
    }
}
/**
 * Get or create a new page from pool
 */
export async function getPage() {
    const browser = await getBrowser();
    // Reuse page from pool if available
    if (pagePool.length > 0) {
        return pagePool.pop();
    }
    // If pool full, wait for page to be available
    if (pagePool.length >= MAX_CONCURRENT_PAGES) {
        // Wait a bit and retry
        await new Promise((resolve) => setTimeout(resolve, 100));
        return getPage();
    }
    try {
        const page = await browser.newPage();
        return page;
    }
    catch (error) {
        console.error('[Puppeteer] Failed to create page:', error);
        throw error;
    }
}
/**
 * Return page to pool for reuse
 */
export async function releasePage(page) {
    try {
        if (page && pagePool.length < MAX_CONCURRENT_PAGES) {
            // Clear page content for reuse
            await page.goto('about:blank');
            pagePool.push(page);
        }
        else if (page) {
            // Page pool full, close it
            await page.close();
        }
    }
    catch (error) {
        console.error('[Puppeteer] Error releasing page:', error);
        try {
            await page.close();
        }
        catch (closeError) {
            console.error('[Puppeteer] Error closing page:', closeError);
        }
    }
}
/**
 * Close browser and cleanup resources
 */
export async function closeBrowser() {
    try {
        // Close all pages in pool
        for (const page of pagePool) {
            try {
                await page.close();
            }
            catch (error) {
                console.error('[Puppeteer] Error closing pooled page:', error);
            }
        }
        pagePool = [];
        // Close browser
        if (browserInstance) {
            await browserInstance.close();
            browserInstance = null;
            console.log('[Puppeteer] Browser instance closed');
        }
    }
    catch (error) {
        console.error('[Puppeteer] Error during cleanup:', error);
        browserInstance = null;
    }
}
/**
 * Health check - ensure browser is running
 */
export async function healthCheck() {
    try {
        const browser = await getBrowser();
        const version = await browser.version();
        console.log(`[Puppeteer] Health check passed - ${version}`);
        return true;
    }
    catch (error) {
        console.error('[Puppeteer] Health check failed:', error);
        browserInstance = null;
        return false;
    }
}
/**
 * Get pool statistics
 */
export function getPoolStats() {
    return {
        available: pagePool.length,
        max: MAX_CONCURRENT_PAGES,
        isHealthy: browserInstance !== null,
    };
}
export const puppeteerManager = {
    getBrowser,
    getPage,
    releasePage,
    closeBrowser,
    healthCheck,
    getPoolStats,
};
