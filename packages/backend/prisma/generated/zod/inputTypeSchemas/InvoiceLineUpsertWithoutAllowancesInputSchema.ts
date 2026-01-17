import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineUpdateWithoutAllowancesInputSchema } from './InvoiceLineUpdateWithoutAllowancesInputSchema';
import { InvoiceLineUncheckedUpdateWithoutAllowancesInputSchema } from './InvoiceLineUncheckedUpdateWithoutAllowancesInputSchema';
import { InvoiceLineCreateWithoutAllowancesInputSchema } from './InvoiceLineCreateWithoutAllowancesInputSchema';
import { InvoiceLineUncheckedCreateWithoutAllowancesInputSchema } from './InvoiceLineUncheckedCreateWithoutAllowancesInputSchema';
import { InvoiceLineWhereInputSchema } from './InvoiceLineWhereInputSchema';

export const InvoiceLineUpsertWithoutAllowancesInputSchema: z.ZodType<Prisma.InvoiceLineUpsertWithoutAllowancesInput> = z.object({
  update: z.union([ z.lazy(() => InvoiceLineUpdateWithoutAllowancesInputSchema), z.lazy(() => InvoiceLineUncheckedUpdateWithoutAllowancesInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceLineCreateWithoutAllowancesInputSchema), z.lazy(() => InvoiceLineUncheckedCreateWithoutAllowancesInputSchema) ]),
  where: z.lazy(() => InvoiceLineWhereInputSchema).optional(),
}).strict();

export default InvoiceLineUpsertWithoutAllowancesInputSchema;
