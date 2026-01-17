/**
 * ConditionalValidation.ts
 * 
 * Validation helper that respects conditional field visibility
 * Hidden fields should not trigger validation errors
 */

import { InvoiceData, InvoiceLine } from '@teif/shared/types';
import { isFieldVisible, ConditionalFieldsRules } from './ConditionalFieldsStrategy';
import * as Validators from '@teif/shared/validation';

export interface ConditionalValidationResult {
  isValid: boolean;
  error?: string;
  hidden?: boolean; // true if field is hidden and validation was skipped
}

/**
 * Validate a field with visibility check
 * If field is not visible, validation is skipped (returns valid)
 */
export function validateFieldConditionally(
  fieldName: string,
  value: any,
  data: InvoiceData
): ConditionalValidationResult {
  // Check if field should be visible
  if (!isFieldVisible(fieldName, data)) {
    return { isValid: true, hidden: true };
  }

  // Validate based on field type
  switch (fieldName) {
    case 'dueDate':
      if (!value) return { isValid: true }; // Optional
      return validateDueDateConditionally(value, data);

    case 'deliveryDate':
      if (!value) return { isValid: true }; // Optional
      return validateDeliveryDateConditionally(value, data);

    case 'dispatchDate':
      if (!value) return { isValid: true }; // Optional
      return validateDispatchDateConditionally(value, data);

    case 'paymentDate':
      if (!value) return { isValid: true }; // Optional
      return validatePaymentDateConditionally(value, data);

    case 'periodStart':
    case 'periodEnd':
      if (!value) return { isValid: true }; // Optional
      return Validators.validateDateFormat(value);

    case 'bankRib':
      if (!value && ConditionalFieldsRules.showRib(data)) {
        return { isValid: false, error: 'RIB is required for wire transfers' };
      }
      if (value) return Validators.validateRib(value);
      return { isValid: true };

    case 'bankCode':
      if (!value && ConditionalFieldsRules.showBankCode(data)) {
        return { isValid: false, error: 'Bank code is required' };
      }
      return { isValid: true };

    case 'bankName':
      if (!value && ConditionalFieldsRules.showBankName(data)) {
        return { isValid: false, error: 'Bank name is required' };
      }
      return { isValid: true };

    case 'checkNumber':
      if (!value && ConditionalFieldsRules.showCheckNumber(data)) {
        return { isValid: false, error: 'Check number is required' };
      }
      return { isValid: true };

    case 'cardType':
      if (!value && ConditionalFieldsRules.showCardDetails(data)) {
        return { isValid: false, error: 'Card type is required' };
      }
      return { isValid: true };

    case 'cardLast4':
      if (!value && ConditionalFieldsRules.showCardDetails(data)) {
        return { isValid: false, error: 'Last 4 card digits are required' };
      }
      if (value && !/^\d{4}$/.test(value)) {
        return { isValid: false, error: 'Must be exactly 4 digits' };
      }
      return { isValid: true };

    case 'postalAccountNumber':
      if (!value && ConditionalFieldsRules.showPostalDetails(data)) {
        return { isValid: false, error: 'Postal account number is required' };
      }
      return { isValid: true };

    case 'postalAccountOwner':
      if (!value && ConditionalFieldsRules.showPostalDetails(data)) {
        return { isValid: false, error: 'Account owner name is required' };
      }
      return { isValid: true };

    case 'postalBranchCode':
      if (!value && ConditionalFieldsRules.showPostalDetails(data)) {
        return { isValid: false, error: 'Postal branch code is required' };
      }
      return { isValid: true };

    case 'orderReference':
      if (!value && ConditionalFieldsRules.showOrderReference(data)) {
        return { isValid: false, error: 'Order reference is required' };
      }
      return { isValid: true };

    case 'contractReference':
      if (!value && ConditionalFieldsRules.showContractReference(data)) {
        return { isValid: false, error: 'Contract reference is required for public contracts' };
      }
      return { isValid: true };

    default:
      return { isValid: true };
  }
}

/**
 * Validate due date with conditional business rules
 */
function validateDueDateConditionally(value: string, data: InvoiceData): ConditionalValidationResult {
  const dateVal = Validators.validateDateFormat(value);
  if (!dateVal.isValid) {
    return dateVal as ConditionalValidationResult;
  }

  // Due date must be >= invoice date
  try {
    const dueDate = new Date(value);
    const invoiceDate = new Date(data.invoiceDate);
    if (dueDate < invoiceDate) {
      return {
        isValid: false,
        error: 'Due date must be on or after invoice date'
      };
    }
  } catch (e) {
    return { isValid: false, error: 'Invalid date format' };
  }

  return { isValid: true };
}

/**
 * Validate delivery date with conditional business rules
 */
function validateDeliveryDateConditionally(value: string, data: InvoiceData): ConditionalValidationResult {
  const dateVal = Validators.validateDateFormat(value);
  if (!dateVal.isValid) {
    return dateVal as ConditionalValidationResult;
  }

  // Delivery date should be >= invoice date
  try {
    const deliveryDate = new Date(value);
    const invoiceDate = new Date(data.invoiceDate);
    if (deliveryDate < invoiceDate) {
      return {
        isValid: false,
        error: 'Delivery date cannot be before invoice date'
      };
    }
  } catch (e) {
    return { isValid: false, error: 'Invalid date format' };
  }

  return { isValid: true };
}

