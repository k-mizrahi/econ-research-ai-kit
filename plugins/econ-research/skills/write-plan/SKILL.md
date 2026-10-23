---
name: write-plan
description: Draft a dated, living plan for the next piece of work — from a backlog item, a new idea, or feedback — checked against the decisions register and dropped analyses, with phases, expected outputs, decision rules written before any results, and a Results section that grows as the work proceeds. Use when the user wants to plan an analysis, an extension, a robustness round, or a response to feedback.
argument-hint: "[backlog ID, idea, or feedback doc]"
---

# Write a plan

A plan turns a backlog item, a new idea, or a round of feedback into work that leaves a
record. It is a living document: results are appended under each phase as the work
happens, and nothing earlier is overwritten (the project's `.claude/rules/plans.md`).

## Before drafting

1. **Read the record.** The project's `CLAUDE.md` (status, conventions, canonical
   values), the latest handoff, the decision register(s), the dropped-analyses doc,
   the backlog, and the results-log entries the work builds on. Paths come from the
   project's `CLAUDE.md` and `.claude/rules/skill-bindings.md`.
2. **Pin the source.** A backlog ID, a feedback document and the point it raises, or
   the idea in the user's words. If the idea is vague, ask which decision the work
   should inform before drafting.
3. **Check for collisions.** If a step repeats a dropped analysis or reopens a settled
   decision, say so first and ask whether something new justifies revisiting it. A
   reversal is recorded with `log-decision`, never made silently inside a plan.
4. **New definitions first.** A new sample screen, outcome, treatment definition, or
   timing rule goes through `design-check` before it enters the plan; the plan records
   the outcome.

## The plan file

Write `plans/{goal}_{YYYY-MM-DD}.md`: a short kebab-case goal and today's date, in the
plans directory the project uses. Sections, in order:

- **Status** — one line: draft, active, or closed (with date). Updated as phases close.
- **Goal** — the question in one sentence and the decision it will inform.
- **Source** — the backlog ID, feedback point, or idea; links to the decisions and
  results it builds on.
- **Phases** — numbered. Each names the script or task, its inputs, the output it
  produces (path), and what counts as done.
- **Decision rules** — written before any results exist: which result would change
  the plan or the paper's claims, and which would stop the work.
- **Out of scope** — what this plan deliberately leaves alone.
- **Results** — empty at first. As each phase completes, append what actually happened
  under it: output paths, counts, surprises, and pointers to the results log.

## After drafting

- Show the plan and wait for the user's go before running anything.
- Point the backlog item at the plan (a pointer, not a copy of its contents).
- As phases complete: append results under the phase; `log-result` for numbers of
  record; `log-decision` for anything ratified; leftovers go to the backlog with an ID.

## Rules

- Plans point to numbers in the results log; they never restate numbers from memory.
- Append; never overwrite or reword an earlier section.
- One plan per goal. A changed goal is a new dated plan that links the old one.
