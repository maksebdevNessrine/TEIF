import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AllowanceChargeSelectSchema } from '../inputTypeSchemas/AllowanceChargeSelectSchema';
import { AllowanceChargeIncludeSchema } from '../inputTypeSchemas/AllowanceChargeIncludeSchema';

export const AllowanceChargeArgsSchema: z.ZodType<Prisma.AllowanceChargeDefaultArgs> = z.object({
  select: z.lazy(() => AllowanceChargeSelectSchema).optional(),
  include: z.lazy(() => AllowanceChargeIncludeSchema).optional(),
}).strict();

export default AllowanceChargeArgsSchema;
