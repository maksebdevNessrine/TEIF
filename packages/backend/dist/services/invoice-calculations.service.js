import { calculateLineAmount, calculateTaxAmount } from "@teif/shared/utils";
function calculateLineTotals(line) {
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
    totalAmount: lineAmount + taxAmount
  };
}
function calculateInvoiceTotals(lines, globalDiscount = 0, stampDuty = 0, ircRate) {
  const subtotalHT = lines.reduce((sum, line) => sum + line.lineAmount, 0);
  const subtotalTVA = lines.reduce((sum, line) => sum + line.taxAmount, 0);
  const afterDiscountHT = Math.max(0, subtotalHT - globalDiscount);
  let ircAmount = 0;
  if (ircRate && ircRate > 0) {
    ircAmount = afterDiscountHT * ircRate / 100;
  }
  const totalHT = afterDiscountHT;
  const totalTVA = subtotalTVA;
  const totalTTC = totalHT + totalTVA + stampDuty - ircAmount;
  return {
    totalHT,
    totalTVA,
    totalTTC,
    ircAmount: ircRate ? ircAmount : void 0
  };
}
const invoiceCalculationsService = {
  calculateLineTotals,
  calculateInvoiceTotals
};
export {
  calculateInvoiceTotals,
  calculateLineTotals,
  invoiceCalculationsService
};
