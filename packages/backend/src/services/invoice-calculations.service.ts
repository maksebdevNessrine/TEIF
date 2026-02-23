import { calculateLineAmount, calculateTaxAmount } from '@teif/shared/utils';

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
export function calculateLineTotals(line: LineData): LineTotals {
  const discountRate = line.discountRate || 0;
  const taxRate = line.taxRate || 0;

  const lineAmount = calculateLineAmount(
    line.quantity,
    line.unitPrice,
    discountRate
  );

  const taxAmount = calculateTaxAmount(lineAmount, taxRate);

  return {
    lineAmount,
    taxAmount,
    totalAmount: lineAmount + taxAmount,
  };
}

/**
 * Calculate invoice-level totals from line items
 * @param lines Array of line items with calculated amounts
 * @param globalDiscount Global invoice-level discount percentage
 * @param stampDuty Invoice-level stamp duty amount
 * @param ircRate Optional IRC withholding tax rate
 */
export function calculateInvoiceTotals(
  lines: Array<{
    lineAmount: number;
    taxAmount: number;
  }>,
  globalDiscount: number = 0,
  stampDuty: number = 0,
  ircRate?: number
): InvoiceTotals {
  // Sum line totals
  const subtotalHT = lines.reduce((sum, line) => sum + line.lineAmount, 0);
  const subtotalTVA = lines.reduce((sum, line) => sum + line.taxAmount, 0);

  // Apply global discount
  const afterDiscountHT = Math.max(0, subtotalHT - globalDiscount);

  // Calculate IRC if rate provided
  let ircAmount = 0;
  if (ircRate && ircRate > 0) {
    ircAmount = (afterDiscountHT * ircRate) / 100;
  }

  // Calculate final totals
  const totalHT = afterDiscountHT;
  const totalTVA = subtotalTVA;
  const totalTTC = totalHT + totalTVA + stampDuty - ircAmount;

  return {
    totalHT,
    totalTVA,
    totalTTC,
    ircAmount: ircRate ? ircAmount : undefined,
  };
}

export const invoiceCalculationsService = {
  calculateLineTotals,
  calculateInvoiceTotals,
};
