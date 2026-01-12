/**
 * ConditionalFieldsStrategy.ts
 * 
 * Centralized configuration for all conditional field visibility rules
 * Based on TEIF 1.8.8 specifications and business requirements
 * 
 * This module defines WHAT fields should be visible based on form state
 */

import { InvoiceData, OperationNature, DocTypeCode, PaymentMeansCode, IdType } from '../types';

/**
 * Map field names to visibility keys
 * Some fields have different names in the form vs visibility map
 */
const FIELD_NAME_TO_VISIBILITY_KEY: Record<string, string> = {
  'bankRib': 'rib',
  'bankCode': 'bankCode',
  'bankName': 'bankName',
  'checkNumber': 'checkNumber',
  'cardDetails': 'cardDetails',
  'dueDate': 'dueDate',
  'deliveryDate': 'deliveryDate',
  'dispatchDate': 'dispatchDate',
  'paymentDate': 'paymentDate',
  'periodStart': 'servicePeriod',
  'periodEnd': 'servicePeriod',
  'orderReference': 'orderReference',
  'contractReference': 'contractReference',
  'deliveryNoteReference': 'deliveryNoteReference',
  'creditReason': 'creditReason',
};

/**
 * Conditional field visibility rules
 * Each rule is a function that returns true if the field should be visible
 */
