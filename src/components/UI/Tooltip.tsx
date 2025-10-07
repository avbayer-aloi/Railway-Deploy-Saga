'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 ${positions[position]}`}
          >
            <div className="bg-slate-900/95 text-white text-sm px-3 py-2 rounded-lg border border-slate-700 backdrop-blur-sm shadow-xl whitespace-nowrap">
              {content}
              <div className="absolute w-2 h-2 bg-slate-900 transform rotate-45 -z-10" 
                   style={{
                     [position === 'top' ? 'top' : position === 'bottom' ? 'bottom' : position === 'left' ? 'left' : 'right']: '100%',
                     left: position === 'top' || position === 'bottom' ? '50%' : 'auto',
                     top: position === 'left' || position === 'right' ? '50%' : 'auto',
                     transform: position === 'top' || position === 'bottom' ? 'translateX(-50%) rotate(45deg)' : 'translateY(-50%) rotate(45deg)'
                   }} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}