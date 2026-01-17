import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceLineCreateManyInputSchema } from '../inputTypeSchemas/InvoiceLineCreateManyInputSchema'

export const InvoiceLineCreateManyArgsSchema: z.ZodType<Prisma.InvoiceLineCreateManyArgs> = z.object({
  data: z.union([ InvoiceLineCreateManyInputSchema, InvoiceLineCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default InvoiceLineCreateManyArgsSchema;
