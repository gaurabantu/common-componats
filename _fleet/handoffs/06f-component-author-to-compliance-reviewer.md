# Handoff: component-author (agent F) -> compliance-reviewer

- **Task:** Sprint 2 Slice F — generic `Tooltip` (`src/components/molecules/Tooltip/`)
- **Status:** ready

## Objective
Verify the new generic `Tooltip` against `_fleet/QUALITY_CHECKLIST.md` A/B/C (especially WCAG 1.4.13: dismissable, hoverable, persistent) and issue a PASS/FAIL verdict with file:line evidence.

## Output format
The standard compliance verdict (per dimension A / B / C: PASS | FAIL, each finding with `file:line` or a command + output), appended to the Sprint 2 verdict file the orchestrator names (e.g. `_fleet/VERDICT-sprint2.md`). Defects only for correctness / stated requirements; style notes labelled optional.

## Sources and tools
- Component dir: `src/components/molecules/Tooltip/` (files listed under Artifacts).
- Spec: `_fleet/handoffs/06-orchestrator-sprint2-brief.md` (Slice F) + conventions in `_fleet/handoffs/05-orchestrator-sprint1-brief.md`.
- Tokens: `src/design-system/tokens.css` (classic `:root` ~L319, dark ~L469/524, mist ~L586).
- Legacy icon helper for comparison (unchanged): `src/components/atoms/ToolTip/`.
- Commands: `npx vitest run src/components/molecules/Tooltip` (24 tests), `npx vitest run` (full), `npx tsc --noEmit -p tsconfig.json 2>&1 | grep molecules/Tooltip` (must print nothing).
- Storybook: `Design System/Molecules/Tooltip` — check 375/768/1440 and dark/mist themes; `Collision flip` story for edge flipping.

## Boundaries
- Do not edit `src/index.tsx`, `src/portal/`, `.storybook/`, `package.json`, `dist/` — the orchestrator wires the barrel exports below.
- `src/components/atoms/ToolTip/` (legacy icon helper) is out of scope and was intentionally not changed.
- Slices D (FormField/PageHeader) and E (FilterBar/DataTable) are reviewed from their own handoffs (06d, 06e).
- Stop after the verdict; route fixes back to component-author.

## Context digest
- **API:** `children` (one element, cloned), `content`, `side` top|right|bottom|left (default top), `align` start|center|end (center), `delay` 300, `closeDelay` 100, `open`/`defaultOpen`/`onOpenChange`, `disabled`, `maxWidth` (number=px or string, default 240), `variant` dark|light (dark). Remaining HTML attrs + `ref` go to the bubble `div`. Defaults in `Tooltip.config.ts`.
- **Clone contract** (`index.tsx:223-256`): adds `ref` (merged with the child's ref; React 18/19 aware, `index.tsx:47-51`), `aria-describedby` (appended to the child's existing ids; removed when `disabled`), and composed `onPointerEnter/Leave/Focus/Blur` (child handlers run first). `event.currentTarget` is also captured as trigger fallback for children that do not forward refs (Button is `React.memo`, not `forwardRef`).
- **Bubble is always mounted (portal to `document.body`) with `hidden` when closed** (`index.tsx:262-271`) so the `aria-describedby` reference always resolves and SRs read the description on focus. `role="tooltip"` queries therefore return nothing while closed.
- **Open/close rules:** hover opens after `delay` (ignored for `pointerType === "touch"`); keyboard focus opens immediately (deliberate — `delay` only applies to hover); close runs only when neither hover nor focus is active (`scheduleClose`, `index.tsx:147`), after `closeDelay` for pointer leave, immediately for blur.
- **Escape** (`index.tsx:169-180`): document capture-phase listener while open; `preventDefault` + `stopPropagation` so only the tooltip closes — an enclosing Modal/Drawer does not close on the same key press. Focus is not moved. After Escape, the tooltip does not re-open until the pointer re-enters or focus re-enters.
- **Positioning:** new pure util `tooltipPosition.ts` (`computeTooltipPosition`, `resolveTooltipSide`) — four sides, three aligns, flip to opposite side when the preferred side lacks room (or the opposite has more), cross-axis clamp to an 8px viewport inset. `popoverPosition.ts` was read but only supports `top|bottom-start|end`, so not reused. Repositions on resize and capture-phase scroll.
- **Hover bridge:** `Tooltip.css:49-76` `::before` fills the 8px gap (`--space-1`) between trigger and bubble so the pointer crossing the gap never leaves both elements.

