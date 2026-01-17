import { useMemo } from 'react';
import { InvoiceData } from '@teif/shared/types';
import { getConditionalFieldsVisibility, isFieldVisible, ConditionalFieldsRules } from './ConditionalFieldsStrategy';

export interface ConditionalFieldsState {
  showDueDate: boolean;
  showDeliveryDate: boolean;
  showDispatchDate: boolean;
  showPaymentDate: boolean;
  showServicePeriod: boolean;
  showBankingDetails: boolean;
  showRib: boolean;
  showBankCode: boolean;
  showCheckNumber: boolean;
  showCardDetails: boolean;
  showPostalDetails: boolean;
  showEPaymentDetails: boolean;
  showOtherPaymentDetails: boolean;
  showSupplierRC: boolean;
  showBuyerRC: boolean;
  showSupplierCapital: boolean;
  showBuyerCapital: boolean;
  showPaymentTerms: boolean;
  showDeliveryInfo: boolean;
  showOrderReference: boolean;
  showContractReference: boolean;
  showDeliveryNoteReference: boolean;
  showStampDuty: boolean;
  showGlobalDiscount: boolean;
  showFodec: boolean;
  isItemCodeMandatory: boolean;
  showBankName: boolean;
  showBankAccountOwner: boolean;
  showCreditReason: boolean;
}

export const useConditionalFields = (data: InvoiceData): ConditionalFieldsState => {
  return useMemo(() => {
    const visibility = getConditionalFieldsVisibility(data);
    return {
      showDueDate: ConditionalFieldsRules.showDueDate(data),
      showDeliveryDate: ConditionalFieldsRules.showDeliveryDate(data),
      showDispatchDate: ConditionalFieldsRules.showDispatchDate(data),
      showPaymentDate: ConditionalFieldsRules.showPaymentDate(data),
      showServicePeriod: ConditionalFieldsRules.showServicePeriod(data),
      showBankingDetails: ConditionalFieldsRules.showBankingDetails(data),
      showRib: ConditionalFieldsRules.showRib(data),
      showBankCode: ConditionalFieldsRules.showBankCode(data),
      showCheckNumber: ConditionalFieldsRules.showCheckNumber(data),
      showCardDetails: ConditionalFieldsRules.showCardDetails(data),
      showPostalDetails: ConditionalFieldsRules.showPostalDetails(data),
      showEPaymentDetails: ConditionalFieldsRules.showEPaymentDetails(data),
      showOtherPaymentDetails: ConditionalFieldsRules.showOtherPaymentDetails(data),
      showSupplierRC: ConditionalFieldsRules.showSupplierRC(data),
      showBuyerRC: ConditionalFieldsRules.showBuyerRC(data),
      showSupplierCapital: ConditionalFieldsRules.showSupplierCapital(data),
      showBuyerCapital: ConditionalFieldsRules.showBuyerCapital(data),
      showPaymentTerms: ConditionalFieldsRules.showPaymentTerms(data),
      showDeliveryInfo: ConditionalFieldsRules.showDeliveryInfo(data),
      showOrderReference: ConditionalFieldsRules.showOrderReference(data),
      showContractReference: ConditionalFieldsRules.showContractReference(data),
      showDeliveryNoteReference: ConditionalFieldsRules.showDeliveryNoteReference(data),
      showStampDuty: ConditionalFieldsRules.showStampDuty(data),
      showGlobalDiscount: ConditionalFieldsRules.showGlobalDiscount(data),
      showFodec: ConditionalFieldsRules.showFodec(data),
      isItemCodeMandatory: ConditionalFieldsRules.isItemCodeMandatory(data),
      showBankName: ConditionalFieldsRules.showBankName(data),
      showBankAccountOwner: ConditionalFieldsRules.showBankAccountOwner(data),
      showCreditReason: data.documentType === 'I-12' // Show for credit notes
    };
  }, [data]);
};

