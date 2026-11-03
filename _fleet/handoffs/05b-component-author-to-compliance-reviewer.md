# Handoff: component-author (Sprint 1, agent B) -> compliance-reviewer

- **Task:** New `Drawer` molecule (plus `Sheet` alias) and a backward-compatible `Modal` upgrade (description, initialFocusRef, scrollBehavior, fullscreenOnMobile, confirmLoading, onOpenAutoFocus/onCloseAutoFocus, `@deprecated` colour props)
- **Status:** ready

## Objective
Verify that `src/components/molecules/Drawer/` and the upgraded `src/components/molecules/Modal/` pass `_fleet/QUALITY_CHECKLIST.md` sections A (WCAG 2.2 AA), B (Security), and C (Responsiveness), and that the Modal stays backward compatible. Then return a verdict.

## Output format
Write `_fleet/VERDICT-sprint1-05b.md`, or append a section to the sprint verdict if the orchestrator says so. Give one PASS/FAIL per dimension (A, B, C). Every failure needs `file:line`, the rule it breaks, and a repro command. Label optional or style notes as such. Do not report them as defects.

## Sources and tools
- Code: `src/components/molecules/Drawer/*`, `src/components/molecules/Modal/{index.tsx,Modal.types.ts,Modal.config.ts,Modal.css,Modal.test.tsx,Modal.stories.tsx}`.
- Tokens: `src/design-system/tokens.css`. The relevant themes are classic `:root` (around line 319), dark (around line 469), and mist / blue-mist / green-mist (around lines 586-693).
- Commands:
  - `npx vitest run src/components/molecules/Drawer src/components/molecules/Modal src/components/molecules/AlertDialog`
  - `npx vitest run` (full suite)
  - `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "molecules/(Modal|Drawer)"` (should print nothing)
- Storybook stories: "Design System/Molecules/Drawer" and "Design System/Molecules/Modal". Use the viewport toolbar presets Mobile 375, Tablet 768 and Desktop 1440, and the theme toolbar.
- Avoid `npm run build`, because it overwrites the tracked `dist/`.

## Boundaries
- In scope: the two directories above.
- Out of scope:
  - `src/index.tsx`. The orchestrator wires the exports; the exact lines are below.
  - The `src/portal/` tree, `.storybook/*` and the slices owned by agents A and C.
  - Theme-token fixes in `tokens.css`. The dark-theme focus-ring contrast is a known escalated item (see Open questions).
  - `AlertDialog`. It consumes Modal and was not changed, but its 2 tests were re-run and pass.
- Stop after the verdict. Do not edit component code. You are read-only.

## Context digest
- **Drawer reuses Modal's scroll lock.** `../Modal/bodyScrollLock.ts` provides a shared depth counter, so a Drawer and a Modal can be open together without either unlocking the body early. It uses no `ui-common-hooks`.
- **Focus trap is local and layout-free.** It lives in `Drawer.utils.ts`. Modal's existing trap filters on `offsetParent`, which is always null in jsdom, so it can't be unit-tested there. The Drawer trap skips `[hidden]`, `[inert]` and `[aria-hidden=true]` subtrees instead.
- **Drawer exit animation.** The panel stays mounted with `data-state="closed"` until `animationend` fires, with a fallback timer of 320ms. When the computed `animationName` is `none` (reduced motion, or jsdom), it unmounts immediately. As a result, reduced-motion users never see a frozen panel.
- **Extents.** Sizes live in `Drawer.config.ts` as rem values: widths for left/right, heights for top/bottom. They reach the CSS as `--ds-drawer-extent` and are capped with `min(…, 100vw / 100dvh)`. At 480px or narrower, left/right drawers are `width: 100vw`.
- **Body scroll region.** The body gets `tabIndex=0` only when it overflows (measured with ResizeObserver). This satisfies axe `scrollable-region-focusable` without adding a useless tab stop.
- **Escape.** It is handled by a document `keydown` listener that skips `e.defaultPrevented`, so a child such as a Combobox can consume Escape first. It works when `modal={false}` too.
- **Modal defaults keep the old behaviour.** `scrollBehavior` defaults to `"inside"`, set in `Modal.config.ts`. The new props are all optional and off by default. The deprecated colour props are still applied, and a test asserts this.
- **Behaviour change (a11y improvement).** Modal now returns focus to the previously focused element on close (A7). Before this change it did not. You can opt out per instance with `onCloseAutoFocus={(e) => e.preventDefault()}`.

