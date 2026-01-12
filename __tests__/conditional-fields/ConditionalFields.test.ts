/**
 * ConditionalFields.test.ts
 * 
 * Comprehensive tests for conditional field visibility rules
 * Covers all business logic scenarios and edge cases
 */

import { describe, it, expect } from 'vitest';
import { InvoiceData } from '../../types';
import { ConditionalFieldsRules, getConditionalFieldsVisibility } from '../../services/ConditionalFieldsStrategy';
import {
  validateFieldConditionally,
  validateServicePeriodConditionally,
  validateLineFodecConditionally,
  validateLineExemptionConditionally,
  getConditionalValidationErrors
} from '../../services/ConditionalValidation';

// ============================================
// MOCK DATA
// ============================================

const mockInvoiceData: InvoiceData = {
  documentType: 'I-11',
  documentNumber: 'F-2024-001',
  invoiceDate: '2024-01-15',
  dueDate: '2024-02-15',
  operationNature: 'GOODS',
  currency: 'TND',
  paymentMeans: 'I-114',
  supplier: {
    idType: 'I-01',
    idValue: '0123456ABC000',
    name: 'SUPPLIER CORP',
    addressDescription: 'Rue Test 123',
    street: 'Rue Test',
    city: 'Tunis',
    postalCode: '1000',
    country: 'TN'
  },
  buyer: {
    idType: 'I-02',
    idValue: '12345678',
    name: 'BUYER LLC',
    addressDescription: 'Rue Client 456',
    street: 'Rue Client',
    city: 'Sfax',
    postalCode: '3000',
    country: 'TN'
  },
  lines: [
    {
      id: 'line1',
      itemCode: 'PROD-001',
      description: 'Product A',
      quantity: 10,
      unit: 'UNIT',
      unitPrice: 100,
      discountRate: 0,
      taxRate: 0.19,
      fodec: false
    }
  ]
};

// ============================================
// CONDITIONAL FIELD VISIBILITY TESTS
// ============================================

describe('Conditional Fields - Operation Nature Rules', () => {
  it('COND_001: Should show service period (I-36) only for SERVICES', () => {
    const goods = { ...mockInvoiceData, operationNature: 'GOODS' as const };
    const services = { ...mockInvoiceData, operationNature: 'SERVICES' as const };
    const mixed = { ...mockInvoiceData, operationNature: 'MIXED' as const };

    expect(ConditionalFieldsRules.showServicePeriod(goods)).toBe(false);
    expect(ConditionalFieldsRules.showServicePeriod(services)).toBe(true);
    expect(ConditionalFieldsRules.showServicePeriod(mixed)).toBe(true);
  });

  it('COND_002: Should show delivery date only for GOODS and MIXED', () => {
    const goods = { ...mockInvoiceData, operationNature: 'GOODS' as const };
    const services = { ...mockInvoiceData, operationNature: 'SERVICES' as const };
    const mixed = { ...mockInvoiceData, operationNature: 'MIXED' as const };

    expect(ConditionalFieldsRules.showDeliveryDate(goods)).toBe(true);
    expect(ConditionalFieldsRules.showDeliveryDate(services)).toBe(false);
    expect(ConditionalFieldsRules.showDeliveryDate(mixed)).toBe(true);
  });

  it('COND_003: Should show dispatch date only for GOODS and MIXED', () => {
    const goods = { ...mockInvoiceData, operationNature: 'GOODS' as const };
    const services = { ...mockInvoiceData, operationNature: 'SERVICES' as const };

    expect(ConditionalFieldsRules.showDispatchDate(goods)).toBe(true);
    expect(ConditionalFieldsRules.showDispatchDate(services)).toBe(false);
  });

  it('COND_004: Should show FODEC only for GOODS and MIXED', () => {
    const goods = { ...mockInvoiceData, operationNature: 'GOODS' as const };
    const services = { ...mockInvoiceData, operationNature: 'SERVICES' as const };
    const mixed = { ...mockInvoiceData, operationNature: 'MIXED' as const };

    expect(ConditionalFieldsRules.showFodec(goods)).toBe(true);
    expect(ConditionalFieldsRules.showFodec(services)).toBe(false);
    expect(ConditionalFieldsRules.showFodec(mixed)).toBe(true);
  });
});

