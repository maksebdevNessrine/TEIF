import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceLineWhereInputSchema } from '../inputTypeSchemas/InvoiceLineWhereInputSchema'
import { InvoiceLineOrderByWithRelationInputSchema } from '../inputTypeSchemas/InvoiceLineOrderByWithRelationInputSchema'
import { InvoiceLineWhereUniqueInputSchema } from '../inputTypeSchemas/InvoiceLineWhereUniqueInputSchema'

export const InvoiceLineAggregateArgsSchema: z.ZodType<Prisma.InvoiceLineAggregateArgs> = z.object({
  where: InvoiceLineWhereInputSchema.optional(), 
  orderBy: z.union([ InvoiceLineOrderByWithRelationInputSchema.array(), InvoiceLineOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceLineWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export default InvoiceLineAggregateArgsSchema;
