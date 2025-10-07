'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { characters } from '@/lib/data';
import { CharacterClass } from '@/types';
import CharacterCard from './CharacterCard';
import Button from '@/components/UI/Button';

export default function CharacterSelect() {
  const { selectCharacter, setScreen } = useGameState();
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterClass | null>(null);

  const handleCharacterSelect = (characterId: CharacterClass) => {
    setSelectedCharacter(characterId);
  };

  const handleEnterVault = () => {
    if (selectedCharacter) {
      selectCharacter(selectedCharacter);
      setScreen('vault-field');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      {/* Vault background effect */}
      <div className="absolute inset-0">
        {/* Light beams */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-full bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent"
            style={{
              left: `${20 + i * 20}%`,
              transform: 'skew(-20deg)',
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
        
        {/* Floating dust particles */}
        {[...Array(15)].map((_, i) => {
          // Use deterministic values based on index to avoid hydration mismatch
          const left = (i * 19.4 + 8.2) % 100;
          const top = (i * 27.6 + 11.3) % 100;
          const xOffset = (i % 2 === 0 ? 1 : -1) * ((i * 7) % 50);
          const duration = 6 + (i % 4);
          const delay = (i * 0.4) % 5;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300/40 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -200],
                opacity: [0, 1, 0],
                x: [0, xOffset],
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
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-medieval font-bold mb-4">
            <span 
              className="bg-gradient-to-r from-slate-400 via-blue-300 to-slate-500 bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 25px rgba(59, 130, 246, 0.3))',
                textShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
              }}
            >
              Choose Your Adventurer
            </span>
          </h1>
          <p className="text-xl font-story text-slate-300 max-w-2xl mx-auto">
            Your discipline determines your fate in the depths of the infrastructure vault.
          </p>
        </motion.div>

        {/* Character cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
            >
              <CharacterCard
                character={character}
                isSelected={selectedCharacter === character.id}
                onSelect={() => handleCharacterSelect(character.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enter vault button */}
        <motion.div
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <Button
            onClick={handleEnterVault}
            disabled={!selectedCharacter}
            size="lg"
            className="text-xl px-12 py-4"
          >
            Enter the Vault
          </Button>
        </motion.div>
      </div>

      {/* Vault door shadow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/50 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}