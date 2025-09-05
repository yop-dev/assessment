'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CampaignStep } from '@/types';
import { getStepAriaLabel } from '@/utils/accessibility';

interface ProgressStepperProps {
  steps: CampaignStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const ProgressStepperFixed: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
}) => {
  return (
    <nav 
      className={cn('w-full', className)}
      aria-label="Campaign creation progress"
      role="tablist"
    >
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.completed;
          const isActive = index === currentStep;
          const isClickable = onStepClick && (isCompleted || index <= currentStep);
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative">
                <button
                  className={cn(
                    'relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 focus-ring',
                    {
                      'bg-primary text-primary-foreground': isActive,
                      'bg-green-500 text-white': isCompleted,
                      'bg-muted text-muted-foreground border-2 border-gray-200': !isActive && !isCompleted,
                      'hover:bg-accent hover:text-accent-foreground cursor-pointer': isClickable,
                      'cursor-default': !isClickable,
                    }
                  )}
                  onClick={() => isClickable && onStepClick?.(index)}
                  disabled={!isClickable}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={getStepAriaLabel(index, steps.length, step.title, isCompleted, isActive)}
                  role="tab"
                  tabIndex={isClickable ? 0 : -1}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <span aria-hidden="true">{index + 1}</span>
                  )}
                </button>
                
                <div className="mt-2 text-center max-w-24">
                  <div
                    className={cn(
                      'text-sm font-medium leading-tight',
                      {
                        'text-primary': isActive,
                        'text-foreground': isCompleted,
                        'text-muted-foreground': !isActive && !isCompleted,
                      }
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    'flex-1 h-px mx-4 transition-colors duration-200',
                    {
                      'bg-primary': index < currentStep,
                      'bg-green-500': steps[index + 1]?.completed,
                      'bg-gray-200': index >= currentStep,
                    }
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.title}
      </div>
    </nav>
  );
};
