---
name: triage-feedback
description: Categorize external feedback (referee reports, advisor comments, seminar Q&A) into actionable / parkable / inherent / impossible / addressed
argument-hint: "[path_to_feedback or paste feedback] [optional: paper/project name]"
---

Triage external feedback into a structured document. Accepts pasted text, a file path (PDF, txt, md), or a description of verbal comments. Ask for the feedback source if not provided.

## Steps

1. **Read the feedback** — if a file path is given, read it. If pasted inline, use that. For verbal feedback the user recounts, work from their description.
2. **Identify the paper/project** — ask if not obvious from context. This determines which specifications, data, and design choices are relevant background.
3. **Read relevant context** — read the repository's key decisions and dropped-analyses documents. Consult persistent agent memory only if available. This prevents categorizing settled decisions as "actionable."
4. **Parse into discrete points** — break the feedback into individual concerns. Number them. Preserve the original wording (quote or close paraphrase) so nothing is lost.
5. **Categorize each point** into one of five bins:

   - **Actionable** — valid concern that can and should be addressed. For each: note what the fix would be (new robustness check, revised sample, additional table, rewritten paragraph).
   - **Parkable** — reasonable point but low priority or out of scope for this revision. Could become actionable later. Note why it's parked.
   - **Inherent** — a real limitation of the design that cannot be eliminated, only acknowledged and bounded. Note what the best response is (discuss in limitations, show robustness, cite precedent).
   - **Impossible** — based on a misunderstanding of the paper, the data, or the method. Note what the misunderstanding is and how to clarify in the revision.
   - **Addressed** — already handled in the current draft or by existing analysis. Note where (section, table, script).

6. **Write the triage document** to `output/feedback_triage_<project>_<date>.md` with this structure:

```markdown
# Feedback Triage — [Project Name]

**Source:** [referee report / advisor meeting / seminar at X / etc.]
**Date received:** YYYY-MM-DD
**Triaged:** YYYY-MM-DD

---

## Actionable

### 1. [Short label]
> [Original comment, quoted or paraphrased]

**Response plan:** [What to do — specific robustness check, revised text, new table]
**Effort:** [small / medium / large]
**Priority:** [high / medium / low]

---

## Parkable

### N. [Short label]
> [Original comment]

**Why parked:** [Out of scope for this revision / data not available / low marginal value]

---

## Inherent

### N. [Short label]
> [Original comment]

**Best response:** [Acknowledge in limitations / bound with robustness check / cite precedent paper that faces same issue]

---

## Impossible

### N. [Short label]
> [Original comment]

**Misunderstanding:** [What the referee got wrong and how to clarify]

---

## Addressed

### N. [Short label]
> [Original comment]

**Where:** [Section X / Table Y / Script Z already handles this]
```

7. **Print a summary** — count of points per category, and list the high-priority actionable items.

## Rules
- Preserve every point from the feedback — do not silently drop comments, even minor ones
- Do not editorialize on whether the referee is "right" or "wrong" — categorize based on feasibility and relevance
- For actionable items, be concrete about the fix (name the specification, the data file, the robustness check) rather than vague ("could add a robustness table")
- Check repository documentation for dropped analyses before categorizing something as actionable; persistent agent memory is an optional supplement
- If unsure about a category, flag it as "Actionable?" with a note explaining the ambiguity
- The user makes final categorization decisions — present your triage as a proposal, not a verdict
