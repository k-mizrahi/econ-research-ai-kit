"""Two-way fixed-effects estimates for the toy project (synthetic data).

Main specification (project convention): OLS on patent counts in levels and a linear
probability model on any patent, with firm and year fixed effects and standard errors
clustered by firm. The event study interacts treatment with event-time dummies
(reference year 2014) against never-treated firms.
"""
import numpy as np
import pandas as pd

EVENT_YEAR = 2015
REF_YEAR = EVENT_YEAR - 1


def twfe(df, outcome, regressors):
    """Within estimator for a balanced panel; CR1 standard errors clustered by firm."""
    cols = [outcome] + regressors
    d = df[cols + ["firm_id", "year"]].copy()
    for c in cols:  # two-way demeaning is exact in a balanced panel
        d[c] = (d[c] - d.groupby("firm_id")[c].transform("mean")
                - d.groupby("year")[c].transform("mean") + d[c].mean())
    X = d[regressors].to_numpy(dtype=float)
    y = d[outcome].to_numpy(dtype=float)
    xtx_inv = np.linalg.inv(X.T @ X)
    beta = xtx_inv @ X.T @ y
    resid = y - X @ beta
    meat = np.zeros((len(regressors), len(regressors)))
    for idx in d.groupby("firm_id").indices.values():
        score = X[idx].T @ resid[idx]
        meat += np.outer(score, score)
    n, g = len(d), d["firm_id"].nunique()
    k = len(regressors) + d["year"].nunique() - 1  # firm effects are nested in clusters
    vcov = xtx_inv @ meat @ xtx_inv * (g / (g - 1)) * ((n - 1) / (n - k))
    return beta, np.sqrt(np.diag(vcov)), n, g


panel = pd.read_csv("data/panel.csv")
assert panel.groupby("firm_id")["year"].count().nunique() == 1, "panel must be balanced"
control_pre = panel[(panel["treated"] == 0) & (panel["year"] < EVENT_YEAR)]

rows = []
for outcome, estimator in [("patents", "OLS levels"), ("any_patent", "LPM")]:
    beta, se, n, g = twfe(panel, outcome, ["post"])
    rows.append({"outcome": outcome, "estimator": estimator, "coef": beta[0], "se": se[0],
                 "n_obs": n, "n_clusters": g, "control_pre_mean": control_pre[outcome].mean()})
pd.DataFrame(rows).to_csv("output/main_results.csv", index=False)

event_cols = []
for year in sorted(panel["year"].unique()):
    if year == REF_YEAR:
        continue
    col = f"treat_x_{year}"
    panel[col] = ((panel["treated"] == 1) & (panel["year"] == year)).astype(int)
    event_cols.append(col)
beta, se, n, g = twfe(panel, "patents", event_cols)
pd.DataFrame({"rel_year": [int(c[-4:]) - EVENT_YEAR for c in event_cols], "coef": beta, "se": se}) \
    .to_csv("output/event_study.csv", index=False)
print(pd.DataFrame(rows).to_string(index=False))
