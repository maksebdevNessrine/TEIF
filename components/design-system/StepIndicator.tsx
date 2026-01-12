import React from 'react'
import { cn } from '../lib/utils'

interface StepIndicatorProps {
  steps: Array<{ id: string; label: string }>
  currentStep: string
  onStepClick?: (stepId: string) => void
  compact?: boolean
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  compact = false,
}) => {
  const currentIndex = steps.findIndex(s => s.id === currentStep)

  return (
    <div className={cn(
      'flex items-center gap-2',
      compact ? 'mb-4' : 'mb-8'
    )}>
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isCompleted = index < currentIndex
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={step.id}>
            {/* Step circle */}
            <button
              onClick={() => onStepClick?.(step.id)}
              className={cn(
                'flex-shrink-0 w-10 h-10 rounded-full font-semibold text-sm',
                'transition-all duration-200 flex items-center justify-center',
                'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950',
                isActive && 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30',
                isCompleted && 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
                !isActive && !isCompleted && 'bg-slate-700 text-slate-400'
              )}
            >
              {isCompleted ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </button>

            {/* Label */}
            {!compact && (
              <div className="min-w-0 flex-1">
                <p className={cn(
                  'text-xs font-medium truncate',
                  isActive && 'text-emerald-400',
                  isCompleted && 'text-emerald-400/70',
                  !isActive && !isCompleted && 'text-slate-400'
                )}>
                  {step.label}
                </p>
              </div>
            )}

            {/* Connector line */}
            {!isLast && (
              <div className={cn(
                'flex-1 h-0.5',
                index < currentIndex && 'bg-gradient-to-r from-emerald-500 to-emerald-600',
                index >= currentIndex && 'bg-slate-700'
              )} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

StepIndicator.displayName = 'StepIndicator'
