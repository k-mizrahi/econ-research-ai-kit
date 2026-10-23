---
name: write-litreview
description: Write or revise the literature-positioning material of a paper — intro antecedents/value-added paragraphs, a named positioning section, or footnote parking — using the canon's non-combative contribution grammar. Use when the user asks for a lit review, related-literature section, or contribution paragraphs.
---

Positioning, not coverage. The job: distinguish the paper from its several closest
neighbors and give credit for anything that might otherwise seem new — in the fewest
words that survive a referee who wrote one of the cited papers.

## Step 0 — Load the ground truth

1. Read `${CLAUDE_SKILL_DIR}/../../writing/econ_writing_principles.md` §4, §9.14, §10.
2. **Exemplar notes** — resolve them per `${CLAUDE_SKILL_DIR}/../../writing/exemplar-schema.md` § Where notes live. **If there are none, stop before drafting:** the style profile is a setup step. Run `add-exemplars` now; it asks which 2–5 papers the user likes for their writing, ideally close to this paper's type. Draft on the principles alone only if the user explicitly asks to, and say so in the draft apparatus. With notes: read `style-profile.md` (its Writing part), then skim their **§B. Literature handling** blocks.
3. Project inventory: the project's reading tracker and summaries, and any settled positioning memo, as the project's `CLAUDE.md` and its skill bindings (`.claude/rules/skill-bindings.md` § `write-litreview`, if present) names them. A settled read on incumbent papers is not re-derived.

## Placement decision

**No standalone "Literature Review" section.** Choose one of:

- **One consolidated intro paragraph**, grouped by strand, each strand opened by a sentence that names it ("The use of X as a source of identification is increasingly common", then its citations).
- **Two closing intro paragraphs** — one debate-framed, one "we also contribute" list with the two nearest neighbors pulled out as "Especially relevant."
- **Distributed** — each result paragraph carries its own one-sentence comparison to the nearest prior paper. Suits multi-result papers.
- **Footnotes as parking lot** for secondary strands + the priority claim ("To our knowledge, we are the first to…"), with the real reconciliation done in the conclusion.
- If a section is unavoidable, name it by content ("Gender Norms in India"), never "Literature Review."

## The contribution grammar (non-negotiable moves)

1. **The formula:** [what the prior approach achieves] + [the one thing it cannot do] + [we do it]. "While this approach recovers X, it cannot distinguish A from B, as our data allow us to do." Limits are attributed to the *approach or data*, never the authors.
2. **Novelty as scope, not superiority:** "Our paper is the first to study X using both A and B outcomes" — one clean sentence, staked on identification, data, or coverage.
3. **Group by method or debate, never chronology:** "On one hand, A argues… On the other hand, B finds…" Mixed evidence presented symmetrically.
4. **Agreement is corroboration:** say plainly that the prior result is consistent with yours; convergent magnitudes are a flex, not a redundancy.
5. **Disagreement targets a belief, not an author:** "Contrary to conventional wisdom…". Prior positive findings get a limitation ("it is not clear how much of this effect reflects sorting"), a proposed reconciliation (often footnoted), or a scope split (large vs. small firms). Recruit allies before concluding against a literature.
6. **Verb palette:** joins, builds on, extends, complements, is consistent with, is analogous to, documents, finds. Banned: fails to, ignores, overlooks, suffers from.
7. **Head's test:** each antecedent cited in the intro must be one whose incompleteness this paper repairs. Everything else moves down or out.
8. Position mostly against peer-reviewed economics; interdisciplinary cites are seasoning.

## Workflow

1. Build/refresh the comparison table from the tracker: paper, venue/year, identification, finding, the one thing it cannot do, relation to ours. Write the paragraphs FROM the table — it forces comparisons on identification/data/outcome rather than vague adjacency.
2. Draft with the placement chosen above; keep ~2 pages max total positioning for a 20-page paper.
3. Referee pass: for each cited paper, ask "if its author refereed us, is this sentence fair and specific?" Fix any sentence that criticizes generally.
4. Priority pass: list everything in our paper that might look new; verify each is either genuinely new or credited.

## Project wiring

- If the project records a settled positioning claim (see bindings), the contribution is staked there; don't invent a different novelty claim without the user.
- Unread items in the project's papers directory → `read-paper` (delegated) before citing anything substantive from them.
- Pointers, not numbers: when citing our own results in positioning text, use rounded headlines from the current summary of record only if the doc is a draft/slide; otherwise point.

## Output format — LaTeX → PDF (required)

Follow `${CLAUDE_SKILL_DIR}/../../writing/latex-output.md`: a standalone `.tex` in the paper's drafts directory
plus its compiled PDF, with the draft apparatus visible, delivered as a file.
