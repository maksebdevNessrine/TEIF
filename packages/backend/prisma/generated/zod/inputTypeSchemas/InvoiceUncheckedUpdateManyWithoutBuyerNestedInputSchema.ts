import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateWithoutBuyerInputSchema } from './InvoiceCreateWithoutBuyerInputSchema';
import { InvoiceUncheckedCreateWithoutBuyerInputSchema } from './InvoiceUncheckedCreateWithoutBuyerInputSchema';
import { InvoiceCreateOrConnectWithoutBuyerInputSchema } from './InvoiceCreateOrConnectWithoutBuyerInputSchema';
import { InvoiceUpsertWithWhereUniqueWithoutBuyerInputSchema } from './InvoiceUpsertWithWhereUniqueWithoutBuyerInputSchema';
import { InvoiceCreateManyBuyerInputEnvelopeSchema } from './InvoiceCreateManyBuyerInputEnvelopeSchema';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceUpdateWithWhereUniqueWithoutBuyerInputSchema } from './InvoiceUpdateWithWhereUniqueWithoutBuyerInputSchema';
import { InvoiceUpdateManyWithWhereWithoutBuyerInputSchema } from './InvoiceUpdateManyWithWhereWithoutBuyerInputSchema';
import { InvoiceScalarWhereInputSchema } from './InvoiceScalarWhereInputSchema';

export const InvoiceUncheckedUpdateManyWithoutBuyerNestedInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateManyWithoutBuyerNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutBuyerInputSchema), z.lazy(() => InvoiceCreateWithoutBuyerInputSchema).array(), z.lazy(() => InvoiceUncheckedCreateWithoutBuyerInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutBuyerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceCreateOrConnectWithoutBuyerInputSchema), z.lazy(() => InvoiceCreateOrConnectWithoutBuyerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutBuyerInputSchema), z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutBuyerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyBuyerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutBuyerInputSchema), z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutBuyerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoiceUpdateManyWithWhereWithoutBuyerInputSchema), z.lazy(() => InvoiceUpdateManyWithWhereWithoutBuyerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoiceScalarWhereInputSchema), z.lazy(() => InvoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default InvoiceUncheckedUpdateManyWithoutBuyerNestedInputSchema;
