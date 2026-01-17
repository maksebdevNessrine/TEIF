import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeCreateWithoutLineInputSchema } from './AllowanceChargeCreateWithoutLineInputSchema';
import { AllowanceChargeUncheckedCreateWithoutLineInputSchema } from './AllowanceChargeUncheckedCreateWithoutLineInputSchema';
import { AllowanceChargeCreateOrConnectWithoutLineInputSchema } from './AllowanceChargeCreateOrConnectWithoutLineInputSchema';
import { AllowanceChargeCreateManyLineInputEnvelopeSchema } from './AllowanceChargeCreateManyLineInputEnvelopeSchema';
import { AllowanceChargeWhereUniqueInputSchema } from './AllowanceChargeWhereUniqueInputSchema';

export const AllowanceChargeCreateNestedManyWithoutLineInputSchema: z.ZodType<Prisma.AllowanceChargeCreateNestedManyWithoutLineInput> = z.object({
  create: z.union([ z.lazy(() => AllowanceChargeCreateWithoutLineInputSchema), z.lazy(() => AllowanceChargeCreateWithoutLineInputSchema).array(), z.lazy(() => AllowanceChargeUncheckedCreateWithoutLineInputSchema), z.lazy(() => AllowanceChargeUncheckedCreateWithoutLineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AllowanceChargeCreateOrConnectWithoutLineInputSchema), z.lazy(() => AllowanceChargeCreateOrConnectWithoutLineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AllowanceChargeCreateManyLineInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AllowanceChargeWhereUniqueInputSchema), z.lazy(() => AllowanceChargeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AllowanceChargeCreateNestedManyWithoutLineInputSchema;
