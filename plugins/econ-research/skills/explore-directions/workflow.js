export const meta = {
  name: 'explore-directions',
  description: 'Explore paper extensions: screen ideas (mode=screen) | prereg+implement+panel picked ideas in worktrees, then PDF report (mode=run) | report only (mode=report)',
  whenToUse: 'Launched by the explore-directions skill. Two runs with a user checkpoint between them: screen, then run on the user-picked slugs.',
  phases: [
    { title: 'Generate', detail: 'screen: two independent idea agents' },
    { title: 'Dedupe', detail: 'screen: merge, reject settled/dropped/in-flight, keep top N' },
    { title: 'Screen', detail: 'screen: design-check, feasibility, draft prereg, kill-condition evaluability' },
    { title: 'Prereg', detail: 'run: final prereg, then adversarial red-team of the kill conditions' },
    { title: 'Implement', detail: 'run: worktree per direction; prereg committed alone before code' },
    { title: 'Audit', detail: 'run: convention + isolation audit', model: 'sonnet' },
    { title: 'Panel', detail: 'run: 3 experts -> referee vs advocate -> chair verdict' },
    { title: 'Report', detail: 'run/report: LaTeX -> PDF summary of every idea, results, verdicts' },
  ],
}

// ---------- args ----------
// common: mode ('screen'|'run'|'report'), date ('YYYY-MM-DD'), main_root (repo root, required),
//         paper? (paper workspace dir, e.g. 'paper_a'; omit for a single-paper repo),
//         code_dir? (where explore code goes, relative to repo root; default 'code/explore'),
//         python? (interpreter, default './.venv/bin/python'),
//         skills_root (required: the plugin's skills dir — the skill passes ${CLAUDE_SKILL_DIR}/..),
//         panel (run mode: seminar panel preset file; the skill builds one per paper if the project has none),
//         link_dirs? (main-repo dirs symlinked into each worktree; default ['data', 'raw', '.venv'])
// screen: focus? (theme string), inflight? (work not to duplicate), n_per_agent? (5), keep? (6)
// run:    picks_path (screen output JSON file), slugs (array), screen_path? (for the report's screened-out section)
// report: run_paths (array of run-mode output JSON files), screen_path, notes_path? (orchestrator interpretation file)
const A = args || {}
const PAPER = A.paper || ''
const DATE = A.date
const ROOT = A.main_root
const PY = A.python || './.venv/bin/python'
const PDIR = PAPER ? `${PAPER}/` : ''
const LABEL = PAPER || 'the paper'
const OUTSUB = PAPER ? `${PAPER}/explore` : 'explore'
const CODE_DIR = A.code_dir || 'code/explore'
const SKILLS = A.skills_root
if (!SKILLS) throw new Error('args.skills_root required (the skill passes ${CLAUDE_SKILL_DIR}/..)')
const PANEL = A.panel
const LINK_DIRS = A.link_dirs || ['data', 'raw', '.venv']
const REPORT_DIR = `${PDIR}notes/explore`
if (!DATE) throw new Error('args.date required (Date is unavailable in workflow scripts)')
if (!ROOT) throw new Error('args.main_root required')

const CONTEXT = `Project root: ${ROOT}${PAPER ? `, paper workspace ${PAPER}/` : ''}. Read the root CLAUDE.md${PAPER ? ` and ${PAPER}/CLAUDE.md` : ''} first (design, conventions, status), then every decision register they name that covers this paper, the dropped-analyses doc, the latest entries of the paper's results log, and the newest dated summary of record.${A.inflight ? `\nIn-flight work NOT to duplicate: ${A.inflight}` : ''}`

