import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AllowanceChargeCreateManyInputSchema } from '../inputTypeSchemas/AllowanceChargeCreateManyInputSchema'

export const AllowanceChargeCreateManyArgsSchema: z.ZodType<Prisma.AllowanceChargeCreateManyArgs> = z.object({
  data: z.union([ AllowanceChargeCreateManyInputSchema, AllowanceChargeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default AllowanceChargeCreateManyArgsSchema;
