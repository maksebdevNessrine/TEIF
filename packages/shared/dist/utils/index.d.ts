/**
 * TEIF Shared Utilities
 * Common utility functions for dates, amounts, and formatting
 */
/** Format date to YYYY-MM-DD format */
export declare function formatDateToISO(date: Date | string): string;
/** Format date from YYYY-MM-DD to display format based on language */
export declare function formatDateForDisplay(date: string, language?: 'ar' | 'fr' | 'en'): string;
/** Format amount with currency and decimal places */
export declare function formatAmount(amount: number, currency?: string, decimals?: number): string;
/** Format amount as percentage */
export declare function formatPercentage(rate: number, decimals?: number): string;
/** Round amount to specified decimal places */
export declare function roundAmount(amount: number, decimals?: number): number;
/** Calculate line amount: quantity * unit price */
export declare function calculateLineAmount(quantity: number, unitPrice: number, discountRate?: number): number;
/** Calculate tax amount */
export declare function calculateTaxAmount(amount: number, taxRate: number): number;
/** Calculate total including tax */
export declare function calculateTotalWithTax(amount: number, taxRate: number): number;
/** Calculate total invoice amount with all items */
export declare function calculateInvoiceTotal(lines: Array<{
    lineAmount: number;
    taxRate: number;
}>, taxableAmount?: number): number;
/** Get today's date in YYYY-MM-DD format */
export declare function getTodayISO(): string;
/** Get date N days from now in YYYY-MM-DD format */
export declare function getDateNDaysFromNow(days: number): string;
/** Check if date is valid */
export declare function isValidDate(dateString: string): boolean;
/** Compare two dates (returns -1 if date1 < date2, 0 if equal, 1 if date1 > date2) */
export declare function compareDates(date1: string, date2: string): number;
/** Get day name in specified language */
export declare function getDayName(date: string, language?: 'ar' | 'fr' | 'en'): string;
/** Get month name in specified language */
export declare function getMonthName(date: string, language?: 'ar' | 'fr' | 'en'): string;
/** Check if a string is empty or only whitespace */
export declare function isEmpty(value: string | null | undefined): boolean;
/** Trim and normalize whitespace */
export declare function normalizeString(value: string): string;
/** Check if two values are equal (case-insensitive for strings) */
export declare function isEqual(value1: string | number, value2: string | number, ignoreCase?: boolean): boolean;
/** Generate unique ID */
export declare function generateId(): string;
/** Deep clone object */
export declare function deepClone<T>(obj: T): T;
export * from './invoice';
export { generateTeifXml } from './invoice';
//# sourceMappingURL=index.d.ts.map