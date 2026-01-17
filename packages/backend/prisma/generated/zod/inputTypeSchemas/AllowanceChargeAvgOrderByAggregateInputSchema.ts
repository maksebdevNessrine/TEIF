import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AllowanceChargeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AllowanceChargeAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default AllowanceChargeAvgOrderByAggregateInputSchema;
