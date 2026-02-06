import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceFindManyArgsSchema } from "../outputTypeSchemas/InvoiceFindManyArgsSchema"
import { RefreshTokenFindManyArgsSchema } from "../outputTypeSchemas/RefreshTokenFindManyArgsSchema"
import { UserSignatureArgsSchema } from "../outputTypeSchemas/UserSignatureArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  invoices: z.union([z.boolean(),z.lazy(() => InvoiceFindManyArgsSchema)]).optional(),
  refreshTokens: z.union([z.boolean(),z.lazy(() => RefreshTokenFindManyArgsSchema)]).optional(),
  signature: z.union([z.boolean(),z.lazy(() => UserSignatureArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export default UserIncludeSchema;
