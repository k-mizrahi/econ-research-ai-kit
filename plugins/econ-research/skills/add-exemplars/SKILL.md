---
name: add-exemplars
description: Setup step for the writing and slide skills — run once per user, before the first draft. Builds private notes on papers the user likes for their writing, talks they like, and the user's own past slide decks, then a style profile that every write-* skill reads before drafting and that write-slides uses for the deck's look. Use right after the plugin is installed, during setup-project, when a writing skill finds no style profile, or whenever the user wants to add papers or decks.
argument-hint: "[paper or deck PDFs, URLs, or citations]"
---

# Add exemplars

**A setup step.** The writing skills (`write-intro`, `write-data`, `write-design`,
`write-results`, `write-litreview`, `write-onepager`) and `write-slides` follow the
principles in `${CLAUDE_SKILL_DIR}/../../writing/` *and* the user's style profile.
This skill builds that profile, once per user, before the first draft; re-run it to
add papers or decks later. It never edits the skills themselves, since a plugin update
would overwrite such edits. The profile is how the skills adapt: every writing skill
reads it before it drafts.

Exemplar notes record how the papers and talks **this user** likes, and the user's own
past decks, actually work: how each paper builds its introduction, positions itself,
narrates its data, states its design, and walks through results; how each deck builds
its opening, titles, results slides, and backups. The notes and the profile are the
user's own and stay private: they contain short excerpts of copyrighted text.

## Procedure

1. **Ask, if the user named nothing.** Request:
   - 2–5 papers whose writing they like, ideally close to the kind of paper they
     write (PDF paths, DOIs, or URLs);
   - one or two of their own past slide decks (PDF, or the `.tex` source, which lets
     `write-slides` reuse the theme and preamble);
   - optionally, 2–5 talks they like (slide PDFs).

2. **Resolve the notes directory** per
   `${CLAUDE_SKILL_DIR}/../../writing/exemplar-schema.md` § Where notes live, and create
   it if missing. If it sits inside a git repository, warn that the notes must not be
   pushed to a public remote and continue only when the user confirms.

3. **Collect readable sources.** For each paper, talk, or deck the user named, get a
   copy you can read: a local PDF or `.tex` path, or a URL/DOI the user has access to.
   Never write a note from memory of a paper. If no readable copy is available, ask for
   one or skip that source and say so.

4. **Read with delegated readers.** Give each source to its own sub-agent (in
   parallel when there are several) so full texts stay out of the main conversation.
   Each reader gets the paper or talk schema and the excerpt rules from
   `exemplar-schema.md`, and classifies the paper type (single clean design / null
   result / multi-part / shock-selling).

5. **Write one note per source** to `<dir>/<firstauthor><year>.md` (talks:
   `slides_<speaker><year>.md`; the user's own decks: `slides_own_<year>_<topic>.md`,
   with the path to the `.tex` source when there is one, so `write-slides` can reuse
   its theme and preamble), with the Source line filled in. Never overwrite an
   existing note; ask, or add a `-2` suffix.

6. **Refresh `style-profile.md`** from all notes in the directory, not only the new
   ones, in two parts (format in `exemplar-schema.md`):
   - **Writing:** the moves the papers share, where they depart from the principles,
     the preferred introduction architecture, magnitude devices, null phrasing, and
     voice (person, tense, sentence length).
   - **Slides:** the look to reuse (theme and preamble from the user's own deck),
     title style, text density, figure style, and how results and backups are built.

   One page in total. Show the user what changed.

7. **Report** the notes written, the sources skipped and why, and the profile's 3–5
   headline rules, and say that the writing skills now draft to this profile. Do not
   commit.

## Rules

- Excerpts: at most ~2 sentences each, always with a page or slide reference;
  paraphrase everything else.
- The style profile shapes style only. The principles' honesty rules always hold: no
  editorializing estimates, every number traceable to the results log.
- Notes record what they are based on, so they can be re-checked against the source.
