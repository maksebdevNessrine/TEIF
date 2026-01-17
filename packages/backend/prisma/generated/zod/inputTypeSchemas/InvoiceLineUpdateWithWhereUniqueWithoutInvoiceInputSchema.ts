import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineWhereUniqueInputSchema } from './InvoiceLineWhereUniqueInputSchema';
import { InvoiceLineUpdateWithoutInvoiceInputSchema } from './InvoiceLineUpdateWithoutInvoiceInputSchema';
import { InvoiceLineUncheckedUpdateWithoutInvoiceInputSchema } from './InvoiceLineUncheckedUpdateWithoutInvoiceInputSchema';

export const InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoiceLineWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvoiceLineUpdateWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineUncheckedUpdateWithoutInvoiceInputSchema) ]),
}).strict();

export default InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInputSchema;
