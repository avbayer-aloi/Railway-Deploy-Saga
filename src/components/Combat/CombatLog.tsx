'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CombatLogEntry } from '@/types/combat';
import { useEffect, useRef } from 'react';

interface CombatLogProps {
  entries: CombatLogEntry[];
  maxEntries?: number;
}

export default function CombatLog({ entries, maxEntries }: CombatLogProps) {
  const logRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new entries are added
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [entries]);

  // Show all entries for full chat history
  const displayEntries = entries;

  const getEntryStyles = (entry: CombatLogEntry) => {
    switch (entry.type) {
      case 'initiative':
        return 'text-blue-300 border-l-4 border-blue-500 pl-3';
      case 'damage':
        return 'text-red-300 border-l-4 border-red-500 pl-3';
      case 'heal':
        return 'text-green-300 border-l-4 border-green-500 pl-3';
      case 'effect':
        return 'text-purple-300 border-l-4 border-purple-500 pl-3';
      case 'turn':
        return 'text-yellow-300 font-bold text-center border-t border-yellow-500/30 pt-2';
      case 'action':
        return 'text-amber-300 italic pl-6';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-3">
        <h3 className="text-lg font-medieval font-bold text-amber-200">
          Combat Log
        </h3>
      </div>
      
      <div
        ref={logRef}
        className="bg-black/60 backdrop-blur-sm border border-amber-600/30 rounded-lg p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-600/50 scrollbar-track-transparent"
      >
        <AnimatePresence initial={false}>
          {displayEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              className={`mb-2 font-story text-sm leading-relaxed ${getEntryStyles(entry)}`}
              initial={{ opacity: 0, y: 20, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05
              }}
            >
              {entry.message}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Empty state */}
        {displayEntries.length === 0 && (
          <div className="text-gray-400 text-center italic">
            Combat log will appear here...
          </div>
        )}
      </div>
    </div>
  );
}