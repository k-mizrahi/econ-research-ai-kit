#!/usr/bin/env python3
"""Quote guard: shipped Markdown may quote published work only briefly.

Counts quoted spans per line (straight quotes paired in order, curly quotes
matched), ignoring spans under 20 characters. Fails a file whose longest quote
exceeds MAX_QUOTE characters or whose quoted share exceeds MAX_SHARE.

Usage: quotes.py <dir> [<dir> ...]
"""
import pathlib
import re
import sys

MAX_QUOTE = 300
MAX_SHARE = 0.15


def quoted_spans(text):
    spans = []
    for line in text.splitlines():
        spans += [m.group(1) for m in re.finditer("“(.+?)”", line)]
        marks = [i for i, c in enumerate(line) if c == '"']
        for a, b in zip(marks[0::2], marks[1::2]):
            spans.append(line[a + 1:b])
    return [s for s in spans if len(s) >= 20]


def main(dirs):
    failed = 0
    for directory in dirs:
        for path in sorted(pathlib.Path(directory).rglob("*.md")):
            text = path.read_text(encoding="utf-8")
            spans = quoted_spans(text)
            longest = max((len(s) for s in spans), default=0)
            share = sum(len(s) for s in spans) / max(len(text), 1)
            if longest > MAX_QUOTE or share > MAX_SHARE:
                failed += 1
                print("FAIL %s: longest quote %d chars, quoted share %.0f%%" % (path, longest, 100 * share))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