## Failed approaches
- I tried setting a story-level `viewport.defaultViewport` on Modal `FullscreenOnMobile` and removed it. `.storybook/preview.tsx:101` warns against fixed default viewports in Docs. The viewport ids are `mobile375`, `tablet768` and `desktop1440`, not the Storybook defaults.
- A Modal `initialFocusRef` test without the ref would pass vacuously: in jsdom, Modal's trap finds no focusables and focuses the dialog itself. The test is discriminating because the ref target is an input, and the test asserts the input has focus.

## Self-check evidence (QUALITY_CHECKLIST A / B / C)
Line numbers are post-edit.

**A. Accessibility**
- **A1 keyboard:**
  - Tab trap: `Drawer/index.tsx:164` → `Drawer.utils.ts` `trapTabKey`.
  - Escape: `Drawer/index.tsx:137`.
  - Close is a native `<button type="button">`: `Drawer/index.tsx:209-216`.
  - Tests: "traps Tab and Shift+Tab", "Escape closes", and "does not trap focus when modal={false}".
- **A2 targets:** the close button is 2.5rem (40px) on fine pointers and 2.75rem (44px) on coarse pointers: `Drawer.css:157-158,181-186`. This passes WCAG 2.5.8 (24px) and follows the accepted token-chip precedent in `VERDICT-portal.md`.
- **A3 focus:** `:focus-visible` rings use `var(--color-focus-ring)` on the close button (`Drawer.css:176`), the body (`Drawer.css:200`) and the panel (`Drawer.css:46`). `outline:none` applies only under `:focus:not(:focus-visible)` (`Drawer.css:42`).
- **A4 contrast:** WCAG relative-luminance formula, computed from tokens.css hex values:

  | Theme | Pair | Ratio |
  |---|---|---|
  | Classic | text-primary #0d0d0d on surface #fff | 19.44 |
  | Classic | text-secondary #5e5e5e on #fff | 6.48 |
  | Classic | text-secondary on hover fill #f5f5f5 | 5.95 |
  | Classic | focus ring #0066cc on #fff | 5.57 |
  | Dark | primary #F3F4F6 on #1F2937 | 13.34 |
  | Dark | secondary #a8b0bb on #1F2937 | 6.71 |
  | Dark | secondary on hover fill #374151 | 4.71 |
  | Dark | **focus ring #0066cc on #1F2937** | **2.64 (FAIL 3:1, pre-existing token, escalated)** |
  | Mist | primary on #fafafa | 18.62 |
  | Mist | secondary on #fafafa | 6.21 |
  | Mist | secondary on fill-muted #e0e0e0 | 4.91 |
  | Blue-mist | focus #7c3aed on #fafafa | 5.46 |

  The mist themes inherit classic text-secondary. Their theme block does not override it.
- **A7 overlays:**
  - Drawer: `role="dialog"`, `aria-modal`, `aria-labelledby` and `aria-describedby` at `Drawer/index.tsx:184-187`. Focus returns on close at `Drawer/index.tsx:113-122`.
  - Modal: `aria-describedby` at `Modal/index.tsx:250`. Focus returns at `Modal/index.tsx:181-195`.
  - Background `inert` or `aria-hidden` is not applied, matching Modal. The panel relies on `aria-modal` plus the focus trap (see Open questions).
- **A9 motion:** `Drawer.css:238-249` sets `animation:none` under reduced motion, and the immediate unmount happens at `Drawer/index.tsx:89-101`. Modal's existing reduced-motion block is unchanged.
- **A10:** the close SVG is `aria-hidden` and `focusable="false"` (`Drawer/index.tsx:18`). The close button name comes from `closeLabel` (default "Close"). Modal confirm sets `aria-busy` while loading (`Modal/index.tsx:399`).
- **Forced colours:** the panel edge outline is at `Drawer.css:252-260`.

