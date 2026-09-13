#!/usr/bin/env python3
"""Restore ditto pages, then rebrand without breaking maskImage SVG styles."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
ORIG = Path("/Users/mikhail/tmp/ditto.site/compiler/output/framer/app/src")
SRC = REPO / "src"

# Restore TSX pages/components from original ditto emit (keep our layout/globals)
RESTORE_GLOBS = [
    "app/page.tsx",
    "app/about/**/*.tsx",
    "app/contact/**/*.tsx",
    "app/gallery/**/*.tsx",
    "app/ticket/**/*.tsx",
    "app/404/**/*.tsx",
    "app/components/**/*.tsx",
]


def restore() -> None:
    for pattern in RESTORE_GLOBS:
        for src in ORIG.glob(pattern):
            if not src.is_file():
                continue
            dest = SRC / src.relative_to(ORIG)
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
            print("restored", dest.relative_to(REPO))


def only_attr_paths(text: str, old: str, new: str) -> str:
    """Replace asset paths only in src/srcSet/href attributes, not style masks."""
    def repl_src(m: re.Match[str]) -> str:
        return m.group(0).replace(old, new)

    # src="..."
    text = re.sub(
        rf'(src="[^"]*){re.escape(old)}([^"]*")',
        lambda m: m.group(1) + new + m.group(2),
        text,
    )
    text = re.sub(
        rf"(src='[^']*){re.escape(old)}([^']*')",
        lambda m: m.group(1) + new + m.group(2),
        text,
    )
    text = re.sub(
        rf'(srcSet="[^"]*){re.escape(old)}([^"]*")',
        lambda m: m.group(1) + new + m.group(2),
        text,
    )
    text = re.sub(
        rf'(href="[^"]*){re.escape(old)}([^"]*")',
        lambda m: m.group(1) + new + m.group(2),
        text,
    )
    # data fields: imgSrc: "..."
    text = re.sub(
        rf'(imgSrc(?:2)?:\s*"){re.escape(old)}(")',
        lambda m: m.group(1) + new + m.group(2),
        text,
    )
    text = re.sub(
        rf'(srcSet(?:2)?:\s*")([^"]*){re.escape(old)}([^"]*")',
        lambda m: m.group(1) + m.group(2).replace(old, new) + m.group(3).replace(old, new)
        if False
        else m.group(1) + (m.group(2) + m.group(3)).replace(old, new),
        text,
    )
    return text


MEDIA = {
    "/assets/cloned/images/8d668b4e57d9.jpg": "/media/career-conference.jpg",
    "/assets/cloned/images/661587e22e5f.jpg": "/media/career-conference.jpg",
    "/assets/cloned/images/238efbee89ae.jpg": "/media/career-conference.jpg",
    "/assets/cloned/images/08f2b9f70c48.jpg": "/media/photo-collage.jpg",
    "/assets/cloned/images/94d268b7f665.jpg": "/media/photo-collage.jpg",
    "/assets/cloned/images/f32a27f379e3.jpg": "/media/photo-collage.jpg",
    "/assets/cloned/images/fbaecaa6f13d.jpg": "/media/impact.jpg",
    "/assets/cloned/images/61710d11f468.jpg": "/media/impact.jpg",
    "/assets/cloned/images/837155f7250a.jpg": "/media/impact.jpg",
    "/assets/cloned/images/f00f66541698.jpg": "/media/impact-wide.jpg",
    "/assets/cloned/images/406cdaf4db0b.jpg": "/media/impact-wide.jpg",
    "/assets/cloned/images/be61b554b19f.jpg": "/media/impact-wide.jpg",
    "/assets/cloned/images/4f67c16f12d7.png": "/media/hero-poster.webp",
    "/assets/cloned/images/2fb2cdcff2db.png": "/media/logo.webp",
    "/assets/cloned/images/5ba765932fce.png": "/media/faithful-talent.jpg",
    "/assets/cloned/images/59fc46fa2ca9.png": "/media/faithful-talent.jpg",
    "/assets/cloned/images/2156fe94fe3d.png": "/media/career-conference.jpg",
    "/assets/cloned/images/4ab2420da926.png": "/media/career-conference.jpg",
    "/assets/cloned/images/1cab4a58bb78.png": "/media/career-conference.jpg",
    "/assets/cloned/images/898cdd422968.png": "/media/photo-collage.jpg",
    "/assets/cloned/images/6174923823c2.png": "/blue-icon.svg",
    "/assets/cloned/images/2a0e057e7e5f.png": "/icon-dark.svg",
    "/assets/cloned/images/d3b9363dea79.png": "/blue-icon.svg",
    # Evenco wordmark
    "/assets/cloned/svg/ed880298b7fa.svg": "/media/logo.webp",
}

COPY = [
    (
        "Global Digital AI Summit 2026 brings together innovators, industry leaders, and technology experts.",
        "IHSAAN empowers Muslim students with opportunities, mentorship, and networks for God-conscious careers.",
    ),
    (
        "We specialize in organizing professional conferences, corporate events, seminars, workshops.",
        "We equip Muslim students across the UK and Ireland with mentorship, networks, and career pathways.",
    ),
    (
        "We specialize in organizing professional conferences, corporate events, seminars, workshops, and networking gatherings.",
        "We equip Muslim students across the UK and Ireland with mentorship, networks, and career pathways.",
    ),
    ("exceptional event experiences", "faith-driven career journeys"),
    ("Our speakers", "Our programmes"),
    ("Check out the event schedule", "Explore what we offer"),
    ("Tickets Pricing", "Get involved"),
    ("Standard pass", "Student path"),
    ("VIP Pass", "Partner path"),
    ("VIP pass", "Partner path"),
    ("VIP lounge access", "Employer access"),
    ("VIP networking dinner", "Mentorship network"),
    ("Premium seating", "Faith-aligned roles"),
    ("Priority event support", "Dedicated programme support"),
    ("Conference materials", "Career guides & resources"),
    ("Networking opportunities", "Professional networks"),
    ("Coffee breaks", "Faith-conscious support"),
    ("Event certificate", "Skills workshops"),
    ("Buy a ticket", "Get involved"),
    ("Buy ticket", "Apply now"),
    ("Get ticket", "Get involved"),
    ("Register now", "Join IHSAAN"),
    ("Purchases now", "Get involved"),
    (
        "Secure your spot today and connect with industry leaders, AI experts",
        "Start your career journey with IHSAAN programmes and mentors",
    ),
    ("Your AI journey starts here", "Your career journey starts here"),
    ("Your AI journey ", "Your career journey "),
    ("Why attend our global summit", "Why IHSAAN exists"),
    ("Why attend", "Why IHSAAN"),
    ("Meet Our Organizing Committee", "Our values"),
    ("Official Elite Sponsor", "Partners & employers"),
    ("Select the ticket package", "Choose how to engage"),
    ("Highlights from our past events", "Moments from our programmes"),
    ("Common Event Inquiries", "Common questions"),
    ("Event overview", "Programme gallery"),
    ("Reach out to us", "Contact IHSAAN"),
    ("Get in touch with our team", "We would love to hear from you"),
    (
        "Full access with VIP lounge, speaker meetups, and exclusive dinner event.",
        "Partnership access with student talent, programme visibility, and community impact.",
    ),
    ("Moscone Center, San Francisco, USA", "UK & Ireland"),
    ("Moscone Center, USA", "UK & Ireland"),
    ("Moscone Center", "UK & Ireland"),
    ("San Francisco, California", "UK & Ireland"),
    ("San Francisco", "UK & Ireland"),
    ("info@Evenco.com", "ihsaan@fosis.org.uk"),
    ("info@evenco.com", "ihsaan@fosis.org.uk"),
    ("+1 (555) 123-4567", "ihsaan@fosis.org.uk"),
    ("© 2026 Evenco. All Rights Reserved.", "© 2026 IHSAAN. All rights reserved."),
    ("Evenco,2026", "IHSAAN, 2026"),
    ("Evenco", "IHSAAN"),
    ("About us", "Our story"),
    ("Contact Us", "Contact"),
    ("Get support", "Contact us"),
    ("Speakers", "Programmes"),
    ("Schedule", "Programmes"),
    ("Tickets", "Get involved"),
    ("Facebook", "Instagram"),
    ("YouTube", "LinkedIn"),
    ("Early Bird", "Open now"),
    ("Single admission", "Free to join"),
    ("Events organized", "Conference signups"),
    ("Attendees served", "Hackathon participants"),
    ("Industry speakers", "Internship places"),
    ("Global industry speakers", "Career conferences"),
    ("event management", "Faithful Talent"),
    ("Premium event experience", "Hackathons"),
    ("Become a partner", "Partner with us"),
    ("Become a Sponsor", "Sponsor a programme"),
    ("Full name", "Your name"),
    ("Your Email", "Email address"),
    ("Phone Number", "University or city"),
    ("Messages", "Message"),
    ("Submit", "Send message"),
    ("07 - 10", "UK · IE"),
    ("07-10,Sep", "UK · IE"),
    ("7-10,Sep", "UK · IE"),
    ("September , 2026", "Year-round programmes"),
    ("September, 2026", "Year-round programmes"),
]

HERO = [
    ('{ title: "Global" }', '{ title: "Elevating" }'),
    ('{ title: "AI" }', '{ title: "Faith-Driven" }'),
    ('{ title: "Summit" }', '{ title: "Talent" }'),
    ('{ title: "2026" }', '{ title: "IHSAAN" }'),
    ('title: "Charles Morgan"', 'title: "Career Conferences"'),
    ('title: "Robert Hayes"', 'title: "Faithful Talent"'),
    ('title: "Michael Scott"', 'title: "Hackathons"'),
    ('title: "AI Expert"', 'title: "Mentorship"'),
    ('title: "Steven Clark"', 'title: "Opportunities"'),
    ('description: "UI/UX designer"', 'description: "Flagship events"'),
    ('description: "developer"', 'description: "Internships"'),
    ('description: "3d & animation"', 'description: "Build with purpose"'),
    ('description: "Web developer"', 'description: "1:1 mentors"'),
    ('description: "Steven Clark"', 'description: "Jobs & placements"'),
    ('description: "Schedule"', 'description: "Programmes"'),
    ('description: "Speakers"', 'description: "Our story"'),
    ('description: "Get ticket"', 'description: "Get involved"'),
    ('description: "Ticket"', 'description: "Get involved"'),
    ('description: "About"', 'description: "Our story"'),
]

URLS = [
    (
        "https://www.google.com/maps/place/United+States/@40.0299481,-106.6636037,9.17z/data=!4m6!3m5!1s0x54eab584e432360b:0x1c3bb99243deb742!8m2!3d38.7945952!4d-106.5348379!16zL20vMDljN3cw?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D",
        "https://ihsaan.network/",
    ),
    ("mailto:info@evenco.com", "mailto:ihsaan@fosis.org.uk"),
    ("mailto:info@Evenco.com", "mailto:ihsaan@fosis.org.uk"),
]


def rebrand_text(text: str) -> str:
    for old, new in sorted(MEDIA.items(), key=lambda x: -len(x[0])):
        text = only_attr_paths(text, old, new)

    # remaining cloned images in src/srcSet/imgSrc only
    partners = sorted(p.name for p in (REPO / "public" / "partners").iterdir() if p.is_file())
    media_cycle = [
        "/media/career-conference.jpg",
        "/media/photo-collage.jpg",
        "/media/impact.jpg",
        "/media/impact-wide.jpg",
        "/media/faithful-talent.jpg",
        "/media/hero-poster.webp",
        "/media/logo.webp",
        "/media/blue-logo.webp",
    ] + [f"/partners/{n}" for n in partners]

    remaining = sorted(
        set(
            re.findall(
                r'(?:src|srcSet|imgSrc|imgSrc2|srcSet2)="([^"]+/assets/cloned/images/[^"]+)"',
                text,
            )
        )
    )
    # also bare imgSrc: "..."
    remaining += sorted(
        set(re.findall(r'imgSrc(?:2)?: "(/assets/cloned/images/[^"]+)"', text))
    )
    remaining = sorted(set(remaining))
    for i, old in enumerate(remaining):
        # only full path token
        path = old
        if " " in path:  # srcSet multi
            continue
        new = media_cycle[i % len(media_cycle)]
        text = only_attr_paths(text, path, new)

    for old, new in URLS:
        text = text.replace(old, new)
    for old, new in HERO:
        text = text.replace(old, new)
    for old, new in COPY:
        text = text.replace(old, new)

    # brand lockup Even + co
    text = re.sub(r'\{\s*"Even"\s*\}', '{"IHSA"}', text)
    text = re.sub(
        r'(\{"IHSA"\}[\s\S]{0,300}?<span[^>]*>\s*)\{\s*"co"\s*\}',
        r'\1{"AN"}',
        text,
        count=8,
    )
    text = text.replace('{"Your AI journey "}', '{"Your career journey "}')
    text = text.replace('data-framer-name="Evenco"', 'data-framer-name="IHSAAN"')

    # fonts in class names only
    text = text.replace("Krona_One", "Poppins")
    text = text.replace("Mona_Sans", "Poppins")
    return text


def main() -> None:
    restore()
    n = 0
    for path in SRC.rglob("*.tsx"):
        before = path.read_text(encoding="utf-8")
        after = rebrand_text(before)
        if after != before:
            path.write_text(after, encoding="utf-8")
            n += 1
            print("rebranded", path.relative_to(REPO))
    print("files", n)

    # quick sanity
    home = (SRC / "app" / "page.tsx").read_text(encoding="utf-8")
    assert "maskImage: \"none\"/" not in home
    assert "Elevating" in home
    assert "/media/logo.webp" in home
    assert '{"IHSA"}' in home
    print("sanity ok")


if __name__ == "__main__":
    main()
