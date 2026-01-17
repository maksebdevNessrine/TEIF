import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { AllowanceChargeCountOrderByAggregateInputSchema } from './AllowanceChargeCountOrderByAggregateInputSchema';
import { AllowanceChargeAvgOrderByAggregateInputSchema } from './AllowanceChargeAvgOrderByAggregateInputSchema';
import { AllowanceChargeMaxOrderByAggregateInputSchema } from './AllowanceChargeMaxOrderByAggregateInputSchema';
import { AllowanceChargeMinOrderByAggregateInputSchema } from './AllowanceChargeMinOrderByAggregateInputSchema';
import { AllowanceChargeSumOrderByAggregateInputSchema } from './AllowanceChargeSumOrderByAggregateInputSchema';

export const AllowanceChargeOrderByWithAggregationInputSchema: z.ZodType<Prisma.AllowanceChargeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  basedOn: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  invoiceId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  lineId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AllowanceChargeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AllowanceChargeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AllowanceChargeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AllowanceChargeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AllowanceChargeSumOrderByAggregateInputSchema).optional(),
}).strict();

export default AllowanceChargeOrderByWithAggregationInputSchema;
