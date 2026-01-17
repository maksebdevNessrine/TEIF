/**
 * Invoice Form Comprehensive Validator
 * Validates entire invoice according to TEIF 1.8.8 standards
 * Provides user-friendly error messages and format guidance
 */

import { InvoiceData, InvoiceLine } from '@teif/shared/types';
import * as Validators from '@teif/shared/validation';

export interface FieldError {
  field: string;
  message: string;
  format?: string; // Expected format guidance
  severity: 'error' | 'warning'; // error = must fix, warning = should review
}

export interface ValidationResult {
  isValid: boolean;
  errors: FieldError[];
  warnings: FieldError[];
}

/**
 * Validate a single field with user-friendly messaging
 */
export function validateInvoiceField(fieldPath: string, value: any, invoiceData: InvoiceData): FieldError | null {
  // Handle nested paths like "supplier.name"
  const parts = fieldPath.split('.');
  const field = parts[parts.length - 1];

  // ==================== DOCUMENT METADATA ====================
  if (fieldPath === 'documentNumber') {
    if (!value || value.trim().length === 0) {
      return { field: fieldPath, message: 'Invoice number is required', severity: 'error' };
    }
    const result = Validators.validateInvoiceNumber(value);
    if (!result.isValid) {
      return { field: fieldPath, message: result.error || 'Invalid invoice number', format: 'Alphanumeric with hyphens/slashes only', severity: 'error' };
    }
  }

  if (fieldPath === 'invoiceDate') {
    if (!value || value.trim().length === 0) {
      return { field: fieldPath, message: 'Invoice date is required', severity: 'error' };
    }
    const result = Validators.validateDateFormat(value);
    if (!result.isValid) {
      return { field: fieldPath, message: result.error || 'Invalid date format', format: 'YYYY-MM-DD (e.g., 2025-01-15)', severity: 'error' };
    }
    // Check if date is not in future
    if (new Date(value) > new Date()) {
      return { field: fieldPath, message: 'Invoice date cannot be in the future', severity: 'error' };
    }
  }

  if (fieldPath === 'dueDate') {
    if (!value || value.trim().length === 0) {
      return { field: fieldPath, message: 'Due date is required', severity: 'error' };
    }
    const result = Validators.validateDateFormat(value);
    if (!result.isValid) {
      return { field: fieldPath, message: result.error || 'Invalid date format', format: 'YYYY-MM-DD (e.g., 2025-02-14)', severity: 'error' };
    }
    // Check if due date is after invoice date
    if (invoiceData.invoiceDate && new Date(value) < new Date(invoiceData.invoiceDate)) {
      return { field: fieldPath, message: 'Due date must be after invoice date', severity: 'error' };
    }
  }

  if (fieldPath === 'ttnReference') {
    if (value && value.length > 50) {
      return { field: fieldPath, message: 'TTN reference is too long (max 50 characters)', severity: 'error' };
    }
  }

  // ==================== PARTNER FIELDS (Supplier/Buyer) ====================
  if (fieldPath.includes('supplier.') || fieldPath.includes('buyer.')) {
    const partner = fieldPath.includes('supplier.') ? invoiceData.supplier : invoiceData.buyer;
    const prefix = fieldPath.includes('supplier.') ? 'Supplier' : 'Buyer';

    if (field === 'name') {
      if (!value || value.trim().length === 0) {
        return { field: fieldPath, message: `${prefix} name is required`, severity: 'error' };
      }
      const result = Validators.validateCompanyName(value);
      if (!result.isValid) {
        return { field: fieldPath, message: result.error || `Invalid ${prefix.toLowerCase()} name`, severity: 'error' };
      }
    }

    if (field === 'idValue') {
      if (!value || value.trim().length === 0) {
        return { field: fieldPath, message: `${prefix} identifier is required`, severity: 'error' };
      }
      const result = Validators.validateIdentifier(value, partner.idType);
      if (!result.isValid) {
        const formatMap: Record<string, string> = {
          'I-01': '8-10 digit Tunisian Tax ID',
          'I-02': '8-10 digit Tax ID',
          'I-03': '9 digit SIREN (France)',
          'I-04': 'EU VAT number (e.g., FR12345678901)',
        };
        return { 
          field: fieldPath, 
          message: result.error || `Invalid ${prefix.toLowerCase()} identifier`,
          format: formatMap[partner.idType] || 'See settings for type',
          severity: 'error' 
        };
      }
    }

    if (field === 'street') {
      if (!value || value.trim().length === 0) {
        return { field: fieldPath, message: `${prefix} street address is required`, severity: 'error' };
      }
      const result = Validators.validateStreetAddress(value);
      if (!result.isValid) {
        return { field: fieldPath, message: result.error || `Invalid ${prefix.toLowerCase()} street address`, severity: 'error' };
      }
    }

    if (field === 'city') {
      if (!value || value.trim().length === 0) {
        return { field: fieldPath, message: `${prefix} city is required`, severity: 'error' };
      }
      const result = Validators.validateCity(value);
      if (!result.isValid) {
        return { field: fieldPath, message: result.error || `Invalid ${prefix.toLowerCase()} city`, severity: 'error' };
      }
    }

    if (field === 'postalCode') {
      if (!value || value.trim().length === 0) {
        return { field: fieldPath, message: `${prefix} postal code is required`, severity: 'error' };
      }
      const result = Validators.validatePostalCode(value);
      if (!result.isValid) {
        return { field: fieldPath, message: result.error || `Invalid ${prefix.toLowerCase()} postal code`, format: 'Alphanumeric with spaces/hyphens (max 10 chars)', severity: 'error' };
      }
    }

    if (field === 'email') {
      if (value && !Validators.validateEmail(value).isValid) {
        return { field: fieldPath, message: 'Invalid email address format', format: 'user@example.com', severity: 'error' };
      }
    }

    if (field === 'phone') {
      if (value && !Validators.validatePhone(value).isValid) {
        return { field: fieldPath, message: 'Invalid phone number (must have 8-15 digits)', severity: 'error' };
      }
    }
  }

  // ==================== INVOICE LINES ====================
  if (fieldPath.includes('lines[')) {
    const match = fieldPath.match(/lines\[(\d+)\]/);
    if (!match) return null;

    const lineIndex = parseInt(match[1]);
    const line = invoiceData.lines[lineIndex];

    if (!line) return null;

    if (field === 'description') {
      if (!value || value.trim().length === 0) {
        return { field: fieldPath, message: 'Item description is required', severity: 'error' };
      }
      if (value.length > 250) {
        return { field: fieldPath, message: 'Item description is too long (max 250 characters)', severity: 'error' };
      }
    }

    if (field === 'quantity') {
      const result = Validators.validateQuantity(value);
      if (!result.isValid) {
        return { field: fieldPath, message: result.error || 'Invalid quantity', format: 'Positive number', severity: 'error' };
      }
    }

    if (field === 'unitPrice') {
      const result = Validators.validateAmount(value);
      if (!result.isValid) {
        return { field: fieldPath, message: result.error || 'Invalid unit price', format: '0 to 9999999999.99999 (max 5 decimals)', severity: 'error' };
      }
      if (value < 0) {
        return { field: fieldPath, message: 'Unit price cannot be negative', severity: 'error' };
      }
    }

    if (field === 'discountRate') {
      if (value < 0 || value > 100) {
        return { field: fieldPath, message: 'Discount rate must be between 0 and 100%', format: '0-100 (percentage)', severity: 'error' };
      }
    }

    if (field === 'taxRate') {
      const result = Validators.validateTaxRate(value);
      if (!result.isValid) {
        return { field: fieldPath, message: result.error || 'Invalid tax rate', format: '0-1 (0-100%, standard: 0/0.07/0.13/0.19)', severity: 'error' };
      }
      if (result.warning) {
        return { field: fieldPath, message: result.warning, severity: 'warning' };
      }
    }
  }

  // ==================== FINANCIAL FIELDS ====================
  if (fieldPath === 'globalDiscount') {
    const result = Validators.validateAmount(value);
    if (!result.isValid) {
      return { field: fieldPath, message: result.error || 'Invalid global discount', format: '0 to 9999999999.99999', severity: 'error' };
    }
    if (value < 0) {
      return { field: fieldPath, message: 'Global discount cannot be negative', severity: 'error' };
    }
  }

  if (fieldPath === 'stampDuty') {
    const result = Validators.validateAmount(value);
    if (!result.isValid) {
      return { field: fieldPath, message: result.error || 'Invalid stamp duty', format: '0 to 9999999999.99999', severity: 'error' };
    }
    if (value < 0) {
      return { field: fieldPath, message: 'Stamp duty cannot be negative', severity: 'error' };
    }
  }

  // ==================== OPTIONAL FIELDS ====================
  if (fieldPath === 'bankRib') {
    if (value) {
      const result = Validators.validateRib(value);
      if (!result.isValid) {
        return { field: fieldPath, message: result.error || 'Invalid RIB', format: '20 digits (MOD 97 checksum)', severity: 'error' };
      }
    }
  }

  if (fieldPath === 'signatureDate') {
    if (value) {
      const result = Validators.validateSignatureDateFormat(value);
      if (!result.isValid) {
        return { field: fieldPath, message: result.error || 'Invalid signature date', format: 'DDMMyyHHmm (e.g., 1001261430)', severity: 'error' };
      }
    }
  }

  return null;
}

