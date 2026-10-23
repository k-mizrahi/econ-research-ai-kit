---
name: design-check
description: Mechanical-bias preflight for any NEW sample screen, outcome variable, treatment definition, or timing rule — does the definition build an effect in by construction? Run BEFORE adopting it and re-running the chain. Use PROACTIVELY when the user proposes a new screen/outcome/definition; this is the most expensive recurring bug class in empirical projects. Produces flags for the researcher to rule on, not a verdict.
argument-hint: "[description of the new screen / outcome / definition]"
---

A definition that builds an effect in by construction is expensive to catch late: it costs a diagnosis, a full re-run of the pipeline, and rewritten exhibits. This checklist runs at spec time, when it is cheap. Run it with full reasoning effort — these are research-design catches, not greps. **Never delegate this check to a smaller model or a background agent.**

**What this is, and isn't.** An assistant's checklist pass, not a verdict. It does not know the setting the way the researcher does: it will flag definitions that are fine and can miss real problems. The researcher rules on every flag.

## The checklist

Work through each question against the proposed definition, in writing, with a call (pass / flag / needs-data-check) and reasoning:

1. **Post-treatment conditioning.** Does any screen or variable condition on information dated ≥ t = 0? Screens must condition only on t−1 and earlier (pre-determined at treatment). *Example: keeping only firms still operating in the event year conditions on survival after treatment; if treatment affects survival, the estimate is biased by construction.*
2. **Mechanically time-varying measure.** Is the measure's level mechanically a function of calendar time (truncation, forward-window, data coverage)? Check the raw rate by year before using it as an outcome. *Example: an outcome counted over a forward window (say, the next five years) is truncated for late cohorts, so it falls with calendar time whatever the treatment does.*
3. **Reflection / self-inclusion.** Is the treated unit included in its own aggregate (shares, group means, peer averages)? Exclude the unit and re-check. *Example: a peer-average outcome that includes the unit's own value correlates with the unit's outcome by construction (the reflection problem).*
4. **Timing endogenous to the outcome.** Is event time correlated with the outcome's own life cycle (e.g., events that tend to occur when the outcome peaks, so it mechanically declines after t = 0 through mean reversion)? *Example: workers who enter training after an earnings dip recover afterward even with no training effect (Ashenfelter's dip).*
5. **Screen-induced composition shifts.** Does the screen remove units differentially by treatment arm or event time (creating survivorship or attrition patterns that load on the estimate)? Report screen counts by arm × rel_year, not just totals.
6. **Silent missingness.** Will units absent from a merge source become NaN instead of raising? Per project rules, merges must `validate=` and report counts. *Example: units missing from a lookup table become NaN after a left merge and silently drop out of the estimation sample.*

## Output

A short memo (inline, or appended to the relevant plan for non-trivial definitions) that opens with "Assistant's checklist: flags for your judgment, not a verdict." Then: the proposed definition, the call per item, any data checks run (e.g., rate-by-year table), and an overall call, clear or flagged. A flag means stop before any chain re-run: the researcher either fixes the definition or records why the flag does not apply.

If the researcher adopts the definition, run the log-decision workflow.
