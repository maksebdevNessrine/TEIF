import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeWhereUniqueInputSchema } from './AllowanceChargeWhereUniqueInputSchema';
import { AllowanceChargeUpdateWithoutInvoiceInputSchema } from './AllowanceChargeUpdateWithoutInvoiceInputSchema';
import { AllowanceChargeUncheckedUpdateWithoutInvoiceInputSchema } from './AllowanceChargeUncheckedUpdateWithoutInvoiceInputSchema';
import { AllowanceChargeCreateWithoutInvoiceInputSchema } from './AllowanceChargeCreateWithoutInvoiceInputSchema';
import { AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema } from './AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema';

export const AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInputSchema: z.ZodType<Prisma.AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInput> = z.object({
  where: z.lazy(() => AllowanceChargeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AllowanceChargeUpdateWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeUncheckedUpdateWithoutInvoiceInputSchema) ]),
  create: z.union([ z.lazy(() => AllowanceChargeCreateWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema) ]),
}).strict();

export default AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInputSchema;
