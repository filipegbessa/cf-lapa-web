'use client';

import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#E63946] text-white hover:bg-red-700 active:bg-red-800 disabled:opacity-50',
  secondary: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50',
  ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50',
  danger: 'bg-[#E63946] text-white hover:bg-red-700 active:bg-red-800 disabled:opacity-50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
        font-medium rounded-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
