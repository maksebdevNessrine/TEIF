import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerWhereInputSchema } from './PartnerWhereInputSchema';
import { PartnerUpdateWithoutBuyerInvoicesInputSchema } from './PartnerUpdateWithoutBuyerInvoicesInputSchema';
import { PartnerUncheckedUpdateWithoutBuyerInvoicesInputSchema } from './PartnerUncheckedUpdateWithoutBuyerInvoicesInputSchema';

export const PartnerUpdateToOneWithWhereWithoutBuyerInvoicesInputSchema: z.ZodType<Prisma.PartnerUpdateToOneWithWhereWithoutBuyerInvoicesInput> = z.object({
  where: z.lazy(() => PartnerWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PartnerUpdateWithoutBuyerInvoicesInputSchema), z.lazy(() => PartnerUncheckedUpdateWithoutBuyerInvoicesInputSchema) ]),
}).strict();

export default PartnerUpdateToOneWithWhereWithoutBuyerInvoicesInputSchema;
