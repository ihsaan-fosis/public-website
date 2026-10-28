# Environment reference

The public site reads the variables below. It has no Clerk or Convex runtime.
The local template is [.env.example](../.env.example). The
[setup guide](../README.md#set-up-the-site) covers local configuration.

## Application variables

| Variable | Default or fallback | Behavior |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` in the template | Sets the site origin outside production. Production builds use `https://ihsaan.network` regardless of this value. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | The production public widget key in `src/components/contact-form.tsx` | Selects the client widget. An empty string overrides the fallback. Public values become part of the client build. |
| `TURNSTILE_SECRET_KEY` | Unset | Verifies contact challenges on the server. |
| `RESEND_API_KEY` | Empty in the template | Authorizes email delivery through Resend. A valid key can send real email to the fixed IHSAAN contact inbox. |
| `VERCEL_ENV` | `production` when unset | Controls `INDEXABLE`. Any set value other than `production`, including an empty string, disables indexing. |
| `NODE_ENV` | Managed by Next.js | Selects development or production behavior, including canonical origins and accepted challenge hostnames. |

`src/lib/site.ts` defines the canonical origin and indexing behavior.
`src/app/api/contact/route.ts` reads the server-only contact variables.
Valid contact requests return 503 when either contact variable is missing.
Malformed or invalid requests can return other statuses before that check.

## Environment file order

For development, the first definition wins in this order:

1. The process environment.
2. `.env.development.local`.
3. `.env.local`.
4. `.env.development`.
5. `.env`.

For production, Next.js substitutes `production` for `development` in those
filenames. Production builds still read `.env.local`, but do not read
`.env.development.local`.

In test mode, Next.js uses the test filenames and skips `.env.local`.
Bun and the test runner can load their own environment values. The
`BASE_URL` examples below set the HTTP target in the shell explicitly.

## Public challenge test keys

Cloudflare publishes this always-pass pair for local development:

```dotenv
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

The pair belongs in `.env.development.local`, not `.env.local`.
The [local challenge procedure](../README.md#configure-the-local-contact-challenge)
uses that file to keep test keys out of production builds.
The pair does not mock Resend or prevent email delivery.

`src/lib/turnstile.ts` accepts the test response hostname `example.com` only
outside production and only with the exact public test secret. Production
accepts only `ihsaan.network` and `www.ihsaan.network`.

## HTTP integration target

`BASE_URL` belongs to the test runner, not the application. The HTTP integration
suite requires an already running server. Its explicit local invocation is:

```bash
BASE_URL=http://localhost:3000 bun run test:integration
```

The focused contact security suite replaces third-party HTTP and needs no
running server:

```bash
bun run test:integration tests/integration/contact-security.spec.ts
```

## Worker secrets

Worker runtime secrets are separate from committed examples and public build
values. Only authorized maintainers change them through the
[release procedure](MAINTAINERS.md#configure-an-approved-release).
