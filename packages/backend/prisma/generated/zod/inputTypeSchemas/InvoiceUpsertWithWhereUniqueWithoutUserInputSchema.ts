import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceUpdateWithoutUserInputSchema } from './InvoiceUpdateWithoutUserInputSchema';
import { InvoiceUncheckedUpdateWithoutUserInputSchema } from './InvoiceUncheckedUpdateWithoutUserInputSchema';
import { InvoiceCreateWithoutUserInputSchema } from './InvoiceCreateWithoutUserInputSchema';
import { InvoiceUncheckedCreateWithoutUserInputSchema } from './InvoiceUncheckedCreateWithoutUserInputSchema';

export const InvoiceUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.InvoiceUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvoiceUpdateWithoutUserInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutUserInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default InvoiceUpsertWithWhereUniqueWithoutUserInputSchema;
