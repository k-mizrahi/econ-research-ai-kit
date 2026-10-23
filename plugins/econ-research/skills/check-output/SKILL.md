---
name: check-output
description: Verify that numbers cited in a draft (paper, slides, notes) match current output files — catches stale results before submission
argument-hint: "[path_to_draft]"
---

Verify that quantitative claims in a draft document match the latest data outputs. Ask for the draft file path if not provided.

## Step 0 — Resolve the project's bindings

Read the project's `CLAUDE.md` (and any `.claude/rules/skill-bindings.md`) for: the output dirs that are the record (and any that are explicitly NOT — legacy or archived stacks must never be used as a source), the routed results log(s), the run manifest and where the canonical flag set is defined, and where verification reports go.

## Steps

1. **Read the draft** — scan for all concrete numbers: coefficients, t-stats, p-values, percentages, sample sizes, counts, date ranges.
2. **Catalog each claim** — for each number, note:
   - The exact text passage containing it
   - What it claims to measure (e.g., "effect on employment per year", "N units", "first-stage F")
3. **Locate the source** — find the output file that should contain the ground-truth value. Check:
   - the project's output dirs of record for summary tables / results CSVs
   - the run manifest, if the project keeps one
   - the routed results log for logged headline numbers
   - Any path explicitly referenced in the draft

   When the project keeps a run manifest, also confirm the output was produced under the canonical flag set. **Read the canonical flag set where the project defines it, never from a copy** (including one in a bindings file). If a manifest row disagrees, that is a question for the user, not a mismatch to report.
4. **Read and compare** — load the source file and extract the matching value. Report:
   - MATCH: draft value equals source value
   - MISMATCH: draft says X, source says Y (flag the file and line)
   - UNVERIFIABLE: no source file found for this claim
5. **Output a verification report** as a markdown table:

```
| Draft location | Claim | Source file | Source value | Status |
|---|---|---|---|---|
| p.3 line 12 | "effect = 0.12" | main_results.csv | 0.118 | MATCH |
| p.5 line 4 | "N = 48,000" | analysis_panel.parquet | 48,912 | MISMATCH |
```

6. **Save the report** to `<project csv output dir>/output_verification_<date>.csv` (default `output/csv/` if the project names none).

## Why this skill matters

Under a single-source-of-numbers rule, numbers live only in the results logs + the generating CSV + the current summary of record.
**Slides and drafts are the one exception** — they must carry numbers inline,
so they are the one place a superseded number can still survive. This skill is
their only guard. Run it before any talk or circulated draft.

## Rules
- Read source files directly — never trust cached or remembered values
- Flag any number that rounds differently than the source (e.g., draft says 48K but source is 48,912)
- For parquet files, load only the needed columns
- Do not modify the draft — only report findings
- If a claim references a figure, check whether the figure file exists and note its modification date relative to the source data
