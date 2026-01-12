/**
 * TEIF Compliance Checker
 * Validates business rules per TEIF 1.8.8 specification
 */

import { InvoiceData } from '../types';
import * as Validators from './validators';

export interface ComplianceIssue {
  level: 'error' | 'warning';
  code: string;
  message: string;
  field: string;
}

export interface ComplianceReport {
  isCompliant: boolean;
  totalIssues: number;
  errors: ComplianceIssue[];
  warnings: ComplianceIssue[];
  score: number; // 0-100% compliance
}

/**
 * Comprehensive invoice compliance check
 */
export function checkInvoiceCompliance(data: InvoiceData): ComplianceReport {
  const issues: ComplianceIssue[] = [];
  const errors: ComplianceIssue[] = [];
  const warnings: ComplianceIssue[] = [];

  // ============================================
  // MANDATORY FIELDS
  // ============================================
  
  if (!data.documentNumber || data.documentNumber.trim().length === 0) {
    errors.push({ level: 'error', code: 'DOC_001', message: 'Invoice number is required', field: 'documentNumber' });
  } else {
    const invoiceNumVal = Validators.validateInvoiceNumber(data.documentNumber);
    if (!invoiceNumVal.isValid) {
      errors.push({ level: 'error', code: 'DOC_002', message: invoiceNumVal.error!, field: 'documentNumber' });
    }
  }

  if (!data.invoiceDate || data.invoiceDate.trim().length === 0) {
    errors.push({ level: 'error', code: 'DATE_001', message: 'Invoice date (I-31) is required', field: 'invoiceDate' });
  } else {
    const dateVal = Validators.validateDateFormat(data.invoiceDate);
    if (!dateVal.isValid) {
      errors.push({ level: 'error', code: 'DATE_002', message: dateVal.error!, field: 'invoiceDate' });
    }
  }

  // ============================================
  // LINE ITEMS VALIDATION
  // ============================================

  if (!data.lines || data.lines.length === 0) {
    errors.push({ level: 'error', code: 'LINES_001', message: 'At least one line item is required', field: 'lines' });
  } else {
    let lineErrors = 0;
    data.lines.forEach((line, idx) => {
      if (!line.description || line.description.trim().length === 0) {
        lineErrors++;
        errors.push({ level: 'error', code: `LINE_${idx}_001`, message: `Line ${idx + 1}: Description is required`, field: `lines[${idx}].description` });
      }

      const qtyVal = Validators.validateQuantity(line.quantity);
      if (!qtyVal.isValid) {
        lineErrors++;
        errors.push({ level: 'error', code: `LINE_${idx}_002`, message: `Line ${idx + 1}: ${qtyVal.error}`, field: `lines[${idx}].quantity` });
      }

      const priceVal = Validators.validateAmount(line.unitPrice);
      if (!priceVal.isValid) {
        lineErrors++;
        errors.push({ level: 'error', code: `LINE_${idx}_003`, message: `Line ${idx + 1}: ${priceVal.error}`, field: `lines[${idx}].unitPrice` });
      }

      const taxRateVal = Validators.validateTaxRate(line.taxRate);
      if (!taxRateVal.isValid) {
        lineErrors++;
        errors.push({ level: 'error', code: `LINE_${idx}_004`, message: `Line ${idx + 1}: ${taxRateVal.error}`, field: `lines[${idx}].taxRate` });
      }

      if (taxRateVal.warning) {
        warnings.push({ level: 'warning', code: `LINE_${idx}_WARN_001`, message: `Line ${idx + 1}: ${taxRateVal.warning}`, field: `lines[${idx}].taxRate` });
      }
    });

    if (lineErrors === 0) {
      // Further line-level validation passed
    }
  }

  // ============================================
  // PARTNER VALIDATION
  // ============================================

  if (!data.supplier) {
    errors.push({ level: 'error', code: 'PARTNER_001', message: 'Supplier information is required', field: 'supplier' });
  } else {
    const supplierErrors = Validators.validatePartner(data.supplier);
    supplierErrors.forEach(err => {
      errors.push({ level: 'error', code: 'PARTNER_002', message: `Supplier: ${err.error}`, field: 'supplier' });
    });
  }

  if (!data.buyer) {
    errors.push({ level: 'error', code: 'PARTNER_003', message: 'Buyer information is required', field: 'buyer' });
  } else {
    const buyerErrors = Validators.validatePartner(data.buyer);
    buyerErrors.forEach(err => {
      errors.push({ level: 'error', code: 'PARTNER_004', message: `Buyer: ${err.error}`, field: 'buyer' });
    });
  }

  // ============================================
  // AMOUNTS VALIDATION
  // ============================================

  const globalDiscountVal = Validators.validateAmount(data.globalDiscount);
  if (!globalDiscountVal.isValid) {
    errors.push({ level: 'error', code: 'AMT_001', message: `Global discount: ${globalDiscountVal.error}`, field: 'globalDiscount' });
  }

  const stampDutyVal = Validators.validateAmount(data.stampDuty);
  if (!stampDutyVal.isValid) {
    errors.push({ level: 'error', code: 'AMT_002', message: `Stamp duty: ${stampDutyVal.error}`, field: 'stampDuty' });
  }

  // IRC Withholding Tax validation
  if (data.ircRate !== undefined && data.ircRate > 0) {
    const ircRateVal = Validators.validateIrcRate(data.ircRate);
    if (!ircRateVal.isValid) {
      errors.push({ level: 'error', code: 'IRC_001', message: `IRC rate (I-1604): ${ircRateVal.error}`, field: 'ircRate' });
    }

    if (data.ircAmount !== undefined) {
      const ircAmtVal = Validators.validateAmount(data.ircAmount);
      if (!ircAmtVal.isValid) {
        errors.push({ level: 'error', code: 'IRC_002', message: `IRC amount: ${ircAmtVal.error}`, field: 'ircAmount' });
      }
    }
  }

  // ============================================
  // OPTIONAL DATES VALIDATION
  // ============================================

  if (data.dueDate) {
    const dueVal = Validators.validateDateFormat(data.dueDate);
    if (!dueVal.isValid) {
      errors.push({ level: 'error', code: 'DATE_003', message: `Due date (I-32): ${dueVal.error}`, field: 'dueDate' });
    }
  }

  if (data.deliveryDate) {
    const delVal = Validators.validateDateFormat(data.deliveryDate);
    if (!delVal.isValid) {
      errors.push({ level: 'error', code: 'DATE_004', message: `Delivery date (I-33): ${delVal.error}`, field: 'deliveryDate' });
    }
  }

  if (data.dispatchDate) {
    const dispVal = Validators.validateDateFormat(data.dispatchDate);
    if (!dispVal.isValid) {
      errors.push({ level: 'error', code: 'DATE_005', message: `Dispatch date (I-34): ${dispVal.error}`, field: 'dispatchDate' });
    }
  }

  if (data.paymentDate) {
    const payVal = Validators.validateDateFormat(data.paymentDate);
    if (!payVal.isValid) {
      errors.push({ level: 'error', code: 'DATE_006', message: `Payment date (I-35): ${payVal.error}`, field: 'paymentDate' });
    }
  }

  if (data.signatureDate) {
    const sigVal = Validators.validateSignatureDateFormat(data.signatureDate);
    if (!sigVal.isValid) {
      errors.push({ level: 'error', code: 'DATE_007', message: `Signature date (I-37): ${sigVal.error}`, field: 'signatureDate' });
    }
  }

  if (data.otherDate) {
    const otherVal = Validators.validateDateFormat(data.otherDate);
    if (!otherVal.isValid) {
      errors.push({ level: 'error', code: 'DATE_008', message: `Other date (I-38): ${otherVal.error}`, field: 'otherDate' });
    }
  }

  // Period range validation
  if (data.periodStart || data.periodEnd) {
    if (data.periodStart && !Validators.validateDateFormat(data.periodStart).isValid) {
      errors.push({ level: 'error', code: 'DATE_009', message: 'Period start date is invalid', field: 'periodStart' });
    }
    if (data.periodEnd && !Validators.validateDateFormat(data.periodEnd).isValid) {
      errors.push({ level: 'error', code: 'DATE_010', message: 'Period end date is invalid', field: 'periodEnd' });
    }
    if (data.periodStart && data.periodEnd) {
      if (new Date(data.periodStart) > new Date(data.periodEnd)) {
        errors.push({ level: 'error', code: 'DATE_011', message: 'Period start date must be before period end date', field: 'periodStart' });
      }
    }
  }

  // ============================================
  // PAYMENT INFORMATION VALIDATION
  // ============================================

  if (!data.paymentMeans) {
    errors.push({ level: 'error', code: 'PAY_001', message: 'Payment means is required', field: 'paymentMeans' });
  }

  // Bank info validation if payment means is transfer
  if (data.paymentMeans === 'I-114') { // Virement bancaire
    if (!data.bankName || data.bankName.trim().length === 0) {
      warnings.push({ level: 'warning', code: 'BANK_001', message: 'Bank name should be provided for bank transfers', field: 'bankName' });
    }
    if (!data.bankCode || data.bankCode.trim().length === 0) {
      warnings.push({ level: 'warning', code: 'BANK_002', message: 'Bank code should be provided for bank transfers', field: 'bankCode' });
    }
    if (!data.bankRib || data.bankRib.trim().length === 0) {
      warnings.push({ level: 'warning', code: 'BANK_003', message: 'RIB should be provided for bank transfers', field: 'bankRib' });
    } else {
      const ribVal = Validators.validateRib(data.bankRib);
      if (!ribVal.isValid) {
        errors.push({ level: 'error', code: 'BANK_004', message: `RIB validation: ${ribVal.error}`, field: 'bankRib' });
      }
    }
  }

  // ============================================
  // ALLOWANCES VALIDATION
  // ============================================

  if (data.allowances && data.allowances.length > 0) {
    data.allowances.forEach((alc, idx) => {
      const alcAmtVal = Validators.validateAmount(alc.amount);
      if (!alcAmtVal.isValid) {
        errors.push({ level: 'error', code: `ALC_${idx}_001`, message: `Allowance ${idx + 1}: ${alcAmtVal.error}`, field: `allowances[${idx}].amount` });
      }

      if (!alc.description || alc.description.trim().length === 0) {
        warnings.push({ level: 'warning', code: `ALC_${idx}_002`, message: `Allowance ${idx + 1}: Description is recommended`, field: `allowances[${idx}].description` });
      }
    });
  }

  // ============================================
  // BUSINESS LOGIC RULES
  // ============================================

  // Calculate totals to verify consistency
  if (data.lines && data.lines.length > 0) {
    let totalHt = 0;
    let totalTva = 0;

    data.lines.forEach(line => {
      const lineHt = line.quantity * line.unitPrice * (1 - line.discountRate / 100);
      const lineTva = lineHt * line.taxRate;
      totalHt += lineHt;
      totalTva += lineTva;
    });

    // Apply invoice-level discount
    if (data.globalDiscount > 0) {
      totalHt -= data.globalDiscount;
    }

    let totalTtc = totalHt + totalTva + (data.stampDuty || 0);

    // Apply IRC
    if (data.ircRate && data.ircRate > 0) {
      totalTtc -= totalTtc * data.ircRate;
    }

    // TTC must be non-negative
    if (totalTtc < 0) {
      errors.push({ level: 'error', code: 'BIZ_001', message: 'Total invoice amount cannot be negative after discounts and taxes', field: 'total' });
    }

    // Global discount should not exceed HT
    if (data.globalDiscount > totalHt) {
      errors.push({ level: 'error', code: 'BIZ_002', message: 'Global discount cannot exceed subtotal', field: 'globalDiscount' });
    }
  }

  // ============================================
  // DECIMAL PRECISION
  // ============================================

  const checkDecimalPrecision = (value: number, fieldName: string, maxDecimals: number = 5) => {
    const decimalStr = value.toString();
    if (decimalStr.includes('.')) {
      const decimals = decimalStr.split('.')[1].length;
      if (decimals > maxDecimals) {
        warnings.push({ 
          level: 'warning', 
          code: 'PRECISION_001', 
          message: `${fieldName} has ${decimals} decimals, maximum is ${maxDecimals}. It will be rounded.`, 
          field: fieldName 
        });
      }
    }
  };

  data.lines?.forEach((line, idx) => {
    checkDecimalPrecision(line.unitPrice, `Line ${idx + 1} unit price`);
  });
  checkDecimalPrecision(data.globalDiscount, 'Global discount');
  checkDecimalPrecision(data.stampDuty, 'Stamp duty');

  // ============================================
  // COMPILE RESULTS
  // ============================================

  issues.push(...errors, ...warnings);

  const totalPossibleIssues = 100; // Arbitrary baseline
  const score = Math.max(0, 100 - (errors.length * 10 + warnings.length * 2));

  return {
    isCompliant: errors.length === 0,
    totalIssues: issues.length,
    errors,
    warnings,
    score: Math.min(100, Math.max(0, score))
  };
}

/**
 * Quick validation check - returns just a boolean
 */
export function isInvoiceCompliant(data: InvoiceData): boolean {
  const report = checkInvoiceCompliance(data);
  return report.isCompliant;
}

/**
 * Get compliance report as human-readable text
 */
export function getComplianceReport(data: InvoiceData): string {
  const report = checkInvoiceCompliance(data);
  
  let text = `COMPLIANCE REPORT\n`;
  text += `================\n`;
  text += `Status: ${report.isCompliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}\n`;
  text += `Score: ${report.score}%\n`;
  text += `Issues: ${report.totalIssues}\n\n`;

  if (report.errors.length > 0) {
    text += `ERRORS (${report.errors.length}):\n`;
    report.errors.forEach(err => {
      text += `  • [${err.code}] ${err.message}\n`;
    });
    text += `\n`;
  }

  if (report.warnings.length > 0) {
    text += `WARNINGS (${report.warnings.length}):\n`;
    report.warnings.forEach(warn => {
      text += `  • [${warn.code}] ${warn.message}\n`;
    });
  }

  return text;
}
