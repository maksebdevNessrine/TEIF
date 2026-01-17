import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const InvoiceCountOutputTypeSelectSchema: z.ZodType<Prisma.InvoiceCountOutputTypeSelect> = z.object({
  lines: z.boolean().optional(),
  allowances: z.boolean().optional(),
}).strict();

export default InvoiceCountOutputTypeSelectSchema;
