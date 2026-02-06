/**
 * TanStack Query (React Query) Hooks for Invoice Management
 * Now using Hono RPC Client for fully typed API calls
 * Provides data fetching, caching, and mutation hooks for invoice operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoicePdf,
  getInvoiceXml,
} from '@/lib/api-client';
import toast from 'react-hot-toast';
import type { InvoiceData } from '@teif/shared/types';

// Query key factory for consistent cache management
const invoiceQueryKeys = {
  all: ['invoices'] as const,
  lists: () => [...invoiceQueryKeys.all, 'list'] as const,
  list: (filters?: Record<string, any>) => [...invoiceQueryKeys.lists(), filters] as const,
  details: () => [...invoiceQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...invoiceQueryKeys.details(), id] as const,
};

/**
 * Hook to fetch and manage invoice list
 * Supports filtering, searching, sorting, and pagination
 *
 * @param filters - Optional filters object with pagination and search parameters
 * @example
 * const { data, isLoading, error } = useInvoices({ page: 1, limit: 20, search: 'INV' });
 */
export function useInvoices(filters?: Record<string, any>) {
  return useQuery({
    queryKey: invoiceQueryKeys.list(filters),
    queryFn: () => listInvoices(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Hook to fetch a single invoice with all details
 *
 * @param id - Invoice ID to fetch
 * @example
 * const { data: invoice, isLoading } = useInvoice(invoiceId);
 */
export function useInvoice(id?: string | null) {
  return useQuery({
    queryKey: invoiceQueryKeys.detail(id || ''),
    queryFn: async () => {
      return await getInvoice(id!);
    },
    enabled: !!id, // Only run query if ID is provided
    staleTime: Infinity, // Single invoice data doesn't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Hook to create a new invoice
 * Automatically invalidates list queries on success
 *
 * @example
 * const { mutate, isPending } = useCreateInvoice();
 * mutate(invoiceData);
 */
export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InvoiceData) => {
      console.log('[HOOK] useCreateInvoice: sending data with amountLanguage =', (data as any).amountLanguage);
      return createInvoice(data);
    },
    onSuccess: (invoice: any) => {
      console.log('[HOOK] useCreateInvoice success: received invoice.amountLanguage =', invoice.amountLanguage);
      // Invalidate all invoice lists to trigger refetch
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.lists() });
      
      // Cache the newly created invoice
      queryClient.setQueryData(invoiceQueryKeys.detail(invoice.id), invoice);
      
      toast.success('Invoice created successfully');
    },
    onError: (error: any) => {
      console.error('[HOOK] useCreateInvoice error:', error);
      const message = error.message || 'Failed to create invoice';
      toast.error(message);
    },
  });
}

/**
 * Hook to update an existing invoice
 * Automatically invalidates relevant queries on success
 *
 * @example
 * const { mutate, isPending } = useUpdateInvoice();
 * mutate({ id: '123', data: updatedInvoiceData });
 */
export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InvoiceData }) => {
      console.log('[HOOK] useUpdateInvoice: sending data with amountLanguage =', (data as any).amountLanguage);
      return updateInvoice(id, data);
    },
    onSuccess: (invoice: any, variables) => {
      console.log('[HOOK] useUpdateInvoice success: received invoice.amountLanguage =', invoice.amountLanguage);
      // Update the specific invoice in cache
      queryClient.setQueryData(invoiceQueryKeys.detail(invoice.id), invoice);
      
      // Invalidate all lists to trigger refetch
      queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.lists() });
      
      toast.success('Invoice updated successfully');
    },
    onError: (error: any) => {
      console.error('[HOOK] useUpdateInvoice error:', error);
      const message = error.message || 'Failed to update invoice';
      toast.error(message);
    },
  });
}

/**
 * Hook to delete an invoice
 * Uses optimistic updates for immediate UI feedback
 *
 * @example
 * const { mutate, isPending } = useDeleteInvoice();
 * mutate(invoiceId);
 */
export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteInvoice(id),
    onMutate: (id: string) => {
      // Optimistic update: remove from list immediately
      queryClient.setQueryData(invoiceQueryKeys.lists(), (old: any) => {
        if (!old?.invoices) return old;
        return {
          ...old,
          invoices: old.invoices.filter((inv: any) => inv.id !== id),
          total: old.total - 1,
        };
      });

      return { id };
    },
    onSuccess: (_, id) => {
      // Remove from detail cache
      queryClient.removeQueries({ queryKey: invoiceQueryKeys.detail(id) });
      toast.success('Invoice deleted successfully');
    },
    onError: (error: any, _, context) => {
      // Revert optimistic update on error
      if (context?.id) {
        queryClient.invalidateQueries({ queryKey: invoiceQueryKeys.lists() });
      }
      const message = error.message || 'Failed to delete invoice';
      toast.error(message);
    },
  });
}

/**
 * Hook to download invoice as PDF
 *
 * @example
 * const { mutate, isPending } = useDownloadPdf();
 * mutate({ id: '123', language: 'fr' });
 */
export function useDownloadPdf() {
  return useMutation({
    mutationFn: ({ id, language = 'fr' }: { id: string; language?: 'ar' | 'fr' | 'en' }) =>
      getInvoicePdf(id, language),
    onSuccess: (blob, variables) => {
      // Create a download link
      const url = window.URL.createObjectURL(blob as Blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${variables.id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success('PDF downloaded successfully');
    },
    onError: (error: any) => {
      const message = error.message || 'Failed to download PDF';
      toast.error(message);
    },
  });
}

/**
 * Hook to download invoice as XML
 *
 * @example
 * const { mutate, isPending } = useDownloadXml();
 * mutate({ id: '123' });
 */
export function useDownloadXml() {
  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      getInvoiceXml(id),
    onSuccess: (blob, variables) => {
      // Create a download link
      const url = window.URL.createObjectURL(blob as Blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${variables.id}.xml`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success('XML downloaded successfully');
    },
    onError: (error: any) => {
      const message = error.message || 'Failed to download XML';
      toast.error(message);
    },
  });
}
