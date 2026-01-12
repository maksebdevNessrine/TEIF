import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Label } from '../ui/label'
import { cn } from '../lib/utils'

interface FormSelectProps {
  label?: string
  error?: string
  helper?: string
  required?: boolean
  description?: string
  options: Array<{ value: string; label: string }>
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
}

export const FormSelect = React.forwardRef<HTMLDivElement, FormSelectProps>(
  ({ 
    label, 
    error, 
    helper, 
    required, 
    description, 
    options,
    value,
    onValueChange,
    placeholder,
    ...props 
  }, ref) => {
    return (
      <div ref={ref} className="w-full flex flex-col" {...props}>
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
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className={cn(
            'bg-slate-900 border-slate-700 text-slate-50 h-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            '[&>span]:text-slate-50'
          )}>
            <SelectValue placeholder={placeholder || 'Select an option...'} />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="focus:bg-emerald-500/20 focus:text-emerald-300"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

FormSelect.displayName = 'FormSelect'
