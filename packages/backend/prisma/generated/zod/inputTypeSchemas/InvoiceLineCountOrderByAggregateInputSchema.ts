import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const InvoiceLineCountOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceLineCountOrderByAggregateInput> = z.object({
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
  exemptionReason: z.lazy(() => SortOrderSchema).optional(),
  lineAmount: z.lazy(() => SortOrderSchema).optional(),
  taxAmount: z.lazy(() => SortOrderSchema).optional(),
  totalAmount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default InvoiceLineCountOrderByAggregateInputSchema;
