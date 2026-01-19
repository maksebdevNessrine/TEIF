export interface LineTotals {
    lineAmount: number;
    taxAmount: number;
    totalAmount: number;
}
export interface InvoiceTotals {
    totalHT: number;
    totalTVA: number;
    totalTTC: number;
    ircAmount?: number;
}
interface LineData {
    quantity: number;
    unitPrice: number;
    discountRate?: number;
    taxRate?: number;
    fodec?: boolean;
}
/**
 * Calculate line-level totals including amount and tax
 * @param line Line item with quantity, unitPrice, discount, and tax rates
 */
export declare function calculateLineTotals(line: LineData): LineTotals;
/**
 * Calculate invoice-level totals from line items
 * @param lines Array of line items with calculated amounts
 * @param globalDiscount Global invoice-level discount percentage
 * @param stampDuty Invoice-level stamp duty amount
 * @param ircRate Optional IRC withholding tax rate
 */
export declare function calculateInvoiceTotals(lines: Array<{
    lineAmount: number;
    taxAmount: number;
}>, globalDiscount?: number, stampDuty?: number, ircRate?: number): InvoiceTotals;
export declare const invoiceCalculationsService: {
    calculateLineTotals: typeof calculateLineTotals;
    calculateInvoiceTotals: typeof calculateInvoiceTotals;
};
export {};
