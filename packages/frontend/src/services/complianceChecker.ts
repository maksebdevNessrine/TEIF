import { InvoiceData } from '@teif/shared/types';
import * as Validators from '@teif/shared/validation';

export interface ComplianceIssue {
  level: 'error' | 'warning';
  code: string;
  message: string;
  field?: string;
}

export interface ComplianceReport {
  isCompliant: boolean;
  totalIssues: number;
  errors: ComplianceIssue[];
  warnings: ComplianceIssue[];
  score: number;
}

export const checkInvoiceCompliance = (data: InvoiceData): ComplianceReport => {
  const issues: ComplianceIssue[] = [];

  // ============= MANDATORY FIELDS =============
  if (!data.documentNumber?.trim()) {
    issues.push({ level: 'error', code: 'E001', message: 'Document number is required', field: 'documentNumber' });
  } else if (!Validators.validateInvoiceNumber(data.documentNumber).isValid) {
    issues.push({ level: 'error', code: 'E002', message: 'Document number format is invalid', field: 'documentNumber' });
  }

  if (!data.invoiceDate) {
    issues.push({ level: 'error', code: 'E003', message: 'Invoice date is required', field: 'invoiceDate' });
  } else if (!Validators.validateDateFormat(data.invoiceDate).isValid) {
    issues.push({ level: 'error', code: 'E004', message: 'Invoice date format must be YYYY-MM-DD', field: 'invoiceDate' });
  }

  // ============= SUPPLIER VALIDATION =============
  if (!data.supplier.name?.trim()) {
    issues.push({ level: 'error', code: 'E005', message: 'Supplier name is required', field: 'supplier.name' });
  } else if (!Validators.validateCompanyName(data.supplier.name).isValid) {
    issues.push({ level: 'error', code: 'E006', message: 'Supplier name must be between 2 and 100 characters', field: 'supplier.name' });
  }

  if (!data.supplier.idValue?.trim()) {
    issues.push({ level: 'error', code: 'E007', message: 'Supplier ID is required', field: 'supplier.idValue' });
  } else if (!Validators.validateIdentifier(data.supplier.idValue, data.supplier.idType).isValid) {
    issues.push({ level: 'error', code: 'E008', message: `Invalid supplier ${data.supplier.idType} format`, field: 'supplier.idValue' });
  }

  // Street is optional per TEIF spec (minOccurs="0"), only validate if provided
  if (data.supplier.street && !Validators.validateStreetAddress(data.supplier.street).isValid) {
    issues.push({ level: 'warning', code: 'W010', message: 'Supplier street address format may be invalid (max 100 characters)', field: 'supplier.street' });
  }

  if (!data.supplier.city?.trim()) {
    issues.push({ level: 'error', code: 'E010', message: 'Supplier city is required', field: 'supplier.city' });
  }

  if (!data.supplier.postalCode?.trim()) {
    issues.push({ level: 'error', code: 'E011', message: 'Supplier postal code is required', field: 'supplier.postalCode' });
  } else if (!Validators.validatePostalCode(data.supplier.postalCode).isValid) {
    issues.push({ level: 'warning', code: 'W001', message: 'Supplier postal code format may be invalid', field: 'supplier.postalCode' });
  }

  // ============= BUYER VALIDATION =============
  if (!data.buyer.name?.trim()) {
    issues.push({ level: 'error', code: 'E012', message: 'Buyer name is required', field: 'buyer.name' });
  } else if (!Validators.validateCompanyName(data.buyer.name).isValid) {
    issues.push({ level: 'error', code: 'E013', message: 'Buyer name must be between 2 and 100 characters', field: 'buyer.name' });
  }

  if (!data.buyer.idValue?.trim()) {
    issues.push({ level: 'error', code: 'E014', message: 'Buyer ID is required', field: 'buyer.idValue' });
  } else if (!Validators.validateIdentifier(data.buyer.idValue, data.buyer.idType).isValid) {
    issues.push({ level: 'error', code: 'E015', message: `Invalid buyer ${data.buyer.idType} format`, field: 'buyer.idValue' });
  }

  // Street is optional per TEIF spec (minOccurs="0"), only validate if provided
  if (data.buyer.street && !Validators.validateStreetAddress(data.buyer.street).isValid) {
    issues.push({ level: 'warning', code: 'W011', message: 'Buyer street address format may be invalid (max 100 characters)', field: 'buyer.street' });
  }

  if (!data.buyer.city?.trim()) {
    issues.push({ level: 'error', code: 'E017', message: 'Buyer city is required', field: 'buyer.city' });
  }

  if (!data.buyer.postalCode?.trim()) {
    issues.push({ level: 'error', code: 'E018', message: 'Buyer postal code is required', field: 'buyer.postalCode' });
  }

  // ============= LINE ITEMS VALIDATION =============
  if (!data.lines || data.lines.length === 0) {
    issues.push({ level: 'error', code: 'E019', message: 'At least one line item is required', field: 'lines' });
  } else {
    data.lines.forEach((line, index) => {
      if (!line.description?.trim()) {
        issues.push({ level: 'error', code: 'E020', message: `Line ${index + 1}: Description is required`, field: `lines[${index}].description` });
      }

      if (line.quantity <= 0) {
        issues.push({ level: 'error', code: 'E021', message: `Line ${index + 1}: Quantity must be greater than 0`, field: `lines[${index}].quantity` });
      } else if (!Validators.validateQuantity(line.quantity).isValid) {
        issues.push({ level: 'error', code: 'E022', message: `Line ${index + 1}: Quantity format is invalid`, field: `lines[${index}].quantity` });
      }

      if (line.unitPrice <= 0) {
        issues.push({ level: 'error', code: 'E023', message: `Line ${index + 1}: Unit price must be greater than 0`, field: `lines[${index}].unitPrice` });
      } else if (!Validators.validateAmount(line.unitPrice).isValid) {
        issues.push({ level: 'error', code: 'E024', message: `Line ${index + 1}: Unit price format is invalid`, field: `lines[${index}].unitPrice` });
      }

      if (!Validators.validateTaxRate(line.taxRate).isValid) {
        issues.push({ level: 'error', code: 'E025', message: `Line ${index + 1}: Tax rate is invalid`, field: `lines[${index}].taxRate` });
      }

      if (line.discountRate < 0 || line.discountRate > 100) {
        issues.push({ level: 'error', code: 'E026', message: `Line ${index + 1}: Discount rate must be between 0 and 100`, field: `lines[${index}].discountRate` });
      }

      if (line.fodec && line.taxRate > 0) {
        issues.push({ level: 'warning', code: 'W002', message: `Line ${index + 1}: FODEC with VAT may apply differently`, field: `lines[${index}].fodec` });
      }
    });
  }

  // ============= PAYMENT INFO VALIDATION =============
  if (!data.paymentMeans) {
    issues.push({ level: 'error', code: 'E027', message: 'Payment method is required', field: 'paymentMeans' });
  }

  // RIB validation for wire transfers
  if (data.paymentMeans === 'I-114') {
    if (!data.bankRib?.trim()) {
      issues.push({ level: 'error', code: 'E028', message: 'Bank RIB is required for wire transfers', field: 'bankRib' });
    } else if (!Validators.validateRib(data.bankRib).isValid) {
      issues.push({ level: 'error', code: 'E029', message: 'Bank RIB checksum is invalid (must be 20 digits with valid MOD 97)', field: 'bankRib' });
    }
  }

  // ============= DATES VALIDATION =============
  if (data.dueDate && !Validators.validateDateFormat(data.dueDate).isValid) {
    issues.push({ level: 'error', code: 'E030', message: 'Due date format must be YYYY-MM-DD', field: 'dueDate' });
  }

  if (data.deliveryDate && !Validators.validateDateFormat(data.deliveryDate).isValid) {
    issues.push({ level: 'error', code: 'E031', message: 'Delivery date format must be YYYY-MM-DD', field: 'deliveryDate' });
  }

  if (data.dispatchDate && !Validators.validateDateFormat(data.dispatchDate).isValid) {
    issues.push({ level: 'error', code: 'E032', message: 'Dispatch date format must be YYYY-MM-DD', field: 'dispatchDate' });
  }

  // Date logic: Due date should be after invoice date
  if (data.dueDate && data.invoiceDate) {
    if (new Date(data.dueDate) < new Date(data.invoiceDate)) {
      issues.push({ level: 'warning', code: 'W003', message: 'Due date is before invoice date', field: 'dueDate' });
    }
  }

  // ============= CONTACT INFO VALIDATION =============
  if (data.supplier.email && !Validators.validateEmail(data.supplier.email).isValid) {
    issues.push({ level: 'warning', code: 'W004', message: 'Supplier email format is invalid', field: 'supplier.email' });
  }

  if (data.supplier.phone && !Validators.validatePhone(data.supplier.phone).isValid) {
    issues.push({ level: 'warning', code: 'W005', message: 'Supplier phone format is invalid', field: 'supplier.phone' });
  }

  if (data.buyer.email && !Validators.validateEmail(data.buyer.email).isValid) {
    issues.push({ level: 'warning', code: 'W006', message: 'Buyer email format is invalid', field: 'buyer.email' });
  }

  if (data.buyer.phone && !Validators.validatePhone(data.buyer.phone).isValid) {
    issues.push({ level: 'warning', code: 'W007', message: 'Buyer phone format is invalid', field: 'buyer.phone' });
  }

  // ============= OPTIONAL FIELDS VALIDATION =============
  if (data.supplier.rc && !Validators.validateIdentifier(data.supplier.rc, 'I-RC').isValid) {
    issues.push({ level: 'warning', code: 'W008', message: 'Supplier RC (Registration Certificate) format may be invalid', field: 'supplier.rc' });
  }

  if (data.buyer.rc && !Validators.validateIdentifier(data.buyer.rc, 'I-RC').isValid) {
    issues.push({ level: 'warning', code: 'W009', message: 'Buyer RC (Registration Certificate) format may be invalid', field: 'buyer.rc' });
  }

  // ============= AMOUNT PRECISION =============
  data.lines.forEach((line, index) => {
    const totalAmount = line.quantity * line.unitPrice;
    // Check decimal places (max 3 for Tunisian Dinar)
    if (totalAmount.toString().split('.')[1]?.length > 3) {
      issues.push({ level: 'warning', code: 'W010', message: `Line ${index + 1}: Amount has more than 3 decimal places`, field: `lines[${index}].unitPrice` });
    }
  });

  // ============= ALLOWANCES & CHARGES =============
  if (data.globalDiscount < 0) {
    issues.push({ level: 'error', code: 'E033', message: 'Global discount cannot be negative', field: 'globalDiscount' });
  }

  if (data.allowances && data.allowances.length > 0) {
    data.allowances.forEach((alc, index) => {
      if (alc.amount < 0) {
        issues.push({ level: 'error', code: 'E034', message: `Allowance ${index + 1}: Amount cannot be negative`, field: `allowances[${index}].amount` });
      }
    });
  }

  // ============= TAX-SPECIFIC RULES =============
  if (data.ircRate && data.ircRate > 0) {
    if (!Validators.validateTaxRate(data.ircRate).isValid) {
      issues.push({ level: 'error', code: 'E035', message: 'IRC rate is invalid', field: 'ircRate' });
    }
  }

  // ============= STAMP DUTY =============
  if (data.stampDuty && !Validators.validateAmount(data.stampDuty).isValid) {
    issues.push({ level: 'error', code: 'E036', message: 'Stamp duty amount is invalid', field: 'stampDuty' });
  }

  // ============= TTN REFERENCE =============
  if (!data.ttnReference?.trim()) {
    issues.push({ level: 'warning', code: 'W011', message: 'TTN reference is not set (required for submission)', field: 'ttnReference' });
  }

  // ============= QR CODE =============
  const totalNetHt = data.lines.reduce((sum, l) => sum + (l.quantity * l.unitPrice * (1 - l.discountRate / 100)), 0);
  const totalTva = data.lines.reduce((sum, l) => {
    const netHt = l.quantity * l.unitPrice * (1 - l.discountRate / 100);
    return sum + (netHt * l.taxRate);
  }, 0);
  
  if (data.qrCodeEnabled && (totalNetHt + totalTva) <= 0) {
    issues.push({ level: 'warning', code: 'W012', message: 'QR code is enabled but invoice total is zero or negative', field: 'qrCodeEnabled' });
  }

  // ============= DOCUMENT TYPE SPECIFIC RULES =============
  if (data.documentType === 'I-32') {
    // Debit note
    if (data.allowances?.some(a => a.type === 'allowance')) {
      issues.push({ level: 'warning', code: 'W013', message: 'Debit notes typically have charges, not allowances', field: 'documentType' });
    }
  } else if (data.documentType === 'I-33') {
    // Credit note
    if (data.allowances?.some(a => a.type === 'charge')) {
      issues.push({ level: 'warning', code: 'W014', message: 'Credit notes typically have allowances, not charges', field: 'documentType' });
    }
  }

  // ============= OPERATIONS NATURE =============
  if (data.operationNature === 'OP-IMPORT' || data.operationNature === 'OP-EXPORT') {
    if (!data.orderReference?.trim()) {
      issues.push({ level: 'warning', code: 'W015', message: 'Import/Export operations should reference purchase orders', field: 'orderReference' });
    }
  }

  const errors = issues.filter(i => i.level === 'error');
  const warnings = issues.filter(i => i.level === 'warning');
  const isCompliant = errors.length === 0;
  const totalIssues = issues.length;
  const score = Math.max(0, 100 - (errors.length * 10 + warnings.length * 5));

  return {
    isCompliant,
    totalIssues,
    errors,
    warnings,
    score
  };
};

export const isInvoiceCompliant = (data: InvoiceData): boolean => {
  return checkInvoiceCompliance(data).isCompliant;
};

export const getComplianceReport = (data: InvoiceData): string => {
  const report = checkInvoiceCompliance(data);
  
  let text = `Compliance Report\n${'='.repeat(50)}\n`;
  text += `Status: ${report.isCompliant ? '✓ COMPLIANT' : '✗ NON-COMPLIANT'}\n`;
  text += `Score: ${report.score}/100\n`;
  text += `Issues: ${report.totalIssues} (${report.errors.length} errors, ${report.warnings.length} warnings)\n\n`;

  if (report.errors.length > 0) {
    text += `ERRORS:\n`;
    report.errors.forEach(err => {
      text += `  • [${err.code}] ${err.message}${err.field ? ` (${err.field})` : ''}\n`;
    });
    text += '\n';
  }

  if (report.warnings.length > 0) {
    text += `WARNINGS:\n`;
    report.warnings.forEach(warn => {
      text += `  ⚠ [${warn.code}] ${warn.message}${warn.field ? ` (${warn.field})` : ''}\n`;
    });
  }

  return text;
};
