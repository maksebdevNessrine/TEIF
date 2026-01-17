/**
 * Error Display Components
 * Reusable error states for invoice management
 */

import React from 'react';

/**
 * Generic error message display with retry button
 */
export function ErrorMessage({
  message,
  onRetry,
  className = '',
}: {
  message: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={`p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-red-900">Error</h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-2 px-3 py-1 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded transition"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Empty state when no invoices found
 */
export function NotFound({
  title = 'No Invoices Yet',
  message = 'Start by creating your first invoice to get started.',
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-center max-w-md">
        {/* Friendly Empty State Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-700/50 mb-6">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-slate-400 mb-8">{message}</p>
        </div>

        {/* Skeleton Loader Animation */}
        <div className="space-y-3 mb-8 max-w-sm mx-auto">
          <div className="h-12 bg-slate-700/50 rounded-lg animate-pulse"></div>
          <div className="h-12 bg-slate-700/50 rounded-lg animate-pulse"></div>
          <div className="h-12 bg-slate-700/50 rounded-lg animate-pulse"></div>
        </div>

        <p className="text-xs text-slate-500 italic">Use the "New Invoice" button in the header to create your first invoice</p>
      </div>
    </div>
  );
}

/**
 * Network/Offline error display
 */
export function NetworkError({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-amber-900">Connection Error</h3>
          <p className="mt-1 text-sm text-amber-700">
            Unable to connect to the server. Please check your internet connection and try again.
          </p>
        </div>
        <button
          onClick={onRetry}
          className="ml-2 px-3 py-2 text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 rounded transition whitespace-nowrap"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

/**
 * Validation error display for form errors
 */
export function ValidationError({
  errors,
  className = '',
}: {
  errors: Record<string, string[]> | string;
  className?: string;
}) {
  const isString = typeof errors === 'string';
  const errorList = isString ? [errors] : Object.values(errors).flat();

  return (
    <div className={`p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <h3 className="text-sm font-semibold text-red-900 mb-2">Validation Error</h3>
      <ul className="space-y-1 text-sm text-red-700">
        {errorList.map((error, i) => (
          <li key={i} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{error}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
