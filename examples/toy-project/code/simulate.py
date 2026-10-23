"""Simulate the toy firm-year panel (synthetic data; seeded)."""
import numpy as np
import pandas as pd

SEED = 20261023
N_FIRMS = 2000
YEARS = range(2010, 2020)
EVENT_YEAR = 2015
EFFECT = 0.25  # log-rate effect built into the simulation

rng = np.random.default_rng(SEED)
firm_effect = rng.normal(0.0, 0.8, N_FIRMS)
treated = rng.random(N_FIRMS) < 0.5

rows = []
for firm in range(N_FIRMS):
    for year in YEARS:
        post = bool(treated[firm]) and year >= EVENT_YEAR
        rate = np.exp(-0.2 + firm_effect[firm] + 0.03 * (year - 2010) + (EFFECT if post else 0.0))
        rows.append((firm, year, int(treated[firm]), int(post), rng.poisson(rate)))

panel = pd.DataFrame(rows, columns=["firm_id", "year", "treated", "post", "patents"])
panel["any_patent"] = (panel["patents"] > 0).astype(int)
panel.to_csv("data/panel.csv", index=False)
print(f"wrote data/panel.csv: {len(panel)} rows, {panel['firm_id'].nunique()} firms")
