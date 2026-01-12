
export type Language = 'ar' | 'fr' | 'en';
export type IdType = 'I-01' | 'I-02' | 'I-03' | 'I-04';
export type DocTypeCode = 'I-11' | 'I-12' | 'I-13' | 'I-14' | 'I-15' | 'I-16';
export type PaymentMeansCode = 'I-114' | 'I-115' | 'I-116' | 'I-117' | 'I-118' | 'I-119' | 'I-120';
export type OperationNature = 'GOODS' | 'SERVICES' | 'MIXED';
export type PartnerFunction = 'I-61' | 'I-62' | 'I-63' | 'I-64' | 'I-65' | 'I-66' | 'I-67' | 'I-68' | 'I-69';
export type AllowanceChargeCode = 'I-151' | 'I-152' | 'I-153' | 'I-154' | 'I-155';
export type AllowanceChargeType = 'allowance' | 'charge';

export const DOCUMENT_TYPES: Record<DocTypeCode, string> = {
  'I-11': 'Facture',
  'I-12': "Facture d'avoir",
  'I-13': "Note d'honoraire",
  'I-14': "Décompte (marché public)",
  'I-15': "Facture Export",
  'I-16': "Bon de commande"
};

export const PAYMENT_MEANS: Record<PaymentMeansCode, string> = {
  'I-114': 'Virement bancaire',
  'I-115': 'Courrier postal',
  'I-116': 'Espèce',
  'I-117': 'Chèque',
  'I-118': 'Carte bancaire',
  'I-119': 'Paiement électronique',
  'I-120': 'Autre'
};

export const UNIT_CODES = [
  { code: 'UNIT', label: 'Unité' },
  { code: 'KG', label: 'Kilogramme' },
  { code: 'H', label: 'Heure' },
  { code: 'TON', label: 'Tonne' },
  { code: 'L', label: 'Litre' },
  { code: 'M2', label: 'Mètre Carré' },
  { code: 'M', label: 'Mètre' },
  { code: 'M3', label: 'Mètre Cube' },
  { code: 'KWH', label: 'Kilowatt-heure' }
];

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
  partnerType?: PartnerFunction; // Optional partner function (default: I-62 for supplier, I-64 for buyer)
}

/** Allowance or Charge item for line or invoice level */
export interface AllowanceCharge {
  id: string;
  type: AllowanceChargeType; // 'allowance' (discount) or 'charge' (surcharge)
  code: AllowanceChargeCode; // I-151 to I-155 (discount, freight, insurance, handling, other)
  description: string;
  amount: number;
  basedOn?: 'line' | 'invoice'; // Where applied
  lineId?: string; // If line-level
}

export interface InvoiceLine {
  id: string;
  itemCode: string;
  description: string;
  quantity: number;
  unit: string; 
  unitPrice: number;
  discountRate: number; 
  taxRate: number; 
  fodec: boolean;
  exemptionReason?: string;
  allowances?: AllowanceCharge[]; // Line-level allowances/charges
}

export interface InvoiceData {
  documentType: DocTypeCode;
  documentNumber: string;
  invoiceDate: string;
  dueDate?: string;
  deliveryDate?: string; // I-33: Delivery date (optional)
  dispatchDate?: string; // I-34: Dispatch date (optional)
  paymentDate?: string; // I-35: Payment date (optional)
  signatureDate?: string; // I-37: Signature timestamp (optional, format: ddMMyyHHmm)
  otherDate?: string; // I-38: Other date (optional)
  periodStart?: string; // Start of service period (for I-36 range)
  periodEnd?: string; // End of service period (for I-36 range)
  orderReference?: string;
  contractReference?: string;
  deliveryNoteReference?: string;
  operationNature: OperationNature;
  currency: string;
  supplier: Partner;
  buyer: Partner;
  lines: InvoiceLine[];
  allowances?: AllowanceCharge[]; // Invoice-level allowances/charges (e.g., global discount)
  globalDiscount: number;
  stampDuty: number; 
  ttnReference: string;
  paymentMeans: PaymentMeansCode;
  // Wire Transfer (I-114) fields
  bankName?: string;
  bankCode?: string;
  bankRib?: string;
  // Check Payment (I-117) fields
  checkNumber?: string; // Check number - Required for I-117
  // Card Payment (I-118) fields
  cardType?: string; // VISA, MASTERCARD, AMEX, etc.
  cardLast4?: string; // Last 4 digits of card
  cardReference?: string; // Transaction/authorization code
  // Postal Payment (I-115) fields
  postalAccountNumber?: string; // Postal account number (Required for I-115)
  postalAccountOwner?: string; // Account owner name (Required for I-115)
  postalBranchCode?: string; // Postal branch identifier (Required for I-115)
  postalServiceName?: string; // Postal service name (e.g., "La Poste") (Optional)
  // General
  amountDescriptionOverride?: string;
  ircRate?: number; // I-1604: IRC withholding tax rate (0-10%, optional)
  ircAmount?: number; // Calculated IRC amount
  ircExemptionReason?: string; // Reason if IRC is exempted
  qrCodeEnabled?: boolean; // Enable QR code generation
  qrCodeContent?: string; // Base64 encoded QR code
}
