'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
  CombatState, 
  CombatLogEntry, 
  CombatAction, 
  Combatant, 
  StatusEffect,
  PALADIN_ABILITIES,
  PALADIN_ABILITY_SETS,
  BOSS_DATA
} from '@/types/combat';
import { BossRealm } from '@/types';

// Dice rolling utility
function rollDice(diceString: string): number {
  const [count, sides] = diceString.split('d').map(Number);
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total;
}

function rollInitiative(): number {
  return rollDice('1d20');
}

function createCombatLogEntry(
  message: string, 
  type: CombatLogEntry['type'], 
  actor?: string, 
  target?: string
): CombatLogEntry {
  return {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    message,
    type,
    actor,
    target
  };
}

function createPaladin(): Combatant {
  return {
    id: 'paladin',
    name: 'Paladin',
    stats: {
      hp: 100,
      maxHp: 100,
      defense: 15,
      initiative: 0
    },
    statusEffects: [],
    isPlayer: true
  };
}

function createBoss(bossId: BossRealm): Combatant {
  const bossData = BOSS_DATA[bossId];
  if (!bossData) {
    throw new Error(`Boss data not found for ${bossId}`);
  }
  
  return {
    id: bossData.id,
    name: bossData.name,
    stats: {
      hp: bossData.hp,
      maxHp: bossData.hp,
      defense: 12,
      initiative: 0
    },
    statusEffects: [],
    isPlayer: false
  };
}

