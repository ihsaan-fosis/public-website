# Run the IHSAAN public website locally

The IHSAAN public website uses Next.js 16, React 19, TypeScript, and Tailwind CSS 4.
The public domain is [ihsaan.network](https://ihsaan.network).
The member portal is a separate application.

Use your own GitHub account and commit identity. Submit changes through pull
requests to `main`. Read the [contributor guide](docs/CONTRIBUTING.md) before
you start. Contributors do not deploy or use the maintainer account.

## Set up the site

Use Bun, not npm or Yarn. `package.json` specifies Bun 1.3.14.
Run these commands from the repository root after you clone the repository.
The site needs no member-platform credentials, database, or production secrets.

1. Install dependencies:

	```bash
	bun install
	```

2. Copy the local environment template:

	```bash
	cp .env.example .env.local
	```

3. Start the development server:

	```bash
	bun run dev
	```

4. Open [localhost:3000](http://localhost:3000).

The page renders without provider credentials. Valid contact requests return
503 until both `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` are set.
Keep `.env.local` out of Git.

## Configure the local contact challenge

A valid `RESEND_API_KEY` can send real email to the IHSAAN contact inbox.
Leave the key empty unless a maintainer approves a test send.
Cloudflare's test keys bypass the challenge, not email delivery.

1. Put the public test pair in `.env.development.local`:

	```dotenv
	NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
	TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
	```

2. Restart `bun run dev` to load the new values.

Never put test keys in `.env.local` or a production build environment.
Next.js reads `.env.local` during production builds, but does not read
`.env.development.local`. The [environment reference](docs/ENVIRONMENT.md)
lists the variables and their load order.

## Check your change

Follow the [verification steps](docs/CONTRIBUTING.md#verify-the-change).
For a production build, stop the development server first. Run builds and checks
sequentially in one checkout.

## Find project guidance

Use these guides for the task at hand:

- [Documentation index](docs/README.md): all shared guides.
- [Codebase map](docs/CODEBASE_MAP.md): routes, modules, and package scripts.
- [Product context](docs/context.md): the public site's purpose and limits.
- [Design reference](docs/IHSAAN-DESIGN.md): brand values and public-page rules.
- [Agent instructions](AGENTS.md): repository rules for coding agents.
- [Maintainer procedures](docs/MAINTAINERS.md): authorized secret changes and releases.
- [Security audit](docs/SECURITY-AUDIT.md): dated findings and unresolved follow-ups.
