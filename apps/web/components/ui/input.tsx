'use client';

import { TextField, Input as AriaInput, Label, type TextFieldProps } from 'react-aria-components';
import { forwardRef } from 'react';

export interface InputProps extends Omit<TextFieldProps, 'children'> {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, error, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <TextField {...props} className={`w-full ${className}`.trim()}>
        {label && (
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {label}
          </Label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {leftIcon}
            </div>
          )}
          <AriaInput
            ref={ref}
            placeholder={placeholder}
            className={`
              w-full px-3.5 py-2.5 rounded-lg border transition-all duration-200
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
              disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 dark:disabled:text-gray-600 disabled:cursor-not-allowed
              ${error ? 'border-error-500 focus:ring-error-500' : 'border-gray-300 dark:border-gray-700'}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              shadow-sm
            `.trim()}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-error-600 dark:text-error-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </TextField>
    );
  }
);

Input.displayName = 'Input';

export default Input;