export const useLineFodecVisibility = (data: InvoiceData): boolean => {
  return useMemo(() => {
    return data.lines.some(line => {
      const lineHasVat = line.taxRate > 0;
      return lineHasVat; // FODEC can be used with VAT
    });
  }, [data.lines]);
};

export const useLineExemptionVisibility = (data: InvoiceData): boolean => {
  return useMemo(() => {
    return data.lines.some(line => line.taxRate === 0);
  }, [data.lines]);
};

export const getVisibleFieldsSummary = (data: InvoiceData): string[] => {
  const fields: string[] = [];
  
  if (ConditionalFieldsRules.showDueDate(data)) fields.push('dueDate');
  if (ConditionalFieldsRules.showDeliveryDate(data)) fields.push('deliveryDate');
  if (ConditionalFieldsRules.showDispatchDate(data)) fields.push('dispatchDate');
  if (ConditionalFieldsRules.showPaymentDate(data)) fields.push('paymentDate');
  if (ConditionalFieldsRules.showServicePeriod(data)) fields.push('periodStart', 'periodEnd');
  if (ConditionalFieldsRules.showBankingDetails(data)) fields.push('bankRib', 'bankCode', 'bankName');
  if (ConditionalFieldsRules.showCheckNumber(data)) fields.push('checkNumber');
  if (ConditionalFieldsRules.showCardDetails(data)) fields.push('cardType', 'cardLast4');
  if (ConditionalFieldsRules.showPostalDetails(data)) fields.push('postalAccountNumber', 'postalBranchCode');
  if (ConditionalFieldsRules.showEPaymentDetails(data)) fields.push('ePaymentTransactionId');
  if (ConditionalFieldsRules.showOtherPaymentDetails(data)) fields.push('otherPaymentReference');
  if (ConditionalFieldsRules.showSupplierRC(data)) fields.push('supplierRC');
  if (ConditionalFieldsRules.showBuyerRC(data)) fields.push('buyerRC');
  if (ConditionalFieldsRules.showSupplierCapital(data)) fields.push('supplierCapital');
  if (ConditionalFieldsRules.showBuyerCapital(data)) fields.push('buyerCapital');
  if (ConditionalFieldsRules.showStampDuty(data)) fields.push('stampDuty');
  if (ConditionalFieldsRules.showGlobalDiscount(data)) fields.push('globalDiscount');
  if (ConditionalFieldsRules.showFodec(data)) fields.push('fodec');
  
  return fields;
};

export const getFieldVisibilityCategory = (fieldName: string, data: InvoiceData): 'always' | 'conditional' | 'hidden' => {
  // Always visible
  const alwaysVisible = [
    'documentNumber', 'invoiceDate', 'invoiceType', 'supplier', 'buyer',
    'lines', 'paymentMeans', 'currency', 'language'
  ];
  
  if (alwaysVisible.includes(fieldName)) {
    return 'always';
  }
  
  // Check if field is conditionally visible
  const isVisible = isFieldVisible(fieldName, data);
  
  return isVisible ? 'conditional' : 'hidden';
};

export const groupFieldsByVisibility = (data: InvoiceData): {
  always: string[];
  conditional: string[];
  hidden: string[];
} => {
  const allFields = [
    'documentNumber', 'invoiceDate', 'invoiceType', 'supplier', 'buyer',
    'lines', 'paymentMeans', 'currency', 'language',
    'dueDate', 'deliveryDate', 'dispatchDate', 'paymentDate',
    'bankRib', 'bankCode', 'checkNumber', 'cardType',
    'supplierRC', 'buyerRC', 'supplierCapital', 'buyerCapital',
    'stampDuty', 'globalDiscount', 'fodec'
  ];

  const always: string[] = [];
  const conditional: string[] = [];
  const hidden: string[] = [];

  allFields.forEach(field => {
    const category = getFieldVisibilityCategory(field, data);
    if (category === 'always') always.push(field);
    else if (category === 'conditional') conditional.push(field);
    else hidden.push(field);
  });

  return { always, conditional, hidden };
};
