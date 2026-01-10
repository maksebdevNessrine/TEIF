
export type Language = 'ar' | 'fr' | 'en';
export type IdType = 'I-01' | 'I-02' | 'I-03' | 'I-04';
export type DocTypeCode = 'I-11' | 'I-12' | 'I-13' | 'I-14' | 'I-15' | 'I-16';
export type PaymentMeansCode = 'I-131' | 'I-132' | 'I-133' | 'I-134' | 'I-135' | 'I-136';

export const DOCUMENT_TYPES: Record<DocTypeCode, string> = {
  'I-11': 'Facture',
  'I-12': "Facture d'avoir",
  'I-13': "Note d'honoraire",
  'I-14': "Décompte (marché public)",
  'I-15': "Facture Export",
  'I-16': "Bon de commande"
};

export const PAYMENT_MEANS: Record<PaymentMeansCode, string> = {
  'I-131': 'Espèce',
  'I-132': 'Chèque',
  'I-133': 'Chèque certifié',
  'I-134': 'Prélèvement bancaire',
  'I-135': 'Virement bancaire',
  'I-136': 'Swift'
};

export interface Partner {
  idType: IdType;
  idValue: string;
  name: string;
  addressDescription: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  rc?: string; 
  capital?: string;
  phone?: string;
  email?: string;
}

export interface InvoiceLine {
  id: string;
  itemCode: string;
  description: string;
  quantity: number;
  unit: string; 
  unitPrice: number;
  taxRate: number; 
  fodec: boolean;
}

export interface InvoiceData {
  documentType: DocTypeCode;
  documentNumber: string;
  invoiceDate: string;
  dueDate?: string;
  periodStart?: string;
  periodEnd?: string;
  supplier: Partner;
  buyer: Partner;
  lines: InvoiceLine[];
  stampDuty: number; 
  ttnReference: string;
  paymentMeans: PaymentMeansCode;
  bankName?: string;
  bankCode?: string;
  bankRib?: string;
  amountDescriptionOverride?: string;
}
