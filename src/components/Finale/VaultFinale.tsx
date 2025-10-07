'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import Button from '@/components/UI/Button';
import SoundToggle from '@/components/UI/SoundToggle';

const storySequence = [
  "When the fragments united, creation became effortless…",
  "The fifty films were saved. The vault was now secure.",
  "And the Arygoden team realized something...",
  "Where once there was tangled configuration, now there was clarity.",
  "Where once there was endless debugging, now there was seamless creation.",
  "The real magic wasn't in the quest itself — it was working on a platform that never fought against them."
];

const finalTagline = "Railway: The infrastructure that lets creativity survive.";

export default function VaultFinale() {
  const { reset } = useGameState();
  const [currentStep, setCurrentStep] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < storySequence.length - 1) {
        setCurrentStep(currentStep + 1);
      } else if (!showTagline) {
        setShowTagline(true);
        setTimeout(() => setShowButton(true), 1500);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentStep, showTagline]);

  const handleDeployOnRailway = () => {
    window.open('https://railway.com', '_blank');
  };

  const handlePlayAgain = () => {
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      <SoundToggle />
      
      {/* Vault background with golden light */}
      <div className="absolute inset-0">
        {/* Golden radial gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-yellow-400/30 via-amber-600/20 to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating light orbs */}
        {[...Array(25)].map((_, i) => {
          // Use deterministic values based on index to avoid hydration mismatch
          const left = (i * 14.7 + 6.3) % 100;
          const top = (i * 22.1 + 8.9) % 100;
          const xOffset = (i % 2 === 0 ? 1 : -1) * ((i * 4) % 20);
          const duration = 6 + (i % 4);
          const delay = (i * 0.25) % 5;
          
          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-yellow-300/80 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, xOffset, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
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
        
        {/* Pulsing vault energy */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-400/5 to-orange-500/10"
          animate={{
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Main vault visualization */}
      <motion.div
        className="relative z-10 mb-16"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 2, type: "spring" }}
      >
        <div className="relative">
          {/* Outer vault ring */}
          <motion.div
            className="w-80 h-80 border-4 border-purple-400/60 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Inner vault core */}
            <motion.div
              className="w-48 h-48 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 rounded-full flex items-center justify-center relative overflow-hidden"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 40px rgba(147, 51, 234, 0.5)',
                  '0 0 80px rgba(147, 51, 234, 0.8)',
                  '0 0 40px rgba(147, 51, 234, 0.5)'
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              {/* Vault symbol - Railway train */}
              <motion.div
                className="flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 64 64" 
                  fill="none" 
                  className="text-white"
                >
                  {/* Train body (main locomotive) */}
                  <rect x="12" y="22" width="32" height="16" rx="3" fill="currentColor" strokeWidth="2"/>
                  
                  {/* Train front (streamlined nose) */}
                  <path d="M44 26 L52 30 L52 34 L44 38 Z" fill="currentColor"/>
                  
                  {/* Train windows */}
                  <rect x="15" y="25" width="5" height="5" rx="1.5" fill="rgba(0,0,0,0.4)"/>
                  <rect x="22" y="25" width="5" height="5" rx="1.5" fill="rgba(0,0,0,0.4)"/>
                  <rect x="29" y="25" width="5" height="5" rx="1.5" fill="rgba(0,0,0,0.4)"/>
                  <rect x="36" y="25" width="5" height="5" rx="1.5" fill="rgba(0,0,0,0.4)"/>
                  
                  {/* Train wheels */}
                  <circle cx="18" cy="42" r="4" fill="currentColor" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
                  <circle cx="28" cy="42" r="4" fill="currentColor" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
                  <circle cx="38" cy="42" r="4" fill="currentColor" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
                  
                  {/* Speed/motion lines behind train */}
                  <line x1="2" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="2.5" opacity="0.7"/>
                  <line x1="1" y1="25" x2="9" y2="25" stroke="currentColor" strokeWidth="2.5" opacity="0.5"/>
                  <line x1="2" y1="30" x2="8" y2="30" stroke="currentColor" strokeWidth="2.5" opacity="0.7"/>
                  <line x1="3" y1="35" x2="7" y2="35" stroke="currentColor" strokeWidth="2.5" opacity="0.4"/>
                  
                  {/* Front headlight */}
                  <circle cx="49" cy="32" r="2.5" fill="rgba(255,255,255,0.9)"/>
                  
                  {/* Top detail/chimney */}
                  <rect x="20" y="16" width="4" height="6" rx="2" fill="currentColor"/>
                  
                  {/* Connection between cars */}
                  <rect x="10" y="29" width="2" height="6" rx="1" fill="currentColor" opacity="0.8"/>
                </svg>
              </motion.div>
              
              {/* Energy waves */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-purple-200/40 rounded-full"
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.8, 0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.7,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
          
          {/* Orbiting elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-purple-400 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-12px',
                marginTop: '-12px',
              }}
              animate={{
                rotate: 360,
                x: Math.cos(i * Math.PI / 4) * 120,
                y: Math.sin(i * Math.PI / 4) * 120,
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Story text sequence */}
      <div className="relative z-10 text-center max-w-5xl mx-auto mb-8 px-6">
        <AnimatePresence mode="wait">
          {currentStep < storySequence.length && (
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ 
                duration: 0.75, 
                ease: "easeOut",
                opacity: { duration: 0.75 }
              }}
              className="text-xl md:text-2xl lg:text-3xl font-story text-slate-200 leading-relaxed mb-6 px-4"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              {storySequence[currentStep]}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Final tagline */}
        <AnimatePresence>
          {showTagline && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                opacity: { duration: 1.2, ease: "easeIn" }
              }}
              className="mt-8 px-4"
            >
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medieval font-bold leading-tight"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(59, 130, 246, 0.6)',
                    '0 0 30px rgba(59, 130, 246, 0.4)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.span 
                  className="bg-gradient-to-r from-slate-400 via-blue-300 to-slate-500 bg-clip-text text-transparent"
                  style={{
                    filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9))',
                  }}
                  animate={{
                    filter: [
                      'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))',
                      'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 35px rgba(59, 130, 246, 0.7))',
                      'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 25px rgba(59, 130, 246, 0.5))'
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {finalTagline}
                </motion.span>
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.0, 
              ease: "easeOut",
              opacity: { duration: 0.8, ease: "easeIn" }
            }}
            className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-6 pb-8"
          >
            <Button
              onClick={handleDeployOnRailway}
              size="lg"
              className="text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 w-full sm:w-auto"
            >
              Deploy on Railway
            </Button>
            <Button
              onClick={handlePlayAgain}
              size="lg"
              variant="secondary"
              className="text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 w-full sm:w-auto"
            >
              Begin New Tale
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom light effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-64 bg-gradient-to-t from-yellow-400/20 via-amber-500/10 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}