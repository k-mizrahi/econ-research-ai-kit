# Economic Writing Principles

**Canonical writing rules for the section-writing skills.** Built from the craft canon
— McCloskey *Economical Writing*, Cochrane "Writing Tips for PhD Students", Shapiro
"Four Steps to an Applied Micro Paper", Head "The Introduction Formula", Bellemare,
Nikolov (IZA DP 15057), Goldin–Katz. Examples come from papers *you* like, collected once at
setup with the `add-exemplars` skill. The section-writing skills (`write-intro`, `write-litreview`, `write-data`,
`write-design`, `write-results`) point here; do not restate these rules elsewhere.

---

## 0. The writing process (Shapiro's Four Steps)

1. **Aspirational introduction.** Write the intro for the paper you aspire to write; make up results within reason. Test: "if I write the paper outlined in this introduction, will I be happy with it?"
2. **Research.** Start with the aspect most likely to kill the project. "Return frequently to the introduction. It is your compass."
3. **Robot.** Write the body for a robot: don't persuade, just state assumptions, methods, findings. Linear (never use an undefined concept), plain ("the robot does not understand fancy talk and is not impressed by it").
4. **Contractual introduction.** Rewrite the intro as a contract: the reader agrees to be excited provided the paper delivers what the intro promises. Every intro claim maps to a table/figure that cashes it.

---

## 1. General prose principles (McCloskey-heavy)

1. **Writing is thinking.** If a passage won't write clearly, the idea isn't clear yet; fix the idea first.
2. **One point per paragraph, stated in the first sentence.** If you can't write the paragraph's point in one marginal clause, split or cut.
3. **The "so what" test.** Delete any paragraph that only exists because you did the work.
4. **No boilerplate.** No throat-clearing openers ("Economists have long been interested in…"), no "This section discusses…". Delete the first paragraph of any early-draft section and check whether anything is lost.
5. **No table-of-contents paragraphs inside sections.** Headings carry structure. (Intro roadmap is the one contested exception — see §3.8.)
6. **No elegant variation: one thing, one name, throughout.** If "treatment effect," "impact," and "influence" all mean the same estimand, pick one. Same for sample names, group labels, variable names.
7. **Verbs over nominalizations; active over passive.** "I collected data," not "Data was collected." Search "-tion of," "is/are + past participle."
8. **Concrete short words.** "use" not "utilize," "to" not "in order to," "whether" not "whether or not."
9. **Minimal jargon, no invented acronyms.** Any word you don't read in a newspaper is suspect.
10. **A naked "this" is a bug.** Every "This shows…" gets a noun: "This coefficient," "This restriction."
11. **Kill intensifiers and editorializing adverbs.** Search-and-destroy: very, quite, clearly, obviously, interestingly, importantly, strikingly, of course. (Allow at most one "strikingly" per paper, spent on the headline.)
12. **Emphatic word at the end of the sentence.** End on the number or the finding, not a citation or qualifier. Vary sentence length around a short mean.
13. **Revise by ear.** Read aloud; where you stumble, rewrite.
14. **Clarity is an ethical duty.** Unclear prose either hides a weakness or wastes the reader's time.
15. **Formulaic reporting language is fine; repeated content is not.** "Column (2) reports…" can repeat forever; an *idea* stated twice loses one instance.
16. **Present tense, formal citations.** "Oster (2012) finds…", "I show…" — never "I will show" or "we showed."
17. **Footnote discipline.** Nothing essential below the line; genuine tangents and small caveats only. (Footnotes are the right place for secondary literatures, worked arithmetic, and small caveats.)
18. **Triage: one paper, one point.** Write the one-paragraph contribution statement first; everything that doesn't serve it goes to the appendix or dies.
19. **Write for a skimming reader.** Abstract + first two pages + headings + table titles must convey question, answer, and method.

---

## 2. Abstract

1. Write it last, after the contractual intro is stable.
2. State the question, the answer with magnitudes, and how you learned it — not the topic. Ban "This paper studies…" as the load-bearing sentence.
3. Be specific, not promissory: name the estimand, the source of variation, and the headline number or direction.
4. ~100–150 words. Cut secondary results and caveats first.

## 3. Introduction

Backbone = Head's formula: **hook → question → antecedents → value-added → roadmap**, ~5–7 paragraphs (longer when the paper does several distinct things).

