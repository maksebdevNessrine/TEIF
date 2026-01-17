import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeWhereUniqueInputSchema } from './AllowanceChargeWhereUniqueInputSchema';
import { AllowanceChargeUpdateWithoutLineInputSchema } from './AllowanceChargeUpdateWithoutLineInputSchema';
import { AllowanceChargeUncheckedUpdateWithoutLineInputSchema } from './AllowanceChargeUncheckedUpdateWithoutLineInputSchema';

export const AllowanceChargeUpdateWithWhereUniqueWithoutLineInputSchema: z.ZodType<Prisma.AllowanceChargeUpdateWithWhereUniqueWithoutLineInput> = z.object({
  where: z.lazy(() => AllowanceChargeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AllowanceChargeUpdateWithoutLineInputSchema), z.lazy(() => AllowanceChargeUncheckedUpdateWithoutLineInputSchema) ]),
}).strict();

export default AllowanceChargeUpdateWithWhereUniqueWithoutLineInputSchema;
