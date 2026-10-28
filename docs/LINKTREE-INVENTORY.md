# IHSAAN Linktree link inventory

Collected on 12 October 2026, approximately 12:06 to 12:10 UTC.
This is a historical inventory, not a current availability check. Recheck
provider ownership, event dates, and publication holds before reusing a URL.

Source: <https://linktr.ee/ihsaan.network>.

The profile title is "IHSAAN" and its description is "Empowering Muslim Excellence".
The [integration plan](LINKTREE-INTEGRATION-PLAN.md) maps every destination to the public website and describes the proposed architecture.

## Collection boundary and evidence

The profile returned HTTP 200 with `text/html; charset=utf-8`.
The inventory comes from the profile's `__NEXT_DATA__.props.pageProps.links`, cross-checked against its rendered anchor URLs.
There are 26 profile items: 19 destination links, five headings, and two text blocks. The separate `socialLinks` array is empty because social destinations are ordinary profile items.

All 19 destination URLs are recorded below in their source order. Linktree's numeric positions have gaps. Those gaps do not establish that additional links exist.

Linktree navigation, signup prompts, privacy/report controls, suggested creator profiles, scripts, images, and fonts are not IHSAAN destinations. They are excluded.
This is a complete inventory of links on this profile, not a recursive crawl of every linked website.

Checks followed redirects with bounded HTTP GET requests and retained response status, content type, body, and final URL before extraction.
Readable page extraction supplemented the HTTP checks for Luma, Notion, Google Forms, and the live IHSAAN homepage.
No forms were submitted, accounts accessed, or registration flows completed.

## All 19 profile destinations

Titles have surrounding whitespace removed. Destination URLs omit advertising
click identifiers and tracking parameters. These parameters are not required to
reach the resource and must not enter runtime content.

| ID | Linktree ID / position | Source title | Destination URL | Observed result |
| --- | --- | --- | --- | --- |
| L01 | `603721076` / 0 | Apply for our membership! | <https://www.ihsaan.network> | HTTP 200, "IHSAAN". This is the public homepage, not an application form. |
| L02 | `604106755` / 6 | Law Spring Week Academy | <https://luma.com/7bhqps51> | HTTP 200. Matching event page and structured event data. |
| L03 | `604106335` / 7 | Tech Spring Week Academy | <https://luma.com/3byu6cfc> | HTTP 200. Matching event page and structured event data. |
| L04 | `604105403` / 8 | Finance Spring Week Academy | <https://luma.com/kj5ognal> | HTTP 200. Matching event page and structured event data. |
| L05 | `602952494` / 9 | DCU ISoc Alumni Panel | <https://luma.com/403kel6v> | HTTP 200. Matching event page. End time conflicts between description and structured data. |
| L06 | `602514054` / 10 | IHSAAN Ireland Career Conference 2026 | <https://luma.com/hafri5tc> | HTTP 200. Matching event page and structured event data. |
| L07 | `521492561` / 13 | Events Calendar | <https://luma.com/calendar/cal-8amaiM2VigRIqjq> | Clean URL returned HTTP 200, "IHSAAN · Events Calendar". |
| L08 | `514493063` / 15 | My Muslim Mentor | <https://mymuslimmentor.com/> | HTTP 200, "My Muslim Mentor". Booking flow not tested. |
| L09 | `580368458` / 16 | The IHSAAN Alumni Network Signup | <https://tally.so/r/ODeX77> | HTTP 404. Do not publish as a working signup. |
| L10 | `519356890` / 17 | Haqqathons | <https://haqqathons.com> | HTTP 200, "Haqqathons". Final URL has a trailing slash. |
| L11 | `514535749` / 18 | Opportunities Tracker | <https://ihsaannetwork.notion.site/opportunities-tracker> | HTTP 200. Readable tracker introduction and submission links. Extracted role table says "No results". |
| L12 | `514534843` / 19 | Careers Essential Guide | <https://ihsaannetwork.notion.site/careers-essentials> | HTTP 200. Readable "Careers Essentials" collection and guide links. |
| L13 | `521497493` / 20 | IHSAAN Blogs | <https://ihsaanbyfosis.notion.site/ihsaan-reflection-civil-service-summer-internship> | Clean URL returned HTTP 200. This is one article, "Civil Service Summer Internship Programme", not a blog index. |
| L14 | `514493067` / 22 | WhatsApp Community | <https://docs.google.com/forms/d/e/1FAIpQLSehrwaRiPVkVI3UVq23jv4SZBZ540kC2D-PW84OeUIT9FIu6Q/viewform> | HTTP 200. Readable "IHSAAN WhatsApp Community" intake form, not a direct WhatsApp invitation. |
| L15 | `514493066` / 23 | Instagram | <https://www.instagram.com/ihsaan.network> | HTTP 200 with a matching IHSAAN profile title. |
| L16 | `514493064` / 24 | LinkedIn | <https://www.linkedin.com/company/ihsaan-network/> | HTTP 999 from automated access. Profile availability is unverified, not established as broken. |
| L17 | `521493033` / 25 | TikTok | <https://www.tiktok.com/@ihsaan.network> | HTTP 200 with a generic TikTok title. Exact account availability is unverified. |
| L18 | `521495686` / 26 | YouTube | <https://www.youtube.com/@IHSAAN.network> | HTTP 200, "IHSAAN - YouTube". |
| L19 | `514605823` / 27 | Apply to join our team | <https://ihsaannetwork.notion.site/openings> | HTTP 200. Readable volunteer openings and application guidance. The page explicitly states that all positions are unpaid. |

