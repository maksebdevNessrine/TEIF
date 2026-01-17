import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeWhereUniqueInputSchema } from './AllowanceChargeWhereUniqueInputSchema';
import { AllowanceChargeCreateWithoutLineInputSchema } from './AllowanceChargeCreateWithoutLineInputSchema';
import { AllowanceChargeUncheckedCreateWithoutLineInputSchema } from './AllowanceChargeUncheckedCreateWithoutLineInputSchema';

export const AllowanceChargeCreateOrConnectWithoutLineInputSchema: z.ZodType<Prisma.AllowanceChargeCreateOrConnectWithoutLineInput> = z.object({
  where: z.lazy(() => AllowanceChargeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AllowanceChargeCreateWithoutLineInputSchema), z.lazy(() => AllowanceChargeUncheckedCreateWithoutLineInputSchema) ]),
}).strict();

export default AllowanceChargeCreateOrConnectWithoutLineInputSchema;
