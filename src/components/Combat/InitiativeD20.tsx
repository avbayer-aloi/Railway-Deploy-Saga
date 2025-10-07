'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface InitiativeD20Props {
  isRolling: boolean;
  onRollComplete: () => void;
  autoStart?: boolean;
}

export default function InitiativeD20({ isRolling, onRollComplete, autoStart = true }: InitiativeD20Props) {
  const [rollCount, setRollCount] = useState(0);

  useEffect(() => {
    if (isRolling && autoStart) {
      const timer = setTimeout(() => {
        setRollCount(prev => prev + 1);
        onRollComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isRolling, onRollComplete, autoStart]);

  if (!isRolling) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        {/* D20 Animation */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-6"
          animate={{
            rotateX: [0, 360, 720, 1080],
            rotateY: [0, 180, 540, 720],
            rotateZ: [0, 90, 270, 360],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1]
          }}
        >
          {/* D20 Face */}
          <div 
            className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg border-4 border-blue-300 shadow-xl flex items-center justify-center text-white font-bold text-xl"
            style={{
              clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.3)',
            }}
          >
            20
          </div>

          {/* Magical sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, (i % 2 ? 20 : -20)],
                y: [0, (i % 2 ? -20 : 20)],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>

        {/* Rolling text */}
        <motion.h2
          className="text-3xl font-medieval font-bold text-white mb-2"
          animate={{
            opacity: [1, 0.7, 1],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          Rolling Initiative...
        </motion.h2>

        <motion.div
          className="text-lg text-blue-200 font-story"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          The dice will determine who strikes first!
        </motion.div>

        {/* Glowing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-blue-400/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            width: '200px',
            height: '200px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </motion.div>
  );
}