/**
 * Validate dispatch date with conditional business rules
 */
function validateDispatchDateConditionally(value: string, data: InvoiceData): ConditionalValidationResult {
  const dateVal = Validators.validateDateFormat(value);
  if (!dateVal.isValid) {
    return dateVal as ConditionalValidationResult;
  }

  return { isValid: true };
}

/**
 * Validate payment date with conditional business rules
 */
function validatePaymentDateConditionally(value: string, data: InvoiceData): ConditionalValidationResult {
  const dateVal = Validators.validateDateFormat(value);
  if (!dateVal.isValid) {
    return dateVal as ConditionalValidationResult;
  }

  return { isValid: true };
}

/**
 * Validate service period dates with conditional business rules
 */
export function validateServicePeriodConditionally(
  periodStart: string,
  periodEnd: string,
  data: InvoiceData
): ConditionalValidationResult {
  // Skip if not visible
  if (!ConditionalFieldsRules.showServicePeriod(data)) {
    return { isValid: true, hidden: true };
  }

  // Both dates are optional, but if one exists, validate
  if (periodStart || periodEnd) {
    if (!periodStart || !periodEnd) {
      return {
        isValid: false,
        error: 'Both service period start and end dates are required when specified'
      };
    }

    const startVal = Validators.validateDateFormat(periodStart);
    if (!startVal.isValid) return startVal;

    const endVal = Validators.validateDateFormat(periodEnd);
    if (!endVal.isValid) return endVal;

    try {
      const start = new Date(periodStart);
      const end = new Date(periodEnd);
      if (end <= start) {
        return {
          isValid: false,
          error: 'Service period end date must be after start date'
        };
      }
    } catch (e) {
      return { isValid: false, error: 'Invalid date format' };
    }
  }

  return { isValid: true };
}

/**
 * Validate line item FODEC field conditionally
 */
export function validateLineFodecConditionally(
  fodec: boolean,
  data: InvoiceData
): ConditionalValidationResult {
  // FODEC is only applicable for goods
  if (!ConditionalFieldsRules.showFodec(data) && fodec) {
    return {
      isValid: false,
      error: 'FODEC is only applicable to goods, not services'
    };
  }
  return { isValid: true };
}

/**
 * Validate line item exemption reason conditionally
 */
export function validateLineExemptionConditionally(
  taxRate: number,
  exemptionReason: string | undefined,
  data: InvoiceData
): ConditionalValidationResult {
  // If tax rate is 0, exemption reason is required
  if (taxRate === 0) {
    if (!exemptionReason || exemptionReason.trim().length === 0) {
      return {
        isValid: false,
        error: 'Exemption reason (I-110) is required for 0% tax rate'
      };
    }
  }

  return { isValid: true };
}

/**
 * Validate line item conditionally
 */
export function validateLineConditionally(
  line: InvoiceLine,
  data: InvoiceData
): ConditionalValidationResult {
  // Validate FODEC conditionally
  const fodecVal = validateLineFodecConditionally(line.fodec, data);
  if (!fodecVal.isValid) return fodecVal;

  // Validate exemption reason conditionally
  const exemptionVal = validateLineExemptionConditionally(line.taxRate, line.exemptionReason, data);
  if (!exemptionVal.isValid) return exemptionVal;

  // Validate item code if mandatory for this operation type
  if (ConditionalFieldsRules.isItemCodeMandatory(data)) {
    if (!line.itemCode || line.itemCode.trim().length === 0) {
      return {
        isValid: false,
        error: 'Item code is required for this operation type'
      };
    }
  }

  return { isValid: true };
}

/**
 * Check if invoice requires service period dates
 */
export function requiresServicePeriod(data: InvoiceData): boolean {
  return ConditionalFieldsRules.showServicePeriod(data);
}

/**
 * Check if invoice requires banking details
 */
export function requiresBankingDetails(data: InvoiceData): boolean {
  return ConditionalFieldsRules.showBankingDetails(data);
}

/**
 * Check if invoice requires delivery information
 */
export function requiresDeliveryInfo(data: InvoiceData): boolean {
  return ConditionalFieldsRules.showDeliveryInfo(data);
}

/**
 * Get all conditional validation errors for the entire invoice
 */
export function getConditionalValidationErrors(
  data: InvoiceData
): Array<{ field: string; error: string }> {
  const errors: Array<{ field: string; error: string }> = [];

  // Validate service period if required
  if (ConditionalFieldsRules.showServicePeriod(data)) {
    const periodVal = validateServicePeriodConditionally(
      data.periodStart || '',
      data.periodEnd || '',
      data
    );
    if (!periodVal.isValid && periodVal.error) {
      errors.push({ field: 'servicePeriod', error: periodVal.error });
    }
  }

  // Validate banking details if required
  if (ConditionalFieldsRules.showRib(data)) {
    const ribVal = validateFieldConditionally('bankRib', data.bankRib, data);
    if (!ribVal.isValid && ribVal.error) {
      errors.push({ field: 'bankRib', error: ribVal.error });
    }
  }

  // Validate line items conditionally
  (data.lines || []).forEach((line, idx) => {
    const lineVal = validateLineConditionally(line, data);
    if (!lineVal.isValid && lineVal.error) {
      errors.push({ field: `lines[${idx}]`, error: lineVal.error });
    }
  });

  return errors;
}
