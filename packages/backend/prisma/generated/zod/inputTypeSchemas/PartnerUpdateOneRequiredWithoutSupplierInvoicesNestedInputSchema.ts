import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerCreateWithoutSupplierInvoicesInputSchema } from './PartnerCreateWithoutSupplierInvoicesInputSchema';
import { PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema } from './PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema';
import { PartnerCreateOrConnectWithoutSupplierInvoicesInputSchema } from './PartnerCreateOrConnectWithoutSupplierInvoicesInputSchema';
import { PartnerUpsertWithoutSupplierInvoicesInputSchema } from './PartnerUpsertWithoutSupplierInvoicesInputSchema';
import { PartnerWhereUniqueInputSchema } from './PartnerWhereUniqueInputSchema';
import { PartnerUpdateToOneWithWhereWithoutSupplierInvoicesInputSchema } from './PartnerUpdateToOneWithWhereWithoutSupplierInvoicesInputSchema';
import { PartnerUpdateWithoutSupplierInvoicesInputSchema } from './PartnerUpdateWithoutSupplierInvoicesInputSchema';
import { PartnerUncheckedUpdateWithoutSupplierInvoicesInputSchema } from './PartnerUncheckedUpdateWithoutSupplierInvoicesInputSchema';

export const PartnerUpdateOneRequiredWithoutSupplierInvoicesNestedInputSchema: z.ZodType<Prisma.PartnerUpdateOneRequiredWithoutSupplierInvoicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartnerCreateWithoutSupplierInvoicesInputSchema), z.lazy(() => PartnerUncheckedCreateWithoutSupplierInvoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PartnerCreateOrConnectWithoutSupplierInvoicesInputSchema).optional(),
  upsert: z.lazy(() => PartnerUpsertWithoutSupplierInvoicesInputSchema).optional(),
  connect: z.lazy(() => PartnerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PartnerUpdateToOneWithWhereWithoutSupplierInvoicesInputSchema), z.lazy(() => PartnerUpdateWithoutSupplierInvoicesInputSchema), z.lazy(() => PartnerUncheckedUpdateWithoutSupplierInvoicesInputSchema) ]).optional(),
}).strict();

export default PartnerUpdateOneRequiredWithoutSupplierInvoicesNestedInputSchema;
