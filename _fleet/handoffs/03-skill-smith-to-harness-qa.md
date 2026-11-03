# Handoff: skill-smith → harness-qa

## Objective
Compile the `componant-ui-harness` fleet — run `fleetsmith build`, materialize agent prompts/skill files for the 3 agents and 3 skills, then adversarially verify the compiled harness end-to-end before it ships.

## Output format
- Run `fleetsmith build _fleet/fleet.yaml` from the repo root — produces the compiled harness (agent rosters, skill bodies, handoff graph).
- Run an adversarial end-to-end verification of the compiled harness: confirm each agent prompt names its skill, each skill body is present and non-empty, the handoff graph (component-author → compliance-reviewer, screen-composer → compliance-reviewer, iteration loop max 3) is intact, and `fleetsmith validate` still exits 0 post-build.
- Produce a verdict file (the fleet's compile-and-QA artifact) recording: build success/failure, validate result, any warnings, and a per-skill body sanity check (triggers fire on the right requests, methodology is concrete, no TODO markers).
- If the build or verification fails, record the failure with the exact command output and the fix applied; do not silently ship a broken harness.

## Sources and tools
- This handoff (the contract)
- `_fleet/fleet.yaml` — the fully-authored fleet spec (3 agents, 3 skills, all `# TODO(skill-smith)` markers replaced with researched methodology; `fleetsmith validate` exits 0 as of this handoff)
- `_fleet/QUALITY_CHECKLIST.md` — the compliance-review skill's named primary input (A1-A10, B1-B7, C1-C7 + verdict format at the bottom); the skill body reproduces the verdict template and the contrast formula
- `_fleet/handoffs/02-fleet-architect-to-skill-smith.md` — the fleet architecture contract (pattern, execution, capabilities, loop, parallel-writes justification)
- `_fleet/handoffs/01-domain-analyst-to-fleet-architect.md` — the domain brief (7 work types, 3-agent roster rationale, 13 quality risks, export-name gotchas)
- `AGENTS.md` (repo root) — the canonical AI entry point; skills reference it by path/section, never restate it
- Tool: `fleetsmith build _fleet/fleet.yaml` and `fleetsmith validate _fleet/fleet.yaml` (run from repo root `/Users/gaurabkumar/Documents/my code/common-componant-main` — note the space in "my code", quote paths in commands)
- AVOID: editing `_fleet/fleet.yaml` skill bodies — they are authored and validated; if you find a defect, record it in the verdict and ask for a re-author, do not patch inline. AVOID: running the agents against a live repo task — your job is compile + verify, not execute.

## Boundaries
- Only compile and verify — do not re-author skills, re-architect the fleet, or add a 4th agent/skill.
- Do not edit `AGENTS.md` or any source under `src/` — the fleet is a harness overlay, not a source change.
- Do not run `npm test` / `npm run build` on the library itself — that is the agents' job at execution time; your check is `fleetsmith validate` + `fleetsmith build`.
- Stop after the verdict file is written and the harness is confirmed shippable (or the failure is documented). Do not execute the fleet against a user task.

## Context digest

### What is already decided (do not relitigate)
- **Fleet name:** `componant-ui-harness`; **pattern:** fanout; **execution:** subagents; **parallel writes:** allowed (path-disjoint: library code vs Next.js demo app).
- **3 agents:** `component-author` (read+edit+run; work types 1/2/4/7), `screen-composer` (read+edit+run; work type 3), `compliance-reviewer` (read+run only — read-only on source, writes only the verdict file; work types 5/6).
- **Iteration loop:** `max: 3`, `until` all three dimensions PASS, `check: npm test -- --run`. A FAIL on any dimension bounces the artifact back to the producer.
- **3 skills, all authored:** `component-authoring`, `screen-composition`, `compliance-review`. Every `# TODO(skill-smith)` marker has been replaced; `grep TODO(skill-smith) _fleet/fleet.yaml` returns no matches (exit 1).
- **`fleetsmith validate _fleet/fleet.yaml` exits 0** with no warnings as of this handoff (verified twice: once after edits, once after a typo fix).

### What the skill bodies now contain (so you don't re-read them)
- **`component-authoring`** (serves component-author): §1 canonical component dir walkthrough (`{Name}.types.ts` → `.config.ts` → `index.tsx` → `.stories.tsx` → `.test.tsx` → optional `.css`, with forwardRef + displayName + barrel export); §2 types-first prop discovery (read `dist/index.d.ts` or `.types.ts` before writing JSX; map intent via AGENTS.md tables — never invent props); §3 token usage (`var(--color-*)`/`--space-*`/`--radius-*`/`--shadow-*`, never hex/px; Tailwind for layout only); §4 Playground-first story authoring (argTypes on meta, `sb-*` decorator classes, light/dark + 375/768/1440 viewports); §5 legacy migration table (AppShell→DashboardShell, Avatar→Avtar, Tooltip→ToolTip, TextInput→Input, variant="outlined"/"filled"→"bordered"; verify via `src/index.tsx` barrel — non-`@deprecated` export is canonical); §6 pre-handoff self-check against QUALITY_CHECKLIST.md A/B/C with file:line evidence + `npm test -- --run`.
- **`screen-composition`** (serves screen-composer): §1 zone-by-zone walkthrough (ZONE 1 AppTopbar as `topbar` prop, ZONE 2 OfflineBanner slim/full via `useOnlineStatus`, ZONE 3 Tabs/Breadcrumb/filters wired to data fetch, ZONE 4 main content paired with `useAsyncContentPhase`, ZONE 5 pagination + ghost footer actions); §2 CTA hierarchy decision tree (one `variant="primary"` per zone max; outlineSecondary for Zone 1 alt; ghost for row/footer; outlinePrimary for ErrorState retry; danger for destructive; count primaries per zone before handoff); §3 DashboardShell API (pass `sidebar`/`topbar`/`contentClassName`; shell manages `margin-inline-start` via `--app-sidebar-offset` — never set `marginLeft: 320`); §4 FeedbackStates + useAsyncContentPhase state machine (phase priority loading→offline→error→empty→ready; full code pattern with animations as `image` prop; `aria-live` built in — verify); §5 compound-component patterns (Card with CardHeader/CardTitle/CardDescription/CardAction/CardContent/CardFooter; Table primitives for semantic HTML with `<th scope="col">`; Tabs with TabsList/TabsTrigger/TabsContent); §6 pre-handoff self-check — C1, C7, A5, A7 explicitly + full A/B/C sweep + `npm run build`.
- **`compliance-review`** (serves compliance-reviewer): §0 primary input is `_fleet/QUALITY_CHECKLIST.md` (read first; skill encodes workflow, doesn't restate items); §1 Accessibility A1-A10 workflow (keyboard trace via Tab/Enter/Space/Escape, focus-trap verification via `useFocusTrap` grep, **contrast calculation formula** — sRGB linearization + `L = 0.2126R+0.7152G+0.0722B` + ratio `(L1+0.05)/(L2+0.05)`, thresholds 4.5:1 text / 3:1 large + non-text, recompute for dark mode; aria audit); §2 Security B1-B7 (XSS grep for `dangerouslySetInnerHTML`/`innerHTML`/`outerHTML`/`eval`/`new Function`; input sanitization check; focus security via `useFocusTrap`/`useDismissableLayer`; `npm audit` for high/critical; CSP grep for inline handlers); §3 Responsiveness C1-C7 (viewport sweep 375/768/1440; navigation collapse; data display; touch targets ≥44×44; theme + prefers-reduced-motion; density + zone hold); §4 PR-diff scoping (`git diff main...feature -- <path>`, only check touched lines but flag regressions in surrounding code); §5 verdict-file template (exact format from bottom of QUALITY_CHECKLIST.md — PASS/FAIL per dimension, `[PASS]`/`[FAIL]` per item with file:line + checklist id, ranked fix list naming owner agent); §6 prioritization rubric (P0 security/a11y blocker blocks ship; P1 contrast/focus/responsiveness breakage blocks ship; P2 code quality/missing stories/legacy aliases; P3 nitpicks; order P0→P3, group by owner).

### Constraints baked into the methodology (verify these survive compilation)
- **No AGENTS.md restatement:** all three skills reference `AGENTS.md` by path + section name (e.g. "follow AGENTS.md → 'Always/Never rules'", "AGENTS.md → 'Card — intent → props'"). They do not restate the rules. This prevents drift as AGENTS.md evolves.
- **No QUALITY_CHECKLIST.md restatement:** the compliance-review skill names it as primary input, encodes the *workflow* for each item (what to grep, what to calculate, what to render), and reproduces the verdict *template* (because the agent must output that exact format). It does not restate the checklist items themselves.
- **Export-name gotchas encoded:** component-authoring §5 has the migration table; compliance-review §2 greps for legacy names (`AppShell`, `Avatar`, `Tooltip`, `TextInput`, `variant="outlined"`/`"filled"`).
- **Escape-hatch discipline encoded:** component-authoring §3 forbids `className`/`style`/Tailwind on prop-covered visuals; compliance-review flags it as P2.
- **CTA hierarchy encoded:** screen-composition §2 has the decision tree + "count primaries per zone before handoff"; compliance-review C7 checks "one `variant="primary"` per zone max".
- **Three first-class dimensions:** compliance-review covers Accessibility + Security + Responsiveness on every review; component-author and screen-composer self-check all three before handoff.

### Verdict-file template (the compliance-reviewer's output contract — reproduce exactly)
```
## Accessibility: PASS / FAIL
- [PASS] A1 Keyboard — Tab order verified (src/components/X/index.tsx:42)
- [FAIL] A4 Contrast — Button ghost variant text #999 on #fff = 2.85:1 (src/components/X/index.tsx:88) — use token --color-text-secondary

## Security: PASS / FAIL
...

## Responsiveness: PASS / FAIL
...

## Ranked fix list
1. [component-author] Fix contrast in X (src/components/X/index.tsx:88)
2. [screen-composer] Add aria-live to async table (app/dashboard/page.tsx:120)
```
Every FAIL cites `file:line` + checklist item id (A4/B1/C2). Every fix names the owner agent. Prioritized P0→P3.

### Dead ends / things already tried
- `grep` and `glob` are NOT valid fleetsmith capabilities in 0.4.1 — they fold into `read`. Do not add them. (The domain brief listed them; the architect already corrected this.)
- The skill bodies use YAML literal block scalars (`|`). The verdict-file template inside the compliance-review body contains `#`-prefixed lines and a fenced code block — these are fine inside `|` (they're literal text, not YAML comments). `fleetsmith validate` confirms the YAML parses.
- A stale header comment on line 5 of fleet.yaml said "Skills carry TODO(skill-smith) markers" — updated to "Skill bodies authored by skill-smith (Phase 3)" so the acceptance grep is clean.
- A typo ("molents" → "molecules") was caught and fixed in component-authoring §1 before validation.

## Acceptance criteria
- [ ] `fleetsmith build _fleet/fleet.yaml` succeeds (exits 0) from repo root
- [ ] `fleetsmith validate _fleet/fleet.yaml` still exits 0 after build (no new warnings)
- [ ] No `TODO(skill-smith)` markers in `_fleet/fleet.yaml` (grep returns exit 1)
- [ ] Each compiled agent prompt references its skill by name and the skill body is present and non-empty
- [ ] Handoff graph intact: component-author → compliance-reviewer, screen-composer → compliance-reviewer, loop max 3, check `npm test -- --run`
- [ ] Verdict file (compile-and-QA artifact) written with build/validate results and per-skill sanity check
- [ ] If any check fails, the failure + command output + fix is documented (no silent shipping)
