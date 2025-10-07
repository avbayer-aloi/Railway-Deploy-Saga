'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCombat } from '@/hooks/useCombat';
import { useGameState } from '@/hooks/useGameState';
import { BossRealm } from '@/types';
import { BOSS_DATA } from '@/types/combat';
import InitiativeD20 from './InitiativeD20';
import HPBar from './HPBar';
import CombatLog from './CombatLog';
import AbilityButton from './AbilityButton';
import VictoryModal from './VictoryModal';
import DefeatModal from './DefeatModal';
import SoundToggle from '@/components/UI/SoundToggle';
import { useEffect } from 'react';

interface CombatScreenProps {
  bossId: BossRealm;
  onExit: () => void;
}

export default function CombatScreen({ bossId, onExit }: CombatScreenProps) {
  const { combatState, startCombat, rollInitiativePhase, executePlayerAction, endCombat, abilities } = useCombat();
  const { completeRealm } = useGameState();

  useEffect(() => {
    startCombat(bossId);
  }, [bossId, startCombat]);

  const handleVictory = () => {
    completeRealm(bossId);
    endCombat();
    onExit();
  };

  const handleDefeat = () => {
    endCombat();
    onExit();
  };

  const handleRetry = () => {
    startCombat(bossId);
  };

  if (!combatState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Initializing combat...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-900/40 via-purple-900/30 to-black/60"
    >
      <SoundToggle />

      {/* Combat background effects */}
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
            repeatDelay: 8,
          }}
        />
        
        {/* Floating embers */}
        {[...Array(15)].map((_, i) => {
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

      {/* Initiative Rolling */}
      <AnimatePresence>
        {combatState.phase === 'initiative' && (
          <InitiativeD20
            isRolling={true}
            onRollComplete={rollInitiativePhase}
          />
        )}
      </AnimatePresence>

      {/* Main Combat UI */}
      {combatState.phase !== 'initiative' && (
        <div className="relative z-10 h-screen flex">
          {/* Left Side - Main Combat Area */}
          <div className="flex-1 flex flex-col">
            {/* Top HUD - HP Bars */}
            <div className="flex justify-between items-start p-6">
            {/* Player HP */}
            <motion.div
              className="flex flex-col"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-blue-200 font-medieval font-bold mb-2">
                {combatState.player.name}
              </div>
              <HPBar
                current={combatState.player.stats.hp}
                max={combatState.player.stats.maxHp}
                color="emerald"
                size="large"
              />
              {/* Status Effects */}
              {combatState.player.statusEffects.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {combatState.player.statusEffects.map(effect => (
                    <div
                      key={effect.id}
                      className="px-2 py-1 bg-blue-600/80 rounded text-xs text-white"
                      title={effect.description}
                    >
                      {effect.name} ({effect.duration})
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Turn Indicator */}
            <motion.div
              className="text-center"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className={`px-6 py-3 rounded-lg font-medieval font-bold text-lg ${
                combatState.currentTurn === 'player' 
                  ? 'bg-blue-600/80 text-blue-100' 
                  : 'bg-red-600/80 text-red-100'
              }`}>
                {combatState.currentTurn === 'player' ? 'Your Turn' : 'Boss Turn'}
              </div>
              <div className="mt-2 text-slate-300 font-story">
                Round {combatState.roundNumber}
              </div>
            </motion.div>

            {/* Boss HP */}
            <motion.div
              className="flex flex-col items-end"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-red-200 font-medieval font-bold mb-2 text-right">
                {combatState.boss.name}
              </div>
              <HPBar
                current={combatState.boss.stats.hp}
                max={combatState.boss.stats.maxHp}
                color="red"
                size="large"
              />
              {/* Boss Status Effects */}
              {combatState.boss.statusEffects.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 justify-end">
                  {combatState.boss.statusEffects.map(effect => (
                    <div
                      key={effect.id}
                      className="px-2 py-1 bg-red-600/80 rounded text-xs text-white"
                      title={effect.description}
                    >
                      {effect.name} ({effect.duration})
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

            {/* Center - Boss Visualization */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                className="relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1, type: "spring" }}
              >
                {/* Boss Avatar */}
                <div className="w-64 h-64 bg-gradient-to-br from-red-600/30 to-purple-600/30 rounded-full border-4 border-red-500/50 flex items-center justify-center relative overflow-hidden">
                  {/* Pulsing energy core */}
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-4xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    🐉
                  </motion.div>
                  
                  {/* Rotating rings */}
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
                  
                  {/* Damage flash */}
                  <AnimatePresence>
                    {combatState.isAnimating && (
                      <motion.div
                        className="absolute inset-0 bg-white/50 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Bottom - Abilities */}
            <div className="p-6">

            {/* Player Abilities */}
            {combatState.phase === 'player-turn' && !combatState.isAnimating && (
              <motion.div
                className="flex justify-center gap-12 flex-wrap relative z-20"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {abilities.map(ability => (
                  <AbilityButton
                    key={ability.id}
                    ability={ability}
                    onClick={() => executePlayerAction(ability)}
                    disabled={combatState.isAnimating}
                  />
                ))}
              </motion.div>
            )}

            {/* Boss Turn Indicator */}
            {combatState.phase === 'boss-turn' && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-red-200 font-medieval text-xl">
                  {combatState.boss.name} is preparing an attack...
                </div>
              </motion.div>
            )}
            </div>
          </div>

          {/* Right Side - Combat Log */}
          <div className="w-80 p-6 border-l border-amber-600/30 flex flex-col">
            <CombatLog entries={combatState.combatLog} />
          </div>
        </div>
      )}

      {/* Victory Modal */}
      <AnimatePresence>
        {combatState.phase === 'victory' && (
          <VictoryModal
            bossName={combatState.boss.name}
            sigilReward={BOSS_DATA[combatState.boss.id]?.sigilReward || 'Unknown Sigil'}
            victoryText={BOSS_DATA[combatState.boss.id]?.victoryText || 'Victory achieved!'}
            onContinue={handleVictory}
          />
        )}
      </AnimatePresence>

      {/* Defeat Modal */}
      <AnimatePresence>
        {combatState.phase === 'defeat' && (
          <DefeatModal
            onRetry={handleRetry}
            onReturnToMap={handleDefeat}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}