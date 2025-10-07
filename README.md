# The Lost Tales of Arygoden

A cinematic, interactive web experience inspired by Baldur's Gate and D&D that tells a story metaphorically explaining how Railway simplifies infrastructure.

## 🎭 The Story

Journey through mystical realms as you battle ancient infrastructure demons that have cursed the land with complexity and chaos. Choose your adventurer class and embark on a quest to unite the fragments and reach the Ultimate Vault, where infrastructure becomes effortless.

## 🎮 Game Features

### Characters
- **🛡️ Paladin (Engineer)** - Masters of infrastructure, wielding the power of deployment
- **🎻 Bard (Archivist)** - Keepers of knowledge, chroniclers of system architecture  
- **🗡️ Thief (Preservationist)** - Guardians of legacy systems, masters of careful migration

### Realms to Conquer
- **Docker Tiamat** - The Hydra of Builds
- **Proxy Valheim** - The Gateway Guardian
- **Shadowcloud** - The Shifting Mists
- **Silent Watcher** - The Monitoring Phantom
- **Terraform Lich-King** - The Configuration Curse

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS v4 with custom medieval theme
- **Animations**: Framer Motion for cinematic transitions
- **State Management**: Zustand for game state
- **Typography**: Cinzel (medieval) and Crimson Text (story) fonts
- **TypeScript**: Full type safety throughout

## 🎨 Visual Design

- **Mystical but polished** aesthetic with cinematic transitions
- **Smooth performance** with optimized animations and lightweight assets
- **Interactive elements** with hover effects, glowing sigils, and particle systems
- **Responsive design** that works across all device sizes

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to begin your adventure.

## 🧭 Game Flow

```
HomeScreen → CharacterSelect → WorldMap → QuestScreen → VaultFinale
     ↑                                       ↓
     └────────────── Return Loop ←───────────┘
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Home/          # Landing screen with revolving dice
│   ├── Character/     # Character selection with class cards
│   ├── Map/           # Interactive world map with realm sigils
│   ├── Quest/         # Boss encounter screens (placeholder)
│   ├── Finale/        # Vault finale with Railway message
│   └── UI/            # Shared components (Button, Dice, Tooltip)
├── hooks/             # Game state management
├── lib/               # Game data and utilities
├── types/             # TypeScript type definitions
└── app/               # Next.js app router files
```

## 🎭 Current Status

✅ **Completed**
- Full cinematic home screen with revolving dice animation
- Character selection with three unique classes
- Interactive world map with clickable realm sigils
- Placeholder quest screen for boss encounters
- Epic vault finale sequence with story text
- Smooth page transitions and navigation
- Responsive design and animations

🚧 **Next Steps** (for future development)
- Boss encounter mechanics with dice rolling
- Dialogue systems and story branching
- Quest completion animations
- Background audio and sound effects
- Achievement system
- Save/load game state

## 🎨 Custom Animations

The game features custom CSS animations and Framer Motion sequences:
- **Floating particles** and ambient background effects
- **Revolving dice** with color-shifting gradients
- **Character card hovers** with glow and tilt effects
- **Map sigil pulsing** and completion animations
- **Vault finale** with golden light and energy waves

## 🌟 Easter Eggs

Look for subtle Railway-themed elements throughout the adventure:
- Cosmic grid patterns reminiscent of railway infrastructure
- Color schemes that echo Railway's brand
- Metaphorical story beats that parallel infrastructure challenges

---

*"When the fragments united, creation became effortless. The real magic wasn't the quest — it was working on a platform that never fought us."*

**Railway: the infrastructure that lets creativity survive.**