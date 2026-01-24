/**
 * PDF generation and caching service for invoices
 * Handles Puppeteer rendering, QR code generation, and Supabase storage
 */

import QRCode from 'qrcode';
import { puppeteerManager } from '../lib/puppeteer';
import { storageService } from '../lib/storage';
import { generateInvoiceHtml } from '../templates/invoice.template';
import { getInvoiceById } from './invoice.service';
import type { InvoiceResponse } from '@teif/shared/types';

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
 * Generate QR code data URL for invoice per TEIF 1.8.8 spec (I-88 ReferenceCEV)
 * QR content format: SupplierTaxID|InvoiceNumber|InvoiceDate|SupplierName|BuyerTaxID|TotalTTC|TotalTVA|TTNReference
 * 
 * @example
 * QR content: "1234567A|INV-001|210124|TTN Company|9876543B|500.000|65.000|TTN-2025-001"
 */
async function generateQrCodeDataUrl(invoice: InvoiceResponse): Promise<string> {
  try {
    // Per TEIF 1.8.8 spec: Format concatenated invoice data for QR encoding
    const invoiceDateFormatted = invoice.invoiceDate 
      ? new Date(invoice.invoiceDate).toLocaleDateString('fr-TN', { year: '2-digit', month: '2-digit', day: '2-digit' })
      : '';
    
    const qrContent = [
      invoice.supplier?.idValue || 'N/A',           // Supplier Tax ID
      invoice.documentNumber || 'N/A',              // Invoice Number
      invoiceDateFormatted,                         // Invoice Date (ddMMyy format)
      invoice.supplier?.name || 'N/A',              // Supplier Name
      invoice.buyer?.idValue || 'N/A',              // Buyer Tax ID
      invoice.totalTTC.toFixed(3),                  // Total TTC (3 decimals)
      (invoice.totalTTC - invoice.totalHT - (invoice.stampDuty || 0)).toFixed(3), // Total TVA
      invoice.ttnReference || `TTN-${invoice.id.substring(0, 8)}` // TTN Reference or generated
    ].join('|');

    const dataUrl = await QRCode.toDataURL(qrContent, {
      width: 200,
      margin: 1,
      errorCorrectionLevel: 'H',
      type: 'image/png',
    });

    // Log for observability per MERN Constitution §6.2
    console.log(`[PDF] QR code generated for invoice ${invoice.documentNumber}`, {
      invoiceId: invoice.id,
      supplierTaxId: invoice.supplier?.idValue,
      buyerTaxId: invoice.buyer?.idValue,
      totalTTC: invoice.totalTTC,
      ttnReference: invoice.ttnReference,
      qrContentLength: qrContent.length
    });

    return dataUrl;
  } catch (error) {
    console.error('[PDF] Error generating QR code:', error, {
      invoiceId: invoice.id,
      documentNumber: invoice.documentNumber
    });
    return '';
  }
}

/**
 * Generate PDF buffer from HTML using Puppeteer
 */
async function renderPdfFromHtml(html: string): Promise<Buffer> {
  let page = null;

  try {
    const startTime = Date.now();
    page = await puppeteerManager.getPage();

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
  } catch (error) {
    console.error('[PDF] Error rendering PDF:', error);
    throw error;
  } finally {
    if (page) {
      await puppeteerManager.releasePage(page);
    }
  }
}

/**
 * Generate PDF for invoice without cache bypass
 */
export async function generateInvoicePdf(
  invoiceId: string,
  userId: string,
  language: Language = 'fr'
): Promise<Buffer> {
  try {
    console.log(`[PDF] Generating PDF for invoice ${invoiceId} (language: ${language})`);

    // Fetch invoice with all relations
    const invoice = await getInvoiceById(userId, invoiceId);

    if (!invoice) {
      throw new Error(`Invoice ${invoiceId} not found`);
    }

    // Generate QR code
    const qrCodeDataUrl = await generateQrCodeDataUrl(invoice);

    // Generate HTML
    const html = generateInvoiceHtml(invoice as any, language, qrCodeDataUrl);

    // Render PDF
    const buffer = await renderPdfFromHtml(html);

    console.log(`[PDF] Generated PDF buffer (${buffer.length} bytes)`);
    return buffer;
  } catch (error) {
    console.error('[PDF] Error in generateInvoicePdf:', error);
    throw error;
  }
}

/**
 * Get or generate PDF with caching support
 */
export async function getOrGeneratePdf(
  invoiceId: string,
  userId: string,
  options: GeneratePdfOptions = {}
): Promise<PdfResult> {
  const language = options.language || 'fr';
  const bypassCache = options.bypassCache || false;

  try {
    // Check cache unless bypassed
    if (!bypassCache) {
      console.log(`[PDF] Checking cache for ${invoiceId} (${language})`);

      const cached = await storageService.downloadPdf(invoiceId, userId, language);
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
    const uploadSuccess = await storageService.uploadPdf(invoiceId, userId, language, buffer);
    if (!uploadSuccess) {
      console.warn('[PDF] Warning: Failed to upload PDF to storage, returning generated PDF only');
    }

    return {
      buffer,
      fromCache: false,
      generatedAt: new Date(),
    };
  } catch (error) {
    console.error('[PDF] Error in getOrGeneratePdf:', error);
    throw error;
  }
}

/**
 * Invalidate PDF cache for invoice (called on update)
 */
export async function invalidatePdfCache(invoiceId: string, userId: string): Promise<void> {
  try {
    console.log(`[PDF] Invalidating cache for invoice ${invoiceId}`);
    const success = await storageService.deletePdf(invoiceId, userId);

    if (success) {
      console.log(`[PDF] Cache invalidated for invoice ${invoiceId}`);
    } else {
      console.warn(`[PDF] Failed to invalidate cache for invoice ${invoiceId}`);
    }
  } catch (error) {
    console.error('[PDF] Error invalidating cache:', error);
    // Don't rethrow - cache invalidation should not break invoice update
  }
}

/**
 * Retry wrapper for PDF generation with fallback
 */
export async function generatePdfWithRetry(
  invoiceId: string,
  userId: string,
  language: Language = 'fr',
  maxRetries: number = 1
): Promise<Buffer> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `[PDF] Generation attempt ${attempt + 1}/${maxRetries + 1} for invoice ${invoiceId}`
      );
      return await generateInvoicePdf(invoiceId, userId, language);
    } catch (error) {
      lastError = error as Error;
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
export function getPdfServiceStats(): {
  puppeteer: { available: number; max: number; isHealthy: boolean };
} {
  return {
    puppeteer: puppeteerManager.getPoolStats(),
  };
}

/**
 * Health check for PDF service
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const isHealthy = await puppeteerManager.healthCheck();
    console.log(`[PDF] Health check: ${isHealthy ? 'healthy' : 'unhealthy'}`);
    return isHealthy;
  } catch (error) {
    console.error('[PDF] Health check failed:', error);
    return false;
  }
}

export const pdfService = {
  generateInvoicePdf,
  getOrGeneratePdf,
  invalidatePdfCache,
  generatePdfWithRetry,
  getPdfServiceStats,
  healthCheck,
};
