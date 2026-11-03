# Handoff: domain-analyst → fleet-architect

## Objective
Turn the decomposition brief for `componant-ui-harness` into a valid fleet.yaml — pattern, execution mode, agent roster, capability grants, and handoff graph — that passes `fleetsmith validate` with every remaining warning justified.

## Output format
- `fleet.yaml` written to `_fleet/fleet.yaml` (relative to repo root `/Users/gaurabkumar/Documents/my code/common-componant-main`)
- `fleetsmith validate fleet.yaml` exits 0
- Each skill `body` carries a one-paragraph scope note + `# TODO(skill-smith)` marker
- Handoff file `_fleet/handoffs/02-fleet-architect-to-skill-smith.md`

## Sources and tools
- This handoff (the contract)
- `/Users/gaurabkumar/Documents/my code/common-componant-main/AGENTS.md` — the canonical AI entry point; read for Always/Never rules and reading order
- `/Users/gaurabkumar/Documents/my code/common-componant-main/docs/` tree — design system, composition rules, component guides
- `/Users/gaurabkumar/Documents/my code/common-componant-main/src/components/{atoms,molecules,charts,common}/` — actual component dirs
- `/Users/gaurabkumar/Documents/my code/common-componant-main/packages/ui-common-hooks/` — hooks package
- `fleetsmith validate` and `fleetsmith build` commands
- AVOID: restating AGENTS.md rules inside agent prompts — reference the file instead to prevent drift

## Boundaries
- Fleet must extend `AGENTS.md`, not replace or restate it
- Do not generate Cursor-native `.cursor/rules/*.mdc` (harness-init targets Claude Code / opencode / goose)
- Do not split agents for splitting's sake — 3 agents is the recommended ceiling unless expertise/parallelism forces more
- Stop after the roster is shown to the user at the Phase 2 gate — do not proceed to skill authoring

## ADDENDUM (user input, mid-run): Accessibility, Security, Responsiveness as first-class dimensions

The user explicitly elevated three review dimensions to first-class status. The `compliance-reviewer` agent MUST check all three on every component, screen, and PR diff. A testable checklist has been written to `_fleet/QUALITY_CHECKLIST.md` — the fleet-architect must wire this into the compliance-reviewer's skill and handoff contract.

### The three dimensions
1. **Accessibility (WCAG 2.2 AA)** — 10 sub-sections (A1-A10): keyboard operability, touch targets, focus visibility, color contrast, forms/labels, tables, overlays/dialogs, feedback states, motion, screen reader semantics. Extends the existing checklist in `AGENTS.md`.
2. **Security** — 7 sub-sections (B1-B7): XSS prevention (no `dangerouslySetInnerHTML`, no `innerHTML`), input sanitization, focus security (focus trap, restore on close), dependency/supply chain, CSP friendliness (no `eval`, no inline handlers), form/validation security, secrets hygiene.
3. **Responsiveness** — 7 sub-sections (C1-C7): breakpoints (375/768/1440), navigation responsiveness, data display, forms, touch/interaction, theme/preference support, density/composition.

### Checklist artifact (already written)
- Path: `/Users/gaurabkumar/Documents/my code/common-componant-main/_fleet/QUALITY_CHECKLIST.md`
- Format: checkable items per dimension, with a verdict format spec at the bottom
- The compliance-reviewer's skill body must reference this file as its primary input (pointer, not restatement)

### Fleet-architect must
- Give the `compliance-reviewer` agent explicit responsibility for all three dimensions (accessibility, security, responsiveness) in its description and skill scope note
- Reference `_fleet/QUALITY_CHECKLIST.md` (path pointer) in the compliance-reviewer's skill body — the skill-smith will deepen the methodology
- Ensure the compliance-reviewer's handoff contract includes a verdict format: PASS/FAIL per dimension, file:line evidence per failure, ranked fix list naming the owner agent
- The `component-author` and `screen-composer` agents must self-check against the checklist before handing off to the compliance-reviewer (folded into their skills)

## Context digest

### Project reconnaissance
`ui-common-components` is a production React component library (MUI/Ant Design-style) for SaaS/dashboard/enterprise apps. Tech: React 18+, TypeScript 5.x, Tailwind 3 + CSS-variable tokens, tsup (4 build entries: `index`, `charts`, `shell`, `table`), vitest + jsdom, Storybook 8.6 webpack5, Next.js 16 demo app. Workspace monorepo: root package + `packages/ui-common-hooks`.

