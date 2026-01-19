import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const AllowanceChargeCreateManyLineInputSchema: z.ZodType<Prisma.AllowanceChargeCreateManyLineInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  code: z.string(),
  description: z.string(),
  amount: z.number(),
  basedOn: z.string().optional().nullable(),
  invoiceId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export default AllowanceChargeCreateManyLineInputSchema;
