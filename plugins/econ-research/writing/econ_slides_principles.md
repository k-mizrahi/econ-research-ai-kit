# Economic Slide-Deck Principles

**Canonical slide rules for the `write-slides` skill.** Built from the talk canon —
Shapiro "How to Give an Applied Micro Talk" and Goldsmith-Pinkham "Tips + Tricks with
Beamer for Economists". Examples come from talks *you* like and from your own past
decks, collected once at setup with the `add-exemplars` skill (see
`exemplar-schema.md`). Do not restate these rules elsewhere.
Prose rules (one name per concept, no editorializing, kill intensifiers) carry over
from `econ_writing_principles.md` §1 — slides inherit them; they are not repeated here.

---

## 1. What a talk is

1. **"Your audience does not care about your topic."** You have 1–2 slides to change
   their minds — anecdote, fact, or policy question. Never open with textbook framing:
   a slide of abstract-noun motivation bullets is the classic failure; a dated,
   concrete fact with its source is the fix.
2. **Leave documentation to the paper; use the talk to tell your story.** Slides cannot
   be complete. "Always be telling your story" (Shapiro).
3. **Have a bottom line** — one, ideally quantitative, take-away. A description of
   activity ("estimated X with high-quality data") is not a bottom line. A bottom line
   names the effect and its size: "X lowers Y by Z percent of the pre-period mean."
