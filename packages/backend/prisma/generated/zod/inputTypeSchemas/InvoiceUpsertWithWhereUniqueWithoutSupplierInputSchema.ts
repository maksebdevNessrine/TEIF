import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceUpdateWithoutSupplierInputSchema } from './InvoiceUpdateWithoutSupplierInputSchema';
import { InvoiceUncheckedUpdateWithoutSupplierInputSchema } from './InvoiceUncheckedUpdateWithoutSupplierInputSchema';
import { InvoiceCreateWithoutSupplierInputSchema } from './InvoiceCreateWithoutSupplierInputSchema';
import { InvoiceUncheckedCreateWithoutSupplierInputSchema } from './InvoiceUncheckedCreateWithoutSupplierInputSchema';

export const InvoiceUpsertWithWhereUniqueWithoutSupplierInputSchema: z.ZodType<Prisma.InvoiceUpsertWithWhereUniqueWithoutSupplierInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvoiceUpdateWithoutSupplierInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutSupplierInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutSupplierInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutSupplierInputSchema) ]),
}).strict();

export default InvoiceUpsertWithWhereUniqueWithoutSupplierInputSchema;
