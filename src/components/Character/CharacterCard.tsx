'use client';

import { motion } from 'framer-motion';
import { Character } from '@/types';

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onSelect: () => void;
}

export default function CharacterCard({ character, isSelected, onSelect }: CharacterCardProps) {
  return (
    <motion.div
      className={`
        relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-300
        ${isSelected 
          ? 'border-purple-400 bg-gradient-to-br from-purple-900/30 to-violet-900/30' 
          : 'border-slate-600 bg-gradient-to-br from-slate-800/50 to-slate-700/50 hover:border-slate-400'
        }
        backdrop-blur-sm shadow-xl
      `}
      onClick={onSelect}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        boxShadow: isSelected 
          ? '0 20px 40px rgba(147, 51, 234, 0.3)' 
          : '0 20px 40px rgba(255, 255, 255, 0.1)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow effect when selected */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-violet-600/20 rounded-lg"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      {/* Character emoji */}
      <div className="text-6xl mb-4 text-center">
        {character.emoji}
      </div>
      
      {/* Character info */}
      <div className="relative z-10 text-center space-y-2">
        <h3 className="text-2xl font-medieval font-bold text-blue-300">
          {character.name}
        </h3>
        <p className="text-lg font-medieval text-slate-300">
          {character.title}
        </p>
        <p className="text-sm font-story text-slate-400 leading-relaxed">
          {character.description}
        </p>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.3 }}
        >
          <div className="w-3 h-3 bg-purple-900 rounded-full" />
        </motion.div>
      )}
    </motion.div>
  );
}