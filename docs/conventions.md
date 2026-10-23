# Conventions

These are the estimation and research-process rules Claude Code follows in every project. The `econ-research` plugin's `setup-project` skill appends them to a project's `CLAUDE.md` ([the block](../plugins/econ-research/skills/setup-project/assets/conventions.md)); to apply them everywhere, put the block, with its `econ-research:conventions` markers, in `~/.claude/CLAUDE.md`. Each rule was adopted after it was violated in practice, and this page gives the reasoning behind each one and how to follow it by hand in Stata, R, and Python.

## Estimation rules

### No log(1+x) for count outcomes

**Rule.** No log(1+x) / log1p as the main specification for count outcomes. Use OLS on raw levels plus a linear probability model (LPM) on the extensive margin; report Poisson (PPML) in the appendix where it converges.

**Why.** When an outcome can be zero, the treatment coefficient in a regression of log(1+y) or arcsinh(y) is not a percentage effect: Chen and Roth (2024) show that it depends on the units of y, and if treatment moves some units off zero, rescaling y (counts per month instead of per year, say) can make it any size, because the units implicitly set the weight placed on the extensive margin. A levels coefficient divided by the control-group mean is a unit-free percentage effect on the mean, and an LPM on 1[y > 0] reports the extensive margin separately; these follow two of the alternatives Chen and Roth recommend (for the intensive margin they suggest bounds, such as Lee bounds). PPML estimates the proportional effect on the mean, exp(β) − 1, is consistent under heteroskedasticity, and keeps the zeros (Santos Silva and Tenreyro 2006). With unit fixed effects it drops units whose outcome is always zero, and with many fixed effects it can fail to converge, so report its N next to the OLS N.

**References.**
- Chen, Jiafeng, and Jonathan Roth. 2024. "Logs with Zeros? Some Problems and Solutions." *Quarterly Journal of Economics* 139 (2): 891–936. https://doi.org/10.1093/qje/qjad054
- Santos Silva, J. M. C., and Silvana Tenreyro. 2006. "The Log of Gravity." *Review of Economics and Statistics* 88 (4): 641–658. https://doi.org/10.1162/rest.88.4.641

**How to follow it.**

```stata
gen any_y = (y > 0) if !missing(y)
reghdfe y     treat, absorb(unit year) vce(cluster unit)   // levels
reghdfe any_y treat, absorb(unit year) vce(cluster unit)   // extensive margin (LPM)
ppmlhdfe y    treat, absorb(unit year) vce(cluster unit)   // appendix: PPML
```

```r
library(fixest)
df$any_y <- as.integer(df$y > 0)
ols  <- feols(y ~ treat | unit + year, data = df, cluster = ~unit)
lpm  <- feols(any_y ~ treat | unit + year, data = df, cluster = ~unit)
ppml <- fepois(y ~ treat | unit + year, data = df, cluster = ~unit)  # appendix
```

```python
import pyfixest as pf
df["any_y"] = (df["y"] > 0).astype(float).where(df["y"].notna())
ols = pf.feols("y ~ treat | unit + year", data=df, vcov={"CRV1": "unit"})
lpm = pf.feols("any_y ~ treat | unit + year", data=df, vcov={"CRV1": "unit"})
ppml = pf.fepois("y ~ treat | unit + year", data=df, vcov={"CRV1": "unit"})  # appendix
```

### Two-group event studies

**Rule.** Event studies with two event-based groups (treated vs. active control) include both the main rel_year effects and the treatment × rel_year interactions. Interaction-only specifications create spurious pre-trend failures.

**Why.** An active control is a comparison group that also experiences an event, with rel_year measured from each unit's own event date, so both groups share whatever dynamics surround an event regardless of treatment: selection into the event, life-cycle timing, mean reversion. The main rel_year effects absorb these common dynamics, and the interactions then measure the treated group's deviation from the active control at each event time, which is the comparison the design exists to make. An interaction-only specification restricts the control group's event-time path to zero, so the common dynamics load onto the interactions and the pre-event coefficients pick up the common pre-event path: the pre-trend test fails even when the two groups move in parallel. The rule fixes the comparison, not heterogeneity bias: with staggered event dates and effects that vary across cohorts, two-way fixed effects event-study coefficients can still be contaminated by effects from other periods (Sun and Abraham 2021; Borusyak, Jaravel, and Spiess 2024).

