'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressStepperFixed as ProgressStepper } from '@/components/common/ProgressStepperFixed';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CampaignStep } from '@/types';
import { CAMPAIGN_STEPS } from '@/constants/campaign';
import { announce } from '@/utils/accessibility';

interface CampaignCreationLayoutProps {
  children: React.ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  onSave?: () => void;
  onStepChange?: (stepIndex: number) => void;
  currentStep: number;
  canProceed?: boolean;
  canGoBack?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const CampaignCreationLayoutFixed: React.FC<CampaignCreationLayoutProps> = ({
  children,
  onNext,
  onPrevious,
  onSave,
  onStepChange,
  currentStep,
  canProceed = true,
  canGoBack = true,
  isLoading = false,
  className,
}) => {
  const [steps, setSteps] = useState<CampaignStep[]>(CAMPAIGN_STEPS);

  useEffect(() => {
    setSteps(prevSteps =>
      prevSteps.map((step, index) => ({
        ...step,
        completed: index < currentStep,
        active: index === currentStep,
      }))
    );
  }, [currentStep]);

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      onStepChange?.(stepIndex);
      announce(`Navigated to ${steps[stepIndex].title}`, 'polite');
    }
  };

  const handleNext = () => {
    if (canProceed && onNext) {
      onNext();
      const nextStep = steps[currentStep + 1];
      if (nextStep) {
        announce(`Proceeding to ${nextStep.title}`, 'polite');
      }
    }
  };

  const handlePrevious = () => {
    if (canGoBack && onPrevious) {
      onPrevious();
      const previousStep = steps[currentStep - 1];
      if (previousStep) {
        announce(`Returned to ${previousStep.title}`, 'polite');
      }
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Create New Campaign
              </h1>
              <p className="text-muted-foreground mt-2">
                Set up your marketing campaign in {steps.length} simple steps
              </p>
            </div>

            <ProgressStepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
              className="max-w-4xl mx-auto"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {steps[currentStep]?.title}
              </CardTitle>
              {steps[currentStep]?.description && (
                <p className="text-muted-foreground">
                  {steps[currentStep].description}
                </p>
              )}
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="min-h-[400px] mb-8">
                {children}
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center space-x-3">
                  {!isFirstStep && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={!canGoBack || isLoading}
                      className="flex items-center space-x-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  {onSave && (
                    <Button
                      variant="ghost"
                      onClick={onSave}
                      disabled={isLoading}
                      className="flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Draft</span>
                    </Button>
                  )}

                  <Button
                    onClick={handleNext}
                    disabled={!canProceed || isLoading}
                    className="flex items-center space-x-2 min-w-[120px]"
                  >
                    <span>{isLastStep ? 'Launch Campaign' : 'Next'}</span>
                    {!isLastStep && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="sr-only" aria-live="polite">
                Currently on step {currentStep + 1} of {steps.length}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            Need help? Check our{' '}
            <a href="#" className="underline hover:text-foreground transition-colors">
              campaign creation guide
            </a>{' '}
            or{' '}
            <a href="#" className="underline hover:text-foreground transition-colors">
              contact support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
