import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AllowanceChargeSumOrderByAggregateInputSchema: z.ZodType<Prisma.AllowanceChargeSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default AllowanceChargeSumOrderByAggregateInputSchema;
