import { z } from 'zod';

/////////////////////////////////////////
// USER SIGNATURE SCHEMA
/////////////////////////////////////////

export const UserSignatureSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  certificateFilename: z.string(),
  encryptedContent: z.string(),
  signaturePinHash: z.string(),
  certificateSubject: z.string().nullable(),
  certificateIssuer: z.string().nullable(),
  certificateSerialNumber: z.string().nullable(),
  certificateValidFrom: z.coerce.date().nullable(),
  certificateValidUntil: z.coerce.date().nullable(),
  keyAlgorithm: z.string().nullable(),
  status: z.string(),
  uploadedAt: z.coerce.date(),
  lastUsedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type UserSignature = z.infer<typeof UserSignatureSchema>

export default UserSignatureSchema;
