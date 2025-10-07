export interface CombatStats {
  hp: number;
  maxHp: number;
  defense: number;
  initiative: number;
}

export interface StatusEffect {
  id: string;
  name: string;
  description: string;
  duration: number;
  effect: {
    damageReduction?: number;
    defenseBonus?: number;
    preventRegeneration?: boolean;
    preventDrift?: boolean;
    accuracyReduction?: number;
    accuracyBonus?: number;
    reflection?: number;
    immuneToMirage?: boolean;
    immuneToEclipse?: boolean;
    immuneToBlind?: boolean;
    immuneToRollback?: boolean;
    immuneToDrift?: boolean;
    immuneToMerge?: boolean;
    cancelsFog?: boolean;
  };
}

export interface Combatant {
  id: string;
  name: string;
  stats: CombatStats;
  statusEffects: StatusEffect[];
  isPlayer: boolean;
}

export interface CombatAction {
  id: string;
  name: string;
  description: string;
  flavorText: string;
  type: 'attack' | 'heal' | 'buff' | 'special';
  damage?: {
    dice: string; // e.g., "1d10"
    modifier: number;
    type: 'physical' | 'radiant' | 'healing';
  };
  effects?: {
    statusEffect?: Omit<StatusEffect, 'id'>;
    selfTarget?: boolean;
    healing?: {
      dice: string;
      modifier: number;
      type: 'healing';
    };
  };
  cooldown?: number;
}

export interface CombatLogEntry {
  id: string;
  timestamp: number;
  message: string;
  type: 'initiative' | 'action' | 'damage' | 'heal' | 'effect' | 'turn';
  actor?: string;
  target?: string;
}

export type CombatPhase = 
  | 'initiative' 
  | 'player-turn' 
  | 'boss-turn' 
  | 'victory' 
  | 'defeat';

export interface CombatState {
  phase: CombatPhase;
  currentTurn: 'player' | 'boss';
  roundNumber: number;
  player: Combatant;
  boss: Combatant;
  combatLog: CombatLogEntry[];
  isAnimating: boolean;
}

// Base Paladin abilities (for Docker Tiamat)
const PALADIN_DOCKER_ABILITIES: CombatAction[] = [
  {
    id: 'judgment-strike',
    name: 'Judgment Strike',
    description: 'Attack a specific container head. Deals radiant damage.',
    flavorText: 'Chaos, be smitten by my resolve!',
    type: 'attack',
    damage: {
      dice: '1d10',
      modifier: 15,
      type: 'radiant'
    }
  },
  {
    id: 'divine-shield',
    name: 'Divine Shield',
    description: 'Radiant protection reduces damage and blocks regeneration.',
    flavorText: 'By the oath, I defend the integrity of our code.',
    type: 'buff',
    effects: {
      statusEffect: {
        name: 'Divine Shield',
        description: 'Damage reduced by 50%, prevents regeneration',
        duration: 1,
        effect: {
          damageReduction: 0.5,
          preventRegeneration: true
        }
      },
      selfTarget: true
    }
  },
  {
    id: 'repair-touch',
    name: 'Repair Touch',
    description: 'Heal yourself or stabilize a subsystem.',
    flavorText: 'Let this heal broken pipelines.',
    type: 'heal',
    damage: {
      dice: '1d10',
      modifier: 10,
      type: 'healing'
    },
    effects: {
      selfTarget: true
    }
  },
  {
    id: 'aura-integrity',
    name: 'Aura of Integrity',
    description: 'Stabilize environment and increase defense.',
    flavorText: 'Order through faith in the stack.',
    type: 'buff',
    effects: {
      statusEffect: {
        name: 'Aura of Integrity',
        description: 'Defense +10, prevents configuration drift',
        duration: 2,
        effect: {
          defenseBonus: 10,
          preventDrift: true
        }
      },
      selfTarget: true
    }
  }
];

