# LaTeX → PDF output (paper sections)

Every draft a section-writing skill produces (`write-intro`, `write-data`,
`write-design`, `write-results`, `write-litreview`) is a standalone-compilable `.tex`
plus its compiled PDF — not a Markdown file. Markdown is allowed only for
skeletons/outlines the user has not yet approved for prose. (`write-slides` and
`write-onepager` carry their own document specs; they share the compile and delivery
rules below.)

1. **File**: `{drafts_dir}/{section}_{YYYY-MM-DD}.tex`, where `{drafts_dir}` is the
   paper's drafts directory as the project's `CLAUDE.md` names it (or a path the user
   names; default `drafts/`). Preamble: `\documentclass[12pt]{article}`,
   `\usepackage[margin=1in]{geometry}`, `natbib` (authoryear), `amsmath`, `booktabs`,
   `hyperref`, `\onehalfspacing` (`setspace`). Citations: `\citet`/`\citep` with a
   per-draft `.bib` stub next to the tex (author-year keys like `azoulay2010`); if the
   project bib doesn't yet have an entry, add a stub entry — never fake page-ready
   citations in plain text.
2. **Process metadata stays visible in the PDF**: the do-not-circulate / generation
   banner goes in a framed note at the top (`\fbox{\parbox{...}}` or a `quote` in small
   type), and any contract-audit / claim→exhibit table compiles as a real table
   (`longtable` or `tabularx`) after `\clearpage` under a "Draft apparatus — not part of
   the paper" heading. Paragraph-job labels (`[¶N — job]`) become `% comments` above
   each paragraph, not visible text.
3. **Compile** with the LaTeX recipe the project's `CLAUDE.md` gives; otherwise use any
   TeX distribution on PATH (TinyTeX, MacTeX, TeX Live): `cd` to the tex's directory,
   then `pdflatex` (→ `bibtex` if the draft cites anything; `biber` only with biblatex) → `pdflatex` ×2. Install a
   missing package with the distribution's package manager (`tlmgr install <pkg>` for
   TinyTeX / TeX Live). A draft is not done until it compiles clean; fix errors, don't
   ship a `.tex` that doesn't build. If no TeX engine is available, say so and deliver
   the `.tex`.
4. **Deliver the PDF** to the user (send the file), and keep the `.tex` as the editable
   source of record. Never write either into a read-only sync mirror (e.g. an
   Overleaf/Dropbox folder) that the project's `CLAUDE.md` flags.
