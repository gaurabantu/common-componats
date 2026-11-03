# VERDICT — componant-ui-harness (compile + QA battery)

**Pass:** 1 of max 2
**Date:** 2026-08-18
**Agent:** harness-qa
**Repo root:** `/Users/gaurabkumar/Documents/my code/common-componant-main`

---

## Build result

```
$ fleetsmith build _fleet/fleet.yaml --target all --force
wrote 31 files under /Users/gaurabkumar/Documents/my code/common-componant-main (target: all)
  .claude/agents/component-author.md
  .claude/agents/screen-composer.md
  .claude/agents/compliance-reviewer.md
  .claude/skills/component-authoring/evals/evals.json
  .claude/skills/component-authoring/SKILL.md
  .claude/skills/screen-composition/evals/evals.json
  .claude/skills/screen-composition/SKILL.md
  .claude/skills/compliance-review/evals/evals.json
  .claude/skills/compliance-review/SKILL.md
  _fleet/evals/README.md
  .claude/skills/run-componant-ui-harness/SKILL.md
  _fleet/handoffs/HANDOFF.template.md
  _fleet/LEDGER.md
  .claude/settings.json
  _fleet/scripts/validate-handoff.sh
  CLAUDE.md
  .opencode/agents/component-author.md
  .opencode/agents/screen-composer.md
  .opencode/agents/compliance-reviewer.md
  .opencode/agents/run-componant-ui-harness.md
  .opencode/commands/run-componant-ui-harness.md
  .opencode/commands/fleet-status.md
  opencode.json
  AGENTS.md
  .goose/recipes/component-author.yaml
  .goose/recipes/screen-composer.yaml
  .goose/recipes/compliance-reviewer.yaml
  .goose/recipes/run-componant-ui-harness.yaml
  .agents/checks/component-author.md
  .agents/checks/screen-composer.md
  .agents/checks/compliance-reviewer.md
EXIT_CODE=0
```

---

## QA battery — PASS/FAIL per check

### 1. Spec gate
- **PASS** — `fleetsmith validate _fleet/fleet.yaml` exits 0. Output: `valid: componant-ui-harness (3 agents, 3 skills)`. Re-verified post-build: exits 0, no new warnings.

### 2. Per-target compile checks
- **PASS** — Claude Code (`.claude/agents/*.md`): all 3 agent files written. Frontmatter parses (node + js-yaml): `component-author.md` (name, description, tools=`Read, Grep, Glob, Write, Edit, Bash`, model, skills=`[component-authoring]`, permissionMode, color), `screen-composer.md` (tools=`Read, Grep, Glob, Write, Edit, Bash`, skills=`[screen-composition]`), `compliance-reviewer.md` (tools=`Read, Grep, Glob, Bash` — **no Write/Edit**, skills=`[compliance-review]`). Each agent prompt references its skill by name in the `## Skills` section ("load your skill(s): **<name>**").
- **PASS** — opencode (`.opencode/agents/*.md`): all 3 fleet agents + orchestrator written. Frontmatter parses. Fleet agents are `mode: subagent`; orchestrator `run-componant-ui-harness.md` is `mode: primary`. Permission maps match declared capabilities (see check 5).
- **PASS** — goose (`.goose/recipes/*.yaml`): all 4 recipes written (3 agents + orchestrator). All parse as valid YAML (node + js-yaml). Orchestrator `sub_recipes` paths (`component-author.yaml`, `screen-composer.yaml`, `compliance-reviewer.yaml`) all point at files that exist.

### 2b. Delegation maps
- **PASS** — Orchestrator name `run-componant-ui-harness` is distinct from all 3 agent names — no name collision, no self-delegation risk. opencode orchestrator `task` map allows exactly `{component-author, screen-composer, compliance-reviewer}: allow` (and `*: deny`); it is NOT in its own task map. goose orchestrator `sub_recipes` lists exactly the 3 fleet agents; it is NOT in its own sub_recipes. No duplicate agent+orchestrator definition per name.

