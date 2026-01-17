import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','passwordHash','emailVerified','verificationCode','verificationCodeExpires','createdAt','updatedAt']);

export default UserScalarFieldEnumSchema;
