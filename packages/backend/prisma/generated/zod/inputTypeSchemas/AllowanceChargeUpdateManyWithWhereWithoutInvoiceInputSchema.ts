import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeScalarWhereInputSchema } from './AllowanceChargeScalarWhereInputSchema';
import { AllowanceChargeUpdateManyMutationInputSchema } from './AllowanceChargeUpdateManyMutationInputSchema';
import { AllowanceChargeUncheckedUpdateManyWithoutInvoiceInputSchema } from './AllowanceChargeUncheckedUpdateManyWithoutInvoiceInputSchema';

export const AllowanceChargeUpdateManyWithWhereWithoutInvoiceInputSchema: z.ZodType<Prisma.AllowanceChargeUpdateManyWithWhereWithoutInvoiceInput> = z.object({
  where: z.lazy(() => AllowanceChargeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AllowanceChargeUpdateManyMutationInputSchema), z.lazy(() => AllowanceChargeUncheckedUpdateManyWithoutInvoiceInputSchema) ]),
}).strict();

export default AllowanceChargeUpdateManyWithWhereWithoutInvoiceInputSchema;
