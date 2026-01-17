import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateWithoutUserInputSchema } from './InvoiceCreateWithoutUserInputSchema';
import { InvoiceUncheckedCreateWithoutUserInputSchema } from './InvoiceUncheckedCreateWithoutUserInputSchema';
import { InvoiceCreateOrConnectWithoutUserInputSchema } from './InvoiceCreateOrConnectWithoutUserInputSchema';
import { InvoiceCreateManyUserInputEnvelopeSchema } from './InvoiceCreateManyUserInputEnvelopeSchema';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';

export const InvoiceUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.InvoiceUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutUserInputSchema), z.lazy(() => InvoiceCreateWithoutUserInputSchema).array(), z.lazy(() => InvoiceUncheckedCreateWithoutUserInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceCreateOrConnectWithoutUserInputSchema), z.lazy(() => InvoiceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema), z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default InvoiceUncheckedCreateNestedManyWithoutUserInputSchema;
