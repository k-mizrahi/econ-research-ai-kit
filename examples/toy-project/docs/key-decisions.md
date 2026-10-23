# Key decisions — Toy R&D credit

Append-only register of methodological decisions, newest last. Never edit or delete a
row; a reversal is a new row that references the one it replaces. The `log-decision`
skill writes rows (with its enforcement sweep); every skill reads this before
proposing alternatives.

Status: `ratified` (settled) or `provisional` (name the trigger that would reopen it).

| Date | Decision | Rationale | Evidence | Status | Enforcement sweep |
|---|---|---|---|---|---|
| 2026-10-23 | Keep decisions, results, dropped analyses, and open work in their own documents of record. | One home per fact; other documents point, they don't copy. | — | ratified | — |
| 2026-10-23 | Main spec: OLS on `patents` in levels + LPM on `any_patent`, firm + year FE, SEs clustered by firm. PPML goes to the appendix. log(1+patents) is not a main specification. | Levels + extensive margin stay interpretable for counts with many zeros; log(1+x) depends on units and lacks a clean interpretation. | results-log 2026-10-23 "Main TWFE estimates" | ratified | Grep `code/` for log1p / log(1+ / np.log / PPML / Poisson: no log1p hits. `code/simulate.py:20` `rng.poisson` is the DGP draw, not an estimator. `code/estimate.py:42-46` already runs the main spec. PPML appendix not yet implemented → B2. |
| 2026-10-23 | `code/estimate.py` writes output CSVs at full float precision: `float_format="%.4f"` dropped from both `to_csv` calls (script default change). | Results log cites six decimals; 4-decimal CSVs could not reproduce them. Full precision in the CSV, rounding only at citation. | handoff 2026-10-23 "Precision mismatch"; re-run 2026-10-23 — every value in both results-log entries matches the new CSVs on rounding | ratified | Grep `code/` for `float_format` / `%.Nf` / `round(`: no remaining hits. `output/main_results.csv`, `output/event_study.csv` regenerated; same estimates, more digits. |
