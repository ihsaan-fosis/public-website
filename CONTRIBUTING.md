# Contribute to the IHSAAN public website

Submit changes through pull requests to `main` in
[`ihsaan-fosis/public-website`](https://github.com/ihsaan-fosis/public-website).
Do not push contributions directly to `main`. Maintainers review and merge PRs
and handle production deployment.

## Use your own account and commit identity

The following sections in [AGENTS.md](AGENTS.md) are for maintainers only.
Ignore them when you contribute, including when you use a coding agent:

- **GitHub account**: Use your own GitHub account. Do not switch to
  `ihsaan-fosis` or request shared account credentials.
- **Hosting and deploy**: Do not deploy the site, change production secrets, or
  run `bun run deploy`. Submit a PR instead.
- **Git commit author**: Use your own Git name and email. Do not set your commit
  author to `techihsaan <tech.ihsaan@fosis.org.uk>`.

The same maintainer-only account, author, and deployment instructions in
[README.md](README.md) do not apply to contributors. Follow the remaining
project instructions in `AGENTS.md`.

## Prepare your changes

1. Read the [setup instructions](README.md#setup),
   [product context](docs/context.md), and [codebase map](docs/CODEBASE_MAP.md).
   For UI changes, also read the [design system](docs/IHSAAN-DESIGN.md).
2. Create a topic branch from the latest `main`, such as
   `docs/contributing` or `fix/contact-form`. If you lack branch access, use a
   fork if repository permissions allow it, or ask a maintainer for access.
3. Use Bun for package management and project commands. Follow the existing
   patterns in `src/` before you add dependencies or abstractions.
4. Keep the change focused on one problem. Discuss large features or
   architectural changes with a maintainer before implementation.
5. Keep secrets, credentials, `.env.local`, build output, and unrelated edits
   out of your commits. Never request or copy production secrets for local use.

Shared documentation in `docs/` is tracked. Local agent state in `.claude/`,
`.pstack/`, `.ui-quality/`, and `.papercuts.jsonl` is ignored. Do not force-add it
or copy personal accounts, absolute machine paths, or session records into docs.
See the [environment guide](README.md#environment) before you test the contact
form. A configured Resend key can send real email.

## Verify the change

For code changes, run the narrowest relevant check first, then the project
checks before you request review:

```bash
bun run lint
bun run test:run
bun run build
```

Stop the development server before the production build. Run these commands
sequentially in the same checkout.

For running-app integration checks, start the local server separately, then run
`BASE_URL=http://localhost:3000 bun run test:integration`. Stop the server before
the build. The focused contact security suite can run without a server through
`bun run test:integration tests/integration/contact-security.spec.ts`.

Reproduce the affected user flow and confirm the result. For bug fixes, provide
before-and-after evidence from the same reproduction. Prefer E2E regression
coverage. Use integration coverage when E2E is disproportionate or cannot reach
the affected behavior, and explain why. Do not add unit tests.

For UI changes, check desktop and mobile layouts and attach screenshots of the
affected states. If the PR changes an interaction, also describe the steps you
used to verify it. A screenshot alone does not prove that an interaction works.

For documentation-only changes, check the commands, links, and rendered text.
State when application checks are not applicable. Report any failed or skipped
check and its reason. Do not claim a check passed unless you ran it.
Run `git diff --check` before you commit.

## Write focused commits and PRs

Keep commits small and complete. Separate unrelated changes so that reviewers
can assess each problem without unrelated formatting or refactors.

Use Conventional Commit titles for commits and PRs:

```text
type(scope): short imperative subject
```

Use `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, or `perf` as the type.
Name the changed area in the scope. For example,
`docs(contributing): explain the contributor PR workflow`. Do not add a trailing
period.

Before you open a PR, review the full diff and remove accidental changes,
unused code, and comments that repeat the code. Keep the title and description
plain and specific.

## Open a pull request

Push your topic branch and open a PR against `main`. Open the PR ready for
review after verification. Link a related issue when one exists.

Keep the description short enough to read in under a minute. Use the following
headings in order. Always include scope and verification. Omit other sections
when they add no information.

```markdown
## Why
Describe the problem and your approach in one to three sentences.

## What changed
- Summarize the main changes in one to three bullets.

## Scope
- State what this PR covers and what it deliberately leaves out.

## Tradeoffs
Explain a rejected alternative only when reviewers need that context.

## Blast Radius
Name the affected users or behavior and any compatibility or deployment risks.

## Verification
- Name each check you ran and its result, or explain why you skipped it.
```

Attach screenshots or other evidence when they support a claim. Link long logs
instead of pasting them into the description. Redact secrets and personal data.

Address review feedback with focused follow-up commits. Keep the PR description
and verification results current. Do not force-push a shared branch without
agreement from its collaborators. Leave the merge and deployment to maintainers.
