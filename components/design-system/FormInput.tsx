import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { cn } from '../lib/utils'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
  required?: boolean
  description?: string
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helper, required, description, className, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col">
        {label && (
          <Label className={cn(
            'text-sm font-medium text-slate-200 block h-5',
            required && "after:content-['*'] after:ml-1 after:text-red-500"
          )}>
            {label}
          </Label>
        )}
        {description && (
          <p className="text-xs text-slate-400 h-4">{description}</p>
        )}
        <Input
          ref={ref}
          className={cn(
            'bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500',
            'focus:border-emerald-500 focus:ring-emerald-500/50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
        {helper && !error && (
          <p className="text-xs text-slate-500">{helper}</p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
