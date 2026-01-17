import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceUpdateWithoutSupplierInputSchema } from './InvoiceUpdateWithoutSupplierInputSchema';
import { InvoiceUncheckedUpdateWithoutSupplierInputSchema } from './InvoiceUncheckedUpdateWithoutSupplierInputSchema';

export const InvoiceUpdateWithWhereUniqueWithoutSupplierInputSchema: z.ZodType<Prisma.InvoiceUpdateWithWhereUniqueWithoutSupplierInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvoiceUpdateWithoutSupplierInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutSupplierInputSchema) ]),
}).strict();

export default InvoiceUpdateWithWhereUniqueWithoutSupplierInputSchema;
