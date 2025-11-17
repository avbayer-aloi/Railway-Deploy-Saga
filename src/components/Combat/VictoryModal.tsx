'use client';

import { motion } from 'framer-motion';
import Button from '@/components/UI/Button';

interface VictoryModalProps {
  bossName: string;
  sigilReward: string;
  victoryText: string;
  onContinue: () => void;
}

export default function VictoryModal({ bossName, sigilReward, victoryText, onContinue }: VictoryModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative max-w-2xl mx-4 bg-gradient-to-br from-yellow-900/95 to-amber-800/95 rounded-xl border-4 border-yellow-500/50 shadow-2xl overflow-hidden"
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 100 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* Victory glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-400/20"
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Floating victory particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-30, -80],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Victory Crown */}
          <motion.div
            className="text-8xl mb-6"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            👑
          </motion.div>

          <motion.h2
            className="text-4xl font-medieval font-bold text-yellow-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Victory!
          </motion.h2>

          <motion.p
            className="text-xl text-amber-100 font-story mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            The final head of {bossName} collapses, its chaotic energy dissipating into the void.
          </motion.p>

          {/* Sigil Reward */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-lg p-6 border-2 border-blue-400/50">
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                ⚡
              </motion.div>
              
              <h3 className="text-2xl font-medieval font-bold text-blue-200 mb-2">
                {sigilReward} Acquired!
              </h3>
              
              <p className="text-blue-100/90 font-story">
                {victoryText}
              </p>
            </div>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Button
              onClick={onContinue}
              className="bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold px-8 py-3 rounded-lg border-2 border-yellow-400 shadow-lg transition-all duration-300"
            >
              🗺️ Return to Map
            </Button>
          </motion.div>

          {/* Victory Quote */}
          <motion.div
            className="mt-6 text-amber-300/70 italic font-story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {`"Order restored. The stack is clean."`}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}