**B. Security**
- **B1:** grep for `dangerouslySetInnerHTML`, `innerHTML`, `eval(` and `new Function` across both directories exits 1 (no matches). The test "renders title text literally (no HTML parsing)" covers this.
- **No inline string handlers.** Drawer CSS contains no hex values (the grep exits 1).
- **Focus trap:** Drawer traps in modal mode. Modal's trap is unchanged.
- **Double submit:** `confirmLoading` blocks repeat confirms through `handleConfirm` at `Modal/index.tsx:211` and Button `loading` (disabled) at line 398. The test is "blocks (double) confirm".

**C. Responsiveness**
- **Drawer:** at 480px or narrower it goes full width (`Drawer.css:220-236`). Width uses `min(extent, 100vw)` at `Drawer.css:56`, and top/bottom heights are capped with `100dvh`.
- **Modal `fullscreenOnMobile`:** `Modal.css:37-60`.
- **Modal outside scroll:** the existing ≤480 `max-height` rule is now scoped with `:not(.modal--scroll-outside)` at `Modal.css:32`, so it no longer clips outside-scroll dialogs.
- **Footers:** both add a safe-area bottom inset.
- **z-index:** Drawer uses `var(--z-drawer)` (300) at `Drawer.css:6`, which sits below `--z-modal` (400). A Modal opened from inside a Drawer therefore stacks on top.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/molecules/Drawer/Drawer.types.ts | `DrawerProps`, `DrawerSide`, `DrawerSize`, `SheetProps` | final |
| src/components/molecules/Drawer/Drawer.config.ts | defaults, `DRAWER_WIDTHS` / `DRAWER_HEIGHTS` (rem), exit fallback | final |
| src/components/molecules/Drawer/Drawer.utils.ts | `getFocusable`, `trapTabKey` | final |
| src/components/molecules/Drawer/index.tsx | `Drawer` (forwardRef, displayName) + `Sheet` alias | final |
| src/components/molecules/Drawer/Drawer.css | `ds-drawer*` styles, tokens only | final |
| src/components/molecules/Drawer/Drawer.stories.tsx | Playground, Sides, Sizes, ScrollingBodyStickyFooter, NonModal, InitialFocus, Sheet (bottom) | final |
| src/components/molecules/Drawer/Drawer.test.tsx | 30 tests | final |
| src/components/molecules/Modal/Modal.types.ts | 6 new props, `ModalScrollBehavior`, `ModalAutoFocusEvent`, 6 `@deprecated` | final |
| src/components/molecules/Modal/Modal.config.ts | `scrollBehavior: "inside"` default | final |
| src/components/molecules/Modal/index.tsx | new props implemented; focus return; type re-exports | final |
| src/components/molecules/Modal/Modal.css | description, outside-scroll, fullscreen-on-mobile rules | final |
| src/components/molecules/Modal/Modal.test.tsx | 3 original + 13 new = 16 tests | final |
| src/components/molecules/Modal/Modal.stories.tsx | docs description; WithDescription, ScrollInside, ScrollOutside, FullscreenOnMobile, ConfirmLoading, InitialFocus; deprecated-prop stories relabelled | final |

## Barrel exports needed
These are for `src/index.tsx`, which the orchestrator owns.
```ts
// values (near the other molecules)
export { default as Drawer, Sheet } from "./components/molecules/Drawer";

// types: add Drawer; replace the existing `export type { ModalProps } …` line (src/index.tsx:277) with:
export type { DrawerProps, DrawerSide, DrawerSize, SheetProps } from "./components/molecules/Drawer";
export type {
  ModalProps,
  ModalSize,
  ModalAnimation,
  ModalScrollBehavior,
  ModalAutoFocusEvent,
} from "./components/molecules/Modal";
```