describe('Conditional Fields - Document Type Rules', () => {
  it('COND_005: Should hide due date for Purchase Orders (I-16)', () => {
    const po = { ...mockInvoiceData, documentType: 'I-16' as const };
    const invoice = { ...mockInvoiceData, documentType: 'I-11' as const };

    expect(ConditionalFieldsRules.showDueDate(po)).toBe(false);
    expect(ConditionalFieldsRules.showDueDate(invoice)).toBe(true);
  });

  it('COND_006: Should show order reference only for PO and contracts', () => {
    const po = { ...mockInvoiceData, documentType: 'I-16' as const };
    const contract = { ...mockInvoiceData, documentType: 'I-14' as const };
    const invoice = { ...mockInvoiceData, documentType: 'I-11' as const };

    expect(ConditionalFieldsRules.showOrderReference(po)).toBe(true);
    expect(ConditionalFieldsRules.showOrderReference(contract)).toBe(true);
    expect(ConditionalFieldsRules.showOrderReference(invoice)).toBe(false);
  });

  it('COND_007: Should show contract reference only for decomptes (I-14)', () => {
    const contract = { ...mockInvoiceData, documentType: 'I-14' as const };
    const invoice = { ...mockInvoiceData, documentType: 'I-11' as const };

    expect(ConditionalFieldsRules.showContractReference(contract)).toBe(true);
    expect(ConditionalFieldsRules.showContractReference(invoice)).toBe(false);
  });

  it('COND_008: Should show credit reason only for credit notes (I-12)', () => {
    const creditNote = { ...mockInvoiceData, documentType: 'I-12' as const };
    const invoice = { ...mockInvoiceData, documentType: 'I-11' as const };

    expect(ConditionalFieldsRules.showCreditReason(creditNote)).toBe(true);
    expect(ConditionalFieldsRules.showCreditReason(invoice)).toBe(false);
  });
});

describe('Conditional Fields - Payment Method Rules', () => {
  it('COND_009: Should show banking details only for wire transfers (I-114)', () => {
    const wire = { ...mockInvoiceData, paymentMeans: 'I-114' as const };
    const check = { ...mockInvoiceData, paymentMeans: 'I-117' as const };
    const cash = { ...mockInvoiceData, paymentMeans: 'I-116' as const };

    expect(ConditionalFieldsRules.showBankingDetails(wire)).toBe(true);
    expect(ConditionalFieldsRules.showBankingDetails(check)).toBe(false);
    expect(ConditionalFieldsRules.showBankingDetails(cash)).toBe(false);
  });

  it('COND_010: Should show check number only for check payments (I-117)', () => {
    const check = { ...mockInvoiceData, paymentMeans: 'I-117' as const };
    const wire = { ...mockInvoiceData, paymentMeans: 'I-114' as const };

    expect(ConditionalFieldsRules.showCheckNumber(check)).toBe(true);
    expect(ConditionalFieldsRules.showCheckNumber(wire)).toBe(false);
  });

  it('COND_011: Should show card details only for card payments (I-118)', () => {
    const card = { ...mockInvoiceData, paymentMeans: 'I-118' as const };
    const wire = { ...mockInvoiceData, paymentMeans: 'I-114' as const };

    expect(ConditionalFieldsRules.showCardDetails(card)).toBe(true);
    expect(ConditionalFieldsRules.showCardDetails(wire)).toBe(false);
  });
});

