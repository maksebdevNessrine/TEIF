/**
 * useConditionalFields.ts
 * 
 * React Hook for managing conditional field visibility in the invoice form
 * Provides easy access to field visibility rules and state management
 */

import { useMemo } from 'react';
import { InvoiceData } from '../types';
import { getConditionalFieldsVisibility, ConditionalFieldsRules } from './ConditionalFieldsStrategy';

interface ConditionalFieldsState {
  // Date visibility
  showDueDate: boolean;
  showDeliveryDate: boolean;
  showDispatchDate: boolean;
  showPaymentDate: boolean;
  showServicePeriod: boolean;

  // Payment visibility
  showBankingDetails: boolean;
  showRib: boolean;
  showBankCode: boolean;
  showBankName: boolean;
  showCheckNumber: boolean;
  showCardDetails: boolean;
  showPostalDetails: boolean;

  // Partner visibility
  showSupplierRC: boolean;
  showBuyerRC: boolean;
  showSupplierCapital: boolean;
  showBuyerCapital: boolean;

  // Document type specific
  showOrderReference: boolean;
  showContractReference: boolean;
  showDeliveryNoteReference: boolean;
  showCreditReason: boolean;
  showPaymentTerms: boolean;
  showDeliveryInfo: boolean;

  // Tax and fiscal
  showStampDuty: boolean;
  showGlobalDiscount: boolean;

  // Sections
  showAllowancesSection: boolean;
  showOptionalDatesSection: boolean;
}

/**
 * Main hook for conditional field visibility
 * 
 * @param data - Current invoice data
 * @param expandedSections - State of collapsed/expanded sections
 * @returns Object with boolean flags for each conditional field
 * 
 * @example
 * const visibility = useConditionalFields(data, expandedSections);
 * return (
 *   <>
 *     {visibility.showDueDate && <DueDateField />}
 *     {visibility.showRib && <RibField />}
 *   </>
 * );
 */
export function useConditionalFields(
  data: InvoiceData,
  expandedSections: Record<string, boolean> = {}
): ConditionalFieldsState {
  return useMemo(() => {
    const visibility = getConditionalFieldsVisibility(data, expandedSections);
    console.log('🔍 DEBUG: useConditionalFields hook called');
    console.log('📊 Invoice Data:', { 
      operationNature: data.operationNature,
      paymentMeans: data.paymentMeans,
      documentType: data.documentType
    });
    console.log('👁️ Visibility State:', visibility);
    return visibility as ConditionalFieldsState;
  }, [data, expandedSections]);
}

/**
 * Determine if FODEC checkbox should be visible for a line item
 */
export function useLineFodecVisibility(data: InvoiceData): boolean {
  return useMemo(() => {
    return ConditionalFieldsRules.showFodec(data);
  }, [data.operationNature]);
}

/**
 * Determine if exemption reason field should be visible for a line
 */
export function useLineExemptionVisibility(taxRate: number): boolean {
  return useMemo(() => {
    return ConditionalFieldsRules.showExemptionReason(taxRate);
  }, [taxRate]);
}

/**
 * Determine if item code is mandatory
 */
export function useIsItemCodeMandatory(data: InvoiceData): boolean {
  return useMemo(() => {
    return ConditionalFieldsRules.isItemCodeMandatory(data);
  }, [data.operationNature]);
}

/**
 * Get a summary of why a field is hidden (for help text)
 */
export function getFieldHiddenReason(fieldName: string, data: InvoiceData): string | null {
  const reasons: Record<string, () => string | null> = {
    dueDate: () => 
      data.documentType === 'I-16' ? 'Not applicable for Purchase Orders' : null,
    
    deliveryDate: () => 
      data.operationNature === 'SERVICES' ? 'Not applicable for services' : null,
    
    dispatchDate: () => 
      data.operationNature === 'SERVICES' ? 'Not applicable for services' : null,
    
    servicePeriod: () => 
      data.operationNature === 'GOODS' ? 'Only applicable for services' : null,
    
    bankingDetails: () => 
      data.paymentMeans !== 'I-114' ? `Select "Virement bancaire" payment method` : null,
    
    rib: () => 
      data.paymentMeans !== 'I-114' ? `Select "Virement bancaire" payment method` : null,
    
    supplierRC: () => 
      (data.supplier?.idType !== 'I-01' && data.supplier?.idType !== 'I-04') 
        ? 'Only for business entities (MF)' : null,
    
    orderReference: () => 
      (data.documentType !== 'I-16' && data.documentType !== 'I-14') 
        ? 'Only for PO and Contract documents' : null,
    
    contractReference: () => 
      data.documentType !== 'I-14' ? 'Only for public contract decomptes' : null,
  };

  const reason = reasons[fieldName];
  return reason ? reason() : null;
}

/**
 * Get all currently visible fields for a given data state
 * Useful for debugging and testing
 */
export function getVisibleFieldsSummary(
  data: InvoiceData,
  expandedSections: Record<string, boolean> = {}
): string[] {
  const visibility = useConditionalFields(data, expandedSections);
  return Object.entries(visibility)
    .filter(([_, visible]) => visible)
    .map(([field, _]) => field);
}

/**
 * Determine the visibility category for a field
 */
export type FieldVisibilityCategory = 'always' | 'conditional' | 'hidden';

export function getFieldVisibilityCategory(
  fieldName: string,
  data: InvoiceData
): FieldVisibilityCategory {
  // Define always-visible fields
  const alwaysVisible = [
    'documentType',
    'documentNumber',
    'invoiceDate',
    'operationNature',
    'paymentMeans',
    'supplierName',
    'buyerName',
  ];

  if (alwaysVisible.includes(fieldName)) {
    return 'always';
  }

  // Check if field is visible based on rules
  const visibility = getConditionalFieldsVisibility(data);
  if (visibility[fieldName as keyof typeof visibility]) {
    return 'conditional';
  }

  return 'hidden';
}

/**
 * Group fields by visibility category
 */
export function groupFieldsByVisibility(
  data: InvoiceData
): Record<FieldVisibilityCategory, string[]> {
  const fields = [
    'dueDate',
    'deliveryDate',
    'dispatchDate',
    'paymentDate',
    'servicePeriod',
    'bankingDetails',
    'rib',
    'bankCode',
    'bankName',
    'checkNumber',
    'cardDetails',
    'supplierRC',
    'buyerRC',
    'supplierCapital',
    'buyerCapital',
    'orderReference',
    'contractReference',
    'deliveryNoteReference',
    'creditReason',
    'stampDuty',
    'globalDiscount',
  ];

  return {
    always: fields.filter(f => getFieldVisibilityCategory(f, data) === 'always'),
    conditional: fields.filter(f => getFieldVisibilityCategory(f, data) === 'conditional'),
    hidden: fields.filter(f => getFieldVisibilityCategory(f, data) === 'hidden'),
  };
}
