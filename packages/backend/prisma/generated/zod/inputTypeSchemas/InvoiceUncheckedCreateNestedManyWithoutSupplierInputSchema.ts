import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateWithoutSupplierInputSchema } from './InvoiceCreateWithoutSupplierInputSchema';
import { InvoiceUncheckedCreateWithoutSupplierInputSchema } from './InvoiceUncheckedCreateWithoutSupplierInputSchema';
import { InvoiceCreateOrConnectWithoutSupplierInputSchema } from './InvoiceCreateOrConnectWithoutSupplierInputSchema';
import { InvoiceCreateManySupplierInputEnvelopeSchema } from './InvoiceCreateManySupplierInputEnvelopeSchema';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';

export const InvoiceUncheckedCreateNestedManyWithoutSupplierInputSchema: z.ZodType<Prisma.InvoiceUncheckedCreateNestedManyWithoutSupplierInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutSupplierInputSchema), z.lazy(() => InvoiceCreateWithoutSupplierInputSchema).array(), z.lazy(() => InvoiceUncheckedCreateWithoutSupplierInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutSupplierInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceCreateOrConnectWithoutSupplierInputSchema), z.lazy(() => InvoiceCreateOrConnectWithoutSupplierInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceCreateManySupplierInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default InvoiceUncheckedCreateNestedManyWithoutSupplierInputSchema;
