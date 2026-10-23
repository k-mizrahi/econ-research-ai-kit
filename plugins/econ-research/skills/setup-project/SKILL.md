---
name: setup-project
description: Set up the research-workflow scaffolding in the current project — a CLAUDE.md in the standard section order, the plans rule, a key-decisions register, results log, dropped-analyses doc, backlog, handoffs/, a skill-bindings file, the user's writing-style profile if none exists yet, and optionally the estimation conventions. Never overwrites existing files. Use when the user asks to set up, adopt, or bootstrap the workflow in a project.
argument-hint: "[project name]"
disable-model-invocation: true
---

# Set up a project for the research workflow

The other skills in this kit read and write a small set of **documents of record**.
This skill creates the missing ones, fills what it can verify, and leaves everything
else as a clearly marked stub. Run it once per project; re-running is safe.

## Procedure

1. **Inventory.** In the project root, list what already exists: `CLAUDE.md`,
   `docs/`, `plans/`, `handoffs/`, `.claude/rules/`, and any decisions log, results
   log, or backlog under another name. Existing documents win: if the project keeps a
   decisions log as `notes/decisions.md`, record that path in the bindings (step 4)
   instead of creating a second register.

2. **Scaffold.** Run `bash ${CLAUDE_SKILL_DIR}/scripts/scaffold.sh <project root> "<Project Name>"`
   and show its output. It copies only what is missing:

   | File | What it is | Written by | Changes |
   |---|---|---|---|
   | `CLAUDE.md` | project instructions, in the standard section order | you, `refresh` | living (Status stamped by `refresh`) |
   | `.claude/rules/plans.md` | plans are dated, append-only documents | — | rule |
   | `.claude/rules/skill-bindings.md` | paths and settings the skills look up | you | living |
   | `docs/key-decisions.md` | ratified and provisional decisions | `log-decision` | append-only |
   | `docs/results-log.md` | numbers of record | `log-result` | append-only |
   | `docs/dropped-analyses.md` | approaches abandoned, and why | `log-decision`, you | append-only |
   | `docs/backlog.md` | open work with IDs | `sync-state`, `write-plan` | living |
   | `plans/`, `handoffs/` | dated plans; session handoffs | `write-plan`; `handoff` | append-only; immutable |

3. **Fill CLAUDE.md from verifiable sources only.** For a newly created CLAUDE.md, fill
   the one-line description, Architecture, and Commands from the README, manifests
   (`pyproject.toml`, `requirements.txt`, `Makefile`, a Stata master `.do` file, an R
   project), and the entry-point scripts. Leave a section as its comment stub when
   nothing verifiable exists. Never invent commands, results, or status. For an
   existing CLAUDE.md, compare its sections with `assets/CLAUDE.md.tmpl` and report
   which are missing — do not restructure it. If the project would benefit, offer the
   optional sections in `assets/` (`docs-as-source-of-truth.md`,
   `session-handoff.md`, `output-conventions.md`).

4. **Bindings.** Fill `.claude/rules/skill-bindings.md` with the project's real paths
   (results log, decision register, output dirs of record, drafts and figures dirs,
   LaTeX recipe). Leave lines blank where the project has nothing yet.

5. **Conventions.** Ask once whether to add the estimation and research-process
   conventions (`assets/conventions.md`: no log(1+x) main specs, two-group event-study
   spec, clustering, seeds, fail-loud code, merge checks, decision recording). Skip
   this if `~/.claude/CLAUDE.md` already contains the `econ-research:conventions`
   marker — the conventions then apply in every project already. Otherwise re-run the
   script with `--conventions`; it appends the block once.

6. **Writing style (once per user).** The writing and slide skills draft to the user's
   style profile. If no exemplar notes exist yet (see
   `${CLAUDE_SKILL_DIR}/../../writing/exemplar-schema.md` § Where notes live), run
   `add-exemplars` now as part of setup: it asks for 2–5 papers the user likes for
   their writing, one or two of their own past decks, and optionally talks they like.
   If the user wants to do it later, say that the writing skills will stop and ask
   before their first draft. Skip this step when notes already exist.

7. **Report.** List what was created, which CLAUDE.md sections are filled versus
   stubs, and the next steps: plan the first piece of work with `write-plan`, record
   decisions with `log-decision`, log results with `log-result`, end each session
   with `handoff`. Do not commit.

## Rules

- Never overwrite or restructure an existing file; report instead.
- Nothing in CLAUDE.md that cannot be verified in the repository.
- Never read or copy data files, `.env` files, or credentials while inventorying.
