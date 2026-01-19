import { InvoiceData } from '@teif/shared/types';
/**
 * Generate TEIF-compliant XML from invoice data
 * Wraps the shared XML generation utility for backend use
 */
export declare function generateInvoiceXml(data: InvoiceData): string;
export declare const xmlGeneratorService: {
    generateInvoiceXml: typeof generateInvoiceXml;
};
