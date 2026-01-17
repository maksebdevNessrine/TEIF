import { z } from 'zod';

/////////////////////////////////////////
// INVOICE LINE SCHEMA
/////////////////////////////////////////

export const InvoiceLineSchema = z.object({
  id: z.string().cuid(),
  invoiceId: z.string(),
  itemCode: z.string(),
  description: z.string(),
  quantity: z.number(),
  unit: z.string(),
  unitPrice: z.number(),
  discountRate: z.number(),
  taxRate: z.number(),
  fodec: z.boolean(),
  exemptionReason: z.string().nullable(),
  lineAmount: z.number(),
  taxAmount: z.number(),
  totalAmount: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type InvoiceLine = z.infer<typeof InvoiceLineSchema>

export default InvoiceLineSchema;
