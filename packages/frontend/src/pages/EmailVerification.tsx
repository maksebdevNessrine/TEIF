import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/services/i18n';
import toast from 'react-hot-toast';

export function EmailVerification() {
  const navigate = useNavigate();
  const { verifyEmail, resendCode, pendingEmail, needsEmailVerification } = useAuth();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [error, setError] = useState('');

  // Redirect if not in verification flow
  useEffect(() => {
    if (!needsEmailVerification || !pendingEmail) {
      navigate('/register', { replace: true });
    }
  }, [needsEmailVerification, pendingEmail, navigate]);

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendCountdown === 0 && !canResend && code.some(c => c)) {
      setCanResend(true);
    }
  }, [resendCountdown, canResend, code]);

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    // Take only last digit
    const digit = value.slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (digit && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const digits = pastedText.replace(/\D/g, '').slice(0, 6).split('');
    
    const newCode = [...code];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);
    
    // Focus last input if all digits provided
    if (digits.length === 6) {
      const lastInput = document.getElementById('code-5');
      lastInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');

    if (fullCode.length !== 6) {
      setError(t('enterVerificationCode'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (!pendingEmail) throw new Error('No email found');
      
      await verifyEmail(pendingEmail, fullCode);
      navigate('/login', { replace: true });
    } catch (err) {
      const message = (err as Error).message || t('verificationFailed');
      setError(message);
      toast.error(message);
      setCode(['', '', '', '', '', '']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!pendingEmail || !canResend || resendCountdown > 0) return;

    try {
      setCanResend(false);
      setResendCountdown(60);
      await resendCode(pendingEmail);
    } catch (err) {
      setCanResend(true);
      setResendCountdown(0);
      toast.error(t('failedToResendCode'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="font-bold text-2xl text-slate-950">✓</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('verifyEmail')}</h1>
          <p className="text-gray-400">
            {t('verifyEmailSent')}<br />
            <span className="text-emerald-400 font-semibold">{pendingEmail}</span>
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Code Input */}
          <div>
            <label htmlFor="code-0" className="block text-sm font-medium text-gray-300 mb-4">
              {t('enterVerificationCode')}
            </label>
            
            <div className="flex gap-2 justify-center mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-12 text-center text-xl font-bold rounded-lg border-2 transition ${
                    error
                      ? 'border-red-500 bg-red-50/10 text-red-400'
                      : digit
                      ? 'border-emerald-500 bg-emerald-50/10 text-emerald-400'
                      : 'border-slate-700 bg-slate-900 text-white'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  disabled={isLoading}
                />
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || code.join('').length !== 6}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
              isLoading || code.join('').length !== 6
                ? 'bg-slate-800 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
            }`}
          >
            {isLoading ? t('verifyingCode') : t('verifyEmail')}
          </button>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">{t('didntReceiveCode')}</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend || resendCountdown > 0 || isLoading}
              className={`mt-2 text-sm font-semibold transition ${
                canResend && resendCountdown === 0 && !isLoading
                  ? 'text-emerald-400 hover:text-emerald-300 cursor-pointer'
                  : 'text-gray-600 cursor-not-allowed'
              }`}
            >
              {resendCountdown > 0
                ? `${t('resendCodeIn').replace('{count}', String(resendCountdown))}`
                : t('resendCode')}
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
          <p className="text-xs text-gray-400 text-center">
            Code expires in 10 minutes. Check your spam folder if you don't see the email.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
