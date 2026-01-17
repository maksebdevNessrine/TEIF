import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeWhereUniqueInputSchema } from './AllowanceChargeWhereUniqueInputSchema';
import { AllowanceChargeUpdateWithoutLineInputSchema } from './AllowanceChargeUpdateWithoutLineInputSchema';
import { AllowanceChargeUncheckedUpdateWithoutLineInputSchema } from './AllowanceChargeUncheckedUpdateWithoutLineInputSchema';
import { AllowanceChargeCreateWithoutLineInputSchema } from './AllowanceChargeCreateWithoutLineInputSchema';
import { AllowanceChargeUncheckedCreateWithoutLineInputSchema } from './AllowanceChargeUncheckedCreateWithoutLineInputSchema';

export const AllowanceChargeUpsertWithWhereUniqueWithoutLineInputSchema: z.ZodType<Prisma.AllowanceChargeUpsertWithWhereUniqueWithoutLineInput> = z.object({
  where: z.lazy(() => AllowanceChargeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AllowanceChargeUpdateWithoutLineInputSchema), z.lazy(() => AllowanceChargeUncheckedUpdateWithoutLineInputSchema) ]),
  create: z.union([ z.lazy(() => AllowanceChargeCreateWithoutLineInputSchema), z.lazy(() => AllowanceChargeUncheckedCreateWithoutLineInputSchema) ]),
}).strict();

export default AllowanceChargeUpsertWithWhereUniqueWithoutLineInputSchema;
