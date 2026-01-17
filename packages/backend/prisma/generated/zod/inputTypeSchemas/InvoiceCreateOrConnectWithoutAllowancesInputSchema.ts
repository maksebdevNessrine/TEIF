import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceCreateWithoutAllowancesInputSchema } from './InvoiceCreateWithoutAllowancesInputSchema';
import { InvoiceUncheckedCreateWithoutAllowancesInputSchema } from './InvoiceUncheckedCreateWithoutAllowancesInputSchema';

export const InvoiceCreateOrConnectWithoutAllowancesInputSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutAllowancesInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutAllowancesInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutAllowancesInputSchema) ]),
}).strict();

export default InvoiceCreateOrConnectWithoutAllowancesInputSchema;
