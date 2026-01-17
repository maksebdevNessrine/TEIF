import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereInputSchema } from './InvoiceWhereInputSchema';
import { InvoiceUpdateWithoutLinesInputSchema } from './InvoiceUpdateWithoutLinesInputSchema';
import { InvoiceUncheckedUpdateWithoutLinesInputSchema } from './InvoiceUncheckedUpdateWithoutLinesInputSchema';

export const InvoiceUpdateToOneWithWhereWithoutLinesInputSchema: z.ZodType<Prisma.InvoiceUpdateToOneWithWhereWithoutLinesInput> = z.object({
  where: z.lazy(() => InvoiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InvoiceUpdateWithoutLinesInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutLinesInputSchema) ]),
}).strict();

export default InvoiceUpdateToOneWithWhereWithoutLinesInputSchema;
