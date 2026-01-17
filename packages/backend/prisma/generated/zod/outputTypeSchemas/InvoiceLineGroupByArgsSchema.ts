import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceLineWhereInputSchema } from '../inputTypeSchemas/InvoiceLineWhereInputSchema'
import { InvoiceLineOrderByWithAggregationInputSchema } from '../inputTypeSchemas/InvoiceLineOrderByWithAggregationInputSchema'
import { InvoiceLineScalarFieldEnumSchema } from '../inputTypeSchemas/InvoiceLineScalarFieldEnumSchema'
import { InvoiceLineScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/InvoiceLineScalarWhereWithAggregatesInputSchema'

export const InvoiceLineGroupByArgsSchema: z.ZodType<Prisma.InvoiceLineGroupByArgs> = z.object({
  where: InvoiceLineWhereInputSchema.optional(), 
  orderBy: z.union([ InvoiceLineOrderByWithAggregationInputSchema.array(), InvoiceLineOrderByWithAggregationInputSchema ]).optional(),
  by: InvoiceLineScalarFieldEnumSchema.array(), 
  having: InvoiceLineScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export default InvoiceLineGroupByArgsSchema;
