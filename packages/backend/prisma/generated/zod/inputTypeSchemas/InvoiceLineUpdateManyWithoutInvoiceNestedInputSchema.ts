import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineCreateWithoutInvoiceInputSchema } from './InvoiceLineCreateWithoutInvoiceInputSchema';
import { InvoiceLineUncheckedCreateWithoutInvoiceInputSchema } from './InvoiceLineUncheckedCreateWithoutInvoiceInputSchema';
import { InvoiceLineCreateOrConnectWithoutInvoiceInputSchema } from './InvoiceLineCreateOrConnectWithoutInvoiceInputSchema';
import { InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInputSchema } from './InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInputSchema';
import { InvoiceLineCreateManyInvoiceInputEnvelopeSchema } from './InvoiceLineCreateManyInvoiceInputEnvelopeSchema';
import { InvoiceLineWhereUniqueInputSchema } from './InvoiceLineWhereUniqueInputSchema';
import { InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInputSchema } from './InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInputSchema';
import { InvoiceLineUpdateManyWithWhereWithoutInvoiceInputSchema } from './InvoiceLineUpdateManyWithWhereWithoutInvoiceInputSchema';
import { InvoiceLineScalarWhereInputSchema } from './InvoiceLineScalarWhereInputSchema';

export const InvoiceLineUpdateManyWithoutInvoiceNestedInputSchema: z.ZodType<Prisma.InvoiceLineUpdateManyWithoutInvoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceLineCreateWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineCreateWithoutInvoiceInputSchema).array(), z.lazy(() => InvoiceLineUncheckedCreateWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceLineCreateOrConnectWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineUpsertWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceLineCreateManyInvoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoiceLineWhereUniqueInputSchema), z.lazy(() => InvoiceLineWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoiceLineWhereUniqueInputSchema), z.lazy(() => InvoiceLineWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoiceLineWhereUniqueInputSchema), z.lazy(() => InvoiceLineWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoiceLineWhereUniqueInputSchema), z.lazy(() => InvoiceLineWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineUpdateWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoiceLineUpdateManyWithWhereWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineUpdateManyWithWhereWithoutInvoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoiceLineScalarWhereInputSchema), z.lazy(() => InvoiceLineScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default InvoiceLineUpdateManyWithoutInvoiceNestedInputSchema;