## Acceptance criteria
- `npx vitest run src/components/molecules/Drawer src/components/molecules/Modal src/components/molecules/AlertDialog` passes: 30 + 16 + 2 tests. At handoff time, the full `npx vitest run` gave 35 files and 266 tests, all passing, including the parallel agents' tests. The baseline before my changes was 143/143.
- tsc prints nothing for either path.
- No legacy aliases (AppShell, Avatar, Tooltip, TextInput, "outlined" or "filled") appear in either directory.
- Every row of checklist sections A, B and C has a verdict with evidence.

## Open questions
1. **Dark focus ring:** `--color-focus-ring` is #0066cc on the dark surface #1F2937, which is 2.64:1 and below 3:1. This is a pre-existing token issue, already escalated in `LEDGER.md` row 6. Drawer and Modal inherit it.
2. **Background inert:** neither Modal nor Drawer applies `inert` or `aria-hidden` to background content. Both rely on `aria-modal` plus the focus trap. Setting `inert` on body siblings would also disable Popovers that portal to `body` from inside the drawer. Accept, or make this a follow-up?
3. **Stacked Escape:** with a Modal opened inside a Drawer, one Escape closes both, because both use document listeners and Modal never calls `preventDefault`. A shared layer stack would fix it, but that is out of scope for this slice.
4. **Drawer `zIndex`:** there is no `zIndex` prop. The brief said "z-index uses tokens", so the Drawer uses `var(--z-drawer)`. Add a prop if consumers need custom stacking.

## Iteration 2 (response to `_fleet/VERDICT-sprint1.md`, Slice B)

**Status:** ready for re-review.

**Tests**
- Drawer: 41 tests (30 in `Drawer.test.tsx`, 11 in the new `Drawer.layers.test.tsx`).
- Modal: 19 tests (3 new).
- Full `npx vitest run`: 41 files, 406 tests, all passing.
- `tsc` prints nothing for Drawer or Modal.
- The B1 grep (`dangerouslySetInnerHTML|innerHTML|eval(|new Function`) exits 1, so it found no matches.

### Fix 1 (P1): shared overlay stack, so one Escape closes one layer
- **New module `src/components/molecules/Modal/overlayStack.ts`** provides:
  - `pushLayer(id, parentId?)` (`:23`), `popLayer` (`:31`) and `isTopLayer` (`:35`).
  - `OverlayLayerContext` (`:21`), which carries the parent layer id.
  - `getLayerIds` (`:40`), a test helper.
- **Same-commit ordering is handled.** React runs the child's effects first. When a parent is pushed after its child, `pushLayer` inserts the parent below the child.
- **Modal changes (`Modal/index.tsx`):**
  - Push and pop happen at `:107`.
  - The Escape handler at `:133-138` returns early if the event is `defaultPrevented` or the Modal is not the top layer. Otherwise it calls `preventDefault()` and `stopPropagation()`. The top layer consumes Escape even when `closeOnEscape` is false.
  - The backdrop only dismisses when the Modal is on top (`:222`).
  - A re-entry guard (`:113`) stops a second Escape during the exit animation from calling `onClose` twice.
  - The Provider is at `:245`.
- **Drawer changes (`Drawer/index.tsx`):**
  - Push and pop happen at `:110`.
  - The Escape handler checks for the top layer at `:181`, then calls `preventDefault` and `stopPropagation` (`:183`).
  - The backdrop click checks for the top layer at `:229`.
  - The Provider is at `:217`.
- **Tests (`Drawer.layers.test.tsx`):**
  - "one Escape closes only the Modal; a second closes the Drawer"
  - "with Modal exit animation, Escape never reaches the Drawer and onClose fires once"
  - "Drawer and Modal opened in the same commit: the inner Modal is on top" (your exact repro shape)
  - "the Modal backdrop does not close the Drawer underneath"
  - Stack unit tests
- **Tests (`Modal.test.tsx`):** Escape is consumed, `defaultPrevented` is skipped, and only the top of two stacked Modals closes.

