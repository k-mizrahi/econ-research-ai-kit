## Docs are the source of truth

The files under `docs/` are authoritative. When code and a doc disagree, that is
a bug in one of them — **fix one deliberately, don't let them drift**.

- `docs/SPEC.md` — <what it governs>
- `docs/PROCESSING.md` — <math / algorithm of record>
- `docs/SCHEDULE.md` — <dates and config values; the single source for constants>

Before changing behaviour that a doc describes, update the doc in the same change.
Before trusting a value (a date, a constant, a threshold), read it from the doc,
not from a comment or memory.
