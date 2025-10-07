import { Character, Realm } from '@/types';

export const characters: Character[] = [
  {
    id: 'paladin',
    name: 'Paladin',
    title: 'Engineer',
    emoji: '🛡️',
    description: 'Masters of infrastructure, wielding the power of deployment'
  },
  {
    id: 'bard',
    name: 'Bard',
    title: 'Archivist', 
    emoji: '🎻',
    description: 'Keepers of knowledge, chroniclers of system architecture'
  },
  {
    id: 'thief',
    name: 'Thief',
    title: 'Preservationist',
    emoji: '🗡️',
    description: 'Guardians of legacy systems, masters of careful migration'
  }
];

export const realms: Realm[] = [
  {
    id: 'docker-tiamat',
    name: 'Docker Tiamat',
    description: 'The Multiheaded Dragon of Builds',
    position: { x: 20, y: 30 },
    emoji: '🐉',
    color: '#ef4444', // red
    encounterText: 'The Arygoden team tries to package their AI restoration pipeline, but every head (Python, Node, Postgres, GPU containers) spews new build errors.',
    powerUpTitle: 'The Sigil of Build',
    powerUpDescription: 'Automated deployments and unified environments. Push code, and Railway handles the rest.',
    powerUpIcon: '⚡'
  },
  {
    id: 'proxy-valheim',
    name: 'Proxy Valheim', 
    description: 'The Keeper of Broken Bridges',
    position: { x: 70, y: 20 },
    emoji: '🕸️',
    color: '#8b5cf6', // purple
    encounterText: 'The team\'s internal APIs and model servers can\'t talk to each other. Valheim weaves an invisible web of tangled routes and 404 traps.',
    powerUpTitle: 'The Sigil of Connection',
    powerUpDescription: 'Automatic service discovery and routing. Apps communicate instantly across environments.',
    powerUpIcon: '🌉'
  },
  {
    id: 'shadowcloud',
    name: 'The Shadowcloud',
    description: 'The Devourer of Scale',
    position: { x: 50, y: 60 },
    emoji: '🌩️',
    color: '#06b6d4', // cyan
    encounterText: 'When Arygoden tries to restore 50 films at once, the sky darkens. Shadowcloud strikes with cost storms and scaling errors — every time they grow, it grows hungrier.',
    powerUpTitle: 'The Sigil of Growth',
    powerUpDescription: 'Effortless autoscaling, transparent pricing, no infrastructure code.',
    powerUpIcon: '🌪️'
  },
  {
    id: 'silent-watcher',
    name: 'The Silent Watcher',
    description: 'The Eye of Unseen Failures',
    position: { x: 80, y: 70 },
    emoji: '👁️',
    color: '#f59e0b', // amber
    encounterText: 'Crashes strike without warning. The team prays for visibility, but the Watcher only laughs — data vanishes into the fog.',
    powerUpTitle: 'The Sigil of Sight',
    powerUpDescription: 'Unified logs, metrics, and error monitoring. Every service visible in real time.',
    powerUpIcon: '🔮'
  },
  {
    id: 'terraform-lich',
    name: 'The Terraform Lich-King',
    description: 'Lord of the Forked Worlds',
    position: { x: 30, y: 80 },
    emoji: '☠️',
    color: '#10b981', // green
    encounterText: 'Arygoden\'s environments fall out of sync. The Lich-King feeds on chaos, resurrecting every mistake.',
    powerUpTitle: 'The Sigil of Harmony',
    powerUpDescription: 'Shared environments, instant rollbacks, automatic sync.',
    powerUpIcon: '🛡️'
  }
];