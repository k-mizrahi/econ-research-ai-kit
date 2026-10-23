---
name: refresh
description: Run a full-project audit and reconcile the defining documents (CLAUDE.md, PURPOSE.md, key-decisions doc, plans) and memory with reality — detect drift, surface contradictions, record unrecorded decisions, promote durable memory into docs, prune stale memory. Interactive and heavy by design. Use ONLY when the user explicitly asks (e.g. "refresh", "refresh the project", "refresh the docs/memory") — NEVER trigger automatically; when a refresh looks overdue, suggest it and stop. Sole exception: `write-onepager` invokes it from its staleness gate (ratified 2026-09-28). Distinct from `handoff` (writes a session narrative, touches no living doc), `project-summary` (immutable audience snapshot), and `sync-state` (pointer reconciliation, no analysis) — this is the only skill allowed to rewrite living docs.
---

# Refresh (reconcile living docs with reality)

The defining docs rot between sessions: CLAUDE.md's Status section falls
behind the latest results, ratified decisions sit in handoffs and commit
messages without ever reaching the key-decisions doc, memory files accumulate
facts that are stale, wrong, or belong in real documentation. This skill is
the periodic deep reconciliation: audit the whole project, find every place
the record disagrees with reality, and fix it — asking before anything
significant, never touching the immutable record.

## Procedure

1. **Establish the baseline.** Read the `Last refresh: YYYY-MM-DD @ <sha>`
   line from CLAUDE.md's Status section. Run `git log --oneline <sha>..HEAD`
   and list handoffs, plan appends, and memory files dated/modified since.
   No checkpoint line → this is the first refresh; note it and proceed. The
   diff directs *attention*, never *coverage* — the audit below is always
   full, even when the diff is empty.

2. **Full audit — gather ground truth, do not write from memory.** Read all
   defining docs (CLAUDE.md, PURPOSE.md if present, key-decisions doc, active
   plan(s), the docs/ sources of truth), all handoffs since the checkpoint,
   the scripts' entry points and current default flag values. If product memory
   is available and the user wants it maintained, also read MEMORY.md and its
   indexed files. For a large project, split independent audit areas only when
   the active agent environment supports delegated work.

3. **Detect drift.** Six checks, all of them, every run:
   - **Status vs. reality** — does CLAUDE.md's Status match the latest
     results, handoffs, and repo state?
   - **Contradictions** — docs disagreeing with each other (CLAUDE.md says X,
     the latest handoff says Y). Surface with both sources quoted; never
     silently pick a side.
   - **Unrecorded decisions** — ratified choices visible in commits, handoffs,
     or changed default flag values that never landed in the key-decisions
     doc.
   - **Stale references** — docs and memories naming files, flags, scripts,
     or paths that no longer exist.
   - **Standard compliance** — project CLAUDE.md against the 8-section
     standard ([references/claude-md-standard.md](references/claude-md-standard.md)); flag any
     duplication of user-level conventions.
   - **Banned-pattern sweep** — grep the codebase for every pattern the
     key-decisions doc bans; confirm the bans held.

4. **Classify findings.** *Significant*: anything that changes a decision, an
   invariant, or a status claim; any memory deletion; any new key-decisions
   entry; any structural edit to CLAUDE.md or PURPOSE.md outside the Status
   section. *Minor*: stale pointer, dead link, MEMORY.md index line, wording,
   the checkpoint line itself. When in doubt, it is significant.

5. **One interactive round.** Batch ALL significant findings into one user
   question round at the end of the analysis — never one ping per
   finding. Present each as: finding → proposed edit → target doc. Declined
   proposals go in the final report, not back into the docs.

6. **Apply per the write policy** (Rules below). Minor fixes are applied
   directly, without asking.

7. **Refresh memory.** Three moves, in order:
   - **Promote** — a durable, load-bearing fact in a memory file moves to its
     proper doc (decision → key-decisions doc; status → CLAUDE.md Status;
     reference → the relevant docs/ file); the memory then becomes a pointer
     to that doc or is deleted.
   - **Prune** — stale or wrong memories are deleted. Deletion is always
     significant: it goes through step 5, even when obvious.
   - **Re-index** — MEMORY.md ends the run with exactly one line per
     surviving memory file, hooks matching current content.

8. **Stamp and report.** Update the `Last refresh:` line to today's date and
   the current HEAD short-sha (create the line in Status if absent), and make
   sure the staleness note directly below it reads:

   ```markdown
   Last refresh: YYYY-MM-DD @ <short-sha>
   (If more than a month or ~50 commits have passed since this stamp,
   suggest running `refresh`. Suggest only — `refresh` is user-triggered.)
   ```

   Report:
   what was changed, what was proposed and declined, what needs follow-up
   outside this skill's write policy. Do not commit unless the user asks.

## Rules

Write policy — which docs this skill may touch, and how:

| Class | Docs | Policy |
|---|---|---|
| Rewrite in place | CLAUDE.md Status + checkpoint line and its staleness note; MEMORY.md index; memory files; stale pointers/links anywhere | Edit directly (minor) |
| Append-only | Key-decisions doc; plans (`{goal}_{YYYY-MM-DD}.md`) | Append entries only — never renumber, reword, or delete existing ones |
| Ask first | CLAUDE.md / PURPOSE.md sections other than Status | Significant — propose in step 5 |
| Never touch | Handoffs; feedback docs; dated project summaries; results files of record | Read-only inputs, no exceptions |

- Contradictions between docs are decided by the user, never by the skill.
- No editorializing findings or results ("good"/"bad") — report what is.
- Memory deletions and new key-decisions entries are always significant.
- Full audit every run; the checkpoint scopes attention, never coverage.
- **User-triggered only.** Never invoke this skill on your own initiative —
  not from the staleness note, not from an obviously rotten Status section.
  Overdue → say "refresh looks overdue, run `refresh`?" and stop.
  **One sanctioned exception (2026-09-28):** `write-onepager` Step 0 invokes
  this skill when the stamp is >31 days or 50+ commits behind, because a
  one-pager compiles the record and a stale record produces a stale one-pager.
  The interactive round in step 5 still runs, so the user rules on every
  significant finding either way.
