---
name: explore-directions
description: Explore new directions for a paper end-to-end. Agents generate and screen ideas; the user picks; each pick is pre-registered (kill condition red-teamed), implemented in its own git worktree, convention-audited, and judged by a seminar panel; a PDF report summarizes every idea, its results, and the verdicts. Use when the user asks to explore, expand, or stress-test a paper with autonomous agents. Launches the `explore-directions` workflow — the user's invocation is the multi-agent opt-in.
argument-hint: "[paper] [focus theme]"
disable-model-invocation: true
---

> **Experimental — Claude Code only.** Runs the Workflow tool (multi-agent orchestration); the user's invocation of this skill is the opt-in. Cost: screening ≈ 0.9M subagent tokens; each direction run ≈ 0.6M. State the estimate before Step 1 and again before Step 2.
>
> **A brainstorming aid, not a substitute for your thinking.** The agents propose, screen, and stress-test directions without your knowledge of the field or the data. Treat their ideas, scores, and recommendations as input: you decide what is worth pursuing. The report says so on its first page.

Orchestrates `workflow.js` in this skill's directory. Launch it with the Workflow tool: `scriptPath: ${CLAUDE_SKILL_DIR}/workflow.js`, `args: {...}`. There are two Workflow runs with a **user checkpoint** between them. A directions search across many agents is a specification search unless pre-registration and the kill rules hold. Those rules are why this skill exists.

Depends on the `design-check` and `seminar` skills that ship alongside it: always pass `skills_root: ${CLAUDE_SKILL_DIR}/..` so the workflow's agents can read them.

## Args

`explore-directions [paper] [focus theme]`. `paper` is the paper workspace dir in a multi-paper repo (default: the one in the working directory, or ask); omit it for a single-paper repo.

Resolve from the project's `CLAUDE.md` (and any `.claude/rules/skill-bindings.md` § `explore-directions`) before launching:
- `main_root` — repo root (required).
- `code_dir` — where explore code goes, relative to the root (default `code/explore`).
- `python` — the project interpreter (default `./.venv/bin/python`).
- `panel` — the seminar panel preset file, required for Step 2 (bindings § `seminar`). If the project has none, build one as the seminar skill's *Choose the panel* describes, confirm it with the user, save it as `.claude/panels/<area>.md`, and pass its path.
- `link_dirs` — main-repo dirs to symlink into each worktree (default `data`, `raw`, `.venv`). The workflow assumes outputs live under `output/{csv,figures}/`.

## Step 1 — Screen (9 agents, read-only)

Run the workflow with `args: {mode: "screen", skills_root, paper?, date: <today>, main_root, code_dir?, python?, focus?, inflight?}`.

- `inflight`: name any work in progress (untracked plans/scripts in `git status`) so the ideas don't duplicate it.
- When it returns, show the user a ranked table: slug, type, screen verdict, contribution/feasibility scores, effort, and the screen's key finding. Add the rejected ideas with their reasons. Flag `kill_condition_evaluable_offline=false` and any `external_fetch_needed`.
- Surface any side finding about the existing codebase as its own item. Verify it yourself first.
- **Stop.** Ask the user which slugs to run (multi-select question). Never pick for them.

## Step 2 — Run (≈10 agents per direction + 1 report)

1. Note the start time for the write guard: `touch <scratchpad>/explore_marker`.
2. Run the workflow with `args: {mode: "run", skills_root, paper?, date, main_root, code_dir?, python?, panel, link_dirs?, picks_path: <screen task output file>, slugs: [...]}`. The screen output file is the task's `.output` JSON; pass its path as is.
3. **Write guard** after it returns: `find data output -newer <marker> -type f -not -path '*/explore/*'`. Every hit must be accounted for, for example by another live session. Report any unexplained write as a defect.
4. Check `git worktree list`. Each direction is a branch `worktree-<runId>-N`. Nothing has been merged.

## Step 3 — Present

- Give the PDF path (`[{paper}/]notes/explore/explore_report_<date>.pdf`) and a ranked table: panel recommendation, score, kill status, one-line takeaway, branch.
- Put the result that moves a claim of record at the top.
- Recommend what to log, what to continue, and what to drop.

## Step 4 — Integrate (only on the user's say-so)

- **Merging is the user's call.** Give them the exact command: `git merge --no-ff <branch>`. The scripts must reach main before results are logged as of record (single source of numbers).
- Accepted results → `log-result` (pointing at the branch until merged). Any claim of record that changes → `log-decision` with its enforcement sweep, plus a backlog item for dated deliverables (never rewrite a dated deck or one-pager in place).
- Directions to continue → keep working on their branch, with a prereg **addendum committed before any new code**. Regenerate the PDF with `mode: "report"` (`skills_root`, `screen_path`, `run_paths`, optional `notes_path` holding your interpretation).
- Dropped directions → a dropped-analyses row if the reason is substantive. Remove the worktree only when the user asks.

## Rules

- Exploration never edits registers, CLAUDE.md, exhibits, or existing scripts on its branches. Integration happens in main, in Step 4.
- A clean null is a valid result. The panel scores credibility and informativeness, never significance.
- Post-hoc analyses are labelled descriptive and never carry a verdict.
- Cost guide: screen ≈ 0.9M subagent tokens; run ≈ 0.6M per direction. Tell the user before Step 2 if they pick more than 3.
