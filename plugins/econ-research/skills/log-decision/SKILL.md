---
name: log-decision
description: Record a ratified or provisional methodological decision in the project's routed decision register (as the project's CLAUDE.md names it) and run the enforcement sweep in the same session. Use PROACTIVELY whenever the user ratifies a decision ("let's adopt X", "drop Y", "make Z the headline") or a script's default flag value changes — do not wait to be asked.
argument-hint: "[decision summary] [ratified|provisional]"
---

Record a decision the moment it is made. This is the write-trigger counterpart of "check the decision registers before proposing alternatives" — a canonical record that lags reality is worse than none (it lagged 12 months once).

## Step 0 — Resolve the project's bindings

Read the project's `CLAUDE.md` (and any `.claude/rules/skill-bindings.md`) for: the decision register(s) and the routing rule between them, the active code dirs to sweep, the backlog register and its ID scheme, the dropped-analyses doc, and where the canonical flag set is defined. If the project has no decision register, say so and ask where it should live — do not invent one silently.

## Steps

1. **Append to the routed register.** Multi-paper projects route paper-scoped decisions to the paper's register and cross-cutting ones (shared data, infrastructure, process, skills) to the shared register with whatever scope/**Affects** column it uses; a shared decision also gets a one-line pointer in each affected paper's status doc. Append-only, match the existing table format: date, decision, one-line rationale, evidence pointer (results-log entry, memo, or advisor comment), and status:
   - `ratified` — settled; do not re-litigate without explicit user request.
   - `provisional` — record the explicit revisit trigger (e.g., "revisit after F1 CEM results"). A decision that a pending diagnostic could overturn is provisional by definition.
2. **Enforcement sweep, same session.** If the decision bans, replaces, or renames a pattern/measure/flag value:
   - Grep the project's active code dirs for the banned pattern / old measure / old flag default.
   - Record the hit list (file:line) inside the decision entry.
   - Fix the hits now if mechanical, or add one backlog item with an ID (and scope, if the backlog has one) and a blocking note ("decision X not yet enforced in: ..."). Never leave hits unrecorded — that is exactly how a banned log1p survived 10 weeks.
3. **Flag-default check.** If the decision changes what the canonical flag set means, update the canonical set where the project documents it and note that existing outputs under the old set are stale until the next chain rerun.
4. **If it reverses a prior decision**, do not delete the old entry — add the new one referencing it, and check the dropped-analyses doc (add a row if something is dropped) for boundary collisions (state precisely what is dropped vs. what remains open).
5. **Optional persistent memory**: if agent-specific persistent memory is available, mirror any changed convention there. The repository decision record and enforcement sweep are required and authoritative.

Keep the entry short — 3–6 lines. The decision doc is a register, not a memo; long rationale belongs in a decision memo under the project's plans dir with a pointer.
