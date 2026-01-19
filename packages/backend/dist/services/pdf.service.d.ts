/**
 * PDF generation and caching service for invoices
 * Handles Puppeteer rendering, QR code generation, and Supabase storage
 */
type Language = 'ar' | 'fr' | 'en';
interface GeneratePdfOptions {
    language?: Language;
    bypassCache?: boolean;
}
interface PdfResult {
    buffer: Buffer;
    fromCache: boolean;
    generatedAt: Date;
}
/**
 * Generate PDF for invoice without cache bypass
 */
export declare function generateInvoicePdf(invoiceId: string, userId: string, language?: Language): Promise<Buffer>;
/**
 * Get or generate PDF with caching support
 */
export declare function getOrGeneratePdf(invoiceId: string, userId: string, options?: GeneratePdfOptions): Promise<PdfResult>;
/**
 * Invalidate PDF cache for invoice (called on update)
 */
export declare function invalidatePdfCache(invoiceId: string, userId: string): Promise<void>;
/**
 * Retry wrapper for PDF generation with fallback
 */
export declare function generatePdfWithRetry(invoiceId: string, userId: string, language?: Language, maxRetries?: number): Promise<Buffer>;
/**
 * Get pool statistics for monitoring
 */
export declare function getPdfServiceStats(): {
    puppeteer: {
        available: number;
        max: number;
        isHealthy: boolean;
    };
};
/**
 * Health check for PDF service
 */
export declare function healthCheck(): Promise<boolean>;
export declare const pdfService: {
    generateInvoicePdf: typeof generateInvoicePdf;
    getOrGeneratePdf: typeof getOrGeneratePdf;
    invalidatePdfCache: typeof invalidatePdfCache;
    generatePdfWithRetry: typeof generatePdfWithRetry;
    getPdfServiceStats: typeof getPdfServiceStats;
    healthCheck: typeof healthCheck;
};
export {};
