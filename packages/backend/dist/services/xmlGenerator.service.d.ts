import { InvoiceData } from '@teif/shared/types';
/**
 * Generate TEIF-compliant XML from invoice data
 * Wraps the shared XML generation utility for backend use
 *
 * Note: All XML escaping is handled in the shared generateTeifXml function
 */
export declare function generateInvoiceXml(data: InvoiceData): string;
export declare const xmlGeneratorService: {
    generateInvoiceXml: typeof generateInvoiceXml;
};