// Paladin abilities vs Proxy Valheim
const PALADIN_PROXY_ABILITIES: CombatAction[] = [
  {
    id: 'smite-connection',
    name: 'Smite of Connection',
    description: 'Deals radiant damage and removes tangled routes or Proxy Mirage.',
    flavorText: 'I pierce your tangled web!',
    type: 'attack',
    damage: {
      dice: '1d7',
      modifier: 15,
      type: 'radiant'
    }
  },
  {
    id: 'firewall-faith',
    name: 'Firewall of Faith',
    description: 'Deals damage and erects a protective barrier over failing services.',
    flavorText: 'A barrier to sever false routes.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 8,
      type: 'radiant'
    },
    effects: {
      statusEffect: {
        name: 'Firewall of Faith',
        description: '40% damage reduction, reflects 20% of next hit',
        duration: 1,
        effect: {
          damageReduction: 0.4,
          reflection: 0.2
        }
      },
      selfTarget: true
    }
  },
  {
    id: 'restore-link',
    name: 'Restore Link',
    description: 'Deals damage and repairs broken network connections.',
    flavorText: 'The bridge shall be rebuilt.',
    type: 'attack',
    damage: {
      dice: '1d5',
      modifier: 10,
      type: 'radiant'
    },
    effects: {
      selfTarget: true,
      healing: {
        dice: '1d4',
        modifier: 8,
        type: 'healing'
      }
    }
  },
  {
    id: 'aura-signal',
    name: 'Aura of Signal',
    description: 'Deals damage and clears network interference, boosting all connection accuracy.',
    flavorText: 'Let all routes be made clear.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 6,
      type: 'radiant'
    },
    effects: {
      statusEffect: {
        name: 'Aura of Signal',
        description: '+10 accuracy, immunity to Proxy Mirage',
        duration: 2,
        effect: {
          accuracyBonus: 10,
          immuneToMirage: true
        }
      },
      selfTarget: true
    }
  }
];

// Paladin abilities vs Shadowcloud
const PALADIN_SHADOWCLOUD_ABILITIES: CombatAction[] = [
  {
    id: 'smite-scale',
    name: 'Smite of Scale',
    description: 'Deals heavy damage. Gains bonus damage if the boss has scaled this turn.',
    flavorText: 'Your hunger ends here, Shadowcloud!',
    type: 'attack',
    damage: {
      dice: '1d8',
      modifier: 20,
      type: 'radiant'
    }
  },
  {
    id: 'divine-downtime',
    name: 'Divine Downtime',
    description: 'Deals damage and reduces the boss\'s next two attacks by 40%.',
    flavorText: 'The storm yields to peace.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 8,
      type: 'radiant'
    },
    effects: {
      statusEffect: {
        name: 'Divine Downtime',
        description: 'Reduces next 2 attacks by 40%',
        duration: 2,
        effect: {
          damageReduction: 0.4
        }
      },
      selfTarget: true
    }
  },
  {
    id: 'optimize-process',
    name: 'Optimize Process',
    description: 'Deals damage and stabilizes your environment, restoring system integrity.',
    flavorText: 'Streamline and stabilize.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 6,
      type: 'radiant'
    },
    effects: {
      selfTarget: true,
      healing: {
        dice: '1d5',
        modifier: 15,
        type: 'healing'
      }
    }
  },
  {
    id: 'aura-clarity',
    name: 'Aura of Clarity',
    description: 'Deals minor damage and negates cloud scaling chaos effects.',
    flavorText: 'Through the tempest, light endures.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 5,
      type: 'radiant'
    },
    effects: {
      statusEffect: {
        name: 'Aura of Clarity',
        description: 'Negates Data Eclipse effects',
        duration: 2,
        effect: {
          immuneToEclipse: true
        }
      },
      selfTarget: true
    }
  }
];

