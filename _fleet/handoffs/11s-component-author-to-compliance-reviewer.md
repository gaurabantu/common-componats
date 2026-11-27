# Handoff: component-author (Slice S) -> compliance-reviewer

- **Task:** Sprint 6 Slice S: new Menu (DropdownMenu), AvatarGroup, Rating, Timeline; delete the empty `atoms/Dropdown/` directory
- **Status:** ready (barrel wiring by orchestrator pending, plus a portal stats regen; see Open questions)

## Objective
Review the four new Slice S components against `_fleet/QUALITY_CHECKLIST.md` A/B/C and the Sprint 6 brief (Slice S). Return PASS/FAIL per dimension per component, with file:line evidence for every failure.

## Output format
Use the Slice S section of `_fleet/VERDICT-sprint6.md` in the checklist's "Verdict format": `## Accessibility / Security / Responsiveness: PASS|FAIL` per component (Menu, AvatarGroup, Rating, Timeline). Then give a ranked fix list tagged `[component-author]` that cites file:line.

## Sources and tools
- Brief: `_fleet/handoffs/11-orchestrator-sprint6-brief.md` (Slice S) and `_fleet/handoffs/05-orchestrator-sprint1-brief.md` (conventions).
- Code: `src/components/molecules/Menu/`, `src/components/molecules/Timeline/`, `src/components/atoms/AvatarGroup/`, `src/components/atoms/Rating/`.
- Tests: `npx vitest run src/components/molecules/Menu src/components/molecules/Timeline src/components/atoms/Rating src/components/atoms/AvatarGroup` should give 4 files and 72 tests passing.
- Typecheck: `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "molecules/(Menu|Timeline)|atoms/(Rating|AvatarGroup)"` should print nothing.
- Contrast: I computed the numbers from `src/design-system/tokens.css` with a var() resolver (WCAG relative luminance). The table is below; re-derive any pair you doubt.
- Storybook: `Design System/Molecules/Menu`, `.../Molecules/Timeline`, `.../Atoms/Rating`, `.../Atoms/AvatarGroup`. Check at 375/768/1440 and in light/dark/infinia themes.

## Boundaries
- Do not edit `src/index.tsx`, `src/entries/*`, `package.json` or `dist/`, and do not run `npm run build`.
- Out of scope: the existing Popover-based `DropdownMenu*` family in `molecules/Popover` (unchanged); the Avatar atom itself (unchanged; AvatarGroup only wraps it); `src/portal/**`.
- I touched no shared utilities. Menu imports `Popover/popoverPosition`, `Popover/layering`, `Popover/slot` and `Tooltip/tooltipPosition` read-only.
- Stop at the verdict. Fixes go back to component-author.