// ================= SCREEN =================
async function screen() {
  const DIR = {
    type: 'object',
    properties: {
      slug: { type: 'string', description: 'kebab-case, <=30 chars' },
      title: { type: 'string' },
      type: { type: 'string', enum: ['mechanism', 'heterogeneity', 'new_outcome', 'new_design', 'reframing', 'robustness', 'new_data'] },
      question: { type: 'string' },
      why_it_strengthens_paper: { type: 'string' },
      design_sketch: { type: 'string' },
      data_needed: { type: 'string' },
      nearest_settled_or_dropped: { type: 'string' },
    },
    required: ['slug', 'title', 'type', 'question', 'why_it_strengthens_paper', 'design_sketch', 'data_needed', 'nearest_settled_or_dropped'],
  }
  const PERSONAS = [
    { key: 'phd', text: 'You are a sharp 5th-year applied-micro PhD student who knows this literature well. Generate ambitious but executable directions that would most strengthen the paper.' },
    { key: 'skeptic', text: 'You are a senior, skeptical economist who works in the primary field of the paper. Generate directions that fix the paper\'s weakest point or answer the first question a top-5 referee would ask.' },
  ]
  const N = A.n_per_agent || 5
  const KEEP = A.keep || 6

  phase('Generate')
  const gen = await parallel(PERSONAS.map(p => () => agent(
    `${p.text}\n\n${CONTEXT}\nAlso read ${SKILLS}/seminar/references/ideate.md for persona guidance. STRICTLY READ-ONLY.\n\nPropose ${N} distinct directions to extend or strengthen ${LABEL}${A.focus ? `, focused on: ${A.focus}` : ''}, using data already in data/ and raw/ where possible, each answerable in about a day. Reduced-form designs consistent with the paper's conventions. Do not re-propose anything settled or dropped unless you state why it differs.`,
    { label: `generate:${p.key}`, phase: 'Generate', schema: { type: 'object', properties: { directions: { type: 'array', items: DIR } }, required: ['directions'] } }
  )))
  const all = gen.filter(Boolean).flatMap((g, i) => g.directions.map(d => ({ ...d, source: PERSONAS[i].key })))
  log(`${all.length} raw directions`)

  phase('Dedupe')
  const merged = await agent(
    `${CONTEXT}\nSTRICTLY READ-ONLY.\n\nBelow are ${all.length} candidate directions from two independent idea agents. Merge duplicates (note sources). Reject any that re-litigate a settled decision, repeat a dropped analysis, duplicate in-flight work, or break conventions; verify against the registers yourself. Keep the best ${KEEP}, ranked by contribution × feasibility. Each rejection needs a one-line reason that cites the register entry.\n\n${JSON.stringify(all, null, 1)}`,
    {
      label: 'dedupe', phase: 'Dedupe', schema: {
        type: 'object',
        properties: {
          candidates: { type: 'array', items: { ...DIR, properties: { ...DIR.properties, sources: { type: 'string' }, rank_reason: { type: 'string' } }, required: [...DIR.required, 'sources', 'rank_reason'] } },
          rejected: { type: 'array', items: { type: 'object', properties: { title: { type: 'string' }, reason: { type: 'string' } }, required: ['title', 'reason'] } },
        },
        required: ['candidates', 'rejected'],
      }
    }
  )
  log(`${merged.candidates.length} kept, ${merged.rejected.length} rejected`)

  const SCREEN = {
    type: 'object',
    properties: {
      slug: { type: 'string' },
      verdict: { type: 'string', enum: ['go', 'fix_then_go', 'kill'] },
      verdict_reason: { type: 'string' },
      design_check: {
        type: 'object',
        properties: {
          conditions_on_post_event_info: { type: 'string' },
          mechanical_time_variation: { type: 'string' },
          own_unit_in_aggregate: { type: 'string' },
          other_threats: { type: 'array', items: { type: 'string' } },
        },
        required: ['conditions_on_post_event_info', 'mechanical_time_variation', 'own_unit_in_aggregate', 'other_threats'],
      },
      feasibility: {
        type: 'object',
        properties: {
          inputs_verified: { type: 'array', items: { type: 'object', properties: { path: { type: 'string' }, exists: { type: 'boolean' }, needed_columns_present: { type: 'string' } }, required: ['path', 'exists', 'needed_columns_present'] } },
          new_build_needed: { type: 'string' },
          external_fetch_needed: { type: 'string', description: 'any API/web fetch required, and by which step; "none" if none' },
          est_effort: { type: 'string', enum: ['hours', 'one_day', 'multi_day'] },
        },
        required: ['inputs_verified', 'new_build_needed', 'external_fetch_needed', 'est_effort'],
      },
      preregistration: {
        type: 'object',
        properties: {
          estimating_equation: { type: 'string' },
          treatment: { type: 'string' },
          outcome: { type: 'string' },
          sample: { type: 'string' },
          fe_and_clustering: { type: 'string' },
          kill_condition: { type: 'string' },
          kill_condition_evaluable_offline: { type: 'boolean', description: 'false if any kill clause needs an external fetch or a multi-day build' },
          what_a_null_would_mean: { type: 'string' },
        },
        required: ['estimating_equation', 'treatment', 'outcome', 'sample', 'fe_and_clustering', 'kill_condition', 'kill_condition_evaluable_offline', 'what_a_null_would_mean'],
      },
      score_contribution: { type: 'integer', minimum: 1, maximum: 5 },
      score_feasibility: { type: 'integer', minimum: 1, maximum: 5 },
    },
    required: ['slug', 'verdict', 'verdict_reason', 'design_check', 'feasibility', 'preregistration', 'score_contribution', 'score_feasibility'],
  }

  phase('Screen')
  const screened = await pipeline(merged.candidates, c => agent(
    `${CONTEXT}\nSTRICTLY READ-ONLY: no file writes, no estimation.\n\nScreen this candidate direction. Follow ${SKILLS}/design-check/SKILL.md and be adversarial: default to finding the flaw. Verify feasibility concretely: inputs exist, and parquet schemas inspected via metadata only (${PY} -c "import pyarrow.parquet as pq; print(pq.read_schema(p))"). Draft a pre-registration with a kill condition. Make the kill condition decisive: it must be able to fire on what the data actually say, not on an auxiliary statistic that fires almost regardless of the data. Flag whether every kill clause can be evaluated offline. Verdict 'kill' if the design is mechanically contaminated or needs a multi-day build.\n\nCandidate:\n${JSON.stringify(c, null, 1)}`,
    { label: `screen:${c.slug}`, phase: 'Screen', schema: SCREEN }
  ).then(s => s && ({ ...c, screen: s })))

  return { mode: 'screen', paper: PAPER, date: DATE, candidates: screened.filter(Boolean), rejected: merged.rejected }
}

