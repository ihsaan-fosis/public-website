# IHSAAN Public Website

Public website for [IHSAAN](https://ihsaan.network) at **https://ihsaan.network**.

GitHub: [`ihsaan-fosis/public-website`](https://github.com/ihsaan-fosis/public-website) (private)

Local folder on this machine: `ihsaan-public-website` (alongside `member-platform`).

## Tech Stack

- **Framework:** Next.js 16 (App Router) + Turbopack
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript
- **Package manager:** [Bun](https://bun.sh/) (required)
- **Tests:** Vitest + Testing Library
- **Lint:** Oxlint (anti-slop / project rules). ESLint config remains for Next tooling only

## Prerequisites

- [Bun](https://bun.sh/)
- GitHub CLI logged in as **`ihsaan-fosis`** for push / PR / `gh` work

```bash
gh auth switch --user ihsaan-fosis
gh api user --jq .login
```

Production is **Cloudflare Workers** (OpenNext). Deploy with `bun run deploy`. Author commits as `techihsaan <tech.ihsaan@fosis.org.uk>`. See `AGENTS.md`.

## Setup

```bash
cd ihsaan-public-website
bun install
cp .env.example .env.local
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_APP_URL` | Site origin for local/preview. Production builds always canonicalise to `https://ihsaan.network` |

## Scripts

| Command | What it does |
|---------|----------------|
| `bun run dev` | Dev server (Turbopack) on port 3000 |
| `bun run build` | Production build |
| `bun run start` | Serve production build |
| `bun run test` | Vitest watch |
| `bun run test:run` | Vitest once |
| `bun run lint` | Oxlint |

## Project structure

```
ihsaan-public-website/
├── AGENTS.md
├── docs/
│   ├── CODEBASE_MAP.md       # Module map (start here for navigation)
│   ├── context.md            # Product context
│   └── IHSAAN-DESIGN.md      # Visual system
├── src/
│   ├── app/                  # Routes, layout, globals, SEO
│   ├── components/           # UI, sections, chrome, motion
│   ├── content/              # Site + programme copy, legacy routes
│   ├── lib/                  # Origin, metadata helpers, cn
│   └── test/setup.ts
├── public/media|partners|icons
├── next.config.mjs           # Redirects, CSP, image patterns
├── package.json
└── bun.lock
```

## Related repos

| Repo | Role |
|------|------|
| `ihsaan-fosis/public-website` | This public site (`ihsaan.network`) |
| `ihsaan-fosis/member-platform` | Private member portal (`portal.ihsaan.network`) |

## Docs

- [Product context](docs/context.md)
- [Codebase map](docs/CODEBASE_MAP.md)
- [IHSAAN design system](docs/IHSAAN-DESIGN.md)
- [Agent instructions](AGENTS.md)