**Component inventory (verified):**
- `src/components/atoms/` — 21 component dirs: Avatar, Badge, Button, Checkbox, DatePicker, Divider, Dropdown, GradientText, Hyperlink, Icon, OtpBox, ProgressBar, RadioGroup, Select, Switch, TextArea, TextInput, TextInputSearch, TextView, ToolTip (+ ucs-choice-controls.css)
- `src/components/molecules/` — 19 component dirs: Accordion, AlertDialog, AppSidebar, AppTopbar, Breadcrumb, ButtonGroup, Calendar, Card, Combobox, DashboardShell, FeedbackStates, FileUpload, Form, Grid, Modal, Popover, Stepper, Table, Tabs
- `src/components/charts/` — AreaChart, BarChart, LineChart, PieChart, ChartTooltip (+ primitives, types, utils)
- `src/components/common/useRipple.tsx`
- 38 Storybook stories (all with Playground + argTypes), 23 test files, 25 hooks in `ui-common-hooks`
- Canonical component file pattern: `{Name}/` dir containing `{Name}.types.ts` + `{Name}.config.ts` + `index.tsx` + `{Name}.stories.tsx` + `{Name}.test.tsx` + optional `{Name}.css`, then barrel-exported from `src/index.tsx`

**Existing harness inventory:**
- `AGENTS.md` (root) — single AI entry point; 20-file required reading order; Always/Never rules; export-name gotchas (`Avtar` not Avatar, `ToolTip` not Tooltip, `Input` not TextInput, `DashboardShell` not AppShell); prop discovery tables (variant semantics per component); CTA hierarchy (5 zones, one primary CTA per zone max); accessibility checklist (WCAG 2.2 AA, 44×44px, focus rings, aria-live); Storybook Playground as live prop catalog
- `.cursor/rules/` — exists but EMPTY
- NO `.opencode/`, `.goose/`, `.claude/`, `CLAUDE.md`, or `.github/workflows/` AI automation
- **Collision rule:** the fleet must REFERENCE `AGENTS.md` (point agents to read it), never restate its rules inside agent prompts — restating creates drift as the file evolves

### Work-type table (7 types, 3 agents cover all)

| # | Work type | Input | Output | Required expertise | Parallelizable? | Agent |
|---|-----------|-------|--------|--------------------|-----------------|-------|
| 1 | Build a new component (atom/molecule/chart) | Spec/FRD describing component + props + variants | `{Name}/` dir: `.types.ts`, `.config.ts`, `index.tsx`, `.stories.tsx` (Playground+argTypes), `.test.tsx`, optional `.css`; barrel export in `src/index.tsx` | Design system tokens, component file pattern, TypeScript, Storybook argTypes, accessibility (WCAG 2.2 AA), Tailwind+CSS vars | YES | component-author |
| 2 | Write Storybook stories for a component | Component dir (types + index.tsx) | `{Name}.stories.tsx` with Playground story (first) + variant stories, argTypes on meta | Storybook 8.6, Controls panel, argTypes, token-driven theming, light/dark | YES | component-author (folded) |
| 3 | Compose a screen/page from library components | FRD for a screen | Next.js page using `DashboardShell` + `AppSidebar` + `AppTopbar`, 5-zone layout (ZONE 1 topbar, ZONE 2 notification strip, ZONE 3 filters/tabs, ZONE 4 main content, ZONE 5 footer), `FeedbackStates` + `useAsyncContentPhase`, CTA hierarchy (one primary per zone) | Composition rules, zones, CTA hierarchy, DashboardShell API, feedback state machine | YES (depends on components existing) | screen-composer |
| 4 | Add/extend a hook in `ui-common-hooks` | Hook spec (name, signature, behavior) | `useX.ts` + barrel export in package index + `docs/HOOKS_GUIDE.md` entry + `useX.test.ts` | React hooks, AbortController, SSR-safety, generic typing | YES | component-author |
| 5 | Audit a component against design system + a11y | Component dir path | Pass/fail report per `docs/design-system/COMPONENT_AUDIT.md` 8 sections with file:line citations | COMPONENT_AUDIT.md checklist, tokens reference, accessibility checklist, export-name gotchas | YES | compliance-reviewer |
| 6 | Review a PR/diff for compliance | Git diff (feature branch vs main) | Always/Never compliance report: legacy aliases used, className styling instead of props, competing primary CTAs, skipped docs/internal, Bootstrap usage, hardcoded values | AGENTS.md Always/Never rules, export-name table, variant semantics, CTA hierarchy | Partially (sequential review) | compliance-reviewer |
| 7 | Migrate legacy props/APIs | Legacy code (uses `AppShell`, `Avatar`, `Tooltip`, `variant="outlined"`/`"filled"`, `TextInput`) | Updated code using canonical names (`DashboardShell`, `Avtar`, `ToolTip`, `Input`, `variant="bordered"`) | Export-name migration table, backward-compat aliases | YES | component-author (folded) |