// ================= RUN =================
const PREREG = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    prereg_markdown: { type: 'string', description: 'complete pre-registration document' },
    redteam_changes: { type: 'array', items: { type: 'string' } },
    kill_condition_evaluable_offline: { type: 'boolean' },
  },
  required: ['slug', 'prereg_markdown', 'redteam_changes', 'kill_condition_evaluable_offline'],
}

const IMPL = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    status: { type: 'string', enum: ['completed', 'stopped_infeasible', 'partial'] },
    branch: { type: 'string' },
    worktree_path: { type: 'string' },
    prereg_commit: { type: 'string' },
    final_commit: { type: 'string' },
    prereg_path: { type: 'string' },
    memo_path: { type: 'string' },
    memo_text: { type: 'string' },
    output_csvs: { type: 'array', items: { type: 'string' }, description: 'absolute paths in the main repo' },
    output_figures: { type: 'array', items: { type: 'string' }, description: 'absolute paths in the main repo' },
    kill_condition: { type: 'string', enum: ['triggered', 'not_triggered', 'partial', 'not_evaluable'] },
    deviations_from_prereg: { type: 'array', items: { type: 'string' } },
  },
  required: ['slug', 'status', 'branch', 'worktree_path', 'prereg_commit', 'final_commit', 'prereg_path', 'memo_path', 'memo_text', 'output_csvs', 'output_figures', 'kill_condition', 'deviations_from_prereg'],
}

const AUDIT = {
  type: 'object',
  properties: {
    pass: { type: 'boolean' },
    prereg_committed_before_code: { type: 'boolean' },
    writes_outside_explore: { type: 'array', items: { type: 'string' } },
    convention_violations: { type: 'array', items: { type: 'string' } },
    register_edits: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
  required: ['pass', 'prereg_committed_before_code', 'writes_outside_explore', 'convention_violations', 'register_edits', 'notes'],
}

const VERDICT = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
    recommendation: { type: 'string', enum: ['into_main_text', 'into_appendix', 'needs_more_work', 'drop'] },
    score: { type: 'integer', minimum: 1, maximum: 10, description: 'value to the paper: design credibility and informativeness, NOT significance' },
    one_line: { type: 'string' },
    what_it_establishes: { type: 'string' },
    fatal_or_top_threat: { type: 'string' },
    next_step_if_pursued: { type: 'string' },
    referee_strongest_point: { type: 'string' },
    advocate_strongest_point: { type: 'string' },
  },
  required: ['slug', 'recommendation', 'score', 'one_line', 'what_it_establishes', 'fatal_or_top_threat', 'next_step_if_pursued', 'referee_strongest_point', 'advocate_strongest_point'],
}

