import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateWithoutUserInputSchema } from './InvoiceCreateWithoutUserInputSchema';
import { InvoiceUncheckedCreateWithoutUserInputSchema } from './InvoiceUncheckedCreateWithoutUserInputSchema';
import { InvoiceCreateOrConnectWithoutUserInputSchema } from './InvoiceCreateOrConnectWithoutUserInputSchema';
import { InvoiceUpsertWithWhereUniqueWithoutUserInputSchema } from './InvoiceUpsertWithWhereUniqueWithoutUserInputSchema';
import { InvoiceCreateManyUserInputEnvelopeSchema } from './InvoiceCreateManyUserInputEnvelopeSchema';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceUpdateWithWhereUniqueWithoutUserInputSchema } from './InvoiceUpdateWithWhereUniqueWithoutUserInputSchema';
import { InvoiceUpdateManyWithWhereWithoutUserInputSchema } from './InvoiceUpdateManyWithWhereWithoutUserInputSchema';
import { InvoiceScalarWhereInputSchema } from './InvoiceScalarWhereInputSchema';

export const InvoiceUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutUserInputSchema), z.lazy(() => InvoiceCreateWithoutUserInputSchema).array(), z.lazy(() => InvoiceUncheckedCreateWithoutUserInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceCreateOrConnectWithoutUserInputSchema), z.lazy(() => InvoiceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoiceUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => InvoiceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoiceScalarWhereInputSchema), z.lazy(() => InvoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default InvoiceUncheckedUpdateManyWithoutUserNestedInputSchema;
