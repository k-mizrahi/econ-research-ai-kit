# Results log — Toy R&D credit

Append-only and chronological. One entry per substantive result, written by the
`log-result` skill right after the analysis runs. Full-precision numbers live here and
in the generating CSV; plans, memos, and status lines point here instead of copying
numbers.

<!-- Entry format:
### [YYYY-MM-DD] Toy R&D credit — Brief description
- **Script/source:** `path/to/script.py` or ad-hoc
- **Output:** `path/to/output_file.csv`
- **Key numbers:** coefficient = X, SE = Y, N = Z
- **Specification:** formula / sample / FEs / clustering
- **Note:** one sentence on anything surprising
-->

### [2026-10-23] Toy R&D credit — Main TWFE estimates, post-2015 credit (SYNTHETIC)
- **Script/source:** `code/simulate.py` (SEED = 20261023, EFFECT = 0.25) → `code/estimate.py`
- **Output:** `output/main_results.csv`
- **Key numbers:** patents (OLS levels) coef = 0.323959, SE = 0.038222; any_patent (LPM) coef = 0.072283, SE = 0.011930; N = 20000, clusters = 2000; control pre-period means 1.247335 (patents), 0.579104 (any_patent)
- **Specification:** outcome on `post`, firm + year FE (within estimator, balanced 2010–2019 panel), CR1 SEs clustered by firm
- **Note:** simulated data; built-in effect is 0.25 on the log rate, so the levels coefficient is not directly comparable to EFFECT.

### [2026-10-23] Toy R&D credit — Event study, patents, ref year 2014 (SYNTHETIC)
- **Script/source:** `code/estimate.py`
- **Output:** `output/event_study.csv`
- **Key numbers:** rel_year −5..−2: 0.0083 (0.0694), −0.0667 (0.0702), −0.0721 (0.0715), −0.0229 (0.0701); rel_year 0..4: 0.2839 (0.0798), 0.2721 (0.0787), 0.3527 (0.0761), 0.2583 (0.0794), 0.2993 (0.0806); N = 20000, clusters = 2000
- **Specification:** patents on treated × year dummies (2014 omitted), firm + year FE, treated vs never-treated, CR1 SEs clustered by firm
- **Note:** all pre-period coefficients within 1.1 SE of zero.