Seventeen destinations returned HTTP 200, one returned HTTP 404, and one returned HTTP 999.
HTTP 200 alone does not prove that a signup, booking, or account works. The four Notion HTTP responses initially contained generic app titles. Readable extraction confirmed the intended content.

## Publication URL normalization

Keep the destination URLs above as evidence. Use clean URLs in website content.

| ID | Proposed publication URL | Change |
| --- | --- | --- |
| L01 | `https://ihsaan.network/` only when labelled "Visit our website" | Use the canonical apex. A membership action needs a distinct destination, described below. |
| L07 | `https://luma.com/calendar/cal-8amaiM2VigRIqjq` | Remove the captured `fbclid`. The clean URL was checked. |
| L13 | `https://ihsaanbyfosis.notion.site/ihsaan-reflection-civil-service-summer-internship` | Remove the captured `fbclid`. The clean URL was checked. |
| L15 | `https://www.instagram.com/ihsaan.network/` | Match the existing site's trailing-slash convention. |
| Other links | Preserve the destination above | Do not rewrite Notion workspace names, Google Form IDs, Tally IDs, Luma IDs, or YouTube handle casing. |

Incoming Instagram attribution belongs on the website landing URL, for example `/links?utm_source=ig&utm_medium=social&utm_content=link_in_bio` if `/links` is approved.
Do not copy someone else's click identifier into permanent site content.

## Event details observed at collection

Dates and times below come from each Luma page's Event JSON-LD, corroborated by embedded event data. All five events are still in the future at the collection time.
Recheck them before implementation. The Tech event occurs on the collection day.

| ID | Local start | Local end | Time zone | Format / public location |
| --- | --- | --- | --- | --- |
| L02 | 13 October 2026, 19:00 | 13 October 2026, 20:00 | `Europe/London`, UTC+01:00 on this date | Online. |
| L03 | 12 October 2026, 17:00 | 12 October 2026, 18:00 | `Europe/London`, UTC+01:00 on this date | Online. |
| L04 | 18 October 2026, 19:00 | 18 October 2026, 20:00 | `Europe/London`, UTC+01:00 on this date | Online. |
| L05 | 15 October 2026, 17:30 | Structured data says 20:00. Description says 19:30. | `Europe/Dublin`, UTC+01:00 on this date | Dublin 9. Description names The Hive, DCU. Luma asks users to register for the exact address. |
| L06 | 24 October 2026, 11:00 | 24 October 2026, 15:00 | `Europe/Dublin`, UTC+01:00 on this date | TU Dublin, Grangegorman, Dublin 7. |

The academy pages say registration requires host approval. A registration request does not guarantee a place.
Resolve L05's conflicting end time with the organiser before publishing its full time range. Do not silently choose one value.
Do not expose a registration-gated address or online joining details by extracting hidden payload fields.

## Additional links discovered on the membership destination

These two URLs are not separate Linktree entries and are not included in the count of 19.
They were found on the live homepage reached through L01 and fetched independently.

| ID | Live homepage label | Destination | Observed content | Proposed use |
| --- | --- | --- | --- | --- |
| S01 | Apply for IHSAAN membership | <https://forms.gle/TRqSGw4dDSM7qNch7> | "Membership Application Form". Describes early portal access and sector-specific chats. | Candidate student membership CTA on `/ticket`, pending confirmation that this remains the current application route. |
| S02 | Join our professional network | <https://forms.gle/fwoCjpXu3kAy8rHB7> | "Sector-Specific Chats for Professionals". Describes moderated professional chats. | Candidate professional-network CTA on `/ticket`, pending owner confirmation. Do not label it a mentor application. |

S01, S02, and L14 are different forms. Do not merge them or assume that they share an admission process.
The checkout's `MEMBER_PORTAL` points to `https://portal.ihsaan.network`. Portal access is distinct from submitting a membership application.

## Profile text without destination URLs

The five headings are "About Us", "Our Events", "Career Support", "Keep in touch", and "#excellenceineverything".
Their decorative source symbols are omitted here.

The two text blocks are:

- "Our Mission". Describes career access, faith, community, and a 2017 Social Mobility Commission claim. It can inform `/about` copy after source checking, but is not another link.
- "How IHSAAN can help you every step of the way". Describes Faithful Talent, the tracker, hackathons, events, mentorship, guides, and WhatsApp. It can inform the programme overview. Its claims about 20+ mentorship industries and approximately 2,000 community members were not verified.

Faithful Talent is mentioned in this text but has no separate application destination in the collected profile.
Do not invent one or replace its existing programme CTA with a generic form.

## Known limits and publication holds

1. L09 is unavailable by HTTP at collection. Obtain a replacement from the alumni owner and verify it before publication.
2. L01 has a membership label but links to a homepage. S01 is a discovered candidate, not an approved replacement.
3. L11 is reachable, but its extracted role table is empty. This does not prove that the full interactive tracker is empty. Restoration also requires approval because the checkout intentionally hides it.
4. L13 is a single reflection. Publish an accurately named article link rather than a "Browse all blogs" CTA.
5. L16 and L17 need an ordinary browser account check before being described as verified social profiles.
6. L05 needs an end-time correction. Registration and admission were not tested for any event.
7. The fetched apex and `www` homepages show a hash-based site with membership forms. This differs from the checkout's App Router pages and `www` redirect configuration. Treat the checkout as the architecture baseline, not proof of the deployed version.

See the [implementation report](LINKTREE-IMPLEMENTATION-REPORT.md) for the
initial delivery decisions. Use the current content modules and team review,
not this dated inventory alone, to decide which destinations to publish.
