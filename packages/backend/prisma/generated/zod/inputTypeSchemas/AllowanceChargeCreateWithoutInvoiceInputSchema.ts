import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineCreateNestedOneWithoutAllowancesInputSchema } from './InvoiceLineCreateNestedOneWithoutAllowancesInputSchema';

export const AllowanceChargeCreateWithoutInvoiceInputSchema: z.ZodType<Prisma.AllowanceChargeCreateWithoutInvoiceInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  code: z.string(),
  description: z.string(),
  amount: z.number(),
  basedOn: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  line: z.lazy(() => InvoiceLineCreateNestedOneWithoutAllowancesInputSchema).optional(),
}).strict();

export default AllowanceChargeCreateWithoutInvoiceInputSchema;
