import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import {
  useCurrentUser,
  useLogin,
  useRegister,
  useLogout,
  useRefreshToken,
  useVerifyEmail,
  useResendCode,
} from '@/hooks/useAuthQueries';
import { queryClient } from '@/lib/queryClient';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  emailVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  needsEmailVerification: boolean;
  pendingEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  resendCode: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token expiry check interval (check every minute)
const TOKEN_REFRESH_INTERVAL = 60 * 1000;
// Refresh token 5 minutes before expiry
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRefreshingRef = useRef<boolean>(false);

  // TanStack Query hooks
  const { data: currentUser, isLoading: userLoading, error: userError } = useCurrentUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const refreshMutation = useRefreshToken();
  const verifyMutation = useVerifyEmail();
  const resendMutation = useResendCode();

  // Sync user data from query to local state
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
      setNeedsEmailVerification(false);
      setPendingEmail(null);
    } else if (userError) {
      // Query failed, user not authenticated
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(userLoading);
  }, [currentUser, userError, userLoading]);

  // Set up token refresh interval
  useEffect(() => {
    if (isAuthenticated && user) {
      // Check token expiry periodically
      refreshIntervalRef.current = setInterval(() => {
        const token = localStorage.getItem('teif_access_token');
        if (token && shouldRefreshToken(token) && !isRefreshingRef.current) {
          isRefreshingRef.current = true;
          refreshMutation.mutate(undefined, {
            onSettled: () => {
              isRefreshingRef.current = false;
            },
          });
        }
      }, TOKEN_REFRESH_INTERVAL);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [isAuthenticated, user, refreshMutation]);

  /**
   * Check if token should be refreshed based on expiry time
   */
  const shouldRefreshToken = (token: string): boolean => {
    try {
      // Decode JWT without verification to check expiry
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      const decoded = JSON.parse(atob(parts[1]));
      const expiryTime = decoded.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      
      // Refresh if less than 5 minutes until expiry
      return expiryTime - now < TOKEN_REFRESH_THRESHOLD;
    } catch {
      return false;
    }
  };

  /**
   * Login with email and password
   * Comprehensive error handling
   */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync({ email, password });
      // Mutation success is handled in the hook
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      // Re-throw so component can handle with detailed error parsing
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register a new user
   * User must verify email before full access
   */
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync({ name, email, password });

      // Email verification needed
      setNeedsEmailVerification(true);
      setPendingEmail(email);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      const errorMessage = (error as any)?.message || 'Registration failed';
      toast.error(errorMessage);
      localStorage.removeItem('teif_access_token');
      setUser(null);
      setIsAuthenticated(false);
      setNeedsEmailVerification(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verify email with 6-digit code
   */
  const verifyEmail = async (email: string, code: string) => {
    setIsLoading(true);
    try {
      await verifyMutation.mutateAsync({ email, code });

      setNeedsEmailVerification(false);
      setPendingEmail(null);
    } catch (error) {
      const errorMessage = (error as any)?.message || 'Email verification failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resend verification code to email
   */
  const resendCode = async (email: string) => {
    try {
      await resendMutation.mutateAsync(email);
    } catch (error) {
      const errorMessage = (error as any)?.message || 'Failed to resend code';
      toast.error(errorMessage);
      throw error;
    }
  };

  /**
   * Logout user
   * Revokes all refresh tokens on backend
   * Clears session data
   */
  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutMutation.mutateAsync();

      localStorage.removeItem('teif_access_token');
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear token refresh interval
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if logout fails
      localStorage.removeItem('teif_access_token');
      setUser(null);
      setIsAuthenticated(false);
      toast.error('Logout failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        needsEmailVerification,
        pendingEmail,
        login,
        logout,
        register,
        verifyEmail,
        resendCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
