import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'

/////////////////////////////////////////
// INVOICE SCHEMA
/////////////////////////////////////////

export const InvoiceSchema = z.object({
  id: z.string().cuid(),
  documentType: z.string(),
  documentNumber: z.string(),
  invoiceDate: z.coerce.date(),
  dueDate: z.coerce.date().nullable(),
  deliveryDate: z.coerce.date().nullable(),
  dispatchDate: z.coerce.date().nullable(),
  paymentDate: z.coerce.date().nullable(),
  signatureDate: z.string().nullable(),
  otherDate: z.coerce.date().nullable(),
  periodStart: z.coerce.date().nullable(),
  periodEnd: z.coerce.date().nullable(),
  operationNature: z.string(),
  currency: z.string(),
  orderReference: z.string().nullable(),
  contractReference: z.string().nullable(),
  deliveryNoteReference: z.string().nullable(),
  userId: z.string(),
  supplierId: z.string(),
  buyerId: z.string(),
  globalDiscount: z.number(),
  stampDuty: z.number(),
  ttnReference: z.string().nullable(),
  paymentMeans: z.string(),
  bankName: z.string().nullable(),
  bankCode: z.string().nullable(),
  bankRib: z.string().nullable(),
  bankAccountOwner: z.string().nullable(),
  checkNumber: z.string().nullable(),
  cardType: z.string().nullable(),
  cardLast4: z.string().nullable(),
  cardReference: z.string().nullable(),
  postalAccountNumber: z.string().nullable(),
  postalAccountOwner: z.string().nullable(),
  postalBranchCode: z.string().nullable(),
  postalServiceName: z.string().nullable(),
  ePaymentGateway: z.string().nullable(),
  ePaymentTransactionId: z.string().nullable(),
  otherPaymentDescription: z.string().nullable(),
  otherPaymentReference: z.string().nullable(),
  ircRate: z.number().nullable(),
  ircAmount: z.number().nullable(),
  ircExemptionReason: z.string().nullable(),
  qrCodeEnabled: z.boolean(),
  qrCodeContent: z.string().nullable(),
  amountDescriptionOverride: z.string().nullable(),
  amountLanguage: z.string(),
  xmlContent: z.string(),
  status: z.string(),
  totalHT: z.number(),
  totalTVA: z.number(),
  totalTTC: z.number(),
  deletedAt: z.coerce.date().nullable(),
  metadata: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Invoice = z.infer<typeof InvoiceSchema>

export default InvoiceSchema;
