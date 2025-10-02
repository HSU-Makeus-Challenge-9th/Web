import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  const base =
    'rounded px-4 py-2 font-medium transition-colors duration-200 flex items-center justify-center cursor-pointer';

  const variants = {
    primary: 'bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-500',
    ghost: 'bg-transparent text-gray-300 hover:text-white',
  };

  return (
    <button
      className={cn(base, variants[variant], fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
