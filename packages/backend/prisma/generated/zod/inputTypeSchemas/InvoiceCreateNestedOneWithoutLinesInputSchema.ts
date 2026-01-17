import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateWithoutLinesInputSchema } from './InvoiceCreateWithoutLinesInputSchema';
import { InvoiceUncheckedCreateWithoutLinesInputSchema } from './InvoiceUncheckedCreateWithoutLinesInputSchema';
import { InvoiceCreateOrConnectWithoutLinesInputSchema } from './InvoiceCreateOrConnectWithoutLinesInputSchema';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';

export const InvoiceCreateNestedOneWithoutLinesInputSchema: z.ZodType<Prisma.InvoiceCreateNestedOneWithoutLinesInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutLinesInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutLinesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutLinesInputSchema).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputSchema).optional(),
}).strict();

export default InvoiceCreateNestedOneWithoutLinesInputSchema;
