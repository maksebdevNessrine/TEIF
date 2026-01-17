import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeCreateWithoutInvoiceInputSchema } from './AllowanceChargeCreateWithoutInvoiceInputSchema';
import { AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema } from './AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema';
import { AllowanceChargeCreateOrConnectWithoutInvoiceInputSchema } from './AllowanceChargeCreateOrConnectWithoutInvoiceInputSchema';
import { AllowanceChargeCreateManyInvoiceInputEnvelopeSchema } from './AllowanceChargeCreateManyInvoiceInputEnvelopeSchema';
import { AllowanceChargeWhereUniqueInputSchema } from './AllowanceChargeWhereUniqueInputSchema';

export const AllowanceChargeUncheckedCreateNestedManyWithoutInvoiceInputSchema: z.ZodType<Prisma.AllowanceChargeUncheckedCreateNestedManyWithoutInvoiceInput> = z.object({
  create: z.union([ z.lazy(() => AllowanceChargeCreateWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeCreateWithoutInvoiceInputSchema).array(), z.lazy(() => AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AllowanceChargeCreateOrConnectWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AllowanceChargeCreateManyInvoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AllowanceChargeWhereUniqueInputSchema), z.lazy(() => AllowanceChargeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default AllowanceChargeUncheckedCreateNestedManyWithoutInvoiceInputSchema;