const PANEL_ROLES = [
  { key: 'field1', file: PANEL, section: 'Field expert 1' },
  { key: 'field2', file: PANEL, section: 'Field expert 2' },
  { key: 'outside', file: `${SKILLS}/seminar/SKILL.md`, section: 'Agent 3: Outside-Field Economist' },
]

const setupBlock = slug => `SETUP — the worktree has no data. From the worktree root run exactly:
  git update-index --skip-worktree $(git ls-files output) && rm -rf output && ln -s ${ROOT}/output output
  ${LINK_DIRS.map(d => `ln -s ${ROOT}/${d} ${d}`).join(' && ')}
  mkdir -p data/explore/${slug} output/csv/${OUTSUB}/${slug} output/figures/${OUTSUB}/${slug}
(Skip any ln whose target does not exist in the main repo.) These symlinks show as untracked. NEVER run \`git add -A\` or \`git add .\`; add explicit paths only. Run scripts with ${PY}.
WRITE ISOLATION (hard rules): create new files only under data/explore/${slug}/ and output/{csv,figures}/${OUTSUB}/${slug}/ (they land in the main repo through the symlinks, as intended). Never write, overwrite or delete anything else under data/, output/ or raw/. Do not edit any results log, any decisions register, the backlog, any CLAUDE.md or exhibits list, and do not modify existing scripts (copy their patterns instead). No external fetch unless the prereg names it; if one is used, cache the raw responses under data/explore/${slug}/ and send no credentials or email. If the design needs a multi-day build, stop and return status stopped_infeasible.`

const implPrompt = (slug, prereg) => `You are implementing ONE exploratory direction for ${LABEL}, in an isolated git worktree (your cwd). Slug: ${slug}.

${setupBlock(slug)}

STEP 1 — Write the pre-registration below VERBATIM to ${PDIR}plans/explore_${slug}_${DATE}.md and commit it ALONE ("explore(${slug}): pre-registration"). Run no estimation before this commit.
----- PRE-REGISTRATION -----
${prereg.prereg_markdown}
----- END -----

STEP 2 — Implement and run. Code goes in ${CODE_DIR}/${slug}/. Follow the paper's reference implementation and conventions (its CLAUDE.md and .claude/rules/). Report sample/screen counts by arm × year wherever the sample changes. Produce at least one figure for the primary result via the project's figure style.

STEP 3 — Memo at ${PDIR}notes/explore_${slug}_${DATE}.md covering: the question; the prereg path and hash; exactly what ran (scripts, samples, N); every deviation and why; results with numbers read from the output CSVs (cite the file for each table); the kill condition evaluated exactly as pre-registered; remaining threats; a one-line recommendation that stays inside the pre-registered verdict. Report numbers neutrally.

STEP 4 — Commit the code and the memo. Follow the session's commit-attribution policy.
Return the structured result. output_csvs and output_figures must be absolute main-repo paths (${ROOT}/output/...).`

const brief = (impl, audit) => `EXPLORATORY DIRECTION FOR ${LABEL} — "${impl.slug}"
Read the project's CLAUDE.md${PAPER ? ` and ${PAPER}/CLAUDE.md` : ''}. Code and prereg are on branch ${impl.branch} at ${impl.worktree_path}; outputs: ${impl.output_csvs.join(', ')}. Read these; do not write anything.
Judge whether this direction is viable and worth adding to the paper. A clean, informative null is a valid outcome. Judge design credibility and what we learn, never significance. Read results only against the pre-registered kill condition, and flag any deviation from it.

CONVENTION AUDIT:
${JSON.stringify(audit, null, 1)}

MEMO:
${impl.memo_text}`

