import { z } from 'zod';

export const DocumentCategorySchema = z.enum(['INVOICE','QUOTE']);

export type DocumentCategoryType = `${z.infer<typeof DocumentCategorySchema>}`

export default DocumentCategorySchema;
