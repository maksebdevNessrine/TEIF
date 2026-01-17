import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerUpdateWithoutBuyerInvoicesInputSchema } from './PartnerUpdateWithoutBuyerInvoicesInputSchema';
import { PartnerUncheckedUpdateWithoutBuyerInvoicesInputSchema } from './PartnerUncheckedUpdateWithoutBuyerInvoicesInputSchema';
import { PartnerCreateWithoutBuyerInvoicesInputSchema } from './PartnerCreateWithoutBuyerInvoicesInputSchema';
import { PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema } from './PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema';
import { PartnerWhereInputSchema } from './PartnerWhereInputSchema';

export const PartnerUpsertWithoutBuyerInvoicesInputSchema: z.ZodType<Prisma.PartnerUpsertWithoutBuyerInvoicesInput> = z.object({
  update: z.union([ z.lazy(() => PartnerUpdateWithoutBuyerInvoicesInputSchema), z.lazy(() => PartnerUncheckedUpdateWithoutBuyerInvoicesInputSchema) ]),
  create: z.union([ z.lazy(() => PartnerCreateWithoutBuyerInvoicesInputSchema), z.lazy(() => PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema) ]),
  where: z.lazy(() => PartnerWhereInputSchema).optional(),
}).strict();

export default PartnerUpsertWithoutBuyerInvoicesInputSchema;
