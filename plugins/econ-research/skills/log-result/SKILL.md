---
name: log-result
description: Append a result entry to the project's routed results log (as the project's CLAUDE.md names it) — called automatically after any analysis produces new findings
argument-hint: "[project] [brief description of result]"
---

Append a new entry to the results log the work routes to. Resolve the log(s) and the routing rule from the project's `CLAUDE.md` (and any `.claude/rules/skill-bindings.md`) — multi-paper projects typically keep one log per paper plus a shared log for data/infrastructure results. This skill is invoked automatically after any analysis produces quantitative results — you do NOT need to be asked.

## When to invoke (automatic triggers)

Run this workflow after ANY of these:
- Running a regression or event study, whether through a project skill or ad hoc
- Completing a phase of a plan
- Producing a new results CSV
- Running diagnostics that yield key numbers (F-stats, match rates, sample sizes)

## Entry format

Append exactly this block to the routed log:

```
### [YYYY-MM-DD] Project — Brief description
- **Script/source:** `path/to/script.py` or ad-hoc
- **Output:** `path/to/output_file.csv`
- **Key numbers:** coefficient = X, SE = Y, N = Z (or whatever the salient quantities are)
- **Specification:** formula / sample / FEs / clustering (if regression)
- **Note:** one sentence on anything surprising or worth flagging
```

## Rules
- Always append — never overwrite, move, or reorganize existing entries (including entries left in an older log by a past reorganization)
- Keep each entry to 3–6 lines. This is a reference log, not an analysis narrative.
- Use the exact numbers from the output — do not round or interpret
- **Never create a missing log** when the project's CLAUDE.md names it — a missing named log means a wrong path. Stop and say so. If the project has no results log at all, ask before creating one.
- Logs are flat chronological (append at the end). In a shared log, prefix the title `Shared — …` and add `- **Affects:** <papers>` when it changes what a paper's numbers mean (then add a one-line pointer to that paper's status doc).
- Do NOT log intermediate data-cleaning steps (row counts from merges, etc.) — only substantive findings
