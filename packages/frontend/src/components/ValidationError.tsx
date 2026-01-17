/**
 * Form Validation Error Display Component
 * Shows validation errors elegantly under each field
 */

import React from 'react';
import { FieldError } from '../services/invoiceFormValidator';
import { AlertCircle, AlertTriangle } from 'lucide-react';

interface ValidationErrorProps {
  error: FieldError | null | undefined;
  className?: string;
}

/**
 * Elegant field-level error display (shows under a single field)
 */
export const FieldValidationError: React.FC<ValidationErrorProps> = ({ error, className = '' }) => {
  if (!error) return null;

  const isError = error.severity === 'error';
  const borderColor = isError ? 'border-red-300 dark:border-red-600' : 'border-amber-300 dark:border-amber-600';
  const bgColor = isError ? 'bg-red-50 dark:bg-red-950/30' : 'bg-amber-50 dark:bg-amber-950/30';
  const textColor = isError ? 'text-red-700 dark:text-red-300' : 'text-amber-700 dark:text-amber-300';
  const formatColor = isError ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400';
  const iconColor = isError ? 'text-red-500 dark:text-red-400' : 'text-amber-500 dark:text-amber-400';

  return (
    <div className={`mt-2 p-2 rounded border-l-2 ${borderColor} ${bgColor} text-sm space-y-1 ${className}`}>
      <div className="flex gap-2 items-start">
        {isError ? (
          <AlertCircle size={14} className={`flex-shrink-0 mt-0.5 ${iconColor}`} />
        ) : (
          <AlertTriangle size={14} className={`flex-shrink-0 mt-0.5 ${iconColor}`} />
        )}
        <p className={`font-medium leading-snug ${textColor}`}>{error.message}</p>
      </div>
      {error.format && (
        <p className={`text-xs leading-snug ml-6 font-mono ${formatColor}`}>
          {error.format}
        </p>
      )}
    </div>
  );
};

/**
 * Required field mark - prominent red asterisk
 */
export const RequiredFieldMark: React.FC = () => {
  return <span className="text-red-500 font-bold text-lg leading-none">*</span>;
};

interface FieldWrapperProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  error?: FieldError | null;
  hint?: string;
}

/**
 * Wrapper component for form field with validation display
 * Shows required mark and error below the field
 */
export const FieldWrapper: React.FC<FieldWrapperProps> = ({ children, label, required, error, hint }) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {required && <RequiredFieldMark />}
        </label>
      )}

      {children}

      {hint && !error && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      )}

      {error && <FieldValidationError error={error} />}
    </div>
  );
};

/**
 * Legacy components kept for backwards compatibility
 */

interface ValidationSummaryProps {
  errors: FieldError[];
  warnings: FieldError[];
  onDismiss?: () => void;
}

export const ValidationSummary: React.FC<ValidationSummaryProps> = ({ errors, warnings }) => {
  if (errors.length === 0 && warnings.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-red-800 bg-red-950/30 p-4 mb-6 space-y-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-red-400">
            {errors.length > 0
              ? `${errors.length} error${errors.length !== 1 ? 's' : ''} found`
              : 'Review warnings'}
          </h3>
          <p className="text-xs text-red-500/70 mt-1">Errors are highlighted below each field</p>
        </div>
      </div>
    </div>
  );
};

interface RequiredFieldBadgeProps {
  required?: boolean;
  hasError?: boolean;
}

export const RequiredFieldBadge: React.FC<RequiredFieldBadgeProps> = ({ required }) => {
  if (!required) return null;
  return <RequiredFieldMark />;
};
