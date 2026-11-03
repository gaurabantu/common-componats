# Handoff: fleet-architect → skill-smith

## Objective
Author the full methodology bodies for the three skills declared in `_fleet/fleet.yaml` (`component-authoring`, `screen-composition`, `compliance-review`), replacing each `# TODO(skill-smith)` marker with a complete, step-by-step workflow that an agent can execute without further guidance.

## Output format
- Edit `_fleet/fleet.yaml` in place — replace each `# TODO(skill-smith): ...` line (and its trailing notes) with the full methodology paragraph(s) inside the existing `body: |` block.
- Preserve the existing scope note (the paragraph above each TODO marker) — it is the contract; the methodology extends it.
- Keep each skill `body` as a YAML literal block (`|`); do not introduce quoting that breaks the block.
- Do NOT rename skills, agents, or change `description`, `capabilities`, `handoff`, or `fleet.*` fields — only `body` content changes.
- After editing, run `fleetsmith validate _fleet/fleet.yaml` from the repo root — it must still exit 0 with no new warnings.

## Sources and tools
- This handoff (the contract)
- `_fleet/fleet.yaml` — the spec you are editing (skills are at the bottom)
- `_fleet/handoffs/01-domain-analyst-to-fleet-architect.md` — the domain brief: 7 work types, component inventory, 13 quality risks, export-name gotchas, CTA hierarchy, 5-zone layout
- `_fleet/QUALITY_CHECKLIST.md` — the testable checklist (A1-A10 accessibility, B1-B7 security, C1-C7 responsiveness) with verdict format spec at the bottom; this is the compliance-review skill's PRIMARY input
- `AGENTS.md` (repo root) — the canonical AI entry point; 20-file reading order, Always/Never rules, export-name table, prop discovery tables, CTA hierarchy, accessibility checklist. Skills EXTEND this file, never restate it (restating causes drift).
- `docs/design-system/COMPONENT_AUDIT.md`, `docs/COMPOSITION_RULES_1.md`, `docs/internal/APP_TOPBAR_SYSTEM.md`, `docs/internal/SIDEBAR_NAVIGATION_SYSTEM.md`, `docs/internal/PACKAGES.md` — methodology depth sources
- Tool: `fleetsmith validate _fleet/fleet.yaml` (run from repo root `/Users/gaurabkumar/Documents/my code/common-componant-main`)
- AVOID: restating AGENTS.md rules verbatim inside skill bodies — reference the file path and section instead. AVOID: inventing work types or agents not in fleet.yaml. AVOID: touching any field other than skill `body`.

## Boundaries
- Only the three `body` blocks change — no schema, agent, capability, handoff, or description edits.
- Do not add a 4th skill or a 4th agent.
- Do not remove the scope-note paragraph above each TODO marker; it names the agent served and is the acceptance anchor.
- Skills must not restate AGENTS.md rules — point to the file and section (e.g., "follow AGENTS.md → 'Always/Never rules'"). The collision rule from the domain brief is non-negotiable.
- The compliance-review skill MUST keep `_fleet/QUALITY_CHECKLIST.md` as its named primary input and cover all three dimensions (Accessibility WCAG 2.2 AA, Security, Responsiveness).
- Stop after validation passes — do not run `fleetsmith build` (that is Phase 4, owned by harness-qa).

## Context digest

### What is already decided (do not relitigate)
- **Fleet name:** `componant-ui-harness`; **pattern:** fanout; **execution:** subagents.
- **3 agents:** `component-author` (work types 1/2/4/7), `screen-composer` (work type 3), `compliance-reviewer` (work types 5/6).
- **Capabilities:** component-author and screen-composer have `read+edit+run`; compliance-reviewer has `read+run` only (read-only on source — it can only write its verdict file). `grep`/`glob` are not separate capabilities in fleetsmith 0.4.1 — they fold into `read`.
- **Iteration loop:** `max: 3`, `until` all three dimensions PASS, `check: npm test -- --run`. A FAIL on any dimension bounces the artifact back to the producer.
- **`allowParallelWrites: true`** is set and justified: the two producers touch disjoint path trees (library code vs Next.js demo app pages).

### The three TODO markers (exact text to replace)
1. `component-authoring` skill — TODO covers: canonical file pattern walkthrough, prop-discovery workflow (types-first), token usage, story authoring, legacy migration table, pre-handoff self-check sequence against QUALITY_CHECKLIST.md.
2. `screen-composition` skill — TODO covers: zone-by-zone composition walkthrough, CTA hierarchy decision tree, DashboardShell API, FeedbackStates+useAsyncContentPhase state machine, compound-component patterns, pre-handoff self-check sequence.
3. `compliance-review` skill — TODO covers: per-dimension review workflow (keyboard trace, contrast calc, focus-trap verification, XSS grep, responsiveness viewport sweep), PR-diff scoping rules, verdict-file template, ranked-fix-list prioritization rubric.

### Critical domain constraints to bake into methodology
- **Export-name gotchas:** `DashboardShell` (not AppShell), `Avtar` (not Avatar), `ToolTip` (not Tooltip), `Input` (not TextInput), `variant="bordered"` (not "outlined"/"filled"). Component-author must migrate these; compliance-reviewer must grep for the legacy names.
- **Escape-hatch discipline:** no `className`/`style`/Tailwind on library components where a prop exists (`variant`, `elevation`, `tone`, `size`, `rounded`). This is the #1 historical failure (was 3/10, now 8/10 after docs improved).
- **CTA hierarchy:** one `variant="primary"` per zone max; ghost for row/footer actions.
- **5-zone layout:** ZONE 1 AppTopbar+primary CTA, ZONE 2 notification strip, ZONE 3 filters/tabs/breadcrumb, ZONE 4 main content, ZONE 5 footer.
- **Three review dimensions (all first-class, all mandatory):** Accessibility (WCAG 2.2 AA, A1-A10), Security (B1-B7), Responsiveness (C1-C7). Per the user ADDENDUM, the compliance-reviewer owns all three on every component, screen, and PR diff.
- **Verdict format** is specified at the bottom of `_fleet/QUALITY_CHECKLIST.md` — PASS/FAIL per dimension, file:line per failure, checklist item id (A4/B1/C2) per finding, ranked fix list naming the owner agent. The compliance-review skill must reproduce or reference this format exactly.

### Dead ends / things already tried
- `grep` and `glob` are NOT valid fleetsmith capabilities (validator rejects them) — they fold into `read`. Do not add them.
- Skills require a `description` field with an explicit "Use when …" clause or the validator warns; all three already have one — do not weaken it.
- The parallel-writes warning is already resolved via `allowParallelWrites: true` with a path-disjoint justification — do not re-litigate.

## Acceptance criteria
- [ ] All three `# TODO(skill-smith)` markers replaced with full methodology in `_fleet/fleet.yaml`
- [ ] Each skill `body` retains its scope-note paragraph (names the agent served) above the new methodology
- [ ] `compliance-review` skill body names `_fleet/QUALITY_CHECKLIST.md` as primary input and covers Accessibility + Security + Responsiveness
- [ ] No AGENTS.md rule is restated verbatim — skills reference the file path and section
- [ ] `fleetsmith validate _fleet/fleet.yaml` exits 0 with no new warnings
- [ ] Handoff `03-skill-smith-to-harness-qa.md` written with the verdict-file template and validation result for harness-qa to consume