**References.**
- Borusyak, Kirill, Xavier Jaravel, and Jann Spiess. 2024. "Revisiting Event-Study Designs: Robust and Efficient Estimation." *Review of Economic Studies* 91 (6): 3253–3285. https://doi.org/10.1093/restud/rdae007
- Sun, Liyang, and Sarah Abraham. 2021. "Estimating Dynamic Treatment Effects in Event Studies with Heterogeneous Treatment Effects." *Journal of Econometrics* 225 (2): 175–199. https://doi.org/10.1016/j.jeconom.2020.09.006

**How to follow it.** The snippets assume the estimation sample spans rel_year -5 to 5 (an integer column), `treated` is a 0/1 indicator, and -1 is the reference period. Because every unit has an event date and every event time has its own indicator, the main rel_year path is identified only up to a linear trend once unit and year fixed effects are in the model (Borusyak, Jaravel, and Spiess 2024), and software may not flag the collinearity. The code therefore also normalizes rel_year = -5 in the main path; this leaves the interaction coefficients unchanged.

```stata
* Factor variables must be nonnegative integers, so shift event time by 5 (-1 -> 4)
gen ev    = cond(rel_year == -5, 4, rel_year + 5)                     // main path; -5 pooled with -1
gen ev_tr = cond(treated == 1, rel_year + 5, 4) if !missing(treated)  // treated x event time; controls in base
reghdfe y ib4.ev ib4.ev_tr, absorb(unit year) vce(cluster unit)
```

```r
es <- feols(y ~ i(rel_year, ref = c(-1, -5)) + i(rel_year, treated, ref = -1) | unit + year,
            data = df, cluster = ~unit)
```

```python
df["rel_main"] = df["rel_year"].replace({-5: -1})  # pyfixest's i() takes one ref value: pool -5 with -1
es = pf.feols("y ~ i(rel_main, ref=-1) + i(rel_year, treated, ref=-1) | unit + year",
              data=df, vcov={"CRV1": "unit"})
```

### Cluster at the panel unit

**Rule.** Always cluster standard errors at the panel unit (person, firm, school) unless the design dictates otherwise.

**Why.** A unit's outcomes are correlated across years, and in a difference-in-differences or event study so is its treatment indicator, which is assigned once and stays on. Standard errors that treat each unit-year as independent overstate the information in the data: Bertrand, Duflo, and Mullainathan (2004) find placebo laws "significant" at the 5 percent level in up to 45 percent of cases with conventional standard errors. Abadie et al. (2023) treat clustering as a design question: adjust when clusters are sampled from a larger population or when treatment assignment is correlated within clusters. When treatment is assigned to units, the unit is the minimum clustering level; when it is assigned to a coarser group (a department, a region, a policy cohort), cluster at that level instead.

**References.**
- Abadie, Alberto, Susan Athey, Guido W. Imbens, and Jeffrey M. Wooldridge. 2023. "When Should You Adjust Standard Errors for Clustering?" *Quarterly Journal of Economics* 138 (1): 1–35. https://doi.org/10.1093/qje/qjac038
- Bertrand, Marianne, Esther Duflo, and Sendhil Mullainathan. 2004. "How Much Should We Trust Differences-in-Differences Estimates?" *Quarterly Journal of Economics* 119 (1): 249–275. https://doi.org/10.1162/003355304772839588

**How to follow it.** Pass the cluster variable in every call. None of these commands clusters by default: reghdfe uses unadjusted standard errors, ppmlhdfe robust ones, and fixest (since 0.13.0) and pyfixest iid ones.
- Stata: `reghdfe y treat, absorb(unit year) vce(cluster unit)`
- R: `feols(y ~ treat | unit + year, data = df, cluster = ~unit)`
- Python: `pf.feols("y ~ treat | unit + year", data=df, vcov={"CRV1": "unit"})`

