import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineWhereInputSchema } from './InvoiceLineWhereInputSchema';

export const InvoiceLineNullableRelationFilterSchema: z.ZodType<Prisma.InvoiceLineNullableRelationFilter> = z.object({
  is: z.lazy(() => InvoiceLineWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => InvoiceLineWhereInputSchema).optional().nullable(),
}).strict();

export default InvoiceLineNullableRelationFilterSchema;