// Paladin abilities vs Silent Watcher
const PALADIN_WATCHER_ABILITIES: CombatAction[] = [
  {
    id: 'insight-strike',
    name: 'Insight Strike',
    description: 'Deals damage that ignores hidden failures or Fog of Logs.',
    flavorText: 'I see you now, Watcher.',
    type: 'attack',
    damage: {
      dice: '1d7',
      modifier: 18,
      type: 'radiant'
    }
  },
  {
    id: 'warding-vision',
    name: 'Warding Vision',
    description: 'Deals 7-11 damage and prevents blindness for 2 turns with 30% reflect chance.',
    flavorText: 'My eyes are unclouded.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 7,
      type: 'radiant'
    },
    effects: {
      statusEffect: {
        name: 'Warding Vision',
        description: 'Prevents blindness, 30% reflect chance',
        duration: 2,
        effect: {
          immuneToBlind: true,
          reflection: 0.3
        }
      },
      selfTarget: true
    }
  },
  {
    id: 'restore-visibility',
    name: 'Restore Visibility',
    description: 'Deals damage and restores observability, healing lost subsystems.',
    flavorText: 'Recompile clarity.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 8,
      type: 'radiant'
    },
    effects: {
      selfTarget: true,
      healing: {
        dice: '1d10',
        modifier: 10,
        type: 'healing'
      }
    }
  },
  {
    id: 'aura-revelation',
    name: 'Aura of Revelation',
    description: 'Deals damage and grants +15 accuracy for 2 turns.',
    flavorText: 'All errors shall come to light.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 6,
      type: 'radiant'
    },
    effects: {
      statusEffect: {
        name: 'Aura of Revelation',
        description: '+15 accuracy, cancels Fog of Logs',
        duration: 2,
        effect: {
          accuracyBonus: 15,
          cancelsFog: true
        }
      },
      selfTarget: true
    }
  }
];

// Paladin abilities vs Terraform Lich
const PALADIN_LICH_ABILITIES: CombatAction[] = [
  {
    id: 'smite-unity',
    name: 'Smite of Unity',
    description: 'Deals damage and prevents version drift this turn.',
    flavorText: 'Your fractured realms shall be made whole.',
    type: 'attack',
    damage: {
      dice: '1d10',
      modifier: 20,
      type: 'radiant'
    }
  },
  {
    id: 'rollback-barrier',
    name: 'Rollback Barrier',
    description: 'Deals damage and negates next rollback or merge conflict with 50% reduction.',
    flavorText: 'The past shall not claim this code.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 9,
      type: 'radiant'
    },
    effects: {
      statusEffect: {
        name: 'Rollback Barrier',
        description: 'Negates Rollback Curse, 50% damage reduction',
        duration: 1,
        effect: {
          damageReduction: 0.5,
          immuneToRollback: true
        }
      },
      selfTarget: true
    }
  },
  {
    id: 'restore-harmony',
    name: 'Restore Harmony',
    description: 'Deals damage and heals system integrity.',
    flavorText: 'The stack realigns in balance.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 7,
      type: 'radiant'
    },
    effects: {
      selfTarget: true,
      healing: {
        dice: '1d7',
        modifier: 15,
        type: 'healing'
      }
    }
  },
  {
    id: 'aura-sync',
    name: 'Aura of Sync',
    description: 'Deals damage and grants +10 defense, immune to drift/merge effects.',
    flavorText: 'We are one environment.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 5,
      type: 'radiant'
    },
    effects: {
      statusEffect: {
        name: 'Aura of Sync',
        description: '+10 defense, immunity to Version Drift and Merge Cataclysm',
        duration: 2,
        effect: {
          defenseBonus: 10,
          immuneToDrift: true,
          immuneToMerge: true
        }
      },
      selfTarget: true
    }
  }
];