## Context digest
- **Name collision:** the barrel already exports `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, … from `molecules/Popover` (Popover-based, no submenus). For backward compatibility, the new APG Menu exports `Menu*` names in the barrel. The `DropdownMenu*` aliases (incl. `DropdownMenuSub*`) are exported only from `molecules/Menu/index.tsx:885-899` and are reachable by deep import. The two families use different contexts and must not be mixed.
- **Menu:** standalone implementation, not a Popover wrapper, because APG needs roving focus (items `tabIndex=-1`), Tab-closes, multi-char typeahead and submenus. Items are `div role=menuitem*`. With `href` they become `<a role=menuitem>`, and the href goes through `isSafeHref`. Enter/Space trigger `.click()`, so the pointer and keyboard paths are the same. Hovering a row moves focus to it, so the hover highlight and the focus highlight are the same style (`:focus` background plus a `:focus-visible` ring). Submenus open on hover after 100 ms or on ArrowRight/Enter/Space, and close on ArrowLeft/Escape (focus goes back to the sub trigger). Escape uses the shared floating-layer stack in capture phase, so one press closes one level and a host Modal ignores the handled Escape.
- **Positioning:** the root menu uses `computePopoverPosition` (vertical flip, horizontal clamp, maxHeight). Submenus use `computeTooltipPosition(…, "right", "start")`, which flips to the left.
- **Rating:** built on native radios, which give one Tab stop, arrow-key selection and form submission via `name`. With `precision=0.5` there are two radios per star and half-width label hit areas. `readOnly` renders `role="img"` with an "N out of M stars" name.
- **AvatarGroup:** wraps `atoms/Avatar` and forces `status="none"` unless an item sets one (Avatar defaults to "online"). The "+N" chip is a Popover trigger whose name lists the hidden names ("Show 3 more: A, B, C", capped at 10 names plus "and N others"). It becomes a plain button when `onOverflowClick` is set. When only a server-side `total` is known, it is a non-interactive `role="img"`. `max` excludes the chip.
- **Timeline:** `<ol>` of `<li>`. `<time dateTime>` takes ISO for Date/number input, and a string input is used as-is. Non-neutral tones add a visually hidden status word, and pending adds "Pending". Horizontal timelines get a `role=region tabIndex=0` scroll wrapper. All horizontal/alternate CSS sits inside `@media (min-width: 641px)`, so 640 px and below always get the single-column rail. `align="alternate"` applies to vertical only; horizontal ignores it (documented).
- `src/components/atoms/Dropdown/` was an empty, untracked directory. It is removed (`rmdir`), and nothing referenced it.

### Self-check evidence (A / B / C)
**Menu** (`molecules/Menu/index.tsx`, `Menu.css`)
- A1 keyboard: trigger Enter/Space/ArrowDown/ArrowUp `index.tsx:198-210`. Arrow/Home/End/PageUp/PageDown/Tab/ArrowLeft/typeahead `index.tsx:345-407`. Sub ArrowRight `index.tsx:817`. Roving `tabIndex:-1` `index.tsx:535`.
- A3 focus ring: `Menu.css:25` (trigger), `:56` (panel), `:100` (row, `--color-focus-ring`).
- A2/C5 targets: rows are 36 px on fine pointers and 44 px on `(pointer: coarse)` (`Menu.css:84`). The trigger is 44 px on coarse pointers.
- A7: trigger `aria-haspopup="menu"`, `aria-expanded`, `aria-controls` `index.tsx:191-193`. Sub trigger equivalents `index.tsx:538-540`. Menu `aria-labelledby` trigger. Focus returns via `close()` (`index.tsx:143-149`) plus a rAF fallback (`index.tsx:152-167`).
- A10: icons, indicators and Kbd shortcut wrappers are `aria-hidden`. `aria-keyshortcuts` `index.tsx:541`.
- A4 contrast (bg-elevated): text-primary 19.44 (classic) / 13.34 (dark). text-secondary 6.48 / 6.71. Danger row 7.14 / 7.73, and on focus (danger-fill) 6.16 / 5.74. Hover row text-secondary on state-hover-bg ≥ 5.47 (light themes) / 5.55 (dark). Focus ring ≥ 5.13 in every theme.
- A9/C6: `Menu.css:211` reduced motion, `:222` forced colors (Highlight/HighlightText).
- B1: no `dangerouslySetInnerHTML`/`innerHTML`. Unsafe `href` is dropped (`index.tsx:528`), and `_blank` adds `noopener noreferrer`. B3: outside mousedown closes (`index.tsx:323-335`), Escape closes (`index.tsx:310-320`). Menus are non-modal by APG design, so there is no focus trap; Tab closes the menu instead.
- C1: panel `max-width: min(20rem, 100vw - 16px)` (`Menu.css:40`), plus viewport clamp/flip and maxHeight with overflow scroll.

**Timeline** (`molecules/Timeline/index.tsx`, `Timeline.css`)
- A1/A3: horizontal scroll region is focusable (`index.tsx:127-129`), with ring at `Timeline.css:26`. Vertical has no focusable parts.
- A4: status is never colour-only; hidden word at `index.tsx:74`. Dot vs surface ≥ 3:1: text-secondary 6.21-6.71, success 6.70-7.64, warning 6.55-8.79, danger 6.84-7.73, info 6.81-8.14. Primary uses `--color-state-selected-text`, 6.29-12.28 in all 9 themes (`Timeline.css:105-107`); it avoids theme-primary, which is 1.43:1 on Infinia. Time/description text-secondary on surface ≥ 6.21, on bg-page ≥ 4.91.
- A10: marker and icon `aria-hidden` (`index.tsx:63`). Semantics: `<ol>` plus `<time dateTime>` (`index.tsx:68`).
- A9/C6: pending pulse disabled under reduced motion (`Timeline.css:245`). Forced colors at `Timeline.css:251`.
- C1/C3: horizontal and alternate layouts only apply at ≥ 641 px (`Timeline.css:186`); otherwise single column. `overflow-wrap:anywhere` on text.
- B1: text only (test "renders user text as text").

**Rating** (`atoms/Rating/index.tsx`, `Rating.css`)
- A1/A5: native `type="radio"` with shared `name` (`index.tsx:130-131`), named `radiogroup` (`index.tsx:107-108`), and per-radio `aria-label` from `getLabelText` (`index.tsx:136`). Disabled state at `index.tsx:109,134`. readOnly: `role="img"` "4 out of 5 stars" (`index.tsx:85-86`).
- A3: `Rating.css:96` ring on the hit area of the focused radio. Forced-colors Highlight at `:139`.
- A4 (1.4.11): filled star outline is `--color-warning-strong` at 6.55-6.84 (light), 8.79 (dark), 7.52 (infinia-light). Empty outline is `--color-border-interactive` at 4.41-6.10. The amber fill is decoration (1.31-1.37 on light); the outline carries the contrast.
- A2/C5: star sizes are sm 20 / md 28 / lg 36 px (`Rating.css:18-20`). See Open questions on half-precision targets.
- A9/C6: `Rating.css:115` reduced motion, `:125` forced colors (filled = Highlight, empty = Canvas, both outlined CanvasText).
- B: uses no innerHTML. The form value goes through native radios.

**AvatarGroup** (`atoms/AvatarGroup/index.tsx`, `AvatarGroup.css`)
- A10/A5: `role="group"` plus a label, default "N people" (`index.tsx:69-71,135-136`). Each named avatar is `role="img" aria-label=name` (`index.tsx:143`). Unnamed avatars are `aria-hidden`.
- A7/B3: the chip is a `PopoverTrigger` (`aria-haspopup="dialog"`, `aria-expanded`) whose name lists the hidden names (`index.tsx:102`). The dialog is labelled "N more people" (`index.tsx:107`). Popover provides Escape, outside click and focus return. The list is `tabIndex=0`, so focus moves into the dialog.
- A3: `AvatarGroup.css:71` (chip), `:93` (list).
- A2: chip is `min-width/height: max(size, 1.5rem)` (`AvatarGroup.css:49`), at least 24 px even for xs. The md default is 40 px.
- A4: chip text-primary on fill-muted 17.83 (classic) / 9.37 (dark).
- C: `nowrap` inline-flex with `max-width:100%`. Seven avatars at md take about 220 px, which fits 375.

## Failed approaches
- First AvatarGroup draft rendered an `aria-disabled` button when only `total` was known. That is a control that does nothing, so it was replaced with a non-interactive `role="img"` chip (`index.tsx:87-99`).
- First Timeline draft used `--color-theme-primary` for the primary dot. That is 1.43:1 on infinia-light, so it was switched to `--color-state-selected-text`.
- I chose not to build Menu on `PopoverContent`. Its focus effect targets the first tabbable element, it puts items in the tab order, and it has no submenu or typeahead hooks, so wrapping it would have meant fighting it.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/molecules/Menu/Menu.types.ts | Public prop types | final |
| src/components/molecules/Menu/Menu.config.ts | Defaults, placements, delays | final |
| src/components/molecules/Menu/Menu.utils.ts | Item query, typeahead | final |
| src/components/molecules/Menu/index.tsx | Menu, MenuTrigger, MenuContent, MenuItem, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem, MenuGroup, MenuLabel, MenuSeparator, MenuSub, MenuSubTrigger, MenuSubContent + DropdownMenu* aliases | final |
| src/components/molecules/Menu/Menu.css | Styles | final |
| src/components/molecules/Menu/Menu.stories.tsx | Playground, CheckboxAndRadio, LinksAndGroups, EdgeFlip | final |
| src/components/molecules/Menu/Menu.test.tsx | 32 tests | final |
| src/components/molecules/Timeline/{Timeline.types.ts,Timeline.config.ts,index.tsx,Timeline.css,Timeline.stories.tsx,Timeline.test.tsx} | Timeline + TimelineItem (11 tests) | final |
| src/components/atoms/Rating/{Rating.types.ts,Rating.config.ts,index.tsx,Rating.css,Rating.stories.tsx,Rating.test.tsx} | Rating (16 tests) | final |
| src/components/atoms/AvatarGroup/{AvatarGroup.types.ts,AvatarGroup.config.ts,index.tsx,AvatarGroup.css,AvatarGroup.stories.tsx,AvatarGroup.test.tsx} | AvatarGroup (13 tests) | final |
| src/components/atoms/Dropdown/ | Empty dir, deleted | final |

## Barrel exports needed
Add to `src/index.tsx`. Do **not** re-export the `DropdownMenu*` aliases from Menu: those names are already exported from `./components/molecules/Popover`.
```ts
export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuGroup,
  MenuLabel,
  MenuSeparator,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
} from "./components/molecules/Menu";
export { default as AvatarGroup } from "./components/atoms/AvatarGroup";
export { default as Rating } from "./components/atoms/Rating";
export { Timeline, TimelineItem } from "./components/molecules/Timeline";