export function useCombat() {
  const [combatState, setCombatState] = useState<CombatState | null>(null);

  const startCombat = useCallback((bossId: BossRealm) => {
    const player = createPaladin();
    const boss = createBoss(bossId);

    const initialState: CombatState = {
      phase: 'initiative',
      currentTurn: 'player',
      roundNumber: 1,
      player,
      boss,
      combatLog: [
        createCombatLogEntry('Combat begins!', 'turn'),
        createCombatLogEntry('Rolling initiative...', 'initiative')
      ],
      isAnimating: false
    };

    setCombatState(initialState);
  }, []);

  const rollInitiativePhase = useCallback(() => {
    if (!combatState || combatState.phase !== 'initiative') return;

    setCombatState(prev => {
      if (!prev) return prev;

      const playerRoll = rollInitiative() + 2; // Paladin initiative modifier
      const bossRoll = rollInitiative() + 1; // Boss initiative modifier

      const playerGoesFirst = playerRoll >= bossRoll;
      
      const newLog = [
        ...prev.combatLog,
        createCombatLogEntry(`Paladin rolled ${playerRoll}`, 'initiative', 'paladin'),
        createCombatLogEntry(`${prev.boss.name} rolled ${bossRoll}`, 'initiative', prev.boss.id),
        createCombatLogEntry(
          playerGoesFirst 
            ? 'Paladin acts first!' 
            : `${prev.boss.name} acts first!`, 
          'initiative'
        )
      ];

      return {
        ...prev,
        phase: playerGoesFirst ? 'player-turn' : 'boss-turn',
        currentTurn: playerGoesFirst ? 'player' : 'boss',
        player: {
          ...prev.player,
          stats: { ...prev.player.stats, initiative: playerRoll }
        },
        boss: {
          ...prev.boss,
          stats: { ...prev.boss.stats, initiative: bossRoll }
        },
        combatLog: newLog
      };
    });
  }, [combatState]);

  const executePlayerAction = useCallback((action: CombatAction) => {
    if (!combatState || combatState.phase !== 'player-turn' || combatState.isAnimating) return;

    setCombatState(prev => {
      if (!prev) return prev;

      const newPlayer = { ...prev.player };
      const newBoss = { ...prev.boss };
      const newLog = [...prev.combatLog];

      // Calculate damage/healing
      let actionValue = 0;
      if (action.damage) {
        const roll = rollDice(action.damage.dice);
        actionValue = roll + action.damage.modifier;
      }

      // Apply action effects
      if (action.type === 'attack') {
        // Apply damage to boss
        let finalDamage = actionValue;
        
        // Check boss damage reduction
        const damageReduction = newBoss.statusEffects.find(e => e.effect.damageReduction);
        if (damageReduction) {
          finalDamage = Math.floor(finalDamage * (1 - damageReduction.effect.damageReduction!));
        }

        newBoss.stats.hp = Math.max(0, newBoss.stats.hp - finalDamage);
        newLog.push(createCombatLogEntry(
          `${action.name} hits ${newBoss.name} for ${finalDamage} damage!`,
          'damage',
          'paladin',
          newBoss.id
        ));

        // Handle healing effects for attack abilities
        if (action.effects?.healing) {
          const healRoll = rollDice(action.effects.healing.dice);
          const healAmount = Math.min(
            healRoll + action.effects.healing.modifier, 
            newPlayer.stats.maxHp - newPlayer.stats.hp
          );
          newPlayer.stats.hp += healAmount;
          newLog.push(createCombatLogEntry(
            `${action.name} also restores ${healAmount} HP!`,
            'heal',
            'paladin',
            'paladin'
          ));
        }

        // Apply status effects for attack abilities
        if (action.effects?.statusEffect) {
          const statusEffect: StatusEffect = {
            id: `${action.id}-${Date.now()}-${Math.random()}-${performance.now()}`,
            ...action.effects.statusEffect
          };
          
          if (action.effects.selfTarget) {
            newPlayer.statusEffects.push(statusEffect);
          }
          
          newLog.push(createCombatLogEntry(
            `${action.name} also activates ${statusEffect.name}! ${statusEffect.description}`,
            'effect',
            'paladin'
          ));
        }
        
        if (action.flavorText) {
          newLog.push(createCombatLogEntry(`"${action.flavorText}"`, 'action', 'paladin'));
        }
      } else if (action.type === 'heal') {
        // Heal player
        const healAmount = Math.min(actionValue, newPlayer.stats.maxHp - newPlayer.stats.hp);
        newPlayer.stats.hp += healAmount;
        newLog.push(createCombatLogEntry(
          `${action.name} restores ${healAmount} HP!`,
          'heal',
          'paladin',
          'paladin'
        ));
        
        if (action.flavorText) {
          newLog.push(createCombatLogEntry(`"${action.flavorText}"`, 'action', 'paladin'));
        }
      } else if (action.type === 'buff' && action.effects?.statusEffect) {
        // Apply status effect with unique ID
        const statusEffect: StatusEffect = {
          id: `${action.id}-${Date.now()}-${Math.random()}-${performance.now()}`,
          ...action.effects.statusEffect
        };
        
        if (action.effects.selfTarget) {
          newPlayer.statusEffects.push(statusEffect);
        }
        
        newLog.push(createCombatLogEntry(
          `${action.name} activated! ${statusEffect.description}`,
          'effect',
          'paladin'
        ));
        
        if (action.flavorText) {
          newLog.push(createCombatLogEntry(`"${action.flavorText}"`, 'action', 'paladin'));
        }
      }

      // Check for victory
      const newPhase = newBoss.stats.hp <= 0 ? 'victory' : 'boss-turn';

      return {
        ...prev,
        phase: newPhase,
        currentTurn: newPhase === 'victory' ? 'player' : 'boss',
        player: newPlayer,
        boss: newBoss,
        combatLog: newLog,
        isAnimating: true
      };
    });

    // Reset animation state after a delay
    setTimeout(() => {
      setCombatState(prev => prev ? { ...prev, isAnimating: false } : prev);
    }, 1000);
  }, [combatState]);

  const executeBossAction = useCallback(() => {
    if (!combatState || combatState.phase !== 'boss-turn' || combatState.isAnimating) return;

    setCombatState(prev => {
      if (!prev) return prev;

      const newPlayer = { ...prev.player };
      const newBoss = { ...prev.boss };
      const newLog = [...prev.combatLog];

      // Simple AI: choose random action based on current boss
      const bossData = BOSS_DATA[prev.boss.id];
      const availableActions = bossData?.abilities || [];
      const action = availableActions[Math.floor(Math.random() * availableActions.length)];

      // Calculate damage/healing
      let actionValue = 0;
      if (action.damage) {
        const roll = rollDice(action.damage.dice);
        actionValue = roll + action.damage.modifier;
      }

      if (action.type === 'attack') {
        // Apply damage to player
        let finalDamage = actionValue;
        
        // Check player damage reduction
        const damageReduction = newPlayer.statusEffects.find(e => e.effect.damageReduction);
        if (damageReduction) {
          finalDamage = Math.floor(finalDamage * (1 - damageReduction.effect.damageReduction!));
        }

        newPlayer.stats.hp = Math.max(0, newPlayer.stats.hp - finalDamage);
        newLog.push(createCombatLogEntry(
          `${action.name} hits Paladin for ${finalDamage} damage!`,
          'damage',
          prev.boss.id,
          'paladin'
        ));
      } else if (action.type === 'heal') {
        // Check if regeneration is prevented
        const preventRegen = newBoss.statusEffects.find(e => e.effect.preventRegeneration);
        if (!preventRegen) {
          const healAmount = Math.min(actionValue, newBoss.stats.maxHp - newBoss.stats.hp);
          newBoss.stats.hp += healAmount;
          newLog.push(createCombatLogEntry(
            `${action.name} restores ${healAmount} HP to ${newBoss.name}!`,
            'heal',
            prev.boss.id,
            prev.boss.id
          ));
        } else {
          newLog.push(createCombatLogEntry(
            `${action.name} fails - regeneration blocked by Divine Shield!`,
            'effect',
            prev.boss.id
          ));
        }
      } else if (action.type === 'buff' && action.effects?.statusEffect) {
        // Apply status effect to player (for debuffs like Proxy Mirage)
        const statusEffect: StatusEffect = {
          id: `${action.id}-${Date.now()}-${Math.random()}-${performance.now()}`,
          ...action.effects.statusEffect
        };
        
        if (!action.effects.selfTarget) {
          // Apply to player (debuff)
          newPlayer.statusEffects.push(statusEffect);
          newLog.push(createCombatLogEntry(
            `${action.name} affects the Paladin! ${statusEffect.description}`,
            'effect',
            prev.boss.id,
            'paladin'
          ));
        } else {
          // Apply to boss (self-buff)
          newBoss.statusEffects.push(statusEffect);
          newLog.push(createCombatLogEntry(
            `${action.name} empowers ${prev.boss.name}! ${statusEffect.description}`,
            'effect',
            prev.boss.id
          ));
        }
      }

      if (action.flavorText) {
        newLog.push(createCombatLogEntry(`"${action.flavorText}"`, 'action', prev.boss.id));
      }

      // Reduce status effect durations
      newPlayer.statusEffects = newPlayer.statusEffects
        .map(effect => ({ ...effect, duration: effect.duration - 1 }))
        .filter(effect => effect.duration > 0);
      
      newBoss.statusEffects = newBoss.statusEffects
        .map(effect => ({ ...effect, duration: effect.duration - 1 }))
        .filter(effect => effect.duration > 0);

      // Check for defeat
      const newPhase = newPlayer.stats.hp <= 0 ? 'defeat' : 'player-turn';
      const newRound = newPhase === 'player-turn' ? prev.roundNumber + 1 : prev.roundNumber;

      if (newPhase === 'player-turn') {
        newLog.push(createCombatLogEntry(`--- Round ${newRound} ---`, 'turn'));
      }

      return {
        ...prev,
        phase: newPhase,
        currentTurn: newPhase === 'defeat' ? 'boss' : 'player',
        roundNumber: newRound,
        player: newPlayer,
        boss: newBoss,
        combatLog: newLog,
        isAnimating: true
      };
    });

    // Reset animation state and continue to player turn
    setTimeout(() => {
      setCombatState(prev => prev ? { ...prev, isAnimating: false } : prev);
    }, 2000);
  }, [combatState]);

  const endCombat = useCallback(() => {
    setCombatState(null);
  }, []);

  // Auto-execute boss turn after delay
  useEffect(() => {
    if (combatState?.phase === 'boss-turn' && !combatState.isAnimating) {
      const timer = setTimeout(executeBossAction, 1500);
      return () => clearTimeout(timer);
    }
  }, [combatState?.phase, combatState?.isAnimating, executeBossAction]);

  // Get the appropriate Paladin abilities based on current boss
  const currentAbilities = combatState?.boss?.id 
    ? PALADIN_ABILITY_SETS[combatState.boss.id] || PALADIN_ABILITIES
    : PALADIN_ABILITIES;

  return {
    combatState,
    startCombat,
    rollInitiativePhase,
    executePlayerAction,
    executeBossAction,
    endCombat,
    abilities: currentAbilities
  };
}