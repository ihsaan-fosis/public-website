# IHSAAN public website security audit

Date: 2026-10-21. Scope: this public website and a separately coordinated audit of the member portal. Sonnet 5.5, effort high, implemented production fixes. Pi GPT 6.1 Sol authored regression coverage, verified results and performed lead/self-review. This was not an independent review.

## Result

Public-site application findings are fixed and locally verified. The final production build, type check, lint, 12 security integration cases, 9 existing contact-route cases and five real local HTTP checks pass. The full existing suite still has five failures, reproduced unchanged in a separate baseline checkout.

One upstream high-severity dependency advisory remains without a published patch. No commit, push, deployment, remote configuration change, production-data mutation or production exploit probe was performed. Local fixes do not establish that production is patched.

## Findings

| ID | Severity and location | Threat and impact | Fix | Verification |
| --- | --- | --- | --- | --- |
| P1 | Medium. `src/app/api/contact/route.ts:12` | Anonymous callers could send large JSON bodies that were fully buffered before schema validation and bot verification. This created avoidable request-memory and parsing pressure within hosting limits. | Read at most 64 KiB of actual UTF-8 bytes, independently of `Content-Length`; cancel oversized streams and return 413 before provider calls. | Before: three oversized-body cases returned 200. After: declared, streamed with misleading length and multibyte payloads all return 413 with no email delivery. The built production server also returns 413 over HTTP. |
| P2 | Low, defense in depth. `src/lib/turnstile.ts:12` | Any successful Siteverify result was accepted without hostname binding. If the same widget/secret were valid on additional domains, tokens issued there could cross the intended contact-site boundary. Production widget hostname configuration was not inspected, so this is not a demonstrated bypass of Cloudflare hostname restrictions. | Require success and a hostname on the fixed production allowlist: `ihsaan.network` or `www.ihsaan.network`. Do not derive trust from request headers. Scope local dummy-key compatibility to non-production and the exact documented public test secret. | Before: unrelated or missing hostname returned 200. After: both return 403 without delivery. A safe request using Cloudflare's public dummy key returned `example.com`, unlike the documentation's `localhost` example. Added and verified a regression preserving that local workflow while rejecting the hostname with real secrets and in production. |
| P3 | Medium, availability and error containment. `src/app/api/contact/route.ts:69`, `src/lib/turnstile.ts:18` | Slow upstream services could hold requests without an application deadline. Resend network exceptions escaped the route instead of producing its controlled error contract. Raw error objects could also carry unnecessary provider diagnostics into logs. | Apply 10-second abort deadlines to both upstream fetches. Return generic no-store 502 responses on transport failure. Log error names or response status, not raw errors. Do not retry mail sends. | Before: two stalled-provider cases failed to terminate; an email transport exception escaped. After: both deadline cases and the transport failure return controlled 502 JSON, without the synthetic private diagnostic. |
| P4 | Patched upstream advisories: sharp high, Vite high/moderate, esbuild low. `package.json`, `bun.lock` | Audit reported vulnerable nested Vite, esbuild and sharp resolutions. Exposure depends on the advisory: development-server/build tooling, platform conditions or image-processing inputs. No production exploit chain was demonstrated. | Exact overrides resolve Vite 7.3.7 and sharp 0.35.5. Vite resolves patched esbuild 0.28.1 without changing OpenNext AWS's separate pinned esbuild 0.25.4. No new dependency family was introduced. | Fresh `bun audit --json` no longer reports these packages. The final build, type check and tests run against the updated lockfile. |
| P5 | High upstream advisory, unresolved. `braces@3.0.3`, transitive lockfile dependency | [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): stack-exhaustion denial of service through deeply nested glob patterns. No attacker-controlled glob-pattern entry point was identified in this app; observed uses are transitive build/dev tooling. This is not a proof of absence in every deployed bundle. | No safe upstream patch is published. Registry latest remains 3.0.3 and the advisory lists no first patched version. Do not suppress the finding or invent a fixed version. | Fresh audit still exits 1 and reports this advisory only. Re-check for an upstream fix; do not feed untrusted patterns into build tooling. |