### Recommended fleet: 3 agents

**Justification:** Three agents mirror the codebase's own triad — `AGENTS.md` separates (a) "build components following the canonical file pattern" (author), (b) "compose screens via 5-zone layout + CTA hierarchy" (composer), and (c) "follow Always/Never rules + audit checklist" (reviewer). Story-authoring folds into the author (the component dir pattern already includes `.stories.tsx`); legacy migration folds into the author (who owns canonical export names); hook-authoring folds into the author (parallel work, same expertise).

| Agent | Owns work types | Output | Capabilities |
|-------|-----------------|--------|--------------|
| `component-author` | build component, write stories, add hook, migrate legacy | Code (`.tsx`/`.ts` + barrel exports + stories + tests) | Read, Write, Edit, Bash (test/build) |
| `screen-composer` | compose screen/page | Code (Next.js pages composing library pieces) | Read, Write, Edit, Bash |
| `compliance-reviewer` | audit component, review PR/diff | Verdicts (pass/fail reports with file:line citations) | Read, Grep, Glob, Bash (git diff) — NO Write to source |

### Quality risks the verifier must cross-check (13 identified; top 5 here)

1. **Agent invents props not in `.types.ts`** — e.g., `shadow="lg"` on Card (correct: `variant="elevated"` + `elevation="lg"`); `backgroundColor` on Button when `variant` covers it. Verify: grep generated code for props absent from `*.types.ts`.
2. **Agent uses `className`/`style`/Tailwind for visuals covered by props** — the #1 historical failure (escape-hatch discipline was 3/10 before docs improved to 8/10). Verify: grep generated component/screen code for `className=` or `style=` on library components where a prop exists.
3. **Agent uses legacy aliases** — `AppShell`, `Avatar`, `Tooltip`, `TextInput`, `variant="outlined"`/`"filled"`, `Card.Header` static aliases. Verify: grep for legacy names in new code.
4. **Agent creates competing primary CTAs** — two `variant="primary"` buttons at same size/zone level. Verify: count `variant="primary"` per zone in screen compositions.
5. **Agent skips `docs/internal/`** — without `APP_TOPBAR_SYSTEM.md`/`SIDEBAR_NAVIGATION_SYSTEM.md`, shell components get misused; without `PACKAGES.md`, dependency rationale is lost. Verify: agent prompts reference docs/internal paths; generated shell code matches internal system docs.

(Full 13: also — hardcoded hex/px instead of CSS tokens, missing aria-live on feedback states, missing 44×44px touch targets, Table without TableHead, Modal without aria-label, two equal-weight primary CTAs, dangerouslySetInnerHTML, Bootstrap usage, non-idempotent barrel exports.)

### User register
User writes in short, informal, typo-heavy messages ("co Documents/my code/common-componat folder", "create harness based on mui and antDesign"). User refers to the repo by folder name, not package name. Generated agent prompts should be direct and concrete, not verbose — match the user's terseness in any user-facing text, but keep internal methodology rigorous.

### Execution mode recommendation
**fanout** as default (independent component/hook/audit tasks run in parallel), with handoff edges for chains: `component-author` → `compliance-reviewer` (audit after build), `screen-composer` → `compliance-reviewer` (review after compose). The architect should confirm based on whether the primary use case is greenfield building (fanout) or maintenance review (pipeline).

## Acceptance criteria
- [x] Work-type table with columns: name, input, output, expertise, parallelizable?
- [x] Existing-harness inventory with collision notes (AGENTS.md is the entry point; fleet must reference not restate)
- [x] Recommended fleet size (3 agents) with a one-line justification
- [x] Domain-specific quality risks the verifier must cross-check (13 identified, 5 detailed)
- [x] Objective, Output format, Sources and tools, Boundaries sections present
