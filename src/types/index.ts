export type CharacterClass = 'paladin' | 'bard' | 'thief';

export type BossRealm = 
  | 'docker-tiamat'
  | 'proxy-valheim' 
  | 'shadowcloud'
  | 'silent-watcher'
  | 'terraform-lich';

export interface Character {
  id: CharacterClass;
  name: string;
  title: string;
  emoji: string;
  description: string;
}

export interface Realm {
  id: BossRealm;
  name: string;
  description: string;
  position: { x: number; y: number };
  completed?: boolean;
  emoji: string;
  color: string;
  encounterText: string;
  powerUpTitle: string;
  powerUpDescription: string;
  powerUpIcon: string;
}

export type GameScreen = 
  | 'home'
  | 'opening-crawl'
  | 'character-select'
  | 'vault-field'
  | 'quest'
  | 'combat'
  | 'finale';