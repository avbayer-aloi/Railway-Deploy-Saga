'use client';

import { CombatAction } from '@/types/combat';
import { useState, useEffect } from 'react';

interface AbilityButtonProps {
  ability: CombatAction;
  onClick: () => void;
  disabled?: boolean;
}

export default function AbilityButton({ ability, onClick, disabled = false }: AbilityButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const getAbilityIcon = (abilityId: string) => {
    switch (abilityId) {
      case 'judgment-strike': return '⚔️';
      case 'divine-shield': return '🛡️';
      case 'repair-touch': return '🔧';
      case 'aura-integrity': return '✨';
      case 'firewall-faith': return '🛡️';
      case 'restore-link': return '🔧';
      case 'aura-signal': return '✨';
      case 'smite-scale': return '⚔️';
      case 'divine-downtime': return '🛡️';
      case 'optimize-process': return '🔧';
      case 'aura-clarity': return '✨';
      case 'insight-strike': return '⚔️';
      case 'warding-vision': return '🛡️';
      case 'restore-visibility': return '🔧';
      case 'aura-revelation': return '✨';
      case 'smite-unity': return '⚔️';
      case 'rollback-barrier': return '🛡️';
      case 'restore-harmony': return '🔧';
      case 'aura-sync': return '✨';
      default: return '⚡';
    }
  };

  const getAbilityColor = (abilityId: string) => {
    // Color mapping based on original ability intent, regardless of current type
    switch (abilityId) {
      // Attack abilities - red
      case 'judgment-strike':
      case 'smite-scale':
      case 'insight-strike':
      case 'smite-unity':
        return 'from-red-600 to-red-700 border-red-400 hover:from-red-500 hover:to-red-600';
      
      // Healing abilities - green
      case 'repair-touch':
      case 'restore-link':
      case 'optimize-process':
      case 'restore-visibility':
      case 'restore-harmony':
        return 'from-green-600 to-green-700 border-green-400 hover:from-green-500 hover:to-green-600';
      
      // Buff/protection abilities - blue
      case 'divine-shield':
      case 'aura-integrity':
      case 'firewall-faith':
      case 'divine-downtime':
      case 'warding-vision':
      case 'rollback-barrier':
        return 'from-blue-600 to-blue-700 border-blue-400 hover:from-blue-500 hover:to-blue-600';
      
      // Aura/enhancement abilities - purple
      case 'aura-signal':
      case 'aura-clarity':
      case 'aura-revelation':
      case 'aura-sync':
        return 'from-purple-600 to-purple-700 border-purple-400 hover:from-purple-500 hover:to-purple-600';
      
      // Default to red for any unmatched abilities
      default: 
        return 'from-red-600 to-red-700 border-red-400 hover:from-red-500 hover:to-red-600';
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => {
        if (!disabled) {
          // Clear any existing timeout
          if (hoverTimeout) {
            clearTimeout(hoverTimeout);
          }
          // Show tooltip immediately on hover
          setShowTooltip(true);
        }
      }}
      onMouseLeave={() => {
        // Clear timeout and hide tooltip immediately
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
          setHoverTimeout(null);
        }
        setShowTooltip(false);
      }}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-[100] pointer-events-none w-64">
          <div className="text-amber-100 font-bold text-sm mb-2 text-center" style={{textShadow: '2px 2px 4px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.8)'}}>
            {ability.name}
          </div>
          <div className="text-amber-200 text-sm leading-relaxed text-center mb-2" style={{textShadow: '1px 1px 3px rgba(0,0,0,1), 0 0 6px rgba(0,0,0,0.8)'}}>
            {ability.description}
          </div>
          {ability.damage && (
            <div className="text-blue-200 text-sm text-center mb-2" style={{textShadow: '1px 1px 3px rgba(0,0,0,1), 0 0 6px rgba(0,0,0,0.8)'}}>
              {ability.damage.dice} + {ability.damage.modifier} {ability.damage.type}
            </div>
          )}
          <div className="text-amber-300 text-sm italic text-center" style={{textShadow: '1px 1px 3px rgba(0,0,0,1), 0 0 6px rgba(0,0,0,0.8)'}}>
            {`"${ability.flavorText}"`}
          </div>
        </div>
      )}

      {/* Ability Button */}
      <button
        className={`px-6 py-4 rounded-lg font-bold text-white border-2 min-w-40 ${
          disabled 
            ? 'bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed opacity-60' 
            : `bg-gradient-to-br ${getAbilityColor(ability.id)} cursor-pointer hover:opacity-80`
        }`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {/* Ability Icon */}
        <div className="text-2xl mb-2">
          {getAbilityIcon(ability.id)}
        </div>
        
        {/* Ability Name */}
        <div className="font-medieval text-sm">
          {ability.name}
        </div>
      </button>
    </div>
  );
}