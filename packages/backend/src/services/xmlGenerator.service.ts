import { generateTeifXml } from '../../shared/src/utils/index.js';
import { InvoiceData } from '../../shared/src/types/index.js';

/**
 * Generate TEIF-compliant XML from invoice data
 * Wraps the shared XML generation utility for backend use
 * 
 * Note: All XML escaping is handled in the shared generateTeifXml function
 */
export function generateInvoiceXml(data: InvoiceData): string {
  return generateTeifXml(data, false);
}

export const xmlGeneratorService = {
  generateInvoiceXml,
};
