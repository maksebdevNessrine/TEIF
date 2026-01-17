import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceUpdateWithoutAllowancesInputSchema } from './InvoiceUpdateWithoutAllowancesInputSchema';
import { InvoiceUncheckedUpdateWithoutAllowancesInputSchema } from './InvoiceUncheckedUpdateWithoutAllowancesInputSchema';
import { InvoiceCreateWithoutAllowancesInputSchema } from './InvoiceCreateWithoutAllowancesInputSchema';
import { InvoiceUncheckedCreateWithoutAllowancesInputSchema } from './InvoiceUncheckedCreateWithoutAllowancesInputSchema';
import { InvoiceWhereInputSchema } from './InvoiceWhereInputSchema';

export const InvoiceUpsertWithoutAllowancesInputSchema: z.ZodType<Prisma.InvoiceUpsertWithoutAllowancesInput> = z.object({
  update: z.union([ z.lazy(() => InvoiceUpdateWithoutAllowancesInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutAllowancesInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutAllowancesInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutAllowancesInputSchema) ]),
  where: z.lazy(() => InvoiceWhereInputSchema).optional(),
}).strict();

export default InvoiceUpsertWithoutAllowancesInputSchema;