## Self-check (QUALITY_CHECKLIST A / B / C) — file:line evidence
**A Accessibility**
- A role/name: `role="tooltip"` `index.tsx:270`; `aria-describedby` on trigger `index.tsx:228` (merged, test `Tooltip.test.tsx` "preserves an existing aria-describedby").
- A keyboard: opens on focus `index.tsx:247-251`, closes on blur `index.tsx:252-256`; tests "opens immediately on keyboard focus and closes on blur".
- A WCAG 1.4.13 dismissable: `index.tsx:169-180`; tests `Tooltip.test.tsx:183` (focus-opened, focus stays on trigger), `:192` (hover-opened, no pointer move, no re-open), `:204` (Escape consumed, outer layer unaffected).
- A WCAG 1.4.13 hoverable: bubble pointer handlers `index.tsx:284-296` + bridge `Tooltip.css:49-76`; test `:217`.
- A WCAG 1.4.13 persistent: no auto-hide timer; close gated on hover+focus `index.tsx:147-163`; tests `:232`, `:240`, `:249`.
- A focus ring: the Tooltip adds no focusable element; the trigger keeps its own `:focus-visible` ring (Button tokens).
- A contrast (WCAG relative-luminance formula, values from tokens.css):

| Variant / theme | Text fg on bg | Ratio | Bubble vs page (boundary) |
|---|---|---|---|
| dark / classic | `#ffffff` on `#0d0d0d` | 19.44:1 | `#0d0d0d` vs page `#e0e0e0` 14.72:1 |
| dark / dark | `#1f2937` on `#f3f4f6` | 13.34:1 | `#f3f4f6` vs page `#111827` 16.12:1 |
| dark / mist | `#fafafa` on `#0d0d0d` | 18.62:1 | `#0d0d0d` vs page `#ededed` 16.60:1 |
| light / classic | `#0d0d0d` on `#ffffff` | 19.44:1 | border `#8a8a8a` vs `#ffffff` 3.45:1, vs page `#e0e0e0` 2.62:1 |
| light / dark | `#f3f4f6` on `#1f2937` | 13.34:1 | border `#717a86` vs `#1f2937` 3.38:1, vs page `#111827` 4.08:1 |
| light / mist | `#0d0d0d` on `#ffffff` (bg-elevated not overridden in mist) | 19.44:1 | border `#8a8a8a` vs page `#ededed` 2.95:1, vs surface `#fafafa` 3.31:1 |

  Variant tokens: `Tooltip.css:34-46` (dark = `--color-text-primary` fill / `--color-bg-surface` text; light = `--color-bg-elevated` / `--color-text-primary` / `--color-border-default`). All text ≥ 4.5:1. The light border on the light page is < 3:1 in classic/mist; a tooltip boundary is not required for understanding (text carries the meaning, 1.4.11 not triggered) — noted, not a defect in my reading; reviewer to confirm.
- A forced colors: `Tooltip.css:98-105` (Canvas/CanvasText + visible border, shadow removed).

**B Security**
- No `dangerouslySetInnerHTML` / `eval` / `new Function` / hex literals in the dir (grep empty). `content` rendered as React children `index.tsx:298`.
- Escape-dismiss of the overlay layer implemented locally (no `ui-common-hooks` import).
- No timers leak: cleared on unmount `index.tsx:112`.

