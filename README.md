## The Lost Tales of Arygoden
An interactive, cinematic web experience I built to demonstrate Railway's infrastructure features and shows how enterprise infrastructure challenges map to Railway solutions through gamified storytelling. 

#### Built as a portfolio piece for the Railway Product Marketing role.

### What it does
- Interactive boss battles representing real infrastructure pain points
- Each boss maps to a Railway feature (Docker Tiamat → Build & Deploy, Proxy Valheim → Network & Connect, etc.)
- Cinematic story flow: character selection, world exploration, vault finale
- Collect sigils that demonstrate Railway feature benefits in enterprise contexts
- Atmospheric audio and particle effects for immersive experience

### Tech
- Next.js 15 (App Router), TypeScript, TailwindCSS v4
- Framer Motion for animations and transitions
- Zustand for game state management
- Custom audio system with ambient and cinematic cues
- Fantasy/medieval themed UI

### Why I built this
Railway simplifies infrastructure for developers, but those benefits can feel abstract. I wanted to combine my interests: gaming, storytelling, and film, and create a campagin that makes the value proposition tangible - each boss battle shows exactly which enterprise pain point Railway solves and what it replaces (Docker, Kubernetes, Terraform, Datadog, etc.).

The narrative approach demonstrates how I'd think about product marketing: taking complex technical features and making them relatable, memorable, and shareable. Instead of "Railway has container orchestration," it's "defeat Docker Tiamat's multi-container chaos."

### What's real vs demo
- Story progression: fully functional navigation through all game screens
- Boss mechanics: each attack/power metaphor maps to actual Railway features
- Character selection: ties player roles to technical personas (Paladin = engineer, Bard = archivist, Thief = preservationist)
- Animations: production-quality transitions and effects
- Feature mapping: accurately represents Railway's competitive positioning vs. Docker, Kubernetes, Terraform, Datadog

### Boss battles & Railway features
| Boss | Infrastructure Challenge | Railway Feature | Replaces/Competes With |
|------|-------------------------|-----------------|------------------------|
| Docker Tiamat | Multi-container builds, deployment chaos | Build & Deploy | Docker, Helm, Heroku, DigitalOcean, Cloud Run |
| Proxy Valheim | Networking, service discovery, routing | Network & Connect | Envoy, Cilium, NGINX, Istio, HAProxy |
| Shadowcloud | Scaling & high-load management | Scale & Grow | Kubernetes, AWS, Nomad, BetterStack |
| Silent Watcher | Monitoring, logging, observability | Monitor & Observe | Datadog, Sentry, OpenTelemetry |
| Terraform Lich-King | Infrastructure as Code drift & collaboration | Evolve & Collaborate | Terraform, Spacelift |

### Notes
- Design matches Railway's aesthetic (dark theme, neon accents, developer-focused)
- Modular architecture allows swapping bosses/features without breaking game flow
- I can walk through any design decisions, expand boss mechanics, or add new realms

Built by Ashleigh Bayer  
avbayer96@gmail.com | Live Demo Link: railway-deploy-saga-production.up.railway.app

### Running locally
```bash
git clone [repo-url]
npm install
npm run dev

Open http://localhost:3000 to start your quest

