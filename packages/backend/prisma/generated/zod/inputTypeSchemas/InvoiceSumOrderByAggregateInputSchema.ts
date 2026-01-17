import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const InvoiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceSumOrderByAggregateInput> = z.object({
  globalDiscount: z.lazy(() => SortOrderSchema).optional(),
  stampDuty: z.lazy(() => SortOrderSchema).optional(),
  ircRate: z.lazy(() => SortOrderSchema).optional(),
  ircAmount: z.lazy(() => SortOrderSchema).optional(),
  totalHT: z.lazy(() => SortOrderSchema).optional(),
  totalTVA: z.lazy(() => SortOrderSchema).optional(),
  totalTTC: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default InvoiceSumOrderByAggregateInputSchema;