### No try/except around estimation or data loading

**Rule.** No try/except around estimation or data loading; let errors surface. A silent skip is indistinguishable from a run.

**Why.** Catching an error and continuing turns a failure into output that looks finished: a table with an empty column, a loop that ran on nine of ten samples, a load that returned an empty data frame. Nothing in the output separates a specification that was skipped from one that ran, so the error has to stop the run where it happens.

**How to follow it.** The same applies to `capture` in Stata and `try()` or `tryCatch()` in R.

```python
# Before: a failed fit becomes an empty column that looks like a finished run
try:
    ppml = pf.fepois("y ~ treat | unit + year", data=df, vcov={"CRV1": "unit"})
except Exception:
    ppml = None

# After: the error stops the run where it happens
ppml = pf.fepois("y ~ treat | unit + year", data=df, vcov={"CRV1": "unit"})
```

Where a model can legitimately fail, as PPML can, the failure is reported rather than skipped: `ppmlhdfe` stores `e(converged)`, fixest returns `convStatus`, and pyfixest raises `NonConvergenceError`. A cell that did not converge says so in the table and in the results log.

### Seeds for every stochastic step

**Rule.** Set random seeds for any stochastic method: bootstrap, sampling, matching, record linkage.

**Why.** Bootstrap and permutation p-values, random subsamples, matching with random tie-breaking, and sampled or randomly initialized record linkage all change from run to run. Without a fixed seed, a number in the draft cannot be regenerated, and a difference between two runs cannot be attributed to the code rather than the draw. The social-science data editors' template README asks replication packages to set the seed once, not from a time stamp, and to state where it is set (Vilhuber et al. 2022).

**References.**
- Vilhuber, Lars, Marie Connolly, Miklós Koren, Joan Llull, and Peter Morrow. 2022. "A Template README for Social Science Replication Packages." Version 1.1. Zenodo. https://doi.org/10.5281/zenodo.7293838

**How to follow it.** Set the seed once, at the top of the main script, before the first random draw.
- Stata: `set seed 12345`. `sort` also orders ties at random, so add the `stable` option or sort on a unique key before any step that depends on order.
- R: `set.seed(12345)`.
- Python: `random.seed(12345)` for the standard library, and `rng = np.random.default_rng(12345)` passed explicitly to each draw, e.g. `df.sample(n=500, random_state=rng)`. String hashing is randomized per process, so a `set` of strings can iterate in a different order on each run regardless of the seed; sort it before iterating (over blocking keys in record linkage, for example).

### Report numbers, not adjectives

**Rule.** Do not editorialize point estimates ("good", "bad", "exciting"). Spec correctness comes first: sample construction, variable definitions, fixed effects, clustering. Report what the numbers are.

**Why.** An adjective on a coefficient is a judgment about whether it is the number you wanted, and wanting a number is where specification search starts. What an estimate means depends first on whether the specification is right: who is in the sample and why, how the outcome and treatment are defined, what the fixed effects absorb, and how the standard errors are clustered.

**How to follow it.** Check those four things, then state the estimate, its standard error, the sample, and the comparison: "0.12 (SE 0.02) per unit-year, 9 percent of the control-group mean; 3,000 units, 30,000 unit-years", not "a large and encouraging effect". The `log-result` skill records results this way: exact numbers from the output and the specification (formula, sample, fixed effects, clustering), with no interpretation.

## Research-process rules

### Record decisions when they are ratified

**Rule.** Record decisions in the project's key-decisions doc when they are ratified, in the same session, including any change to a script's default flag value. When a decision bans a pattern, grep-sweep the codebase in the same session.

**Why.** A choice that lives only in a conversation is gone by the next session, and then it is re-argued or quietly reversed. A changed default flag changes every downstream output with no visible edit to the analysis code, so it is a decision too. A ban that is not enforced in the code is a ban in name only: scripts written before it keep producing the banned specification.

