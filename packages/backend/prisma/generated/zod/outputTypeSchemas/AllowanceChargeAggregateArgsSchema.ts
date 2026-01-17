import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AllowanceChargeWhereInputSchema } from '../inputTypeSchemas/AllowanceChargeWhereInputSchema'
import { AllowanceChargeOrderByWithRelationInputSchema } from '../inputTypeSchemas/AllowanceChargeOrderByWithRelationInputSchema'
import { AllowanceChargeWhereUniqueInputSchema } from '../inputTypeSchemas/AllowanceChargeWhereUniqueInputSchema'

export const AllowanceChargeAggregateArgsSchema: z.ZodType<Prisma.AllowanceChargeAggregateArgs> = z.object({
  where: AllowanceChargeWhereInputSchema.optional(), 
  orderBy: z.union([ AllowanceChargeOrderByWithRelationInputSchema.array(), AllowanceChargeOrderByWithRelationInputSchema ]).optional(),
  cursor: AllowanceChargeWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export default AllowanceChargeAggregateArgsSchema;
