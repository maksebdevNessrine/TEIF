import { generateTeifXml } from '@teif/shared/utils';
/**
 * Generate TEIF-compliant XML from invoice data
 * Wraps the shared XML generation utility for backend use
 */
export function generateInvoiceXml(data) {
    return generateTeifXml(data, false);
}
export const xmlGeneratorService = {
    generateInvoiceXml,
};
