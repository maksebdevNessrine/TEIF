import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereInputSchema } from './InvoiceWhereInputSchema';

export const InvoiceNullableRelationFilterSchema: z.ZodType<Prisma.InvoiceNullableRelationFilter> = z.object({
  is: z.lazy(() => InvoiceWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => InvoiceWhereInputSchema).optional().nullable(),
}).strict();

export default InvoiceNullableRelationFilterSchema;