### Fix 2 (P1): the Drawer focus trap can't be escaped
- **Backdrop:** `onMouseDown={(e) => e.preventDefault()}` at `Drawer/index.tsx:225`.
- **Document `focusin` guard (`Drawer/index.tsx:116-142`):**
  - It is active only while the Drawer is modal and the top layer (`:127`).
  - When focus lands on background content, the guard returns it to the last element focused inside the panel. If there is none, it uses the first focusable element, then the panel itself.
  - **Exception:** portals mounted after the drawer root are allowed (`:129-133`, `compareDocumentPosition` FOLLOWING). Without this, the guard would steal focus from a Popover or DatePicker inside the drawer, since both portal to `body`.
- **Effect order is deliberate.** The stack and guard effects are declared before the return-focus effect. React runs cleanups in declaration order, so on close the guard is removed before focus returns to the trigger.
- **Tests (`Drawer.layers.test.tsx`, "Drawer focus guard"):**
  - focusin on an outside element is pulled back to the last inside element.
  - With nothing focused inside yet, focus goes to the first focusable element.
  - A non-modal drawer is not guarded.
  - A later portal is allowed.
  - Backdrop mousedown is cancelled (`fireEvent` returns false).

### Fix 3 (P3): Modal focus-return documented
- `Modal.types.ts:16-25` (interface JSDoc) states that focus returns on close and gives the opt-out.
- `Modal.types.ts:99-102` (`onCloseAutoFocus`) says return-focus is the new default and that `event.preventDefault()` opts out.

### Barrel exports
No change from the section above. `overlayStack` is internal and is not exported.

### Open question resolved
Open question 3 (stacked Escape) from the first pass is fixed by Fix 1. Questions 1, 2 and 4 still stand.

## Iteration 3 (final; B3, P2: focus-guard exception now based on ownership, not DOM order)

**Status:** ready for re-review.

**Tests**
- Drawer: 46 tests (`Drawer.layers.test.tsx` has 16).
- Full `npx vitest run`: 42 files, 447 tests, all passing.
- `tsc` prints nothing for Drawer or Modal.
- `grep compareDocumentPosition|innerHTML|dangerouslySetInnerHTML` over both directories exits 1, so the DOM-order code is gone.

**Fix (`src/components/molecules/Drawer/index.tsx`)**
- **Removed** the `compareDocumentPosition & FOLLOWING` exception, which was previously at `:129-133`.
- **Added `onFocusCapture` on `.ds-drawer-root`** (`:225-227`). It records `e.target` in `ownedFocusTargetRef` (`:69`).
- **Why this works:** React focus events bubble through portals, so focus inside a Popover, DatePicker or nested Modal rendered from the drawer's React tree passes through this handler. React's capture listener on the portal container (`body`) runs before the document bubble-phase `focusin` listener.
- **Guard logic (`:132-137`):** a target outside the panel is allowed only if it is the owned target for this event. The flag is reset on every event (`:128,133`), so it never leaks to the next focus move.
- **Opt-in:** an ancestor with `[data-overlay-allow]` is also allowed (`:137`, checked with `closest`).
- I did not add `data-overlay-allow` to Toast. The orchestrator will coordinate that with slice A, so the toast region can take F8 focus.

**Tests (`src/components/molecules/Drawer/Drawer.layers.test.tsx`)**
- `:176` reviewer repro 1: a page button appended after the drawer opens can't keep focus.
- `:202` reviewer repro 2: with an initially-open drawer, a late sibling region (toast-like) is pulled back.
- `:215` a React `createPortal` child rendered from inside the drawer (Popover-style, outside the panel in the DOM) can take focus.
- `:235` a nested Modal inside the drawer keeps focus.
- `:248` content under `[data-overlay-allow]` may take focus.
- `:261` the ownership flag doesn't leak: after an owned focus, a page button is still pulled back.

**Note for reviewers:** a portal created outside the drawer's React tree is now pulled back while a modal drawer is on top. That covers global popovers and any toaster mounted at app level. This is intended, and `[data-overlay-allow]` is the escape hatch.