export type {
  MenuProps,
  MenuTriggerProps,
  MenuContentProps,
  MenuItemProps,
  MenuItemVariant,
  MenuCheckboxItemProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuGroupProps,
  MenuLabelProps,
  MenuSeparatorProps,
  MenuSubProps,
  MenuSubTriggerProps,
  MenuSubContentProps,
  MenuPlacement,
  MenuSelectEvent,
  MenuFocusIntent,
} from "./components/molecules/Menu";
export type { AvatarGroupProps, AvatarGroupItem, AvatarGroupSize, AvatarGroupSpacing } from "./components/atoms/AvatarGroup";
export type { RatingProps, RatingSize, RatingPrecision } from "./components/atoms/Rating";
export type {
  TimelineProps,
  TimelineItemProps,
  TimelineItemData,
  TimelineOrientation,
  TimelineAlign,
  TimelineStatus,
  TimelineSize,
} from "./components/molecules/Timeline";
```

## Acceptance criteria
- All four component dirs follow the canonical pattern (types, config, index, css, stories, test); Menu also has a `.utils.ts`.
- `npx vitest run` on the four dirs gives 72/72 passing. The full `npx vitest run` gave 1943/1945 at 2026-11-27 10:3x. The 2 failures are `src/portal/components/dashboardData.test.ts` (portal-stats.json folder counts, and the gallery missing the new stories AvatarGroup/Rating/Menu/Timeline plus P/T's DashboardShell/FeedbackStates/TagInput/TimePicker). They are expected and are fixed by the orchestrator regenerating portal stats and the gallery, not by Slice S.
- tsc is clean for the slice paths.
- No hex in slice CSS, and no legacy aliases (`AppShell`, `Avatar` as an export name, `Tooltip` for ToolTip, `TextInput`, `variant="outlined"/"filled"`) in new code. AvatarGroup imports the internal `atoms/Avatar` module, whose public name is `Avtar`.
- Reviewer verifies keyboard flows in Storybook (Menu submenus, Rating arrows, AvatarGroup popover) and the 375 px layouts.

## Open questions
1. **Barrel naming:** should the barrel eventually swap `DropdownMenu*` to the new Menu (major-version change)? For now keep the Popover family; the orchestrator or user decides.
2. **Rating half-precision targets:** at `precision=0.5` each half-star hit area is half the icon width (md: 14 × 28 px, lg: 18 × 36 px). Adjacent half targets do not meet the 24 px spacing exception of WCAG 2.5.8. Keyboard is unaffected. Docs and story recommend `size="lg"` for half precision. Reviewer to accept or request a bigger `xl` size.
3. **Portal:** `src/portal/**` (gallery inventory and `portal-stats.json`) needs `npm run portal:stats` plus gallery entries for the new stories. These are orchestrator-owned files.
4. **Tooltip coupling:** Menu imports `molecules/Tooltip/tooltipPosition.ts` (and transitively `Tooltip.config.ts`). If Slice P moves those files during Tooltip consolidation, update the import at `molecules/Menu/index.tsx:27`.
5. AvatarGroup (atom) imports `molecules/Popover` for the overflow list. This is a layering inversion with the same precedent as other atoms importing shared utilities. I left it as-is rather than duplicating dismiss logic.

## Iteration 2 (2026-11-27, response to `_fleet/VERDICT-sprint6.md` Slice S, P1 item 1 and P2)

### Fix 1: Rating, WCAG 2.5.8 (P1)
- **Targets.** Half-width `<label data-part>` targets are gone. Each star now has exactly **one full-star pointer target**: `span.ds-rating__hit` with `aria-hidden` (`atoms/Rating/index.tsx:152-171`).
  - With `precision={0.5}`, the half comes from the pointer position: `stepFromPointer` (`index.tsx:104-113`) treats the inline-start half as `i - 0.5` and mirrors this in RTL.
  - On click, the target focuses and natively clicks the matching hidden radio (`index.tsx:162-170`). `onChange(value, ChangeEvent)` therefore behaves exactly like before.
  - Hover preview uses the same function (pointermove / mouseenter).
- **Keyboard and AT are unchanged.** The hidden radios remain (2 per star at 0.5 precision), with arrow keys, `name` form submission and per-radio labels as before.
- **Target sizes.**
  - md: 28×28 px. lg: 36×36 px. Both are at least 24 px.
  - sm: icons are 20 px with `gap: var(--space-0)` (4 px), so centres are 24 px apart and the spacing exception holds (`Rating.css:19`, previously a 2 px gap).
  - Coarse pointers: interactive ratings get 44 px stars (`@media (pointer: coarse)`, `Rating.css:95-99`), the same pattern as Menu and TimePicker. readOnly is excluded.
- **Focus ring.** It now sits on the whole star whose radio (whole or half) has keyboard focus (`Rating.css:102`, forced-colors `:145`).
- **Tests.** New `describe("WCAG 2.5.8 target size")` (`Rating.test.tsx:132+`) with 4 tests:
  - one target per star at 0.5 precision, with 6 radios kept;
  - pointer x picks 1.5 vs 2 and the hover fill shows "half";
  - disabled targets are inert;
  - a CSS assertion checks there are no `data-part`, the sm gap equals `--space-0`, and the coarse rule sets 2.75rem. The CSS is read from disk, because vitest stubs CSS imports, `?raw` included.
- Rating now has 20 tests, up from 16.

### Fix 2: AvatarGroup stories (P2)
- `meta.args.onOverflowClick: undefined` plus `argTypes.onOverflowClick: { control: false }` (`AvatarGroup.stories.tsx:36-41`).
  - Why this works: the actions addon's `inferActionsFromArgTypesRegex` injects a spy only when the key is absent from `initialArgs` (`isInInitialArgs`, checked in `node_modules/@storybook/addon-actions/dist/index.mjs`). The explicit `undefined` key stops the injection.
  - As a result, Playground/Sizes/Spacing/Children now show the default popover. `WithOverflowHandler` still overrides it with a handler.
- `.storybook` is untouched.

### Gates
- Slice dirs: 4 files, **76/76** tests passing. tsc is clean for the slice paths.
- Full `npx vitest run`: **1963/1964**. The 1 failure is `dashboardData.test.ts` › "ends at the current package version" (`0.0.7` vs `0.0.10`). That is VERDICT P1 fix 2 (orchestrator/release owner, `src/portal/data.ts`); Slice S does not own it.
- No files touched outside `atoms/Rating/**` and `atoms/AvatarGroup/AvatarGroup.stories.tsx`. `atoms/DatePicker/**` is untouched.
