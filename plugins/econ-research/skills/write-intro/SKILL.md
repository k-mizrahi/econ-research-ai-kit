---
name: write-intro
description: Draft or revise a paper introduction (or abstract) using the econ-writing playbook — Head's formula, the contract test, and the intro architectures of papers the user likes. Use when the user asks to write, outline, or tighten an introduction or abstract.
---

Draft an introduction that is a **contract**: every claim maps to a table or figure that
cashes it, and the reader gets question, design, and headline magnitude in the first two
pages.

## Step 0 — Load the ground truth

1. Read `${CLAUDE_SKILL_DIR}/../../writing/econ_writing_principles.md` §§2–3, §9, §10 (abstract + intro rules, shared defaults, disagreements).
2. **Exemplar notes** — resolve them per `${CLAUDE_SKILL_DIR}/../../writing/exemplar-schema.md` § Where notes live. **If there are none, stop before drafting:** the style profile is a setup step. Run `add-exemplars` now; it asks which 2–5 papers the user likes for their writing, ideally close to this paper's type. Draft on the principles alone only if the user explicitly asks to, and say so in the draft apparatus. With notes: read `style-profile.md` (its Writing part), then skim their **§A. Introduction architecture** blocks for the 2–3 papers closest to the draft's type (see model menu below).
3. Pull the paper's current numbers ONLY from the paper's results log (wherever the project's `CLAUDE.md` routes results), the generating CSVs, and the current dated summary of record. Never from older drafts, plans, or memory. If the draft will carry numbers, they must be verifiable — run `check-output` before the draft ships anywhere.

## Step 1 — Pick the intro model

Match architecture to paper type; with exemplar notes, prefer the architecture of the liked paper closest to this one:

- **Single clean design, one question** → compact 6–9 ¶ intro. Headline magnitude by ¶2–5.
- **Null result / design-first paper** → ~8 ¶, no numbers in the intro; sell the design and the direction; state which biases would cut *toward* a false positive.
- **Multi-part paper (descriptive + causal + aggregate)** → long intro that walks every result in order, ~15–20 ¶. Only earn this length if the paper genuinely does several distinct things.
- **Shock-selling paper** → motivating-facts paragraph dense with anchored numbers before the design.

## Step 2 — Build the skeleton (Head's formula, exemplar-hardened)

Write one line per paragraph stating its JOB before writing prose:

1. **Hook** — one of four grounds: Y matters / is puzzling / is controversial / is big. Zero literature. Two sins to avoid: bait-and-switch; "all my friends are doing it." Strong openers: a dated dollar-figure event, a field-level dispute, a stylized fact with a citation stack, a belief to be tested.
2. **Question** — the "This paper…" sentence lands by end of ¶2 / start of ¶3. A rhetorical-question pair works: "Would X have a lasting effect on Y? Or is X easily replaced?"
3. **Design + data in one breath** — name the two obstacles (data, endogeneity) and answer each in the same paragraph. Identification preview = one plain-English sentence in the setting's nouns, plus *why* the variation is exogenous before *what* it is.
4. **Headline result with magnitude and base** — "level change (percent of mean) after k years," a range, or a concrete counterfactual unit. Add one external benchmark (e.g., the effect equals half the return to a year of schooling).
5. **Threats, signed** — voice the killer objection yourself and dispatch it, or preview the test: "could reflect X… or could reflect Y". Sign the bias direction.
6. **Mechanisms / secondary results** — compressed to a numbered plan ("We do so in four steps. First…").
7. **Scope fence** — one sentence saying what the paper does NOT claim ("This analysis does not evaluate the welfare consequences of…").
8. **Contribution paragraph(s)** — see `write-litreview` for the positioning moves; ~3 contributions, each intelligible only in light of prior work (Head's test).
9. **Roadmap** — optional. Keep only if it fails the genericity test (deleting your paper's nouns makes it nonsense) and fits in ~3 sentences; section-handoff sentences are the alternative.

Length bound: ~3 pages. Over that, the lit review or robustness leaked in — evict.

## Step 3 — The contract audit

Before finishing, produce a two-column check: intro claim → exhibit that cashes it.
Any claim without an exhibit gets cut or the analysis gets flagged as missing (report it;
do not soften the claim to keep it). Any headline exhibit not claimed in the intro is a
wasted contract.

## Abstract (if asked)

Write last. 100–150 words: question → answer with magnitude → how you learned it
(estimand + source of variation). Ban "This paper studies…" as the load-bearing
sentence. No caveats, no secondary results. Reuse the paper's one branded magnitude
verbatim: the same phrase in the abstract, the intro, and the conclusion.

## Revision sweep (every pass)

- One point per paragraph, stated first. Verdict-first topic sentences.
- Search-and-destroy: very, clearly, obviously, interestingly, importantly, novel, striking(ly) (allow ≤1, spent on the headline).
- One name per concept — no elegant variation on the estimand, sample, or groups.
- Emphatic word ends the sentence; numbers carry their comparison in the same sentence.
- No editorializing point estimates (project estimation philosophy): report what the numbers are.

## Project wiring

- Resolve the paper's plan, narrative constraints of record, and facts register from the project's `CLAUDE.md` and its skill bindings (`.claude/rules/skill-bindings.md` § `write-intro`, if present). Narrative language never exceeds that register; a withdrawn quantifier stays withdrawn.
- Never write into a read-only sync mirror the project flags. Drafts go to a repo path the user names, or the paper's drafts directory.
- Drafts and slides are the exception that carries real numbers — verify with `check-output` before any hand-off.

## Output format — LaTeX → PDF (required)

Follow `${CLAUDE_SKILL_DIR}/../../writing/latex-output.md`: a standalone `.tex` in the paper's drafts directory
plus its compiled PDF, with the draft apparatus visible, delivered as a file.
