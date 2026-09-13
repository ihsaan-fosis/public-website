#!/usr/bin/env python3
"""Map Evenco ditto clone tokens/copy/media onto IHSAAN brand."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
CSS = SRC / "app" / "globals.css"
LAYOUT = SRC / "app" / "layout.tsx"

# --- 1. Color + font tokens in globals.css ---
TOKEN_REPLACEMENTS = {
    # Core surfaces
    "--background: rgb(255, 255, 255);": "--background: #FFFFFF;",
    "--foreground: rgb(0, 0, 0);": "--foreground: #000000;",
    "--primary: rgb(0, 0, 238);": "--primary: #0A3463;",
    "--accent: rgb(18, 0, 26);": "--accent: #0A3463;",
    "--surface: rgb(246, 246, 246);": "--surface: #F5F7FA;",
    "--muted-foreground: rgb(102, 102, 102);": "--muted-foreground: #3A3A3A;",
    "--surface-2: rgba(255, 255, 255, 0.1);": "--surface-2: rgba(255, 255, 255, 0.12);",
    "--muted: rgb(85, 85, 85);": "--muted: #4A4A4A;",
    # Accent chips -> brand supporting palette
    "--color-001: rgb(239, 204, 255);": "--color-001: #E8DFF0;",  # soft purple wash
    "--color-002: rgb(125, 192, 255);": "--color-002: #4C78B8;",  # light blue
    "--color-003: rgb(85, 234, 154);": "--color-003: #4C78B8;",
    "--color-004: rgb(88, 223, 225);": "--color-004: #4C78B8;",
    "--color-005: rgba(255, 255, 255, 0.8);": "--color-005: rgba(255, 255, 255, 0.85);",
    "--clr-0: rgba(88, 222, 224, 0);": "--clr-0: rgba(76, 120, 184, 0);",
    "--clr-1: rgba(3, 0, 4, 0.88);": "--clr-1: rgba(10, 52, 99, 0.92);",
    "--clr-3: rgb(101, 83, 245);": "--clr-3: #65408A;",
    "--clr-4: rgb(255, 66, 130);": "--clr-4: #65408A;",
    "--clr-5: rgb(236, 0, 219);": "--clr-5: #65408A;",
    "--clr-6: rgba(255, 255, 255, 0.2);": "--clr-6: rgba(255, 255, 255, 0.2);",
    "--clr-7: rgba(18, 0, 26, 0.3);": "--clr-7: rgba(10, 52, 99, 0.3);",
    "--clr-8: rgba(18, 0, 26, 0);": "--clr-8: rgba(10, 52, 99, 0);",
    "--clr-10: rgb(45, 19, 255);": "--clr-10: #0A3463;",
    "--clr-11: rgb(255, 2, 88);": "--clr-11: #65408A;",
    "--clr-12: rgb(194, 44, 183);": "--clr-12: #65408A;",
    "--clr-13: rgb(2, 255, 162);": "--clr-13: #4C78B8;",
    "--clr-14: rgba(18, 0, 26, 0.5);": "--clr-14: rgba(10, 52, 99, 0.5);",
    "--clr-15: rgb(128, 128, 128);": "--clr-15: #666666;",
    "--clr-16: rgba(0, 0, 0, 0.3);": "--clr-16: rgba(0, 0, 0, 0.28);",
    "--clr-17: rgb(26, 115, 232);": "--clr-17: #4C78B8;",
    "--clr-18: rgb(242, 242, 242);": "--clr-18: #F5F7FA;",
    "--clr-19: rgb(229, 227, 223);": "--clr-19: #E6EAF0;",
    # Typography families -> Poppins
    '--font-001: "Mona Sans", "Mona Sans Placeholder", sans-serif;': '--font-001: "Poppins", ui-sans-serif, system-ui, sans-serif;',
    '--font-002: "Krona One", "Krona One Placeholder", sans-serif;': '--font-002: "Poppins", ui-sans-serif, system-ui, sans-serif;',
}

FONT_FACE_STRIP = re.compile(
    r"@font-face\s*\{[^{}]*font-family:\s*\"(?:Mona Sans|Krona One|Google Sans)\"[^{}]*\}\s*",
    re.I | re.S,
)

# --- 2. Copy replacements (order matters: longer first) ---
COPY = [
    ("Global Digital AI Summit 2026 brings together innovators, industry leaders, and technology experts.",
     "IHSAAN empowers Muslim students with opportunities, mentorship, and networks for God-conscious careers."),
    ("We specialize in organizing professional conferences, corporate events, seminars, workshops.",
     "We equip Muslim students across the UK and Ireland with mentorship, networks, and career pathways."),
    ("We specialize in organizing professional conferences, corporate events, seminars, workshops, and networking gatherings.",
     "We equip Muslim students across the UK and Ireland with mentorship, networks, and career pathways."),
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
    ("Secure your spot today and connect with industry leaders, AI experts",
     "Start your career journey with IHSAAN programmes and mentors"),
    ("Your AI journey starts here", "Your career journey starts here"),
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
    ("Full access with VIP lounge, speaker meetups, and exclusive dinner event.",
     "Partnership access with student talent, programme visibility, and community impact."),
    ("Moscone Center, San Francisco, USA", "UK & Ireland"),
    ("Moscone Center, USA", "UK & Ireland"),
    ("Moscone Center", "UK & Ireland"),
    ("San Francisco, California", "UK & Ireland"),
    ("San Francisco", "UK & Ireland"),
    ("info@Evenco.com", "ihsaan@fosis.org.uk"),
    ("info@evenco.com", "ihsaan@fosis.org.uk"),
    ("+1 (555) 123-4567", "ihsaan@fosis.org.uk"),
    ("© 2026 Evenco. All Rights Reserved.", "© 2026 IHSAAN. All rights reserved."),
    ("All Rights Reserved.", "All rights reserved."),
    ("Evenco,2026", "IHSAAN, 2026"),
    ("Evenco", "IHSAAN"),
    ("About us", "Our story"),
    ("Contact Us", "Contact"),
    ("Get support", "Contact us"),
    ("Faq’s", "FAQs"),
    ("Faq's", "FAQs"),
    ("Speakers", "Programmes"),
    ("Schedule", "Programmes"),
    ("Gallery", "Gallery"),
    ("Tickets", "Get involved"),
    ("Facebook", "Instagram"),
    ("YouTube", "LinkedIn"),
    ("Early Bird", "Open now"),
    ("Single admission", "Free to join"),
    ("Features:", "Includes:"),
    ("Events organized", "Conference signups"),
    ("Attendees served", "Hackathon participants"),
    ("Industry speakers", "Internship places"),
    ("Global industry speakers", "Career conferences"),
    ("event management", "Faithful Talent"),
    ("Premium event experience", "Hackathons"),
    ("Call to action", "Next step"),
    ("Become a partner", "Partner with us"),
    ("Become a Sponsor", "Sponsor a programme"),
    ("Attendance Type", "How can we help"),
    ("Full name", "Your name"),
    ("Your Email", "Email address"),
    ("Phone Number", "University or city"),
    ("Messages", "Message"),
    ("Submit", "Send message"),
    ("Location", "Reach us"),
    ("Home", "Home"),
    ("Privacy Policy", "Privacy"),
    ("Terms and Conditions", "Terms"),
]

# Nav / route label map in data arrays
NAV = [
    ('description: "Schedule"', 'description: "Programmes"'),
    ('description: "Speakers"', 'description: "Our story"'),
    ('description: "Get ticket"', 'description: "Get involved"'),
    ('description: "Ticket"', 'description: "Get involved"'),
    ('description: "About"', 'description: "Our story"'),
    ('href: "/ticket"', 'href: "/ticket"'),  # keep route; label already handled
    ('href: "https://www.instagram.com/', 'href: "https://www.instagram.com/'),
]

# Social / contact URL swaps
URLS = [
    (
        'https://www.google.com/maps/place/United+States/@40.0299481,-106.6636037,9.17z/data=!4m6!3m5!1s0x54eab584e432360b:0x1c3bb99243deb742!8m2!3d38.7945952!4d-106.5348379!16zL20vMDljN3cw?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D',
        "https://ihsaan.network/",
    ),
    ("https://www.facebook.com/", "https://www.instagram.com/ihsaan.network/"),
    ("https://www.youtube.com/", "https://linkedin.com/company/ihsaan-network/"),
    ("https://www.linkedin.com/", "https://linkedin.com/company/ihsaan-network/"),
    ("https://www.instagram.com/", "https://www.instagram.com/ihsaan.network/"),
    ("mailto:info@evenco.com", "mailto:ihsaan@fosis.org.uk"),
    ("mailto:info@Evenco.com", "mailto:ihsaan@fosis.org.uk"),
]

# Hero headline word chips (FeatureCard_data style)
HERO_CHIPS = [
    ('{ title: "Global" }', '{ title: "Elevating" }'),
    ('{ title: "AI" }', '{ title: "Faith-Driven" }'),
    ('{ title: "Summit" }', '{ title: "Talent" }'),
    ('{ title: "2026" }', '{ title: "IHSAAN" }'),
]

# Media: map heaviest hero/gallery images onto IHSAAN assets
# Keep srcset simple: single IHSAAN file repeated.
MEDIA_SWAPS = {
    # common hero / speaker photos
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
    "/assets/cloned/images/f22422f6deed.png": "/media/photo-collage.jpg",
    "/assets/cloned/images/8ab42f227609.png": "/media/photo-collage.jpg",
    "/assets/cloned/images/da1053bdbc84.png": "/media/impact.jpg",
    "/assets/cloned/images/f16afdf5bce9.png": "/media/impact.jpg",
    "/assets/cloned/images/f074de5334dd.png": "/media/impact.jpg",
    "/assets/cloned/images/efd6ee51acaf.png": "/media/faithful-talent.jpg",
    "/assets/cloned/images/c59e7c4f0ad5.png": "/media/faithful-talent.jpg",
    "/assets/cloned/images/62358e47698c.png": "/media/faithful-talent.jpg",
    "/assets/cloned/images/b2a19bcd14bb.png": "/media/blue-logo.webp",
    "/assets/cloned/images/9f72f3de7a6b.jpg": "/media/career-conference.jpg",
    "/assets/cloned/images/8c63931a877a.jpg": "/media/impact-wide.jpg",
    "/assets/cloned/images/c25a640cbc73.jpg": "/media/impact-wide.jpg",
    "/assets/cloned/images/d548f1d8960a.jpg": "/media/impact-wide.jpg",
    # icons / logos used as brand marks
    "/assets/cloned/images/6174923823c2.png": "/blue-icon.svg",
    "/assets/cloned/images/2a0e057e7e5f.png": "/icon-dark.svg",
    "/assets/cloned/images/d3b9363dea79.png": "/blue-icon.svg",
}


def patch_css(text: str) -> str:
    for old, new in TOKEN_REPLACEMENTS.items():
        if old not in text:
            # try flexible whitespace
            pass
        text = text.replace(old, new)
    text = FONT_FACE_STRIP.sub("", text)
    # leftover family name references in @font-face already stripped; also rewrite bare names
    text = text.replace("Mona Sans", "Poppins")
    text = text.replace("Krona One", "Poppins")
    text = text.replace("Google Sans", "Poppins")
    # inject Poppins note if missing
    if "/* IHSAAN brand tokens" not in text:
        text = text.replace(
            ":root {",
            ":root {\n  /* IHSAAN brand tokens applied over Evenco capture */",
            1,
        )
    return text


def patch_layout(text: str) -> str:
    text = re.sub(
        r'"title":\s*"[^"]*"',
        '"title": "IHSAAN | Elevating Faith-Driven Talent"',
        text,
        count=3,
    )
    text = re.sub(
        r'"description":\s*"[^"]*"',
        '"description": "IHSAAN empowers Muslim students with opportunities, mentorship, and networks for God-conscious careers."',
        text,
        count=4,
    )
    # force local OG image
    text = re.sub(
        r'https://framerusercontent\.com/images/[^"]+',
        "/media/hero-poster.webp",
        text,
    )
    # inject Poppins via next/font if not present
    if "Poppins" not in text:
        text = text.replace(
            'import "./globals.css";\nimport type { ReactNode } from "react";\nimport { SITE_ORIGIN } from "../lib/site";',
            'import "./globals.css";\nimport type { ReactNode } from "react";\nimport { Poppins } from "next/font/google";\nimport { SITE_ORIGIN } from "../lib/site";\n\nconst poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });',
        )
        text = text.replace(
            '<html lang={"en"}>',
            '<html lang="en-GB" className={poppins.variable}>',
        )
        text = text.replace(
            'className="cn0"',
            'className={`cn0 ${poppins.className}`}',
        )
    return text


def patch_tsx(text: str) -> str:
    for old, new in sorted(MEDIA_SWAPS.items(), key=lambda x: -len(x[0])):
        text = text.replace(old, new)
    for old, new in URLS:
        text = text.replace(old, new)
    for old, new in HERO_CHIPS:
        text = text.replace(old, new)
    for old, new in NAV:
        text = text.replace(old, new)
    for old, new in COPY:
        text = text.replace(old, new)
    # hero word stack leftovers
    text = text.replace(">Global<", ">Elevating<")
    text = text.replace(">AI<", ">Faith-Driven<")
    text = text.replace(">Summit<", ">Talent<")
    # framer name attrs
    text = text.replace('data-framer-name="Evenco"', 'data-framer-name="IHSAAN"')
    text = text.replace('data-framer-name="EVENC O"', 'data-framer-name="IHSAAN"')
    return text


def main() -> None:
    css = CSS.read_text(encoding="utf-8")
    CSS.write_text(patch_css(css), encoding="utf-8")
    print("patched", CSS.relative_to(ROOT))

    layout = LAYOUT.read_text(encoding="utf-8")
    LAYOUT.write_text(patch_layout(layout), encoding="utf-8")
    print("patched", LAYOUT.relative_to(ROOT))

    n = 0
    for path in SRC.rglob("*.tsx"):
        before = path.read_text(encoding="utf-8")
        after = patch_tsx(before)
        if after != before:
            path.write_text(after, encoding="utf-8")
            n += 1
            print("patched", path.relative_to(ROOT))
    print(f"done: {n} tsx files")


if __name__ == "__main__":
    main()