**C Responsiveness**
- `max-width: min(var(--ds-tooltip-max-width), calc(100vw - var(--space-2)))` `Tooltip.css:10` — fits 375px; long words wrap (`overflow-wrap: anywhere`).
- Viewport clamp + flip `tooltipPosition.ts` (tests `Tooltip.test.tsx:259-292`).
- `prefers-reduced-motion` disables the fade `Tooltip.css:91-95`; animation uses `--duration-fast` / `--easing-enter`.
- Dark theme: dark variant inverts automatically via tokens (table above).
- z-index `var(--z-tooltip-top)` `Tooltip.css:7` (above modal/toast).

## Failed approaches
- First timer design returned early from `scheduleOpen` while a hover open-timer was pending, and `scheduleClose` (from blur) cancelled that timer — tooltip never opened for "hover + focus + blur". Fixed: focus opens immediately, clearing any pending hover timer; `scheduleClose` is a no-op while hover or focus is still active. Covered by test "blur does not close while the pointer is still over the trigger".
- Story initially used `variant="outline-secondary"`; Button's union is camelCase (`outlineSecondary`) — corrected. Icon-only trigger uses `Button icon={…} ariaLabel="Delete"` (not a raw `<button>` with btn-* classes).

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/molecules/Tooltip/Tooltip.types.ts | `TooltipProps`, `TooltipSide`, `TooltipAlign`, `TooltipVariant`, `TooltipPositionResult` | final |
| src/components/molecules/Tooltip/Tooltip.config.ts | `TOOLTIP_DEFAULTS`, gap/padding constants, option lists | final |
| src/components/molecules/Tooltip/tooltipPosition.ts | pure flip/align/clamp positioning | final |
| src/components/molecules/Tooltip/index.tsx | `Tooltip` (forwardRef to bubble, displayName), re-exports types + position utils | final |
| src/components/molecules/Tooltip/Tooltip.css | token-only styles, hover bridge, reduced-motion, forced-colors | final |
| src/components/molecules/Tooltip/Tooltip.stories.tsx | Playground, Sides, Alignment, Variants, Icon-only, Link/input, Long content, Collision flip, Controlled, Disabled; docs note explains Tooltip vs legacy ToolTip | final |
| src/components/molecules/Tooltip/Tooltip.test.tsx | 24 tests: rendering, interaction, WCAG 1.4.13, positioning | final |

## Barrel exports needed
Add to `src/index.tsx` (orchestrator):
```ts
export { Tooltip } from "./components/molecules/Tooltip";
export type { TooltipProps, TooltipSide, TooltipAlign, TooltipVariant } from "./components/molecules/Tooltip";
```
Keep the existing legacy `ToolTip` export unchanged (different component: info-icon helper). If a case-insensitive name clash is a concern for consumers, both names are distinct identifiers in JS/TS; no file-path clash (`atoms/ToolTip` vs `molecules/Tooltip`). Note: macOS default filesystems are case-insensitive, but the dirs live under different parents, so no collision.

## Acceptance criteria
- `npx vitest run src/components/molecules/Tooltip` → 24/24 pass (verified at handoff).
- Full `npx vitest run` green — at handoff: 38 files / 351 tests pass (310 baseline + 24 Tooltip + parallel Sprint 2 slices).
- `npx tsc --noEmit -p tsconfig.json 2>&1 | grep molecules/Tooltip` prints nothing (verified; note tsconfig excludes `*.test.*`).
- 1.4.13 dismissable / hoverable / persistent each backed by a passing test (listed above).
- No legacy aliases in new code; `atoms/ToolTip` unchanged (`git status src/components/atoms/ToolTip` clean).

## Open questions
- Escape is consumed (stopPropagation in capture phase) while a tooltip is open, so a trigger's own `onKeyDown` for Escape will not fire on that press. Matches the "top-most layer only" model; confirm acceptable.
- Light-variant border vs light page is 2.62:1 (classic) / 2.95:1 (mist). Not required in my reading of 1.4.11; switching to `--color-border-strong` would fix it at the cost of a heavy outline.
- Not verified in a real browser here (jsdom only): actual flip rendering, the hover bridge, and the 375px layout. Please check the `Collision flip` and `Long content` stories.