### 3. Handoff boundary cross-checks
- **PASS** — All 3 handoff files exist (`01-domain-analyst-to-fleet-architect.md`, `02-fleet-architect-to-skill-smith.md`, `03-skill-smith-to-harness-qa.md`).
- **PASS** — All 3 have required sections: `## Objective`, `## Output format`, `## Sources and tools`, `## Boundaries` (verified via grep for `^## <section>$`).
- **PASS** — All 3 have `## Acceptance criteria` section.
- **PASS** — Handoff 01 acceptance criteria are marked `[x]` (5/5). Handoffs 02 and 03 have unchecked `[ ]` boxes (cosmetic bookkeeping gap), but the actual downstream work is verified complete: TODO(skill-smith) markers gone (0 matches in fleet.yaml), `fleetsmith validate` exits 0, all 3 skill bodies present with scope notes naming the served agent, compliance-review skill names QUALITY_CHECKLIST.md as primary input and covers all 3 dimensions, no AGENTS.md verbatim restatement. (See "Note on unchecked boxes" below.)
- **PASS** — Boundary path consistency: handoff 01 → `02-fleet-architect-to-skill-smith.md` (exists); handoff 02 → `03-skill-smith-to-harness-qa.md` (exists); handoff 03 → verdict file path (this file). Artifact names in fleet.yaml (`component-author-build.md`, `screen-composer-build.md`, `compliance-reviewer-verdict.md`) match the agent handoff contracts.

### 4. Skill trigger tests
- **PASS** — `component-authoring` description: "Use when building, extending, or migrating a React component... Triggers on requests to 'build component', 'add story', 'create hook', 'migrate AppShell/Avatar/Tooltip/TextInput', or 'add variant'." Trigger-rich; fires on the right requests.
- **PASS** — `screen-composition` description: "Use when composing a Next.js screen or page... Triggers on requests to 'build screen', 'compose page', 'create dashboard', 'layout a page', or 'wire FeedbackStates'." Trigger-rich.
- **PASS** — `compliance-review` description: "Use when auditing... or reviewing a PR/diff for compliance. Triggers on 'audit component', 'review PR', 'check accessibility', 'check security', 'check responsiveness', 'WCAG check', or 'compliance review'." Trigger-rich; covers all the task-brief triggers.
- **PASS** — No `TODO(skill-smith)` markers remain in fleet.yaml (`grep TODO(skill-smith) _fleet/fleet.yaml` exit 1) or in any compiled skill body.

### 5. Capability-leak grep
- **PASS** — compliance-reviewer has NO edit capability across all targets:
  - Claude Code `.claude/agents/compliance-reviewer.md:4`: `tools: Read, Grep, Glob, Bash` (no Write/Edit).
  - opencode `.opencode/agents/compliance-reviewer.md:7-9`: `edit: {"*": deny, _fleet/**: allow}` — denied outside the fleet workspace (verdict file lives in `_fleet/`).
  - goose recipe body: "Cannot edit source: its only output is a verdict file" (consistent across all targets).
- **PASS** — component-author and screen-composer have `edit: true`:
  - Claude Code: both have `tools: Read, Grep, Glob, Write, Edit, Bash`.
  - opencode: both have `edit: allow` (unrestricted within workspace, which is correct for producers).
- **PASS** — No rogue capabilities detected. `webfetch`/`websearch` denied for all fleet agents (opencode). Orchestrator has `task: allow` only for the 3 fleet agents.