**In practice.** The `log-decision` skill appends a short entry (date, decision, rationale, evidence, ratified or provisional) to the decision register, `docs/key-decisions.md` by default, then greps the active code directories for the banned pattern, old measure, or old flag default. Each hit is fixed in the same session or added to the backlog with an ID, and the hit list goes into the decision entry.

### Mechanical-bias check before adoption

**Rule.** New sample screens and outcome definitions get a mechanical-bias check before adoption: no conditioning on information dated at or after event time; check measures for mechanical time variation; exclude units from their own aggregates; report screen counts by arm × event time.

**Why.** Each item guards against a way of building an "effect" into the variables. A screen that uses information dated at or after the event selects on outcomes that treatment may have changed; dropping or subsetting observations on post-treatment criteria can bias estimates even in randomized experiments (Montgomery, Nyhan, and Torres 2018). A measure whose level moves with calendar time by construction, such as a forward-looking window truncated at the end of the data, can produce event-time patterns in a staggered design. A unit included in its own group aggregate is correlated with it mechanically: without covariates, a regression of individual outcomes on group means that include the individual yields a coefficient of one (Angrist 2014). A screen that removes units at different rates by arm or event time changes the composition of the comparison, which totals alone do not reveal.

**References.**
- Angrist, Joshua D. 2014. "The Perils of Peer Effects." *Labour Economics* 30: 98–108. https://doi.org/10.1016/j.labeco.2014.05.008
- Montgomery, Jacob M., Brendan Nyhan, and Michelle Torres. 2018. "How Conditioning on Posttreatment Variables Can Ruin Your Experiment and What to Do about It." *American Journal of Political Science* 62 (3): 760–775. https://doi.org/10.1111/ajps.12357

**In practice.** The `design-check` skill works through this checklist in writing before a new screen, outcome, treatment definition, or timing rule is adopted. Each item gets a call (pass, flag, needs-data-check) for the researcher to rule on, backed by checks such as the raw outcome rate by calendar year and screen counts by arm × event time, and the skill adds two items: event timing tied to the outcome's own life cycle, and merges that would turn missing units into NaN. A fail means redesign before any rerun; a definition that passes and is adopted is then recorded with `log-decision`.

### Plans are append-only

**Rule.** Plans are living documents named `{goal}_{YYYY-MM-DD}.md`; append results, never overwrite.

**Why.** A plan records what you intended, and the results appended under it record what happened and why the next step changed. Overwriting it erases the analyses already tried, which is the record that keeps them from being rerun or silently dropped. The date in the name orders successive plans for the same goal.

**In practice.** The `write-plan` skill drafts a dated plan with phases, decision rules written before any results, and an empty Results section; as each phase completes, its output paths, counts, and pointers to the results log are appended under it. The plans rule that `setup-project` installs (`.claude/rules/plans.md`) tells Claude to append rather than overwrite and to reconcile deliberately when the plan and the code diverge.

### Feedback documents are immutable

**Rule.** Feedback documents are immutable; triage output goes to the project tracker.

**Why.** A referee report, an advisor's comments, or seminar notes are the record of what was asked. Editing or annotating them in place loses the original wording and makes it impossible to check later that every point was answered.

**In practice.** The `triage-feedback` skill reads the feedback and writes a separate, dated triage document that quotes each point and sorts it as actionable, parkable, inherent, impossible, or addressed. Actionable items go to the project backlog with IDs; the feedback file itself is never edited.

### Merge hygiene

**Rule.** Post-merge hygiene: pass `validate=` (or the equivalent) on every merge, report row and NaN counts, and raise on unexpected merge results; never fall back to defaults.

**Why.** A merge can change the sample without raising an error. Duplicate keys multiply rows, and unmatched keys become missing values that are later dropped or filled with zero or a default category, which recodes "no data" as "untreated" or "no output". Declaring the expected key relationship makes the merge fail when the data violate it, and the row, match, and NaN counts show what the merge did.