1. **Hook on one of four grounds** (Head): Y matters; Y is puzzling; Y is controversial; Y is big/common. Zero literature in the hook.
2. **Two hook sins:** bait-and-switch (promise interesting, deliver boring) and "all my friends are doing it" (motivating by the existence of other papers).
3. **The question sentence appears by end of ¶2 / start of ¶3**, clean enough that the paper can answer it.
4. **Answer immediately after question — don't bury the lead** (Cochrane: not a mystery novel). Headline estimate with magnitude and units in the first 1–2 pages. Caveats and robustness stay out of the intro.
5. **Antecedents: only prior work whose incompleteness your paper repairs.** Everything else → positioning paragraph or footnote.
6. **Value-added: ~3 contributions stated relative to the antecedents.** Head's test: the *question* must be understandable from the hook alone; a *contribution* should only make sense in light of prior work — if it's intelligible without the literature, it's actually the question.
7. **The intro is a contract** — line-by-line, every claim maps to the exhibit that cashes it.
8. **Roadmap: contested.** Head/Nikolov: keep it, short, with project-specific landmarks. Cochrane/McCloskey: cut it. Resolution: if it survives find-and-replace onto another paper, delete it. (Section-handoff sentences at the end of each section are the alternative.)
9. **Length bound:** ~3 pages. Over that, the lit review or robustness has leaked in — evict.
10. **Write the intro first, edit it every session** (Head: "If you can't write a good introduction, then you may be writing the wrong paper").

## 4. Literature / positioning

1. Two legitimate placements: folded into the intro (antecedents + value-added), or a separate short *well-named* section. Never pages of literature at the top of the intro. **Avoid a standalone literature-review section.**
2. Never title a section "Literature Review." Name it by content.
3. The job is positioning, not coverage: distinguish from the several closest papers; give credit for anything that might otherwise seem new.
4. Generous, non-insulting: criticize a *specific incompleteness your paper fixes*, attributed to the approach/data, never the authors.
5. Position mostly against peer-reviewed economics.
6. Keep a literature spreadsheet (study, journal/year, identification, results, caveats, relation) and write the positioning paragraphs from it.

## 5. Data

1. ~1 page main text (2–3 when the data construction *is* a contribution); gore to the appendix with a one-sentence pointer.
2. Description checklist: source, period, structure, unit of observation, N, the central variables — space allocated by importance.
3. State limitations against the ideal dataset; major ones in text with a later robustness exercise attached, minor ones in footnotes. Never let a referee find a limitation you didn't flag.
4. Summary stats: means/SDs for every analysis variable, by relevant subgroups (treatment/control, pre/post).
5. Descriptives do work: each reported fact is used later; orphaned descriptives get cut.
6. Sample construction is part of the section: screens, reasons, counts dropped at each step.

## 6. Research design / empirical strategy

1. 2–3 pages; split into estimation strategy (equation, estimator) and identification strategy (why causal).
2. Write the estimating equation; define every symbol; mark the parameter of interest; state FEs and clustering with one-line justifications.
3. Justify the specification; every right-hand-side choice defensible in one sentence.
4. **Identifying assumption in your setting's words, never textbook form.** Delete any paragraph that would survive transplantation into another DiD paper.
5. Name the threats (reverse causality, OVB, selection, measurement error) and answer each with a design feature or promised test.
6. One plain-language design sentence before any algebra: "the design compares [these units] to [those units] around [this event]." If you can't write it, the design isn't clear yet.
7. Connect data limitations to identification.
8. Robot rules apply: linear, plain, no rhetoric.

## 7. Results

1. Less is more; every reported estimate serves the main point. Main tables show the parameters of interest, not every control.
2. Order by importance, never by the order you ran things: main result → robustness → mechanisms/heterogeneity.
3. Results-paragraph template: opens with a substantive claim, walks the columns with magnitudes, closes tying back to the hypothesis.
4. **Magnitudes in interpretable units, never just signs and stars.** Statistical significance ≠ economic significance; never "significant" when you mean "large"; distinguish "imprecisely estimated" from "zero."
5. Tables self-contained: informative titles, human-readable labels (no software variable names), notes complete enough that the table stands alone, SEs-vs-t-stats stated.
6. No false precision: uniform decimals, or round the SE to its first nonzero digit and match the coefficient; rescale away leading zeros.
7. Robustness: acknowledge prominently, present parsimoniously — one summary exhibit or paragraph in the body, full tables in the appendix, never before the main result, never in the intro.
8. Report mixed results honestly and symmetrically; no asymmetric vagueness for unfavorable estimates. (House rule, reinforced: no editorializing point estimates as good/bad.)
9. Prefer a figure for the key result where the design allows (event studies especially): the headline exhibit is the picture of the identifying variation; the table backs it.

