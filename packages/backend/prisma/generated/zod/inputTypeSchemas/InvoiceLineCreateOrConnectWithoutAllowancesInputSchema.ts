import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineWhereUniqueInputSchema } from './InvoiceLineWhereUniqueInputSchema';
import { InvoiceLineCreateWithoutAllowancesInputSchema } from './InvoiceLineCreateWithoutAllowancesInputSchema';
import { InvoiceLineUncheckedCreateWithoutAllowancesInputSchema } from './InvoiceLineUncheckedCreateWithoutAllowancesInputSchema';

export const InvoiceLineCreateOrConnectWithoutAllowancesInputSchema: z.ZodType<Prisma.InvoiceLineCreateOrConnectWithoutAllowancesInput> = z.object({
  where: z.lazy(() => InvoiceLineWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceLineCreateWithoutAllowancesInputSchema), z.lazy(() => InvoiceLineUncheckedCreateWithoutAllowancesInputSchema) ]),
}).strict();

export default InvoiceLineCreateOrConnectWithoutAllowancesInputSchema;
