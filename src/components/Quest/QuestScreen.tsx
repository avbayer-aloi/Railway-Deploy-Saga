'use client';

import { motion } from 'framer-motion';
import { useGameState } from '@/hooks/useGameState';
import { realms } from '@/lib/data';
import Button from '@/components/UI/Button';

export default function QuestScreen() {
  const { currentRealm, setScreen, completedRealms } = useGameState();
  
  const realm = realms.find(r => r.id === currentRealm);
  const isRealmCompleted = currentRealm ? completedRealms.includes(currentRealm) : false;

  const handleReturnToMap = () => {
    setScreen('vault-field');
  };

  const handleStartCombat = () => {
    setScreen('combat');
  };

  if (!realm) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Realm not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      {/* Ominous background */}
      <div className="absolute inset-0">
        {/* Swirling mist */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-purple-900/20 to-black/40"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Lightning flashes */}
        <motion.div
          className="absolute inset-0 bg-blue-400/10"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        />
        
        {/* Floating embers */}
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index to avoid hydration mismatch
          const left = (i * 13.9 + 9.7) % 100;
          const top = (i * 21.3 + 15.1) % 100;
          const duration = 4 + (i % 3);
          const delay = (i * 0.35) % 5;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-400/60 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Boss title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-medieval font-bold mb-4">
            <span 
              className="bg-gradient-to-r from-red-400 via-red-300 to-red-500 bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 25px rgba(239, 68, 68, 0.3))',
                textShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
              }}
            >
              {realm.name}
            </span>
          </h1>
          <p className="text-2xl font-story text-slate-300 mb-2">
            {realm.description}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-400 mx-auto rounded-full" />
        </motion.div>

        {/* Boss visualization placeholder */}
        <motion.div
          className="mb-12"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1, type: "spring" }}
        >
          <div className={`w-64 h-64 mx-auto rounded-full border-4 flex items-center justify-center relative overflow-hidden ${
            isRealmCompleted
              ? 'bg-gradient-to-br from-green-600/30 to-emerald-600/30 border-green-500/50'
              : 'bg-gradient-to-br from-red-600/30 to-purple-600/30 border-red-500/50'
          }`}>
            {isRealmCompleted ? (
              /* Defeated boss - static green glow with victory symbol */
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-4xl">
                ✅
              </div>
            ) : (
              /* Active boss - pulsing red energy */
              <>
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-4xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  🐉
                </motion.div>
                
                {/* Rotating rings - only show for active bosses */}
                <motion.div
                  className="absolute inset-4 border-2 border-red-400/60 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-8 border border-red-400/40 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </>
            )}
          </div>
        </motion.div>

        {/* Completed realm message */}
        {isRealmCompleted && (
          <motion.div
            className="mb-12"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="bg-green-900/30 border-green-500/50 backdrop-blur-sm rounded-lg p-8 border max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <p className="text-lg font-story text-green-200 leading-relaxed mb-6 text-center">
                <strong>Realm Conquered!</strong>
              </p>
              <p className="text-base font-story text-green-300 text-center">
                {`The ${realm?.name} has been defeated and its power claimed. This realm\'s sigil has been added to your collection.`}
              </p>
            </div>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {!isRealmCompleted && (
            <Button
              onClick={handleStartCombat}
              size="lg"
              className="text-xl px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 animate-glow"
            >
              ⚔️ Enter Combat
            </Button>
          )}
          <Button
            onClick={handleReturnToMap}
            size="lg"
            variant="secondary"
            className="text-xl px-8 py-4"
          >
            🗺️ Return to Map
          </Button>
        </motion.div>
      </div>

      {/* Bottom atmospheric effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-red-900/30 via-purple-900/20 to-transparent"
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}