# Writing with the kit

Seven skills draft and revise the documents an applied-micro paper is judged by:
`write-intro`, `write-data`, `write-design`, `write-results`, `write-litreview`,
`write-slides`, and `write-onepager`. They share three things: a canon of writing
rules, your own exemplar notes, and a few hard rules about numbers.

## The canon

The canon lives in `plugins/econ-research/writing/`:

- `econ_writing_principles.md` covers prose and section rules, drawn from the craft
  guides below.
- `econ_slides_principles.md` covers talks, drawn from Shapiro's and
  Goldsmith-Pinkham's talk guides.
- `latex-output.md` sets the output format. Drafts are compiled LaTeX with a visible
  draft apparatus, never loose Markdown.
- `exemplar-schema.md` is the format for exemplar notes (see the next section).

## Step one: your style profile

The canon says what good applied-micro writing does. Exemplar notes show how papers
*you* like actually do it, and your own decks show how your talks look.

Building them is part of setup, before any writing or slide skill runs. Right after
installing the plugin, run `/econ-research:add-exemplars` and give it 2–5 papers whose
writing you like (ideally close to your paper's type), one or two of your own past
slide decks (PDF, or the `.tex` source), and any talks you like. The kit ships no
notes on published papers, because such notes quote copyrighted text. `add-exemplars`:

1. Gives each source to a delegated reader, which writes one structured note per paper
   or deck: the introduction's paragraph-by-paragraph architecture, literature
   placement, data narration, design exposition, results narration, and the moves
   worth stealing; for decks, the opening, titles, results slides, and backups. Every
   excerpt is at most about two sentences, with a page or slide reference.
2. Writes `style-profile.md` in two parts: Writing (what your papers share, and where
   they depart from the principles) and Slides (the look to reuse, title style,
   density).

Every writing skill reads the profile before it drafts, and `write-slides` reuses
your deck's theme. The profile wins on style; the principles' honesty rules always
hold. You do this once, and re-run `add-exemplars` to add papers or decks. If you skip
it, `setup-project` runs it, and a writing skill that finds no profile stops and asks
for your papers before drafting.

Notes live in `~/.config/econ-research/exemplars/`, shared across your projects, or
wherever a project's bindings point. Keep them out of public repositories.

## What every draft carries

- **A contract audit.** Every claim in an introduction, one-pager, or deck maps to the
  exhibit that supports it. A claim with no exhibit is cut, or the missing analysis is
  flagged.
- **Numbers only from the record.** Drafts and slides are the one place numbers appear
  in full, so every number traces to the results log or the generating CSV. Run
  `check-output` before anything leaves the repository.
- **A neutral voice.** Estimates are never "good", "bad", or "exciting". Use one name per
  concept. A null always states the effect size it rules out.
- **A model line on every result slide.** It names the equation, estimator, outcome,
  sample, fixed effects, clustering, and treatment unit, in that order.

## Requirements

You need a TeX distribution (TinyTeX, MacTeX, or TeX Live) on your PATH. A project can
name its own LaTeX recipe in its `CLAUDE.md` or bindings. Without TeX, the skills
deliver the `.tex` source and say so.

## Reading list

### Craft guides

- McCloskey, Deirdre Nansen. 2019. *Economical Writing: Thirty-Five Rules for Clear and Persuasive Prose*. 3rd ed. University of Chicago Press. [Publisher](https://press.uchicago.edu/ucp/books/book/chicago/E/bo25674588.html)
- Cochrane, John H. 2005. "Writing Tips for Ph.D. Students." [PDF](https://www.johnhcochrane.com/s/phd_paper_writing-rnz9.pdf)
- Shapiro, Jesse M. "Four Steps to an Applied Micro Paper." [Author page](https://shapiro.scholars.harvard.edu/notes-and-lectures)
- Head, Keith. "The Introduction Formula." [UBC blog](https://blogs.ubc.ca/khead/research/research-advice/formula)
- Bellemare, Marc F. 2020. "How to Write Applied Papers in Economics." Draft book chapter. [PDF](https://marcfbellemare.com/wordpress/wp-content/uploads/2020/09/BellemareHowToPaperSeptember2020.pdf)
- Nikolov, Plamen. 2022. "Writing Tips for Economics Research Papers." IZA Discussion Paper No. 15057. [IZA](https://www.iza.org/publications/dp/15057)
- Goldin, Claudia, and Lawrence Katz. "The Ten Most Important Rules of Writing Your Job Market Paper." Harvard Economics handout. [Archived PDF](https://web.archive.org/web/20241126143111/https://www.economics.harvard.edu/files/economics/files/tenruleswriting.pdf)
- Shapiro, Jesse M. "How to Give an Applied Micro Talk: Unauthoritative Notes." [Author page](https://shapiro.scholars.harvard.edu/notes-and-lectures)
- Goldsmith-Pinkham, Paul. 2018. "Tips + Tricks with Beamer for Economists." [GitHub](https://github.com/paulgp/beamer-tips)
