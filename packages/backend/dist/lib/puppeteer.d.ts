/**
 * Puppeteer singleton instance manager for efficient PDF generation
 * Reuses browser instance across requests to avoid launch overhead
 */
import { type Browser, type Page } from 'puppeteer';
/**
 * Launch or retrieve existing browser instance
 */
export declare function getBrowser(): Promise<Browser>;
/**
 * Get or create a new page from pool
 */
export declare function getPage(): Promise<Page>;
/**
 * Return page to pool for reuse
 */
export declare function releasePage(page: Page): Promise<void>;
/**
 * Close browser and cleanup resources
 */
export declare function closeBrowser(): Promise<void>;
/**
 * Health check - ensure browser is running
 */
export declare function healthCheck(): Promise<boolean>;
/**
 * Get pool statistics
 */
export declare function getPoolStats(): {
    available: number;
    max: number;
    isHealthy: boolean;
};
export declare const puppeteerManager: {
    getBrowser: typeof getBrowser;
    getPage: typeof getPage;
    releasePage: typeof releasePage;
    closeBrowser: typeof closeBrowser;
    healthCheck: typeof healthCheck;
    getPoolStats: typeof getPoolStats;
};
