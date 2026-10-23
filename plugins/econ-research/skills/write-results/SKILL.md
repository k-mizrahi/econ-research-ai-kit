---
name: write-results
description: Draft or revise a paper's results section — table/figure walk-throughs, magnitude conversion, null phrasing, robustness compression, mechanisms — using the canon's results-narration playbook and the papers the user likes. Use when the user asks to write or tighten results, findings, or mechanisms text.
---

The results section's job: verdict-first paragraphs where every coefficient is converted
to an interpretable magnitude, every null carries its ruled-out effect size, and
robustness takes one sentence per check.

## Step 0 — Load the ground truth

1. Read `${CLAUDE_SKILL_DIR}/../../writing/econ_writing_principles.md` §7, §9.7–10, 15–17.
2. **Exemplar notes** — resolve them per `${CLAUDE_SKILL_DIR}/../../writing/exemplar-schema.md` § Where notes live. **If there are none, stop before drafting:** the style profile is a setup step. Run `add-exemplars` now; it asks which 2–5 papers the user likes for their writing, ideally close to this paper's type. Draft on the principles alone only if the user explicitly asks to, and say so in the draft apparatus. With notes: read `style-profile.md` (its Writing part), then skim their **§E. Results narration** blocks.
3. **Numbers come ONLY from the paper's results log (wherever the project's `CLAUDE.md` routes results) and the generating CSVs** (single source of numbers). Drafts/slides are the sanctioned exception that carries numbers in full — but every number must be traceable to its log entry, and `check-output` runs before the draft leaves the repo. Copying a coefficient from a plan, memory, or an old summary is a bug.
4. Means/SDs needed for magnitude conversion: from the CSV or a fresh descriptive run, never recalled.

## Ordering

Main result → validation of the design already promised (pre-trends as their own
exhibit) → heterogeneity/mechanisms → robustness. Never the order the regressions were
run. Open the section with a short stage map only if the section has ≥4 distinct jobs.

For event-study designs: **figure walk-through before table
walk-through** — the headline exhibit is the picture of the identifying variation; the
collapsed-spec table backs it.

## The template paragraph (use it every time)

1. **Verdict topic sentence** — a finding, not an activity: "The magnitude of the effects is large," never "Table 3 presents estimates."
2. **Column walk**: column address → what it asks → coefficient + (SE or significance) + table address in parentheses → what changed vs. the previous column and why ("controlling for X reduces the estimate to Y — consistent with [mechanism]"). Coefficient movements get interpreted as information about bias, not just reported.
3. **Magnitude conversion, every headline number**, with the denominator stated: percent of the control-group mean ("Compared with a mean of M, the estimate of b implies a P percent increase"), dual denomination (dollars and percent of the mean), an IQR contrast, or a concrete counterfactual unit (a move from a small city to a large one). Hinge phrase: "To help interpret the magnitude, consider…". Define the denominator once (footnote) and reuse it; one normalization for the whole paper where possible.
4. **Close tying back to the hypothesis** or with a section-ending synthesis: "In sum, …" — what was learned, not what was done.

## Nulls (never naked)

Three moves: flat statement → sign observation → ruled-out effect size scaled by the
mean ("we can rule out a reduction of more than X; the pre-period mean is Y").
Alternatives: say whether the zero is precisely or imprecisely estimated; a rejection
bound against a benchmark effect ("we can reject effects larger than half the direct
effect"). Load-bearing nulls are tied to the theory they kill. "Insignificant" ≠
"zero" — say which you mean.

## Mechanisms

Named hypotheses with **testable implications stated before the table** ("The [hypothesis]
story carries three testable implications. First… Second… Third…"), then the table verdict
("strikingly inconsistent with"), then a verdict sentence per subsection. Subsection
headers may assert findings ("Sorting Does Not Explain the Effect").
Non-causal evidence gets fenced explicitly: "Although we cannot interpret these results
as causal, the evidence supports…". Heterogeneity as variance-explained where it fits
("a one-SD increase in X explains 75 percent of the average effect").

## Robustness (compressed)

One clause or sentence per check with the moved coefficient and its appendix address:
"results are robust to X (Appendix Table B7), similar under Y (…), unchanged excluding
Z (…)." State the predicted direction before a check where you have one. When
a check bites, say so plainly and explain why the test is demanding. Grade confidence
across outcomes honestly ("we can be most confident in…"). Never let robustness precede
or outweigh the main result; never put it in the intro.

## House voice (binding)

- **No editorializing point estimates** — never "good"/"bad"/"exciting"/"reassuringly large." Verdict adverbs ("Reassuringly," "Encouragingly") are reserved for spec *stability*, not effect sizes. Excitement is displaced onto the evidence; ≤1 "strikingly" per paper.
- Stars/significance language: never "significant" when you mean "large."
- Tables self-contained: human-readable labels (no raw variable names like `x_share_pre_z` in a paper table), complete notes, SEs-vs-t-stats stated, uniform decimals (round SE to first nonzero digit, match the coefficient).
- Evidence addresses ride in parentheses so sentences stay declarative: "(column 6 of Table 3, significant at 1 percent)."

## Project wiring

- The paper's facts register, withdrawn quantifiers, and pre-trend verdicts of record come from the project's `CLAUDE.md` and its skill bindings (`.claude/rules/skill-bindings.md` § `write-results`, if present). Results text never resurrects a withdrawn claim; mixed pre-trend verdicts are narrated both ways, no cherry-picking.
- After drafting results text with fresh numbers or reruns: `log-result`. If drafting reveals a data bug: `blast-radius` before continuing.

## Output format — LaTeX → PDF (required)

Follow `${CLAUDE_SKILL_DIR}/../../writing/latex-output.md`: a standalone `.tex` in the paper's drafts directory
plus its compiled PDF, with the draft apparatus visible, delivered as a file.