export const ConditionalFieldsRules = {
  // ============================================
  // DATE FIELDS
  // ============================================
  
  /** I-32: Due Date - Hidden for Purchase Orders */
  showDueDate: (data: InvoiceData): boolean => {
    return data.documentType !== 'I-16'; // Hide for PO (Bon de commande)
  },

  /** I-33: Delivery Date - Only for goods or mixed operations */
  showDeliveryDate: (data: InvoiceData): boolean => {
    const result = data.operationNature !== 'SERVICES';
    console.log('🔍 showDeliveryDate:', { operationNature: data.operationNature, result });
    return result;
  },

  /** I-34: Dispatch Date - Only for goods operations */
  showDispatchDate: (data: InvoiceData): boolean => {
    const result = data.operationNature !== 'SERVICES';
    console.log('🔍 showDispatchDate:', { operationNature: data.operationNature, result });
    return result;
  },

  /** I-35: Payment Date - Only when payment means is selected */
  showPaymentDate: (data: InvoiceData): boolean => {
    const result = !!data.paymentMeans;
    console.log('🔍 showPaymentDate:', { paymentMeans: data.paymentMeans, result });
    return result;
  },

  /** I-36 Range: Service Period (periodStart/End) - Only for services or mixed */
  showServicePeriod: (data: InvoiceData): boolean => {
    const result = data.operationNature === 'SERVICES' || data.operationNature === 'MIXED';
    console.log('🔍 showServicePeriod:', { operationNature: data.operationNature, result });
    return result;
  },

  // ============================================
  // PAYMENT & BANKING FIELDS
  // ============================================

  /** Show banking details (RIB, Bank Code, Bank Name) only for wire transfers */
  showBankingDetails: (data: InvoiceData): boolean => {
    const result = data.paymentMeans === 'I-114';
    console.log('🔍 showBankingDetails:', { paymentMeans: data.paymentMeans, result });
    return result;
  },

  /** Show RIB field only for wire transfers */
  showRib: (data: InvoiceData): boolean => {
    const result = data.paymentMeans === 'I-114';
    console.log('🔍 showRib:', { paymentMeans: data.paymentMeans, result });
    return result;
  },

  /** Show bank code only for wire transfers */
  showBankCode: (data: InvoiceData): boolean => {
    return data.paymentMeans === 'I-114';
  },

  /** Show bank name only for wire transfers */
  showBankName: (data: InvoiceData): boolean => {
    return data.paymentMeans === 'I-114';
  },

  /** Show check number only for check payments */
  showCheckNumber: (data: InvoiceData): boolean => {
    return data.paymentMeans === 'I-117'; // Chèque
  },

  /** Show card details only for card payments */
  showCardDetails: (data: InvoiceData): boolean => {
    return data.paymentMeans === 'I-118'; // Carte bancaire
  },

  /** Show postal payment details only for postal payments */
  showPostalDetails: (data: InvoiceData): boolean => {
    return data.paymentMeans === 'I-115'; // Paiement postal
  },

  showEPaymentDetails: (data: InvoiceData): boolean => {
    return data.paymentMeans === 'I-119'; // Paiement électronique
  },

  showOtherPaymentDetails: (data: InvoiceData): boolean => {
    return data.paymentMeans === 'I-120'; // Autre
  },

  // ============================================
  // PARTNER INFORMATION FIELDS
  // ============================================

  /** Show RC (Registre Commerce) only for business entities with MF */
  showSupplierRC: (data: InvoiceData): boolean => {
    return data.supplier?.idType === 'I-01' || data.supplier?.idType === 'I-04';
  },

  showBuyerRC: (data: InvoiceData): boolean => {
    return data.buyer?.idType === 'I-01' || data.buyer?.idType === 'I-04';
  },

  /** Show Capital only for business entities with MF */
  showSupplierCapital: (data: InvoiceData): boolean => {
    return data.supplier?.idType === 'I-01' || data.supplier?.idType === 'I-04';
  },

  showBuyerCapital: (data: InvoiceData): boolean => {
    return data.buyer?.idType === 'I-01' || data.buyer?.idType === 'I-04';
  },

  // ============================================
  // LINE ITEM FIELDS
  // ============================================

  /** Show exemption reason (I-110) only when tax rate is 0% */
  showExemptionReason: (taxRate: number): boolean => {
    return taxRate === 0;
  },

  /** Show FODEC checkbox only for goods operations */
  showFodec: (data: InvoiceData): boolean => {
    return data.operationNature !== 'SERVICES';
  },

  /** Make item code mandatory only for goods, optional for services */
  isItemCodeMandatory: (data: InvoiceData): boolean => {
    return data.operationNature !== 'SERVICES';
  },

  /** Item code visibility */
  showItemCode: (): boolean => {
    return true; // Always show
  },

  // ============================================
  // DOCUMENT TYPE SPECIFIC
  // ============================================

  /** Show due date fields (generally not for PO) */
  showPaymentTerms: (data: InvoiceData): boolean => {
    return data.documentType !== 'I-16'; // Hide for Bon de commande
  },

  /** Show delivery/dispatch info for sales documents */
  showDeliveryInfo: (data: InvoiceData): boolean => {
    const nonDeliveryTypes: DocTypeCode[] = ['I-13', 'I-16']; // Honor note, PO
    return !nonDeliveryTypes.includes(data.documentType);
  },

  /** Show order reference for purchase/contract documents */
  showOrderReference: (data: InvoiceData): boolean => {
    return data.documentType === 'I-16' || data.documentType === 'I-14';
  },

  /** Show contract reference only for public contract documents */
  showContractReference: (data: InvoiceData): boolean => {
    return data.documentType === 'I-14'; // Décompte (marché public)
  },

  /** Show delivery note reference for sales documents */
  showDeliveryNoteReference: (data: InvoiceData): boolean => {
    const applicableTypes: DocTypeCode[] = ['I-11', 'I-12', 'I-15'];
    return applicableTypes.includes(data.documentType);
  },

  /** Show credit note reason only for credit notes */
  showCreditReason: (data: InvoiceData): boolean => {
    return data.documentType === 'I-12'; // Facture d'avoir
  },

  // ============================================
  // TAX & FISCAL FIELDS
  // ============================================

  /** Show stamp duty field (applicable to some document types) */
  showStampDuty: (data: InvoiceData): boolean => {
    const stampDutyApplicable: DocTypeCode[] = ['I-11', 'I-12'];
    return stampDutyApplicable.includes(data.documentType);
  },

  /** Show global discount only when invoice has multiple lines */
  showGlobalDiscount: (data: InvoiceData): boolean => {
    return (data.lines || []).length > 1;
  },

  // ============================================
  // CONDITIONAL FIELD GROUPS
  // ============================================

  /** Show entire allowances section only when expanded */
  showAllowancesSection: (expandedSections: Record<string, boolean>): boolean => {
    return expandedSections.allowances === true;
  },

  /** Show entire optional dates section only when expanded */
  showOptionalDatesSection: (expandedSections: Record<string, boolean>): boolean => {
    return expandedSections.optionalDates === true;
  },

  /** Show partner type selectors only in allowances section */
  showPartnerTypes: (expandedSections: Record<string, boolean>): boolean => {
    return expandedSections.allowances === true;
  },
};

