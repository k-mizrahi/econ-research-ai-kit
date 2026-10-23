---
name: write-onepager
description: Compile a one-page extended abstract plus 3–4 figure pages for one paper — question, motivation, design, main results, mechanisms in brief, status and open decisions — written in the readable register of a top-5 introduction, for an outside reader. Compiles from a fixed manifest of state-of-record sources, never from a full draft or "all the docs"; requires a ratified framing block; runs `refresh` first when the project stamp is stale. Use when the user asks for a one-pager, extended abstract, project brief, or "something to send my advisor".
argument-hint: "[paper] [--audience advisor|external] [--figures 3|4] [--skip-refresh]"
---

A one-pager is a **status document that carries numbers**: the paper's contract in
~500 words, written the way the first page of an AER introduction reads, with the
exhibits that cash it on the pages behind. It is compiled from the state of record,
not written fresh, so two one-pagers a month apart tell the same story with updated
numbers.

Three things this skill refuses to do: read "the whole project", invent narrative
language, or ship without `check-output`.

## Step 0 — Staleness gate (every run, before reading anything else)

The one-pager compiles the record. If the record is stale, the one-pager is stale.

1. Read the `Last refresh: YYYY-MM-DD @ <sha>` line in the project's `CLAUDE.md` § Status.
2. Compute both distances: calendar days since the date, and
   `git log --oneline <sha>..HEAD | wc -l` commits since the sha.
3. **Stale** = more than 31 days OR 50+ commits OR the sha is not an ancestor of
   HEAD OR the line is missing. Not stale → say so in one line (`stamp
   2026-09-15 @ 1ac1c3c, 13 days / 4 commits`) and continue.
4. Stale → **invoke `refresh` now, before Step 1.** This is the one sanctioned
   automatic trigger of `refresh`. `refresh`
   keeps its own interactive round, so the user still rules on every significant
   finding. When it returns, re-read the stamp and continue.
5. `--skip-refresh` skips the invocation only. The provenance note (Step 5) then reads
   `record NOT refreshed — stamp <date>, <n> commits behind`; that text is not
   removable.

## Step 1 — The source manifest (read these, nothing else)

Resolve the pointers in the project's `CLAUDE.md` § Status for the requested paper, and
the project's exact manifest paths from its skill bindings (`.claude/rules/skill-bindings.md`
§ `write-onepager`) when present — the bindings override the generic rows below. Then read:

