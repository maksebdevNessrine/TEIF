import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerWhereUniqueInputSchema } from './PartnerWhereUniqueInputSchema';
import { PartnerCreateWithoutBuyerInvoicesInputSchema } from './PartnerCreateWithoutBuyerInvoicesInputSchema';
import { PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema } from './PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema';

export const PartnerCreateOrConnectWithoutBuyerInvoicesInputSchema: z.ZodType<Prisma.PartnerCreateOrConnectWithoutBuyerInvoicesInput> = z.object({
  where: z.lazy(() => PartnerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PartnerCreateWithoutBuyerInvoicesInputSchema), z.lazy(() => PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema) ]),
}).strict();

export default PartnerCreateOrConnectWithoutBuyerInvoicesInputSchema;
