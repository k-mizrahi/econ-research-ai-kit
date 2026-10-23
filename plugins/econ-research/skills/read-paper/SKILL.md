---
name: read-paper
description: Read and summarize an academic paper (PDF). Use PROACTIVELY when the user references a paper or methodology you haven't read yet — do not wait to be asked.
argument-hint: "[path/to/paper.pdf] [optional: specific question about the paper]"
---

Read an academic paper and produce a structured summary. Delegate the reading to one general-purpose sub-agent when delegation is available so the full PDF content stays out of the main conversation context.

**IMPORTANT**: Use this proactively — if the user mentions a paper by name and it exists in the project's literature dir (usually `papers/`; check the project's `CLAUDE.md`), begin the delegated reading without being asked.

## How to invoke

First build a 2–4 sentence **project context** from the project's `CLAUDE.md`: the research question, the active design(s), event year / key timing, and the unit of analysis. Then give a general-purpose sub-agent this prompt template:

```
Read the academic paper at [PATH]. [If question: "Focus on answering: [QUESTION]"]

The user's project: [PROJECT CONTEXT]

[Include FULL OUTPUT FORMAT below]
```

## Output format (default mode — no specific question)

### 1. Research Question & Main Contribution
What is the paper asking? What is the main finding or contribution? (3-5 sentences)

### 2. Position in Literature
What existing literature does this build on? What gap does it fill? Key papers it positions against? (3-5 sentences)

### 3. Data
Sources, sample construction, period, unit of analysis, sample size. Note any novel or unusual data. (bullet points)

### 4. Identification Strategy
Describe the causal identification in detail — enough to evaluate validity. Include: estimating equation if possible, key assumptions, what variation is exploited, instrument construction if IV. (1-2 paragraphs)

### 5. Key Results
Main estimates with magnitudes, standard errors or significance levels. Headline numbers. (bullet points)

### 6. Relevance to the project
How do this paper's approach, findings, or data relate to the user's active design(s)? Methodological lessons, comparable estimates, potential citations? Be specific. (3-5 sentences)

### 7. Notable References
3-5 cited papers worth following up, with one-line reasons.

## Output format (directed mode — specific question provided)

Answer the question thoroughly using the paper's content. Provide enough surrounding context (data, identification, etc.) that the answer is interpretable standalone. Same overall length as structured summary.

## Rules for the agent

- Read the full paper with the available PDF-reading capability, in chunks of 15–20 pages for large PDFs
- Do NOT fabricate — if unclear or not in the paper, say so
- Report actual coefficient values, sample sizes, significance levels when available
- Target length: ~1-2 pages total
- If PDF is unreadable, report that clearly
