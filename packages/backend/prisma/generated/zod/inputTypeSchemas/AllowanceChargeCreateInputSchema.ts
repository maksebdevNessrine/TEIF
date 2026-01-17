import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateNestedOneWithoutAllowancesInputSchema } from './InvoiceCreateNestedOneWithoutAllowancesInputSchema';
import { InvoiceLineCreateNestedOneWithoutAllowancesInputSchema } from './InvoiceLineCreateNestedOneWithoutAllowancesInputSchema';

export const AllowanceChargeCreateInputSchema: z.ZodType<Prisma.AllowanceChargeCreateInput> = z.object({
  id: z.cuid().optional(),
  type: z.string(),
  code: z.string(),
  description: z.string(),
  amount: z.number(),
  basedOn: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invoice: z.lazy(() => InvoiceCreateNestedOneWithoutAllowancesInputSchema).optional(),
  line: z.lazy(() => InvoiceLineCreateNestedOneWithoutAllowancesInputSchema).optional(),
}).strict();

export default AllowanceChargeCreateInputSchema;
