import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AllowanceChargeWhereInputSchema } from '../inputTypeSchemas/AllowanceChargeWhereInputSchema'
import { AllowanceChargeOrderByWithAggregationInputSchema } from '../inputTypeSchemas/AllowanceChargeOrderByWithAggregationInputSchema'
import { AllowanceChargeScalarFieldEnumSchema } from '../inputTypeSchemas/AllowanceChargeScalarFieldEnumSchema'
import { AllowanceChargeScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/AllowanceChargeScalarWhereWithAggregatesInputSchema'

export const AllowanceChargeGroupByArgsSchema: z.ZodType<Prisma.AllowanceChargeGroupByArgs> = z.object({
  where: AllowanceChargeWhereInputSchema.optional(), 
  orderBy: z.union([ AllowanceChargeOrderByWithAggregationInputSchema.array(), AllowanceChargeOrderByWithAggregationInputSchema ]).optional(),
  by: AllowanceChargeScalarFieldEnumSchema.array(), 
  having: AllowanceChargeScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export default AllowanceChargeGroupByArgsSchema;
