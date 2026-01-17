import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeWhereUniqueInputSchema } from './AllowanceChargeWhereUniqueInputSchema';
import { AllowanceChargeCreateWithoutInvoiceInputSchema } from './AllowanceChargeCreateWithoutInvoiceInputSchema';
import { AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema } from './AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema';

export const AllowanceChargeCreateOrConnectWithoutInvoiceInputSchema: z.ZodType<Prisma.AllowanceChargeCreateOrConnectWithoutInvoiceInput> = z.object({
  where: z.lazy(() => AllowanceChargeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AllowanceChargeCreateWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema) ]),
}).strict();

export default AllowanceChargeCreateOrConnectWithoutInvoiceInputSchema;
