import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateWithoutAllowancesInputSchema } from './InvoiceCreateWithoutAllowancesInputSchema';
import { InvoiceUncheckedCreateWithoutAllowancesInputSchema } from './InvoiceUncheckedCreateWithoutAllowancesInputSchema';
import { InvoiceCreateOrConnectWithoutAllowancesInputSchema } from './InvoiceCreateOrConnectWithoutAllowancesInputSchema';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';

export const InvoiceCreateNestedOneWithoutAllowancesInputSchema: z.ZodType<Prisma.InvoiceCreateNestedOneWithoutAllowancesInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutAllowancesInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutAllowancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutAllowancesInputSchema).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputSchema).optional(),
}).strict();

export default InvoiceCreateNestedOneWithoutAllowancesInputSchema;
