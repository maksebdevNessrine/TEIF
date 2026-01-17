import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceLineUpdateManyMutationInputSchema } from '../inputTypeSchemas/InvoiceLineUpdateManyMutationInputSchema'
import { InvoiceLineUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/InvoiceLineUncheckedUpdateManyInputSchema'
import { InvoiceLineWhereInputSchema } from '../inputTypeSchemas/InvoiceLineWhereInputSchema'

export const InvoiceLineUpdateManyArgsSchema: z.ZodType<Prisma.InvoiceLineUpdateManyArgs> = z.object({
  data: z.union([ InvoiceLineUpdateManyMutationInputSchema, InvoiceLineUncheckedUpdateManyInputSchema ]),
  where: InvoiceLineWhereInputSchema.optional(), 
}).strict();

export default InvoiceLineUpdateManyArgsSchema;
