import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const InvoiceLineUncheckedCreateWithoutAllowancesInputSchema: z.ZodType<Prisma.InvoiceLineUncheckedCreateWithoutAllowancesInput> = z.object({
  id: z.cuid().optional(),
  invoiceId: z.string(),
  itemCode: z.string(),
  description: z.string(),
  quantity: z.number(),
  unit: z.string(),
  unitPrice: z.number(),
  discountRate: z.number().optional(),
  taxRate: z.number(),
  fodec: z.boolean().optional(),
  exemptionReason: z.string().optional().nullable(),
  lineAmount: z.number(),
  taxAmount: z.number(),
  totalAmount: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export default InvoiceLineUncheckedCreateWithoutAllowancesInputSchema;
