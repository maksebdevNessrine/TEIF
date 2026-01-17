import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AllowanceChargeCreateManyInputSchema } from '../inputTypeSchemas/AllowanceChargeCreateManyInputSchema'

export const AllowanceChargeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AllowanceChargeCreateManyAndReturnArgs> = z.object({
  data: z.union([ AllowanceChargeCreateManyInputSchema, AllowanceChargeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default AllowanceChargeCreateManyAndReturnArgsSchema;
