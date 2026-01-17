import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const InvoiceLineCountOutputTypeSelectSchema: z.ZodType<Prisma.InvoiceLineCountOutputTypeSelect> = z.object({
  allowances: z.boolean().optional(),
}).strict();

export default InvoiceLineCountOutputTypeSelectSchema;
