import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineCreateWithoutAllowancesInputSchema } from './InvoiceLineCreateWithoutAllowancesInputSchema';
import { InvoiceLineUncheckedCreateWithoutAllowancesInputSchema } from './InvoiceLineUncheckedCreateWithoutAllowancesInputSchema';
import { InvoiceLineCreateOrConnectWithoutAllowancesInputSchema } from './InvoiceLineCreateOrConnectWithoutAllowancesInputSchema';
import { InvoiceLineWhereUniqueInputSchema } from './InvoiceLineWhereUniqueInputSchema';

export const InvoiceLineCreateNestedOneWithoutAllowancesInputSchema: z.ZodType<Prisma.InvoiceLineCreateNestedOneWithoutAllowancesInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceLineCreateWithoutAllowancesInputSchema), z.lazy(() => InvoiceLineUncheckedCreateWithoutAllowancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceLineCreateOrConnectWithoutAllowancesInputSchema).optional(),
  connect: z.lazy(() => InvoiceLineWhereUniqueInputSchema).optional(),
}).strict();

export default InvoiceLineCreateNestedOneWithoutAllowancesInputSchema;
