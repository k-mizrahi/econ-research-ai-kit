#!/usr/bin/env python3
"""Check SKILL.md frontmatter in one or more skills directories.

Each skill must open with a frontmatter block that has a one-line `description`,
a `name` equal to its directory name, and only keys Claude Code recognizes
(Claude Code silently ignores unknown keys, so a typo would otherwise go unseen).

Usage: check_skills.py <skills dir> [<skills dir> ...]
Prints one line per skill; exits 1 if any skill fails.
"""
import pathlib
import re
import sys

KNOWN_KEYS = {
    "name", "description", "when_to_use", "argument-hint", "arguments",
    "disable-model-invocation", "user-invocable", "allowed-tools",
    "disallowed-tools", "model", "effort", "context", "agent", "background",
    "hooks", "paths", "shell", "metadata", "license", "compatibility",
}


def frontmatter(text):
    if not text.startswith("---\n"):
        return None
    end = text.find("\n---\n", 4)
    if end == -1:
        return None
    keys = {}
    for line in text[4:end].splitlines():
        match = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", line)
        if match:
            keys[match.group(1)] = match.group(2).strip()
    return keys


def problems_for(skill_md):
    fm = frontmatter(skill_md.read_text(encoding="utf-8"))
    if fm is None:
        return ["missing or unterminated frontmatter"]
    problems = []
    if fm.get("name") != skill_md.parent.name:
        problems.append("name %r does not match directory %r" % (fm.get("name"), skill_md.parent.name))
    if fm.get("description", "") in ("", ">", "|", ">-", "|-"):
        problems.append("description missing or not on one line")
    unknown = sorted(set(fm) - KNOWN_KEYS)
    if unknown:
        problems.append("unknown keys: " + ", ".join(unknown))
    return problems


def main(dirs):
    failed = 0
    for directory in dirs:
        for skill_md in sorted(pathlib.Path(directory).glob("*/SKILL.md")):
            problems = problems_for(skill_md)
            if problems:
                failed += 1
                print("  FAIL skill %s: %s" % (skill_md.parent.name, "; ".join(problems)))
            else:
                print("  OK   skill %s" % skill_md.parent.name)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
