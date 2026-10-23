# Skill bindings — {{PROJECT_NAME}}

Project-specific values the econ-research skills look up here (and in `CLAUDE.md`)
before falling back to their defaults. Fill in what the project has; leave a line
blank or delete it when it does not apply. Paths are relative to the repo root.
Skills look for a section named after themselves (e.g. `## write-intro`) for
per-skill overrides.

## Documents of record

- Decision register(s): `docs/key-decisions.md` — routing rule if there are several (e.g. one per paper plus a shared one):
- Results log(s): `docs/results-log.md` — routing rule if there are several:
- Dropped-analyses doc: `docs/dropped-analyses.md`
- Backlog: `docs/backlog.md` — ID scheme: `B<n>`
- Plans dir: `plans/` · Handoffs dir: `handoffs/` · Summaries dir: `docs/`
- Run manifest (if outputs are logged per run):
- Canonical flag set (where the project defines it — skills read it there, never from a copy):

## Code and data

- Active code dirs (swept by `log-decision`, `blast-radius`, `sync-state`):
- Archived / dead-code dirs to skip:
- Output dirs of record (`check-output` sources): `output/`
- Output dirs that are NOT of record (legacy stacks never used as a source):
- Figures dir:
- Interpreter: `./.venv/bin/python`
- Retired measures and banned patterns (swept by `sync-state`):
- Literature dir (`read-paper`): `papers/`

## writing

Used by all `write-*` skills; add a `## write-<section>` heading for per-skill overrides.

- Exemplar notes dir (default `~/.config/econ-research/exemplars/`):
- Drafts dir: `drafts/` · Slides dir: `slides/` · One-pager dir: `onepager/`
- LaTeX recipe (default: any TeX distribution on PATH):
- Facts register / narrative constraints of record (claims the text may make):
- Gated / do-not-cite list:
- Known superseded numbers (never to reappear):
- Settled positioning claim (`write-litreview`):

## seminar

- Panel preset (a file such as `.claude/panels/<area>.md`; default: built per paper from the seminar template):

## explore-directions

- code_dir: `code/explore`
- link_dirs (main-repo dirs symlinked into each worktree): `data`, `raw`, `.venv`

## write-onepager

- Source-manifest overrides (exact paths for the summary of record, exhibits of record, deck of record, framing block):
