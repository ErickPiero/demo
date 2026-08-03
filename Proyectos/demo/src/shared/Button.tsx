import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed border border-transparent';
  
  const variants = {
    primary: 'bg-primary hover:bg-[#005f92] text-white shadow-lg hover:shadow-primary/30',
    secondary: 'bg-secondary hover:bg-[#0096b4] text-white shadow-lg hover:shadow-secondary/30',
    accent: 'bg-accent hover:bg-[#e65c2a] text-white shadow-lg hover:shadow-accent/30',
    danger: 'bg-error hover:bg-red-600 text-white shadow-lg hover:shadow-error/30',
    ghost: 'bg-transparent hover:bg-white/5 text-gray-300 hover:text-white border-white/10',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
