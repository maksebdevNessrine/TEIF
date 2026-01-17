import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineWhereUniqueInputSchema } from './InvoiceLineWhereUniqueInputSchema';
import { InvoiceLineUpdateWithoutInvoiceInputSchema } from './InvoiceLineUpdateWithoutInvoiceInputSchema';
import { InvoiceLineUncheckedUpdateWithoutInvoiceInputSchema } from './InvoiceLineUncheckedUpdateWithoutInvoiceInputSchema';
import { InvoiceLineCreateWithoutInvoiceInputSchema } from './InvoiceLineCreateWithoutInvoiceInputSchema';
import { InvoiceLineUncheckedCreateWithoutInvoiceInputSchema } from './InvoiceLineUncheckedCreateWithoutInvoiceInputSchema';

export const InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoiceLineWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvoiceLineUpdateWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineUncheckedUpdateWithoutInvoiceInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceLineCreateWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineUncheckedCreateWithoutInvoiceInputSchema) ]),
}).strict();

export default InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInputSchema;
