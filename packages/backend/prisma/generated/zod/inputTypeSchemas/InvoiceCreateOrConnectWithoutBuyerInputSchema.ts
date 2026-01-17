import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceCreateWithoutBuyerInputSchema } from './InvoiceCreateWithoutBuyerInputSchema';
import { InvoiceUncheckedCreateWithoutBuyerInputSchema } from './InvoiceUncheckedCreateWithoutBuyerInputSchema';

export const InvoiceCreateOrConnectWithoutBuyerInputSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutBuyerInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutBuyerInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutBuyerInputSchema) ]),
}).strict();

export default InvoiceCreateOrConnectWithoutBuyerInputSchema;
