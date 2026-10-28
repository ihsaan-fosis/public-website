# IHSAAN public website security audit

Audit date: 2026-10-21. Scope: this public website. The implementation received
lead/self-review, not an independent review.

This is a historical snapshot, not a current security certification. Results and
dependency advisory status below describe the audit date. Re-run the relevant
checks before a release. Local session logs are not part of the shared repository.

## Result

At the audit date, public-site application findings were fixed and locally
verified. The production build, type check, lint, 12 security integration cases,
9 existing contact-route cases, and five real local HTTP checks passed. The full
suite had five failures, reproduced unchanged in a separate baseline checkout.

At that date, one upstream high-severity dependency advisory had no published
patch. The audit did not include a deployment, remote configuration change,
production-data mutation, or production exploit probe. Local fixes did not
establish that production was patched.

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

- Contact security integration suite: 12 passed at the audit date.
- Initial application regression: 8 failed, 1 passed.
- Local dummy-key regression: 1 failed, 11 passed before the follow-up fix.
- Final build, type check, contact security integration, existing contact tests,
  and lint passed at the audit date. These are historical results, not new runs.
- HTTP checks against `bun run start`, with provider credentials explicitly empty: GET 405, malformed JSON 400, oversized JSON 413, honeypot 200 and missing configuration 503. The POST responses are JSON with `Cache-Control: no-store`. The spawned server process group was stopped.
- The dependency audit reported only P5 after the overrides. Re-check the
  advisory before assuming that it remains unresolved.
- Existing full suite at the audit date: 249 passed, 5 failed. A separate baseline
  checkout reproduced the same failures: one volunteer URL expectation, two
  contact-page expectations, and two navigation expectations. Those failures
  were outside the audit scope. This does not describe the current suite.

To recheck the contact regression without a running server, use
`bun run test:integration tests/integration/contact-security.spec.ts`.
Run `bun run lint`, `bun run test:run`, and `bun run build` for supporting checks.
Use `bun audit` to recheck dependency advisories. Do not submit real contact
messages or change production configuration without approval.

## Other boundaries inspected

- Contact input uses Zod validation; outbound mail recipient is fixed, and content is sent as text rather than untrusted HTML.
- Outbound provider URLs are fixed. No request-controlled server fetch destination was found.
- Resource markdown comes from a checked-in catalogue and is rendered through React; no untrusted raw-HTML sink was found on the inspected public-site paths.
- Legacy fragment redirects select from checked-in destinations rather than redirecting directly to an input URL.
- Inspected deployment configuration and security headers. Existing inline-script allowance was not relabeled as an exploitable XSS finding without an injection source.
- Tracked environment filenames and bounded source scans did not identify a committed private key or matching secret token. This was not a complete historical secret scan or an infrastructure/account audit.

## Remaining operational checks

After an explicitly authorized release, verify the actual OpenNext Worker response paths and real contact submission with production Turnstile/Resend configuration. Review Cloudflare widget allowed hostnames and request-rate rules. Keep preview routes from receiving production secrets unnecessarily. No live email send or authenticated production configuration review was performed here.

The member portal is a separate system and requires its own security review.
This public-site audit does not establish portal authorization or deployment safety.
