export type Language = 'ar' | 'fr' | 'en';
export type IdType = 'I-01' | 'I-02' | 'I-03' | 'I-04';
export type DocTypeCode = 'I-11' | 'I-12' | 'I-13' | 'I-14' | 'I-15' | 'I-16' | 'I-30' | 'I-31' | 'I-32' | 'I-33' | 'I-34' | 'I-50' | 'I-51';
export type PaymentMeansCode = 'I-114' | 'I-115' | 'I-116' | 'I-117' | 'I-118' | 'I-119' | 'I-120' | 'I-131';
export type OperationNature = 'OP-SUPPLY' | 'OP-DELIVERY' | 'OP-IMPORT' | 'OP-EXPORT' | 'OP-CASH' | 'OP-RECEIPT';
export type PartnerFunction = 'I-61' | 'I-62' | 'I-63' | 'I-64' | 'I-65' | 'I-66' | 'I-67' | 'I-68' | 'I-69';
export type AllowanceChargeCode = 'I-151' | 'I-152' | 'I-153' | 'I-154' | 'I-155';
export type AllowanceChargeType = 'allowance' | 'charge';
export declare const DOCUMENT_TYPES: Record<DocTypeCode, string>;
export declare const PAYMENT_MEANS: Record<PaymentMeansCode, string>;
export declare const UNIT_CODES: {
    code: string;
    label: string;
}[];
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
    partnerType?: PartnerFunction;
}
/** Allowance or Charge item for line or invoice level */
export interface AllowanceCharge {
    id: string;
    type: AllowanceChargeType;
    code: AllowanceChargeCode;
    description: string;
    amount: number;
    basedOn?: 'line' | 'invoice';
    lineId?: string;
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
    allowances?: AllowanceCharge[];
}
export interface InvoiceData {
    id?: string;
    documentType: DocTypeCode;
    documentNumber: string;
    invoiceDate: string;
    dueDate?: string;
    deliveryDate?: string;
    dispatchDate?: string;
    paymentDate?: string;
    signatureDate?: string;
    otherDate?: string;
    periodStart?: string;
    periodEnd?: string;
    orderReference?: string;
    contractReference?: string;
    deliveryNoteReference?: string;
    creditReason?: string;
    operationNature: OperationNature;
    currency: string;
    supplier: Partner;
    buyer: Partner;
    lines: InvoiceLine[];
    allowances?: AllowanceCharge[];
    globalDiscount: number;
    stampDuty: number;
    ttnReference: string;
    paymentMeans: PaymentMeansCode;
    bankName?: string;
    bankCode?: string;
    bankRib?: string;
    bankAccountOwner?: string;
    checkNumber?: string;
    cardType?: string;
    cardLast4?: string;
    cardReference?: string;
    postalAccountNumber?: string;
    postalAccountOwner?: string;
    postalBranchCode?: string;
    postalServiceName?: string;
    ePaymentGateway?: string;
    ePaymentTransactionId?: string;
    otherPaymentDescription?: string;
    otherPaymentReference?: string;
    amountDescriptionOverride?: string;
    ircRate?: number;
    ircAmount?: number;
    ircExemptionReason?: string;
    qrCodeEnabled?: boolean;
    qrCodeContent?: string;
}
export interface InvoiceResponse {
    id: string;
    userId: string;
    documentType: DocTypeCode;
    documentNumber: string;
    invoiceDate: string;
    dueDate?: string;
    status: string;
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
    ttnReference?: string;
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
//# sourceMappingURL=index.d.ts.map