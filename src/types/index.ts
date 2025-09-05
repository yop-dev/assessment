export * from './campaign';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}
