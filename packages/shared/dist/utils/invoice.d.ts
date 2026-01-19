/**
 * TEIF Invoice Utilities
 * Shared utility functions for invoice processing, formatting, and validation
 * Used by both frontend and backend for consistent behavior
 */
import type { InvoiceData } from '../types/index';
/**
 * Formats a date string from YYYY-MM-DD format to ddMMyy format
 * Used for TEIF XML generation where dates must follow Tunisian invoice format
 *
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns Formatted date string in ddMMyy format, or empty string if input is empty
 *
 * @example
 * formatTtnDate('2024-01-15') // Returns '150124'
 * formatTtnDate('2025-12-31') // Returns '311225'
 */
export declare const formatTtnDate: (dateStr: string | undefined) => string;
/**
 * Generates a QR code content string for TEIF invoices
 * Format: supplier_id|invoice_number|date|total_ttc|total_tva
 *
 * @param data - Complete invoice data object
 * @param totalTtc - Total amount including tax (3 decimals)
 * @param totalTva - Total tax amount (3 decimals)
 * @returns QR code content string
 *
 * @example
 * const qrString = generateQrString(invoiceData, 1230.456, 230.456);
 * // Returns: '1234567|INV-001|20240115|1230.456|230.456'
 */
export declare const generateQrString: (data: InvoiceData, totalTtc: number, totalTva: number) => string;
/**
 * Converts a number to French words, specifically formatted for Tunisian Dinars with 3 decimals
 * Handles both integer and decimal parts (dinars and millimes)
 *
 * @param total - Numeric amount to convert
 * @returns French text representation with dinar and millime portions
 *
 * @example
 * numberToLettersFr(1234.567)
 * // Returns: 'ARRÊTÉ LA PRÉSENTE FACTURE À LA SOMME DE : MILLE DEUX CENT TRENTE-QUATRE DINARS ET CINQ CENT SOIXANTE-SEPT MILLIMES'
 *
 * numberToLettersFr(0.001)
 * // Returns: 'ARRÊTÉ LA PRÉSENTE FACTURE À LA SOMME DE : UN MILLIME'
 */
export declare const numberToLettersFr: (total: number) => string;
/**
 * Generate TEIF-compliant XML from invoice data
 * This function generates a complete TEIF XML document from invoice data
 * Used by both frontend (for preview/download) and backend (for storage)
 *
 * @param data - InvoiceData object with all invoice details
 * @param minify - Optional boolean to minify XML output (remove whitespace for transmission)
 * @returns Complete TEIF XML string
 *
 * @example
 * const xml = generateTeifXml(invoiceData);
 * const minified = generateTeifXml(invoiceData, true);
 */
export declare const generateTeifXml: (data: InvoiceData, minify?: boolean) => string;
//# sourceMappingURL=invoice.d.ts.map