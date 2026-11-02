# Blog publishing

Blog articles are written in the member portal and read by this site at request
time. The portal is the only source: the site serves no checked-in article. The inactive career guide catalogue in
`src/content/career-essentials.catalog.json` is not served. This
document records how that works, and the steps that must happen before a build
without the old fallback is deployed. The steps were done on 2 November 2026.

## How the public site reads posts

`src/lib/blog-catalog.ts` is the only place the site talks to the portal. It is
marked `server-only`, so a client component cannot import it and pull
`CONVEX_URL` into a browser bundle. It calls the two public, read-only queries
`blogPosts:listPublished` and `blogPosts:getPublished` through the Convex HTTP
client, with a three-second request timeout.

`CONVEX_URL` selects the deployment, and the two states mean different things:

| `CONVEX_URL` | Source | Empty or failing catalog |
| --- | --- | --- |
| Unset | None. The catalogue is empty. | The index shows its empty state and every article URL answers 404. |
| Set | Exactly what the portal returns | Authoritative. The index shows its empty state and every article URL answers 404. |

No checked-in copy is ever served. A fallback would resurrect a post an editor
unpublished, and would keep advertising a slug the portal no longer owns. Local
development and previews therefore need `CONVEX_URL` to show any post.

Responses are validated before use. A malformed, unparseable, or timed-out
response fails closed, and a `null` answer from `getPublished` is an ordinary
"not published" miss for the route to turn into a 404 rather than an error.
Slugs must be lowercase hyphenated words, and the publication date must be a
finite number inside the range a JavaScript `Date` can format, so one bad field
cannot break the page.

The blog index, the article route, `sitemap.xml` and `llms.txt` read the
catalogue per request and are never statically cached. Bodies are rendered as
Markdown; raw HTML in a body is text, and a link is only a link when it resolves
to http, https, mailto, tel, or a site path. The article's JSON-LD is escaped and
its image is made absolute.

Covers added in the portal are absolute `https://` addresses on another host.
They render through a plain `<img>`, because `images.localPatterns` only lists
this site's own `/media/**` files for the optimiser, and the Content Security
Policy allows `img-src https:` for them. The portal rejects anything but
`https://`, so the directive matches what the backend can actually store.

## Create-only migration (done 2 November 2026)

The former checked-in article was `/blog/civil-service-summer-internship`. It
must exist in the production portal as a published post, and `CONVEX_URL` must be
set on the public Worker, before a build without the fallback is deployed.
Otherwise `/blog` is empty and that URL answers 404.

The row was created in production by a create-only import after confirming the
table was empty, and read back with `blogPosts:getPublished`. It has no
`publishedAt`. A `General Application` volunteer role was created the same way,
so `/volunteer` kept its card when `CONVEX_URL` switched it to live data.

Do not script this migration. Do not add a mutable migration that upserts,
deletes, or rewrites rows. A one-off manual entry in the admin workspace is the
whole procedure, so a mistake is a visible edit rather than a silent data change.

1. **Preserve the slug.** Use `civil-service-summer-internship` exactly. The URL
   is published, linked, indexed and in the sitemap.
2. **Preserve the article in full.** Copy the complete body as Markdown, keeping
   every section heading and paragraph, plus the summary, tags, author name, and
   the attribution to the original Notion reflection. Cover: use
   `https://ihsaan.network/media/faithful-talent-hd.webp`, or leave the cover
   unset, rather than inventing a new one. The portal has no fields for author
   links, so the LinkedIn and email buttons of the old page are gone.
3. **Confirm the row does not already exist.** Search the admin blog list for
   the slug before saving. `blogPosts:save` without an `id` is create-only: it
   rejects a slug that another row already uses, so nothing is overwritten. If the
   slug is taken by a different post, stop and report it; do not rename either
   post to get past the error.
4. **Publish, then read it back from the portal.** Confirm the row with
   `blogPosts:getPublished`: title, body, author, date and cover. The public
   page cannot render it until step 5 and a deployment.
5. **Only then set `CONVEX_URL` and deploy.** Adding it to the Worker environment is a
   production configuration change and needs its own approval, together with the
   backend deployment approval for the member-platform functions. The public site
   cannot read posts that are not deployed. Afterwards check
   `/blog/civil-service-summer-internship` on the live site: title, body, author,
   date, cover, contents list and JSON-LD.
6. **Check the neighbouring reader.** `CONVEX_URL` is shared: `/volunteer`
   already reads `volunteerRoles:listOpen` with the same variable. Setting it for
   the blog therefore also switches volunteer openings from the checked-in
   fallback in `src/content/volunteer.ts` to live portal data. Verify `/volunteer`
   after the change, and expect that page to fall back to its checked-in roles
   only when unset or failing.

Ordering matters. If `CONVEX_URL` is set before the article exists, the index
goes empty and the published URL starts returning 404: the portal is
authoritative and nothing else is served as cover.

## Open items

- **DNS.** `admin.ihsaan.network` is attached to the member-platform Worker, but
  only as a `307` redirect to `portal.ihsaan.network/admin`, so it never serves
  this site. The apex and `www` routes on the public Worker are unchanged.
- **Clerk.** The admin host's satellite configuration is still not set up: Clerk
  refuses satellite domains on the current plan (`app:domains`), which is why that
  host redirects instead of serving a second origin.
- **Browser verification.** No authenticated end-to-end check of the publishing
  flow has run in a real browser.

Done: the `blogPosts` and `volunteerRoles` functions and rows exist on the
production Convex deployment, and `CONVEX_URL` is set in `vars` in
`wrangler.jsonc`. Local development and previews still need their own value.

Treat the public integration as unverified until each item above is confirmed
against a real deployment.
