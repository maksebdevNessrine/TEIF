import React, { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

/**
 * Design System Components for TEIF Invoice
 * Provides consistent UI components with Tailwind styling
 */

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  description?: string;
  helper?: string;
}

/**
 * FormInput: Wrapper for text/number/date inputs with label and error support
 */
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, description, helper, className, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="flex items-center gap-1 text-xs font-medium text-slate-400 mb-2">
            {label}
            {required && <span className="text-red-500 font-bold">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2 border rounded font-medium text-slate-100 placeholder-slate-600 focus:outline-none transition-colors bg-slate-900 ${
            error
              ? 'border-red-600 focus:border-red-500'
              : 'border-slate-700 focus:border-slate-600'
          } ${className || ''}`}
          required={required}
          {...props}
        />
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        {(helperText || description || helper) && (
          <p className="text-xs text-slate-500 mt-1">{helperText || description || helper}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: Array<{ value: string; label: string }>;
  onValueChange?: (value: string) => void;
}

/**
 * FormSelect: Wrapper for select dropdowns with label and error support
 * Supports both standard onChange and onValueChange for convenience
 */
export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, helperText, options, children, className, onValueChange, required, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.currentTarget.value;
      
      // Call custom onValueChange if provided
      if (onValueChange) {
        onValueChange(value);
      }
      
      // Also call onChange if provided in props for standard HTML handlers
      if (props.onChange && typeof props.onChange === 'function') {
        props.onChange(e);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label className="flex items-center gap-1 text-xs font-medium text-slate-400 mb-2">
            {label}
            {required && <span className="text-red-500 font-bold">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-3 py-2 border rounded bg-slate-900 text-sm font-medium text-slate-100 appearance-none cursor-pointer focus:outline-none transition-colors ${
            error
              ? 'border-red-600 focus:border-red-500'
              : 'border-slate-700 focus:border-slate-600'
          } ${className || ''}`}
          required={required}
          {...props}
          onChange={handleChange}
        >
          {children || options?.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        {helperText && <p className="text-xs text-slate-500 mt-1">{helperText}</p>}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

interface FormSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
  description?: string;
  badge?: { label: string; variant: string };
}

/**
 * FormSection: Section container with title and consistent styling
 */
export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  className,
  description,
  badge,
}) => {
  return (
    <section
      className={`bg-slate-800 p-6 border border-slate-700 rounded-lg space-y-6 ${
        className || ''
      }`}
    >
      {title && (
        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      )}
      {children}
    </section>
  );
};

interface StepIndicatorProps {
  steps: Array<{ label: string; completed?: boolean }>;
  currentStep: number;
  className?: string;
}

/**
 * StepIndicator: Visual progress indicator for multi-step forms
 */
export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={`flex items-center justify-between ${className || ''}`}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {/* Step circle */}
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold text-sm transition-colors ${
              index < currentStep
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : index === currentStep
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-slate-700 border-slate-600 text-slate-400'
            }`}
          >
            {index < currentStep ? '✓' : index + 1}
          </div>

          {/* Step label */}
          <span
            className={`ml-2 text-xs font-medium ${
              index <= currentStep
                ? 'text-slate-200'
                : 'text-slate-500'
            }`}
          >
            {step.label}
          </span>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-12 ml-4 transition-colors ${
                index < currentStep - 1
                  ? 'bg-emerald-600'
                  : 'bg-slate-700'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default {
  FormInput,
  FormSelect,
  FormSection,
  StepIndicator,
};
