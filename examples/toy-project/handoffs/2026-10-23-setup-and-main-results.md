# Handoff — 2026-10-23: workflow set up, main TWFE + event study logged, PPML still open

**SYNTHETIC project — simulated data; nothing here is a research finding.**

## Where things stand
- Pipeline: `code/simulate.py` (SEED = 20261023, EFFECT = 0.25, 2,000 firms, 2010–2019)
  → `data/panel.csv` (gitignored; present on this machine) → `code/estimate.py`
  → `output/main_results.csv`, `output/event_study.csv` (both committed).
- Main spec ratified 2026-10-23 (`docs/key-decisions.md`): OLS levels on `patents` + LPM on
  `any_patent`, firm + year FE, CR1 SEs clustered by firm; PPML appendix-only; no log(1+x).
- Numbers of record: `docs/results-log.md`, two entries dated 2026-10-23 (main TWFE,
  event study). Don't copy them elsewhere — point there.
- Event study: treated × year dummies, ref year 2014, against never-treated firms.
  Single event-based group vs never-treated, so the "main rel_year + interaction" rule
  for two event-based groups does not apply.
- Backlog open: B1 (fill empty CLAUDE.md sections), B2 (PPML appendix spec).
- Working tree clean at `0901266` before this handoff.

## What changed this session
- `edfb496`, `514f212` — toy simulate/estimate code; firm count raised to 2,000.
- `b7a4e47` — research workflow scaffold: `CLAUDE.md`, `.claude/rules/{plans,skill-bindings}.md`,
  `docs/{key-decisions,results-log,dropped-analyses,backlog}.md`, empty `plans/`, `handoffs/`.
- `0901266` — logged main results + event study; ratified main-spec decision with
  enforcement sweep; opened B2.
- This file — first handoff.

## Findings worth remembering
- Precision mismatch (verified 2026-10-23): `estimate.py` writes CSVs with
  `float_format="%.4f"`, but the results-log main entry cites six decimals
  (e.g. coef 0.323959). The CSV cannot reproduce those digits. Either drop the
  float_format so outputs carry full precision, or log 4-decimal values. Settle once.
- The levels coefficient (0.3240) is not comparable to EFFECT = 0.25 (a log-rate
  effect in the DGP). PPML (B2) is the spec that targets EFFECT directly — useful as a
  sanity check that the simulation and estimator agree.
- Within estimator is exact only in a balanced panel; `estimate.py:38` asserts it.
  A PPML implementation cannot reuse the demeaning — it needs its own FE handling.
- `rng.poisson` in `simulate.py:20` is the DGP draw, not an estimator — the
  log1p/Poisson grep sweep will hit it; it's a false positive.
- Outputs were NOT re-run in this handoff session (interpreter run not approved;
  `.venv` presence not confirmed). Committed CSVs are from `514f212`.

## Next steps, in order
1. Confirm `.venv` exists (else: `python3 -m venv .venv && .venv/bin/pip install -r requirements.txt`),
   re-run simulate + estimate, check `git diff output/` is empty.
2. Resolve the CSV precision mismatch (above); if `float_format` changes, it's a
   script default change → log it via `log-decision`.
3. B2: add PPML (firm + year FE, firm-clustered SEs) on `patents` to `estimate.py` as
   an appendix output (new CSV). Write a plan in `plans/ppml-appendix_YYYY-MM-DD.md` first.
   Log the result with `log-result`.
4. B1: fill the empty "Key decisions — don't re-litigate" section in `CLAUDE.md`
   (pointer to `docs/key-decisions.md`, not copies).
5. Optional: run `refresh` to stamp the CLAUDE.md "Last refresh" line (user-triggered only).

## Operational cautions
- Do not drop the balance assert in `estimate.py`.
- Do not hand-edit `output/` or `data/`; regenerate.
- log(1+patents) is banned as a main spec; PPML is appendix-only.
- Keep SEED and EFFECT unchanged unless a decision is logged — every logged number depends on them.
- No try/except around estimation or data loading.
- Don't read `.env`/credential files.
