import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeCreateWithoutLineInputSchema } from './AllowanceChargeCreateWithoutLineInputSchema';
import { AllowanceChargeUncheckedCreateWithoutLineInputSchema } from './AllowanceChargeUncheckedCreateWithoutLineInputSchema';
import { AllowanceChargeCreateOrConnectWithoutLineInputSchema } from './AllowanceChargeCreateOrConnectWithoutLineInputSchema';
import { AllowanceChargeUpsertWithWhereUniqueWithoutLineInputSchema } from './AllowanceChargeUpsertWithWhereUniqueWithoutLineInputSchema';
import { AllowanceChargeCreateManyLineInputEnvelopeSchema } from './AllowanceChargeCreateManyLineInputEnvelopeSchema';
import { AllowanceChargeWhereUniqueInputSchema } from './AllowanceChargeWhereUniqueInputSchema';
import { AllowanceChargeUpdateWithWhereUniqueWithoutLineInputSchema } from './AllowanceChargeUpdateWithWhereUniqueWithoutLineInputSchema';
import { AllowanceChargeUpdateManyWithWhereWithoutLineInputSchema } from './AllowanceChargeUpdateManyWithWhereWithoutLineInputSchema';
import { AllowanceChargeScalarWhereInputSchema } from './AllowanceChargeScalarWhereInputSchema';

export const AllowanceChargeUpdateManyWithoutLineNestedInputSchema: z.ZodType<Prisma.AllowanceChargeUpdateManyWithoutLineNestedInput> = z.object({
  create: z.union([ z.lazy(() => AllowanceChargeCreateWithoutLineInputSchema), z.lazy(() => AllowanceChargeCreateWithoutLineInputSchema).array(), z.lazy(() => AllowanceChargeUncheckedCreateWithoutLineInputSchema), z.lazy(() => AllowanceChargeUncheckedCreateWithoutLineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AllowanceChargeCreateOrConnectWithoutLineInputSchema), z.lazy(() => AllowanceChargeCreateOrConnectWithoutLineInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AllowanceChargeUpsertWithWhereUniqueWithoutLineInputSchema), z.lazy(() => AllowanceChargeUpsertWithWhereUniqueWithoutLineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AllowanceChargeCreateManyLineInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AllowanceChargeWhereUniqueInputSchema), z.lazy(() => AllowanceChargeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AllowanceChargeWhereUniqueInputSchema), z.lazy(() => AllowanceChargeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AllowanceChargeWhereUniqueInputSchema), z.lazy(() => AllowanceChargeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AllowanceChargeWhereUniqueInputSchema), z.lazy(() => AllowanceChargeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AllowanceChargeUpdateWithWhereUniqueWithoutLineInputSchema), z.lazy(() => AllowanceChargeUpdateWithWhereUniqueWithoutLineInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AllowanceChargeUpdateManyWithWhereWithoutLineInputSchema), z.lazy(() => AllowanceChargeUpdateManyWithWhereWithoutLineInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AllowanceChargeScalarWhereInputSchema), z.lazy(() => AllowanceChargeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AllowanceChargeUpdateManyWithoutLineNestedInputSchema;
