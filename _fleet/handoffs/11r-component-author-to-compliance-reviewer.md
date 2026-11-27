# Handoff: component-author (Slice R) -> compliance-reviewer

- **Task:** Sprint 6 Slice R — Breadcrumb + ButtonGroup prop upgrades; new test suites for Badge, DatePicker, Accordion, AppSidebar, Calendar (+ Breadcrumb, ButtonGroup), fixing the real bugs those tests exposed.
- **Status:** ready (after the orchestrator wires the barrel lines below)

## Objective
Verify the Slice R changes against `_fleet/QUALITY_CHECKLIST.md` A/B/C and the Sprint 6 backward-compatibility rule, and record PASS/FAIL per dimension in `_fleet/VERDICT-sprint6.md`.

## Output format
`_fleet/VERDICT-sprint6.md`, "Slice R" section: `## Accessibility: PASS/FAIL`, `## Security: PASS/FAIL`, `## Responsiveness: PASS/FAIL`, then a ranked fix list (P1/P2/P3) where each item cites `file:line` + a reproducing command.

## Sources and tools
- Briefs: `_fleet/handoffs/11-orchestrator-sprint6-brief.md` (Slice R), `_fleet/handoffs/05-orchestrator-sprint1-brief.md` (conventions).
- Code: `src/components/molecules/{Breadcrumb,ButtonGroup,Accordion,AppSidebar,Calendar}/`, `src/components/atoms/{Badge,DatePicker}/`.
- Tests: `npx vitest run src/components/molecules/{Breadcrumb,ButtonGroup,Accordion,AppSidebar,Calendar} src/components/atoms/{Badge,DatePicker}` gives **7 files, 156 tests, all pass**.
- Full suite: `npx vitest run` gives **1911 pass / 2 fail**. Both failures are in `src/portal/components/dashboardData.test.ts` (folder count 26 vs 28; gallery missing AvatarGroup, Rating, DashboardShell, FeedbackStates, TagInput, TimePicker, Timeline). They come from new dirs/stories in Slices P/S/T, not Slice R. The orchestrator fixes them with `npm run portal:stats` and gallery wiring.
- Typecheck: `npx tsc --noEmit -p tsconfig.json | grep -E "Breadcrumb|ButtonGroup|Accordion|AppSidebar|Calendar|Badge|DatePicker"` prints nothing.
- Storybook: Breadcrumb/ButtonGroup stories. Check at 375 / 768 / 1440 in the classic, dark and mist themes.

## Boundaries
- Out of scope: `src/index.tsx`, `src/entries/*`, `package.json`, `dist/`, `atoms/Button/**` (not Slice R files). Do not run `npm run build`.
- The tests-only components (Badge, DatePicker, Accordion, AppSidebar, Calendar) got minimal bug-fix diffs only. Their pre-existing inline styles and hardcoded px in DatePicker/Calendar were **not** refactored (not in brief). Do not FAIL Slice R on pre-existing debt. Flag it as P3 if you want.
- Stop after one verdict for Slice R; do not edit source.

