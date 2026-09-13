#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src"


def patch(text: str) -> str:
    # Brand lockup Even + co -> IHSA + AN
    text = re.sub(r'\{\s*"Even"\s*\}', '{"IHSA"}', text)
    text = re.sub(
        r'(\{"IHSA"\}[\s\S]{0,400}?<span[^>]*>\s*)\{\s*"co"\s*\}',
        r'\1{"AN"}',
        text,
        count=8,
    )
    # Fallback: any remaining accent "co" immediately after IHSA brand block
    text = re.sub(
        r'(\{"IHSA"\}[\s\S]{0,200}?)\{"co"\}',
        r'\1{"AN"}',
        text,
        count=8,
    )

    text = text.replace('{"Your AI journey "}', '{"Your career journey "}')

    pairs = [
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
        ('title: "Can I transfer my ticket?"', 'title: "Who is IHSAAN for?"'),
        ('title: "Are meals included?"', 'title: "Are programmes free?"'),
        ('title: "Will sessions be recorded?"', 'title: "Do you work outside London?"'),
        ('title: "Is parking available?"', 'title: "How do I volunteer?"'),
        ('title: "Are group discounts offered?"', 'title: "Can employers partner?"'),
        # hero date / summit leftovers if still present as plain text
        ('{"Global"}', '{"Elevating"}'),
        ('{"AI"}', '{"Faith-Driven"}'),
        ('{"Summit"}', '{"Talent"}'),
        ('{"2026"}', '{"IHSAAN"}'),
    ]
    for a, b in pairs:
        text = text.replace(a, b)
    return text


def main() -> None:
    for path in ROOT.rglob("*.tsx"):
        before = path.read_text(encoding="utf-8")
        after = patch(before)
        if after != before:
            path.write_text(after, encoding="utf-8")
            print("patched", path.relative_to(ROOT.parent))

    # report leftovers
    for path in ROOT.rglob("*.tsx"):
        t = path.read_text(encoding="utf-8")
        if "Even" in t and "IHSA" not in t[max(0, t.find("Even") - 20) : t.find("Even") + 40]:
            pass
        if re.search(r'\{\s*"Even"\s*\}', t) or re.search(r'\{\s*"co"\s*\}', t):
            print("LEFT lockup", path)
        if "Evenco" in t or "Your AI" in t:
            print("LEFT brand", path)


if __name__ == "__main__":
    main()
