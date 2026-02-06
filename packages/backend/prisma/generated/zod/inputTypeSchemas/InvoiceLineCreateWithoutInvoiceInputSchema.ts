import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeCreateNestedManyWithoutLineInputSchema } from './AllowanceChargeCreateNestedManyWithoutLineInputSchema';

export const InvoiceLineCreateWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceLineCreateWithoutInvoiceInput> = z.object({
  id: z.cuid().optional(),
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
  allowances: z.lazy(() => AllowanceChargeCreateNestedManyWithoutLineInputSchema).optional(),
}).strict();

export default InvoiceLineCreateWithoutInvoiceInputSchema;
