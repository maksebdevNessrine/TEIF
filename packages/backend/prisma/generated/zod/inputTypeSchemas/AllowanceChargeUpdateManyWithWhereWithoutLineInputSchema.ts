import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeScalarWhereInputSchema } from './AllowanceChargeScalarWhereInputSchema';
import { AllowanceChargeUpdateManyMutationInputSchema } from './AllowanceChargeUpdateManyMutationInputSchema';
import { AllowanceChargeUncheckedUpdateManyWithoutLineInputSchema } from './AllowanceChargeUncheckedUpdateManyWithoutLineInputSchema';

export const AllowanceChargeUpdateManyWithWhereWithoutLineInputSchema: z.ZodType<Prisma.AllowanceChargeUpdateManyWithWhereWithoutLineInput> = z.object({
  where: z.lazy(() => AllowanceChargeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AllowanceChargeUpdateManyMutationInputSchema), z.lazy(() => AllowanceChargeUncheckedUpdateManyWithoutLineInputSchema) ]),
}).strict();

export default AllowanceChargeUpdateManyWithWhereWithoutLineInputSchema;