describe('Conditional Fields - Partner ID Type Rules', () => {
  it('COND_012: Should show RC and Capital for MF partners (I-01)', () => {
    const businessSupplier = {
      ...mockInvoiceData,
      supplier: { ...mockInvoiceData.supplier, idType: 'I-01' as const }
    };
    const personSupplier = {
      ...mockInvoiceData,
      supplier: { ...mockInvoiceData.supplier, idType: 'I-02' as const }
    };

    expect(ConditionalFieldsRules.showSupplierRC(businessSupplier)).toBe(true);
    expect(ConditionalFieldsRules.showSupplierRC(personSupplier)).toBe(false);
    expect(ConditionalFieldsRules.showSupplierCapital(businessSupplier)).toBe(true);
    expect(ConditionalFieldsRules.showSupplierCapital(personSupplier)).toBe(false);
  });

  it('COND_013: Should show RC for non-Tunisian MF (I-04)', () => {
    const nonTunisianBiz = {
      ...mockInvoiceData,
      supplier: { ...mockInvoiceData.supplier, idType: 'I-04' as const }
    };

    expect(ConditionalFieldsRules.showSupplierRC(nonTunisianBiz)).toBe(true);
    expect(ConditionalFieldsRules.showSupplierCapital(nonTunisianBiz)).toBe(true);
  });
});

describe('Conditional Fields - Tax Rate Rules', () => {
  it('COND_014: Should show exemption reason only for 0% tax rate', () => {
    expect(ConditionalFieldsRules.showExemptionReason(0)).toBe(true);
    expect(ConditionalFieldsRules.showExemptionReason(0.07)).toBe(false);
    expect(ConditionalFieldsRules.showExemptionReason(0.13)).toBe(false);
    expect(ConditionalFieldsRules.showExemptionReason(0.19)).toBe(false);
  });
});

// ============================================
// CONDITIONAL VALIDATION TESTS
// ============================================

describe('Conditional Validation - Hidden Fields', () => {
  it('COND_VAL_001: Should skip validation for hidden due date', () => {
    const po = { ...mockInvoiceData, documentType: 'I-16' as const };
    const result = validateFieldConditionally('dueDate', '2024-02-15', po);

    expect(result.isValid).toBe(true);
    expect(result.hidden).toBe(true);
  });

  it('COND_VAL_002: Should validate due date for visible field', () => {
    const invoice = { ...mockInvoiceData, documentType: 'I-11' as const, invoiceDate: '2024-01-15' };
    const result = validateFieldConditionally('dueDate', '2024-02-15', invoice);

    expect(result.isValid).toBe(true);
  });

  it('COND_VAL_003: Should reject due date before invoice date', () => {
    const invoice = { ...mockInvoiceData, invoiceDate: '2024-02-15' };
    const result = validateFieldConditionally('dueDate', '2024-01-15', invoice);

    expect(result.isValid).toBe(false);
    expect(result.error).toContain('must be on or after invoice date');
  });
});

describe('Conditional Validation - Payment Fields', () => {
  it('COND_VAL_004: Should require RIB for wire transfers', () => {
    const wire = { ...mockInvoiceData, paymentMeans: 'I-114' as const };
    const result = validateFieldConditionally('bankRib', '', wire);

    expect(result.isValid).toBe(false);
    expect(result.error).toContain('RIB is required');
  });

  it('COND_VAL_005: Should skip RIB validation for non-wire transfers', () => {
    const check = { ...mockInvoiceData, paymentMeans: 'I-117' as const };
    const result = validateFieldConditionally('bankRib', '', check);

    expect(result.isValid).toBe(true);
    expect(result.hidden).toBe(true);
  });
});

describe('Conditional Validation - Service Period', () => {
  it('COND_VAL_006: Should validate service period for services', () => {
    const services = { ...mockInvoiceData, operationNature: 'SERVICES' as const };
    const result = validateServicePeriodConditionally('2024-01-01', '2024-01-31', services);

    expect(result.isValid).toBe(true);
  });

  it('COND_VAL_007: Should reject end date <= start date', () => {
    const services = { ...mockInvoiceData, operationNature: 'SERVICES' as const };
    const result = validateServicePeriodConditionally('2024-01-15', '2024-01-15', services);

    expect(result.isValid).toBe(false);
    expect(result.error).toContain('end date must be after start date');
  });

  it('COND_VAL_008: Should skip validation for goods operations', () => {
    const goods = { ...mockInvoiceData, operationNature: 'GOODS' as const };
    const result = validateServicePeriodConditionally('', '', goods);

    expect(result.isValid).toBe(true);
    expect(result.hidden).toBe(true);
  });
});

