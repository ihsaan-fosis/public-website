# Team documentation

Start with the [repository README](../README.md) for local setup and environment
variables. Read [CONTRIBUTING.md](CONTRIBUTING.md) before you submit a change.
Contributors use their own GitHub account and commit identity. Maintainers own
merges, production secrets, and releases.

## Current project guidance

- [Product context](context.md) defines the audience, public-site scope, domain,
  and member-portal boundary.
- [Codebase map](CODEBASE_MAP.md) maps current routes, content modules, shared
  components, and verification commands.
- [Design system](IHSAAN-DESIGN.md) records the brand guide and the public
  website's design language. Section 9 applies to public pages. The document
  marks unresolved brand-source conflicts and product-level additions.
- [Agent instructions](../AGENTS.md) define repository conventions. The account,
  hosting, and team-author sections apply only to authorized maintainers.

## Security follow-ups

The security audit is retained because it records unresolved follow-ups. It does
not establish current deployment status or passing checks.

- [Security audit](SECURITY-AUDIT.md) records the 21 October 2026 findings,
  verification limits, and operational follow-ups. Recheck advisories and the
  affected flows before a release.

## Maintain the documentation

Update the relevant guide in the same PR as a command, variable, route, or
workflow change. Check relative links and commands against the checkout. Keep
historical results dated rather than presenting them as new verification.

Keep personal accounts, absolute machine paths, private session identifiers,
credentials, and local logs out of shared docs. Team contact addresses and
approved organisation copy are separate from personal development details.

The `docs/` directory is tracked. `.claude/`, `.pstack/`, `.ui-quality/`, and
`.papercuts.jsonl` are local agent state and are ignored. Do not force-add them.
