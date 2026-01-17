import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateWithoutSupplierInputSchema } from './InvoiceCreateWithoutSupplierInputSchema';
import { InvoiceUncheckedCreateWithoutSupplierInputSchema } from './InvoiceUncheckedCreateWithoutSupplierInputSchema';
import { InvoiceCreateOrConnectWithoutSupplierInputSchema } from './InvoiceCreateOrConnectWithoutSupplierInputSchema';
import { InvoiceUpsertWithWhereUniqueWithoutSupplierInputSchema } from './InvoiceUpsertWithWhereUniqueWithoutSupplierInputSchema';
import { InvoiceCreateManySupplierInputEnvelopeSchema } from './InvoiceCreateManySupplierInputEnvelopeSchema';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceUpdateWithWhereUniqueWithoutSupplierInputSchema } from './InvoiceUpdateWithWhereUniqueWithoutSupplierInputSchema';
import { InvoiceUpdateManyWithWhereWithoutSupplierInputSchema } from './InvoiceUpdateManyWithWhereWithoutSupplierInputSchema';
import { InvoiceScalarWhereInputSchema } from './InvoiceScalarWhereInputSchema';

export const InvoiceUncheckedUpdateManyWithoutSupplierNestedInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateManyWithoutSupplierNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutSupplierInputSchema), z.lazy(() => InvoiceCreateWithoutSupplierInputSchema).array(), z.lazy(() => InvoiceUncheckedCreateWithoutSupplierInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutSupplierInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceCreateOrConnectWithoutSupplierInputSchema), z.lazy(() => InvoiceCreateOrConnectWithoutSupplierInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutSupplierInputSchema), z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutSupplierInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceCreateManySupplierInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutSupplierInputSchema), z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutSupplierInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoiceUpdateManyWithWhereWithoutSupplierInputSchema), z.lazy(() => InvoiceUpdateManyWithWhereWithoutSupplierInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoiceScalarWhereInputSchema), z.lazy(() => InvoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default InvoiceUncheckedUpdateManyWithoutSupplierNestedInputSchema;
