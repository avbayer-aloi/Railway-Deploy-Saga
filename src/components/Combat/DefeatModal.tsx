'use client';

import { motion } from 'framer-motion';
import Button from '@/components/UI/Button';

interface DefeatModalProps {
  onRetry: () => void;
  onReturnToMap: () => void;
}

export default function DefeatModal({ onRetry, onReturnToMap }: DefeatModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative max-w-2xl mx-4 bg-gradient-to-br from-red-900/95 to-gray-900/95 rounded-xl border-4 border-red-500/50 shadow-2xl overflow-hidden"
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 100 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* Defeat atmosphere */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-gray-600/20"
          animate={{
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* Falling ash particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gray-400/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${-10 + Math.random() * 20}%`,
              }}
              animate={{
                y: [0, 120],
                opacity: [0, 0.6, 0],
                x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Defeat Icon */}
          <motion.div
            className="text-8xl mb-6"
            animate={{
              scale: [1, 0.95, 1],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            💀
          </motion.div>

          <motion.h2
            className="text-4xl font-medieval font-bold text-red-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Defeat
          </motion.h2>

          <motion.p
            className="text-xl text-red-100 font-story mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            The chaos overwhelms your defenses. Your systems crash and burn, dependencies scattered to the wind.
          </motion.p>

          <motion.div
            className="text-red-300/70 italic font-story mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            "Even the mightiest paladins must learn from failure..."
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button
              onClick={onRetry}
              className="bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-500 hover:to-red-600 text-white font-bold px-6 py-3 rounded-lg border-2 border-orange-400 shadow-lg transition-all duration-300"
              style={{
                boxShadow: '0 0 20px rgba(251, 146, 60, 0.4)',
              }}
            >
              ⚔️ Try Again
            </Button>
            
            <Button
              onClick={onReturnToMap}
              variant="secondary"
              className="px-6 py-3 font-bold"
            >
              🗺️ Return to Map
            </Button>
          </motion.div>

          {/* Encouragement */}
          <motion.div
            className="mt-6 text-gray-300 text-sm font-story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Learn from this defeat. Study your enemy's patterns. Victory awaits the prepared.
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}