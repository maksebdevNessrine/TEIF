import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AllowanceChargeUpdateManyMutationInputSchema } from '../inputTypeSchemas/AllowanceChargeUpdateManyMutationInputSchema'
import { AllowanceChargeUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/AllowanceChargeUncheckedUpdateManyInputSchema'
import { AllowanceChargeWhereInputSchema } from '../inputTypeSchemas/AllowanceChargeWhereInputSchema'

export const AllowanceChargeUpdateManyArgsSchema: z.ZodType<Prisma.AllowanceChargeUpdateManyArgs> = z.object({
  data: z.union([ AllowanceChargeUpdateManyMutationInputSchema, AllowanceChargeUncheckedUpdateManyInputSchema ]),
  where: AllowanceChargeWhereInputSchema.optional(), 
}).strict();

export default AllowanceChargeUpdateManyArgsSchema;
