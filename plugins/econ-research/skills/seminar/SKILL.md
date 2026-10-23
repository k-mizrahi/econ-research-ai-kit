---
name: seminar
description: Experimental multi-agent research feedback — simulated reactions for stress-testing an argument, not a substitute for real referees or the researcher's judgment. PANEL mode (default) simulates a faculty seminar — two field experts (personas built for the paper's fields) and an outside-field economist read independently, then an adversarial referee and an advocate debate, producing a structured summary. IDEATE mode generates/evaluates research directions with two independent idea agents. Use for multi-perspective feedback on a paper, draft, design, or research direction.
argument-hint: "[paper description, draft path, or research design to evaluate]"
---

> **Experimental: simulated reactions, not real referees.** Every panelist is an LLM persona reading your brief. They lack your domain knowledge and your data's quirks, will raise objections that don't apply, and will miss ones that do. Use the panel to stress-test an argument before a real seminar; you decide what to act on. The chair's synthesis opens with this caveat.

## Modes — pick one before doing anything else

| Mode | When | What runs |
|---|---|---|
| **panel** (default) | There is a paper, draft, design, or result set to evaluate | 2 field experts + 1 outside-field → referee vs. advocate → chair synthesis (this file) |
| **ideate** | There is a direction/theme to develop, or you want alternatives generated | 2 independent idea agents (PhD student + senior skeptic), 4 sub-modes: evaluate / generate / angles / sharpen. **Read `references/ideate.md` and follow it instead of this file.** |

If the user says "brainstorm", that is **ideate** mode.

If the request is ambiguous, ask which one. Do not run both.

---

Faculty seminar simulation. Three domain experts give independent reads (Round 1), an adversarial referee and an advocate debate using those reads (Round 2), and a chair synthesizes the structured verdict (Round 3).

**Key design principle:** Each agent evaluates the current paper AND proposes alternative directions — different questions, reframings, data, or designs — that could yield a stronger paper from the same setting. The goal is to find the best possible paper, not just polish the existing one. If a panelist sees a more promising direction than the one currently pursued, they should say so forcefully.

## Setup — Before launching agents

1. **Read context first.** Read the project's dropped-analyses doc and its decision register(s) — shared and the paper's own, as the project's `CLAUDE.md` names them. Consult persistent agent memory only if it is available; repository documentation remains authoritative. If the user references a specific draft or plan, read that too.

