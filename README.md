# econ-research-ai-kit

**Guardrails and project memory for AI-assisted empirical research with Claude Code.**

I'm an applied-micro economist (PhD candidate, Princeton). This is the setup I run my own
research on. Each convention in it was learned the hard way, in a real project.

AI coding agents make empirical work faster. They also make four failures more likely:

- **Settled decisions get re-litigated.** The agent doesn't remember why an approach
  was dropped, so it suggests it again.
- **Conventions don't travel.** A rule learned the hard way in one repository is
  violated in the next.
- **Stale numbers reach co-authors.** A coefficient from an old run survives in a
  draft, a slide, or a status line.
- **A lost session loses the thread.** When the conversation, or the laptop, goes, the
  working state goes with it.

This kit is how I run reduced-form applied-micro projects with
[Claude Code](https://code.claude.com). It has three parts:

1. **Documents of record with explicit rules** — a decisions register, a results log,
   dropped analyses, a backlog, dated plans and handoffs — each stating who writes it
   and whether it may change. See [docs/workflow.md](docs/workflow.md).
2. **Skills that keep those documents honest** — planning work against settled
   decisions, logging decisions and results as they happen, auditing documents against
   the repository, checking every number in a draft against its source.
3. **Estimation and writing conventions that follow you into every project** — no
   log(1+x) main specifications for counts, the correct two-group event-study
   specification, clustering, fail-loud code, and a writing canon distilled from the
   craft literature. See [docs/conventions.md](docs/conventions.md) and
   [docs/writing.md](docs/writing.md).

## Your judgment stays in charge

These skills do not replace your work as an economist, or your judgment. Think of
Claude as an intelligent research assistant: fast, well read, and tireless, but
without your expertise or your knowledge of the setting and the data.

- `design-check` flags definitions that might build an effect in by construction. It
  will flag some that are fine and can miss real problems; you rule on every flag.
- `seminar` simulates reactions from economist personas. It stress-tests an argument
  before a real seminar; it is not a substitute for one, or for referees.
- `explore-directions` is brainstorming at scale. Its ideas, scores, and
  recommendations are input to your own thinking; you decide what is worth doing.

## Quick start

**1. Install the plugin.**

```sh
claude plugin marketplace add k-mizrahi/econ-research-ai-kit
claude plugin install econ-research@econ-research-ai-kit
```

**2. Give it your style, before using any writing or slide skill.** Start Claude Code
and run:

```
/econ-research:add-exemplars
```

Give it 2–5 papers whose writing you like (PDFs or DOIs), one or two of your own past
slide decks (PDF, or the `.tex` source), and any talks you like. It reads each one,
writes a private note per source, and builds a style profile in
`~/.config/econ-research/exemplars/`. Every writing skill reads that profile before it
drafts, and `write-slides` reuses the look of your deck. Do this once: it covers all
your projects, and you can re-run it to add papers or decks. Until the profile exists,
the writing skills stop and ask for it.

**3. Set up each project.** Inside the project, run:

```
/econ-research:setup-project
```

It creates the documents of record, fills `CLAUDE.md` from what it can verify in the
repository, and offers to add the conventions. If you skipped step 2, it does it now.
From there:

- plan the next piece of work with `/econ-research:write-plan`, from a backlog item, a
  new idea, or feedback;
- Claude logs decisions and results as they happen (`log-decision`, `log-result`);
- new sample screens and outcomes go through `design-check` before adoption;
- end each session with `/econ-research:handoff`;
- before a co-author meeting, run `/econ-research:project-summary` or
  `/econ-research:write-onepager`.

To update later:

```sh
claude plugin marketplace update econ-research-ai-kit
claude plugin update econ-research@econ-research-ai-kit
```

Optional: `claude plugin install dugri@econ-research-ai-kit` adds a terse output
style; select it with `/output-style`.

## What's inside

Everything ships in the `econ-research` plugin. Skills marked † run only when you
invoke them.

**Setup**

| Skill | What it does |
|---|---|
| `add-exemplars` | Run first, once: builds private notes on papers you like and on your own past decks, and the style profile every writing and slide skill drafts to. |
| `setup-project` † | Creates the documents of record, a skill-bindings file, and the conventions block in each project; never overwrites. |

**Project memory**

| Skill | What it does |
|---|---|
| `write-plan` | Drafts a dated, living plan from a backlog item, a new idea, or feedback — checked against settled decisions and dropped analyses, with decision rules written before any results. |
| `handoff` † | Writes a dated end-of-session handoff: where things stand, what changed, findings, ordered next steps. |
| `sync-state` | End-of-session pointer check across the backlog, live plans, and `CLAUDE.md` status — pointers, never numbers. |
| `refresh` | Audits the living documents against the repository: drift, contradictions, unrecorded decisions, stale memory. |
| `project-summary` | An immutable, verified orientation document for a co-author, with a gated / do-not-cite list. |

**Research integrity**

| Skill | What it does |
|---|---|
| `design-check` | Mechanical-bias preflight for any new sample screen, outcome, treatment definition, or timing rule: does the definition build an effect in by construction? Flags for you to rule on. |
| `log-decision` | Records a decision the moment it is made, then sweeps the code for the pattern it bans. |
| `log-result` | Appends each substantive result to the results log, numbers exactly as the output reports them. |
| `blast-radius` | After a data-layer bug: every consumer of the file or column, the generating script patched, stale outputs listed. |
| `check-output` | Checks every number in a draft, deck, or one-pager against the output files of record. |

**Feedback**

| Skill | What it does |
|---|---|
| `triage-feedback` | Sorts referee reports, advisor comments, and seminar questions into actionable, parkable, inherent, impossible, and addressed. |
| `read-paper` | A structured summary of a paper — question, identification, results — related to your project's design. |

**Writing** — every one drafts to your style profile from `add-exemplars` (Quick
start, step 2).

| Skill | What it does |
|---|---|
| `write-intro`, `write-data`, `write-design`, `write-results`, `write-litreview` | Draft or revise one paper section as compiled LaTeX, following the canon, with a claim-to-exhibit audit. |
| `write-slides` | A beamer deck plus a per-slide notes PDF: claim titles, figure-first frames, a model line on every result, backup slides. Matches the look of your own past decks. |
| `write-onepager` | A one-page extended abstract plus figure pages, compiled from the record for an outside reader. |

**Experimental**

| Skill | What it does |
|---|---|
| `seminar` | A simulated faculty seminar: two field experts and an outside-field economist read independently, a hostile referee and an advocate debate, and a chair writes the summary. Personas are built for your paper's fields; an ideate mode brainstorms new directions. Simulated reactions, not referees. |
| `explore-directions` † | Agents propose and screen new directions for a paper; each one you pick is pre-registered with a kill condition, implemented in its own git worktree, audited, and judged by a seminar panel. Brainstorming input, not a verdict. Heavy: about 0.9M tokens to screen and 0.6M per direction. |

## The conventions, in brief

- No log(1+x) as a main specification for count outcomes: levels plus the extensive
  margin, PPML in the appendix.
- Event studies with two event-defined groups include both the main event-time effects
  and their interactions with treatment.
- Standard errors clustered at the panel unit.
- No try/except around estimation or data loading; seeds for anything stochastic.
- Estimates are reported without adjectives.
- Every new screen or outcome gets a mechanical-bias check; every decision is
  recorded the day it is made, with a sweep for what it bans.
- Merges validate their cardinality and report row and missing counts.

`setup-project` adds them to a project's `CLAUDE.md`. To apply them in every project
instead, paste the same block into `~/.claude/CLAUDE.md`; `setup-project` then skips
it. Reasoning, references, and Stata / R / Python syntax:
[docs/conventions.md](docs/conventions.md).

## Requirements

- [Claude Code](https://code.claude.com), on macOS, Linux, or WSL.
- Writing skills: a TeX distribution (TinyTeX, MacTeX, or TeX Live).
  `project-summary` PDFs: pandoc.
- `explore-directions`: Claude Code's workflow tool (multi-agent orchestration).
- Context cost: with the plugin enabled, skill descriptions add roughly 2k tokens to
  every turn; a skill's full instructions load only when it runs.
  `claude plugin details econ-research` shows the per-skill breakdown.

## Repository map

| Path | What |
|---|---|
| `plugins/econ-research/skills/` | the 23 skills |
| `plugins/econ-research/writing/` | the writing canon: prose and slide principles, LaTeX output spec, exemplar-note schema |
| `plugins/dugri/` | the optional output style |
| `docs/` | workflow, conventions, writing, design decisions |
| `examples/toy-project/` | a synthetic project taken through the workflow |
| `bin/ci/`, `.github/` | the repository checks CI runs |

Design notes and their reasoning: [docs/design.md](docs/design.md).

## Author

Kobi Mizrahi · [github.com/k-mizrahi](https://github.com/k-mizrahi)

MIT License. If the kit shapes your research workflow, see [CITATION.cff](CITATION.cff).
