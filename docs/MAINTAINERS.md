# Prepare and verify a Worker release

Only authorized maintainers use this procedure. Deployment, production secret
changes, and live contact checks each require approval. Contributors submit
[pull requests](CONTRIBUTING.md) instead.

## Confirm the release target

1. Follow the maintainer account and author rules in [AGENTS.md](../AGENTS.md).
2. Confirm the intended Cloudflare account, Worker, and active hosting setup.
3. Check the domain bindings and DNS records before a release.

`wrangler.jsonc` targets OpenNext on Cloudflare Workers. Its `routes` array is
empty, so this configuration attaches neither `ihsaan.network` nor
`www.ihsaan.network`. The build target does not prove which deployment serves
the public domain. Do not change domain bindings during routine PR work.

## Configure an approved release

The contact route can send real email when credentials are set. Use only the
approved Worker and provider credentials.

1. Set the Resend runtime secret on the intended Worker:

	```bash
	bunx wrangler secret put RESEND_API_KEY
	```

2. Set the matching Turnstile runtime secret:

	```bash
	bunx wrangler secret put TURNSTILE_SECRET_KEY
	```

3. If you override `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, set the real public widget
   key in the build environment.
4. Confirm that the widget allows the intended production hostnames.
5. Remove public test keys from the production build environment.

Public widget keys become part of the client build. They are not runtime secrets.
The [environment reference](ENVIRONMENT.md) describes the distinction.

## Run release checks

1. Follow the [contributor verification steps](CONTRIBUTING.md#verify-the-change).
2. Recheck the contact regression without a running server:

	```bash
	bun run test:integration tests/integration/contact-security.spec.ts
	```

3. Recheck dependency advisories:

	```bash
	bun audit
	```

4. Review unresolved findings in the [dated security audit](SECURITY-AUDIT.md).
   Do not treat the audit's historical results as a new check.

Keep production secrets out of preview environments unless a specific preview
check requires them and has approval.

## Deploy and verify the Worker

A Git push does not run the deploy command. Stop the development server before
the production build.

1. For an approved release, build and deploy:

	```bash
	bun run deploy
	```

2. Verify responses on the intended host, including redirects and contact errors.
3. If approved, submit a real contact request with the production challenge.
4. Confirm email delivery and review Cloudflare request-rate rules.

Record the deployment and verification results. Do not infer production behavior
from a local build.
