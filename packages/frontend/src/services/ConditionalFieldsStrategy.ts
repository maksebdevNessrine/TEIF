import { InvoiceData, OperationNature, DocTypeCode, PaymentMeansCode, IdType } from '@teif/shared/types';

export const FIELD_NAME_TO_VISIBILITY_KEY: Record<string, string> = {
  dueDate: 'dueDate',
  deliveryDate: 'deliveryDate',
  dispatchDate: 'dispatchDate',
  paymentDate: 'paymentDate',
  periodStart: 'periodStart',
  periodEnd: 'periodEnd',
  signatureDate: 'signatureDate',
  otherDate: 'otherDate',
  bankRib: 'rib',
  bankCode: 'bankCode',
  bankName: 'bankName',
  bankAccountOwner: 'bankAccountOwner',
  checkNumber: 'checkNumber',
  cardType: 'cardType',
  cardLast4: 'cardLast4',
  cardReference: 'cardReference',
  postalAccountNumber: 'postalAccountNumber',
  postalBranchCode: 'postalBranchCode',
  postalAccountOwner: 'postalAccountOwner',
  postalServiceName: 'postalServiceName',
  ePaymentGateway: 'ePaymentGateway',
  ePaymentTransactionId: 'ePaymentTransactionId',
  otherPaymentDescription: 'otherPaymentDescription',
  otherPaymentReference: 'otherPaymentReference',
  stampDuty: 'stampDuty',
  globalDiscount: 'globalDiscount',
  ircRate: 'ircRate',
  orderReference: 'orderReference',
  contractReference: 'contractReference',
  deliveryNoteReference: 'deliveryNoteReference',
  supplierCapital: 'supplierCapital',
  buyerCapital: 'buyerCapital',
  supplierRC: 'supplierRC',
  buyerRC: 'buyerRC'
};

export const ConditionalFieldsRules = {
  showDueDate: (data: InvoiceData): boolean => {
    const docType = data.documentType as DocTypeCode;
    return !['I-30', 'I-31'].includes(docType); // Not for receipts
  },

  showDeliveryDate: (data: InvoiceData): boolean => {
    const docType = data.documentType as DocTypeCode;
    return !['I-30', 'I-31'].includes(docType);
  },

  showDispatchDate: (data: InvoiceData): boolean => {
    const docType = data.documentType as DocTypeCode;
    return ['I-32', 'I-33', 'I-34'].includes(docType) || data.operationNature?.includes('DELIVERY');
  },

  showPaymentDate: (data: InvoiceData): boolean => {
    const paymentMeans = data.paymentMeans as PaymentMeansCode;
    return ['I-114', 'I-115'].includes(paymentMeans);
  },

  showServicePeriod: (data: InvoiceData): boolean => {
    const docType = data.documentType as DocTypeCode;
    return ['I-50', 'I-51'].includes(docType); // Service invoices
  },

  showBankingDetails: (data: InvoiceData): boolean => {
    const paymentMeans = data.paymentMeans as PaymentMeansCode;
    return paymentMeans === 'I-114';
  },

  showRib: (data: InvoiceData): boolean => {
    const paymentMeans = data.paymentMeans as PaymentMeansCode;
    return paymentMeans === 'I-114';
  },

  showBankCode: (data: InvoiceData): boolean => {
    const paymentMeans = data.paymentMeans as PaymentMeansCode;
    return paymentMeans === 'I-114';
  },

  showCheckNumber: (data: InvoiceData): boolean => {
    const paymentMeans = data.paymentMeans as PaymentMeansCode;
    return paymentMeans === 'I-117';
  },

  showCardDetails: (data: InvoiceData): boolean => {
    const paymentMeans = data.paymentMeans as PaymentMeansCode;
    return paymentMeans === 'I-118';
  },

  showPostalDetails: (data: InvoiceData): boolean => {
    const paymentMeans = data.paymentMeans as PaymentMeansCode;
    return paymentMeans === 'I-115';
  },

  showEPaymentDetails: (data: InvoiceData): boolean => {
    const paymentMeans = data.paymentMeans as PaymentMeansCode;
    return paymentMeans === 'I-119';
  },

  showOtherPaymentDetails: (data: InvoiceData): boolean => {
    const paymentMeans = data.paymentMeans as PaymentMeansCode;
    return paymentMeans === 'I-120';
  },

  showSupplierRC: (data: InvoiceData): boolean => {
    return data.supplier.idType === 'I-01' || data.supplier.idType === 'I-04';
  },

  showBuyerRC: (data: InvoiceData): boolean => {
    return data.buyer.idType === 'I-01' || data.buyer.idType === 'I-04';
  },

  showSupplierCapital: (data: InvoiceData): boolean => {
    return data.supplier.idType === 'I-04'; // Only for companies
  },

  showBuyerCapital: (data: InvoiceData): boolean => {
    return data.buyer.idType === 'I-04'; // Only for companies
  },

  showPaymentTerms: (data: InvoiceData): boolean => {
    const docType = data.documentType as DocTypeCode;
    return !['I-30', 'I-31'].includes(docType);
  },

  showDeliveryInfo: (data: InvoiceData): boolean => {
    return data.operationNature === 'OP-SUPPLY' || data.operationNature === 'OP-DELIVERY';
  },

  showOrderReference: (data: InvoiceData): boolean => {
    return data.operationNature === 'OP-IMPORT' || data.operationNature === 'OP-SUPPLY';
  },

  showContractReference: (data: InvoiceData): boolean => {
    return data.operationNature !== 'OP-CASH' && data.operationNature !== 'OP-RECEIPT';
  },

  showDeliveryNoteReference: (data: InvoiceData): boolean => {
    return ['OP-SUPPLY', 'OP-DELIVERY'].includes(data.operationNature || 'OP-SUPPLY');
  },

  showStampDuty: (data: InvoiceData): boolean => {
    // Always show stamp duty for regular invoices
    // Hide only for delivery notes (I-30) and receipt notes (I-31)
    const docType = data.documentType as DocTypeCode;
    return !['I-30', 'I-31', 'I-32', 'I-33'].includes(docType);
  },

  showGlobalDiscount: (data: InvoiceData): boolean => {
    return data.lines.length > 0;
  },

  showFodec: (data: InvoiceData): boolean => {
    // FODEC can be applied per item or for invoice
    return true;
  },

  isItemCodeMandatory: (data: InvoiceData): boolean => {
    const docType = data.documentType as DocTypeCode;
    return ['I-50', 'I-51'].includes(docType); // For service invoices
  },

  showBankName: (data: InvoiceData): boolean => {
    const paymentMeans = data.paymentMeans as PaymentMeansCode;
    return paymentMeans === 'I-114';
  },

  showBankAccountOwner: (data: InvoiceData): boolean => {
    const paymentMeans = data.paymentMeans as PaymentMeansCode;
    return paymentMeans === 'I-114';
  }
};