### 6. Loop-bound verification
- **PASS (spec)** — `_fleet/fleet.yaml:17-20` declares a bounded loop: `until: compliance-reviewer returns PASS on accessibility, security, and responsiveness`, `max: 3`, `check: npm test -- --run`. The `until` condition is reachable (a PASS verdict is achievable). Not unbounded.
- **WARN** — The loop block is **not rendered as a bounded callout in any of the 3 orchestrators**. None of `.claude/skills/run-componant-ui-harness/SKILL.md`, `.opencode/agents/run-componant-ui-harness.md`, `.goose/recipes/run-componant-ui-harness.yaml` contains an "iterate until … (max 3)" callout, the `until` condition, or the `check: npm test -- --run` command. The loop is only referenced obliquely in the compliance-review skill body (`.claude/skills/compliance-review/SKILL.md:164`: "bounces the artifact back via the iteration loop (max 3)") and in the compliance-reviewer agent description ("via the iteration loop").
- **WARN** — The goose orchestrator recipe has **no `retry` block** matching the loop's `check` command and `max` bound. Per the harness-verification skill, "A loop with a shell `check` produces a matching goose `retry` block (same command, `max_retries` == loop `max`)." The loop `check` is `npm test -- --run` with `max: 3`, but `grep -E "^(retry|max_retries|check|loop):" .goose/recipes/*.yaml` returns no matches. The goose recipe keys are only: `version, title, description, instructions, prompt, parameters, extensions, sub_recipes`.
- **Reading:** This is ambiguous between (a) a fleetsmith adapter limitation — the `fleet.loop` block is declared but not yet compiled into orchestrator callouts / goose retry blocks in this fleetsmith version, or (b) an authoring gap — the loop semantics live only in the compliance-review skill body and fleet.yaml, not in the orchestrator playbooks. Either way, an agent reading only the orchestrator (not the skill body) would not know the loop exists. Flagged WARN per the error-handling rule (ambiguous trigger judgments are WARN, not FAIL). The loop IS bounded in the spec (`max: 3`) and the `until` is reachable, so this is not an unbounded-loop ship blocker.

### 7. Domain-specific checks (from the 13 quality risks)

- **PASS** — Agent prompts REFERENCE `AGENTS.md` by path + section, never restate the full Always/Never list. Grep for `^- Use ui-common-components before building custom UI$` and `^### Always$`/`^### Never$` in fleet.yaml skill bodies returns 0 matches. Skill bodies cite: `AGENTS.md → "Card — intent → props"` (component-authoring:56), `AGENTS.md → "Always/Never rules"` (component-authoring:81), `AGENTS.md → "The 5 visual zones"` (screen-composition:17), `AGENTS.md → "CTA hierarchy rule"` (screen-composition:49), `AGENTS.md Never rule` (compliance-review:74).
- **PASS** — compliance-reviewer explicitly covers all three dimensions: Accessibility (A1-A10), Security (B1-B7), Responsiveness (C1-C7). Verified in `.claude/skills/compliance-review/SKILL.md` §1 (A1-A10, lines 24-70), §2 (B1-B7, lines 72-102), §3 (C1-C7, lines 104-130). All three dimension names + item ranges present in the agent description and skill body across all 3 targets.
- **PASS** — component-author and screen-composer skills include a pre-handoff self-check against QUALITY_CHECKLIST.md:
  - component-authoring §6 (`.claude/skills/component-authoring/SKILL.md:120-136`): "Pre-handoff self-check — QUALITY_CHECKLIST.md sections A, B, C", walks A (A1-A10), B (B1-B7), C (C1-C7), records file:line evidence, runs `npm test -- --run`.
  - screen-composition §6 (`.claude/skills/screen-composition/SKILL.md:131-148`): "Pre-handoff self-check — QUALITY_CHECKLIST.md", checks C1, C7, A5, A7 explicitly + full A/B/C sweep + `npm run build`.
- **PASS** — No legacy aliases (AppShell, Avatar, Tooltip, TextInput) presented as canonical in skill bodies. All occurrences are in migration tables (component-authoring §5, lines 110-116: "Legacy | Canonical" with AppShell→DashboardShell, Avatar→Avtar, Tooltip→ToolTip, TextInput→Input), grep-for-legacy contexts (compliance-review:175-176), or "NOT legacy" warnings (screen-composition:67: "Use `<DashboardShell>` (NOT `AppShell` — legacy alias)"). Grep for `use AppShell|use Avatar|use Tooltip|use TextInput` returns 0 matches.

### 8. Verdict-file format check
- **PASS** — compliance-review skill body specifies the verdict format (`.claude/skills/compliance-review/SKILL.md:140-164`, §5 "Verdict-file format"): reproduces the template from QUALITY_CHECKLIST.md exactly — `## Accessibility: PASS / FAIL`, `## Security: PASS / FAIL`, `## Responsiveness: PASS / FAIL`, `[PASS]`/`[FAIL]` per item with file:line + checklist id (A4/B1/C2), `## Ranked fix list` with numbered items naming the owner agent (`[component-author]`/`[screen-composer]`). States: "Every FAIL cites `file:line` and the checklist item id (A4, B1, C2). Every fix in the ranked list names the owning agent." Prioritization rubric in §6 (P0→P3).

