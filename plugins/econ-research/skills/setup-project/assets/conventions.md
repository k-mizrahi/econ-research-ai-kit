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
