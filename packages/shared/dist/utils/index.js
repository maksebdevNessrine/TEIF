/**
 * TEIF Shared Utilities
 * Common utility functions for dates, amounts, and formatting
 */
/** Format date to YYYY-MM-DD format */
export function formatDateToISO(date) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
/** Format date from YYYY-MM-DD to display format based on language */
export function formatDateForDisplay(date, language = 'en') {
    const [year, month, day] = date.split('-');
    const formats = {
        'en': `${day}/${month}/${year}`,
        'fr': `${day}/${month}/${year}`,
        'ar': `${day}/${month}/${year}`
    };
    return formats[language] || formats['en'];
}
/** Format amount with currency and decimal places */
export function formatAmount(amount, currency = 'TND', decimals = 2) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(amount);
}
/** Format amount as percentage */
export function formatPercentage(rate, decimals = 2) {
    return `${(rate * 100).toFixed(decimals)}%`;
}
/** Round amount to specified decimal places */
export function roundAmount(amount, decimals = 5) {
    const factor = Math.pow(10, decimals);
    return Math.round(amount * factor) / factor;
}
/** Calculate line amount: quantity * unit price */
export function calculateLineAmount(quantity, unitPrice, discountRate = 0) {
    const subtotal = quantity * unitPrice;
    const discount = subtotal * discountRate;
    return roundAmount(subtotal - discount);
}
/** Calculate tax amount */
export function calculateTaxAmount(amount, taxRate) {
    return roundAmount(amount * taxRate);
}
/** Calculate total including tax */
export function calculateTotalWithTax(amount, taxRate) {
    return roundAmount(amount * (1 + taxRate));
}
/** Calculate total invoice amount with all items */
export function calculateInvoiceTotal(lines, taxableAmount = 0) {
    let totalHT = 0; // Before tax
    let totalTVA = 0; // Tax amount
    for (const line of lines) {
        totalHT += line.lineAmount;
        totalTVA += calculateTaxAmount(line.lineAmount, line.taxRate);
    }
    return roundAmount(totalHT + totalTVA + taxableAmount);
}
/** Get today's date in YYYY-MM-DD format */
export function getTodayISO() {
    return formatDateToISO(new Date());
}
/** Get date N days from now in YYYY-MM-DD format */
export function getDateNDaysFromNow(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return formatDateToISO(date);
}
/** Check if date is valid */
export function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString))
        return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
}
/** Compare two dates (returns -1 if date1 < date2, 0 if equal, 1 if date1 > date2) */
export function compareDates(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (d1 < d2)
        return -1;
    if (d1 > d2)
        return 1;
    return 0;
}
/** Get day name in specified language */
export function getDayName(date, language = 'en') {
    const dateObj = new Date(date);
    const formatter = new Intl.DateTimeFormat(language === 'ar' ? 'ar-TN' : language === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long' });
    return formatter.format(dateObj);
}
/** Get month name in specified language */
export function getMonthName(date, language = 'en') {
    const dateObj = new Date(date);
    const formatter = new Intl.DateTimeFormat(language === 'ar' ? 'ar-TN' : language === 'fr' ? 'fr-FR' : 'en-US', { month: 'long' });
    return formatter.format(dateObj);
}
/** Check if a string is empty or only whitespace */
export function isEmpty(value) {
    return !value || value.trim().length === 0;
}
/** Trim and normalize whitespace */
export function normalizeString(value) {
    return value.trim().replace(/\s+/g, ' ');
}
/** Check if two values are equal (case-insensitive for strings) */
export function isEqual(value1, value2, ignoreCase = false) {
    if (ignoreCase && typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.toLowerCase() === value2.toLowerCase();
    }
    return value1 === value2;
}
/** Generate unique ID */
export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
/** Deep clone object */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
// Export TEIF-specific invoice utilities
export * from './invoice';
export { generateTeifXml } from './invoice';