async function runOne(slug, idx) {
  // 1. final prereg from the screen record, then red-team the kill condition
  const draft = await agent(
    `${CONTEXT}\nREAD-ONLY.\n\nThe screen record for slug "${slug}" is in ${A.picks_path} (JSON; under .result.candidates or at the top level). It holds the candidate, the adversarial screen, and a draft pre-registration. Its verdict_reason lists REQUIRED fixes. Write the final pre-registration as a complete markdown document: question; the design with every screen fix adopted; estimating equation; treatment; outcome(s) with exactly one primary; sample with expected N; FE and clustering; one primary contrast; the kill condition; what a null means; any external fetch, named. Date: ${DATE}.`,
    { label: `prereg:${slug}`, phase: 'Prereg', schema: PREREG }
  )
  const prereg = await agent(
    `${CONTEXT}\nREAD-ONLY.\n\nRed-team the KILL CONDITION of this pre-registration before it is committed. Look for:
(a) Criteria that fire almost regardless of the data: e.g., bounds or contrasts built on a different treatment coding than the main spec, trims on change scores that build in pre-trends, thresholds below the MDE.
(b) Criteria that can never fire.
(c) Clauses that cannot be evaluated offline.
(d) A missing power/MDE statement.
(e) Primary-outcome ambiguity.
Fix whatever you find, and return the revised complete document plus a list of the changes.\n\n${draft.prereg_markdown}`,
    { label: `redteam:${slug}`, phase: 'Prereg', schema: PREREG }
  )
  // 2. implement in a worktree
  const impl = await agent(implPrompt(slug, prereg), { label: `implement:${slug}`, phase: 'Implement', isolation: 'worktree', schema: IMPL })
  if (!impl) return null
  // 3. audit
  const audit = await agent(
    `Audit branch ${impl.branch} (worktree ${impl.worktree_path}), an exploratory direction for ${LABEL}. READ-ONLY.
Check:
(1) The prereg commit ${impl.prereg_commit} touches only the plan file and precedes all code.
(2) Every write path in the new scripts is under data/explore/${slug}/ or output/{csv,figures}/${OUTSUB}/${slug}/.
(3) \`git diff main...${impl.branch} --stat\` shows no edits to registers, CLAUDE.md, exhibits or existing scripts, and no committed symlinks.
(4) Conventions per the user-level and project CLAUDE.md files and the project's .claude/rules/ (read them): no log1p, no try/except around estimation or loading, validate= plus row/NaN checks on merges, clustered SEs, seeds, plus every project-specific rule (estimator import form, accessors, banned constants).
(5) The memo's numbers match the output CSVs (spot-check 5).
Set pass=false on any violation of (1)-(3) or a material one of (4)-(5).`,
    { label: `audit:${slug}`, phase: 'Audit', schema: AUDIT, model: 'sonnet', effort: 'low' }
  )
  if (impl.status === 'stopped_infeasible') return { impl, prereg, audit, verdict: null }
  // 4. seminar panel
  const b = brief(impl, audit)
  const reads = await parallel(PANEL_ROLES.map(r => () => agent(
    `Adopt the persona, lens and response format of the section titled "${r.section}…" in ${r.file} (apply the Principles and Rules of ${SKILLS}/seminar/SKILL.md). Work independently.\n\n${b}`,
    { label: `panel:${r.key}:${slug}`, phase: 'Panel' }
  )))
  const r1 = reads.map((t, i) => t && `### ${PANEL_ROLES[i].key}\n${t}`).filter(Boolean).join('\n\n')
  const [ref, adv] = await parallel(['Agent 4: Referee 2 (Adversarial)', 'Agent 5: Advocate'].map(sec => () => agent(
    `Adopt the persona and response format of "${sec}" in ${SKILLS}/seminar/SKILL.md (apply its Principles and Rules).\n\n${b}\n\nROUND 1 EXPERT READS:\n${r1}`,
    { label: `panel:${sec.includes('Referee') ? 'referee' : 'advocate'}:${slug}`, phase: 'Panel' }
  )))
  const verdict = await agent(
    `You are the seminar chair (Round 3 in ${SKILLS}/seminar/SKILL.md). Synthesize a verdict. Score value to the paper on credibility and informativeness, never on significance. Penalize prereg deviations and audit failures.\n\n${b}\n\nROUND 1:\n${r1}\n\nREFEREE:\n${ref}\n\nADVOCATE:\n${adv}`,
    { label: `chair:${slug}`, phase: 'Panel', schema: VERDICT }
  )
  return { impl, prereg, audit, verdict, panel: { referee: ref, advocate: adv } }
}

