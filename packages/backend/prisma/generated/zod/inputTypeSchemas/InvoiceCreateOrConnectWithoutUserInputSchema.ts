import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceCreateWithoutUserInputSchema } from './InvoiceCreateWithoutUserInputSchema';
import { InvoiceUncheckedCreateWithoutUserInputSchema } from './InvoiceUncheckedCreateWithoutUserInputSchema';

export const InvoiceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutUserInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default InvoiceCreateOrConnectWithoutUserInputSchema;