/**
 * Get visibility for all conditional fields based on current data state
 */
export function getConditionalFieldsVisibility(
  data: InvoiceData,
  expandedSections: Record<string, boolean> = {}
): Record<string, boolean> {
  return {
    // Date fields
    dueDate: ConditionalFieldsRules.showDueDate(data),
    deliveryDate: ConditionalFieldsRules.showDeliveryDate(data),
    dispatchDate: ConditionalFieldsRules.showDispatchDate(data),
    paymentDate: ConditionalFieldsRules.showPaymentDate(data),
    servicePeriod: ConditionalFieldsRules.showServicePeriod(data),

    // Payment fields
    bankingDetails: ConditionalFieldsRules.showBankingDetails(data),
    rib: ConditionalFieldsRules.showRib(data),
    bankCode: ConditionalFieldsRules.showBankCode(data),
    bankName: ConditionalFieldsRules.showBankName(data),
    checkNumber: ConditionalFieldsRules.showCheckNumber(data),
    cardDetails: ConditionalFieldsRules.showCardDetails(data),
    postalDetails: ConditionalFieldsRules.showPostalDetails(data),
    ePaymentDetails: ConditionalFieldsRules.showEPaymentDetails(data),
    otherPaymentDetails: ConditionalFieldsRules.showOtherPaymentDetails(data),

    // Partner fields
    supplierRC: ConditionalFieldsRules.showSupplierRC(data),
    buyerRC: ConditionalFieldsRules.showBuyerRC(data),
    supplierCapital: ConditionalFieldsRules.showSupplierCapital(data),
    buyerCapital: ConditionalFieldsRules.showBuyerCapital(data),

    // Document type specific
    paymentTerms: ConditionalFieldsRules.showPaymentTerms(data),
    deliveryInfo: ConditionalFieldsRules.showDeliveryInfo(data),
    orderReference: ConditionalFieldsRules.showOrderReference(data),
    contractReference: ConditionalFieldsRules.showContractReference(data),
    deliveryNoteReference: ConditionalFieldsRules.showDeliveryNoteReference(data),
    creditReason: ConditionalFieldsRules.showCreditReason(data),

    // Tax fields
    stampDuty: ConditionalFieldsRules.showStampDuty(data),
    globalDiscount: ConditionalFieldsRules.showGlobalDiscount(data),

    // Sections
    allowancesSection: ConditionalFieldsRules.showAllowancesSection(expandedSections),
    optionalDatesSection: ConditionalFieldsRules.showOptionalDatesSection(expandedSections),
  };
}

/**
 * Check if a field should be validated based on visibility
 * Hidden fields should not trigger validation errors
 */
export function isFieldVisible(fieldName: string, data: InvoiceData): boolean {
  const visibility = getConditionalFieldsVisibility(data);
  const visibilityKey = FIELD_NAME_TO_VISIBILITY_KEY[fieldName] || fieldName;
  return visibility[visibilityKey] !== false; // Default to visible if not specified
}

/**
 * Get conditional validation for a field
 * Returns a validation rule that includes visibility check
 */
export function getConditionalValidation(
  fieldName: string,
  baseValidator: (value: any) => { isValid: boolean; error?: string }
): (value: any, data: InvoiceData) => { isValid: boolean; error?: string } {
  return (value: any, data: InvoiceData) => {
    // If field is not visible, skip validation
    if (!isFieldVisible(fieldName, data)) {
      return { isValid: true }; // Hidden fields pass validation
    }
    
    // Run the base validator
    return baseValidator(value);
  };
}
