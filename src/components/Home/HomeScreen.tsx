'use client';

import { motion } from 'framer-motion';
import { useGameState } from '@/hooks/useGameState';
import { useGlobalAudio } from '@/components/Game';
import { useEffect } from 'react';
import CinematicD20 from '@/components/UI/CinematicD20';
import Button from '@/components/UI/Button';
import SoundToggle from '@/components/UI/SoundToggle';

export default function HomeScreen() {
  const { setScreen } = useGameState();
  const { startBackgroundMusic } = useGlobalAudio();

  const handleStart = () => {
    // Start background music when user clicks Start Adventure
    startBackgroundMusic();
    setScreen('opening-crawl');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <SoundToggle />
      {/* Enhanced cinematic atmosphere */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mystical floating particles */}
        {[...Array(25)].map((_, i) => {
          const left = (i * 14.7 + 11.3) % 100;
          const top = (i * 19.1 + 7.2) % 100;
          const duration = 8 + (i % 5);
          const delay = (i * 0.3) % 10;
          
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 4 === 0 ? 'w-1 h-1 bg-indigo-400/50' : 
                i % 4 === 1 ? 'w-2 h-2 bg-slate-300/40' : 
                i % 4 === 2 ? 'w-1.5 h-1.5 bg-blue-300/45' :
                'w-1 h-1 bg-purple-300/50'
              }`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                filter: 'blur(0.8px)',
                boxShadow: i % 3 === 0 ? '0 0 4px rgba(99, 102, 241, 0.6)' : '0 0 2px rgba(148, 163, 184, 0.4)',
              }}
              animate={{
                y: [0, -150, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
        
        {/* Deep atmospheric mist layers */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`deep-mist-${i}`}
            className="absolute inset-0"
            style={{
              background: i % 2 === 0 
                ? 'radial-gradient(ellipse at 30% 70%, rgba(30, 58, 138, 0.15) 0%, transparent 60%)'
                : 'radial-gradient(ellipse at 70% 30%, rgba(67, 56, 202, 0.12) 0%, transparent 65%)',
              filter: `blur(${12 + i * 6}px)`,
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.08, 1],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 15 + i * 4,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Ambient light beams */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`light-beam-${i}`}
            className="absolute w-1 h-full opacity-10"
            style={{
              left: `${25 + i * 25}%`,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(59, 130, 246, 0.3) 30%, rgba(139, 92, 246, 0.2) 70%, transparent 100%)',
              transform: 'skew(-15deg)',
              filter: 'blur(4px)',
            }}
            animate={{
              opacity: [0.05, 0.2, 0.05],
              scaleY: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Dark atmospheric overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-slate-900/10 to-gray-900/20"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Main content */}
      <div className="z-10 text-center space-y-8">
        {/* Cinematic 3D D20 */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ scale: 0, rotateY: -180, opacity: 0 }}
          animate={{ scale: 1, rotateY: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 2.5, type: "spring" }}
        >
          <CinematicD20 size="lg" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-medieval font-bold">
            <span 
              className="bg-gradient-to-r from-slate-400 via-blue-300 to-slate-500 bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 25px rgba(59, 130, 246, 0.3))',
                textShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
              }}
            >
              The Lost Tales
            </span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-medieval font-bold">
            <span 
              className="bg-gradient-to-r from-red-400 via-red-300 to-red-500 bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 25px rgba(239, 68, 68, 0.3))',
                textShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
              }}
            >
              of Arygoden
            </span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-lg md:text-xl font-medieval italic text-slate-300 max-w-2xl mx-auto leading-relaxed"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(59, 130, 246, 0.2)',
          }}
        >
          <em>Click Start to Save Your Enterprise</em>
        </motion.p>

        {/* Start Adventure Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="pt-12"
        >
          <motion.button
            onClick={handleStart}
            className="
              px-16 py-5 text-xl font-medieval font-bold
              text-white rounded-xl
              transition-all duration-300
              relative overflow-hidden
              shadow-2xl
            "
            style={{
              background: 'linear-gradient(135deg, #6912B9 0%, #8B5CF6 50%, #6912B9 100%)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              boxShadow: '0 0 25px rgba(105, 18, 185, 0.4), 0 8px 32px rgba(0,0,0,0.6)',
              border: '2px solid rgba(139, 92, 246, 0.3)',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 35px rgba(105, 18, 185, 0.6), 0 12px 48px rgba(0,0,0,0.7)',
              background: 'linear-gradient(135deg, #581C87 0%, #7C3AED 50%, #581C87 100%)',
            }}
            whileTap={{ 
              scale: 0.95,
              background: 'linear-gradient(135deg, #450A0A 0%, #991B1B 50%, #450A0A 100%)',
            }}
            animate={{
              boxShadow: [
                '0 0 25px rgba(105, 18, 185, 0.4), 0 8px 32px rgba(0,0,0,0.6)',
                '0 0 35px rgba(105, 18, 185, 0.6), 0 8px 32px rgba(0,0,0,0.6)',
                '0 0 25px rgba(105, 18, 185, 0.4), 0 8px 32px rgba(0,0,0,0.6)',
              ]
            }}
            transition={{
              boxShadow: { duration: 3, repeat: Infinity },
              type: "spring"
            }}
          >
            {/* Mystical shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 1 }}
            />
            <span className="relative z-10">Start Adventure</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Mystical ground mist */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-48 bg-gradient-to-t from-purple-900/30 via-slate-800/20 to-transparent blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}