## Verification evidence

The integration suite uses the real contact route, schema, email construction and Turnstile helper together. Only third-party HTTP is replaced, preventing real mail delivery and allowing deterministic hostile provider responses. Integration is appropriate because valid live challenge tokens and real email sends are not safe or deterministic regression fixtures. No new unit tests were authored. The existing route test received only a provider-fixture compatibility update.

- Run `bun run test:integration`: 12 passed.
- Initial application regression: 8 failed, 1 passed in `.pstack/security-contact-before.log`.
- Local dummy-key regression: 1 failed, 11 passed before the follow-up fix in `.pstack/security-local-test-key-before.log`.
- Final compiled-app verification and real HTTP response metadata: `.pstack/security-final-results.json`.
- Final build, type check, integration, existing contact tests and lint logs: `.pstack/security-final-*.log`.
- HTTP checks against `bun run start`, with provider credentials explicitly empty: GET 405, malformed JSON 400, oversized JSON 413, honeypot 200 and missing configuration 503. The POST responses are JSON with `Cache-Control: no-store`. The spawned server process group was stopped.
- Before/after dependency audit: `.pstack/security-audit-before.json`, `.pstack/security-audit-after.json`.
- Documented dummy-key response, containing no user credentials: `.pstack/security-turnstile-test.headers`, `.pstack/security-turnstile-test.json`.
- Existing full suite: 249 passed, 5 failed. A separate checkout of unchanged HEAD with its original lockfile reproduces the same five failures: one invalid volunteer URL expectation, two stale contact-page expectations and two stale navigation expectations. See `.pstack/security-tests.log`, `.pstack/security-baseline-tests.log` and `.pstack/security-verification-results.json`. Those unrelated tests were not changed.

## Other boundaries inspected

- Contact input uses Zod validation; outbound mail recipient is fixed, and content is sent as text rather than untrusted HTML.
- Outbound provider URLs are fixed. No request-controlled server fetch destination was found.
- Resource markdown comes from a checked-in catalogue and is rendered through React; no untrusted raw-HTML sink was found on the inspected public-site paths.
- Legacy fragment redirects select from checked-in destinations rather than redirecting directly to an input URL.
- Inspected deployment configuration and security headers. Existing inline-script allowance was not relabeled as an exploitable XSS finding without an injection source.
- Tracked environment filenames and bounded source scans did not identify a committed private key or matching secret token. This was not a complete historical secret scan or an infrastructure/account audit.

## Remaining operational checks

After an explicitly authorized release, verify the actual OpenNext Worker response paths and real contact submission with production Turnstile/Resend configuration. Review Cloudflare widget allowed hostnames and request-rate rules. Keep preview routes from receiving production secrets unnecessarily. No live email send or authenticated production configuration review was performed here.

The member portal has its own Pi-led, Sonnet-implemented audit in thread `mcp:cd6cc71b-c551-441b-b0d0-782fd6f3389c`. Its destructive public Convex endpoints and identity findings must be treated separately from the lower-risk public-site findings. Do not infer that this public-site verification proves portal authorization or deployment safety.

## Delegation records

Both public implementation rounds used `claudeAgent`, `claude-sonnet-5-5`, effort `high`; test assets remained owned by the Pi lead.

- `node:delegated-task:command%3Amcp%3A4c37cb18-a4a4-49a3-af25-b9bd6ae55b38%3Adelegate-task%3Asecurity-public-sonnet-round-1`
- `node:delegated-task:command%3Amcp%3A4c37cb18-a4a4-49a3-af25-b9bd6ae55b38%3Adelegate-task%3Asecurity-public-sonnet-round-2`

Preserve unrelated untracked `.pstack/` and `.ui-quality/` content. Only the security-prefixed artifacts and this task's test/config files belong to this audit.
