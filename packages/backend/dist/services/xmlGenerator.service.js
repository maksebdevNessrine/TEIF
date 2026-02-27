import { generateTeifXml } from '@teif/shared/utils';
/**
 * Generate TEIF-compliant XML from invoice data
 * Wraps the shared XML generation utility for backend use
 *
 * Note: All XML escaping is handled in the shared generateTeifXml function
 */
export function generateInvoiceXml(data) {
    return generateTeifXml(data, false);
}
export const xmlGeneratorService = {
    generateInvoiceXml,
};
