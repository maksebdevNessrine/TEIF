import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceCreateWithoutSupplierInputSchema } from './InvoiceCreateWithoutSupplierInputSchema';
import { InvoiceUncheckedCreateWithoutSupplierInputSchema } from './InvoiceUncheckedCreateWithoutSupplierInputSchema';

export const InvoiceCreateOrConnectWithoutSupplierInputSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutSupplierInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutSupplierInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutSupplierInputSchema) ]),
}).strict();

export default InvoiceCreateOrConnectWithoutSupplierInputSchema;
