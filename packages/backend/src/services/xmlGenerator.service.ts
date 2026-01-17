import { generateTeifXml } from '@teif/shared/utils';
import { InvoiceData } from '@teif/shared/types';

/**
 * Generate TEIF-compliant XML from invoice data
 * Wraps the shared XML generation utility for backend use
 */
export function generateInvoiceXml(data: InvoiceData): string {
  return generateTeifXml(data, false);
}

export const xmlGeneratorService = {
  generateInvoiceXml,
};
