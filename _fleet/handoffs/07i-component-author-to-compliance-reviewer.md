# Handoff: component-author (agent I) -> compliance-reviewer

- **Task:** Sprint 3 Slice I — `Kbd` atom (`src/components/atoms/Kbd/`) + `CommandPalette` molecule (`src/components/molecules/CommandPalette/`)
- **Status:** ready

## Objective
Verify `Kbd` and `CommandPalette` against `_fleet/QUALITY_CHECKLIST.md` A/B/C and the Slice I spec in `_fleet/handoffs/07-orchestrator-sprint3-brief.md`, then issue a PASS/FAIL verdict with file:line evidence.

## Output format
Use the standard compliance verdict format: for each dimension A, B and C give PASS or FAIL, and back every finding with `file:line` or a command and its output. Append it to the Sprint 3 verdict file the orchestrator names (e.g. `_fleet/VERDICT-sprint3.md`). Report a defect only when it breaks correctness or a stated requirement. Label anything else as optional.

## Sources and tools
- Spec: `_fleet/handoffs/07-orchestrator-sprint3-brief.md` (Slice I). Conventions: `_fleet/handoffs/05-orchestrator-sprint1-brief.md`.
- Shared infra reused, not modified: `src/components/molecules/Modal/overlayStack.ts`, `src/components/molecules/Modal/bodyScrollLock.ts`, `src/components/molecules/Drawer/Drawer.utils.ts` (`trapTabKey`). The focus-guard approach is copied from `src/components/molecules/Drawer/index.tsx:114-143`.
- Tokens: `src/design-system/tokens.css` (classic `:root` ~L319, dark ~L469, mist ~L588, blue-mist ~L612, green-mist ~L651).
- Commands:
  - `npx vitest run src/components/molecules/CommandPalette src/components/atoms/Kbd` gives 56 tests in 3 files.
  - `npx vitest run` runs the full suite.
  - `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "CommandPalette|atoms/Kbd"` prints nothing. tsconfig excludes tests and stories, so I also strict-checked them on their own. That check was clean.
- Storybook:
  - `Design System/Atoms/Kbd`: Playground, Platforms, Sizes, SingleKey, Combos.
  - `Design System/Molecules/CommandPalette`: Playground, WithRecent, RemoteSearch, Loading, EmptyState, CustomHotkey, HotkeyInInputs.

## Boundaries
- I did not edit `src/index.tsx`, `src/entries/*`, `src/portal/`, `.storybook/`, `package.json` or `dist/`. The orchestrator wires the exports listed below.
- I did not modify any shared infra (Modal, Drawer, Spinner, Button). The palette imports them by relative path.
- Slices G (DateRangePicker/NumberInput) and H (SegmentedControl/Wizard) are reviewed from their own handoffs. **Note:** at handoff, the full suite has 3 failures, all in `src/components/molecules/DateRangePicker/DateRangePicker.test.tsx`. That is Slice G's in-progress directory, untracked. The failures reproduce when that file runs alone (`npx vitest run src/components/molecules/DateRangePicker` gives 3 failed / 30 passed), so they are not caused by this slice.
- Stop after the verdict and route fixes back to component-author.

## Context digest
- **Kbd API:** `keys?: string[]`, `children` (used when `keys` is absent), `separator` (default `"+"`, decorative, `""` hides it), `size` sm|md, `platform` auto|mac|other. Structure: an outer `<kbd>` containing one nested `<kbd>` per key, which follows the HTML spec for combos. A glyph (⌘ ⇧ ⌥ ↵ ↑) is `aria-hidden` and paired with visually hidden spoken text such as "Command" (`atoms/Kbd/index.tsx:58-69`).
- **SSR-safe platform detection:** `useSyncExternalStore(noop, detectIsMac, () => false)` (`Kbd.utils.ts:23`). The server render and the hydration render both show Ctrl, then the client corrects to ⌘. A test covers this with `renderToString` (`Kbd.test.tsx` "is SSR-safe").
- **Exported helpers:** `formatShortcut`, `toAriaKeyShortcuts` and `resolveKey` are exported for consumers.
- **Palette open state:** controlled `open`/`onOpenChange`, or uncontrolled `defaultOpen` plus the hotkey. The search query, the active option and remote results reset whenever the palette closes.
- **Hotkey** (`CommandPalette/index.tsx:239-260`):
  - The document keydown listener is registered only inside an effect, and line 241 guards on `typeof document`, so it is SSR-safe.
  - The platform is read at event time. `matchesHotkey` requires exactly the listed modifiers (`mod` = Meta on Mac, Ctrl elsewhere) and falls back to `event.code` for Option-altered characters.
  - When focus is in an editable field (`isEditableTarget`: text inputs, textarea, select, contenteditable), the hotkey is ignored unless `allowInInputs` is set. The palette's own input is exempt, so ⌘K toggles the palette closed.
  - A hotkey close only happens when the palette is the top layer.