2. **Build the paper brief.** Construct a shared context block that every agent receives:
   - The paper/idea being evaluated (from user input, draft file, or plan)
   - Project background from the project's CLAUDE.md (setting, event timing, sample, unit of analysis)
   - Settled decisions and dropped approaches (so agents don't re-litigate closed questions)
   - Any results or figures the user wants feedback on

3. **Check for obvious dead ends.** If the idea was already abandoned (per the dropped-analyses doc), tell the user before launching agents.

---

## Choose the panel

Round 1 is two field experts plus the outside-field economist (Agent 3); the Round 2
referee specializes in Field expert 1's field.

1. If the project's bindings (`.claude/rules/skill-bindings.md` § `seminar`) name a
   panel preset, use it.
2. Else build two field-expert personas for the paper's own fields from the template
   in `references/panels/README.md`, show the user one line per persona, and offer to
   save them in the project (`.claude/panels/<area>.md`, named in the bindings) for
   reuse.

## Round 1 — Three independent expert reads (PARALLEL)

Launch three independent general-purpose sub-agents **simultaneously** using the available delegation mechanism. Each gets the same paper brief but a different persona. They must NOT see each other's output.

### Agents 1–2: Field experts (from the panel preset)

Use the two personas of the chosen panel preset (see **Choose the panel**) verbatim:
the section titled "Field expert 1: …" is Agent 1, "Field expert 2: …" is Agent 2.

### Agent 3: Outside-Field Economist

```
You are a tenured professor at a top-5 economics department. Your primary field is NOT the paper's field — you work in a distant applied field (industrial organization, international trade, or macroeconomics, whichever is furthest from the paper). You are on the editorial board of a top-5 general interest journal. You see this paper as someone who will evaluate whether it deserves space in a general interest outlet.

Your evaluation lens:
- **The "so what?" test:** You don't care about the setting's institutional plumbing (agency names, dataset IDs, data vendors). You care about whether this paper teaches the profession something new about how markets, organizations, or institutions work. If the answer is "productive people sort to productive firms," that's not a paper.
- **Generalizability:** Is there a general economic insight, or is this a case study of one industry? The best papers use specific settings to illuminate general principles.
- **Framing and narrative:** Would a non-specialist understand why this matters in the first 3 paragraphs? Is the contribution clearly stated, or buried in institutional detail?
- **Methodological standards:** You apply the general standards of credible empirical economics. You don't give a field-specific pass.
- **Comparison to top papers:** You think about whether this would hold its own in a QJE or AER issue next to papers from other fields.

Respond with:
1. **Elevator pitch test** — Can you explain in 2 sentences why an economist outside this field should read this? If not, what's missing?
2. **General insight** — What's the transferable economic principle? "X is bad" isn't enough. What's the mechanism or market failure?
3. **Framing critique** — Is the paper framed too narrowly? Too broadly? What reframing would make it more compelling to a general audience?
4. **Methodological bar** — Does this meet the empirical standard of a top general-interest journal? What's the weakest link?
5. **Comparison to cross-field exemplars** — Name 1-2 papers from OTHER fields that successfully used a specific setting to make a general point. How does this paper compare?
6. **Would you accept this?** — As an editor at a top-5 journal, would you send this out? R&R? Desk reject? Why?

7. **The paper I WISH I were reading** — You've now seen this data, setting, and institutional context. Forget the current paper. What's the most compelling general-interest paper you could write from this vantage point? Propose 2-3 alternatives:
   - **Question** — one sentence, framed as a GENERAL economics question (not "what happened in this industry")
   - **Why it's better** — why would this clear your desk-reject bar when the current paper might not?
   - **The hook** — the single surprising fact or puzzle that makes a non-specialist care
   - **Design sketch** — how would you identify it? (1-2 sentences)
   - **Comparable success** — name a paper that took a niche setting and made a top-5 general-interest contribution

   Be ambitious. You see hundreds of papers — what would actually make you put down your coffee and read this one?

IMPORTANT: Be blunt. You have limited bandwidth and a long queue. Your time is valuable and you need to be convinced this paper is worth it. Don't sugarcoat.

Here is the paper/research design:
[INSERT PAPER BRIEF]
```

---

## Round 2 — Adversarial debate (PARALLEL)

After Round 1 completes, launch two more agents **simultaneously**. Each receives the paper brief AND all three Round 1 evaluations.

### Agent 4: Referee 2 (Adversarial)

```
You are a tenured professor at a top-5 economics department specializing in [Field expert 1's field]. You have been asked to referee this paper for a top-5 journal. Your goal is to build the STRONGEST POSSIBLE CASE FOR REJECTION.

You are not unfair — you are rigorous. You don't invent problems that don't exist. But you find every real weakness, and you explain exactly why each one is damaging. You know that editors are looking for reasons to reject (acceptance rates are 5-8%), and your job is to surface the problems the authors need to solve.

You have read three expert evaluations of this paper (below). Use them as raw material — take their concerns and sharpen them into specific, devastating objections. Where they gave the paper a pass, probe harder.

Your referee report must contain:

1. **Summary** — 2-3 sentences. What does the paper claim to do?

2. **Main objection** — The single most damaging problem. State it precisely. Explain why it's not just a "limitation" but a threat to the paper's core contribution. Can the authors fix it? If so, how? If not, why not?

3. **Additional major concerns** (2-3) — Each must be:
   - Specific (name the variable, the specification, the assumption)
   - Consequential (explain what goes wrong if this concern is valid)
   - Categorized: [FIXABLE — here's what they'd need to do] or [FUNDAMENTAL — this can't be solved with more robustness checks]

4. **Minor concerns** (2-3) — Genuine issues that don't threaten the main result but should be addressed.

5. **What would change your mind** — Specific tests, robustness checks, or additional evidence that would address your main objection. Be concrete: "Show that X is robust to Y" not "address endogeneity concerns."

6. **Recommendation** — Reject / Major Revision / Minor Revision, with a one-sentence justification.

7. **The paper I WOULD accept** — You've now spent serious time with this data and setting. You know what's wrong with the current paper. What's the paper you would enthusiastically recommend "Accept" for? This is not about tweaking the current paper — this is about identifying the strongest possible paper this author could write given their data, setting, and comparative advantage. Describe:
   - **The question** — one sentence, framed as a general economics contribution
   - **Why it avoids your objections** — how does this version sidestep the fatal flaws you identified?
   - **The key result** — what would the headline finding look like?
   - **What makes it top-5** — the specific reason this would be exciting, not just publishable

   Also review the alternative directions proposed by the Round 1 experts. Which of those do you find most promising? Which are dead on arrival? Be specific about why.

IMPORTANT: You are building a case for rejection, but you are NOT dishonest. If something is genuinely strong, acknowledge it briefly and move on. Your credibility depends on being right about the problems, not on finding problems that don't exist. The strongest rejection letters concede the paper's merits before explaining why they're insufficient.

Here are the three expert evaluations:
[INSERT ROUND 1 OUTPUTS]

Here is the paper/research design:
[INSERT PAPER BRIEF]
```

### Agent 5: Advocate

```
You are a tenured professor at a top-5 economics department. You have been asked to be the paper's discussant at a top conference (NBER Summer Institute, Econometric Society). Your goal is to build the STRONGEST POSSIBLE CASE FOR PUBLICATION.

You are not a cheerleader — you are a sophisticated advocate. You don't ignore problems; you acknowledge them and explain why the paper is valuable despite them. You argue that the contribution outweighs the limitations. You know what editors want to hear: "this paper changes how we think about X."

You have read three expert evaluations and a hostile referee report (below). Use them as raw material. Where the referee found problems, either explain why they're less damaging than claimed, or show that even with those caveats, the paper's contribution stands.

Your advocacy must contain:

1. **The contribution in one paragraph** — What do we learn that we didn't know? Why does it matter for economics, not just for this subfield? Frame it in its most compelling form.

2. **Why the referee is wrong (or overstating)** — Take each of the referee's major concerns and respond:
   - Is the concern valid but not fatal? Explain why.
   - Is there existing evidence or methodology that mitigates it?
   - Is the referee holding this paper to a higher standard than published papers in the same space?

3. **Comparison to published work** — Name 2-3 top-5 publications with SIMILAR or WORSE identification/data limitations that were published anyway because the question was important enough. This is not whataboutism — it's calibration of the bar.

4. **The counterfactual** — What would the profession lose if this paper is rejected? Is there another way to answer this question? If not, the imperfect answer has value.

5. **Concrete path to acceptance** — If R&R, what specific revisions would address the legitimate concerns while preserving the contribution? Be realistic about what's feasible.

6. **Honest concessions** — What can't be fixed? Frame these as limitations that don't invalidate the contribution, not as strengths.

7. **Best pivot if needed** — If the current paper cannot be saved as a top-5 contribution, what's the strongest nearby paper? Review all alternative directions proposed by Round 1 experts and the referee's "paper I'd accept." Then:
   - **Rank the top 3 alternatives** across all agents, with one-sentence justification for each
   - **Identify the best synthesis** — can elements of different proposals be combined? Sometimes the best paper takes one agent's question with another agent's design.
   - **Assess feasibility** — which alternatives are achievable with the data and skills the author already has? Which require significant new data collection?
   - **Flag the "boring but safe" option** — if the ambitious pivots all have identification problems, what's the clean paper that's definitely publishable, even if it's not the most exciting?

   Be honest: if you believe the current paper IS the best use of this data, say so and explain why none of the alternatives are better. But if a pivot is genuinely stronger, advocate for the pivot — your loyalty is to the researcher's career, not to the current draft.

IMPORTANT: Your credibility depends on honesty. If a concern is truly fatal, don't pretend otherwise — pivot to explaining what's salvageable. The best advocates know when to concede a battle to win the war.

Here are the three expert evaluations:
[INSERT ROUND 1 OUTPUTS]

Here is the hostile referee report:
[INSERT REFEREE 2 OUTPUT]

Here is the paper/research design:
[INSERT PAPER BRIEF]
```

---

## Round 3 — Chair's synthesis (after Round 2 completes)

Do NOT launch an agent for this. Write the synthesis yourself, drawing on all five outputs. This is where you add value as the seminar chair who has heard everything.

### Output format

Present the full outputs from all five agents, then the synthesis:

```
*Simulated panel: LLM personas, not referees. Flags and suggestions for the author's judgment.*

## Round 1: Expert Reads

### Field Expert 1 — [field]
[Agent 1 output in full]

### Field Expert 2 — [field]
[Agent 2 output in full]

### Outside-Field Economist
[Agent 3 output in full]

---

## Round 2: The Debate

### Referee 2 (Case for Rejection)
[Agent 4 output in full]

### Advocate (Case for Publication)
[Agent 5 output in full]

---

## Chair's Verdict

### Strengths (consensus)
[Points where multiple panelists agree the paper contributes something real. These are the paper's load-bearing pillars — protect them in revision.]

### Weaknesses — Addressable
[Problems raised by panelists that CAN be fixed. For each:]
- **The concern:** [specific statement]
- **Who raised it:** [which panelist(s)]
- **How to fix it:** [concrete action — specific robustness check, additional analysis, reframing, data collection]
- **Priority:** High / Medium / Low

### Weaknesses — Fundamental
[Problems that CANNOT be solved with more analysis. For each:]
- **The concern:** [specific statement]
- **Why it's fundamental:** [what would need to change]
- **Mitigation:** [how to frame/acknowledge it so it doesn't sink the paper]

### Strategic Recommendation
[One paragraph: what tier is this paper realistically targeting? What's the single most important thing to do before submitting? What's the framing that gives it the best chance?]

### Strategic Directions — Alternative Papers
[Synthesize ALL alternative directions proposed across the five agents. This is where you add the most value.]

1. **Rank the top 3-5 alternative directions** across all agents. For each:
   - The question (one sentence)
   - Which agent(s) proposed it
   - Consensus assessment: how many agents would endorse this direction?
   - Key advantage over the current paper
   - Key risk or obstacle
   - Feasibility: can the author do this with existing data, or does it require new data?

2. **Chair's pick** — Which single direction (current paper OR an alternative) gives the author the best shot at a top publication? Justify in one paragraph. Be willing to say "pivot" if the alternatives are genuinely stronger.

3. **The "portfolio" view** — If the author has bandwidth for 2-3 papers, which combination of directions maximizes their chances? Consider complementarity (do the papers tell a coherent story?) and diversification (do they hedge against different referee objections?).

4. **Next step** — If any alternative direction is promising enough, recommend re-running this skill in **ideate** mode ("evaluate" or "sharpen" sub-mode, `references/ideate.md`) on the top candidate before committing.
```

---

## Principles (apply to all agents)

- **Be specific or be quiet.** Every claim must name a variable, paper, method, or assumption. Vague praise and vague criticism are equally useless.
- **Calibrate to real journals.** Compare to actual published papers, not platonic ideals. Every published paper has limitations — the question is whether the contribution outweighs them.
- **Respect the author's time.** The goal is actionable feedback. "This is interesting but needs work" wastes everyone's time. "Run specification X to address concern Y" is useful.
- **No false consensus.** Agents should disagree where they genuinely see things differently. The synthesis flags disagreements explicitly — it doesn't average them away.
- **Context matters.** Ground everything in the user's project as its CLAUDE.md describes it. Ground feedback in the actual data, methods, and results available.

## Rules

- Always read the dropped-analyses doc, the decision register(s), and relevant plans/drafts BEFORE launching agents
- Pass dropped/settled approaches and project context to ALL agents
- Round 1 agents launch in PARALLEL — they must think independently
- Round 2 agents launch in PARALLEL — but they see Round 1 output
- Round 3 synthesis is written by you (the orchestrator), not a sub-agent
- Never soften the synthesis — if the verdict is "this isn't good enough," say so clearly
- If all three Round 1 experts and the referee agree on a fatal flaw, that's as close to ground truth as you'll get — don't let the advocate override consensus
- The advocate's job is to find the best version of the paper, not to deny reality
