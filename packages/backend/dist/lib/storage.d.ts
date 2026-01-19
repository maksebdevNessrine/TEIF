/**
 * Supabase Storage client for PDF caching and retrieval
 */
import type { SupabaseClient } from '@supabase/supabase-js';
export declare function initializeStorage(): SupabaseClient;
export declare function ensureBucketExists(): Promise<void>;
/**
 * Upload PDF to Supabase Storage
 */
export declare function uploadPdf(invoiceId: string, userId: string, language: string, buffer: Buffer): Promise<boolean>;
/**
 * Download PDF from Supabase Storage
 */
export declare function downloadPdf(invoiceId: string, userId: string, language: string): Promise<Buffer | null>;
/**
 * Delete PDF from Supabase Storage
 */
export declare function deletePdf(invoiceId: string, userId: string, language?: string): Promise<boolean>;
/**
 * Check if PDF exists in cache
 */
export declare function pdfExists(invoiceId: string, userId: string, language: string): Promise<boolean>;
export declare const storageService: {
    initializeStorage: typeof initializeStorage;
    ensureBucketExists: typeof ensureBucketExists;
    uploadPdf: typeof uploadPdf;
    downloadPdf: typeof downloadPdf;
    deletePdf: typeof deletePdf;
    pdfExists: typeof pdfExists;
};
