The Lost Tales of Arygoden

An interactive, cinematic web experience built to demonstrate Railway’s infrastructure features in a fun, gamified way. Designed as a portfolio piece for the Railway Product Marketing role, the game shows how common enterprise infrastructure challenges can be simplified with Railway.

Concept

Players journey through mystical realms, each ruled by an “infrastructure demon” representing a real-world enterprise pain point. Every boss encounter directly maps to a Railway feature:

Boss	Infrastructure Challenge	Railway Feature Demo	Replaces/Competes With
Docker Tiamat	Multi-container builds, deployment chaos	Build & Deploy	Docker, Helm, Heroku, DigitalOcean, Cloud Run
Proxy Valheim	Networking, service discovery, routing	Network & Connect	Envoy, Cilium, NGINX, Istio, HAProxy
Shadowcloud	Scaling & high-load management	Scale & Grow	Kubernetes, AWS, Nomad, BetterStack
Silent Watcher	Monitoring, logging, observability	Monitor & Observe	Datadog, Sentry, OpenTelemetry
Terraform Lich-King	Infrastructure as Code drift & collaboration	Evolve & Collaborate	Terraform, Spacelift

Each combat mechanic and boss “attack” is metaphorical for these enterprise challenges, while Railway features act as the player’s “powers” to overcome them.

Technical Implementation

Framework: Next.js 15 (App Router)

Styling: TailwindCSS v4 with fantasy/medieval theme

Animations: Framer Motion for cinematic transitions, hover effects, particle systems

State Management: Zustand for game/combat state

Audio: Integrated ambient and cinematic cues via custom hooks

TypeScript: Full type safety across all components

Developer Notes

Exploration and combat are modular, so bosses or features can be swapped without breaking flow

Game mechanics demonstrate feature benefits in enterprise contexts, not just gameplay

Sigils collected during combat map directly to Railway features, giving a tangible “demo” of the value proposition

Project Flow
HomeScreen → OpeningCrawl → CharacterSelect → WorldMap → QuestScreen → VaultFinale


Opening Crawl sets the narrative of enterprise infrastructure challenges

Character selection aligns users with roles/tools (Paladin = engineer, Bard = archivist, Thief = preservationist)

World map visualizes infrastructure complexity with interactive nodes

Boss encounters tie gameplay mechanics to Railway features

