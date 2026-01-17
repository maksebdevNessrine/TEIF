import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const AllowanceChargeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AllowanceChargeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default AllowanceChargeOrderByRelationAggregateInputSchema;
