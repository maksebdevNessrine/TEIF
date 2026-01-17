import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerUpdateWithoutSupplierInvoicesInputSchema } from './PartnerUpdateWithoutSupplierInvoicesInputSchema';
import { PartnerUncheckedUpdateWithoutSupplierInvoicesInputSchema } from './PartnerUncheckedUpdateWithoutSupplierInvoicesInputSchema';
import { PartnerCreateWithoutSupplierInvoicesInputSchema } from './PartnerCreateWithoutSupplierInvoicesInputSchema';
import { PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema } from './PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema';
import { PartnerWhereInputSchema } from './PartnerWhereInputSchema';

export const PartnerUpsertWithoutSupplierInvoicesInputSchema: z.ZodType<Prisma.PartnerUpsertWithoutSupplierInvoicesInput> = z.object({
  update: z.union([ z.lazy(() => PartnerUpdateWithoutSupplierInvoicesInputSchema), z.lazy(() => PartnerUncheckedUpdateWithoutSupplierInvoicesInputSchema) ]),
  create: z.union([ z.lazy(() => PartnerCreateWithoutSupplierInvoicesInputSchema), z.lazy(() => PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema) ]),
  where: z.lazy(() => PartnerWhereInputSchema).optional(),
}).strict();

export default PartnerUpsertWithoutSupplierInvoicesInputSchema;
