'use client';

import { motion } from 'framer-motion';

interface HPBarProps {
  current: number;
  max: number;
  color: 'red' | 'emerald' | 'blue';
  size?: 'small' | 'medium' | 'large';
}

export default function HPBar({ current, max, color, size = 'medium' }: HPBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  const colorClasses = {
    red: 'from-red-500 to-red-600',
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600'
  };

  const sizeClasses = {
    small: 'w-32 h-3',
    medium: 'w-48 h-4',
    large: 'w-64 h-6'
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  return (
    <div className="flex flex-col">
      {/* HP Numbers */}
      <div className={`text-white font-bold mb-1 ${textSizeClasses[size]}`}>
        {current} / {max} HP
      </div>
      
      {/* HP Bar Container */}
      <div className={`${sizeClasses[size]} bg-gray-800/80 border-2 border-gray-600 rounded-full overflow-hidden relative`}>
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700/50 to-gray-600/50" />
        
        {/* HP Fill */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} rounded-full`}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
          animate={{
            x: [-100, 100],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Low HP warning pulse */}
        {percentage < 25 && (
          <motion.div
            className="absolute inset-0 bg-red-400/30 rounded-full"
            animate={{
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        )}
      </div>
      
      {/* Percentage indicator */}
      <div className={`text-gray-300 mt-1 ${textSizeClasses[size]}`}>
        {Math.round(percentage)}%
      </div>
    </div>
  );
}