| Source | What it gives the one-pager |
|---|---|
| `CLAUDE.md` § Status, the paper's live-state line | current milestone, the summary of record's path, the open user decisions |
| The dated **summary of record** named there (if none is valid, the results-log entries § Status names instead) | headline results with their precision hierarchy, gated/do-not-cite list, settled-decisions table |
| The paper's results log(s) as `CLAUDE.md` routes them, from the summary date forward | every number that goes on the page, at full precision |
| The paper's exhibits-of-record list | which figures may appear on the figure pages |
| The paper's decision register(s), incl. shared rows that affect it — rows marked `provisional` or gating a claim for this paper | what must not be claimed |
| The paper's **narrative constraints of record** (facts register, gated list — location per bindings) | the sentences that are allowed |
| The project's backlog/tracker — open items for this paper tagged as user decisions | the "open decisions" bullets |
| The latest **deck of record** `.tex` + its `_notes.pdf` (the paper's slides dir) | the This-Paper slide, the chosen figures, spec lines already verified by `check-output` |
| `${CLAUDE_SKILL_DIR}/../../writing/econ_writing_principles.md` §2 (abstract), §3 (intro), §9 (shared defaults) | the prose rules |
| The user's exemplar notes (per `${CLAUDE_SKILL_DIR}/../../writing/exemplar-schema.md` § Where notes live; if there are none, stop and run `add-exemplars` first, the setup step, unless the user explicitly asks to proceed without) — the **§A. Introduction architecture** and abstract blocks of the 2–3 papers closest to this one (bindings may name them per paper) | the register: how a top-5 paper states question, design, and magnitude in plain English |

Do **not** read: archive directories, `handoffs/`, superseded summaries,
older decks, agent memory, the paper's intro drafts unless Step 2
names one. A number found anywhere outside the results logs, the generating CSV, or
the current summary of record is not a source; if it disagrees with the log, the log
wins and the disagreement is reported.

## Step 2 — The framing block (prerequisite; stop if absent)

A one-pager forces the narrative choice. That choice is the user's, so the skill
needs a **ratified framing block** (~150 words: Question / Design / Headline with
magnitude and denominator / Contribution) before writing prose. Resolve in this order:

1. The paper's `onepager/framing.md` (location per bindings / `CLAUDE.md`) exists and
   its date is later than the newest narrative decision in the paper's decision register
   → use it verbatim.
2. Else the **This-Paper frame** of the deck of record, provided the deck is not
   bannered as superseded → adopt it as the framing block, write it to `framing.md`
   with today's date and `source: <deck path>`, and say so.
3. Else an intro draft's abstract, only if the draft carries no superseded banner.
4. Else draft a framing block from the Step 1 sources, show it, and **stop**. The
   one-pager is written in the next turn, after the user ratifies or edits it.
   Ratification is recorded via `log-decision` (provisional, revisit = next
   narrative decision).

Narrative language never exceeds the facts register. Any sentence that would need a
claim outside the register is cut, not softened.

## Step 3 — Page 1: write it like the first page of a top-5 introduction

**Register (binding).** Page 1 is prose for an economist who has not seen the
project, not a spec sheet. Model it on the abstract plus the opening paragraphs of
the exemplar intros read in Step 1: verdict-first sentences, the setting's nouns
instead of variable names, one magnitude per result stated with its base ("about
a fifth of the pre-period mean"), and the identifying comparison in one plain
sentence. No estimating equation, no spec line, no coefficient-and-SE dumps, no
tracker ids, no pre-trend p-values on page 1 — all of that moves to the figure
captions and the draft apparatus, where the reader who wants it can find it.
The test: a labor economist outside the field reads page 1 in three minutes and can
restate the question, the comparison, and the headline magnitude.

**The brief (≤ ~550 words, one column, one-half spacing, may run onto a second
page — never shrink spacing or font to force one page).** Write the job of each
block first, then prose. Each block below is a **named section** (`\section*{}`),
so a reader can find the design or the result without reading linearly.

1. **Title block** — a real title (`\maketitle`-style, centered): the paper's
   title; subtitle `Research brief`; author; date. No banner here — provenance
   goes on the last page (Step 5).
2. **Motivation and question** (one paragraph) — one hook ground (Y matters / is puzzling
   / is big), anchored on a concrete fact the motivation figure shows; then the
   "This paper asks…" sentence. Zero literature review.
3. **Research design and data** (one paragraph) — the setting, who is compared
   with whom, why that comparison isolates the effect, and what the data are, in
   plain English (the AGZW / JPB move). Name the data source and the sample size
   once, in words.
4. **Main results** (one paragraph) — verdict topic sentence, then the headline
   magnitude with its base and horizon, then one sentence on what the pre-period
   shows, in words ("outcomes for more- and less-exposed units move together
   before the event"). Where a pre-trend verdict of record is mixed (e.g. count
   outcomes fail, extensive margin passes), say so in one sentence — narrate both.
   Nulls carry the ruled-out effect size in words.
5. **Mechanisms and interpretation** (one paragraph) — the named channel(s) and
   their verdict, non-causal evidence fenced as such, one sentence of stakes.
6. **Where the project stands** (2–3 sentences, advisor audience only; section
   title as written) — what is
   settled, what is being decided now, and what the reader is asked to weigh in on.
   Plain words; tracker ids go in the apparatus.

Literature: at most one positioning sentence, and only if it earns its place;
citations, if any, by author-year in parentheses.

## Step 3b — Figure pages: 3–4 exhibits that tell the story in order

The figures are not decoration; they are the exhibits the page-1 contract cashes,
in reading order. **Composition (binding):**

1. **Motivation** — one descriptive exhibit that shows the fact the hook rests on
   (a time series, a raw-means plot, a cross-section).
2. **Main analysis** — the headline event-study / coefficient plot for the
   specification of record. **Mandatory.** A one-pager without the main
   event-study figure is not done.
3. **Mechanism or heterogeneity** — the exhibit behind Step 3 ¶5.
4. *(optional)* **Validation or robustness** — pre-trend exhibit, alternative
   estimator, or the second main outcome.

Each figure page: a claim-title (a finding, not "Figure 2"), the figure, and a
caption that carries the technical detail page 1 does not: the estimating equation
for the main-analysis figure (numbered, `amsmath`, once), a spec line with the
deck's fields in the deck's order (estimator, outcome + unit, sample + n, FEs,
clustering, treatment unit), the pre-trend verdict with its statistic, and the
source CSV name.

**Sourcing.** Use, in this order: (a) exhibits listed in the paper's exhibits of record;
(b) figures the **deck of record** includes (they passed `check-output` with the
deck) — record each such use in the apparatus as a manifest gap for the user to
close. Include via `\graphicspath` from the figures output dir, never copied. A needed
exhibit that exists nowhere becomes a TODO for the project's figure skill/style in the report, not a
substitute figure; only the main-analysis figure blocks delivery if missing.

## Step 4 — Contract audit and lint

Two-column table, claim → exhibit or results_log entry, under "Draft apparatus".
Any claim without a source is cut. Then the lint:

- **Readability**: the brief has no equation, no spec line, no variable names, no
  tracker ids, no p-values; every number in it has a base or a unit in words.
- **Layout**: title block present; the five section headings present, in order;
  one-half spacing throughout the brief; no banner or process note before the
  last page.
- No editorializing estimates (no "good", "reassuring", "exciting"); ≤1 "striking".
- One name per concept across page 1 and the captions.
- Captions carry SE or CI with each coefficient; counts and sample sizes match
  the spec line.
- No claim from the gated / do-not-cite list; no superseded number (the bindings list
  the project's known superseded numbers).
- Figure pages: 3–4, the main event-study figure present, order = motivation →
  main → mechanism → (validation).
- Word count of page 1 ≤ ~550; if over, the mechanisms paragraph shrinks first.

## Step 5 — Output format: LaTeX → PDF

1. **File**: `{onepager_dir}/{paper}_onepager_{YYYY-MM-DD}.tex` (the paper's onepager dir
   per bindings / `CLAUDE.md`; default `onepager/`).
   New dated file every run; earlier one-pagers stay, the newest is the record.
   Preamble: `\documentclass[11pt]{article}`, `\usepackage[margin=0.9in]{geometry}`,
   `amsmath`, `booktabs`, `graphicx`, `caption`, `hyperref`, `setspace` with
   `\onehalfspacing` for the brief (captions and apparatus may be single-spaced),
   `natbib` only if a citation is used. Title via `\title`/`\author`/`\date` +
   `\maketitle`; sections via `\section*{}`. A `\specline{}` macro matching the
   deck's, used in captions only.
2. **Figure pages** start on a fresh page after the brief (`\clearpage`).
3. **Draft apparatus** after the figures (`\clearpage`), headed "Draft apparatus —
   not part of the brief": the contract-audit table, the source manifest actually
   read with paths, the tracker items behind ¶6, and any manifest gaps from
   Step 3b.
4. **Provenance note — LAST thing in the document** (small type, framed):
   `Compiled YYYY-MM-DD from the state of record · last project refresh <stamp> ·
   numbers verified by `check-output` <date> (<verification CSV>) · not for
   citation`. Under `--skip-refresh` it carries the stale-stamp line from Step 0.
   Nothing of this kind appears at the top of the document.
5. **Compile** per `${CLAUDE_SKILL_DIR}/../../writing/latex-output.md` §3 (the project's recipe, else any TeX on
   PATH): `cd` to the tex's dir, `pdflatex` ×2, `bibtex` between only if citations
   resolve. Not done until it compiles clean.
6. **Deliver the PDF**; the `.tex` is the editable source. Never write into a
   read-only sync mirror the project flags; any Overleaf path only on explicit instruction.

## Step 6 — Verify before it leaves the repo

Run `check-output` on the compiled `.tex`. A MISMATCH is fixed at the one-pager,
never at the source; an UNVERIFIABLE number is removed. Paste the verification
CSV path into the provenance note. The one-pager is a sanctioned number-carrying document
(same exception as slides and drafts), which is exactly why this step is not optional.

No `log-result` (no new numbers are produced). If Step 2 ratified a framing block,
`log-decision` was already invoked there.

## Rules

- Sources are the manifest in Step 1. Reading beyond it is a bug, not diligence.
- The framing block is the user's; the skill compiles, it does not decide the story.
- Numbers come only from the routed results logs, the generating CSV, and the
  current summary of record. Copying from a plan, memory, or an old deck is a bug.
- House voice: report what the numbers are; no interpretation as good or bad.
- Page 1 is readable prose; the technical apparatus lives in captions and the
  appendix pages. Technical detail is never deleted, only moved.
- Every run passes the Step 0 gate. A stale record is refreshed, not worked around.

## Arguments

Default paper: ask if not given. Default audience: advisor (external drops the
where-the-project-stands paragraph). Default figures: 4 (never fewer than 3; the
main event-study figure is always one of them).