describe('Conditional Validation - Line Items', () => {
  it('COND_VAL_009: Should validate FODEC only for goods', () => {
    const goods = { ...mockInvoiceData, operationNature: 'GOODS' as const };
    const services = { ...mockInvoiceData, operationNature: 'SERVICES' as const };

    expect(validateLineFodecConditionally(true, goods).isValid).toBe(true);
    expect(validateLineFodecConditionally(true, services).isValid).toBe(false);
  });

  it('COND_VAL_010: Should require exemption reason for 0% tax', () => {
    const result = validateLineExemptionConditionally(0, '', mockInvoiceData);

    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Exemption reason');
  });

  it('COND_VAL_011: Should accept valid exemption reason for 0% tax', () => {
    const result = validateLineExemptionConditionally(0, 'Exported goods', mockInvoiceData);

    expect(result.isValid).toBe(true);
  });
});

// ============================================
// COMPREHENSIVE SCENARIO TESTS
// ============================================

describe('Conditional Fields - Complex Scenarios', () => {
  it('COND_SCENARIO_001: Service invoice should hide delivery/dispatch, show period', () => {
    const serviceInvoice = {
      ...mockInvoiceData,
      operationNature: 'SERVICES' as const,
      documentType: 'I-11' as const
    };

    const visibility = getConditionalFieldsVisibility(serviceInvoice);

    expect(visibility.deliveryDate).toBe(false);
    expect(visibility.dispatchDate).toBe(false);
    expect(visibility.servicePeriod).toBe(true);
  });

  it('COND_SCENARIO_002: PO should hide due date, show order reference', () => {
    const po = {
      ...mockInvoiceData,
      documentType: 'I-16' as const
    };

    const visibility = getConditionalFieldsVisibility(po);

    expect(visibility.dueDate).toBe(false);
    expect(visibility.orderReference).toBe(true);
  });

  it('COND_SCENARIO_003: Wire transfer should show all banking fields', () => {
    const wireTransfer = {
      ...mockInvoiceData,
      paymentMeans: 'I-114' as const
    };

    const visibility = getConditionalFieldsVisibility(wireTransfer);

    expect(visibility.rib).toBe(true);
    expect(visibility.bankCode).toBe(true);
    expect(visibility.bankName).toBe(true);
    expect(visibility.checkNumber).toBe(false);
  });

  it('COND_SCENARIO_004: Mixed invoice with contract should show multiple conditions', () => {
    const mixedContract = {
      ...mockInvoiceData,
      operationNature: 'MIXED' as const,
      documentType: 'I-14' as const
    };

    const visibility = getConditionalFieldsVisibility(mixedContract);

    expect(visibility.servicePeriod).toBe(true);
    expect(visibility.deliveryDate).toBe(true);
    expect(visibility.contractReference).toBe(true);
  });
});

// ============================================
// VALIDATION ERROR COLLECTION TESTS
// ============================================

describe('Conditional Validation - Error Collection', () => {
  it('COND_ERRORS_001: Should collect only errors for visible fields', () => {
    const po = {
      ...mockInvoiceData,
      documentType: 'I-16' as const,
      paymentMeans: 'I-103' as const, // Cash - not wire
      bankRib: '' // Missing RIB - but should be hidden since payment method is not wire
    };

    const errors = getConditionalValidationErrors(po);
    // Should not include errors for hidden fields
    const ribError = errors.find(e => e.field === 'bankRib');
    expect(ribError).toBeUndefined();
  });

  it('COND_ERRORS_002: Should require wire transfer fields for wire payment', () => {
    const wireNoRib = {
      ...mockInvoiceData,
      paymentMeans: 'I-114' as const,
      bankRib: ''
    };

    const errors = getConditionalValidationErrors(wireNoRib);
    const ribError = errors.find(e => e.field === 'bankRib');
    expect(ribError).toBeDefined();
  });
});
