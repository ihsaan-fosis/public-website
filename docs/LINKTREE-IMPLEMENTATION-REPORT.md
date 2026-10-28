# Linktree integration implementation report

Implementation date: 12 October 2026. This is a historical summary, not a current
verification result or a release record. Use the current
[codebase map](CODEBASE_MAP.md) for routes and module ownership.

## Delivered behavior

- Shared destination records in `src/content/links.ts` supply event, community,
  volunteering, mentorship, guide, and social links.
- `/events` lists scheduled events and retains a calendar fallback when no
  upcoming event remains.
- Programme, contact, involvement, homepage, and footer links expose relevant
  destinations. Social links also feed Organization metadata and `llms.txt`.
- Privacy copy identifies external form and registration providers.
- The opportunities tracker remains hidden. No database, CMS, account system,
  analytics, or first-party registration flow was added.

The original implementation used `/ticket`. That URL now redirects to `/start`.
Programme and involvement layouts have changed since this report.

## Verification recorded on the implementation date

| Check | Historical result |
| --- | --- |
| `bun run test:run` | 145 tests passed across 14 files. |
| `bun run lint` | Passed. |
| `bun run build` | Passed. |
| Local HTTP checks | Events returned HTML with private, no-cache, no-store caching; the hidden tracker redirected; sitemap and `llms.txt` included events. |
| Browser checks | Event and destination links, theme switching, skip-link focus, mobile and desktop layouts, and scroll reveals were checked. |

These checks were not exhaustive E2E registration tests or a real-device
accessibility audit. No external form was submitted. Temporary local evidence
and machine-specific session records are not included in the shared repository.
Re-run relevant checks for current changes rather than treating this table as CI.

## Publication holds recorded at implementation

- The DCU alumni panel had conflicting end times and was omitted pending
  organiser confirmation.
- The discovered membership and professional-network forms required separate
  owner approval. Portal signup was not treated as a membership application.
- The alumni signup returned 404 and was omitted in favor of a contact fallback.
- The opportunities tracker stayed hidden pending a restoration decision.
- LinkedIn availability remained unverified through automated access.
- TikTok was included after the matching public profile was confirmed.
- No application URL was invented for Faithful Talent.

These are dated decisions, not a current availability audit. Check
`src/content/links.ts` and the relevant content modules before changing a
destination. Confirm current ownership and availability with the team.

## Follow-up boundaries

Keep event dates, destination URLs, page copy, redirects, and discovery routes
consistent. Do not restore a held destination just because an old inventory
contains its URL. Do not change external profiles or submit applications as
part of routine verification.

See the [source inventory](LINKTREE-INVENTORY.md) and the
[historical integration plan](LINKTREE-INTEGRATION-PLAN.md) for the original
research. Use [CONTRIBUTING.md](../CONTRIBUTING.md) for current delivery and
verification requirements.
