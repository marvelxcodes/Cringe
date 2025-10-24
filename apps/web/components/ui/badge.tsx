'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'gray' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'brand', size = 'md', dot = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors duration-200';
    
    const variantStyles = {
      brand: 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 ring-1 ring-inset ring-brand-600/20 dark:ring-brand-400/20',
      gray: 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-600/20 dark:ring-gray-400/20',
      success: 'bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-300 ring-1 ring-inset ring-success-600/20 dark:ring-success-400/20',
      error: 'bg-error-50 dark:bg-error-900/30 text-error-700 dark:text-error-300 ring-1 ring-inset ring-error-600/20 dark:ring-error-400/20',
      warning: 'bg-warning-50 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 ring-1 ring-inset ring-warning-600/20 dark:ring-warning-400/20',
    };
    
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-2.5 py-1 text-sm gap-1.5',
      lg: 'px-3 py-1.5 text-sm gap-2',
    };
    
    const dotColors = {
      brand: 'bg-brand-500',
      gray: 'bg-gray-500',
      success: 'bg-success-500',
      error: 'bg-error-500',
      warning: 'bg-warning-500',
    };
    
    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();
    
    return (
      <span ref={ref} className={classes} {...props}>
        {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
