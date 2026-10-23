---
name: sync-state
description: End-of-session pointer reconciliation — sync the repository's state-of-record documents so the next session starts from correct pointers; optionally mirror headline changes into persistent agent memory
argument-hint: "[optional: one-line summary of what changed this session]"
---

Run at the END of a work session. This workflow makes sure the documents the NEXT
session reads first are not lying about the current state. **Documentation fan-out
— stale pointers, plans two generations behind, skills that prescribe retired code —
is the failure mode this skill exists to prevent.** The typical symptom: a
document or skill that still names a retired specification as the primary one.

Use a mechanical pass for routine edits; escalate reasoning only if a document
conflict needs a judgment call.

This skill writes no new documents. `handoff` writes a session narrative;
`project-summary` writes a dated immutable snapshot; `refresh` is the only
skill allowed to rewrite living docs wholesale.

## Step 0 — Resolve the documents of record

Read the project's `CLAUDE.md` (and any `.claude/rules/skill-bindings.md`) for the
concrete files behind each slot below, the active code dirs, the list of retired
measures/patterns, the run manifest + canonical-flag-set location, and any
project-specific checks. Skip a slot the project doesn't have.

## Documents of record (sync order)

1. **The backlog register** (one ID counter, scope column if the project has one).
   - Every "next step" produced this session lands here with an ID, maps to an
     existing ID, or is explicitly marked dropped.
   - Update `Status` and `Last touched` on every item the session moved.
   - **Grooming:** flag any item untouched for 5 sessions for an explicit
     keep/kill call. Record the verdict in the row, dated.
2. **The live dated plan for the work done** (`{goal}_{YYYY-MM-DD}.md`)
   - Update the **Status** header — a status header frozen at creation date is the
     single most common stale pointer.
   - Append the phase memo; never overwrite an earlier one.
3. **Cross-paper / project map** (if any)
   - Update the "Last updated" stamp and any section whose design, gates, scripts,
     or status changed. Pointers only — see the numbers rule below.
4. **Master plans** for any paper the session touched
   - Update the "Last updated" line; move superseded content under the dated
     **History** heading (append, never delete).
5. **The status section(s) of `CLAUDE.md`** — per-paper files for each paper touched, the root file only for shared changes
   - Summaries of record, live plan pointers, and any newly ratified canonical
     measure. A shared decision/result that affects a paper gets a pointer line in that paper's file. This is the first thing every session reads — it must be right.
6. **Optional persistent agent memory**
   - Mirror changed design decisions or pointers, not numbers. Repository documents
     remain authoritative; lack of persistent memory never blocks the workflow.

## The numbers rule

Full-precision numbers live in the routed results log and the generating CSV.
The current dated summary of record may carry rounded headlines. **Every document
you touch in this workflow carries pointers, not numbers.** If a sync would
require copying a coefficient into a plan or the backlog, write the pointer instead.

## Consistency checks (report, don't silently fix)

- **Pointer audit:** every "summary of record", "current tracker", "latest handoff",
  and "where to look first" reference in the `CLAUDE.md` files, the project map, and
  the live plans — does the named file exist, and is it the newest of its kind?
- **Retired-measure sweep:** grep the active docs and code dirs for any measure or
  pattern retired by a decision in the project's registers (the project's bindings
  list the current set). A hit in an active doc is a live bug.
- **Skill correctness (not just path existence):** for each project skill
  (`.claude/skills/*/SKILL.md`) and each global skill's project bindings,
  check that every file it names exists **and is what the instruction claims it is**.
  A skill that prescribes a retired script, a non-executable helper, or a superseded
  flag set is a guaranteed burned session for whoever invokes it.
- **Convention audit:** run the project's spec/convention audit skill if it has one
  (log1p, estimator import form, try/except around estimation, per-script flag copies).
- **Decision completeness:** every decision ratified this session has a register
  row *with its enforcement-sweep hit list*, written this session. A ratified
  decision living only in a commit message is the failure this check exists to stop.
- **Run manifest:** if the project keeps one, its latest rows vs. the canonical
  flag set — divergence means an undocumented rerun.
- **Push status:** `git status -sb`; report ahead/behind counts (unpushed commits
  are a silent-loss risk).

## Rules

- Append, never overwrite: History headings and phase memos only grow.
- No number goes into a document without a source (results-log entry, script
  output, or manifest row) produced this session or earlier.
- If nothing changed this session, say so and touch nothing — a no-op sync is a
  valid outcome.
