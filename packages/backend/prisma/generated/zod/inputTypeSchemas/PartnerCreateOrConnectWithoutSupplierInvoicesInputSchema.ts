import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerWhereUniqueInputSchema } from './PartnerWhereUniqueInputSchema';
import { PartnerCreateWithoutSupplierInvoicesInputSchema } from './PartnerCreateWithoutSupplierInvoicesInputSchema';
import { PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema } from './PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema';

export const PartnerCreateOrConnectWithoutSupplierInvoicesInputSchema: z.ZodType<Prisma.PartnerCreateOrConnectWithoutSupplierInvoicesInput> = z.object({
  where: z.lazy(() => PartnerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PartnerCreateWithoutSupplierInvoicesInputSchema), z.lazy(() => PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema) ]),
}).strict();

export default PartnerCreateOrConnectWithoutSupplierInvoicesInputSchema;
