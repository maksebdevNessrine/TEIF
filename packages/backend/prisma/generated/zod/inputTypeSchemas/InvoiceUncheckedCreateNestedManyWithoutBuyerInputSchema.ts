import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateWithoutBuyerInputSchema } from './InvoiceCreateWithoutBuyerInputSchema';
import { InvoiceUncheckedCreateWithoutBuyerInputSchema } from './InvoiceUncheckedCreateWithoutBuyerInputSchema';
import { InvoiceCreateOrConnectWithoutBuyerInputSchema } from './InvoiceCreateOrConnectWithoutBuyerInputSchema';
import { InvoiceCreateManyBuyerInputEnvelopeSchema } from './InvoiceCreateManyBuyerInputEnvelopeSchema';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';

export const InvoiceUncheckedCreateNestedManyWithoutBuyerInputSchema: z.ZodType<Prisma.InvoiceUncheckedCreateNestedManyWithoutBuyerInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutBuyerInputSchema), z.lazy(() => InvoiceCreateWithoutBuyerInputSchema).array(), z.lazy(() => InvoiceUncheckedCreateWithoutBuyerInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutBuyerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceCreateOrConnectWithoutBuyerInputSchema), z.lazy(() => InvoiceCreateOrConnectWithoutBuyerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyBuyerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default InvoiceUncheckedCreateNestedManyWithoutBuyerInputSchema;
