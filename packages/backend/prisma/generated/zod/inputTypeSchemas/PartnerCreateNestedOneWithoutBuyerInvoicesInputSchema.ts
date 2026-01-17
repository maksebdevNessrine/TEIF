import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerCreateWithoutBuyerInvoicesInputSchema } from './PartnerCreateWithoutBuyerInvoicesInputSchema';
import { PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema } from './PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema';
import { PartnerCreateOrConnectWithoutBuyerInvoicesInputSchema } from './PartnerCreateOrConnectWithoutBuyerInvoicesInputSchema';
import { PartnerWhereUniqueInputSchema } from './PartnerWhereUniqueInputSchema';

export const PartnerCreateNestedOneWithoutBuyerInvoicesInputSchema: z.ZodType<Prisma.PartnerCreateNestedOneWithoutBuyerInvoicesInput> = z.object({
  create: z.union([ z.lazy(() => PartnerCreateWithoutBuyerInvoicesInputSchema), z.lazy(() => PartnerUncheckedCreateWithoutBuyerInvoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PartnerCreateOrConnectWithoutBuyerInvoicesInputSchema).optional(),
  connect: z.lazy(() => PartnerWhereUniqueInputSchema).optional(),
}).strict();

export default PartnerCreateNestedOneWithoutBuyerInvoicesInputSchema;
