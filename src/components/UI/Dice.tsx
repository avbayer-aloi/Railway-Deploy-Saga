'use client';

import { motion } from 'framer-motion';

interface DiceProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Dice({ size = 'lg', className = '' }: DiceProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  };

  return (
    <motion.div
      className={`${sizes[size]} ${className} relative`}
      animate={{ 
        rotateX: 360,
        rotateY: 360,
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-500 to-teal-600 rounded-lg opacity-80 shadow-lg">
        <div className="absolute inset-2 border-2 border-white/30 rounded-md">
          <div className="flex items-center justify-center h-full">
            <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
          </div>
        </div>
      </div>
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-600/20 rounded-lg"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
}