# CLAUDE.md standard

Two layers. Don't cram cross-project conventions into a project file, or vice versa.

## Layer 1 — user-level `~/.claude/CLAUDE.md`

Conventions that hold across **every** project (estimation rules, process rules).
Claude Code loads this file in every session, so a project file should **not**
repeat them. Keeping them here is the fix for "a convention that lived in one
project's rules got violated in the next repo."

## Layer 2 — each project's own `<project>/CLAUDE.md`

Project-specific structure. Every project file should have these sections, in this
order (drop the boilerplate line "This file provides guidance to Claude Code…" — it
adds nothing):

| # | Section | Purpose |
|---|---|---|
| 1 | **Title + one-liner** | `# <Project>` + 1–2 sentences: what it is, who/what it's for. |
| 2 | **Read first / source of truth** | Authoritative specs/docs; "read the latest `handoffs/` first" if used. |
| 3 | **Architecture** | The moving parts that span files — what an agent must not break. |
| 4 | **Commands** | Exact run / test / deploy commands. |
| 5 | **Conventions & invariants** | Canonical values + load-bearing rules + explicit "do NOT simplify X". |
| 6 | **Key decisions — don't re-litigate** | Settled choices + dropped approaches, so they aren't re-suggested. |
| 7 | **Status / where we stand** | Current state, or a pointer to the latest handoff. Carries the `Last refresh: YYYY-MM-DD @ <sha>` stamp the refresh skill maintains. |
| 8 | **Config pointer** *(optional)* | A breadcrumb to the personal config repo the project follows, if any. |

**As-needed (not every project):** a repository layout / project map, and a
data-pipeline overview (good for data/analysis repos; noise for small apps).

**Scale to the project.** A 60-line app CLAUDE.md and a 245-line live-system one are
both fine — the standard is about *which sections exist and in what order*, not length.