4. **Success = four audience states** (Shapiro's closer): cares about the question,
   understands how you answer it, knows why to believe you, walks out knowing what you
   learned.
5. **A 30-minute talk is not a 90-minute talk delivered faster.** Re-choose emphasis
   for the slot; cut content, not seconds per slide.

## 2. Opening architecture — the paper lands by slide 4

The opening contract:

1. **Slide 1–2: the hook fact**, concrete and dated, ideally a figure.
2. **The question, verbatim and bold**, within 2 slides of the title.
3. **A "This Paper" slide**: Question / Design / **Main finding with numbers** /
   Contribution — the intro-as-contract compressed to one slide (Shapiro's "Preview of
   Findings": "Assume the audience is about to leave … Be tangible but terse" — point
   estimates + placebo contrast + one economic translation; not a one-liner, not a page
   of sample statistics). **Format: bullet points, not a table** — the four labels are
   bold lead-ins on bullets, not table rows.
4. **Priors slide instead of a lit dump.** State what each adjacent literature *found*
   (with its number) and end on the tension the paper resolves (e.g., "Studies of shock
   A find a proportional decline; studies of shock B find possible gains — which
   dominates here?"). A slide of gray citation stacks with no findings is banned.
   Motivate from economics, not the literature ("no one has estimated it in a few
   years" is not a question). A published-paper talk can skip the literature slide
   entirely. **Format: bullet points organized by theme, never a table.** Each theme is one
   bullet block: what that literature found (with its number), then a sub-line stating
   what THIS paper contributes relative to that theme — the contribution is said per
   theme, not saved for a separate slide.
5. **Outline slide optional and cheap** — one enumerate, or skip it for section
   dividers. For long talks: one agenda slide of numbered
   questions, re-shown unchanged at every section boundary as a progress tracker.

Mid-deck checkpoint (Shapiro): by the end of data + design the audience must believe
the question, understand the measure, and know what you'll do with the data —
otherwise "the talk is already over, you just don't know it."

## 3. Slide titles carry the claims

1. **Sentence-claim titles on every slide that has a verdict**, label titles only for
   machinery ("Outline", "Outcomes") and outcome names. Titles can carry the numbers
   themselves ("Manufacturing employment fell 20% in 1999–2007").
   Test: if the projector dies, the titles alone should carry the talk.
2. **No results slide is titled "Results."** A deck with three slides titled
   "Results: <outcome>" gives the audience nothing to tell them apart — a title
   carrying no claim cannot distinguish slides.
3. Exception that proves the rule: when every number is printed on the chart (a
   labeled bar chart), label titles are tolerable; claims must then live on-chart or in a
   verdict line under the figure.

## 4. Results slides

1. **Figures, not tables.** Coefficients become labeled bar charts or event-study paths with the estimates
   printed on them. Tables survive for two jobs only: the pre-period balance table and
   the **summary-of-results table** (one photographable slide, headline row bolded).
2. **One result per slide.** Splits (by education, by cohort, by tercile) get their own
   slides, not columns. The two-panel exception: levels | extensive margin of the SAME
   outcome (the house template, matching the no-log(1+x) convention).
3. **Fixed template, repeated.** The audience learns the layout on the first outcome
   and reads every later one instantly: two panels, bold panel headers, one centered
   takeaway line — **effect + base together** (illustrative: "Control pre-event mean:
   10.0. Levels: −1.0 (SE 0.3). Extensive: −2.0pp (SE 0.6)."), buttons to raw-means / Poisson
   backups.
4. **No naked figures.** Every figure slide carries its takeaway: a verdict line under
   the chart or 2–3 side-column bullets that read the exhibit aloud. A caption
   restating the y-axis is not a takeaway.
5. **Standardize the treatment unit once, repeat it verbatim.** One caption sentence
   ("Effect of a 1 s.d. higher pre-period exposure on …") appears word-for-word on
   every outcome slide, so magnitudes stay comparable across outcomes. Never
   paraphrase it.
6. **Magnitude translation devices** (pick per slide): percent-of-base; counterfactual
   ("effect of halving the shock"); annotated inflection points on a time series
   instead of a table; same-axis bar charts on consecutive slides to race two
   mechanisms.
7. **Raw means and event study are a linked pair, not peers.** Show raw means as a main
   slide only for the zero-stage/headline; every other raw-means twin goes to backup
   with a button. A results section shown twice — raw means, then event studies, as
   peers — is the classic failure.
8. **CIs:** on event-study figures always (pre-trends are shown, not asserted); on
   headline bar charts optional once significance has been adjudicated elsewhere.
9. **No result without its model.** Every frame that shows a regression result —
   coefficient, event-study path, bar of estimates, summary-table row — carries an
   explicit **spec line** saying which model produced it: the equation reference
   (Eq. 1 / Eq. 2 …, matching the design slide or the frame that introduced the
   variant), estimator (OLS levels / LPM / PPML), outcome and unit, sample and n, fixed
   effects, SE clustering, treatment unit. A tiny gray footer (`\specline{}`), the same
   fields in the same order on every results frame, is the house form; it is exempt
   from the §9.1 bullet budget the way the takeaway line is. A footer that names only
   the source CSV, or only the clustering, is not a spec line — the audience must be
   able to say which equation the number is a coefficient of. The summary table gets a
   model column or a per-row equation reference for the same reason.

## 5. Design and model slides

1. **"Be even more explicit"** (Shapiro's three-escalation rule, the house standard for
   seminar decks): the equation, every symbol defined in a with-list, AND the
   identifying assumption — formally stated with a plain-English gloss on the same
   slide. "Identification comes from exogenous variation" in prose, alone, is the
   banned v1.
2. **Each model's equation appears exactly once — at its first use — and never
   zero times.** The baseline equation lives on the design slide with its one-line
   translation ("β_k: the treated–control difference at event time k"). No verbatim
   repeats. But a **second version of the model** (PPML, share-of-output, a two-group
   DiD next to a continuous dose, an alternative FE structure) is a new equation and is
   introduced where it first appears — a results frame may carry it (the spec can sit
   above the event-study figure that needs it). Even a conference or public talk shows
   the baseline equation once. §8's dial sets how much gloss the equation gets, never
   whether it appears.
3. **Both-groups design slides show the design's answer next to its weakness.** If the
   balance table shows treated units ahead on every pre-period measure, say so flatly,
   with the matched comparison and the within-pair specification right next to it.
   Honesty first, then the fix — never hide the imbalance.
4. **Vulnerabilities are budgeted** (Shapiro): pause to discuss the most important
   ones and how you'll assess them; do NOT anticipate every criticism, tour rejected
   models, or discuss fine points no one will raise.
5. **The ideal-experiment slide**: state the ideal experiment in two bullets, then the
   real setting's deviation from it — sets up threats honestly.

## 6. Data slides

1. **The underwear rule:** never narrate processing steps. State the constructed object
   in one line ("Average wage by state, year and gender, excluding outliers
   (>$100/hour in 2008 dollars)").
2. **Answer "where did that come from?" preemptively.** Each source named with its
   count ("12 million job postings, 2010–2018"), each outcome with its source in one line.
3. **Claim credit for the right things** — novel data, new measurement, new variation;
   never effort.
4. **Validate a constructed measure with 2–3 calibration examples spanning its range**
   (one high, one middle, one low), not a validation table.
5. Descriptive facts that motivate the design each get one figure slide with a
   sentence-claim title.

## 7. Robustness and backup armor

1. **The concern→test slide** (the single most portable move): number the
   endogeneity concerns, pair each with "Test: …", reveal one at a time. A referee
   process on one slide, in your framing and ordering.
2. **Robustness never gets tables in the main deck** — one bullet per check, or the
   concern→test slide; full tables go to backup.
3. **Backup slides are armor, wired by labels.** Every anticipated question gets a
   pre-built landing slide (`[label=]` + `\beamergotobutton`/`\beamerreturnbutton`
   round trips): raw means per outcome, PPML, selection, single-event robustness.
   GP: "if you need a busy slide, make it a backup, then have a link. The audience
   will regret ever doubting you."
4. `appendixnumberbeamer` so backups don't inflate the frame count.

## 8. Talk types set the budget

| Type | Budget rule |
|---|---|
| Lunch/internal seminar (30–45') | ~25–33 main frames + armor; full design exposition (§5.1); heavy backup |
| Job talk / seminar (75–90') | everything above, and mechanisms and rival channels get more slides than data + design + baseline combined |
| Published-paper / invited talk | compress design, no lit slide, the measure or data can be the star, ~20–25 slides |
| Public lecture | baseline equation still appears once (§5.2), gloss maximal; breadth of outcomes replaces robustness; give the shock a face (a person, a place) before a number |

Headline position scales with how much the audience must be taught to care: later
when the measure itself is the contribution or the audience is general. For a
department audience, earlier is better — the This-Paper slide carries it regardless.

## 9. Slide mechanics (Goldsmith-Pinkham, quantified)

1. **45–75 characters per line; one sentence per line; never shrink the font to fit.**
   **Density: slides are figure- or table-first.** A slide WITH a figure/table carries
   at most the takeaway line plus 2–3 short reading bullets — nothing else. A slide
   WITHOUT a figure/table carries at most ~4 one-line bullets, no sub-bullets, no
   paragraph-length bullets. Dense text belongs in the companion notes document (§12),
   not on the slide. **Graphs beat tables beat text:** content that can be plotted
   becomes a figure; a small booktabs table is the fallback only for enumerable facts
   that resist plotting. Exceptions that stay bullets regardless: the This-Paper slide
   and the priors/literature slide (§2.3–2.4).
2. **One idea per slide** — "Better to make one point well."
3. **Colorblind-safe palette with fixed semantic roles**: one color everywhere, one for
   emphasis/contrast, one for transitions. Fix the mapping once in the project's
   figure style and let slides inherit it; GP's Okabe–Ito set is a good default.
4. **Navigation symbols off, frame numbers on.** Section transitions via full-bleed
   divider frames (`\Huge` centered), not repeated outline slides.
   **Frame labels must not contain a colon:** with some beamer builds,
   `\begin{frame}[label=bk:robust]` silently drops the frame from the PDF — no error,
   no warning, the page is simply absent. One deck shipped without any of its backup
   frames for this reason. Use underscores (`bk_robust`) and check the page count
   against the frame count after every compile.
   **Every DiD/event-study graph carries a raw-means button**: the twin shows the same
   outcome on the same estimation sample, group means by event time (or by dose group
   for a continuous treatment), no regression adjustment, and lives in the backup with
   a return button.
5. **Overlays (`\pause`, `\only<>`)** for: the This-Paper reveal, concern→test beats,
   swapping series on fixed axes ("keep the similar axes" so the eye doesn't
   re-anchor), sequential table-row reveals. Discipline: unpracticed clicking is
   artificial; don't overuse.
6. **Graph fonts sized for the back row** — "things on your computer look too big but
   audience will thank you." Figure backgrounds match the slide background or are
   transparent (set this once in the project's plotting style).
7. **Don't put anything on a slide you don't plan to talk about; space = emphasis.**
8. One deliberate joke slide per internal talk is fine — placed at a pivot, never
   inside the results.

## 10. Closing

1. **Summary-of-results table** (photographable, headline row bolded) → **numbered
   causal chain** ("Interpretation": 1→5) → **Takeaways** (What we estimate / Main
   findings with the numbers restated verbatim / Implication). Same content at two
   altitudes; the branded magnitude appears identically here and on the This-Paper
   slide, worded exactly as in the paper's abstract.
2. Next-steps slide (internal talks only) — design moves first, then extensions.
3. The last content slide restates the bottom line, not "Thank you" alone.

## 11. Dials, not rules

- **Equation on slides:** Shapiro demands the moment condition; public lectures often
  show none. Resolved here: the equation is never dropped (§5.2); talk type (§8) only
  sets how much gloss it gets.
- **Claims in titles vs. on-chart:** a claim title and a labeled chart with numbers on
  the bars both work; the house style titles the claim AND keeps the
  takeaway line — never neither.
- **Roadmap slide:** GP replaces it with divider frames; a recurring agenda
  tracker earns its keep only in 40+-slide talks; a single enumerate is fine.
  Genericity test from the writing doc applies.
- **CIs on headline exhibits:** always for a design still being adjudicated; droppable
  in published-paper talks.

## 12. Companion notes document

Every deck ships with a per-slide explainer PDF — the text that the §9.1 density rule
pushed off the slides lands here, not nowhere.

1. **File**: same dir and stem as the deck, `_notes` suffix
   (`{occasion}_{YYYY-MM-DD}_notes.tex` → `.pdf`), article class, compiled with the
   same LaTeX toolchain (`latex-output.md`).
2. **Structure**: one numbered section per frame, in deck order, titled with the
   frame's title (backup frames in a separate appendix part). Each section explains:
   (a) what the slide shows and how to read the exhibit; (b) the exact numbers with
   their results-log / CSV source; (c) the intended talk track (what to say);
   (d) anticipated questions and which backup frame answers them.
3. **Verification**: the notes doc carries full-precision numbers, so `check-output`
   applies to it exactly as to the deck.
4. **Delivery**: deck PDF + notes PDF travel together; a deck without its notes doc
   is not done.