/**
 * Validate entire invoice form
 * Returns all errors and warnings found
 */
export function validateInvoiceData(data: InvoiceData): ValidationResult {
  const errors: FieldError[] = [];
  const warnings: FieldError[] = [];

  // ==================== REQUIRED FIELDS ====================
  
  // Document metadata
  const docError = validateInvoiceField('documentNumber', data.documentNumber, data);
  if (docError) (docError.severity === 'error' ? errors : warnings).push(docError);

  const dateError = validateInvoiceField('invoiceDate', data.invoiceDate, data);
  if (dateError) (dateError.severity === 'error' ? errors : warnings).push(dateError);

  const dueError = validateInvoiceField('dueDate', data.dueDate, data);
  if (dueError) (dueError.severity === 'error' ? errors : warnings).push(dueError);

  // Supplier validation
  const supplierErrors = validatePartnerData('supplier', data.supplier, data);
  errors.push(...supplierErrors.filter(e => e.severity === 'error'));
  warnings.push(...supplierErrors.filter(e => e.severity === 'warning'));

  // Buyer validation
  const buyerErrors = validatePartnerData('buyer', data.buyer, data);
  errors.push(...buyerErrors.filter(e => e.severity === 'error'));
  warnings.push(...buyerErrors.filter(e => e.severity === 'warning'));

  // Lines validation
  if (!data.lines || data.lines.length === 0) {
    errors.push({ field: 'lines', message: 'At least one invoice line is required', severity: 'error' });
  } else {
    data.lines.forEach((line, index) => {
      const lineErrors = validateInvoiceLine(line, index, data);
      errors.push(...lineErrors.filter(e => e.severity === 'error'));
      warnings.push(...lineErrors.filter(e => e.severity === 'warning'));
    });
  }

  // Optional fields
  if (data.bankRib) {
    const ribError = validateInvoiceField('bankRib', data.bankRib, data);
    if (ribError) (ribError.severity === 'error' ? errors : warnings).push(ribError);
  }

  if (data.signatureDate) {
    const sigError = validateInvoiceField('signatureDate', data.signatureDate, data);
    if (sigError) (sigError.severity === 'error' ? errors : warnings).push(sigError);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate partner (supplier or buyer)
 */
function validatePartnerData(partnerType: 'supplier' | 'buyer', partner: any, invoice: InvoiceData): FieldError[] {
  const errors: FieldError[] = [];

  const nameError = validateInvoiceField(`${partnerType}.name`, partner.name, invoice);
  if (nameError) errors.push(nameError);

  const idError = validateInvoiceField(`${partnerType}.idValue`, partner.idValue, invoice);
  if (idError) errors.push(idError);

  const streetError = validateInvoiceField(`${partnerType}.street`, partner.street, invoice);
  if (streetError) errors.push(streetError);

  const cityError = validateInvoiceField(`${partnerType}.city`, partner.city, invoice);
  if (cityError) errors.push(cityError);

  const postalError = validateInvoiceField(`${partnerType}.postalCode`, partner.postalCode, invoice);
  if (postalError) errors.push(postalError);

  if (partner.email) {
    const emailError = validateInvoiceField(`${partnerType}.email`, partner.email, invoice);
    if (emailError) errors.push(emailError);
  }

  if (partner.phone) {
    const phoneError = validateInvoiceField(`${partnerType}.phone`, partner.phone, invoice);
    if (phoneError) errors.push(phoneError);
  }

  return errors;
}

/**
 * Validate invoice line item
 */
function validateInvoiceLine(line: InvoiceLine, index: number, invoice: InvoiceData): FieldError[] {
  const errors: FieldError[] = [];

  const descError = validateInvoiceField(`lines[${index}].description`, line.description, invoice);
  if (descError) errors.push(descError);

  const qtyError = validateInvoiceField(`lines[${index}].quantity`, line.quantity, invoice);
  if (qtyError) errors.push(qtyError);

  const priceError = validateInvoiceField(`lines[${index}].unitPrice`, line.unitPrice, invoice);
  if (priceError) errors.push(priceError);

  const discountError = validateInvoiceField(`lines[${index}].discountRate`, line.discountRate, invoice);
  if (discountError) errors.push(discountError);

  const taxError = validateInvoiceField(`lines[${index}].taxRate`, line.taxRate, invoice);
  if (taxError) errors.push(taxError);

  return errors;
}

/**
 * Get error for a specific field
 * Returns first matching error or warning
 */
export function getFieldError(fieldPath: string, data: InvoiceData): FieldError | null {
  const validation = validateInvoiceData(data);
  return validation.errors.find(e => e.field === fieldPath) || validation.warnings.find(e => e.field === fieldPath) || null;
}

/**
 * Check if field has error
 */
export function hasFieldError(fieldPath: string, data: InvoiceData): boolean {
  const validation = validateInvoiceData(data);
  return validation.errors.some(e => e.field === fieldPath);
}
