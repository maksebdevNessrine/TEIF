import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const InvoiceLineSumOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceLineSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unitPrice: z.lazy(() => SortOrderSchema).optional(),
  discountRate: z.lazy(() => SortOrderSchema).optional(),
  taxRate: z.lazy(() => SortOrderSchema).optional(),
  lineAmount: z.lazy(() => SortOrderSchema).optional(),
  taxAmount: z.lazy(() => SortOrderSchema).optional(),
  totalAmount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default InvoiceLineSumOrderByAggregateInputSchema;
