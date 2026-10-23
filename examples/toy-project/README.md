# Toy project: an R&D tax credit and firm patenting

> **SYNTHETIC — simulated data.** Nothing in this project is a research finding. It
> exists to show the econ-research workflow end to end on a small panel.

Fictional question: did a 2015 state R&D tax credit raise patenting among eligible
firms? The data are a simulated balanced panel of 2,000 firms observed 2010–2019; about
half are eligible (treated) from 2015. Patent counts are Poisson draws with firm
effects, a common trend, and a built-in treatment effect.

## How this folder was produced

Everything outside `code/` was written by the `econ-research` skills, run in Claude Code
against this project. The only manual step was one line in the bindings file. Read in
this order:

1. **`CLAUDE.md`** — written by `setup-project` from the README and the code, plus the
   conventions block.
2. **Session 1** — results logged to `docs/results-log.md` (`log-result`), and the main
   specification recorded in `docs/key-decisions.md` (`log-decision`). The decision's
   sweep of `code/` found the missing appendix PPML and filed it as backlog item B2.
   The handoff, `handoffs/2026-10-23-setup-and-main-results.md`, then caught a real
   inconsistency: the results log cited six decimals, but the CSVs held only four.
3. **Session 2** — fixed the CSV precision. That changed a script default, so it was
   recorded as a decision. Handoff: `handoffs/2026-10-23-2-csv-precision.md`.
4. **`docs/toy-rd-credit_project_summary_2026-10-23.md`** — `project-summary`'s
   orientation document for a co-author. No PDF: pandoc was not installed.
5. **`output/output_verification_2026-10-23.csv`** — `check-output` traced every number in
   that summary to its source. It flagged one rounding slip and left the immutable
   summary untouched.

Commit hashes cited in these documents refer to the toy project's own history, which is
not included here.

## Reproduce

```sh
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python code/simulate.py     # writes data/panel.csv
.venv/bin/python code/estimate.py     # writes output/main_results.csv, output/event_study.csv
```
