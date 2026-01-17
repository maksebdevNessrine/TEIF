import { z } from 'zod';

export const RefreshTokenScalarFieldEnumSchema = z.enum(['id','userId','tokenHash','expiresAt','createdAt','revokedAt']);

export default RefreshTokenScalarFieldEnumSchema;
