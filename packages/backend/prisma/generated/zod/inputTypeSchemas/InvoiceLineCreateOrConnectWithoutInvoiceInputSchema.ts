import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineWhereUniqueInputSchema } from './InvoiceLineWhereUniqueInputSchema';
import { InvoiceLineCreateWithoutInvoiceInputSchema } from './InvoiceLineCreateWithoutInvoiceInputSchema';
import { InvoiceLineUncheckedCreateWithoutInvoiceInputSchema } from './InvoiceLineUncheckedCreateWithoutInvoiceInputSchema';

export const InvoiceLineCreateOrConnectWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceLineCreateOrConnectWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoiceLineWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceLineCreateWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineUncheckedCreateWithoutInvoiceInputSchema) ]),
}).strict();

export default InvoiceLineCreateOrConnectWithoutInvoiceInputSchema;