// Dynamic ability sets based on boss
export const PALADIN_ABILITY_SETS: Record<string, CombatAction[]> = {
  'docker-tiamat': PALADIN_DOCKER_ABILITIES,
  'proxy-valheim': PALADIN_PROXY_ABILITIES,
  'shadowcloud': PALADIN_SHADOWCLOUD_ABILITIES,
  'silent-watcher': PALADIN_WATCHER_ABILITIES,
  'terraform-lich': PALADIN_LICH_ABILITIES
};

// Legacy export (defaults to Docker Tiamat abilities)
export const PALADIN_ABILITIES = PALADIN_DOCKER_ABILITIES;

// Boss data interface
export interface BossData {
  id: string;
  name: string;
  hp: number;
  abilities: CombatAction[];
  sigilReward: string;
  victoryText: string;
}

// Boss abilities for Docker Tiamat
const DOCKER_TIAMAT_ABILITIES: CombatAction[] = [
  {
    id: 'yaml-breath',
    name: 'YAML Breath',
    description: 'Config files ignite in chaotic blaze.',
    flavorText: 'Config files ignite in a chaotic blaze!',
    type: 'attack',
    damage: {
      dice: '1d6',
      modifier: 12,
      type: 'physical'
    }
  },
  {
    id: 'regrow-head',
    name: 'Regrow Head',
    description: 'Another head emerges, spitting new errors.',
    flavorText: 'Another head emerges, spitting new errors!',
    type: 'heal',
    damage: {
      dice: '1d1',
      modifier: 10,
      type: 'healing'
    },
    effects: {
      selfTarget: true
    }
  },
  {
    id: 'dependency-storm',
    name: 'Dependency Storm',
    description: 'Devastating attack if player healed recently.',
    flavorText: 'Dependencies cascade in fury!',
    type: 'attack',
    damage: {
      dice: '1d1',
      modifier: 20,
      type: 'physical'
    }
  }
];

// Boss abilities for Proxy Valheim
const PROXY_VALHEIM_ABILITIES: CombatAction[] = [
  {
    id: 'snare-404',
    name: '404 Snare',
    description: 'Deals 10-16 damage.',
    flavorText: 'Invisible webs trap your requests.',
    type: 'attack',
    damage: {
      dice: '1d6',
      modifier: 10,
      type: 'physical'
    }
  },
  {
    id: 'port-storm',
    name: 'Port Storm',
    description: 'Deals 14-20 damage.',
    flavorText: 'Ports scatter like shattered runes!',
    type: 'attack',
    damage: {
      dice: '1d6',
      modifier: 14,
      type: 'physical'
    }
  },
  {
    id: 'proxy-mirage',
    name: 'Proxy Mirage',
    description: 'Reduces player accuracy by 20% next turn.',
    flavorText: 'Reality bends through broken proxies.',
    type: 'buff',
    effects: {
      statusEffect: {
        name: 'Proxy Mirage',
        description: 'Accuracy reduced by 20%',
        duration: 1,
        effect: {
          accuracyReduction: 0.2
        }
      },
      selfTarget: false
    }
  }
];

// Boss abilities for Shadowcloud
const SHADOWCLOUD_ABILITIES: CombatAction[] = [
  {
    id: 'cost-storm',
    name: 'Cost Storm',
    description: 'Cloud costs spiral out of control.',
    flavorText: 'Cloud costs spiral out of control!',
    type: 'attack',
    damage: {
      dice: '1d8',
      modifier: 14,
      type: 'physical'
    }
  },
  {
    id: 'scale-hunger',
    name: 'Scale Hunger',
    description: 'Feeds on ambition to grow stronger.',
    flavorText: 'It feeds on your ambition.',
    type: 'attack',
    damage: {
      dice: '1d6',
      modifier: 8,
      type: 'physical'
    }
  },
  {
    id: 'data-eclipse',
    name: 'Data Eclipse',
    description: 'Massive attack that dims the screen.',
    flavorText: 'Darkness consumes all data streams.',
    type: 'attack',
    damage: {
      dice: '1d6',
      modifier: 18,
      type: 'physical'
    }
  }
];

