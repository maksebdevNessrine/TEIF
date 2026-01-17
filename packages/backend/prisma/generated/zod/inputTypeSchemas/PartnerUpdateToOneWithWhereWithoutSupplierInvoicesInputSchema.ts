import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerWhereInputSchema } from './PartnerWhereInputSchema';
import { PartnerUpdateWithoutSupplierInvoicesInputSchema } from './PartnerUpdateWithoutSupplierInvoicesInputSchema';
import { PartnerUncheckedUpdateWithoutSupplierInvoicesInputSchema } from './PartnerUncheckedUpdateWithoutSupplierInvoicesInputSchema';

export const PartnerUpdateToOneWithWhereWithoutSupplierInvoicesInputSchema: z.ZodType<Prisma.PartnerUpdateToOneWithWhereWithoutSupplierInvoicesInput> = z.object({
  where: z.lazy(() => PartnerWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PartnerUpdateWithoutSupplierInvoicesInputSchema), z.lazy(() => PartnerUncheckedUpdateWithoutSupplierInvoicesInputSchema) ]),
}).strict();

export default PartnerUpdateToOneWithWhereWithoutSupplierInvoicesInputSchema;
