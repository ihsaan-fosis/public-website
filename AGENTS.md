# Agent Instructions

## Project

IHSAAN public website (`ihsaan.network`), built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest, and Bun.

Official domain: `https://ihsaan.network`

Related private repo: `ihsaan-fosis/member-platform` (member portal). This repo is the public marketing / content site only.

## GitHub account

Use the **`ihsaan-fosis`** GitHub CLI profile for every git and `gh` operation in this repository.

```bash
gh auth switch --user ihsaan-fosis
gh api user --jq .login   # must print ihsaan-fosis
```

- Remote owner: `ihsaan-fosis/public-website`
- Do not push, open PRs, or create issues as `mwijanarko1`, `fasalqna`, or any other logged-in account
- Before remote git operations, confirm the active account matches `ihsaan-fosis`

## Hosting and deploy

Production runs on **Cloudflare Workers** via OpenNext (`@opennextjs/cloudflare`), not Vercel.

- Config: `wrangler.jsonc` (custom domains `ihsaan.network` and `www.ihsaan.network`)
- Deploy: `bun run deploy` (`opennextjs-cloudflare build && opennextjs-cloudflare deploy`)
- Preview: `bun run preview`
- Secrets (e.g. contact form): `wrangler secret put RESEND_API_KEY`
- A git push alone does not ship; deploy is explicit through Wrangler/OpenNext

## Git commit author

Use the team identity on every commit that should go live (history and blame stay consistent even though Cloudflare does not gate deploys on author).

```bash
git config --local user.name "techihsaan"
git config --local user.email "tech.ihsaan@fosis.org.uk"
```

- Author and committer must be `techihsaan <tech.ihsaan@fosis.org.uk>`
- Confirm before commit: `git config --local --get user.email` prints `tech.ihsaan@fosis.org.uk`
- Confirm after commit: `git log -1` shows that author (not a machine-local `Mikhail <…@….local>` address)
- If HEAD was pushed with the wrong author, fix with a new commit under the team identity (or rewrite only when explicitly approved). Do not assume `gh auth switch` sets git author

## Working Guidelines

- Keep changes small and limited to the requested scope.
- Follow existing patterns in `src/` before introducing new abstractions or dependencies.
- Use **Bun** for package management and project commands (`bun install`, `bun add`, `bun run …`). Do not use npm or yarn.
- Never commit secrets. Use `.env.local` for local environment values.
- Preserve unrelated worktree changes.
- Production canonical URL is `https://ihsaan.network`. Keep `NEXT_PUBLIC_APP_URL` and metadata aligned with that domain (use `http://localhost:3000` only for local dev).

## Commands

- `bun install` installs dependencies.
- `bun run dev` starts the local development server on port 3000.
- `bun run test:run` runs the test suite once.
- `bun run build` creates a production build.
- `bun run deploy` builds with OpenNext and deploys to Cloudflare Workers.
- `bun run preview` builds and previews the Worker locally.
- `bun run lint` runs Oxlint (includes anti-slop rules).

## Verification

Run the narrowest relevant test first. Before finishing, review `git diff` and confirm every changed line belongs to the request.

## Project References

Read `README.md`, `docs/context.md`, `docs/CODEBASE_MAP.md`, and `docs/IHSAAN-DESIGN.md` before making architectural, product, or UI decisions. Match visual work to `docs/IHSAAN-DESIGN.md`.
