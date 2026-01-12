import React from 'react'
import { cn } from '../lib/utils'
import { Badge } from '../ui/badge'

interface FormSectionProps {
  title: string
  description?: string
  badge?: { label: string; variant?: 'default' | 'secondary' | 'outline' | 'destructive' }
  children: React.ReactNode
  className?: string
  divided?: boolean
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  badge,
  children,
  className,
  divided = true,
}) => {
  return (
    <section className={cn(
      'space-y-4',
      divided && 'border-b border-slate-700 pb-6 mb-6 last:border-b-0',
      className
    )}>
      {/* Section header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-slate-100 leading-tight">
              {title}
            </h2>
            {badge && (
              <Badge variant={badge.variant || 'default'}>
                {badge.label}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-sm text-slate-400 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Section content */}
      <div className={cn(
        'space-y-4 pl-0',
        'grid gap-4 md:grid-cols-2 items-end'
      )}>
        {children}
      </div>
    </section>
  )
}

FormSection.displayName = 'FormSection'
