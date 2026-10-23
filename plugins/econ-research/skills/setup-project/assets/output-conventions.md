## Output conventions

- **Tabular data:** write CSV for small/human-inspected outputs, Parquet for large
  or intermediate data. One canonical output dir (e.g. `output/`).
- **Figures:** 300 DPI, clean axes, consistent per-project palette; save to
  `figures/`. Regenerate from script — never hand-edit an exported figure.
- **Reproducibility:** outputs are regenerable from a single command
  (`refresh.py` / `make`-style). Prefer a full recompute over incremental patching;
  the chain should **abort on the first failure**, not limp on with stale data.
- **Results log:** append every headline result to a central `output/results_log.md`
  (or run `log-result`) so numbers in drafts can be traced back to a run.
- **Raw data is read-only:** never modify files under `raw/` — treat them as inputs.
