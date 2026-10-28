# Security audit of the IHSAAN public website

Audit date: 21 October 2026. Scope: this public website.
The implementation received the lead's review, not an independent review.

This report records results from the audit date. It is not a current security
certification or proof that production is patched. Local session logs are not
part of the shared repository.

## Recorded result

The application fixes passed the production build, type check, lint,
12 contact security integration cases, nine existing contact-route cases,
and five local HTTP checks.

The full suite had 249 passes and five failures. A separate baseline checkout
reproduced the same failures. The failures involved one volunteer URL expectation,
two contact-page expectations, and two navigation expectations.
They were outside the audit scope. Those results do not describe the current suite.

One high-severity upstream dependency advisory had no published patch at the
audit date. The audit did not include deployment, remote configuration changes,
production data changes, or a production exploit probe.

## Application findings

Line numbers below refer to the checkout at the audit date.

### P1. Oversized contact requests

Severity: medium. Location: `src/app/api/contact/route.ts:12`.

The route buffered anonymous JSON bodies before schema and challenge checks.
Large bodies increased memory use and parsing work within the hosting limits.

The fix limits the actual UTF-8 body to 64 KiB, regardless of `Content-Length`.
The route cancels oversized streams and returns 413 before provider calls.

Before the fix, three oversized-body cases returned 200.
After the fix, declared, misleading-length, and multibyte payloads returned 413
without email delivery. The built production server also returned 413 over HTTP.

### P2. Challenge hostname validation

Severity: low, as an additional defense. Location: `src/lib/turnstile.ts:12`.

The helper accepted any successful Siteverify response without a hostname check.
If the widget and secret were valid on other domains, their tokens could reach
this contact route. The audit did not inspect production widget settings, so
the finding did not demonstrate a bypass of Cloudflare's hostname restrictions.

The fix requires success and an allowed hostname.
Production permits only `ihsaan.network` and `www.ihsaan.network`.
Request headers do not determine trusted hostnames.
The local exception applies only outside production with the documented public
test secret.

Before the fix, unrelated or missing hostnames returned 200.
After the fix, both cases returned 403 without delivery.
Cloudflare's public test key returned `example.com` during a safe check, rather
than the documentation's `localhost` example.
The regression preserved that local flow but rejected the hostname with real
secrets and in production.

### P3. Provider deadlines and error handling

Severity: medium. Locations: `src/app/api/contact/route.ts:69` and
`src/lib/turnstile.ts:18`.

Slow providers could hold requests without an application deadline.
Resend transport exceptions escaped the route's error handling.
Raw error objects could also expose unnecessary provider diagnostics in logs.

The fix adds 10-second abort deadlines to both provider requests.
Transport failures return generic 502 responses with `Cache-Control: no-store`.
Logs contain error names or response statuses, not raw errors.
The route does not retry email sends.

Before the fix, two stalled-provider cases did not terminate, and an email
transport exception escaped. After the fix, those cases returned controlled
502 JSON without the synthetic private diagnostic.

## Dependency findings

These results describe `package.json` and `bun.lock` at the audit date.

### P4. Patched transitive dependencies

The dependency audit reported high-severity sharp advisories, high- and
moderate-severity Vite advisories, and a low-severity esbuild advisory.
Exposure depended on development or build tooling, platform conditions, or image
inputs. The audit did not demonstrate a production exploit chain.

Exact overrides resolved Vite 7.3.7 and sharp 0.35.5.
Vite resolved patched esbuild 0.28.1.
OpenNext AWS retained its separate pinned esbuild 0.25.4.
The changes introduced no new dependency family.

After the changes, `bun audit --json` no longer reported those packages.
The build, type check, and tests used the updated lockfile.

### P5. Unresolved braces advisory

Severity: high. Dependency: `braces@3.0.3` in the transitive lockfile.
Advisory: [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

Deeply nested glob patterns can exhaust the stack and cause denial of service.
The audit found no application entry point for attacker-controlled glob patterns.
Observed uses belonged to transitive development or build tooling.
That inspection did not establish absence from every deployed bundle.

At the audit date, the registry's latest version was 3.0.3.
The advisory listed no patched version, so the finding remained unsuppressed.
The final dependency audit exited with code 1 and reported only this advisory.
A current advisory check is still needed. Untrusted patterns must not reach
build tooling.

## Verification method

The integration suite exercised the real contact route, schema, email
construction, and Turnstile helper together.
It replaced only third-party HTTP to prevent real email and provide repeatable
hostile provider responses.
Live challenge tokens and real email sends were not safe, repeatable regression
inputs, which justified integration coverage instead of live E2E checks.

The audit added no unit tests. An existing route test received a provider-fixture
compatibility update.
The initial application regression had eight failures and one pass.
The local test-key regression had one failure and 11 passes before its follow-up
fix. The final contact security integration suite passed all 12 cases.

Local HTTP checks used `bun run start` with provider credentials empty.
They returned these statuses:

| Request | Status |
| --- | --- |
| GET | 405 |
| Malformed JSON | 400 |
| Oversized JSON | 413 |
| Honeypot submission | 200 |
| Valid submission without provider configuration | 503 |

POST responses were JSON with `Cache-Control: no-store`.
The audit stopped its server process group after verification.

## Other inspected behavior

The audit recorded these observations:

- Zod validates contact input. The recipient is fixed, and email content is text,
  not untrusted HTML.
- Provider URLs are fixed. The inspected code exposed no request-controlled
  fetch destination.
- Resource markdown comes from a checked-in catalogue and renders through React.
  The inspected paths exposed no untrusted raw HTML insertion.
- Legacy fragment redirects select checked-in destinations, not input URLs.
- Deployment configuration and security headers were inspected.
  The existing inline-script allowance alone did not demonstrate an XSS finding.
- Bounded scans of tracked files found no private key or matching secret token.
  The audit was not a complete history scan or an infrastructure account review.

## Unverified production behavior

No live email send or authenticated production configuration review took place.
Remaining checks cover actual Worker responses, production contact delivery,
widget hostnames, Cloudflare request-rate rules, and preview secret access.
The [maintainer procedure](MAINTAINERS.md#run-release-checks) covers current
checks and release approval.

The member portal needs a separate security review.
This report establishes neither portal authorization nor deployment safety.
