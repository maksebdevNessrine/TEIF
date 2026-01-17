import { z } from 'zod';

export const InvoiceScalarFieldEnumSchema = z.enum(['id','documentType','documentNumber','invoiceDate','dueDate','deliveryDate','dispatchDate','paymentDate','signatureDate','otherDate','periodStart','periodEnd','operationNature','currency','orderReference','contractReference','deliveryNoteReference','userId','supplierId','buyerId','globalDiscount','stampDuty','ttnReference','paymentMeans','bankName','bankCode','bankRib','bankAccountOwner','checkNumber','cardType','cardLast4','cardReference','postalAccountNumber','postalAccountOwner','postalBranchCode','postalServiceName','ePaymentGateway','ePaymentTransactionId','otherPaymentDescription','otherPaymentReference','ircRate','ircAmount','ircExemptionReason','qrCodeEnabled','qrCodeContent','amountDescriptionOverride','xmlContent','status','totalHT','totalTVA','totalTTC','deletedAt','metadata','createdAt','updatedAt']);

export default InvoiceScalarFieldEnumSchema;