- **Combobox:**
  - The input has `role="combobox"`, `aria-controls` pointing to the listbox, `aria-expanded` set to whether any options exist, and `aria-autocomplete="list"`.
  - The listbox contains `role="group"` elements labelled by their heading, with `role="option"` items.
  - **The active option is derived, not stored** (`index.tsx:206-210`): it is the first enabled option matching `activeKey`, falling back to the first enabled option. So `aria-activedescendant` always names a mounted, enabled option, and is absent when there are none.
  - Only the active option has `aria-selected="true"`. Disabled options have `aria-disabled` and are skipped by arrow keys and clicks.
  - ArrowUp/Down wrap. Home/End (without modifiers) jump. Enter selects. Hover moves the highlight, and `mousedown` is prevented so focus stays in the input.
  - With zero options the listbox gets `hidden`, so the `aria-controls` IDREF still resolves.
- **Announcements** (`index.tsx:221-238`):
  - One `role="status"` / `aria-live="polite"` / `aria-atomic` region lives inside the dialog.
  - The text is set `announceDelayMs` (500) after the last keystroke, because the timer restarts on every query change. Typing "o", "op", "open" produces one announcement, "1 result".
  - Nothing is announced on open with an empty query.
  - While loading, the region says "Loading results…".
- **onSelect ordering:** with `closeOnSelect` (the default), the item is parked in a ref and the palette closes. `onSelect(item)` then runs from an effect in the same commit, after the cleanups have popped the layer and restored focus (`index.tsx:335-341`). As a result a command that opens a Modal or moves focus is not overridden. The return-focus cleanup only restores focus when focus was lost to the body or was inside the panel (`index.tsx:305-313`). Tests: "Enter selects … then runs onSelect" and "onSelect may move focus elsewhere".
- **Remote search:** `onSearch(query, { signal })` is debounced by `searchDebounceMs` (200). It may return groups (synchronously or as a Promise), which are appended after the local results without re-ranking and with key prefix `remote:`. Superseded calls are aborted and their late responses ignored. A rejection clears the remote results. The `loading` prop is OR-ed with the internal pending state, which sets `aria-busy` on the listbox and shows a decorative Spinner row.
- **Ranking** (`CommandPalette.utils.ts`, config weights in `CommandPalette.config.ts`):
  - Text is normalised by stripping diacritics and lowercasing.
  - Every token must match. For each token the best field match counts.
  - Tiers: label prefix 100 > label word-start 70 > keyword exact 60 > keyword prefix 50 > label substring 40 > keyword substring 20 > description 15/8. An exact label match gets +120.
  - Items sort by score with stable ties, and groups sort by their best item. The `recent` group is shown only while the query is empty.
- **Overlay infrastructure:**
  - Portal to body.
  - `pushLayer`/`popLayer` with the parent read from `OverlayLayerContext` (`:265`). The palette's subtree provides its own layer id.
  - Escape and backdrop clicks are handled only when `isTopLayer` (`:323-331`).
  - Ownership focus guard: `onFocusCapture` marking (`:408`) plus a document `focusin` check (`:270-296`), the same as Drawer, including the `[data-overlay-allow]` opt-in.
  - Tab trap via `trapTabKey` (`:429`). Shared scroll lock (`:315-319`).
  - Escape effect is declared after the layer and guard effects, so cleanup order matches Drawer.

## Self-check (QUALITY_CHECKLIST A / B / C), with file:line evidence
**A Accessibility**
- **A1 Keyboard:**
  - Hotkey `index.tsx:239-260`; input keys `index.tsx:367-397`; Escape `index.tsx:323-331`; Tab trap `index.tsx:429`.
  - Tests: "ArrowDown/Up wrap and skip disabled; Home/End jump", "Tab stays inside the dialog", "Escape closes and restores focus".
