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
 * Generate QR code content per TEIF 1.8.8 spec (I-88 ReferenceCEV)
 * Format: SupplierTaxID|InvoiceNumber|Date(ddMMyy)|SupplierName|BuyerTaxID|TotalTTC|TotalTVA|TTNReference
 *
 * @example
 * const qrString = generateQrString(invoiceData, 1230.456, 230.456);
 * // Returns: '1234567A|INV-001|210124|TTN Company|9876543B|1230.456|230.456|TTN-2025-001'
 */
export declare const generateQrString: (data: InvoiceData, totalTtc: number, totalTva: number) => string;
/**
 * Converts a number to French words for Tunisian Dinars with 3 decimals
 * Handles both integer and decimal parts (dinars and millimes)
 *
 * @param total - Numeric amount to convert
 * @returns French text representation with dinar and millime portions
 *
 * @example
 * numberToLettersFr(1234.567)
 * // Returns: 'ARRÊTÉ LA PRÉSENTE FACTURE À LA SOMME DE : MILLE DEUX CENT TRENTE-QUATRE DINARS ET CINQ CENT SOIXANTE-SEPT MILLIMES'
 */
export declare const numberToLettersFr: (total: number) => string;
/**
 * Converts a number to Arabic words for Tunisian Dinars with 3 decimals
 * Handles both integer and decimal parts (dinars and millimes)
 * Compliant with Tunisian invoice regulations
 *
 * @param total - Numeric amount to convert
 * @returns Arabic text representation with dinar and millime portions
 *
 * @example
 * numberToLettersAr(1234.567)
 * // Returns: 'تم تحرير هذا الفاتورة بمبلغ : ألف ومائتان وأربعة وثلاثون دينار وخمسمائة وسبعة وستون مليم'
 */
export declare const numberToLettersAr: (total: number) => string;
/**
 * Converts a number to English words for Tunisian Dinars with 3 decimals
 * Handles both integer and decimal parts (dinars and millimes)
 *
 * @param total - Numeric amount to convert
 * @returns English text representation with dinar and millime portions
 *
 * @example
 * numberToLettersEn(1234.567)
 * // Returns: 'THIS INVOICE AMOUNTS TO : ONE THOUSAND TWO HUNDRED THIRTY-FOUR DINARS AND FIVE HUNDRED SIXTY-SEVEN MILLIMES'
 */
export declare const numberToLettersEn: (total: number) => string;
/**
 * Generates amount in words based on language preference
 * Supports French, Arabic, and English
 *
 * @param total - Numeric amount to convert
 * @param language - Language code: 'fr' (French), 'ar' (Arabic), 'en' (English)
 * @returns Formatted amount in words with currency notation
 *
 * @example
 * amountToWords(1234.567, 'fr')
 * amountToWords(1234.567, 'ar')
 * amountToWords(1234.567, 'en')
 */
export declare const amountToWords: (total: number, language?: "fr" | "ar" | "en") => string;
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
/**
 * Escape special XML characters in text content
 * Prevents XML parsing errors from unescaped characters
 * @param text - Text to escape
 * @returns XML-safe text
 */
export declare const escapeXml: (text: string | undefined) => string;
export declare const generateTeifXml: (data: InvoiceData, minify?: boolean) => string;
