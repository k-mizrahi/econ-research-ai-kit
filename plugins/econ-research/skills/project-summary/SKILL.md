---
name: project-summary
description: Compile an audience-facing project orientation document — what the project is, why it matters, current results of record, binding decisions, gated claims, and open work — from the project's state-of-record docs, so the user or a co-author can catch up before moving to next steps. Use when asked for a project summary, orientation doc, or co-author catch-up. Distinct from `handoff` (session-scoped, for resuming your own work) and `sync-state` (pointer reconciliation, writes no new doc).
---

# Project summary (co-author orientation)

Project knowledge lives scattered across plans, decision logs, backlogs, and
session records — none of which a co-author can read cold. This skill compiles
them into one verified, self-contained orientation document: what the paper is,
why it matters, what we find, every decision that binds, and what remains.

The doc is a **snapshot for an outside reader**, not a working document: it is
immutable once written, and the next summary is a new dated file.

## Procedure

1. **Enumerate the state-of-record sources.** Find the project's master plan,
   key-decisions doc, dropped-analyses doc, backlog/tracker, results log,
   latest session records, and run manifest (whichever exist — check the
   project's CLAUDE.md documentation section). Declare the compile date and
   the full source list in the doc header, so a reader knows exactly what this
   summary compiles and where to go deeper.

2. **Establish what is current vs. superseded.** Check the run manifest and
   dated result generations before citing anything. Superseded numbers appear
   only in a clearly labeled "earlier generations" section — never as live
   results. If currency is ambiguous for a result, say so in the doc rather
   than guessing.

3. **Pull every number from the current output files of record** (result CSVs,
   figures) — not from prose in older docs, and not from memory. Spot-check
   each headline number against its CSV before writing it. A summary that
   propagates a stale number is worse than no summary.

4. **Write to the summaries location the project's `CLAUDE.md` names** (e.g. a
   paper workspace's `summaries/` dir in a multi-paper repo);
   default `docs/{project}_project_summary_{YYYY-MM-DD}.md`. New dated file each time; state which prior
   summary it supersedes, if any.

5. **Structure.** Use this outline, keeping only sections the project has real
   material for — never fabricate a section to complete the template:

   1. The project in one page (question, setting, design, headline findings, status)
   2. Why the question matters (economic/scientific stakes, policy relevance)
   3. Data (sources, key measures, sample sizes)
   4. Research design in detail (identification, screens, specification)
   5. Headline results — with a precision hierarchy (what is actually precise vs. point-stable vs. suggestive)
   6. Mechanism / secondary results
   7. Robustness battery
   8. Known artifacts and bug postmortems (what was wrong, how it was caught, what died)
   9. Gated / do-not-cite list
   10. Settled decisions table (date + decision; pointer to the full log)
   11. Earlier result generations (what changed and why)
   12. Literature positioning (if a lit review exists)
   13. External feedback / seminar verdicts (if any)
   14. Open work queue (from the backlog of record, with stakes)
   15. Where everything lives (code, tables, figures, docs — a pointer table)

6. **Prefer figures over text or tables for presenting results.** Every
   headline or mechanism result that has a figure of record gets that figure
   embedded at the point where the result is discussed — not just listed in a
   pointer table. Where a result exists only as a coefficient table, embed the
   corresponding event-study/coefficient plot if one exists; a table may
   accompany a figure but should not replace one that is available. Embed with
   paths relative to the doc's location — the doc should read well in a
   markdown preview (put a one-line preview tip in the header).

7. **Generate a PDF (default; skip only if the user asks for md-only).** The
   md's relative image paths break outside a repo-aware previewer, so the
   deliverable includes a PDF rendered from the finished md:
   - Run pandoc **from the md's own directory** (so relative figure paths
     resolve): `pandoc {summary}.md -o {summary}.pdf --pdf-engine=xelatex
     -V geometry:margin=2.2cm -V fontsize=10pt -V mainfont="<unicode font>"
     -V monofont="<unicode mono>" -V "monofontoptions=Scale=0.85"
     -V colorlinks=true`
   - Use a Unicode-complete font pair or the ≤ ≈ γ λ ⚠ glyphs silently drop —
     check `fc-list` and treat any "Missing character" warning as a failure.
     (DejaVu Sans / DejaVu Sans Mono are safe where installed.)
   - The PDF sits next to the md. Ignore-hygiene: keep summary PDFs
     uncommitted (confirm the project's `.gitignore` covers PDFs at the target path);
     the md stays the document of record, the PDF is a regenerable rendering.
   - Toolchain: pandoc plus a TeX engine with xelatex on PATH (TinyTeX,
     MacTeX, or TeX Live; the project's `CLAUDE.md` may name its own recipe).
     If either is missing and installing it is impractical, say so and deliver
     the md; do not hand-write LaTeX.
   - Send the PDF to the user (as a file, or however the session delivers
     documents) — don't just name the path.

8. **Report.** Give the user the doc path, the PDF, and a 3-line digest. Do
   not commit unless asked.

## Rules

- **Audience**: a co-author who knows the field but not the repo. Spell out
  design choices and their rationale; define any repo-internal shorthand
  (script numbers, backlog IDs, flag names) on first use.
- **Numbers only from results of record.** Anything provisional or gated is
  flagged as such in place, not silently included or omitted.
- **Results are shown as figures wherever a figure of record exists** — in
  addition to (or instead of) prose and tables, never the reverse. Do not
  generate new figures for the summary; embed existing figures of record only.
- **The gated / do-not-cite section is mandatory** whenever any result is
  gated — it is the section that prevents a co-author citing dead numbers.
- **No editorializing point estimates** ("good"/"exciting"). Report what the
  numbers are; precision and caveats yes, valence no.
- **Immutable snapshot.** Never edit a previous summary to "update" it — write
  a new dated file and mark the supersession.
- If the compile surfaces an inconsistency between state-of-record docs
  (conflicting numbers, a decision recorded in one place but not another),
  report it to the user; do not resolve it inside the summary.
