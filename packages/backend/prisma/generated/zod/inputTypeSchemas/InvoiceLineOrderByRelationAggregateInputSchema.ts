import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const InvoiceLineOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InvoiceLineOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default InvoiceLineOrderByRelationAggregateInputSchema;