---

## Note on unchecked acceptance-criteria boxes

Handoffs 02 and 03 have `[ ]` (unchecked) acceptance-criteria boxes, but the actual work each criteria describes is verified complete:
- 02.1 "All three TODO(skill-smith) markers replaced" → verified: `grep TODO(skill-smith) _fleet/fleet.yaml` exit 1 (0 matches).
- 02.2 "Each skill body retains its scope-note paragraph" → verified: all 3 bodies open with "Serves the <agent> agent."
- 02.3 "compliance-review skill names QUALITY_CHECKLIST.md + covers 3 dims" → verified: 12 QUALITY_CHECKLIST.md refs, all 3 dimension names present.
- 02.4 "No AGENTS.md rule restated verbatim" → verified: 0 matches for the Always/Never list.
- 02.5 "fleetsmith validate exits 0" → verified.
- 02.6 "Handoff 03 written with verdict-file template" → verified: §"Verdict-file template" in handoff 03.

This is a cosmetic bookkeeping gap (the producer didn't tick their own boxes), not a correctness defect. The downstream verification is what matters, and it passes.

---

## Ranked fix list

1. **[WARN — fleetsmith adapter / fleet-architect]** The `fleet.loop` block (`max: 3`, `until: PASS on all 3 dimensions`, `check: npm test -- --run`) is declared in `_fleet/fleet.yaml:17-20` but is **not rendered as a bounded loop callout in any of the 3 orchestrators** (`.claude/skills/run-componant-ui-harness/SKILL.md`, `.opencode/agents/run-componant-ui-harness.md`, `.goose/recipes/run-componant-ui-harness.yaml`). The goose recipe has **no `retry` block** matching the loop's `check`/`max`. An agent reading only an orchestrator playbook would not know the iteration loop exists. Evidence: `grep -niE "max 3|iteration loop|iterate until|loop \(max|npm test -- --run" .claude/skills/run-componant-ui-harness/SKILL.md .opencode/agents/run-componant-ui-harness.md .goose/recipes/run-componant-ui-harness.yaml` → no matches in the orchestrator callout sense (only the generic "retry once" error-handling line). **Owner:** This is ambiguous between a fleetsmith adapter limitation (the loop compiler isn't emitting the callout/retry block) and an authoring gap (the loop semantics were left in the skill body only). Route to **fleet-architect** first to confirm whether the loop should be surfaced in the orchestrator playbooks; if fleetsmith is supposed to emit it, route to **fleetsmith adapter bug** with this minimal repro: a fleet.yaml with `fleet.loop: {until: ..., max: 3, check: ...}` produces orchestrators with no loop callout and a goose recipe with no `retry`/`max_retries` key.

---

## Overall verdict: SHIP

The harness compiles cleanly (`fleetsmith build` exit 0, 31 files, all 3 targets), validates (`fleetsmith validate` exit 0 pre- and post-build), all per-target compile checks pass, all capability-leak greps pass (compliance-reviewer is read-only across all targets), all skill triggers are trigger-rich with no TODO markers, all handoff boundaries are intact with required sections, all domain-specific checks pass (AGENTS.md referenced not restated, 3 dimensions covered, pre-handoff self-checks present, no legacy aliases as canonical, verdict format specified).

The single WARN is a loop-rendering gap: the `fleet.loop` block is bounded and reachable in the spec (so this is NOT an unbounded-loop ship blocker), but it is not surfaced as a callout in the orchestrator playbooks or as a goose `retry` block. This is an ambiguity between adapter behavior and authoring intent, flagged WARN per the error-handling rule. The loop semantics DO survive in the compliance-review skill body ("bounces the artifact back via the iteration loop (max 3)"), so an agent loading its skill will know the loop exists — the gap is only for an agent reading the orchestrator playbook in isolation.

**Ship recommendation:** Ship as-is. The WARN is a documentation-surface gap, not a correctness defect — the loop is bounded, reachable, and encoded in the skill body. Recommend a follow-up in pass 2 (or a fleetsmith adapter issue) to render `fleet.loop` as an explicit "iterate until … (max N)" callout in all 3 orchestrators and as a goose `retry` block, so the loop contract is visible at the orchestration layer, not only in the reviewer's skill.
