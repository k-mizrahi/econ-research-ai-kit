## Session handoffs

Session state lives in `handoffs/YYYY-MM-DD-topic.md`.

- **Start of session:** read the most recent handoff first.
- **End of session:** write a new one — where things stand, what changed, findings
  worth remembering, and ordered next steps. Run `handoff` to generate it.
- Handoffs are append-only history; don't edit old ones, write a new dated file.

This is a recovery mechanism: if a machine or context is lost, the latest handoff
is enough to resume.