## Context digest
- **Breadcrumb** (`molecules/Breadcrumb/`): adds an `items` data API (`label, href, icon, current, key, renderLink, linkProps`). `children` stays supported and is now optional; when both are passed, `items` wins and a dev warning fires. `maxItems` + `itemsBeforeCollapse`/`itemsAfterCollapse` (default 1/1) collapse the middle into a `<button aria-label="Show N more">…</button>`. Expanding moves focus to the first revealed segment (`index.tsx:153`, effect below it). Responsive auto-collapse: at `(max-width: 640px)`, trails longer than 3 segments become first · … · last (`responsiveCollapse`, default true; local matchMedia hook, no ui-common-hooks). `separator` accepts `"slash" | "chevron" | ReactNode`; a custom node renders `aria-hidden` inside each li (`data-separator="custom"`), and `null`/`false` gives `"none"`. Router links work through `renderLink` (on Breadcrumb or per item; item wins) or `asChild` on `BreadcrumbItem`. All hrefs go through `isSafeHref` (`index.tsx:248,274`); unsafe ones render as text without `aria-current`. Both components are now `memo(forwardRef)` with displayName set. New `Breadcrumb.config.ts` and `Breadcrumb.utils.ts` (`getCollapseRange`).
- **Breadcrumb semantics change (intended):** `current` no longer defaults to `false`. When `current` is undefined, an item without href is current (same as before). An explicit `current={false}` with no href now renders plain non-current text; before, it got `aria-current="page"`. The items API uses this for non-last text crumbs.
- **ButtonGroup** (`molecules/ButtonGroup/`): adds `attached` (default **true**, which keeps the old joined look), `size`, `variant`, `disabled`, `fullWidth`. These cascade by **cloning direct `Button` children** and only fill props the child left `undefined`, so child props win (`index.tsx:~45-60`). Nested groups inherit size/variant, and disabled is OR-ed. The group gets `aria-disabled` when disabled. Joined CSS is now scoped to `[data-attached="true"]`. `[data-attached="false"]` uses `gap: var(--space-1)`. New `useButtonGroupContext()` (returns null outside a group) and new `ButtonGroup.config.ts`. `ButtonGroupContextValue` gains optional fields only.
- **Bugs fixed (minimal diffs):**
  1. Accordion `type="multiple"` mutated the caller's controlled `value` array in place (`Accordion/index.tsx:123`).
  2. Calendar month/year "menus" never stayed open when `month` was controlled: the effect depended on a new Date each render. It now depends on the timestamp (`Calendar/index.tsx:~258-263`).
  3. Calendar day buttons used `aria-selected` (invalid on `button`). They now use `aria-pressed`, plus `aria-current="date"` for today and `aria-disabled` when the calendar is disabled or readOnly (`:764-770`).
  4. Calendar had no keyboard grid (A1). It now has a roving tabindex plus Arrow/Home/End/PageUp/PageDown (Shift+Page moves by year), skips disabled days, and changes month across boundaries (`:331` onward).
  5. `parseDate`/`isValidDate` rejected every `YYYY-…` date because the year length was checked on `parts[2]`. So Calendar `minDate="2026-03-05"` was ignored (`DatePicker.utils.ts:155`).
  6. DatePicker passed its own-format min/max strings (e.g. `DD-MM-YYYY`) to Calendar, which parses `YYYY-MM-DD`/`MM/DD/YYYY`, so valid days were disabled. It now passes the parsed Dates (`DatePicker/index.tsx:658,677,785`).
  7. DatePicker single input had `aria-label={placeholder}`, which overrode the visible `<label>` (`:723`). The range inputs had no names; they are now `"{label}, Start date"` / `"{label}, End date"`. Helper text is linked via `aria-describedby`, errors get `role="alert"` and `aria-invalid`, and `aria-required` is set. The toggle now has `aria-haspopup="dialog"` and `aria-expanded`. When the popover closes after Escape or a pick, focus returns to the toggle if it was inside (`closePopover`, `:126`).
  8. AppSidebar rendered unsafe `href` on nav items and footer actions. It now falls back to `<button>` (`AppSidebar/index.tsx:358,692`).
  9. AppSidebar `onExpandedChange` fired only in controlled mode (`:307`).
  10. The AppSidebar collapsed-rail tooltip could not be dismissed with Escape (WCAG 1.4.13) (`AppSidebarTooltipHost.tsx:84`).
  The ledger's Sprint 2 P3 item "Breadcrumb separator alt text" is also done (`Breadcrumb.css:50`, `content: "/" / ""`).
- **Contrast (computed from tokens.css, WCAG formula):** plain/non-current crumb text `--color-text-secondary` measures 6.48:1 on the light surface, 4.91:1 on the light page (`#e0e0e0`), 6.21:1 on the mist surface, 6.71:1 on the dark surface and 8.1:1 on the dark page. The "…" hover is `--color-text-primary` on `--color-fill-muted`: 17.83:1 light, 9.37:1 dark. The focus ring `--color-focus-ring` measures 5.57:1 on the light surface and 5.77:1 on the dark surface.

