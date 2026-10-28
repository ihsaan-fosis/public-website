# IHSAAN Public Website

Public website for [IHSAAN](https://ihsaan.network) at **https://ihsaan.network**.

Repository: [`ihsaan-fosis/public-website`](https://github.com/ihsaan-fosis/public-website).
The member portal is a separate application.

## Contribute

Read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for the branch workflow, PR guidelines,
verification requirements, and review process. Use your own GitHub account and
commit identity. Submit a pull request to `main`; do not push directly to `main`
or deploy. The maintainer-only account, author, and deployment rules in
[AGENTS.md](AGENTS.md) do not apply to contributors.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + Turbopack
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript
- **Package manager:** [Bun](https://bun.sh/) (required)
- **Tests:** Vitest + Testing Library, with HTTP integration checks
- **Lint:** Oxlint (anti-slop / project rules). ESLint config remains for Next tooling only

## Prerequisites

- [Bun](https://bun.sh/)
- Git and repository access through your own GitHub account
- GitHub CLI, if you prefer it to the GitHub website for PRs

The package manager version is recorded in `package.json`.

## Setup

```bash
bun install
cp .env.example .env.local
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).
Run these commands from the repository root after you clone the repository.
No member-platform credentials, database, or production secrets are required.

### Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_APP_URL` | Local site origin. Production builds always use `https://ihsaan.network` for canonical metadata. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional public widget key. The app uses its production public site key when unset. Use the public test key for localhost. |
| `TURNSTILE_SECRET_KEY` | Server-only Turnstile secret. Required for contact submissions. |
| `RESEND_API_KEY` | Server-only Resend sending key. Required for contact submissions. A valid key sends real email to the IHSAAN contact inbox. |
| `VERCEL_ENV` | Optional legacy indexing guard. Values other than `production` disable indexing. Unset defaults to production indexing. |

The site runs without provider credentials. Contact submissions return 503 if
either server-only contact variable is missing. Never commit local environment
files or production credentials. The public site has no Clerk or Convex runtime.

To show the Turnstile widget on localhost, put Cloudflare's public test pair in
`.env.development.local`:

```dotenv
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

Do not define `TURNSTILE_SECRET_KEY` in `.env.local` when you use this pair,
because `.env.local` takes precedence. Restart the development server after
environment changes. Test keys bypass the challenge only; they do not mock email
delivery. Keep `RESEND_API_KEY` empty unless you have approval to send test mail.

Never put test challenge keys in `.env.local` or a production build environment.
Production hostname validation rejects test tokens, and public widget keys are
embedded at build time. See [.env.example](.env.example) for the complete local
template. Next.js manages `NODE_ENV`; do not set it manually.

## Scripts

| Command | What it does |
|---------|----------------|
| `bun run dev` | Dev server (Turbopack) on port 3000 |
| `bun run build` | Production build |
| `bun run start` | Serve production build |
| `bun run test` | Vitest watch |
| `bun run test:run` | Vitest once |
| `BASE_URL=http://localhost:3000 bun run test:integration` | Integration checks, including HTTP checks against an already running local server |
| `bun run lint` | Oxlint |
| `bun run preview` | Build and preview the OpenNext Worker locally |
| `bun run deploy` | Build and deploy the Worker. Maintainers only, with release approval. |

Run lint and tests before a build. Stop the development server before a
production build, and run builds and checks sequentially in one checkout.
Application checks support, but do not replace, verification of the affected
user flow. See [CONTRIBUTING.md](docs/CONTRIBUTING.md#verify-the-change).

## Project structure

```
ihsaan-public-website/
├── AGENTS.md
├── docs/
│   ├── CONTRIBUTING.md       # Contributor workflow and PR guidelines
│   ├── SECURITY-AUDIT.md     # Historical security audit
│   ├── CODEBASE_MAP.md       # Module map (start here for navigation)
│   ├── context.md            # Product context
│   └── IHSAAN-DESIGN.md      # Visual system
├── src/
│   ├── app/                  # Routes, layout, globals, SEO
│   ├── components/           # UI, sections, chrome, motion
│   ├── content/              # Site + programme copy, legacy routes
│   ├── lib/                  # Origin, metadata helpers, cn
│   └── test/setup.ts
├── tests/integration/        # Contact security and running-app HTTP checks
├── public/media|partners|icons
├── next.config.mjs           # Redirects, CSP, image patterns
├── package.json
└── bun.lock
```

The `docs/` directory is tracked. Local agent state in `.claude/`, `.pstack/`,
`.ui-quality/`, and `.papercuts.jsonl` is ignored and must not be added to PRs.

## Maintainer operations

Contributors can skip this section. Only authorized maintainers perform merges,
production secret changes, and deployments. Follow the maintainer account and
team-author rules in [AGENTS.md](AGENTS.md).

The build target is Cloudflare Workers through OpenNext. `wrangler.jsonc`
currently has an empty `routes` array. The Worker config therefore does not
attach the apex or `www` domain. Confirm the active hosting, DNS, and intended
Worker before a release; this repository alone does not prove which deployment
serves the public domain. Do not change domain bindings as part of routine PR work.

For an approved Worker release, set the runtime secrets on the intended Worker
through the project's Wrangler CLI:

```bash
bunx wrangler secret put RESEND_API_KEY
bunx wrangler secret put TURNSTILE_SECRET_KEY
```

If you override `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, use the real public widget key
in the build environment. Configure the matching secret and allowed production
hostnames in Cloudflare. Never use the public test pair for a release.

`bun run deploy` builds and deploys explicitly. A Git push alone does not run that
command. After a release, verify the intended host, redirects, and contact flow.
Deployment and live contact checks require separate approval.

## Related repos

| Repo | Role |
|------|------|
| `ihsaan-fosis/public-website` | This public site (`ihsaan.network`) |
| `ihsaan-fosis/member-platform` | Private member portal (`portal.ihsaan.network`) |

## Docs

- [Documentation index](docs/README.md)
- [Contributor guide](docs/CONTRIBUTING.md)
- [Product context](docs/context.md)
- [Codebase map](docs/CODEBASE_MAP.md)
- [IHSAAN design system](docs/IHSAAN-DESIGN.md)
- [Agent instructions](AGENTS.md)
- [Historical security audit](docs/SECURITY-AUDIT.md)
