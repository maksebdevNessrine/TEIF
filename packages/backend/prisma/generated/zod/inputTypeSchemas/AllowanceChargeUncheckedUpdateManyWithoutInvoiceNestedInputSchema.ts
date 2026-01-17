import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeCreateWithoutInvoiceInputSchema } from './AllowanceChargeCreateWithoutInvoiceInputSchema';
import { AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema } from './AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema';
import { AllowanceChargeCreateOrConnectWithoutInvoiceInputSchema } from './AllowanceChargeCreateOrConnectWithoutInvoiceInputSchema';
import { AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInputSchema } from './AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInputSchema';
import { AllowanceChargeCreateManyInvoiceInputEnvelopeSchema } from './AllowanceChargeCreateManyInvoiceInputEnvelopeSchema';
import { AllowanceChargeWhereUniqueInputSchema } from './AllowanceChargeWhereUniqueInputSchema';
import { AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInputSchema } from './AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInputSchema';
import { AllowanceChargeUpdateManyWithWhereWithoutInvoiceInputSchema } from './AllowanceChargeUpdateManyWithWhereWithoutInvoiceInputSchema';
import { AllowanceChargeScalarWhereInputSchema } from './AllowanceChargeScalarWhereInputSchema';

export const AllowanceChargeUncheckedUpdateManyWithoutInvoiceNestedInputSchema: z.ZodType<Prisma.AllowanceChargeUncheckedUpdateManyWithoutInvoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => AllowanceChargeCreateWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeCreateWithoutInvoiceInputSchema).array(), z.lazy(() => AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AllowanceChargeCreateOrConnectWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeUpsertWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AllowanceChargeCreateManyInvoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AllowanceChargeWhereUniqueInputSchema), z.lazy(() => AllowanceChargeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AllowanceChargeWhereUniqueInputSchema), z.lazy(() => AllowanceChargeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AllowanceChargeWhereUniqueInputSchema), z.lazy(() => AllowanceChargeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AllowanceChargeWhereUniqueInputSchema), z.lazy(() => AllowanceChargeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeUpdateWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AllowanceChargeUpdateManyWithWhereWithoutInvoiceInputSchema), z.lazy(() => AllowanceChargeUpdateManyWithWhereWithoutInvoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AllowanceChargeScalarWhereInputSchema), z.lazy(() => AllowanceChargeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AllowanceChargeUncheckedUpdateManyWithoutInvoiceNestedInputSchema;