### Self-check evidence (A / B / C)
- **A1 keyboard:** Breadcrumb "…" is a native `<button>` and focus moves after expand (`Breadcrumb/index.tsx:153`, test "expands on click … moves focus"). Calendar arrow-key grid is at `Calendar/index.tsx:331`, with 8 keyboard tests. ButtonGroup keeps native buttons, nothing gets `tabindex=-1`.
- **A2 targets:** the "…" button is 2.75rem (44px) min (`Breadcrumb.css:162`). Breadcrumb items keep `min-height: 44px`. Detached ButtonGroup has an 8px gap (`ButtonGroup.css:135`).
- **A3 focus:** `.ds-breadcrumb__ellipsis:focus-visible` uses `--color-focus-ring` (`Breadcrumb.css:184`). Existing link ring at `:88`.
- **A4 / C6 forced-colors:** chevron separator and ellipsis border (`Breadcrumb.css:197`), ButtonGroup separator (`ButtonGroup.css:159`).
- **A5 forms:** DatePicker label, describedby, invalid and required (`DatePicker/index.tsx:723`, `fieldA11y`). Errors use `role="alert"` (`:694,800`).
- **A7 overlays:** DatePicker toggle has `aria-haspopup`/`aria-expanded` (`:581,753`) and focus restore (`:126`).
- **A10 SR:** custom separators and icons are `aria-hidden`. The expand button name is "Show N more". `aria-current="page"` (`Breadcrumb/index.tsx:322`).
- **B1:** no `dangerouslySetInnerHTML`, `eval` or `innerHTML` in touched files. hrefs are sanitised in Breadcrumb (`:248,274`) and AppSidebar (`:358,692`). Badge test asserts text is not parsed as HTML.
- **C1/C2:** Breadcrumb collapses at ≤640px (`index.tsx:133`) and crumb text is truncated to 12rem (`Breadcrumb.css:190`). ButtonGroup `fullWidth` shares width (`ButtonGroup.css` fullWidth block). The `Mobile` / `FullWidth` stories default to the mobile1 viewport.
- **C6 motion:** no new animation. The existing ButtonGroup reduced-motion rule is at `ButtonGroup.css:128`.

## Failed approaches
- `window.localStorage.clear()` / `getItem` throw `is not a function` under this Vitest/Node build: Node's file-less built-in `localStorage` shadows jsdom's. The AppSidebar persistence test therefore stubs `window.localStorage` with an in-memory object and restores it afterwards. In-app persistence is unaffected (reads and writes are already try/catch).
- A Calendar `isInVisibleMonth` written as a TS type guard (`d is Date`) narrowed `target` to `never` in the negative branch. It is now a plain boolean.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/molecules/Breadcrumb/Breadcrumb.types.ts | items/collapse/separator/renderLink/asChild types | final |
| src/components/molecules/Breadcrumb/Breadcrumb.config.ts | NEW defaults, narrow query, expand label | final |
| src/components/molecules/Breadcrumb/Breadcrumb.utils.ts | NEW `getCollapseRange` | final |
| src/components/molecules/Breadcrumb/index.tsx | rewritten (forwardRef, items, collapse, sanitise) | final |
| src/components/molecules/Breadcrumb/Breadcrumb.css | alt-text slash, custom separator, ellipsis, icon, ≤640px, forced-colors | final |
| src/components/molecules/Breadcrumb/Breadcrumb.stories.tsx | Playground (items+collapse) + 9 stories, docs description | final |
| src/components/molecules/Breadcrumb/Breadcrumb.test.tsx | NEW, 30 tests | final |
| src/components/molecules/ButtonGroup/ButtonGroup.types.ts | attached/size/variant/disabled/fullWidth | final |
| src/components/molecules/ButtonGroup/ButtonGroup.config.ts | NEW defaults | final |
| src/components/molecules/ButtonGroup/index.tsx | cascade by clone, forwardRef, `useButtonGroupContext` | final |
| src/components/molecules/ButtonGroup/ButtonGroup.css | attached-scoped joins, detached gap, fullWidth, forced-colors | final |
| src/components/molecules/ButtonGroup/ButtonGroup.stories.tsx | argTypes + Detached/Cascaded/Disabled/FullWidth | final |
| src/components/molecules/ButtonGroup/ButtonGroup.test.tsx | NEW, 14 tests | final |
| src/components/atoms/Badge/Badge.test.tsx | NEW, 21 tests (no source change) | final |
| src/components/molecules/Accordion/index.tsx | bug fix (array mutation) | final |
| src/components/molecules/Accordion/Accordion.test.tsx | NEW, 17 tests | final |
| src/components/molecules/Calendar/index.tsx | keyboard grid, aria-pressed/current/disabled, menus fix | final |
| src/components/molecules/Calendar/Calendar.test.tsx | NEW, 25 tests | final |
| src/components/atoms/DatePicker/index.tsx | label/describedby/invalid/haspopup/focus restore, parsed min/max | final |
| src/components/atoms/DatePicker/DatePicker.utils.ts | YYYY-first year-length fix | final |
| src/components/atoms/DatePicker/DatePicker.test.tsx | NEW, 20 tests | final |
| src/components/molecules/AppSidebar/index.tsx | href sanitise, uncontrolled onExpandedChange | final |
| src/components/molecules/AppSidebar/AppSidebarTooltipHost.tsx | Escape dismiss | final |
| src/components/molecules/AppSidebar/AppSidebar.test.tsx | NEW, 29 tests | final |

