'use client';

import { AnimatePresence } from 'framer-motion';
import { useGameState } from '@/hooks/useGameState';
import { useAudio } from '@/hooks/useAudio';
import { createContext, useContext } from 'react';
import HomeScreen from '@/components/Home/HomeScreen';
import OpeningCrawl from '@/components/OpeningCrawl/OpeningCrawl';
import CharacterSelect from '@/components/Character/CharacterSelect';
import VaultField from '@/components/VaultField/VaultField';
import QuestScreen from '@/components/Quest/QuestScreen';
import CombatScreen from '@/components/Combat/CombatScreen';
import VaultFinale from '@/components/Finale/VaultFinale';

// Create audio context to share across components
const AudioContext = createContext<{
  startBackgroundMusic: () => void;
  isMuted: boolean;
  toggleMute: () => void;
} | null>(null);

export const useGlobalAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useGlobalAudio must be used within Game component');
  }
  return context;
};

export default function Game() {
  const { currentScreen, currentRealm, setScreen } = useGameState();
  const audioControls = useAudio();

  return (
    <AudioContext.Provider value={audioControls}>
      <div className="relative w-full min-h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <HomeScreen key="home" />
          )}
          {currentScreen === 'opening-crawl' && (
            <OpeningCrawl key="opening-crawl" />
          )}
          {currentScreen === 'character-select' && (
            <CharacterSelect key="character-select" />
          )}
          {currentScreen === 'vault-field' && (
            <VaultField key="vault-field" />
          )}
          {currentScreen === 'quest' && (
            <QuestScreen key="quest" />
          )}
          {currentScreen === 'combat' && currentRealm && (
            <CombatScreen 
              key="combat" 
              bossId={currentRealm}
              onExit={() => setScreen('vault-field')}
            />
          )}
          {currentScreen === 'finale' && (
            <VaultFinale key="finale" />
          )}
        </AnimatePresence>
      </div>
    </AudioContext.Provider>
  );
}