#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src"


def fix_text(text: str) -> str:
    # Any maskImage assignment that contains url(...) -> template literal form
    def repl(m: re.Match[str]) -> str:
        chunk = m.group(0)
        paths = re.findall(r"/[A-Za-z0-9_./-]+\.(?:webp|png|jpg|jpeg|svg)", chunk)
        if not paths:
            return 'maskImage: "none"'
        return f"maskImage: `url('{paths[0]}')`"

    text = re.sub(r"maskImage:\s*(?:`[^`]*`|\"[^\"]*\"|'[^']*')", repl, text)
    # also object form: maskImage: { ... } leave alone if already object with url
    text = re.sub(
        r'maskImage:\s*\{\s*[^}]*\}',
        lambda m: repl(m) if "url" in m.group(0) else m.group(0),
        text,
    )
    return text


def main() -> None:
    for path in ROOT.rglob("*.tsx"):
        before = path.read_text(encoding="utf-8")
        after = fix_text(before)
        if after != before:
            path.write_text(after, encoding="utf-8")
            print("fixed", path)


if __name__ == "__main__":
    main()
