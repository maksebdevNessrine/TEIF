import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceUpdateWithoutLinesInputSchema } from './InvoiceUpdateWithoutLinesInputSchema';
import { InvoiceUncheckedUpdateWithoutLinesInputSchema } from './InvoiceUncheckedUpdateWithoutLinesInputSchema';
import { InvoiceCreateWithoutLinesInputSchema } from './InvoiceCreateWithoutLinesInputSchema';
import { InvoiceUncheckedCreateWithoutLinesInputSchema } from './InvoiceUncheckedCreateWithoutLinesInputSchema';
import { InvoiceWhereInputSchema } from './InvoiceWhereInputSchema';

export const InvoiceUpsertWithoutLinesInputSchema: z.ZodType<Prisma.InvoiceUpsertWithoutLinesInput> = z.object({
  update: z.union([ z.lazy(() => InvoiceUpdateWithoutLinesInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutLinesInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutLinesInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutLinesInputSchema) ]),
  where: z.lazy(() => InvoiceWhereInputSchema).optional(),
}).strict();

export default InvoiceUpsertWithoutLinesInputSchema;
