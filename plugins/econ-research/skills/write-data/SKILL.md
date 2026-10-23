---
name: write-data
description: Draft or revise a paper's data section — sources, sample construction, linkages, variable definitions, summary stats, limitations — using the canon's construction-narration playbook and the papers the user likes. Use when the user asks to write or tighten a data/setting section.
---

The data section's job: let the reader reconstruct the analysis sample, believe the
linkages, and hear every limitation from you before a referee finds it.

## Step 0 — Load the ground truth

1. Read `${CLAUDE_SKILL_DIR}/../../writing/econ_writing_principles.md` §5, §9.11–13.
2. **Exemplar notes** — resolve them per `${CLAUDE_SKILL_DIR}/../../writing/exemplar-schema.md` § Where notes live. **If there are none, stop before drafting:** the style profile is a setup step. Run `add-exemplars` now; it asks which 2–5 papers the user likes for their writing, ideally close to this paper's type. Draft on the principles alone only if the user explicitly asks to, and say so in the draft apparatus. With notes: read `style-profile.md` (its Writing part), then skim their **§C. Data section** blocks for the papers closest to this one.
3. Facts about OUR data come from the pipeline docs, not memory: the project's `CLAUDE.md` (data-pipeline section), its cross-paper map or plan, its dataset catalog/describe-data skills if present, and the generating scripts. Counts and rates come from the routed results log or a fresh descriptive run — never quoted from recall.

## Structure (order of presentation)

Sources → sample construction (screens with reasons + counts) → linkages → variable
definitions → summary stats → limitations. ~1 page main text for standard data; 2–3
pages only when construction is itself a contribution; gore to the appendix with a
one-sentence pointer ("This section briefly summarizes…; a comprehensive description is
in Appendix B").

Mandatory content: source names, period, panel structure, unit of observation, N,
central variables (space allocated by importance — more on the outcome than on controls).

## The moves

1. **Introduce each source with the question it answers**, not its bureaucratic identity: "To assess X, we need to define Y."
2. **Screens carry their rationale inline, plus their cost:** say why the screen exists and how many units it drops ("We lose N units by imposing this restriction"). Arbitrary cutoffs are called arbitrary and bracketed: "The cutoff is arbitrary, but I also show results for…"
3. **Teach constructed variables by worked example** — one real record or small-integer arithmetic traced through every coding decision. The single most stealable data-section device.
4. **Narrate linkages with match rate + external benchmark + validation**, algorithm gore exiled: report the match rate, benchmark it against a comparable linkage, and show that matched and unmatched records look similar on observables.
5. **State every mechanical rule flatly**, including tie-breaks ("in case of ties, I pick randomly").
6. **The summary-stats paragraph argues, it doesn't recite**: establish that identifying variation exists (a 75th-vs-25th percentile contrast), explain why patterns exist (selection), preview the result in raw means, and disarm the naive causal reading explicitly.
7. **Limitations: ideal-dataset framing.** State what one would like to observe, then what is available. Every major limitation gets a compensating fact, a symmetry defense (the same procedure applies to every group), or a later robustness pointer; minor ones go to footnotes with the fix stated. Sign the implied bias.
8. **Defend measurement choices with incentives/institutions**, not assertion: who reports the variable, and why they have no incentive to misreport it.
9. **Descriptives must be load-bearing**: each fact reported gets used later ("We use these facts to motivate the mechanism tests in Section V"); orphaned descriptives get cut.
10. Face-validity checks read well: show that the top of a constructed ranking holds the names a reader expects.

## Project-specific content sources

- The project's corpus construction, classification layers, canonical panel(s), and treatment/dose of record come from the project's `CLAUDE.md` and its skill bindings (`.claude/rules/skill-bindings.md` § `write-data`, if present). Describe the construction of record (corrected corpus, override layers), not raw queries or retired measures; say which panel a draft describes.
- Any NEW screen or outcome definition proposed while drafting → `design-check` before it enters the text.

## Revision sweep

- Unit of observation and N stated? Counts at every construction step (auditable)?
- Every analysis variable in the summary table; splits by treatment arm and pre/post.
- No limitation a referee could discover first; each signed and answered.
- First-person active for construction acts: "I define… I collect… We match…"

## Output format — LaTeX → PDF (required)

Follow `${CLAUDE_SKILL_DIR}/../../writing/latex-output.md`: a standalone `.tex` in the paper's drafts directory
plus its compiled PDF, with the draft apparatus visible, delivered as a file.
