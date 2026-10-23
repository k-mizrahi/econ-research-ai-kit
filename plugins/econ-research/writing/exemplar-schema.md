# Exemplar notes: schema and use

The writing skills follow the principles in this directory. Exemplar notes add
evidence from papers and talks **you** like (and from your own past decks): how each one builds its
introduction, positions itself, narrates its data, states its design, and walks
through results. The kit ships no notes on published papers — they quote copyrighted
text, so each user builds their own with the `add-exemplars` skill and keeps them
private.

## Where notes live

1. The directory the project's bindings name (`.claude/rules/skill-bindings.md`
   § `writing`), if any.
2. Otherwise `${XDG_CONFIG_HOME:-~/.config}/econ-research/exemplars/` — shared across
   all your projects.

Never inside a public repository. The directory holds one note per paper or deck
(`<firstauthor><year>.md`, `slides_<speaker><year>.md`) plus `style-profile.md`.

## Using notes from a writing skill

1. Resolve the directory as above. If it has notes, read `style-profile.md` first, then
   the blocks named by the skill (e.g. §A for an introduction) for the 2–3 papers
   closest to the draft's type.
2. **No notes yet:** building them is a setup step (`add-exemplars`), normally done
   right after installing the plugin or during `setup-project`. A writing skill that
   finds none stops before drafting and runs `add-exemplars`, which asks once: "Which
   2–5 papers (or talks) do you like for their writing, ideally close to this paper's
   type?" (for slides, also one or two of the user's own past decks). Draft on the
   principles alone only if the user explicitly asks to, and say so in the draft
   apparatus.
3. Notes inform structure and moves; never copy an exemplar's sentences into a draft.

## Paper note schema

```markdown
# <Authors> (<year>), "<Title>", <Journal>
Source: <PDF path or DOI/URL> · Type: <single clean design | null result | multi-part | shock-selling>

## §A. Introduction architecture
Paragraph-by-paragraph job map (¶1 hook … ¶n roadmap), where the question lands, where
the headline magnitude appears and with what base, how threats are previewed.

## §B. Literature handling
Placement (consolidated paragraph / closing paragraphs / distributed / footnotes),
contribution grammar, how disagreement is phrased.

## §C. Data section
Order of presentation, how screens and linkages are narrated (with counts), worked
examples, limitations framing.

## §D. Empirical strategy
Counterfactual in words, equation presentation, identifying assumption, threats (named,
signed, dispatched), inference.

## §E. Results narration
Template paragraph, magnitude conversion devices, null phrasing, robustness
compression, mechanisms.

## Stealable moves
3–6 bullets, each a device another paper could reuse, with the page it appears on.
```

## Talk note schema (`slides_*.md`)

```markdown
# <Speaker> (<year>), "<Talk title>", <venue> — <n> slides
Source: <PDF path or URL> · Theme: <path to the .tex preamble, own decks only>

## Opening (slides 1–4)
Hook, question slide, This-Paper slide, priors slide.

## Titles and results slides
Claim titles, figure templates, takeaway lines, treatment-unit sentence.

## Design, data, robustness
Equation handling, concern→test, backup wiring.

## Stealable moves
3–6 bullets with slide numbers.
```

## Excerpt rules

- Quote at most ~2 sentences per excerpt, always with a page or slide reference.
  Paraphrase everything else.
- Notes are for your own use. They contain copyrighted excerpts: keep them out of
  public repositories.

## `style-profile.md`

A one-page synthesis across your notes, in two parts:

- **Writing:** the moves your papers share (and where they depart from the
  principles), the intro architecture you favor, your preferred magnitude devices and
  null phrasing, and any voice rules (person, tense, sentence length).
- **Slides:** the look to reuse (the theme and preamble of your own deck, when you gave
  its `.tex` source), title style, text density, figure style, and how results and
  backup slides are built.

Every writing skill reads it before drafting, alongside the principles; where the two
conflict, the profile wins for style and the principles win for honesty rules (no
editorializing, every number traceable).
