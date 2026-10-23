# Design decisions

This repository's decisions log: settled choices and the reasoning behind them,
newest last. A reversal is a new row, not an edit.

| Date | Decision | Why |
|---|---|---|
| 2026-07-13 | Conventions live in two layers: cross-project rules (the conventions block, added to each project or to `~/.claude/CLAUDE.md`) and each project's `CLAUDE.md` for its own structure. | Each convention here was violated in a second repo because it lived only in the first repo's rules. |
| 2026-07-28 | `refresh` is the only skill that rewrites living documents; handoffs, summaries, feedback docs, and results files are never edited. | A record that can be silently edited is not a record. |
| 2026-09-28 | `write-onepager`'s staleness gate may invoke `refresh`; nothing else triggers it automatically. | A one-pager compiles the record, so a stale record makes a stale one-pager. The user still rules on every significant finding. |
| 2026-10-23 | Released as `econ-research-ai-kit` for Claude Code: one plugin (`econ-research`) with every skill, an optional style plugin (`dugri`), the docs, a toy example, and CI. | The skills cross-reference each other heavily; one namespace and one install keep those references working. |
| 2026-10-23 | Audience: academic and policy researchers first. Framing: problem → method → tools. | The workflow is the contribution; the plugin and template are how it is delivered. |
| 2026-10-23 | Skills reference bundled files relative to their own directory (`${CLAUDE_SKILL_DIR}`); the writing canon sits at `../../writing`. | The same files must work from the plugin cache and from a local clone. |
| 2026-10-23 | The kit ships no exemplar papers or talks. The writing skills learn style from papers the user likes and from the user's own past decks; the notes stay private, outside any repository. | Examples should reflect the user's own taste, and notes on published papers quote copyrighted text. The principles documents quote only short attributed passages. |
| 2026-10-23 | `add-exemplars` is a setup step: run once per user, right after installing the plugin and before any writing or slide skill. `setup-project` runs it when no notes exist; a writing skill that finds none stops and runs it, and drafts on the principles alone only on explicit request. | The writing skills are meant to draft in the user's own style, so the profile comes first. Plugin skill files cannot be edited per user, so the profile is how the skills adapt. |
| 2026-10-23 | Explicit-only skills (`disable-model-invocation: true`): `handoff`, `setup-project`, `explore-directions`. `refresh` and `add-exemplars` stay invocable by Claude. | Skills that rewrite records or spend large budgets run only when asked. The two exceptions are invoked by other skills, and only after asking the user. |
| 2026-10-23 | The conventions block ships once, in `setup-project/assets/conventions.md`; CI checks that the toy example carries it verbatim. | A plugin cannot ship a `CLAUDE.md`, so `setup-project` writes the block into each project. |
| 2026-10-23 | Planning is a skill: `write-plan` drafts dated plans from a backlog item, an idea, or feedback, with decision rules written before any results. | Planning is where the decisions register and the dropped analyses pay off. |
| 2026-10-23 | Skills that judge research (`design-check`, `seminar`, `explore-directions`) give flags and suggestions for the researcher to rule on, never verdicts. The README, each skill, and each output say so. | These tools lack the researcher's expertise and domain knowledge: they flag non-problems and miss real ones. |
| 2026-10-23 | `seminar` is experimental and ships no panel preset; field-expert personas are built for each paper from a template and saved in the project. | Simulated personas are not referees, and no single panel fits every field. |
| 2026-10-23 | `explore-directions` ships as experimental, with its token cost stated before each run. | Autonomous exploration is a specification search unless pre-registration and kill rules hold; users should opt in knowingly. |
| 2026-10-23 | The design check is called a mechanical-bias check. | It targets bias created by how a sample or variable is built, not endogeneity in the econometric sense. |
| 2026-10-23 | Plugin manifests carry no `version`. | Installs follow commits, so there is no version number to forget to bump. |
| 2026-10-23 | Commits to this repository use the GitHub noreply address. | Commit metadata is public; the noreply address links commits to the GitHub account without exposing a real address. |
