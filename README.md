# IHSAAN Public Website

Public website for [IHSAAN](https://ihsaan.network) at **https://ihsaan.network**.

GitHub: [`ihsaan-fosis/public-website`](https://github.com/ihsaan-fosis/public-website) (private)

Local folder on this machine: `public-website-ihsaan` (alongside `member-platform`).

## Tech Stack

- **Framework:** Next.js 16 (App Router) + Turbopack
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript
- **Package manager:** [Bun](https://bun.sh/) (required)
- **Tests:** Vitest + Testing Library
- **Lint:** ESLint (Next.js config)

## Prerequisites

- [Bun](https://bun.sh/)
- GitHub CLI logged in as **`ihsaan-fosis`** for push / PR / `gh` work

```bash
gh auth switch --user ihsaan-fosis
gh api user --jq .login
```

## Setup

```bash
cd public-website-ihsaan
bun install
cp .env.example .env.local
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_APP_URL` | Site origin. Production: `https://ihsaan.network`. Local: `http://localhost:3000` |

## Scripts

| Command | What it does |
|---------|----------------|
| `bun run dev` | Dev server (Turbopack) on port 3000 |
| `bun run build` | Production build |
| `bun run start` | Serve production build |
| `bun run test` | Vitest watch |
| `bun run test:run` | Vitest once |
| `bun run lint` | ESLint |

## Project structure

```
public-website-ihsaan/
├── AGENTS.md                 # Agent rules + gh profile
├── docs/
│   ├── CODEBASE_MAP.md       # Module map
│   ├── context.md            # Product context
│   └── PROMPT.txt            # Optional agent seed prompt
├── src/
│   ├── app/                  # layout, page, globals
│   ├── components/           # UI (Hero)
│   ├── lib/env.ts            # Env validation
│   └── test/setup.ts
├── next.config.mjs
├── package.json
└── bun.lock
```

## Related repos

| Repo | Role |
|------|------|
| `ihsaan-fosis/public-website` | This public site (`ihsaan.network`) |
| `ihsaan-fosis/member-platform` | Private member portal |

## Docs

- [Product context](docs/context.md)
- [Codebase map](docs/CODEBASE_MAP.md)
- [IHSAAN design system](docs/IHSAAN-DESIGN.md)
- [Agent instructions](AGENTS.md)
