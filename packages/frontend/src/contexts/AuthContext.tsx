import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshTokenUser,
  getCurrentUser,
  verifyEmailCode,
  resendVerificationCode,
} from '@/lib/api-client';
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
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
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

  // Check auth on mount and set up refresh interval
  useEffect(() => {
    checkAuth();
  }, []);

  // Set up token refresh interval
  useEffect(() => {
    if (isAuthenticated && user) {
      // Check token expiry periodically
      refreshIntervalRef.current = setInterval(() => {
        const token = localStorage.getItem('teif_access_token');
        if (token && shouldRefreshToken(token) && !isRefreshingRef.current) {
          isRefreshingRef.current = true;
          refreshToken()
            .catch(error => {
              console.error('Token auto-refresh failed:', error);
            })
            .finally(() => {
              isRefreshingRef.current = false;
            });
        }
      }, TOKEN_REFRESH_INTERVAL);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [isAuthenticated, user]);

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
   * Verify token with backend and restore user session
   */
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('teif_access_token');
      
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      // Try to refresh if token is about to expire
      if (shouldRefreshToken(token)) {
        await refreshToken();
        return;
      }

      // Verify token with backend
      const userData = await getCurrentUser();
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      // Token invalid or expired - try to refresh
      try {
        await refreshToken();
      } catch {
        // Refresh also failed
        console.error('Auth check failed:', error);
        localStorage.removeItem('teif_auth_token');
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refresh the access token using refresh token from httpOnly cookie
   */
  const refreshToken = async () => {
    try {
      // Call refresh endpoint
      // Refresh token is automatically sent via httpOnly cookie
      const data = await refreshTokenUser();
      
      // New access token is returned and stored in localStorage by refreshTokenUser()
      // New refresh token is set as httpOnly cookie by backend
      
      console.log('Token refreshed successfully');
    } catch (error) {
      // Refresh failed, need to re-login
      console.error('Token refresh failed:', error);
      localStorage.removeItem('teif_access_token');
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  /**
   * Login with email and password
   * Uses Supabase Auth SDK on backend
   */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await loginUser(email, password);

      setUser(userData);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${userData.name}!`);
    } catch (error) {
      const errorMessage = (error as any)?.message || 'Login failed';
      toast.error(errorMessage);
      setUser(null);
      setIsAuthenticated(false);
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
      const userData = await registerUser(name, email, password);

      // Email verification needed
      setNeedsEmailVerification(true);
      setPendingEmail(email);
      setUser(null);
      setIsAuthenticated(false);
      
      toast.success('Check your email for verification code!');
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
      const userData = await verifyEmailCode(email, code);

      setUser(userData);
      setIsAuthenticated(true);
      setNeedsEmailVerification(false);
      setPendingEmail(null);
      
      toast.success('Email verified! Welcome!');
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
      await resendVerificationCode(email);
      toast.success('Verification code resent!');
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
      await logoutUser();
      localStorage.removeItem('teif_access_token');
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear token refresh interval
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      
      // Clear all cached queries after logout
      queryClient.clear();
      toast.success('Logged out successfully');
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
        checkAuth,
        refreshToken,
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
