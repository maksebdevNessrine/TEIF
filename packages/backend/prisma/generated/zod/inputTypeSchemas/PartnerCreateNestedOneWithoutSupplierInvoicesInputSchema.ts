import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerCreateWithoutSupplierInvoicesInputSchema } from './PartnerCreateWithoutSupplierInvoicesInputSchema';
import { PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema } from './PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema';
import { PartnerCreateOrConnectWithoutSupplierInvoicesInputSchema } from './PartnerCreateOrConnectWithoutSupplierInvoicesInputSchema';
import { PartnerWhereUniqueInputSchema } from './PartnerWhereUniqueInputSchema';

export const PartnerCreateNestedOneWithoutSupplierInvoicesInputSchema: z.ZodType<Prisma.PartnerCreateNestedOneWithoutSupplierInvoicesInput> = z.object({
  create: z.union([ z.lazy(() => PartnerCreateWithoutSupplierInvoicesInputSchema), z.lazy(() => PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PartnerCreateOrConnectWithoutSupplierInvoicesInputSchema).optional(),
  connect: z.lazy(() => PartnerWhereUniqueInputSchema).optional(),
}).strict();

export default PartnerCreateNestedOneWithoutSupplierInvoicesInputSchema;
