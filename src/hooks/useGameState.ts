'use client';

import { create } from 'zustand';
import { CharacterClass, BossRealm, GameScreen } from '@/types';

interface GameState {
  currentScreen: GameScreen;
  selectedCharacter: CharacterClass | null;
  currentRealm: BossRealm | null;
  completedRealms: BossRealm[];
  isMuted: boolean;
  
  setScreen: (screen: GameScreen) => void;
  selectCharacter: (character: CharacterClass) => void;
  setCurrentRealm: (realm: BossRealm) => void;
  completeRealm: (realm: BossRealm) => void;
  toggleMute: () => void;
  reset: () => void;
}

export const useGameState = create<GameState>((set) => ({
  currentScreen: 'home',
  selectedCharacter: null,
  currentRealm: null,
  completedRealms: [],
  isMuted: false,

  setScreen: (screen) => set({ currentScreen: screen }),
  selectCharacter: (character) => set({ selectedCharacter: character }),
  setCurrentRealm: (realm) => set({ currentRealm: realm }),
  completeRealm: (realm) => 
    set((state) => ({ 
      completedRealms: [...state.completedRealms, realm] 
    })),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  reset: () => set({
    currentScreen: 'home',
    selectedCharacter: null,
    currentRealm: null,
    completedRealms: [],
    isMuted: false
  })
}));