## 8. Conclusion

1. Don't mirror the intro; no verbatim recap.
2. Bellemare's formula: brief summary → limitations → implications (caution proportional to identification) → future research. House length: ~1–1.5 pages.
3. Normative restraint: policy claims must follow from the estimates with the external-validity caveat attached.
4. A short conclusion is fine and often best.

---

## 9. Shared defaults

Patterns that strong applied-micro papers share. Treat them as defaults, not options,
and check them against your notes on papers you like.

1. **The headline magnitude appears in the intro**, usually by ¶2–6, always with its base: "level change (percent of mean) after k years," a range ("5 to 10%"), or a concrete counterfactual person or move. Exception: a compact null-result intro may defer numbers but states direction and design.
2. **The identifying assumption gets one plain-English sentence**, in the setting's own nouns, often stated twice, verbatim (intro + strategy section).
3. **Sign the bias, always.** Never "may be biased" — say which way: toward zero, or an overestimate. The direction is the argument.
4. **Voice the killer objection in your own words before the referee can**, then dispatch it: "One may worry that…", "A concern for our analysis is…", "These differences could reflect… or could reflect…".
5. **Raw data before regressions.** A figure or two-group means table showing the identifying variation precedes the workhorse spec.
6. **Falsification logic before falsification result:** "Finding positive lead coefficients would cast doubt on…" — pre-trends and placebos framed as tests the design could have failed.
7. **Every coefficient is converted**: to percent of a stated mean, an IQR contrast, dollars, a share of an aggregate, or a variance-explained. A number never sits uninterpreted. The denominator is defined once (often in a footnote) and reused.
8. **Nulls are never naked**: say whether the zero is precisely or imprecisely estimated, and give the ruled-out effect size scaled by the mean ("we can rule out a reduction of more than X; the mean is Y"). Load-bearing nulls are tied to the theory they kill.
9. **Robustness is compressed**: one clause or sentence per check with the moved coefficient and an appendix address; cross-design agreement is itself the robustness argument.
10. **Verdict-first topic sentences**: "The magnitude of the effects is large." Section-ending synthesis sentences state what was learned before moving on; subsection headers can assert findings ("Sorting Does Not Explain the Effect").
11. **Screens carry their rationale inline**, with the cost reported (how many units each screen drops). Arbitrary cutoffs are called arbitrary and bracketed with alternatives.
12. **Constructed variables are taught by worked example** with small integers or one real record traced through every coding decision — the single most stealable data-section device.
13. **Linkages are narrated with match rates + external benchmark + validation check**, algorithm gore exiled to the appendix.
14. **Prior work is never trashed.** The formula: [what the prior approach achieves] + [the one thing it cannot do] + [we do it]. Disagreement targets a belief or an approach, never an author; differing results get a proposed reconciliation, often in a footnote. Agreement is corroboration.
15. **Enumerated scaffolds everywhere**: "Two main challenges arise… First… Second…"; threats named and numbered; mechanisms as named hypotheses with testable implications stated *before* the table, and a verdict sentence after.
16. **Evidence addresses travel with claims**: "(column 6 of Table 3, significant at 1 percent)" — parenthetical, so sentences stay declarative.
17. **Excitement is displaced onto the evidence, never the authors.** Roughly one vivid flourish per paper, spent late. Calibrated hedges: "arguably exogenous," "suggestive evidence," interpretation one notch below the evidence.
18. **Purpose-first sentence openers** for methods: "To address endogeneity, we…"; "To investigate the timing…, we estimate…".

## 10. Explicit disagreements in the canon

- **Roadmap paragraph:** Head/Nikolov keep (short, specific); Cochrane/McCloskey cut. Test: a roadmap that fits any paper fails both camps.
- **Literature in the intro:** Head puts antecedents in ¶3–6; Cochrane exiles all of it to a later section; Nikolov allows either. Binding constraint all share: your contribution before other people's; closest papers only.
- **Robustness visibility:** Nikolov allows a named body section; Cochrane pushes tables to the appendix with one line. Common ground: mention in body, details out of the reading path, never in the intro.
