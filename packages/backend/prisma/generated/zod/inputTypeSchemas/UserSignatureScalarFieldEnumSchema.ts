import { z } from 'zod';

export const UserSignatureScalarFieldEnumSchema = z.enum(['id','userId','certificateFilename','encryptedContent','signaturePinHash','certificateSubject','certificateIssuer','certificateSerialNumber','certificateValidFrom','certificateValidUntil','keyAlgorithm','status','uploadedAt','lastUsedAt','createdAt','updatedAt']);

export default UserSignatureScalarFieldEnumSchema;
