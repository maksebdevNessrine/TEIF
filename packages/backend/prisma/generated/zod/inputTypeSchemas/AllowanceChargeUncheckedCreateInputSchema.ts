import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const AllowanceChargeUncheckedCreateInputSchema: z.ZodType<Prisma.AllowanceChargeUncheckedCreateInput> = z.object({
  id: z.cuid().optional(),
  type: z.string(),
  code: z.string(),
  description: z.string(),
  amount: z.number(),
  basedOn: z.string().optional().nullable(),
  invoiceId: z.string().optional().nullable(),
  lineId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export default AllowanceChargeUncheckedCreateInputSchema;
