'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', hoverable = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'rounded-xl bg-white dark:bg-gray-900 transition-all duration-200';
    
    const variantStyles = {
      default: 'border border-gray-200 dark:border-gray-800',
      bordered: 'border-2 border-gray-300 dark:border-gray-700',
      elevated: 'shadow-md',
    };
    
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };
    
    const hoverStyles = hoverable 
      ? 'hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-600 hover:-translate-y-1 cursor-pointer' 
      : '';
    
    const classes = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`.trim();
    
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
