# Team documentation

This index lists the shared guides for the IHSAAN public website.
The [main README](../README.md) contains the local setup procedure.

## Setup and contribution

| Document | Purpose |
| --- | --- |
| [Local setup](../README.md) | Install the site and configure the local contact challenge. |
| [Contributor guide](CONTRIBUTING.md) | Prepare, verify, and submit a pull request using your own account. |
| [Environment reference](ENVIRONMENT.md) | Look up variables, defaults, file order, and test keys. |
| [Agent rules](../AGENTS.md) | Follow repository rules and distinguish contributor actions from maintainer operations. |

## Product and implementation

| Document | Purpose |
| --- | --- |
| [Product context](context.md) | Understand the audience, scope, and separation from the member portal. |
| [Codebase map](CODEBASE_MAP.md) | Locate routes, modules, package scripts, and configuration. |
| [Design reference](IHSAAN-DESIGN.md) | Look up brand values and the public website's component rules. Section 9 applies to public pages. |

## Releases and security

| Document | Purpose |
| --- | --- |
| [Maintainer procedures](MAINTAINERS.md) | Configure and verify an authorized Worker release. |
| [Security audit](SECURITY-AUDIT.md) | Review the 21 October 2026 findings and unresolved follow-ups. The report is not current verification. |

## Documentation sources

`docs/` is tracked in Git. Current website copy and external destinations live
in `src/content/`. Historical plans and duplicate source copy are not current
project guidance.

`.claude/`, `.pstack/`, `.ui-quality/`, and `.papercuts.jsonl` are ignored local
state. Shared documentation excludes personal development accounts, absolute
machine paths, private session identifiers, credentials, and local logs.