- **A2 Targets:**
  - Options have `min-height: 2.75rem` (44px) (`CommandPalette.css:156`).
  - The close button is 40px (`--space-5`) on fine pointers and 2.75rem on coarse pointers and at ≤480px (`CommandPalette.css:257-283`). This is the same accepted precedent as Drawer.
  - The input row is `min-height: var(--space-7)` (56px).
- **A3 Focus:**
  - All rings use `--color-focus-ring` directly. Panel: `CommandPalette.css:45`. Search row, via `:has(input:focus-visible)` with a `@supports` fallback to `:focus-within`: `:60-69`. Close button: `:124`.
  - The active option draws a 2px focus-ring outline at `:165-170`. This is the visual focus indicator, because DOM focus stays in the input.
- **A4 Contrast:** computed with the WCAG relative-luminance formula from tokens.css values. The active background is `color-mix(text-primary 8%, surface)`.

| Pair | classic | dark | mist |
|---|---|---|---|
| Option label (`--color-text-primary`) / surface | 19.44 | 13.34 | 18.62 |
| Option label / active background (#ececec · #303946 · #e7e7e7) | 16.45 | 10.60 | 15.72 |
| Description, group label, placeholder, footer (`--color-text-secondary`) / surface | 6.48 | 6.71 | 6.21 |
| Description / active background | 5.49 | 5.33 | 5.24 |
| Focus ring (active option outline) / active background | 4.71 | 4.59 | 4.50 |
| Focus ring / surface | 5.57 | 5.77 | 5.33 |
| Kbd text (`--color-text-secondary`) / Kbd fill (`--color-fill-muted`) | 5.95 | 4.71 | 4.91 |
| Kbd border (`--color-border-default`) / Kbd fill (decorative; the text carries meaning) | 3.17 | 2.37 | 2.62 |

  Focus ring against the active background in the other themes: green 16.45, blue-mist 4.61, green-mist 4.33. All text pairs are at least 4.5:1, and all focus-indicator pairs are at least 3:1.
- **A5 Labels:**
  - The input has `aria-label={inputLabel}` (default "Search commands").
  - The dialog has `aria-label` (default "Command palette"), the listbox has `aria-label` (default "Commands"), and the close button has `aria-label` (default "Close").
- **A7 Overlay:**
  - `role="dialog"` with `aria-modal`. Initial focus goes to the input and focus is restored on close (`index.tsx:299-314`).
  - Shared overlay stack (test "one Escape closes only the top layer" with a stacked Modal). Focus guard (test "pulls focus back …").
- **A8 Feedback:** polite, debounced count. Test "announces the result count once after typing settles" uses fake timers and asserts silence mid-typing.
- **A9 Motion:** `prefers-reduced-motion` disables the enter animations (`CommandPalette.css:293-302`).
- **A10 Semantics:**
  - Options carry `aria-keyshortcuts` from `shortcut` (in the visible-hint sense). The Kbd chip inside an option and the footer hints are `aria-hidden`.
  - Kbd glyphs have spoken names (`Kbd/index.tsx:61-62`).
  - Forced colors: active option uses Highlight/HighlightText (`CommandPalette.css:304-326`); Kbd keys use CanvasText borders (`Kbd.css:57-63`).

**B Security**
- No `dangerouslySetInnerHTML`, `eval`, `new Function`, inline-string handlers, hex literals or `ui-common-hooks` imports in either directory (grep was empty).
- Labels, descriptions and `emptyState` render as React children.
- **B3:** focus stays trapped (Tab trap plus ownership guard). The backdrop prevents `mousedown`, so a click outside cannot move focus out.
- No timers leak: the search, announcement and abort timers are cleared in effect cleanups.

**C Responsiveness**
- Panel is `width: min(40rem, 100%)` with `min-width: 0`. Labels and descriptions truncate with an ellipsis.
- At ≤480px the panel is full-screen (`100dvh`, no radius), the footer hints are hidden and the body pads for the bottom safe area (`CommandPalette.css:265-291`).
- Dark, mist and the other themes are covered by the token table above.
- Reduced motion: see A9.

## Failed approaches
- At first the announcement debounce keyed only on the message text. "op" then "open" both produce "1 result", so the timer was not restarted and the announcement fired mid-typing. Fixed by adding `query` to the effect deps (`index.tsx:234-237`).
- I considered calling `onSelect` synchronously before closing. That fails: a command that moves focus, or opens a Modal outside the palette's tree, is pulled back by the still-active focus guard, and the later return-focus cleanup then overrides it. The deferred effect (see Context digest) fixes both.
- `box-shadow: inset` for the search-row focus ring was replaced with `outline` to stay within the no-hardcoded-shadow rule.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/atoms/Kbd/Kbd.types.ts | `KbdProps`, `KbdSize`, `KbdPlatform`, `KbdKeyLabel` | final |
| src/components/atoms/Kbd/Kbd.config.ts | defaults, sizes, key map (glyph / spoken name / aria token per platform) | final |
| src/components/atoms/Kbd/Kbd.utils.ts | `detectIsMac`, `useIsMac` (SSR-safe), `resolveKey`, `formatShortcut`, `toAriaKeyShortcuts` | final |
| src/components/atoms/Kbd/index.tsx | `Kbd` (forwardRef, displayName), re-exports utils and types | final |
| src/components/atoms/Kbd/Kbd.css | token-only chip, sr-only spoken text, forced-colors | final |
| src/components/atoms/Kbd/Kbd.stories.tsx | Playground, Platforms, Sizes, SingleKey, Combos | final |
| src/components/atoms/Kbd/Kbd.test.tsx | 11 tests (render, platform, SSR, utils) | final |
| src/components/molecules/CommandPalette/CommandPalette.types.ts | `CommandPaletteProps`, `CommandGroup`, `CommandItem`, `CommandOption`, `RankedGroup`, `CommandSearchContext` | final |
| src/components/molecules/CommandPalette/CommandPalette.config.ts | defaults, `defaultResultsLabel`, ranking weights | final |
| src/components/molecules/CommandPalette/CommandPalette.utils.ts | normalize, tokenize, `scoreItem`, `rankGroups`, `listGroups`, `flattenOptions`, `toDomId`, `isEditableTarget`, `matchesHotkey` | final |
| src/components/molecules/CommandPalette/CommandPalette.utils.test.ts | 19 unit tests (tiers, keywords, tokens, diacritics, ordering, hotkey, editable) | final |
| src/components/molecules/CommandPalette/index.tsx | `CommandPalette` (forwardRef to dialog, displayName) | final |
| src/components/molecules/CommandPalette/CommandPalette.css | token-only styles; ≤480px full-screen; reduced-motion; forced-colors | final |
| src/components/molecules/CommandPalette/CommandPalette.stories.tsx | Playground, WithRecent, RemoteSearch, Loading, EmptyState, CustomHotkey, HotkeyInInputs | final |
| src/components/molecules/CommandPalette/CommandPalette.test.tsx | 26 tests (semantics, keyboard, mouse, hotkey, announcements, remote search, stacking, focus guard) | final |

## Barrel exports needed
Add to `src/index.tsx` (orchestrator):
```ts
export { default as Kbd, formatShortcut, toAriaKeyShortcuts, detectIsMac } from "./components/atoms/Kbd";
export type { KbdProps, KbdSize, KbdPlatform, KbdKeyLabel } from "./components/atoms/Kbd";
export { default as CommandPalette } from "./components/molecules/CommandPalette";
export type {
  CommandPaletteProps,
  CommandGroup,
  CommandItem,
  CommandSearchContext,
} from "./components/molecules/CommandPalette";
```
Optional, if consumers want the ranking: `export { scoreItem as scoreCommand, rankGroups as rankCommandGroups } from "./components/molecules/CommandPalette";`. The names are aliased to avoid generic top-level names.

## Acceptance criteria
- `npx vitest run src/components/molecules/CommandPalette src/components/atoms/Kbd` passes 56/56 (verified).
- Full `npx vitest run` at handoff: 593 passed / 3 failed. All 3 failures are in Slice G's `DateRangePicker.test.tsx` and also fail in isolation. Excluding that file, everything is green. The previous baseline was 474, and this slice adds 56.
- `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "CommandPalette|atoms/Kbd"` prints nothing (verified).
- No legacy aliases in new code. Every test file's `afterEach` asserts that the overlay stack is empty.

## Open questions
- Home/End move the highlight, per the spec, rather than the text caret, which differs from the APG editable-combobox default. Shift+Home/End still select text. Please confirm this is acceptable.
- Nothing is announced on open with an empty query; the dialog and combobox names are announced instead. Should the initial count be announced as well?
- Not verified in a real browser (jsdom only): `:has()` focus ring rendering, the 480px full-screen layout and `scrollIntoView` of the active option. Please check the Playground at 375, 768 and 1440 px, and in dark and forced-colors modes.
- If two palettes are mounted with the same hotkey, both toggle. This is documented as the consumer's responsibility.
