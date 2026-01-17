import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineCreateWithoutInvoiceInputSchema } from './InvoiceLineCreateWithoutInvoiceInputSchema';
import { InvoiceLineUncheckedCreateWithoutInvoiceInputSchema } from './InvoiceLineUncheckedCreateWithoutInvoiceInputSchema';
import { InvoiceLineCreateOrConnectWithoutInvoiceInputSchema } from './InvoiceLineCreateOrConnectWithoutInvoiceInputSchema';
import { InvoiceLineCreateManyInvoiceInputEnvelopeSchema } from './InvoiceLineCreateManyInvoiceInputEnvelopeSchema';
import { InvoiceLineWhereUniqueInputSchema } from './InvoiceLineWhereUniqueInputSchema';

export const InvoiceLineCreateNestedManyWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceLineCreateNestedManyWithoutInvoiceInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceLineCreateWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineCreateWithoutInvoiceInputSchema).array(), z.lazy(() => InvoiceLineUncheckedCreateWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceLineCreateOrConnectWithoutInvoiceInputSchema), z.lazy(() => InvoiceLineCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceLineCreateManyInvoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoiceLineWhereUniqueInputSchema), z.lazy(() => InvoiceLineWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default InvoiceLineCreateNestedManyWithoutInvoiceInputSchema;
