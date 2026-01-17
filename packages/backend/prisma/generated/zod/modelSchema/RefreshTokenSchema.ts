import { z } from 'zod';

/////////////////////////////////////////
// REFRESH TOKEN SCHEMA
/////////////////////////////////////////

export const RefreshTokenSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  tokenHash: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  revokedAt: z.coerce.date().nullable(),
})

export type RefreshToken = z.infer<typeof RefreshTokenSchema>

export default RefreshTokenSchema;