export const getConditionalFieldsVisibility = (data: InvoiceData): Record<string, boolean> => {
  const visibility: Record<string, boolean> = {};
  
  Object.entries(ConditionalFieldsRules).forEach(([ruleName, ruleFunction]) => {
    const fieldName = ruleName.replace(/^show/, '').charAt(0).toLowerCase() + ruleName.replace(/^show/, '').slice(1);
    visibility[`show${ruleName.charAt(3).toUpperCase() + ruleName.slice(4)}`] = ruleFunction(data);
  });

  return visibility;
};

export const isFieldVisible = (fieldName: string, data: InvoiceData): boolean => {
  const visibilityKey = `show${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`;
  const ruleName = Object.keys(ConditionalFieldsRules).find(k => k === visibilityKey);
  
  if (!ruleName) {
    return true; // Default to visible if no rule exists
  }
  
  const rule = ConditionalFieldsRules[ruleName as keyof typeof ConditionalFieldsRules] as (data: InvoiceData) => boolean;
  return rule(data);
};

export const getConditionalValidation = (fieldName: string, validator: (value: any) => { isValid: boolean; error?: string }) => {
  return (value: any, data: InvoiceData) => {
    const isVisible = isFieldVisible(fieldName, data);
    
    if (!isVisible) {
      return { isValid: true, hidden: true };
    }
    
    return { ...validator(value), hidden: false };
  };
};

export const getFieldHiddenReason = (fieldName: string, data: InvoiceData): string | null => {
  if (isFieldVisible(fieldName, data)) {
    return null;
  }

  const docType = data.documentType as DocTypeCode;
  const paymentMeans = data.paymentMeans as PaymentMeansCode;

  // Payment-related field reasons
  if (fieldName === 'bankRib' || fieldName === 'bankCode' || fieldName === 'bankName' || fieldName === 'bankAccountOwner') {
    return `Bank details are only visible for wire transfer (${paymentMeans} selected)`;
  }

  if (fieldName === 'checkNumber') {
    return `Check number is only visible for check payments (${paymentMeans} selected)`;
  }

  if (fieldName === 'cardType' || fieldName === 'cardLast4' || fieldName === 'cardReference') {
    return `Card details are only visible for card payments (${paymentMeans} selected)`;
  }

  if (fieldName === 'postalAccountNumber' || fieldName === 'postalBranchCode') {
    return `Postal account details are only visible for postal payments (${paymentMeans} selected)`;
  }

  if (fieldName === 'ePaymentTransactionId') {
    return `E-payment details are only visible for electronic payments (${paymentMeans} selected)`;
  }

  // Date-related field reasons
  if (fieldName === 'dueDate' || fieldName === 'deliveryDate') {
    return `${fieldName === 'dueDate' ? 'Due date' : 'Delivery date'} is not applicable for ${docType} documents`;
  }

  // Partner-specific reasons
  if (fieldName === 'supplierRC' || fieldName === 'supplierCapital') {
    return `Supplier registration details are only shown for business partners (${data.supplier.idType} selected)`;
  }

  if (fieldName === 'buyerRC' || fieldName === 'buyerCapital') {
    return `Buyer registration details are only shown for business partners (${data.buyer.idType} selected)`;
  }

  // Default reason
  return `This field is not applicable for the current invoice configuration`;
};