// ================= REPORT =================
async function report(inputsDescription) {
  phase('Report')
  return agent(
    `Write the exploration report for ${LABEL} as a LaTeX document and compile it to PDF. You are the orchestrator's synthesizer: the reader is the author, who will decide which directions to pursue.

INPUTS:
${inputsDescription}
For each direction you will also need its memo, its prereg, and its output CSVs and figures. The paths are in the inputs; memo and prereg live on the branch worktree, under .claude/worktrees/... or reachable via \`git show <branch>:<path>\`.

WRITE: ${REPORT_DIR}/explore_report_${DATE}.tex → compile to ${REPORT_DIR}/explore_report_${DATE}.pdf. Copy any figures you embed into ${REPORT_DIR}/figures_${DATE}/. Write nothing else anywhere.

STRUCTURE:
1. Title page block: paper, date, one-paragraph description of the pipeline (screen → user pick → prereg + red-team → worktree implementation → audit → seminar panel), and what this report is NOT (not results of record; nothing logged until the author rules; AI-generated brainstorming that does not replace the author's own judgment).
2. Executive summary: ranked table with columns direction, type, panel recommendation, score/10, kill condition status, audit pass, and a one-line takeaway. Then a short "Recommendation" paragraph: which to pursue, which to log, which to drop, and why.
3. One section per implemented direction:
   (a) Question and why it matters for the paper.
   (b) Pre-registered design: equation in display math; treatment, outcome, sample, FE/clustering; the kill condition verbatim; red-team changes.
   (c) What ran: samples and N; deviations.
   (d) Results: 1–3 compact booktabs tables built from the output CSVs, primary contrast first, 4 significant digits, SEs in parentheses, each table captioned with its source CSV filename. Embed the primary figure if one exists.
   (e) Kill-condition evaluation, clause by clause.
   (f) Seminar panel: recommendation, score, what it establishes, top threat, the strongest referee point, the strongest advocate point.
   (g) Interpretation and recommendation: your synthesis, clearly labelled as such. ${A.notes_path ? `Incorporate the orchestrator's notes in ${A.notes_path} (authoritative where they conflict with your own reading).` : ''}
   (h) Pointers: branch, prereg and final commits, memo path.
4. Screened but not implemented: a table of the remaining screen candidates (screen verdict, scores, the one-line reason), then the rejected ideas with their reasons.
5. Appendix: audit details per direction.

RULES:
- Every number must be read from a CSV, memo or JSON input; never compute new estimates.
- After writing, verify every number in the .tex against its source, in the spirit of the check-output skill, and fix mismatches. List any number you could not trace in a final "Unverified" appendix, or state there are none.
- Report estimates neutrally: no "good/bad/exciting".
- Escape LaTeX special characters in slugs and paths (\\_).
- Compile recipe: the project's LaTeX recipe if its CLAUDE.md names one; otherwise any TeX distribution on PATH (TinyTeX, MacTeX, TeX Live): cd ${REPORT_DIR}; pdflatex -interaction=nonstopmode twice; install any missing package with the distribution's package manager (tlmgr for TinyTeX / TeX Live). The PDF must compile with no errors.
Return the absolute PDF path and a five-line summary.`,
    { label: 'report', phase: 'Report' }
  )
}

// ================= dispatch =================
if (A.mode === 'screen') {
  return await screen()
}

if (A.mode === 'run') {
  if (!A.picks_path || !A.slugs?.length) throw new Error('run mode needs picks_path and slugs')
  if (!PANEL) throw new Error('run mode needs panel: a seminar panel preset file (see the seminar skill, Choose the panel)')
  phase('Prereg')
  const results = (await parallel(A.slugs.map((s, i) => () => runOne(s, i)))).filter(Boolean)
  const lean = results.map(r => ({ ...r, impl: { ...r.impl, memo_text: '(see memo_path)' }, panel: undefined }))
  const pdf = await report(`- Run results (impl, prereg, audit, verdict per direction):\n${JSON.stringify(lean, null, 1)}\n- Screen record (for section 4): ${A.picks_path}`)
  return { mode: 'run', paper: PAPER, date: DATE, results, report: pdf }
}

if (A.mode === 'report') {
  const pdf = await report(`- Screen record: ${A.screen_path} (JSON; candidates under .result.candidates, rejected under .result.rejected)\n- Run outputs: ${(A.run_paths || []).join(', ')} (JSON; per-direction entries under .result or .result.results, each with impl, audit, verdict, and possibly panel)`)
  return { mode: 'report', report: pdf }
}

throw new Error(`unknown mode: ${A.mode}`)
