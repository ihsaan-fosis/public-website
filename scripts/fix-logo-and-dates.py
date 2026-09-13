#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"

PARTNERS = sorted(
    f"/partners/{p.name}"
    for p in (ROOT / "public" / "partners").iterdir()
    if p.is_file()
)
BRAND_LOGO = "/media/logo.webp"
BRAND_LOGO_WHITE = "/media/white-logo.webp"
BLUE_LOGO = "/media/blue-logo.webp"


def patch_file(text: str) -> str:
    # Nav / footer Evenco wordmark SVGs
    text = text.replace("/assets/cloned/svg/ed880298b7fa.svg", BRAND_LOGO)
    text = text.replace("/assets/cloned/svg/f25db531fe83.svg", BLUE_LOGO)
    text = text.replace("/assets/cloned/svg/e429817810ea.svg", BRAND_LOGO_WHITE)

    # Remaining cloned SVGs -> cycle partners (sponsor strip etc.)
    remaining = sorted(set(re.findall(r"/assets/cloned/svg/[A-Za-z0-9_.\\-]+", text)))
    for i, old in enumerate(remaining):
        # clean escaped backslashes from weird matches
        clean = old.replace("\\", "")
        if clean.startswith("/assets/cloned/svg/"):
            text = text.replace(old, PARTNERS[i % len(PARTNERS)])
            text = text.replace(clean, PARTNERS[i % len(PARTNERS)])

    # Hero event date chips
    text = text.replace("{2026}", "{IHSAAN}")
    text = text.replace(">2026<", ">IHSAAN<")
    text = text.replace('{"2026"}', '{"IHSAAN"}')
    text = text.replace("07 - 10", "UK · IE")
    text = text.replace("07-10,Sep", "UK · IE")
    text = text.replace("7-10,Sep", "UK · IE")
    text = text.replace("September , 2026", "Year-round programmes")
    text = text.replace("September, 2026", "Year-round programmes")
    text = text.replace("7 September", "Ongoing")
    text = text.replace("9:40 pm", "Open")

    return text


def main() -> None:
    for path in SRC.rglob("*.tsx"):
        before = path.read_text(encoding="utf-8")
        after = patch_file(before)
        if after != before:
            path.write_text(after, encoding="utf-8")
            print("patched", path.relative_to(ROOT))

    left = []
    for path in SRC.rglob("*.tsx"):
        t = path.read_text(encoding="utf-8")
        if "/assets/cloned/svg/" in t or "ed880298b7fa" in t:
            left.append(str(path))
    print("svg left", left)


if __name__ == "__main__":
    main()
