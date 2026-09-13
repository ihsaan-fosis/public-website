#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
ORIG = Path("/Users/mikhail/tmp/ditto.site/compiler/output/framer/app/src/app")
SRC = REPO / "src"


def clean_masks(text: str) -> str:
    text = re.sub(r'maskImage:\s*"none"/[^"]*"\)"', 'maskImage: "none"', text)
    text = re.sub(r'maskImage:\s*"none"[^,}]*', 'maskImage: "none"', text)
    text = re.sub(r"maskImage:\s*`url\([^`]*`[^,}]*", 'maskImage: "none"', text)
    text = re.sub(r'maskImage:\s*"url\(\\\\?"[^"]*"\\?"\)"', 'maskImage: "none"', text)
    text = re.sub(r'maskImage:\s*"url\([^"]*\)"', 'maskImage: "none"', text)
    text = re.sub(
        r'style:\s*\{\s*maskImage:\s*"[^"]+"\s*\}',
        'style: { maskImage: "none" }',
        text,
    )
    return text


def restore_logo_data(cur: str, orig: str) -> str:
    m = re.search(r"const Logo_data = \[[\s\S]*?\n\];", orig)
    if not m:
        return cur
    logo = m.group(0)
    img_map = {
        "/assets/cloned/images/8d668b4e57d9.jpg": "/media/career-conference.jpg",
        "/assets/cloned/images/661587e22e5f.jpg": "/media/career-conference.jpg",
        "/assets/cloned/images/238efbee89ae.jpg": "/media/career-conference.jpg",
        "/assets/cloned/images/08f2b9f70c48.jpg": "/media/photo-collage.jpg",
        "/assets/cloned/images/94d268b7f665.jpg": "/media/photo-collage.jpg",
        "/assets/cloned/images/f32a27f379e3.jpg": "/media/photo-collage.jpg",
    }
    for a, b in img_map.items():
        logo = logo.replace(a, b)
    logo = re.sub(
        r'style:\s*\{\s*maskImage:\s*"[^"]+"\s*\}',
        'style: { maskImage: "none" }',
        logo,
    )
    return re.sub(r"const Logo_data = \[[\s\S]*?\n\];", logo, cur, count=1)


def main() -> None:
    # home page special restore
    home = SRC / "app" / "page.tsx"
    orig_home = (ORIG / "page.tsx").read_text(encoding="utf-8")
    cur = home.read_text(encoding="utf-8")
    cur = restore_logo_data(cur, orig_home)
    cur = clean_masks(cur)
    home.write_text(cur, encoding="utf-8")
    print("home repaired")

    for path in SRC.rglob("*.tsx"):
        before = path.read_text(encoding="utf-8")
        after = clean_masks(before)
        if after != before:
            path.write_text(after, encoding="utf-8")
            print("cleaned", path.relative_to(REPO))

    lines = home.read_text(encoding="utf-8").splitlines()
    for i in range(36, 42):
        print(f"{i+1}: {lines[i][:180]}")


if __name__ == "__main__":
    main()
