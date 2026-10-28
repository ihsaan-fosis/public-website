# Agent Instructions

## Project

IHSAAN public website (`ihsaan.network`), built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest, and Bun.

Official domain: `https://ihsaan.network`

Related private repo: `ihsaan-fosis/member-platform` (member portal). This repo is the public marketing / content site only.

## Contributors

Read [CONTRIBUTING.md](CONTRIBUTING.md) before making changes. Use your own
GitHub account and commit identity. Submit changes through a topic branch and
a pull request to `main`. Do not deploy.

The **GitHub account**, **Hosting and deploy**, and **Git commit author** sections
below apply only to authorized maintainer operations. Contributors and their
coding agents must ignore those sections and follow `CONTRIBUTING.md` instead.
The remaining project instructions apply to everyone.

## GitHub account

Maintainers only. Use the **`ihsaan-fosis`** GitHub CLI profile for authorized
maintainer Git and `gh` operations in this repository.

```bash
gh auth switch --user ihsaan-fosis
gh api user --jq .login   # must print ihsaan-fosis
```

- Remote owner: `ihsaan-fosis/public-website`
- Do not perform maintainer operations under another logged-in account
- Before remote git operations, confirm the active account matches `ihsaan-fosis`

## Hosting and deploy

Maintainers only. The repository targets **Cloudflare Workers** via OpenNext
(`@opennextjs/cloudflare`). Deployment requires separate authorization.

- Config: `wrangler.jsonc`. Its `routes` array is currently empty, so this Worker
  does not attach `ihsaan.network` or `www.ihsaan.network` through that config.
  Confirm the active hosting and DNS setup before a release. Do not infer live
  hosting from the build target.
- Deploy: `bun run deploy` (`opennextjs-cloudflare build && opennextjs-cloudflare deploy`)
- Preview: `bun run preview`
- Contact secrets: use the project Wrangler CLI to set `RESEND_API_KEY` and
  `TURNSTILE_SECRET_KEY` on the intended Worker. See [README.md](README.md#maintainer-operations).
- A git push alone does not ship; deploy is explicit through Wrangler/OpenNext

## Git commit author

Maintainers only. Use the team identity for authorized maintainer commits.
Contributors keep their own identity.

```bash
git config --local user.name "techihsaan"
git config --local user.email "tech.ihsaan@fosis.org.uk"
```

- Author and committer must be `techihsaan <tech.ihsaan@fosis.org.uk>`
- Confirm before commit: `git config --local --get user.email` prints `tech.ihsaan@fosis.org.uk`
- Confirm after commit: `git log -1` shows the team author, not a machine-local identity
- If HEAD was pushed with the wrong author, fix with a new commit under the team identity (or rewrite only when explicitly approved). Do not assume `gh auth switch` sets git author

## Working Guidelines

- Keep changes small and limited to the requested scope.
- Follow existing patterns in `src/` before introducing new abstractions or dependencies.
- Use **Bun** for package management and project commands (`bun install`, `bun add`, `bun run …`). Do not use npm or yarn.
- Never commit secrets. Use `.env.local` for local environment values.
- Preserve unrelated worktree changes.
- Keep local agent state out of Git. `.claude/`, `.pstack/`, `.ui-quality/`, and
  `.papercuts.jsonl` are ignored. Shared documentation belongs in tracked `docs/`.
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

Prefer E2E coverage for behavior changes. Use integration coverage when E2E is
disproportionate or cannot reach the affected behavior, and explain why. Do not
add unit tests. Existing unit tests may be run as supporting checks.

## Project References

Read `README.md`, `docs/context.md`, `docs/CODEBASE_MAP.md`, and `docs/IHSAAN-DESIGN.md` before making architectural, product, or UI decisions. Match visual work to `docs/IHSAAN-DESIGN.md`.
