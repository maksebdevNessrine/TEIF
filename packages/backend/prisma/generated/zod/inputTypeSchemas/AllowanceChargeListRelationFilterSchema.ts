import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeWhereInputSchema } from './AllowanceChargeWhereInputSchema';

export const AllowanceChargeListRelationFilterSchema: z.ZodType<Prisma.AllowanceChargeListRelationFilter> = z.object({
  every: z.lazy(() => AllowanceChargeWhereInputSchema).optional(),
  some: z.lazy(() => AllowanceChargeWhereInputSchema).optional(),
  none: z.lazy(() => AllowanceChargeWhereInputSchema).optional(),
}).strict();

export default AllowanceChargeListRelationFilterSchema;
