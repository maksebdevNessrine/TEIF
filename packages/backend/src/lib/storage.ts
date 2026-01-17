/**
 * Supabase Storage client for PDF caching and retrieval
 */

import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

let storageClient: SupabaseClient | null = null;

export function initializeStorage(): SupabaseClient {
  if (storageClient) {
    return storageClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'invoice-pdfs';

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables'
    );
  }

  storageClient = createClient(supabaseUrl, supabaseServiceKey);

  return storageClient;
}

export async function ensureBucketExists(): Promise<void> {
  try {
    const client = initializeStorage();
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'invoice-pdfs';

    // List buckets to check if it exists
    const { data: buckets, error: listError } = await client.storage.listBuckets();

    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }

    const bucketExists = buckets?.some((b) => b.name === bucketName);

    if (!bucketExists) {
      const { error: createError } = await client.storage.createBucket(bucketName, {
        public: false,
      });

      if (createError) {
        console.warn(`Bucket "${bucketName}" creation failed or already exists:`, createError);
      } else {
        console.log(`Created storage bucket: ${bucketName}`);
      }
    }
  } catch (error) {
    console.warn('Storage initialization warning:', error);
  }
}

/**
 * Upload PDF to Supabase Storage
 */
export async function uploadPdf(
  invoiceId: string,
  userId: string,
  language: string,
  buffer: Buffer
): Promise<boolean> {
  try {
    const client = initializeStorage();
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'invoice-pdfs';
    const filePath = `invoices/${userId}/${invoiceId}/${language}.pdf`;

    const { error } = await client.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType: 'application/pdf',
        upsert: true,
        metadata: {
          uploadedAt: new Date().toISOString(),
          invoiceId,
          userId,
          language,
        },
      });

    if (error) {
      console.error(`Failed to upload PDF for invoice ${invoiceId}:`, error);
      return false;
    }

    console.log(`[Storage] Uploaded PDF: ${filePath}`);
    return true;
  } catch (error) {
    console.error('Upload PDF error:', error);
    return false;
  }
}

/**
 * Download PDF from Supabase Storage
 */
export async function downloadPdf(
  invoiceId: string,
  userId: string,
  language: string
): Promise<Buffer | null> {
  try {
    const client = initializeStorage();
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'invoice-pdfs';
    const filePath = `invoices/${userId}/${invoiceId}/${language}.pdf`;

    const { data, error } = await client.storage
      .from(bucketName)
      .download(filePath);

    if (error) {
      console.debug(`PDF not found in cache: ${filePath}`);
      return null;
    }

    // Convert Blob to Buffer
    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`[Storage] Downloaded PDF from cache: ${filePath}`);
    return buffer;
  } catch (error) {
    console.error('Download PDF error:', error);
    return null;
  }
}

/**
 * Delete PDF from Supabase Storage
 */
export async function deletePdf(
  invoiceId: string,
  userId: string,
  language?: string
): Promise<boolean> {
  try {
    const client = initializeStorage();
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'invoice-pdfs';

    if (language) {
      // Delete specific language variant
      const filePath = `invoices/${userId}/${invoiceId}/${language}.pdf`;
      const { error } = await client.storage.from(bucketName).remove([filePath]);

      if (error) {
        console.error(`Failed to delete PDF ${filePath}:`, error);
        return false;
      }

      console.log(`[Storage] Deleted PDF: ${filePath}`);
      return true;
    } else {
      // Delete all language variants for invoice
      const { data: files, error: listError } = await client.storage
        .from(bucketName)
        .list(`invoices/${userId}/${invoiceId}`);

      if (listError) {
        console.error('Error listing PDF files:', listError);
        return false;
      }

      if (!files || files.length === 0) {
        console.log(`No PDF files found for invoice ${invoiceId}`);
        return true;
      }

      const filePaths = files.map((f) => `invoices/${userId}/${invoiceId}/${f.name}`);
      const { error: deleteError } = await client.storage
        .from(bucketName)
        .remove(filePaths);

      if (deleteError) {
        console.error(`Failed to delete PDFs for invoice ${invoiceId}:`, deleteError);
        return false;
      }

      console.log(`[Storage] Deleted ${filePaths.length} PDF variants for invoice ${invoiceId}`);
      return true;
    }
  } catch (error) {
    console.error('Delete PDF error:', error);
    return false;
  }
}

/**
 * Check if PDF exists in cache
 */
export async function pdfExists(
  invoiceId: string,
  userId: string,
  language: string
): Promise<boolean> {
  try {
    const client = initializeStorage();
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'invoice-pdfs';
    const filePath = `invoices/${userId}/${invoiceId}/${language}.pdf`;

    const { data, error } = await client.storage
      .from(bucketName)
      .list(`invoices/${userId}/${invoiceId}`);

    if (error) {
      return false;
    }

    return data?.some((f) => f.name === `${language}.pdf`) ?? false;
  } catch (error) {
    return false;
  }
}

export const storageService = {
  initializeStorage,
  ensureBucketExists,
  uploadPdf,
  downloadPdf,
  deletePdf,
  pdfExists,
};
