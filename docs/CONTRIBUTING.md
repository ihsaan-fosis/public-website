# Contribute to the IHSAAN public website

Submit pull requests to `main` in
[`ihsaan-fosis/public-website`](https://github.com/ihsaan-fosis/public-website).
Do not push contributions directly to `main`.
Maintainers review and merge PRs and handle deployment.

## Use your own account and identity

Use your own GitHub account, Git name, and email address.
Ignore these maintainer-only sections of [AGENTS.md](../AGENTS.md), including
when you use a coding agent:

- **GitHub account**. Do not switch to `ihsaan-fosis` or request shared credentials.
- **Hosting and deploy**. Do not deploy, change production secrets, or run
  `bun run deploy`. Submit a PR instead.
- **Git commit author**. Do not use `techihsaan <tech.ihsaan@fosis.org.uk>` as
  your commit identity.

Follow the remaining agent rules. The same account, author, and deployment
exceptions apply to [maintainer procedures](MAINTAINERS.md).

## Prepare the change

1. Follow the [local setup guide](../README.md#set-up-the-site).
2. Read the [product context](context.md) and [codebase map](CODEBASE_MAP.md).
3. For UI changes, read the [design reference](IHSAAN-DESIGN.md).
4. Create a topic branch from the latest `main`, such as `docs/contributing`
   or `fix/contact-form`.
5. Keep the change focused on one problem.

If you lack branch access, use a fork when repository permissions allow it.
Otherwise, ask a maintainer for access. Discuss large features and architectural
changes before implementation.

Use Bun for dependencies and project commands. Follow existing patterns in
`src/` before you add dependencies or abstractions.

Keep secrets, local environment files, build output, and unrelated edits out of
your commits. Do not request production secrets for local work.
Before you test the contact form, read the [environment reference](ENVIRONMENT.md).
A configured Resend key can send real email.

## Verify the change

For code changes, run the narrowest relevant check first.
Stop the development server before the production build.
Run the project checks sequentially in one checkout before you request review:

```bash
bun run lint
bun run test:run
bun run build
```

For HTTP integration checks, start the local server in a separate terminal.
Run the suite against that server:

```bash
BASE_URL=http://localhost:3000 bun run test:integration
```

The focused contact security suite needs no running server:

```bash
bun run test:integration tests/integration/contact-security.spec.ts
```

Match the evidence to the change:

- Reproduce the affected user flow and confirm the result.
- For a bug fix, show the same reproduction before and after the fix.
- Prefer end-to-end (E2E) regression coverage. If E2E is disproportionate or
  cannot reach the behavior, use integration coverage and explain why.
  Do not add unit tests.
- For UI changes, check desktop and mobile layouts. Attach screenshots of the
  affected states. For interactions, include the steps and assertions as well.
  A screenshot alone does not prove that an interaction works.
- For documentation changes, check commands, links, and rendered text.
  Explain when application checks do not apply.

Report failed or skipped checks and their reasons.
Claim a pass only for checks you ran.
Before you commit, run `git diff --check` and review the full diff.

## Write focused commits

Keep each commit complete and limited to one problem.
Separate unrelated changes, formatting, and refactors.
Remove accidental edits, unused code, and comments that repeat the code.

Use Conventional Commit titles for commits and PRs:

```text
type(scope): short imperative subject
```

Use `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, or `perf` as the type.
Name the changed area in the scope. For example,
`docs(contributing): explain the contributor PR workflow`.
Do not add a trailing period.

## Open a pull request

1. Push your topic branch.
2. Open a PR against `main` after verification.
3. Link the related issue, if one exists.
4. Describe the change using the template below.

Keep the description short enough to read in under a minute.
Always include scope and verification. Omit other sections when they add no
information. Keep the remaining headings in the template's order.

```markdown
## Why
State the problem and approach in one to three sentences.

## What changed
- Summarize the main changes in one to three bullets.

## Scope
- State what the PR includes and deliberately excludes.

## Tradeoffs
Explain a rejected alternative when reviewers need the context.

## Blast radius
Name the affected users, behavior, and compatibility or deployment risks.

## Verification
- Name each check and result. Explain any skipped check.
```

Attach screenshots or other evidence when they support a claim.
Link long logs instead of pasting them. Redact secrets and personal data.

## Address review feedback

Make focused follow-up commits. Keep the PR description and verification
results current. Do not force-push a shared branch without agreement from its
collaborators. Leave the merge and deployment to maintainers.

## Maintain shared documentation

Update the relevant guide when a command, variable, route, or workflow changes.
Check relative links against the checkout. Keep historical results dated.
Do not present old results as current verification.

Keep shared Markdown files in `docs/`, except the root `README.md` and `AGENTS.md`.
Do not force-add `.claude/`, `.pstack/`, `.ui-quality/`, or `.papercuts.jsonl`.
Keep personal accounts, absolute machine paths, private session records, and
credentials out of shared documentation.
