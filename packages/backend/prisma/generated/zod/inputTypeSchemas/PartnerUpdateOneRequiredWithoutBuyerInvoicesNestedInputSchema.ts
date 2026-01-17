import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerCreateWithoutBuyerInvoicesInputSchema } from './PartnerCreateWithoutBuyerInvoicesInputSchema';
import { PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema } from './PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema';
import { PartnerCreateOrConnectWithoutBuyerInvoicesInputSchema } from './PartnerCreateOrConnectWithoutBuyerInvoicesInputSchema';
import { PartnerUpsertWithoutBuyerInvoicesInputSchema } from './PartnerUpsertWithoutBuyerInvoicesInputSchema';
import { PartnerWhereUniqueInputSchema } from './PartnerWhereUniqueInputSchema';
import { PartnerUpdateToOneWithWhereWithoutBuyerInvoicesInputSchema } from './PartnerUpdateToOneWithWhereWithoutBuyerInvoicesInputSchema';
import { PartnerUpdateWithoutBuyerInvoicesInputSchema } from './PartnerUpdateWithoutBuyerInvoicesInputSchema';
import { PartnerUncheckedUpdateWithoutBuyerInvoicesInputSchema } from './PartnerUncheckedUpdateWithoutBuyerInvoicesInputSchema';

export const PartnerUpdateOneRequiredWithoutBuyerInvoicesNestedInputSchema: z.ZodType<Prisma.PartnerUpdateOneRequiredWithoutBuyerInvoicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartnerCreateWithoutBuyerInvoicesInputSchema), z.lazy(() => PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PartnerCreateOrConnectWithoutBuyerInvoicesInputSchema).optional(),
  upsert: z.lazy(() => PartnerUpsertWithoutBuyerInvoicesInputSchema).optional(),
  connect: z.lazy(() => PartnerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PartnerUpdateToOneWithWhereWithoutBuyerInvoicesInputSchema), z.lazy(() => PartnerUpdateWithoutBuyerInvoicesInputSchema), z.lazy(() => PartnerUncheckedUpdateWithoutBuyerInvoicesInputSchema) ]).optional(),
}).strict();

export default PartnerUpdateOneRequiredWithoutBuyerInvoicesNestedInputSchema;
