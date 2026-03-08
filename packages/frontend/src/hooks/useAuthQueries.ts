/**
 * TanStack Query (React Query) Hooks for Authentication
 * Provides data fetching, caching, and mutation hooks for auth operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshTokenUser,
  getCurrentUser,
  verifyEmailCode,
  resendVerificationCode,
} from '@/lib/api-client';
import toast from 'react-hot-toast';

// Query key factory for consistent cache management
const authQueryKeys = {
  all: ['auth'] as const,
  user: () => [...authQueryKeys.all, 'user'] as const,
  status: () => [...authQueryKeys.all, 'status'] as const,
};

/**
 * Hook to fetch and cache current user data
 * Automatically handles token validation and refresh
 *
 * @example
 * const { data: user, isLoading, error } = useCurrentUser();
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: authQueryKeys.user(),
    queryFn: () => getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1, // Only retry once for auth
    retryDelay: 1000,
  });
}

/**
 * Hook to login with email and password
 * Automatically caches user data and invalidates related queries on success
 *
 * @example
 * const { mutate: login, isPending } = useLogin();
 * login({ email, password });
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (user: any) => {
      // Cache the user data
      queryClient.setQueryData(authQueryKeys.user(), user);
      toast.success(`Welcome back, ${user.name}!`);
    },
    onError: (error: any) => {
      // Let the component handle specific error display
      console.error('[HOOK] useLogin error:', error);
    },
  });
}

/**
 * Hook to register a new user
 * Sets up email verification flow on success
 *
 * @example
 * const { mutate: register, isPending } = useRegister();
 * register({ name, email, password });
 */
export function useRegister() {
  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      registerUser(name, email, password),
    onSuccess: () => {
      toast.success('Check your email for verification code!');
    },
    onError: (error: any) => {
      console.error('[HOOK] useRegister error:', error);
    },
  });
}

/**
 * Hook to logout user
 * Clears all cached data and revokes tokens
 *
 * @example
 * const { mutate: logout, isPending } = useLogout();
 * logout();
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      // Clear all cached queries
      queryClient.clear();
      toast.success('Logged out successfully');
    },
    onError: (error: any) => {
      console.error('[HOOK] useLogout error:', error);
      // Still clear local cache even if server logout fails
      queryClient.clear();
      toast.error('Logout failed');
    },
  });
}

/**
 * Hook to refresh access token
 * Used internally by auth context for token management
 *
 * @example
 * const { mutate: refreshToken } = useRefreshToken();
 * refreshToken();
 */
export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => refreshTokenUser(),
    onSuccess: () => {
      console.log('Token refreshed successfully');
      // Optionally invalidate user query to refetch fresh data
      queryClient.invalidateQueries({ queryKey: authQueryKeys.user() });
    },
    onError: (error: any) => {
      console.error('Token refresh failed:', error);
      // Clear cache on refresh failure
      queryClient.clear();
    },
  });
}

/**
 * Hook to verify email with verification code
 * Completes registration process
 *
 * @example
 * const { mutate: verifyEmail, isPending } = useVerifyEmail();
 * verifyEmail({ email, code });
 */
export function useVerifyEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyEmailCode(email, code),
    onSuccess: (user: any) => {
      // Cache the verified user data
      queryClient.setQueryData(authQueryKeys.user(), user);
      toast.success('Email verified! Welcome!');
    },
    onError: (error: any) => {
      console.error('[HOOK] useVerifyEmail error:', error);
    },
  });
}

/**
 * Hook to resend verification code
 * Used when user needs new verification code
 *
 * @example
 * const { mutate: resendCode, isPending } = useResendCode();
 * resendCode(email);
 */
export function useResendCode() {
  return useMutation({
    mutationFn: (email: string) => resendVerificationCode(email),
    onSuccess: () => {
      toast.success('Verification code resent!');
    },
    onError: (error: any) => {
      console.error('[HOOK] useResendCode error:', error);
    },
  });
}