// Boss abilities for Silent Watcher
const SILENT_WATCHER_ABILITIES: CombatAction[] = [
  {
    id: 'crash-pulse',
    name: 'Crash Pulse',
    description: 'Silent failure that strikes without warning.',
    flavorText: 'The screen flickers — something failed silently.',
    type: 'attack',
    damage: {
      dice: '1d6',
      modifier: 12,
      type: 'physical'
    }
  },
  {
    id: 'fog-of-logs',
    name: 'Fog of Logs',
    description: 'Obscures vision and reduces accuracy.',
    flavorText: 'Logs vanish into impenetrable fog.',
    type: 'attack',
    damage: {
      dice: '1d4',
      modifier: 8,
      type: 'physical'
    }
  },
  {
    id: 'memory-leak',
    name: 'Memory Leak',
    description: 'Continuous damage over time.',
    flavorText: 'Resources drain away slowly but surely.',
    type: 'attack',
    damage: {
      dice: '1d6',
      modifier: 10,
      type: 'physical'
    }
  }
];

// Boss abilities for Terraform Lich
const TERRAFORM_LICH_ABILITIES: CombatAction[] = [
  {
    id: 'version-drift',
    name: 'Version Drift',
    description: 'Chaos that alters active effects.',
    flavorText: 'Versions scatter across infinite branches.',
    type: 'attack',
    damage: {
      dice: '1d6',
      modifier: 12,
      type: 'physical'
    }
  },
  {
    id: 'merge-cataclysm',
    name: 'Merge Cataclysm',
    description: 'Devastating collision of branches.',
    flavorText: 'Branches collide in chaos!',
    type: 'attack',
    damage: {
      dice: '1d7',
      modifier: 18,
      type: 'physical'
    }
  },
  {
    id: 'rollback-curse',
    name: 'Rollback Curse',
    description: 'Undoes recent player actions.',
    flavorText: 'Time rewinds, unmaking your progress.',
    type: 'attack',
    damage: {
      dice: '1d6',
      modifier: 10,
      type: 'physical'
    }
  }
];

// All boss definitions
export const BOSS_DATA: Record<string, BossData> = {
  'docker-tiamat': {
    id: 'docker-tiamat',
    name: 'Docker Tiamat',
    hp: 45,
    abilities: DOCKER_TIAMAT_ABILITIES,
    sigilReward: 'Sigil of Build',
    victoryText: 'The final head collapses. The Sigil of Build glows in your hands.'
  },
  'proxy-valheim': {
    id: 'proxy-valheim',
    name: 'Proxy Valheim',
    hp: 40,
    abilities: PROXY_VALHEIM_ABILITIES,
    sigilReward: 'Sigil of Connection',
    victoryText: "Valheim's webs unravel, and the Sigil of Connection hums to life."
  },
  'shadowcloud': {
    id: 'shadowcloud',
    name: 'The Shadowcloud',
    hp: 50,
    abilities: SHADOWCLOUD_ABILITIES,
    sigilReward: 'Sigil of Growth',
    victoryText: 'The storm clears. You hold the Sigil of Growth — mastery of scale.'
  },
  'silent-watcher': {
    id: 'silent-watcher',
    name: 'The Silent Watcher',
    hp: 45,
    abilities: SILENT_WATCHER_ABILITIES,
    sigilReward: 'Sigil of Sight',
    victoryText: 'The fog lifts. Every log now gleams in clarity — you gain the Sigil of Sight.'
  },
  'terraform-lich': {
    id: 'terraform-lich',
    name: 'The Terraform Lich-King',
    hp: 55,
    abilities: TERRAFORM_LICH_ABILITIES,
    sigilReward: 'Sigil of Harmony',
    victoryText: 'The chaos quiets. The Sigil of Harmony restores balance to the world.'
  }
};

// Legacy export for backwards compatibility
export { DOCKER_TIAMAT_ABILITIES };