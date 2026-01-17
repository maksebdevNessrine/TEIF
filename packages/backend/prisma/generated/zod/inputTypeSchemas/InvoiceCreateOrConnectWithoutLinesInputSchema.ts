import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceCreateWithoutLinesInputSchema } from './InvoiceCreateWithoutLinesInputSchema';
import { InvoiceUncheckedCreateWithoutLinesInputSchema } from './InvoiceUncheckedCreateWithoutLinesInputSchema';

export const InvoiceCreateOrConnectWithoutLinesInputSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutLinesInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutLinesInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutLinesInputSchema) ]),
}).strict();

export default InvoiceCreateOrConnectWithoutLinesInputSchema;
