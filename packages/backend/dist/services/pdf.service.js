"use strict";
/**
 * PDF generation and caching service for invoices
 * Handles Puppeteer rendering, QR code generation, and Supabase storage
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfService = void 0;
exports.generateInvoicePdf = generateInvoicePdf;
exports.getOrGeneratePdf = getOrGeneratePdf;
exports.invalidatePdfCache = invalidatePdfCache;
exports.generatePdfWithRetry = generatePdfWithRetry;
exports.getPdfServiceStats = getPdfServiceStats;
exports.healthCheck = healthCheck;
const qrcode_1 = __importDefault(require("qrcode"));
const puppeteer_1 = require("../lib/puppeteer");
const storage_1 = require("../lib/storage");
const invoice_template_1 = require("../templates/invoice.template");
const invoice_service_1 = require("./invoice.service");
/**
 * Generate QR code data URL for invoice
 */
async function generateQrCodeDataUrl(invoice) {
    try {
        // Format: invoice_id|document_number|date|total_ttc
        const qrContent = [
            invoice.id,
            invoice.documentNumber,
            new Date(invoice.invoiceDate).toISOString().split('T')[0],
            invoice.totalTTC.toFixed(3),
        ].join('|');
        const dataUrl = await qrcode_1.default.toDataURL(qrContent, {
            width: 200,
            margin: 1,
            errorCorrectionLevel: 'H',
            type: 'image/png',
        });
        console.log(`[PDF] QR code generated for invoice ${invoice.documentNumber}`);
        return dataUrl;
    }
    catch (error) {
        console.error('[PDF] Error generating QR code:', error);
        return '';
    }
}
/**
 * Generate PDF buffer from HTML using Puppeteer
 */
async function renderPdfFromHtml(html) {
    let page = null;
    try {
        const startTime = Date.now();
        page = await puppeteer_1.puppeteerManager.getPage();
        await page.setContent(html, {
            waitUntil: 'networkidle0',
            timeout: 30000,
        });
        // Set viewport for consistent rendering
        await page.setViewport({ width: 1024, height: 1280 });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '15mm',
                bottom: '20mm',
                left: '15mm',
            },
            displayHeaderFooter: false,
            preferCSSPageSize: false,
        });
        const duration = Date.now() - startTime;
        console.log(`[PDF] Rendered PDF in ${duration}ms`);
        return Buffer.from(pdfBuffer);
    }
    catch (error) {
        console.error('[PDF] Error rendering PDF:', error);
        throw error;
    }
    finally {
        if (page) {
            await puppeteer_1.puppeteerManager.releasePage(page);
        }
    }
}
/**
 * Generate PDF for invoice without cache bypass
 */
async function generateInvoicePdf(invoiceId, userId, language = 'fr') {
    try {
        console.log(`[PDF] Generating PDF for invoice ${invoiceId} (language: ${language})`);
        // Fetch invoice with all relations
        const invoice = await (0, invoice_service_1.getInvoiceById)(userId, invoiceId);
        if (!invoice) {
            throw new Error(`Invoice ${invoiceId} not found`);
        }
        // Generate QR code
        const qrCodeDataUrl = await generateQrCodeDataUrl(invoice);
        // Generate HTML
        const html = (0, invoice_template_1.generateInvoiceHtml)(invoice, language, qrCodeDataUrl);
        // Render PDF
        const buffer = await renderPdfFromHtml(html);
        console.log(`[PDF] Generated PDF buffer (${buffer.length} bytes)`);
        return buffer;
    }
    catch (error) {
        console.error('[PDF] Error in generateInvoicePdf:', error);
        throw error;
    }
}
/**
 * Get or generate PDF with caching support
 */
async function getOrGeneratePdf(invoiceId, userId, options = {}) {
    const language = options.language || 'fr';
    const bypassCache = options.bypassCache || false;
    try {
        // Check cache unless bypassed
        if (!bypassCache) {
            console.log(`[PDF] Checking cache for ${invoiceId} (${language})`);
            const cached = await storage_1.storageService.downloadPdf(invoiceId, userId, language);
            if (cached) {
                return {
                    buffer: cached,
                    fromCache: true,
                    generatedAt: new Date(),
                };
            }
        }
        // Generate new PDF
        console.log(`[PDF] Cache miss or bypassed, generating new PDF`);
        const buffer = await generateInvoicePdf(invoiceId, userId, language);
        // Upload to cache
        const uploadSuccess = await storage_1.storageService.uploadPdf(invoiceId, userId, language, buffer);
        if (!uploadSuccess) {
            console.warn('[PDF] Warning: Failed to upload PDF to storage, returning generated PDF only');
        }
        return {
            buffer,
            fromCache: false,
            generatedAt: new Date(),
        };
    }
    catch (error) {
        console.error('[PDF] Error in getOrGeneratePdf:', error);
        throw error;
    }
}
/**
 * Invalidate PDF cache for invoice (called on update)
 */
async function invalidatePdfCache(invoiceId, userId) {
    try {
        console.log(`[PDF] Invalidating cache for invoice ${invoiceId}`);
        const success = await storage_1.storageService.deletePdf(invoiceId, userId);
        if (success) {
            console.log(`[PDF] Cache invalidated for invoice ${invoiceId}`);
        }
        else {
            console.warn(`[PDF] Failed to invalidate cache for invoice ${invoiceId}`);
        }
    }
    catch (error) {
        console.error('[PDF] Error invalidating cache:', error);
        // Don't rethrow - cache invalidation should not break invoice update
    }
}
/**
 * Retry wrapper for PDF generation with fallback
 */
async function generatePdfWithRetry(invoiceId, userId, language = 'fr', maxRetries = 1) {
    let lastError = null;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            console.log(`[PDF] Generation attempt ${attempt + 1}/${maxRetries + 1} for invoice ${invoiceId}`);
            return await generateInvoicePdf(invoiceId, userId, language);
        }
        catch (error) {
            lastError = error;
            console.error(`[PDF] Attempt ${attempt + 1} failed:`, lastError.message);
            if (attempt < maxRetries) {
                // Wait before retry
                await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
            }
        }
    }
    throw lastError || new Error('PDF generation failed');
}
/**
 * Get pool statistics for monitoring
 */
function getPdfServiceStats() {
    return {
        puppeteer: puppeteer_1.puppeteerManager.getPoolStats(),
    };
}
/**
 * Health check for PDF service
 */
async function healthCheck() {
    try {
        const isHealthy = await puppeteer_1.puppeteerManager.healthCheck();
        console.log(`[PDF] Health check: ${isHealthy ? 'healthy' : 'unhealthy'}`);
        return isHealthy;
    }
    catch (error) {
        console.error('[PDF] Health check failed:', error);
        return false;
    }
}
exports.pdfService = {
    generateInvoicePdf,
    getOrGeneratePdf,
    invalidatePdfCache,
    generatePdfWithRetry,
    getPdfServiceStats,
    healthCheck,
};
