import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceLineWhereInputSchema } from '../inputTypeSchemas/InvoiceLineWhereInputSchema'

export const InvoiceLineDeleteManyArgsSchema: z.ZodType<Prisma.InvoiceLineDeleteManyArgs> = z.object({
  where: InvoiceLineWhereInputSchema.optional(), 
}).strict();

export default InvoiceLineDeleteManyArgsSchema;
