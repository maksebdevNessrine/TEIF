import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceUpdateWithoutBuyerInputSchema } from './InvoiceUpdateWithoutBuyerInputSchema';
import { InvoiceUncheckedUpdateWithoutBuyerInputSchema } from './InvoiceUncheckedUpdateWithoutBuyerInputSchema';
import { InvoiceCreateWithoutBuyerInputSchema } from './InvoiceCreateWithoutBuyerInputSchema';
import { InvoiceUncheckedCreateWithoutBuyerInputSchema } from './InvoiceUncheckedCreateWithoutBuyerInputSchema';

export const InvoiceUpsertWithWhereUniqueWithoutBuyerInputSchema: z.ZodType<Prisma.InvoiceUpsertWithWhereUniqueWithoutBuyerInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvoiceUpdateWithoutBuyerInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutBuyerInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutBuyerInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutBuyerInputSchema) ]),
}).strict();

export default InvoiceUpsertWithWhereUniqueWithoutBuyerInputSchema;
