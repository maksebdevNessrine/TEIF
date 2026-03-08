/**
 * TanStack Query (React Query) Hooks for Signature Management
 * Provides data fetching, caching, and mutation hooks for signature operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { UserSignatureProfile } from '@teif/shared/types';

// Query key factory for consistent cache management
const signatureQueryKeys = {
  all: ['signature'] as const,
  status: () => [...signatureQueryKeys.all, 'status'] as const,
};

/**
 * Hook to fetch and cache signature status
 * Automatically handles authentication and error states
 *
 * @example
 * const { data: signatureStatus, isLoading, error } = useSignatureStatus();
 */
export function useSignatureStatus() {
  return useQuery({
    queryKey: signatureQueryKeys.status(),
    queryFn: async (): Promise<UserSignatureProfile | null> => {
      const response = await fetch('/api/signature/status', {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Not authenticated, this is expected if user hasn't uploaded
          return null;
        }
        throw new Error('Failed to fetch signature status');
      }

      // Some backends may return 204 No Content or an empty body.
      // Safely handle empty responses before parsing JSON.
      const text = await response.text();
      if (!text) {
        return null;
      }

      return JSON.parse(text);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - signature status doesn't change often
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1, // Only retry once for signature status
    retryDelay: 1000,
  });
}

/**
 * Hook to upload signature certificate
 * Automatically updates cache on success
 *
 * @example
 * const { mutate: uploadSignature, isPending } = useUploadSignature();
 * uploadSignature({ certificateFile, pin }, {
 *   onSuccess: (profile) => console.log('Uploaded:', profile)
 * });
 */
export function useUploadSignature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ certificateFile, pin }: { certificateFile: File; pin: string }) => {
      // Create FormData
      const formData = new FormData();
      formData.append('certificate', certificateFile);
      formData.append('pin', pin);

      // Upload certificate
      const response = await fetch('/api/signature/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload certificate');
      }

      // Transform response to UserSignatureProfile format
      if (data.data) {
        return {
          userId: '',
          hasCertificate: true,
          status: data.data.status,
          certificateSubject: data.data.certificateSubject,
          certificateIssuer: data.data.certificateIssuer,
          certificateValidFrom: data.data.validFrom,
          certificateValidUntil: data.data.validUntil,
          daysRemaining: Math.ceil(
            (new Date(data.data.validUntil).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          ),
        } as UserSignatureProfile;
      }

      throw new Error('Invalid response format');
    },
    onSuccess: (profile: UserSignatureProfile) => {
      // Update cache with new signature status
      queryClient.setQueryData(signatureQueryKeys.status(), profile);
      toast.success('Certificate uploaded successfully!');
    },
    onError: (error: any) => {
      console.error('[HOOK] useUploadSignature error:', error);
      toast.error(error.message || 'Failed to upload certificate');
    },
  });
}

/**
 * Hook to revoke signature certificate
 * Automatically updates cache on success
 *
 * @example
 * const { mutate: revokeSignature, isPending } = useRevokeSignature();
 * revokeSignature(undefined, {
 *   onSuccess: () => console.log('Revoked')
 * });
 */
export function useRevokeSignature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/signature/', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to revoke certificate');
      }
    },
    onSuccess: () => {
      // Clear signature status from cache
      queryClient.setQueryData(signatureQueryKeys.status(), null);
      toast.success('Certificate revoked successfully');
    },
    onError: (error: any) => {
      console.error('[HOOK] useRevokeSignature error:', error);
      toast.error(error.message || 'Failed to revoke certificate');
    },
  });
}