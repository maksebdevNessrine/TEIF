import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineWhereInputSchema } from './InvoiceLineWhereInputSchema';

export const InvoiceLineListRelationFilterSchema: z.ZodType<Prisma.InvoiceLineListRelationFilter> = z.object({
  every: z.lazy(() => InvoiceLineWhereInputSchema).optional(),
  some: z.lazy(() => InvoiceLineWhereInputSchema).optional(),
  none: z.lazy(() => InvoiceLineWhereInputSchema).optional(),
}).strict();

export default InvoiceLineListRelationFilterSchema;
