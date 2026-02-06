
export type Language = 'ar' | 'fr' | 'en';
export type IdType = 'I-01' | 'I-02' | 'I-03' | 'I-04';
export type DocTypeCode = 'I-11' | 'I-12' | 'I-13' | 'I-14' | 'I-15' | 'I-16' | 'I-30' | 'I-31' | 'I-32' | 'I-33' | 'I-34' | 'I-50' | 'I-51';
export type PaymentMeansCode = 'I-114' | 'I-115' | 'I-116' | 'I-117' | 'I-118' | 'I-119' | 'I-120' | 'I-131';
export type OperationNature = 'OP-SUPPLY' | 'OP-DELIVERY' | 'OP-IMPORT' | 'OP-EXPORT' | 'OP-CASH' | 'OP-RECEIPT';
export type PartnerFunction = 'I-61' | 'I-62' | 'I-63' | 'I-64' | 'I-65' | 'I-66' | 'I-67' | 'I-68' | 'I-69';
export type AllowanceChargeCode = 'I-151' | 'I-152' | 'I-153' | 'I-154' | 'I-155';
export type AllowanceChargeType = 'allowance' | 'charge';

export const DOCUMENT_TYPES: Record<DocTypeCode, string> = {
  'I-11': 'Facture',
  'I-12': "Facture d'avoir",
  'I-13': "Note d'honoraire",
  'I-14': "Décompte (marché public)",
  'I-15': "Facture Export",
  'I-16': "Bon de commande",
  'I-30': 'Bon de délivrance',
  'I-31': 'Bon de réception',
  'I-32': 'Bon de retour',
  'I-33': 'Bulletin de versement',
  'I-34': 'Ordre de paiement',
  'I-50': 'Note de frais',
  'I-51': 'Attestation de service'
};

export const PAYMENT_MEANS: Record<PaymentMeansCode, string> = {
  'I-114': 'Virement bancaire',
  'I-115': 'Courrier postal',
  'I-116': 'Espèce',
  'I-117': 'Chèque',
  'I-118': 'Carte bancaire',
  'I-119': 'Paiement électronique',
  'I-120': 'Autre',
  'I-131': 'Paiement par effet'
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
  id?: string; // Optional ID for existing invoices
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
  creditReason?: string; // Reason for credit note (for I-12 document type)
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
  bankName?: string; // Bank name
  bankCode?: string; // Bank clearing code
  bankRib?: string; // RIB (20 digits) - Account number
  bankAccountOwner?: string; // Account owner name - Required for I-114
  // Check Payment (I-117) fields
  checkNumber?: string; // Check number - Required for I-117
  // Card Payment (I-118) fields
  cardType?: string; // VISA, MASTERCARD, AMEX, etc. - Required for I-118
  cardLast4?: string; // Last 4 digits of card - Required for I-118
  cardReference?: string; // Transaction/authorization reference code - Required for I-118
  // Postal Payment (I-115) fields
  postalAccountNumber?: string; // Postal account number - Required for I-115
  postalAccountOwner?: string; // Account owner name - Required for I-115
  postalBranchCode?: string; // Postal branch identifier - Required for I-115 (4 digits)
  postalServiceName?: string; // Postal service name (e.g., "La Poste") - Optional for I-115
  // E-Payment (I-119) fields
  ePaymentGateway?: string; // Payment gateway provider (PayPal, Stripe, etc.)
  ePaymentTransactionId?: string; // Transaction ID from payment gateway
  // Other Payment (I-120) fields
  otherPaymentDescription?: string; // Description of other payment method
  otherPaymentReference?: string; // Reference for other payment method
  // General
  amountDescriptionOverride?: string;
  amountLanguage?: 'fr' | 'ar' | 'en'; // Language for amount in words: French (default), Arabic, or English
  ircRate?: number; // I-1604: IRC withholding tax rate (0-10%, optional)
  ircAmount?: number; // Calculated IRC amount
  ircExemptionReason?: string; // Reason if IRC is exempted
  qrCodeEnabled?: boolean; // Enable QR code generation
  qrCodeContent?: string; // Base64 encoded QR code
}

// API Response Types
export interface InvoiceResponse {
  id: string;
  userId: string;
  documentType: DocTypeCode;
  documentNumber: string;
  invoiceDate: string;
  dueDate?: string;
  status: string; // draft, finalized, sent, paid, cancelled, voided
  totalHT: number;
  totalTVA: number;
  totalTTC: number;
  globalDiscount: number;
  stampDuty: number;
  ircWithholdingTaxRate?: number;
  paymentMeansCode: PaymentMeansCode;
  supplier: Partner;
  buyer: Partner;
  invoiceLines?: InvoiceLine[];
  allowances?: AllowanceCharge[];
  xmlContent?: string;
  metadata?: Record<string, any>;
  operationNature: OperationNature;
  internalNotes?: string;
  externalNotes?: string;
  ttnReference?: string; // TTN reference for QR code (I-88)
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface InvoiceListQuery {
  page?: number;
  limit?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  documentType?: DocTypeCode;
  minAmount?: number;
  maxAmount?: number;
  status?: 'draft' | 'finalized' | 'sent' | 'paid' | 'cancelled' | 'voided';
  sortBy?: 'date' | 'amount' | 'documentNumber';
  sortOrder?: 'asc' | 'desc';
}

export interface InvoiceListResponse {
  invoices: InvoiceResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters?: Partial<InvoiceListQuery>;
  sorting?: {
    sortBy: string;
    sortOrder: string;
  };
}

// ============================================
// SIGNATURE TYPES
// ============================================

export type CertificateStatus = 'pending_verification' | 'verified' | 'expired' | 'revoked';

export interface UserSignatureProfile {
  userId: string;
  hasCertificate: boolean;
  status?: CertificateStatus;
  certificateSubject?: string;
  certificateIssuer?: string;
  certificateValidFrom?: string;
  certificateValidUntil?: string;
  daysRemaining?: number | null;
  uploadedAt?: string;
  lastUsedAt?: string | null;
}

export interface SignatureUploadRequest {
  pin: string;
  // File sent as FormData with key 'certificate'
}

export interface SignatureUploadResponse {
  success: boolean;
  data?: {
    certificateSubject: string;
    certificateIssuer: string;
    validFrom: string;
    validUntil: string;
    status: CertificateStatus;
    message: string;
  };
  error?: string;
  code?: string;
}

export interface SignInvoiceRequest {
  pin: string;
}

export interface SignInvoiceResponse {
  success: boolean;
  data?: {
    signedXml: string;
    signatureId: string;
    timestamp: string;
    filename: string;
  };
  error?: string;
  code?: string;
}

export interface SignatureStatusResponse {
  success: boolean;
  data: UserSignatureProfile;
}

export interface SignatureAuditLog {
  id: string;
  userId: string;
  action: 'UPLOAD' | 'SIGN' | 'VALIDATE_FAILED' | 'EXPIRY_WARNING' | 'REVOKE';
  invoiceId?: string;
  documentNumber?: string;
  status: 'SUCCESS' | 'FAILED';
  errorMessage?: string;
  certificateUsed?: string;
  ipAddress?: string;
  createdAt: string;
}
