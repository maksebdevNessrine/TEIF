import puppeteer from "puppeteer";
let browserInstance = null;
let pagePool = [];
const MAX_CONCURRENT_PAGES = 5;
async function getBrowser() {
  if (browserInstance) {
    return browserInstance;
  }
  try {
    browserInstance = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        // Overcome limited resource problems
        "--disable-gpu"
      ]
    });
    console.log("[Puppeteer] Browser instance launched");
    browserInstance.on("disconnected", () => {
      console.warn("[Puppeteer] Browser disconnected, will relaunch on next use");
      browserInstance = null;
      pagePool = [];
    });
    return browserInstance;
  } catch (error) {
    console.error("[Puppeteer] Failed to launch browser:", error);
    throw error;
  }
}
async function getPage() {
  const browser = await getBrowser();
  if (pagePool.length > 0) {
    return pagePool.pop();
  }
  if (pagePool.length >= MAX_CONCURRENT_PAGES) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return getPage();
  }
  try {
    const page = await browser.newPage();
    return page;
  } catch (error) {
    console.error("[Puppeteer] Failed to create page:", error);
    throw error;
  }
}
async function releasePage(page) {
  try {
    if (page && pagePool.length < MAX_CONCURRENT_PAGES) {
      await page.goto("about:blank");
      pagePool.push(page);
    } else if (page) {
      await page.close();
    }
  } catch (error) {
    console.error("[Puppeteer] Error releasing page:", error);
    try {
      await page.close();
    } catch (closeError) {
      console.error("[Puppeteer] Error closing page:", closeError);
    }
  }
}
async function closeBrowser() {
  try {
    for (const page of pagePool) {
      try {
        await page.close();
      } catch (error) {
        console.error("[Puppeteer] Error closing pooled page:", error);
      }
    }
    pagePool = [];
    if (browserInstance) {
      await browserInstance.close();
      browserInstance = null;
      console.log("[Puppeteer] Browser instance closed");
    }
  } catch (error) {
    console.error("[Puppeteer] Error during cleanup:", error);
    browserInstance = null;
  }
}
async function healthCheck() {
  try {
    const browser = await getBrowser();
    const version = await browser.version();
    console.log(`[Puppeteer] Health check passed - ${version}`);
    return true;
  } catch (error) {
    console.error("[Puppeteer] Health check failed:", error);
    browserInstance = null;
    return false;
  }
}
function getPoolStats() {
  return {
    available: pagePool.length,
    max: MAX_CONCURRENT_PAGES,
    isHealthy: browserInstance !== null
  };
}
const puppeteerManager = {
  getBrowser,
  getPage,
  releasePage,
  closeBrowser,
  healthCheck,
  getPoolStats
};
export {
  closeBrowser,
  getBrowser,
  getPage,
  getPoolStats,
  healthCheck,
  puppeteerManager,
  releasePage
};
