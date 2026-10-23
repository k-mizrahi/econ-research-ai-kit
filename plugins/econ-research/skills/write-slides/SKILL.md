---
name: write-slides
description: Build or revise a beamer slide deck for a research talk — opening contract, claim titles, figure/table-first minimal-text frames, concern→test robustness, wired backup armor — plus the mandatory companion per-slide notes PDF, using the slide-craft playbook from Shapiro and Goldsmith-Pinkham and the talks and decks the user likes. Use when the user asks to make, outline, or tighten slides, a deck, or a talk.
---

Build a deck where the paper lands by slide 4, every verdict slide's title states the
claim, and every anticipated question has a pre-built backup slide.

## Step 0 — Load the ground truth

1. Read `${CLAUDE_SKILL_DIR}/../../writing/econ_slides_principles.md` (canonical rules — this skill only
   carries the workflow). For deeper evidence, resolve the user's talk notes (`slides_*.md`)
   per `${CLAUDE_SKILL_DIR}/../../writing/exemplar-schema.md` § Where notes live. **If there are none, stop before
   building the deck:** the style profile is a setup step. Run `add-exemplars` now; it
   asks for one or two of the user's own past decks (PDF, or the `.tex` source) and,
   optionally, 2–5 talks they like. Build on the principles alone only if the user
   explicitly asks to. With notes: read `style-profile.md` (its Slides part), then the
   talk notes. When the user's own deck has a `.tex`
   source, reuse its beamer theme, colors, and macros.
2. Pull numbers ONLY from the paper's results log (wherever the project's `CLAUDE.md` routes results), the generating CSVs, and the current
   dated summary of record — never from older decks, plans, or memory. Slides are the
   sanctioned exception that carries full numbers; that makes `check-output`
   **mandatory before the deck ships anywhere** (it exists for exactly this).
3. Check narrative constraints of record before writing any claim slide — the paper's
   facts register and gating decisions, resolved from the project's `CLAUDE.md` and its skill bindings (`.claude/rules/skill-bindings.md` § `write-slides`, if present).
   A slide is a public claim — gated claims stay off slides.
4. Figures come from the paper's figures output directory (per the project's `CLAUDE.md`)
   via `\graphicspath` — never copy figures into a slides dir. If a needed exhibit doesn't
   exist, list it as a TODO for the project's figure skill/style if one exists (use its
   slides style, not the paper style); do not substitute a paper-styled or stale figure
   silently.

## Step 1 — Set the budget (talk type)

Ask for slot length and audience if not given, then apply principles §8:

- **Lunch/internal (30–45')** — default: ~25–33 main frames + backup armor, full
  Shapiro-explicit design slide, one sanctioned joke max.
- **Seminar/job talk (75–90')**: mechanisms/rebuttal get ~2× the space of
  data+design+baseline combined; armor doubles.
- **Conference (15–20')**: This-Paper slide + zero stage + headline + one mechanism +
  summary table; design compressed to the identifying comparison in words.
- Public lecture / published-paper talk: see principles §8 (rare here).

## Step 2 — Skeleton first (one line per frame)

Write the frame list with each frame's JOB and title before any body content. Required
spine (principles §§2, 10):

1. Hook fact (figure, dated, concrete) — 1–2 frames
2. **This Paper**: Question / Design / Main finding with numbers / Contribution —
   bullet points with bold lead-ins, never a table (principles §2.3)
3. Priors-with-numbers slide (NOT a citation dump): bullets organized by theme,
   never a table; each theme states what it found AND what this paper contributes
   relative to it (principles §2.4); end on the tension
4. 1–3 descriptive motivating-fact figures, each with a sentence-claim title
5. Data: sources with counts, one-line constructed objects (underwear rule),
   measure validation by 2–3 calibration examples
6. Design: ideal experiment → real setting; baseline equation once, numbered,
   Shapiro-explicit (symbols defined + identifying assumption formal AND glossed);
   balance shown honestly with the design's answer adjacent. **Never a deck with zero
   equations**, whatever the talk type (principles §5.2)
7. Results: zero stage first (raw + event study as the linked pair), then one
   outcome per frame on the fixed two-panel template (levels | extensive) with the
   effect+base takeaway line, backup buttons, and a **spec line** naming the model
   (principles §4.9). A **second version of the model** (PPML, share-of-output, other
   FEs) gets its own numbered equation on the frame where it first appears — never a
   verbatim repeat of an equation already shown, never a variant without one
8. Mechanisms — one result per frame; juxtaposed same-axis charts to race channels
9. Concern→test robustness slide (numbered concerns, each with "Test: …", overlaid)
10. Summary table (headline row bolded) → Interpretation (numbered chain) → Takeaways
11. Backup armor: raw means per outcome, PPML, selection, robustness, heterogeneity —
    every frame `[label=]` with `\beamergotobutton`/`\beamerreturnbutton` round trips.
    **Every DiD/event-study graph gets a raw-means button** to a backup twin of the
    same outcome on the same sample (principles §9.4). Labels use underscores, never a
    colon — a colon silently drops the frame from the PDF.

Get the skeleton approved before writing frames if the deck is new; go straight to
frames when revising an existing deck.

## Step 3 — Write the frames

- Title test: projector dies → titles alone carry the talk. No frame titled "Results."
- No naked figures: verdict line under the chart or 2–3 side-column bullets reading
  the exhibit aloud; effect and base always together.
- Fix the treatment-unit sentence once; repeat verbatim on every results frame.
- **No result without its model** (principles §4.9): every frame showing a regression
  result carries `\specline{}` — equation reference, estimator, outcome + unit, sample
  + n, FEs, clustering, treatment unit — same fields, same order, every time. Define
  the macro once (`\newcommand{\specline}[1]{\vskip2pt{\tiny\textcolor{gray}{#1}}}`)
  and number equations (`\begin{equation}` + `\label`) so the footer can say
  "Eq.~(1), OLS levels". A source-CSV note is not a spec line. Summary table: model
  column or per-row equation reference.
- Equations: each model's equation once, at first use; variants introduced where they
  first appear; nothing shown twice, nothing dropped (principles §5.2).
- Density (principles §9.1, tightened 2026-09-15): slides are figure- or table-first
  and carry LITTLE text. A frame WITH a figure/table gets the takeaway line plus at
  most 2–3 short reading bullets, nothing else. A frame WITHOUT a figure/table gets
  at most ~4 one-line bullets — no sub-bullets, no paragraph bullets; if it wants
  more, move the prose to the companion notes doc. Graphs beat tables beat text
  (principles §9.1): plot what can be plotted; a small booktabs table only for
  enumerable facts that resist plotting; This-Paper and priors slides stay bullets
  regardless. 45–75 chars/line, one sentence per line, never shrink fonts —
  overflow goes to the notes doc or a backup frame. One idea per frame.
- Overlays only where practiced beats exist (This-Paper reveal, concern→test,
  fixed-axis series swaps).
- Don't put anything on a frame you don't plan to say; space = emphasis.
- Prose rules inherit from `econ_writing_principles.md` §1 (one name per concept, no
  editorializing point estimates, kill intensifiers).

## Step 4 — Lint pass (common failure modes)

Sweep for: label-only titles on verdict slides; duplicate titles; abstract-noun
motivation bullets; citation-stack lit slides; a table-formatted This-Paper or
priors slide; a priors theme with no stated contribution of this paper; a table
where the content is plottable; naked figures; captions restating the
y-axis; raw-means/event-study duplication as peer main slides; numbers on slides that
aren't in the routed results log; gated claims; duplicate `\usepackage` lines; **density
violations** (any text-only frame with >4 bullets or any paragraph-length bullet; any
figure/table frame carrying body text beyond the takeaway + 2–3 reading bullets —
move the excess to the notes doc); a deck without its companion notes PDF; **a frame
label containing a colon** (silently dropped — compare PDF page count to frame count);
an event-study graph without a raw-means button; **a regression-result frame
without a spec line, or a spec line that doesn't name the equation** (§4.9); **a
deck with zero equations; the same equation shown twice; a variant model (PPML,
share, other FEs) with results but no introduced equation** (§5.2).

## Output format — beamer → PDF (required)

1. **File**: `{slides_dir}/{occasion}_{YYYY-MM-DD}.tex`, where `{slides_dir}` is the
   paper's slides directory per the project's `CLAUDE.md` (or the path the user names).
   Base: `\documentclass[11pt,aspectratio=169]{beamer}`, theme per the project's
   deck of record if one exists, else Madrid with `\setbeamertemplate{navigation symbols}{}`
   and frame numbers on, or metropolis; `appendixnumberbeamer` (not
   `\pagenumbering{numstyle}` — known latent bug); `\graphicspath` into the figures
   output dir; booktabs, amsmath.
2. **Compile** per `${CLAUDE_SKILL_DIR}/../../writing/latex-output.md` §3 (the project's recipe, else any TeX on
   PATH): cd to the tex dir, symlink figure dirs
   if needed, pdflatex ×2 (bibtex between if citing; biber only with biblatex). A deck is not done until it
   compiles clean with every figure resolving — a missing-figure box is a shipping bug.
3. **Verify numbers**: run `check-output` on the compiled deck before hand-off.
4. **Companion notes PDF (required — principles §12)**: `{occasion}_{YYYY-MM-DD}_notes.tex`
   → `.pdf`, article class, same dir, same toolchain. One numbered section per frame in
   deck order (backup frames in an appendix part), titled with the frame's title, each
   covering: what the slide shows and how to read the exhibit; the exact numbers with
   their results_log/CSV source; the intended talk track; anticipated questions and
   which backup frame answers them. `check-output` applies to the notes doc too.
5. **Deliver BOTH PDFs** (send the files); the `.tex` files are the editable sources of
   record. A deck without its notes doc is not done.
   Never write into a read-only sync mirror (e.g. an Overleaf/Dropbox folder) the project flags.
