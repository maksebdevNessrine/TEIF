import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PartnerWhereInputSchema } from '../inputTypeSchemas/PartnerWhereInputSchema'
import { PartnerOrderByWithAggregationInputSchema } from '../inputTypeSchemas/PartnerOrderByWithAggregationInputSchema'
import { PartnerScalarFieldEnumSchema } from '../inputTypeSchemas/PartnerScalarFieldEnumSchema'
import { PartnerScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/PartnerScalarWhereWithAggregatesInputSchema'

export const PartnerGroupByArgsSchema: z.ZodType<Prisma.PartnerGroupByArgs> = z.object({
  where: PartnerWhereInputSchema.optional(), 
  orderBy: z.union([ PartnerOrderByWithAggregationInputSchema.array(), PartnerOrderByWithAggregationInputSchema ]).optional(),
  by: PartnerScalarFieldEnumSchema.array(), 
  having: PartnerScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export default PartnerGroupByArgsSchema;
