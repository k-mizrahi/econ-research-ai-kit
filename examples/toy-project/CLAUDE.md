# Toy R&D credit

**SYNTHETIC — simulated data; nothing here is a research finding.** Toy project
demonstrating the econ-research workflow: did a fictional 2015 state R&D tax credit
raise patenting among eligible firms? Balanced panel of 2,000 simulated firms, 2010–2019.

## Read first

<!-- The documents of record, in the order a new session should read them. Delete
     lines for documents the project does not keep. -->
- The latest file in `handoffs/` — where the last session left off.
- `docs/key-decisions.md` — settled choices; don't re-litigate them.
- `docs/results-log.md` — the numbers of record; other docs point here.
- `docs/dropped-analyses.md` — approaches already tried and abandoned.
- `docs/backlog.md` — open work, by ID.
- `.claude/rules/skill-bindings.md` — paths and settings the research skills use.

## Architecture

Data flow (one-way; regenerate, never hand-edit outputs):

- `code/simulate.py` → `data/panel.csv` (gitignored). Firm-year panel: `firm_id`,
  `year`, `treated`, `post`, `patents` (Poisson draw), `any_patent`.
- `code/estimate.py` reads `data/panel.csv` →
  - `output/main_results.csv` — TWFE (firm + year FE) on `post`: OLS levels on
    `patents`, LPM on `any_patent`; CR1 SEs clustered by firm.
  - `output/event_study.csv` — `patents` on treated × year dummies, ref year 2014,
    against never-treated firms.

TWFE is a hand-rolled within estimator (numpy/pandas only); its two-way demeaning is
exact only in a balanced panel — `estimate.py` asserts balance.

## Commands

- Setup: `python3 -m venv .venv && .venv/bin/pip install -r requirements.txt`
- Simulate: `.venv/bin/python code/simulate.py`
- Estimate: `.venv/bin/python code/estimate.py`

## Conventions & invariants

- Event year 2015; event-study reference year 2014; sample window 2010–2019.
- Unit is the firm (`firm_id`); SEs clustered by firm.
- Simulation seed `SEED = 20261023` in `code/simulate.py`; built-in effect `EFFECT = 0.25` (log rate).
- Panel must stay balanced — the within estimator depends on it. Do NOT drop the balance assert.

## Key decisions — don't re-litigate

<!-- The 3–5 settled choices that shape everything, each with a word on why. The full,
     append-only register is docs/key-decisions.md. -->

## Status

Last refresh: never — run the `refresh` skill to stamp this line.
(If more than a month or ~50 commits have passed since this stamp,
suggest running `refresh`. Suggest only — `refresh` is user-triggered.)

<!-- Current state: which phase, what is live, where the latest summary of record is. -->

<!-- econ-research:conventions -->
## Estimation
- **No log(1+x) / log1p** as a main spec for count outcomes. Use OLS on raw levels + LPM on the extensive margin; Poisson (PPML) in the appendix where it converges.
- **Event studies with two event-based groups** (treated vs. active control) must include BOTH main rel_year effects and treatment×rel_year interactions — interaction-only specs create spurious pre-trend failures.
- **Always cluster SEs** at the panel unit (person/firm/school) unless the design dictates otherwise.
- **No try/except around estimation or data loading** — let errors surface. A silent skip is indistinguishable from a run.
- **Set random seeds** for any stochastic method (bootstrap, sampling, matching, record linkage).
- Do not editorialize point estimates ("good"/"bad"/"exciting"). Spec correctness first — sample construction, variable definitions, FEs, clustering. Report what the numbers are.

## Research process
- **Decisions are recorded when ratified**, in the project's key-decisions doc, same session — including any change to a script's default flag value. When a decision bans a pattern, grep-sweep the codebase the same session.
- **New sample screens / outcome definitions get a mechanical-bias check before adoption**: no conditioning on info dated ≥ event time; check measures for mechanical time variation; exclude units from their own aggregates; screen counts reported by arm × event time.
- **Plans** are living documents named `{goal}_{YYYY-MM-DD}.md`; append results, never overwrite.
- **Feedback docs are immutable**; triage output goes to the project tracker.
- Post-merge hygiene: `validate=` on merges, report row/NaN counts; raise on unexpected merge results, never fall back to defaults.
- **Secrets stay unread and unedited.** Do not read or modify `.env`, credential, key, token, or session files unless the user explicitly names the exact file and task.
<!-- /econ-research:conventions -->
