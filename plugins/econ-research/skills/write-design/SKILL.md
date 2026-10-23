---
name: write-design
description: Draft or revise a paper's research-design / empirical-strategy section — estimating equations, identifying assumptions, threats, event-study setup — using the canon's identification-exposition playbook and the papers the user likes. Use when the user asks to write or tighten an empirical strategy, identification, or design section.
---

The design section's job: state the counterfactual in words, the assumption in one
plain-English sentence, and every threat with its sign and its test — before the reader
can think of any of them first.

## Step 0 — Load the ground truth

1. Read `${CLAUDE_SKILL_DIR}/../../writing/econ_writing_principles.md` §6, §9.2–6.
2. **Exemplar notes** — resolve them per `${CLAUDE_SKILL_DIR}/../../writing/exemplar-schema.md` § Where notes live. **If there are none, stop before drafting:** the style profile is a setup step. Run `add-exemplars` now; it asks which 2–5 papers the user likes for their writing, ideally close to this paper's type. Draft on the principles alone only if the user explicitly asks to, and say so in the draft apparatus. With notes: read `style-profile.md` (its Writing part), then skim their **§D. Empirical strategy** blocks for the papers structurally closest to the draft's design.
3. Our specs of record come from the plans and reference implementations, not memory — resolve them from the project's `CLAUDE.md` and its skill bindings (`.claude/rules/skill-bindings.md` § `write-design`, if present). Settled choices: the project's decision register(s). Do not draft a spec that contradicts a settled decision; flag the conflict instead.

## Structure

1. **Counterfactual in words first**: "We want to build the counterfactual of [outcome] for [units], had they not experienced [event]. Two main challenges arise…" — each challenge answered in one sentence.
2. **One plain design sentence before any algebra**: "the design compares [these units] to [those units] around [this event]." If it can't be written, the design isn't clear yet.
3. **Ideal-experiment framing** where it helps: endogeneity problem → ideal experiment → the actual variation → precedent papers (say the strategy is established, with cites; "We follow X" — borrowing openly is a strength).
4. **Equation**: one lead-in sentence naming sample, unit, weighting → equation (variables named in words where possible, so it reads like a sentence) → every symbol defined in the next sentence, in order → one purpose clause per control/FE ("d_rt absorbs region-wide changes shared by all industries"). Two-equation pattern: a dynamic spec to confirm the design's validity and study the dynamics, then a collapsed spec to summarize results and discuss magnitudes.
5. **Identifying assumption: one plain-English sentence in the setting's nouns**, never textbook form. Transplant test: delete any paragraph that would survive being pasted into another DiD paper. Consider stating it twice — intro and here, verbatim.
6. **Threats: named, numbered, signed, dispatched.** Pattern per threat: concern → which direction it biases → the design feature or test → result/promise ("I show below that…" — and pay it off). Order by escalating plausibility, or narrow the threat space first ("only factors that change at the same time as X and affect only Y can threaten the design"). For a null result, foreground the biases that cut *toward* a false positive and note they make the null conservative.
7. **Raw evidence before the workhorse spec**: the two-group figure or raw means, with its limits stated (such a figure is not suited to precise estimation or inference).
8. **Falsification logic before falsification result**: "Finding positive lead coefficients would cast doubt on the causal interpretation because…" — pre-trends and placebos framed as tests the design could have failed. Stack the deck against yourself where possible and say so.
9. **Inference**: clustering level with a one-line justification (default: the panel unit, per user-level conventions).
10. Close with honest calibration, not triumph: "While our strategy is not a true experiment…" / "taken together, these results allay concerns about…"

## Project constraints (binding)

- Regression defaults (event year, sample window, FEs, clustering) come from the project's `CLAUDE.md`. Deviations need explicit user sign-off.
- Two-group event studies must describe BOTH main rel-year effects and treatment×rel-year interactions — the interaction-only spec is banned (spurious pre-trend failures; user-level rule).
- Count outcomes: OLS levels + LPM extensive margin as main specs, PPML appendix — no log(1+x). (For PPML, cite Santos Silva and Tenreyro.)
- Pre-trend verdicts of record and required disclosures (failed gates, placebo columns, companion doses) come from the project's `CLAUDE.md` and its skill bindings (`.claude/rules/skill-bindings.md` § `write-design`, if present) — the design text presents them as recorded, not papered over.
- Any new treatment definition or timing rule invented while drafting → `design-check` first.

## Revision sweep

- Assumption transplant test passed? Every threat signed? Every "we show below" paid off?
- Purpose-first openers ("To address endogeneity, we…"); robot rules — linear, plain, no rhetoric, no concept used before defined.
- No "may be biased" without a direction. No unexplained FE. Parameter of interest marked.

## Output format — LaTeX → PDF (required)

Follow `${CLAUDE_SKILL_DIR}/../../writing/latex-output.md`: a standalone `.tex` in the paper's drafts directory
plus its compiled PDF, with the draft apparatus visible, delivered as a file.
