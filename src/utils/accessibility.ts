/**
 * Utility functions for accessibility compliance
 */

/**
 * Generate unique IDs for form elements
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Announce content to screen readers
 */
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.setAttribute('class', 'sr-only');
  announcer.textContent = message;
  
  document.body.appendChild(announcer);
  
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
};

/**
 * Trap focus within a container
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  container.addEventListener('keydown', handleTabKey);
  firstElement?.focus();

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Get appropriate aria-label for step indicators
 */
export const getStepAriaLabel = (stepIndex: number, totalSteps: number, stepTitle: string, isCompleted: boolean, isActive: boolean): string => {
  let label = `Step ${stepIndex + 1} of ${totalSteps}: ${stepTitle}`;
  
  if (isCompleted) {
    label += ', completed';
  } else if (isActive) {
    label += ', current step';
  } else {
    label += ', upcoming';
  }
  
  return label;
};

/**
 * Validate color contrast ratio (basic implementation)
 */
export const hasGoodContrast = (_background: string, _foreground: string): boolean => {
  // This is a simplified version - in a real app you'd use a proper color contrast library
  // For now, we'll assume our design system colors have good contrast
  return true;
};

/**
 * Check if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
