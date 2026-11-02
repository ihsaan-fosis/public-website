# Blog publishing

Blog articles are written in the member portal and read by this site at request
time. This document records how that works, and the migration that must happen
before the public site is pointed at the portal. Nothing here has been executed.

## How the public site reads posts

`src/lib/blog-catalog.ts` is the only place the site talks to the portal. It is
marked `server-only`, so a client component cannot import it and pull
`CONVEX_URL` into a browser bundle. It calls the two public, read-only queries
`blogPosts:listPublished` and `blogPosts:getPublished` through the Convex HTTP
client, with a three-second request timeout.

`CONVEX_URL` selects the source, and the two states mean different things:

| `CONVEX_URL` | Source | Empty or failing catalog |
| --- | --- | --- |
| Unset | The checked-in article in `src/content/blog.ts` | Not applicable; the checked-in article is served. |
| Set | Exactly what the portal returns | Authoritative. The index shows its empty state and every article URL answers 404. |

The checked-in article is never merged into a configured catalogue. Merging
would resurrect a post an editor unpublished, and would keep advertising a slug
the portal no longer owns.

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

## Create-only migration (not executed)

The checked-in article is
`src/content/blog.ts` → `/blog/civil-service-summer-internship`. It must be
recreated in the portal as a new published post, and only then may the site be
pointed at the portal.

Do not script this migration. Do not add a mutable migration that upserts,
deletes, or rewrites rows. A one-off manual entry in the admin workspace is the
whole procedure, so a mistake is a visible edit rather than a silent data change.

1. **Preserve the slug.** Use `civil-service-summer-internship` exactly. The URL
   is published, linked, indexed and in the sitemap.
2. **Preserve the article in full.** Copy the complete body as Markdown, keeping
   every section heading and paragraph, plus the summary, tags, author name, and
   the attribution to the original Notion reflection. Cover: reuse
   `/media/faithful-talent-hd.webp` content by uploading an equivalent image, or
   leave the cover unset, rather than inventing a new one.
3. **Confirm the row does not already exist.** Search the admin blog list for
   the slug before saving. `blogPosts:save` without an `id` is create-only: it
   rejects a slug that another row already uses, so nothing is overwritten. If the
   slug is taken by a different post, stop and report it; do not rename either
   post to get past the error.
4. **Publish, then read it back.** Confirm the published post renders at
   `/blog/civil-service-summer-internship`: title, body, author, date, cover,
   contents list, and JSON-LD.
5. **Only then set `CONVEX_URL`.** Adding it to the Worker environment is a
   production configuration change and needs its own approval, together with the
   backend deployment approval for the member-platform functions. The public site
   cannot read posts that are not deployed.
6. **Check the neighbouring reader.** `CONVEX_URL` is shared: `/volunteer`
   already reads `volunteerRoles:listOpen` with the same variable. Setting it for
   the blog therefore also switches volunteer openings from the checked-in
   fallback in `src/content/volunteer.ts` to live portal data. Verify `/volunteer`
   after the change, and expect that page to fall back to its checked-in roles
   only when unset or failing.

Ordering matters. If `CONVEX_URL` is set before the article exists, the index
goes empty and the published URL starts returning 404: the configured catalogue
is authoritative, so the checked-in article is not served as cover.

## Pending before this can go live

None of the following has been changed or verified here:

- **DNS.** `admin.ihsaan.network` is attached to the member-platform Worker, but
  only as a `307` redirect to `portal.ihsaan.network/admin`, so it never serves
  this site. The apex and `www` routes on the public Worker are unchanged.
- **Clerk.** The admin host's satellite configuration is still not set up: Clerk
  refuses satellite domains on the current plan (`app:domains`), which is why that
  host redirects instead of serving a second origin.
- **Backends.** The member-platform `blogPosts` and `volunteerRoles` functions are
  deployed to the production Convex deployment.
- **Public configuration.** `CONVEX_URL` is not set for the public Worker.
- **Browser verification.** No authenticated end-to-end check of the publishing
  flow has run in a real browser.
- **Production setup.** No production configuration change has been made.

Treat the public integration as unverified until each item above is confirmed
against a real deployment.
