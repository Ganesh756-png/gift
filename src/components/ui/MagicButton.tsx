import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MagicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export default function MagicButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon,
}: MagicButtonProps) {
  const baseStyles = 'relative overflow-hidden font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer select-none';

  const variants = {
    primary: 'bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 text-white shadow-lg shadow-rose-300/40 hover:shadow-xl hover:shadow-rose-400/50 hover:brightness-110',
    secondary: 'bg-gradient-to-r from-purple-400 via-violet-500 to-purple-600 text-white shadow-lg shadow-purple-300/40 hover:shadow-xl hover:shadow-purple-400/50 hover:brightness-110',
    gold: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-white shadow-lg shadow-amber-300/40 hover:shadow-xl hover:shadow-amber-400/50 hover:brightness-110',
    outline: 'border-2 border-rose-300 text-rose-500 hover:bg-rose-50 hover:border-rose-400',
    ghost: 'text-rose-500 hover:bg-rose-50',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-10 py-4.5 text-lg',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-shimmer pointer-events-none" />

      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
