# Follow the repository rules

This repository contains the IHSAAN public website at `https://ihsaan.network`.
The private member portal lives in `ihsaan-fosis/member-platform`.
Read the [product context](docs/context.md) for the boundary between them.

## Follow the contributor workflow

Read [CONTRIBUTING.md](docs/CONTRIBUTING.md) before you change files.
Use your own GitHub account and commit identity. Submit a topic branch through
a pull request to `main`. Do not deploy.

The following sections apply only to authorized maintainer operations:

- **GitHub account**.
- **Hosting and deploy**.
- **Git commit author**.

Contributors and their coding agents must ignore those sections.
Follow the remaining rules and the contributor guide instead.

## GitHub account

Maintainers only. Use `ihsaan-fosis` for authorized maintainer Git and `gh`
operations in `ihsaan-fosis/public-website`.

Before remote Git operations, select and check the account:

```bash
gh auth switch --hostname github.com --user ihsaan-fosis
gh api --hostname github.com user --jq .login
```

The login must be `ihsaan-fosis`. Do not continue under another account.

## Hosting and deploy

Maintainers only. Follow [the release procedure](docs/MAINTAINERS.md) for
approved secret changes and deployments. Deployment requires separate approval.

Confirm the active hosting and DNS before a release. `wrangler.jsonc` targets
Cloudflare Workers through OpenNext, and its `routes` array attaches both the
apex and the `www` domain to the Worker. `next.config.mjs` redirects `www` to the
apex. Verify the live host before you rely on the build target.

Use `bun run preview` for the local Worker preview.
Use `bun run deploy` only for an approved build and deployment.
A Git push does not run that command.

## Git commit author

Maintainers only. Set the repository-local team identity before maintainer commits:

```bash
git config --local user.name "techihsaan"
git config --local user.email "tech.ihsaan@fosis.org.uk"
```

Check the effective author and committer before a commit:

```bash
git var GIT_AUTHOR_IDENT
git var GIT_COMMITTER_IDENT
```

Both identities must be `techihsaan <tech.ihsaan@fosis.org.uk>`.
After the commit, check the author with `git log -1`.
If a pushed commit has the wrong author, use the team identity for new commits.
Do not rewrite existing commits without explicit approval.
`gh auth switch` does not set the Git author.
Contributors keep their own identity.

## Keep changes within scope

Follow these rules for each change:

- Change only the requested behavior. Keep unrelated worktree edits intact.
- Follow existing patterns in `src/` before you add dependencies or abstractions.
- Use Bun for dependencies and project commands. Do not use npm or Yarn.
- Keep secrets out of Git. Use local environment files for local values.
- Put shared documentation in `docs/`. Keep only the main `README.md` and this
  file at the repository root.
- Keep `.claude/`, `.pstack/`, `.ui-quality/`, and `.papercuts.jsonl` out of Git.
  These paths are ignored local state.
- Keep production metadata on `https://ihsaan.network`.
  Use `http://localhost:3000` only for local development.

## Verify the requested behavior

Run the narrowest relevant check first. Follow the
[verification procedure](docs/CONTRIBUTING.md#verify-the-change).
Use the existing [package scripts](docs/CODEBASE_MAP.md#package-scripts).
Before you finish, review `git diff` and confirm that each changed line belongs
to the request.

Prefer E2E coverage for behavior changes. If E2E is disproportionate or cannot
reach the behavior, use integration coverage and state why.
Do not add unit tests. Existing unit tests can support other verification.

## Read the relevant guides

Before architectural, product, or UI decisions, read these documents:

- [Local setup](README.md).
- [Product context](docs/context.md).
- [Codebase map](docs/CODEBASE_MAP.md).
- [Design reference](docs/IHSAAN-DESIGN.md).

Match visual work to the public website rules in section 9 of the design reference.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev`. Verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
