import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereInputSchema } from './InvoiceWhereInputSchema';

export const InvoiceRelationFilterSchema: z.ZodType<Prisma.InvoiceRelationFilter> = z.object({
  is: z.lazy(() => InvoiceWhereInputSchema).optional(),
  isNot: z.lazy(() => InvoiceWhereInputSchema).optional(),
}).strict();

export default InvoiceRelationFilterSchema;