**How to follow it.** A matched row can still carry missing values from the right-hand table, so check NaN counts as well as match status. `design-check` and `blast-radius` look for merges that do not.

```python
m = pd.merge(left, right, on="id", how="left", validate="one_to_one", indicator=True)
print(len(left), len(m), m["_merge"].value_counts().to_dict(), m.isna().sum().to_dict())
n_unmatched = int((m["_merge"] != "both").sum())
if n_unmatched:
    raise ValueError(f"{n_unmatched} rows of left have no match in right")
```

```stata
merge 1:1 id using "right.dta", assert(match)   // assert(match master) if unmatched master rows are expected
misstable summarize
```

```r
m <- inner_join(x, y, by = "id", relationship = "one-to-one", unmatched = "error")  # dplyr >= 1.1.1
print(c(rows_x = nrow(x), rows_m = nrow(m))); print(colSums(is.na(m)))
```

In dplyr, `unmatched = "error"` on a `left_join()` checks only `y`; to require every row of `x` to match, use `inner_join(..., unmatched = c("error", "drop"))`.

### Secrets stay unread

**Rule.** Secrets stay unread and unedited: do not read or modify `.env`, credential, key, token, or session files unless the user explicitly names the exact file and task.

**Why.** Analysis does not need API keys, passwords, or session tokens, and anything an agent reads can end up in a transcript, a log, a commit, or an output file. Keeping credentials out of its context closes that path, and requiring the exact file and task keeps any exception deliberate.

**In practice.** With this rule in `CLAUDE.md`, Claude does not open these files on its own, and `setup-project` skips data files, `.env` files, and credentials when it inventories a project. To enforce the rule in the tool, add deny rules to `settings.json`, for example `"deny": ["Read(./.env)", "Read(./.env.*)"]`, and keep the files out of git.

## Sources

- Abadie, Alberto, Susan Athey, Guido W. Imbens, and Jeffrey M. Wooldridge. 2023. "When Should You Adjust Standard Errors for Clustering?" *Quarterly Journal of Economics* 138 (1): 1–35. https://doi.org/10.1093/qje/qjac038
- Angrist, Joshua D. 2014. "The Perils of Peer Effects." *Labour Economics* 30: 98–108. https://doi.org/10.1016/j.labeco.2014.05.008
- Bertrand, Marianne, Esther Duflo, and Sendhil Mullainathan. 2004. "How Much Should We Trust Differences-in-Differences Estimates?" *Quarterly Journal of Economics* 119 (1): 249–275. https://doi.org/10.1162/003355304772839588
- Borusyak, Kirill, Xavier Jaravel, and Jann Spiess. 2024. "Revisiting Event-Study Designs: Robust and Efficient Estimation." *Review of Economic Studies* 91 (6): 3253–3285. https://doi.org/10.1093/restud/rdae007
- Chen, Jiafeng, and Jonathan Roth. 2024. "Logs with Zeros? Some Problems and Solutions." *Quarterly Journal of Economics* 139 (2): 891–936. https://doi.org/10.1093/qje/qjad054
- Montgomery, Jacob M., Brendan Nyhan, and Michelle Torres. 2018. "How Conditioning on Posttreatment Variables Can Ruin Your Experiment and What to Do about It." *American Journal of Political Science* 62 (3): 760–775. https://doi.org/10.1111/ajps.12357
- Santos Silva, J. M. C., and Silvana Tenreyro. 2006. "The Log of Gravity." *Review of Economics and Statistics* 88 (4): 641–658. https://doi.org/10.1162/rest.88.4.641
- Sun, Liyang, and Sarah Abraham. 2021. "Estimating Dynamic Treatment Effects in Event Studies with Heterogeneous Treatment Effects." *Journal of Econometrics* 225 (2): 175–199. https://doi.org/10.1016/j.jeconom.2020.09.006
- Vilhuber, Lars, Marie Connolly, Miklós Koren, Joan Llull, and Peter Morrow. 2022. "A Template README for Social Science Replication Packages." Version 1.1. Zenodo. https://doi.org/10.5281/zenodo.7293838
