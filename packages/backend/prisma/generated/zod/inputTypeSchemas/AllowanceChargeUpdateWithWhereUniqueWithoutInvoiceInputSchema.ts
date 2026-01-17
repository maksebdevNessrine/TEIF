import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeWhereUniqueInputSchema } from './AllowanceChargeWhereUniqueInputSchema';
import { AllowanceChargeUpdateWithoutInvoiceInputSchema } from './AllowanceChargeUpdateWithoutInvoiceInputSchema';
import { AllowanceChargeUncheckedUpdateWithoutInvoiceInputSchema } from './AllowanceChargeUncheckedUpdateWithoutInvoiceInputSchema';

export const AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInputSchema: z.ZodType<Prisma.AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInput> = z.object({
  where: z.lazy(() => AllowanceChargeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AllowanceChargeUpdateWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeUncheckedUpdateWithoutInvoiceInputSchema) ]),
}).strict();

export default AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInputSchema;
