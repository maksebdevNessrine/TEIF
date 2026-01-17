import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AllowanceChargeWhereInputSchema } from '../inputTypeSchemas/AllowanceChargeWhereInputSchema'

export const AllowanceChargeDeleteManyArgsSchema: z.ZodType<Prisma.AllowanceChargeDeleteManyArgs> = z.object({
  where: AllowanceChargeWhereInputSchema.optional(), 
}).strict();

export default AllowanceChargeDeleteManyArgsSchema;
