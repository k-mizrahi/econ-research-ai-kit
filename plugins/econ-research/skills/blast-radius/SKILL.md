---
name: blast-radius
description: Consumer sweep after a data-layer bug is found — enumerate every reader of the affected file/column, patch the generating script, and list stale outputs. Use PROACTIVELY whenever a bug is found in a shared data file, panel column, or classification — before fixing only the call site where it was discovered.
argument-hint: "[file or column name] [one-line bug description]"
---

When a data-layer bug is found, the discovering call site is almost never the only consumer. A typical case: an arbitrary pick from a multi-valued field (taking the first list element) is fixed in one script and rediscovered weeks later in another, while other scripts keep silently reading a stale file. This skill makes the blast radius explicit before any fix is declared done.

Resolve the project's active code dirs, run manifest (if any), merge-hygiene rules, and backlog register from its `CLAUDE.md` (and any `.claude/rules/skill-bindings.md`). Skip archived/dead-code dirs unless they are still live readers.

## Steps

1. **Enumerate consumers.** Grep the active code dirs for:
   - the affected filename (all read sites, including hardcoded paths that bypass flags/accessors),
   - the affected column name(s),
   - any derived columns built from them (check the panel-construction scripts).
2. **Classify each consumer** with file:line evidence: affected / not affected / unclear. "Unclear" means read the code — do not guess. If a consumer reads the file through its own hardcoded path instead of the shared accessor/flag, flag that separately (it will silently miss future fixes too).
3. **Patch the generating script first.** A post-hoc data fix without patching the generator is a re-run landmine (a float/str id bug once sat documented-but-unpatched across two sessions). Confirm the generator is fixed before touching downstream.
4. **Stale-output list.** Which outputs (CSVs, figures, parquets) were produced from the buggy data? Compare against the project's run manifest timestamps where one exists, else file mtimes. State explicitly what needs a chain rerun and what can wait.
5. **Add a guard at the source.** Where the bug lived, add the assertion that would have caught it (row counts, NaN counts on key columns, `validate=` on the merge) — per the user-level merge-hygiene convention and any project python-style rule.
6. **Record**: append the sweep result (bug, consumers affected, generator patched y/n, stale outputs, guard added) to the routed results log using the log-result conventions. Unfixed consumers go to the backlog with IDs.

Delegation note: the greps are mechanical, but classifying "unclear" consumers is not — false negatives cost full re-runs. Do not hand step 2 to a low-effort pass.
