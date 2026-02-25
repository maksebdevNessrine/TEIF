import QRCode from "qrcode";
import { puppeteerManager } from "../lib/puppeteer.js";
import { storageService } from "../lib/storage.js";
import { generateInvoiceHtml } from "../templates/invoice.template.js";
import { getInvoiceById } from "./invoice.service.js";
async function generateQrCodeDataUrl(invoice) {
  try {
    const invoiceDateFormatted = invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString("fr-TN", { year: "2-digit", month: "2-digit", day: "2-digit" }) : "";
    const qrContent = [
      invoice.supplier?.idValue || "N/A",
      // Supplier Tax ID
      invoice.documentNumber || "N/A",
      // Invoice Number
      invoiceDateFormatted,
      // Invoice Date (ddMMyy format)
      invoice.supplier?.name || "N/A",
      // Supplier Name
      invoice.buyer?.idValue || "N/A",
      // Buyer Tax ID
      invoice.totalTTC.toFixed(3),
      // Total TTC (3 decimals)
      (invoice.totalTTC - invoice.totalHT - (invoice.stampDuty || 0)).toFixed(3),
      // Total TVA
      invoice.ttnReference || `TTN-${invoice.id.substring(0, 8)}`
      // TTN Reference or generated
    ].join("|");
    const dataUrl = await QRCode.toDataURL(qrContent, {
      width: 200,
      margin: 1,
      errorCorrectionLevel: "H",
      type: "image/png"
    });
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
    console.error("[PDF] Error generating QR code:", error, {
      invoiceId: invoice.id,
      documentNumber: invoice.documentNumber
    });
    return "";
  }
}
async function renderPdfFromHtml(html) {
  let page = null;
  try {
    const startTime = Date.now();
    page = await puppeteerManager.getPage();
    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: 3e4
    });
    await page.setViewport({ width: 1024, height: 1280 });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "15mm",
        bottom: "20mm",
        left: "15mm"
      },
      displayHeaderFooter: false,
      preferCSSPageSize: false
    });
    const duration = Date.now() - startTime;
    console.log(`[PDF] Rendered PDF in ${duration}ms`);
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("[PDF] Error rendering PDF:", error);
    throw error;
  } finally {
    if (page) {
      await puppeteerManager.releasePage(page);
    }
  }
}
async function generateInvoicePdf(invoiceId, userId, language = "fr") {
  try {
    console.log(`[PDF] generateInvoicePdf START: invoiceId=${invoiceId}, language=${language}`);
    const invoice = await getInvoiceById(userId, invoiceId);
    if (!invoice) {
      throw new Error(`Invoice ${invoiceId} not found`);
    }
    console.log(`[PDF] Fetched invoice: amountLanguage=${invoice.amountLanguage}`);
    const qrCodeDataUrl = await generateQrCodeDataUrl(invoice);
    const html = generateInvoiceHtml(invoice, language, qrCodeDataUrl);
    const buffer = await renderPdfFromHtml(html);
    console.log(`[PDF] Generated PDF buffer (${buffer.length} bytes)`);
    return buffer;
  } catch (error) {
    console.error("[PDF] Error in generateInvoicePdf:", error);
    throw error;
  }
}
async function getOrGeneratePdf(invoiceId, userId, options = {}) {
  const language = options.language || "fr";
  const bypassCache = options.bypassCache || false;
  try {
    if (!bypassCache) {
      console.log(`[PDF] Checking cache for ${invoiceId} (${language})`);
      const cached = await storageService.downloadPdf(invoiceId, userId, language);
      if (cached) {
        return {
          buffer: cached,
          fromCache: true,
          generatedAt: /* @__PURE__ */ new Date()
        };
      }
    }
    console.log(`[PDF] Cache miss or bypassed, generating new PDF`);
    const buffer = await generateInvoicePdf(invoiceId, userId, language);
    const uploadSuccess = await storageService.uploadPdf(invoiceId, userId, language, buffer);
    if (!uploadSuccess) {
      console.warn("[PDF] Warning: Failed to upload PDF to storage, returning generated PDF only");
    }
    return {
      buffer,
      fromCache: false,
      generatedAt: /* @__PURE__ */ new Date()
    };
  } catch (error) {
    console.error("[PDF] Error in getOrGeneratePdf:", error);
    throw error;
  }
}
async function invalidatePdfCache(invoiceId, userId) {
  try {
    console.log(`[PDF] Invalidating cache for invoice ${invoiceId}`);
    const success = await storageService.deletePdf(invoiceId, userId);
    if (success) {
      console.log(`[PDF] Cache invalidated for invoice ${invoiceId}`);
    } else {
      console.warn(`[PDF] Failed to invalidate cache for invoice ${invoiceId}`);
    }
  } catch (error) {
    console.error("[PDF] Error invalidating cache:", error);
  }
}
async function generatePdfWithRetry(invoiceId, userId, language = "fr", maxRetries = 1) {
  let lastError = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `[PDF] Generation attempt ${attempt + 1}/${maxRetries + 1} for invoice ${invoiceId}`
      );
      return await generateInvoicePdf(invoiceId, userId, language);
    } catch (error) {
      lastError = error;
      console.error(`[PDF] Attempt ${attempt + 1} failed:`, lastError.message);
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1e3 * (attempt + 1)));
      }
    }
  }
  throw lastError || new Error("PDF generation failed");
}
function getPdfServiceStats() {
  return {
    puppeteer: puppeteerManager.getPoolStats()
  };
}
async function healthCheck() {
  try {
    const isHealthy = await puppeteerManager.healthCheck();
    console.log(`[PDF] Health check: ${isHealthy ? "healthy" : "unhealthy"}`);
    return isHealthy;
  } catch (error) {
    console.error("[PDF] Health check failed:", error);
    return false;
  }
}
const pdfService = {
  generateInvoicePdf,
  getOrGeneratePdf,
  invalidatePdfCache,
  generatePdfWithRetry,
  getPdfServiceStats,
  healthCheck
};
export {
  generateInvoicePdf,
  generatePdfWithRetry,
  getOrGeneratePdf,
  getPdfServiceStats,
  healthCheck,
  invalidatePdfCache,
  pdfService
};

