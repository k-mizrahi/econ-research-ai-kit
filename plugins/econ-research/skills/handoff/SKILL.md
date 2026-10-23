---
name: handoff
description: Write a durable end-of-session handoff document recording where things stand, what changed, findings worth remembering, and ordered next steps. Use ONLY when the user explicitly asks for a handoff (e.g. "handoff", "write a handoff", "hand off this session") — never trigger automatically.
disable-model-invocation: true
---

# Session handoff

Write the session's state to disk so a future session (or a future machine —
assume this one could be lost tomorrow) can resume without the conversation.
This format was tested the hard way: after a machine loss, handoffs alone were
enough to reconstruct a project's working state. That is the bar.

## Procedure

1. **Find the project's convention.** Look for a `handoffs/` directory in the
   project root. If it exists, read the most recent file and match its
   structure and tone exactly. If not, create `handoffs/` and use the default
   template below.

2. **Gather ground truth — do not write from memory alone.** Check
   `git status` and `git log` for what actually changed; run the project's
   health/status command if one is documented (e.g. `ops/health.sh`); verify
   any claim about file or data state before writing it down.

3. **Write `handoffs/YYYY-MM-DD-<short-topic>.md`** (today's date, kebab-case
   topic). If the project's `CLAUDE.md` defines a scope tag for handoffs (e.g.
   `YYYY-MM-DD-{paper-a|shared}-topic.md` in a multi-paper repo), include it. If one already exists for today, append a `-2` suffix rather than
   overwriting. Default template:

   ```markdown
   # Handoff — YYYY-MM-DD: <one-line summary>

   ## Where things stand
   <2-6 bullets of durable state: what works, what's live, key numbers.
    State facts a fresh reader can verify, not session narrative.>

   ## What changed this session
   <files/systems touched, with one-line why each>

   ## Findings worth remembering
   <non-obvious things learned: gotchas, verified behaviors, dead ends —
    each with enough context to be believed without the conversation.
    Date any claim that could go stale ("verified 2026-07-13").>

   ## Next steps, in order
   <numbered, concrete, each independently actionable. Mark anything
    blocked and by what.>

   ## Operational cautions
   <what a future session must NOT do, and standing constraints>
   ```

4. **Respect project red lines.** If the project has a purpose/compliance
   document (e.g. `PURPOSE.md`), the handoff must not itself violate it — no
   quoted personal data, no credentials, no secrets. Handoffs are typically
   committed to git: write them as shareable.

5. **Optionally sync product memory.** If a persistent product-memory directory
   is available and the user wants it maintained, update or
   create the relevant memory file so its summary matches the handoff (do not
   duplicate the whole handoff into memory — memory gets the durable facts,
   the handoff gets the narrative). Fix the `MEMORY.md` index line.

6. **Report.** Tell the user the handoff path and give a 3-line digest of the
   next steps you recorded. Do not commit unless the user asks.
