'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false 
}: ButtonProps) {
  const baseClasses = `
    font-medieval font-bold transition-all duration-300 cursor-pointer
    border-2 backdrop-blur-sm relative overflow-hidden
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  const variants = {
    primary: 'bg-gradient-to-r from-purple-700 to-violet-600 border-purple-500 text-white hover:from-purple-600 hover:to-violet-500',
    secondary: 'bg-gradient-to-r from-slate-700 to-gray-600 border-slate-500 text-white hover:from-slate-600 hover:to-gray-500',
    danger: 'bg-gradient-to-r from-red-700 to-red-600 border-red-500 text-white hover:from-red-600 hover:to-red-500'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={disabled ? undefined : onClick}
      whileHover={!disabled ? { scale: 1.05, boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}