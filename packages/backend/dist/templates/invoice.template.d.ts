/**
 * Invoice HTML template generator for PDF rendering
 * Supports TEIF compliance with multi-language support (FR, EN, AR)
 */
import type { InvoiceResponse, InvoiceLine, AllowanceCharge } from '@teif/shared/types';
type Language = 'ar' | 'fr' | 'en';
interface InvoiceWithRelations extends Omit<InvoiceResponse, 'documentNumber' | 'invoiceDate' | 'dueDate'> {
    supplier: any;
    buyer: any;
    lines: (InvoiceLine & {
        allowances: AllowanceCharge[];
    })[];
    allowances: AllowanceCharge[];
    documentNumber: string;
    invoiceDate?: string | Date;
    dueDate?: string | Date;
    deliveryDate?: string | Date;
    currency?: string;
    ircAmount?: number;
    paymentMeans?: string;
    internalNotes?: string;
    contractReference?: string;
    orderReference?: string;
    bankName?: string;
    bankCode?: string;
    bankRib?: string;
    bankAccountOwner?: string;
    checkNumber?: string;
    cardType?: string;
    cardReference?: string;
    postalAccountNumber?: string;
    postalAccountOwner?: string;
    ePaymentGateway?: string;
    ePaymentTransactionId?: string;
    otherPaymentDescription?: string;
    otherPaymentReference?: string;
    paymentDetails?: {
        bankName?: string;
        rib?: string;
        accountOwner?: string;
        accountNumber?: string;
        gateway?: string;
        transactionId?: string;
        checkNumber?: string;
        cardType?: string;
        reference?: string;
        description?: string;
    };
}
export declare function generateInvoiceHtml(invoice: InvoiceWithRelations, language: Language, qrCodeDataUrl: string): string;
export declare const invoiceTemplateService: {
    generateInvoiceHtml: typeof generateInvoiceHtml;
};
export {};
