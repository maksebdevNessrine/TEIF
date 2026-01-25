import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/services/i18n';
import { loginSchema, type LoginInput } from '@teif/shared';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { parseErrorResponse, AuthErrorCode, isRateLimited, getRetryDelay } from '@/lib/error-handler';

type LoginFormData = LoginInput;

interface ErrorState {
  email?: string;
  password?: string;
  general?: string;
  code?: AuthErrorCode;
  retryAfter?: number;
  isNetworkError?: boolean;
}

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [retryCount, setRetryCount] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<number | null>(null);

  const from = location.state?.from?.pathname || '/invoices';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (name === 'email') delete newErrors.email;
      if (name === 'password') delete newErrors.password;
      // Keep general error for visibility
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      // Client-side validation
      const validated = loginSchema.parse(formData);

      // Reset retry counter on successful validation
      setLastAttemptTime(Date.now());

      // Call login
      await login(validated.email, validated.password);
      
      // Success - reset error state
      setRetryCount(0);
      setErrors({});
      toast.success(t('loginSuccessful'));
      navigate(from, { replace: true });
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        const fieldErrors: ErrorState = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof LoginFormData;
          if (path === 'email' || path === 'password') {
            fieldErrors[path] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      // Handle API/Auth errors
      const parsedError = parseErrorResponse(error);
      
      // Increment retry counter
      const newRetryCount = retryCount + 1;
      setRetryCount(newRetryCount);

      // Set error state with detailed info
      const newErrors: ErrorState = {
        general: parsedError.userMessage,
        code: parsedError.code,
        isNetworkError: parsedError.isNetworkError,
      };

      if (parsedError.retryAfter) {
        newErrors.retryAfter = parsedError.retryAfter;
      }

      setErrors(newErrors);

      // Show toast for non-field errors
      toast.error(parsedError.userMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate if we should show rate limit warning
  const isRateLimitError = errors.code === AuthErrorCode.TOO_MANY_LOGIN_ATTEMPTS;
  const showRetryInfo = retryCount >= 3 && !isRateLimitError;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="font-bold text-2xl text-slate-950">T</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">TEIF Invoice</h1>
          <p className="text-gray-400">{t('signInToAccount')}</p>
        </div>

        {/* General Error Alert */}
        {errors.general && (
          <div className={`mb-6 p-4 rounded-lg border-l-4 flex items-start gap-3 ${
            errors.isNetworkError
              ? 'bg-yellow-900/20 border-yellow-600 text-yellow-200'
              : isRateLimitError
              ? 'bg-red-900/20 border-red-600 text-red-200'
              : 'bg-red-900/20 border-red-600 text-red-200'
          }`}>
            <div className="flex-shrink-0 mt-0.5">
              {errors.isNetworkError ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{errors.general}</p>
              {isRateLimitError && errors.retryAfter && (
                <p className="text-sm mt-1 opacity-90">
                  Retry in {errors.retryAfter} minutes
                </p>
              )}
              {errors.isNetworkError && (
                <p className="text-sm mt-1 opacity-90">
                  Check your internet connection and try again
                </p>
              )}
            </div>
          </div>
        )}

        {/* Retry Warning */}
        {showRetryInfo && !isRateLimitError && (
          <div className="mb-6 p-3 rounded-lg bg-orange-900/20 border border-orange-700 text-orange-200 text-sm flex items-start gap-2">
            <span className="text-lg">⚠️</span>
            <span>Multiple failed attempts. Be careful with your credentials.</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              {t('emailAddress')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading || isRateLimitError}
              className={`w-full px-4 py-2.5 rounded-lg bg-slate-900 border transition ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-emerald-900/30 focus:ring-emerald-500'
              } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18.101 12.93l-.9-1.445A1.75 1.75 0 0015.571 11H11V9.2a1.75 1.75 0 00-.5-1.227L9.248 6.5H11a.75.75 0 000-1.5H9.248L10.571 3.227A1.75 1.75 0 0011 2v-.75a.75.75 0 00-1.5 0V2a.25.25 0 01.071.177L8.248 5H6a.75.75 0 000 1.5h2.248L7.071 8.227A.25.25 0 006 8.2V11H4.429a1.75 1.75 0 00-1.63.485l-.9 1.445A1.75 1.75 0 001.5 14.25v1A1.75 1.75 0 003.25 17h13.5a1.75 1.75 0 001.75-1.75v-1a1.75 1.75 0 00-.399-1.07z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              {t('password')}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading || isRateLimitError}
              className={`w-full px-4 py-2.5 rounded-lg bg-slate-900 border transition ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-emerald-900/30 focus:ring-emerald-500'
              } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="••••••"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18.101 12.93l-.9-1.445A1.75 1.75 0 0015.571 11H11V9.2a1.75 1.75 0 00-.5-1.227L9.248 6.5H11a.75.75 0 000-1.5H9.248L10.571 3.227A1.75 1.75 0 0011 2v-.75a.75.75 0 00-1.5 0V2a.25.25 0 01.071.177L8.248 5H6a.75.75 0 000 1.5h2.248L7.071 8.227A.25.25 0 006 8.2V11H4.429a1.75 1.75 0 00-1.63.485l-.9 1.445A1.75 1.75 0 001.5 14.25v1A1.75 1.75 0 003.25 17h13.5a1.75 1.75 0 001.75-1.75v-1a1.75 1.75 0 00-.399-1.07z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isRateLimitError}
            className="w-full px-4 py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading && (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {isLoading ? t('signingIn') : t('signIn')}
          </button>
        </form>

        {/* Forgotten Password Link */}
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors">
            Forgot your password?
          </a>
        </div>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          {t('dontHaveAccount')}{' '}
          <Link to="/register" className="font-medium text-emerald-500 hover:text-emerald-400 transition-colors">
            {t('signUp')}
          </Link>
        </p>

        {/* Info Message */}
        <div className="mt-8 p-4 rounded-lg bg-slate-900/50 border border-slate-800 text-xs text-gray-400">
          <p className="font-medium mb-2">Demo Credentials:</p>
          <p>Email: admin@example.com</p>
          <p>Password: Password123</p>
        </div>
      </div>
    </div>
  );
}
