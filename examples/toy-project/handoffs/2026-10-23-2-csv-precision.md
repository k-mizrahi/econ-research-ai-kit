# Handoff — 2026-10-23 (2): CSV precision mismatch resolved; PPML (B2) is next

**SYNTHETIC project — simulated data; nothing here is a research finding.**

## Where things stand
- Pipeline unchanged in substance: `code/simulate.py` (SEED = 20261023, EFFECT = 0.25,
  2,000 firms, 2010–2019) → `data/panel.csv` (gitignored; present on this machine)
  → `code/estimate.py` → `output/main_results.csv`, `output/event_study.csv` (committed).
- Output CSVs now carry full float precision (`4c397c5`). Ratified in
  `docs/key-decisions.md` (row 3, 2026-10-23) with enforcement sweep.
- Numbers of record: `docs/results-log.md`, two entries dated 2026-10-23. Every cited
  value matches the current CSVs on rounding (re-checked 2026-10-23 against `4c397c5`
  CSVs: main coef/SE/means to 6 dp, event-study coef/SE to 4 dp). No log edit needed.
- Backlog open: B1 (fill empty CLAUDE.md sections), B2 (PPML appendix spec). Neither
  touched this session.
- `.venv/` exists in the repo root (verified 2026-10-23).
- Working tree clean at `4c397c5` before this handoff.

## What changed this session
- `4c397c5` — dropped `float_format="%.4f"` from both `to_csv` calls in
  `code/estimate.py`; regenerated both output CSVs (same estimates, more digits);
  logged the script-default change as a ratified decision.
- This file.

## Findings worth remembering
- Precision fix changed digits only, not estimates: the `4c397c5` diff on `output/`
  shows every old 4-dp value equals the new full-precision value rounded (verified
  2026-10-23). This also confirms the prior committed CSVs were reproducible.
- Pre-period event-study coefficients: largest |coef/SE| is rel_year −3,
  −0.0721/0.0715 ≈ 1.01 — consistent with the results-log note "within 1.1 SE".
- Carried over, still true: the levels coefficient is not comparable to EFFECT = 0.25
  (log-rate DGP effect); PPML is the spec that targets EFFECT directly. The within
  estimator is exact only in a balanced panel — PPML needs its own FE handling, not the
  demeaning. `rng.poisson` in `simulate.py` is a grep false positive for the
  log1p/Poisson sweep.
- Not re-run at handoff: an approval-free re-run of simulate + estimate was not
  permitted this time, so "`git diff output/` empty after a fresh run" was not
  re-verified at the handoff. It was run when `4c397c5` was made.

## Next steps, in order
1. B2: write `plans/ppml-appendix_2026-10-23.md` (or the date of the session) first.
   Then add PPML on `patents` (firm + year FE, SEs clustered by firm) to
   `code/estimate.py` as a separate appendix CSV (e.g. `output/ppml_appendix.csv`),
   written at full precision. No try/except around the fit; report convergence. Compare
   the coefficient to EFFECT = 0.25 as a simulation sanity check. Log via `log-result`.
2. B1: fill the empty "Key decisions — don't re-litigate" section in `CLAUDE.md` with a
   pointer to `docs/key-decisions.md` (no copies of rows).
3. Optional: `refresh` to stamp the CLAUDE.md "Last refresh" line — user-triggered only.

## Operational cautions
- Do not drop the balance assert in `estimate.py`.
- Do not hand-edit `output/` or `data/`; regenerate.
- Do not reintroduce `float_format` / rounding in `to_csv` — decision 2026-10-23 row 3.
- log(1+patents) is banned as a main spec; PPML is appendix-only.
- Keep SEED and EFFECT unchanged unless a decision is logged — every logged number depends on them.
- No try/except around estimation or data loading.
- Don't read `.env`/credential files.
