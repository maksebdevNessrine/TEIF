import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { InvoiceLineCountOrderByAggregateInputSchema } from './InvoiceLineCountOrderByAggregateInputSchema';
import { InvoiceLineAvgOrderByAggregateInputSchema } from './InvoiceLineAvgOrderByAggregateInputSchema';
import { InvoiceLineMaxOrderByAggregateInputSchema } from './InvoiceLineMaxOrderByAggregateInputSchema';
import { InvoiceLineMinOrderByAggregateInputSchema } from './InvoiceLineMinOrderByAggregateInputSchema';
import { InvoiceLineSumOrderByAggregateInputSchema } from './InvoiceLineSumOrderByAggregateInputSchema';

export const InvoiceLineOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvoiceLineOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  itemCode: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  unitPrice: z.lazy(() => SortOrderSchema).optional(),
  discountRate: z.lazy(() => SortOrderSchema).optional(),
  taxRate: z.lazy(() => SortOrderSchema).optional(),
  fodec: z.lazy(() => SortOrderSchema).optional(),
  exemptionReason: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  lineAmount: z.lazy(() => SortOrderSchema).optional(),
  taxAmount: z.lazy(() => SortOrderSchema).optional(),
  totalAmount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InvoiceLineCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InvoiceLineAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvoiceLineMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvoiceLineMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InvoiceLineSumOrderByAggregateInputSchema).optional(),
}).strict();

export default InvoiceLineOrderByWithAggregationInputSchema;
