import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'default';
  size?: 'sm' | 'default';
};

export function Button({
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-white text-black hover:bg-white/90',
    outline: 'border bg-transparent hover:bg-white/10',
  };
  const sizes = {
    default: 'h-9 px-4 py-2 text-sm',
    sm: 'h-7 px-2 text-xs',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