## Barrel exports needed
Add to `src/index.tsx`. Existing lines stay as they are; these are additions only.
```ts
// Breadcrumb: extend the existing type export line (values unchanged)
export type {
  BreadcrumbSeparatorProp,
  BreadcrumbSize,
  BreadcrumbItemData,
  BreadcrumbLinkRenderProps,
  BreadcrumbRenderLink,
} from "./components/molecules/Breadcrumb/Breadcrumb.types";

// ButtonGroup: new value + new types
export { useButtonGroupContext } from "./components/molecules/ButtonGroup";
export type { ButtonGroupSize, ButtonGroupVariant } from "./components/molecules/ButtonGroup/ButtonGroup.types";
```
Mirror these in the matching `src/entries/*` file if Breadcrumb/ButtonGroup are re-exported there. No other new exports: Badge, DatePicker, Accordion, AppSidebar and Calendar have no API additions.

## Acceptance criteria
- The 156 Slice R tests pass. tsc prints nothing for the touched paths.
- PageHeader's existing Breadcrumb test still passes unedited (verified: 15/15).
- No legacy names (`AppShell`, `TextInput`, `Tooltip`-for-ToolTip, Card `variant="outlined|filled"`) in new code. Verified with grep. DatePicker's own `variant="outlined"` prop for Calendar is pre-existing Calendar API.
- Breadcrumb: "Show N more" is reachable by keyboard, focus moves after expanding, collapse happens at ≤640px, `javascript:` hrefs never render as links.
- ButtonGroup: child props win over group props. `attached` defaults true, so existing visuals are unchanged.

## Open questions
1. **Button reading ButtonGroup context (optional, Button is not a Slice R file).** Cloning covers direct `<Button>` children only. Buttons wrapped in another component (e.g. inside a ToolTip) do not get the cascade. Exact patch for `src/components/atoms/Button/index.tsx`, if the owner wants it:
   ```ts
   import { useButtonGroupContext } from "../../molecules/ButtonGroup";
   // inside ButtonImpl, before destructured defaults are used:
   const group = useButtonGroupContext();
   const resolvedVariant = props.variant ?? group?.variant ?? "primary";
   const resolvedSize = props.size ?? group?.size ?? "lg";
   const resolvedDisabled = props.disabled ?? group?.disabled ?? false;
   ```
   Caveat: this creates an atoms → molecules import (ButtonGroup already imports Button, so the import is circular). The cleaner fix is to move the context to `src/components/common/buttonGroupContext.ts`. This needs an orchestrator decision; until then, cloning is the supported path.
2. AppSidebar mobile drawer: Escape/scrim close does not return focus to the trigger and focus is not trapped. This is pre-existing and was out of "minimal diff" scope; it is the same class as the Sprint 1 Drawer P3. Suggested P3.
3. Calendar weekday headers are plain divs, not a `role="grid"` table. Day buttons carry full-date names, so this is usable. A full APG grid refactor would need a separate brief.
4. Portal `dashboardData.test.ts` failures (2) come from other slices. Orchestrator: run `npm run portal:stats` and add the new stories to the gallery after wiring.
