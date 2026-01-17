import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PartnerWhereInputSchema } from '../inputTypeSchemas/PartnerWhereInputSchema'
import { PartnerOrderByWithRelationInputSchema } from '../inputTypeSchemas/PartnerOrderByWithRelationInputSchema'
import { PartnerWhereUniqueInputSchema } from '../inputTypeSchemas/PartnerWhereUniqueInputSchema'

export const PartnerAggregateArgsSchema: z.ZodType<Prisma.PartnerAggregateArgs> = z.object({
  where: PartnerWhereInputSchema.optional(), 
  orderBy: z.union([ PartnerOrderByWithRelationInputSchema.array(), PartnerOrderByWithRelationInputSchema ]).optional(),
  cursor: PartnerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export default PartnerAggregateArgsSchema;
