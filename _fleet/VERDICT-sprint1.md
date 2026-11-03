# Compliance verdict — Sprint 1 components

- **Reviewer:** compliance-reviewer (read-only; this file and the LEDGER row are the only writes)
- **Date:** 2026-11-03
- **Briefs:** `_fleet/handoffs/05-orchestrator-sprint1-brief.md`, plus producer handoffs `05a` (Alert, Toast), `05b` (Drawer/Sheet, Modal upgrade) and `05c` (Spinner, Skeleton/SkeletonGroup, Pagination, Checkbox upgrade)
- **Iteration 1 result:** Accessibility FAIL · Security FAIL · Responsiveness PASS
- **Iteration 3 result (FINAL):** Accessibility **PASS** · Security **PASS** · Responsiveness **PASS** → ships. Two P3 hardening items are accepted with reason; see "Iteration 3".
- **Iteration 2 result:** Accessibility **PASS** · Security **FAIL** (B3 only — Drawer focus-guard exception) · Responsiveness **PASS** → back to component-author **slice B only**, iteration 3 of 3.

# Iteration 3 — final re-audit (2026-11-03)

**Evidence**
- `npx vitest run`: **448 passed** (matches).
- Scratch harness, 80 cases: all stories plus open-state cases plus every earlier repro. **axe: 0 violations.**
- No CSS changed in Drawer or Toast this iteration, so contrast is unchanged (only fail: the escalated dark focus ring).
- The DOM-order code is gone. `compareDocumentPosition` no longer appears in `Drawer/index.tsx`.

## Accessibility (iteration 3): PASS
- No regressions. Every earlier repro still holds: one Escape closes one layer (`drawer=0 modal=1`), the Checkbox keeps focus, action toasts are sticky, and the toast region is a polite live region.
- [PASS] F8 into toasts while a modal drawer is open: focus lands on `.ds-toast-region` because the region carries `data-overlay-allow` (`src/components/molecules/Toast/index.tsx:292`). Escape on a toast is stopped by Toast's handler (`Toast/index.tsx` onKeyDown `stopPropagation`), so it dismisses the toast, not the drawer.

## Security (iteration 3): PASS
- [PASS] B3 The ownership guard: `onFocusCapture` on `.ds-drawer-root` records the target (`src/components/molecules/Drawer/index.tsx:225-227`). The document `focusin` guard allows an outside target only if it is this event's owned target or sits under `[data-overlay-allow]`, and it resets the mark on every event (`:122-143`). Harness:
  - The iteration-2 repro, a late body node, is now pulled back (`late-body -> Close`).
  - A background button rendered before the drawer is pulled back.
  - A `createPortal` child rendered from inside the drawer may take focus (`owned-portal -> popover-item`).
  - There is no carry-over: an owned focus followed by a page button pulls back (`after-owned page -> Close`).
- **Answer — can a page-level, non-allowed node still keep focus?** Only in one narrow case. If the background element's focus event **stops propagating before it reaches `document`**, the bubble-phase guard never runs. Harness:
  - A page React button with `onFocus={(e) => e.stopPropagation()}` keeps focus (`react-stopPropagation -> bg-stop`).
  - A page node with a native `focusin` listener calling `stopPropagation()` keeps focus (`native-stopPropagation -> native-stop`).

  Focus can only get there through programmatic `.focus()` or screen-reader browse-mode activation. Tab from the panel wraps (`trapTabKey`), and backdrop clicks can't move focus (`:225` mousedown preventDefault).
  [ACCEPTED WITH REASON, P3 hardening] Register the guard in the **capture** phase (`document.addEventListener("focusin", fn, true)`), which `stopPropagation` can't block. Defer the decision with `queueMicrotask(() => check(document.activeElement))` so React's body-level `onFocusCapture` mark has already been set. Then add the two stopPropagation cases as tests.
- **Answer — can a careless consumer misuse `[data-overlay-allow]`?** Yes. Matching uses `closest()` on any ancestor (`Drawer/index.tsx:136-137`), so `data-overlay-allow` on an app wrapper (or `<body>`) **disables the guard for the whole page**. Harness: `allow-on-app-root -> bg-in-allowed-wrapper` keeps focus. Recommendation:
  - Treat it as **internal**. Do not document it as public API or in stories/portal pages; mention it only in a source comment ("library-internal: Toast region").
  - Harden it (P3): honour the attribute only on portal roots that are direct children of `document.body` (`el.parentElement === document.body`), or replace the attribute with a module-level registry (`registerOverlayAllowRoot(el)` next to `overlayStack.ts`) used by `ToastProvider`.
  - Add a dev-only `console.warn` when the attribute is found on an element that contains the drawer's opener.
- [PASS] B1/B4/B5 unchanged and clean.

## Responsiveness (iteration 3): PASS
- No layout or CSS changes this iteration.

## Ranked fix list (iteration 3 — none blocking)
- [component-author B] P3 — Capture-phase `focusin` guard plus a microtask decision, so `stopPropagation` in background content can't bypass it (`src/components/molecules/Drawer/index.tsx:122-143`)
- [component-author B] P3 — Treat `[data-overlay-allow]` as internal: restrict it to direct `body` children or a registry, and add a dev warning (`Drawer/index.tsx:136-137`, `Toast/index.tsx:292`)
- [component-author A] Pre-release manual NVDA, JAWS and VoiceOver smoke test of danger-toast announcements (carried over from iteration 2)

Escalated items stay out of the verdict, unchanged:
- dark and green-mist `--color-focus-ring`
- the `useRipple.tsx` tsc error
- Select blur and height
- dark `--button-primary-*` 3.68:1

# Iteration 2 — re-audit (2026-11-03)

I checked every fix in the code (not from the handoff tables) and re-ran the full harness. Sprint 2 (slices D/E/F) is out of scope.

**Evidence**
- `npx vitest run`: **406 passed / 41 files** (matches).
- axe-core 4.11.1 on all stories of the 8 components (including the new `Skeleton LoadingContainer`), the 9 open-state cases and 6 new behaviour cases: **0 violations**.
- Contrast: the tokens used are unchanged (re-grepped `tokens.css`) and no new colours were added. Recomputed for classic, mist and dark: the only fail is still the escalated dark `--color-focus-ring` (2.64:1).
- grep for XSS sinks: clean. No hex in the changed CSS.
- Release note for Modal focus return: `src/portal/data.ts:197-198` (RELEASES 0.0.3), plus the JSDoc at `Modal.types.ts:16-25,99-102`.

## Accessibility (iteration 2): PASS
- [PASS] A10 / 4.1.3 Toast live strategy — the always-mounted region is `aria-live="polite" aria-relevant="additions"` (`src/components/molecules/Toast/index.tsx:289-290`). Non-danger toasts carry no role; danger is `role="alert" aria-atomic` (`:42`). Harness: the region reports `live=polite additions` and an info toast has `role=null`.
- [ACCEPTED WITH REASON — manual check before release] A `role="alert"` danger toast sits inside a polite region. That is the reliable insertion pattern, and the alert is its own live root, but a possible double announcement can only be checked with NVDA/JAWS/VoiceOver. jsdom can't assert it. Owner: slice A, as a pre-release manual smoke test.
- [PASS] A1 / 2.2.1 — toasts with an action are sticky unless `duration` is set (`Toast/index.tsx:114`). Harness: provider `duration={50}`, action toast still present after 400ms. Toasts without an action keep the 5s default, which is acceptable because they are announced and nothing in them needs a response.
- [PASS] Toast focus after Escape: next or previous toast, then the restore point (recorded by F8 or by region `onFocus` relatedTarget), then the region. It never falls to body (`Toast/index.tsx:194-220,291-295`).
- [PASS] A1 Nested Escape — shared `overlayStack.ts` (`src/components/molecules/Modal/overlayStack.ts:23-37`). Modal returns early unless it is the top layer, skips `defaultPrevented`, and consumes Escape (`Modal/index.tsx:133-138`). The same applies in the Drawer (`Drawer/index.tsx:181-183`), and backdrops are top-layer-only (`Modal/index.tsx:222`, `Drawer/index.tsx:229`). Harness repro from iteration 1: `drawer=0 modal=1` after one Escape (previously `1/1`).
- [PASS] A1 / 2.4.3 Checkbox — a stable `ucs-cc-checkbox-field` wrapper (`src/components/atoms/Checkbox/index.tsx:209-216`). Harness repro: `sameNode=true focused=true` after `error` appears (previously `false/BODY`). Side effect checked: the wrapper is a block-level flex column, and the old root `<label>` was already `display:flex`, so layout is unchanged.
- [PASS] A10 SkeletonGroup — `role="status"` only, with the consumer `aria-busy` pattern documented (`src/components/atoms/Skeleton/index.tsx:82-94`).
- [PASS] `aria-checked` removed; `.indeterminate` drives the mixed state (`Checkbox/index.tsx` input attributes around `:178`). axe is clean.

## Security (iteration 2): FAIL — B3 only
- [PASS] B3 Backdrop mousedown is cancelled (`src/components/molecules/Drawer/index.tsx:225`). Focus from earlier background content is pulled back into the panel. Harness: focusing a page button rendered before the drawer → focus is returned to the panel's "Close".
- [FAIL] B3 **The focusin-guard exception lets focus stay on any body-level node inserted after the drawer root, whoever owns it** (`src/components/molecules/Drawer/index.tsx:129-133`). The test is purely DOM order (`compareDocumentPosition & FOLLOWING`), not "is this content opened from inside the drawer". Harness:
  - (a) A `<button>` appended to `document.body` after the drawer opened (a stand-in for a third-party widget, a lazily created portal container, or a background-triggered popover/tooltip) is focused and **keeps focus** (`GUARD late-sibling -> third-party-widget`).
  - (b) Order depends on the commit: `ToastProvider` mounts its region in an effect, so when a Drawer is open on first render the toast region ends up **after** the drawer root and counts as an allowed "later layer" (`ORDER toastRegion follows drawerRoot? true`).

  The impact is bounded. Tab from inside the panel still wraps (`trapTabKey`). Focus that wanders from the later node back to earlier page content is pulled back. A nested Modal is unaffected because it becomes the top layer, so the guard steps aside via `isTopLayer`. But mouse clicks, programmatic focus and screen-reader browse-mode activation can reach unrelated later content behind an `aria-modal` dialog. That breaks the condition attached to the accepted "no `inert`" decision.
  Fix (ownership instead of DOM order): React synthetic focus events bubble through portals along the React tree, and run (at the `body` portal container) before the native `document` listener. So add `onFocusCapture={() => { ownedFocusRef.current = true; }}` on the drawer root/Provider element, and in the document `focusin` handler allow the target only if `ownedFocusRef.current` is set (then reset it). Optionally, allow an explicit opt-in such as `[data-overlay-allow]` for the toast region if F8 should still work from inside a modal drawer. Add the two harness cases above as tests.
- [PASS] B1/B4/B5 unchanged and clean.

## Responsiveness (iteration 2): PASS
- No layout changes except the Checkbox wrapper (verified: block flex column, same as the old root). Toast, Drawer and Pagination CSS are unchanged in this iteration.

## Ranked fix list (iteration 2)
**Slice A — component-author:** none blocking. Before release, smoke-test danger-toast announcements with NVDA, JAWS and VoiceOver (record the result in the handoff).
**Slice B — component-author:**
1. P2 — Replace the DOM-order `isLaterLayer` exception with an ownership check (React `onFocusCapture` flag), plus tests for "late unowned node is pulled back" and "toast region order" (`src/components/molecules/Drawer/index.tsx:116-142`, especially `:129-133`)
**Slice C — component-author:** none.

---
# Iteration 1 (history)

## Evidence run
| Check | Result |
|---|---|
| `npx vitest run` | **310 passed / 36 files** — matches the coordinator's figure |
| `npx tsc --noEmit -p tsconfig.json` | 15 errors, none in Sprint 1 paths: `useRipple.tsx` (1, escalated) and pre-existing story files (`Tooltip.stories.tsx` 10, `FeedbackState*.stories.tsx` 4) |
| Barrel `src/index.tsx:107-112,283-284,306-311` | Imported in the harness: Alert, Toast, ToastProvider, useToast, Drawer, Sheet, Modal, Spinner, Skeleton, SkeletonGroup, Pagination, getPaginationRange/getPageCount/getItemRange and CheckBox all **resolve**. Type lines compile (tsc clean for `src/index.tsx`). |
| axe-core 4.11.1 (jsdom; `color-contrast` off) on **all 58 stories** of the 8 components via `composeStories` | **0 violations** |
| axe on 9 targeted open-state cases (5 Alert tones with live+action+dismiss; ToastProvider with success+danger toasts; open Drawer with nested open Modal; Spinner; SkeletonGroup; 3 Pagination configurations including links and page size; Checkbox indeterminate / required+error+description / aria-label-only) | **0 violations**, including `aria-conditional-checkbox-attr` for `aria-checked="mixed"` |
| Behaviour repros (scratch harness, outside the repo) | Nested Escape closes both layers; Checkbox loses focus when `error` toggles (details below) |
| Contrast | Recomputed with the WCAG formula from current `tokens.css` for classic, mist and dark (`color-mix` resolved in sRGB). Every slice-A table value reproduces within ±0.01. **Only fail found: the escalated dark `--color-focus-ring` (2.64:1)**, which Drawer, Modal and Pagination inherit. |
| grep `dangerouslySetInnerHTML\|innerHTML\|outerHTML\|eval(\|new Function\|insertAdjacentHTML` and `ui-common-hooks` in the 8 dirs | no hits |
| Hex colours in new CSS | none (the only hit is a comment, `Alert.css:9`) |

## Accessibility: FAIL
**Slice A — Alert, Toast**
- [PASS] A4 Contrast. Alert/Toast title mix on fills is 5.02–7.93:1 and on surfaces 6.36–9.50:1. Icon/bar strong colours on surface are ≥4.71:1. The ring mix on tone fills is ≥3.50:1 (dark) and ≥8.64:1 (classic/mist) (`Alert.css:8,11`; `Toast.css:7,58-59`). Meaning is also given by an SR prefix (`Alert.config.ts:19-25`, `Alert/index.tsx:39`).
- [PASS] A3 `:focus-visible` on dismiss, toast and region (`Alert.css:142-146`, `Toast.css:27-31,85-88`); forced-colors handled (`Alert.css:163-176`, `Toast.css:163-176`).
- [PASS] A9 Reduced motion (`Toast.css:156-161`, JS removal at `Toast/index.tsx:215-216`).
- [FAIL] A10 / WCAG 4.1.3 — **Toast announcements depend on live regions inserted together with their content.** Each toast is a new element carrying `role="status" aria-live="polite"` (or `role="alert"`) (`src/components/molecules/Toast/index.tsx:38,46`). It is inserted into a `<section>` that is **not** a live region (`Toast/index.tsx:273-280`). Per ARIA, only changes *inside an existing* live region are announced, so per-toast `status` is unreliable (the producer flags VoiceOver and older NVDA). Fix: make the always-mounted region the polite live container (`aria-live="polite"` + `aria-relevant="additions text"` on the `<section>`) and drop `role`/`aria-live` from individual non-danger toasts. Keep `role="alert"` for danger, since `alert` insertion is announced reliably, or add a second always-mounted `aria-live="assertive"` region.
- [FAIL] A1 / WCAG 2.2.1 Timing Adjustable — **a toast with an `action` auto-dismisses after 5s** (`Toast.config.ts:6`; timer at `Toast/index.tsx:109-120`). A screen-reader or keyboard user must hear it, press F8 and Tab to "Undo" within 5s. Hover/focus pausing only helps once they get there, and only the app developer, not the user, can extend the time. Fix: when `action` is set and `duration` is not given, default to `Infinity` (or at least 10s) and document it in the stories.
- [ACCEPTED WITH REASON] A2 Dismiss button 32px on fine pointers, 44px on coarse (`Alert.css:126-127,148-153`). Meets WCAG 2.5.8 and follows the VERDICT-portal precedent.
- [ACCEPTED WITH REASON] Title colour deviates from the brief's raw `--color-{tone}-strong` (`Alert.css:8`). The mix passes everywhere and the raw token fails in dark info (4.21:1, verified).

**Slice B — Drawer/Sheet, Modal**
- [PASS] A7 Drawer `role="dialog"`, `aria-modal`, `aria-labelledby` + `aria-describedby` (`Drawer/index.tsx:184-187`); initial focus and return focus (`:103-124`). Modal `aria-describedby` (`Modal/index.tsx:250`).
- [PASS] A3/A9 Drawer focus rings (`Drawer.css:46-49,176-179,200-203`), reduced motion (`:238-249`) and unmount without animation (`Drawer/index.tsx:89-100`); forced-colors edge (`Drawer.css:252-260`).
- [FAIL] A1 Escape — **one Escape closes both layers, and the bottom layer first.** Repro: render `<Drawer open><Modal isOpen/></Drawer>`, focus inside the Modal, press Escape → `onOpenChange(false)` on the Drawer fires immediately, then Modal `onClose` fires after its 300ms exit (harness: `drawerClose=1 modalClose=1`). Cause: both components register document `keydown` listeners. The Drawer's (registered first) runs first (`src/components/molecules/Drawer/index.tsx:134-143`), and Modal ignores `defaultPrevented` (`src/components/molecules/Modal/index.tsx:117-125`). The handoff says this stacking is supported (`--z-drawer` < `--z-modal`), so the user loses the Drawer context unexpectedly. Fix: add a shared layer stack next to `bodyScrollLock.ts` (push on open, pop on close) so only the top layer handles Escape, and make Modal skip `e.defaultPrevented`.
- [ACCEPTED WITH REASON] A2 Close button 40px on fine pointers, 44px on coarse (`Drawer.css:157-158,181-186`).

**Slice C — Spinner, Skeleton, Pagination, Checkbox**
- [PASS] A4 Pagination current page (surface on brand-primary) 19.44 / 18.62 / 14.68:1; total text ≥4.91:1 (classic on page). Checkbox error 6.84–7.73:1, description ≥6.21:1, face border ≥3.31:1. Spinner primary ring:track ≥10.31:1, muted ≥4.71:1.
- [PASS] A1/A10 Pagination: `<nav aria-label>`, native buttons/links, `aria-current="page"`, boundary prev/next `aria-disabled` keep focus (`Pagination/index.tsx:107-141,154-156`); ellipsis has SR text (`:181-184`); page-size has a real `<label for>` (`:207`). Spinner `role="status"` + hidden label or decorative `aria-hidden` (`Spinner/index.tsx:30-35`).
- [PASS] A9 Spinner pulse, Skeleton shimmer off and Pagination transitions off under reduced motion (`Spinner.css:74-78`, `Skeleton.css:76`, `Pagination.css:180-184`); forced-colors blocks present.
- [FAIL] A1 / WCAG 2.4.3 — **Checkbox loses keyboard focus when `error` appears or clears.** With no error the component returns a bare `<label>`; with an error it wraps the same label in a new `<div>` (`src/components/atoms/Checkbox/index.tsx:208-217`). React remounts the `<input>`. Repro: focus the checkbox, rerender with `error="Required"` → new input node and `document.activeElement === BODY` (harness: `sameNode=false focused=false`). Validate-on-change is the common case, so keyboard users are dropped to the top of the page. Fix: always render the `ucs-cc-checkbox-field` wrapper (or a stable fragment structure) and toggle only the error `<p>`.
- [FAIL] A10 SkeletonGroup — `role="status"` and `aria-busy="true"` sit on the same node (`src/components/atoms/Skeleton/index.tsx:92-93`). `aria-busy` tells AT to hold announcements for that region. The "Loading content" label is also static content present at mount, so it is not a live change. The handoff's claim that "assistive tech hears one Loading content" therefore isn't met. Fix: drop `aria-busy` from the status node. Document that consumers put `aria-busy="true"` on the container being loaded and render SkeletonGroup inside an already-mounted region, or announce via an existing polite region.
- [ACCEPTED WITH REASON] A2 Pagination 40/36px on fine pointers, 44px coarse (`Pagination.css:4,18,174-178`) with 8px gaps (`:34`); Checkbox row min-height 24px (`Checkbox.css:8`). Both meet WCAG 2.5.8.
- [OPTIONAL] A10 `aria-checked="mixed"` on the native checkbox (`Checkbox/index.tsx:180`) — see the open-question verdict below.

## Security: FAIL
- [PASS] B1 No XSS sinks (grep clean). Toast/Alert/Drawer/Modal titles render as React text (Drawer test "renders title text literally"). Pagination `isSafePageHref` uses a WHATWG parse with an http/https allow-list (`Pagination.utils.ts:115-129`), with tests for `java\tscript:`, ` JAVASCRIPT:`, `data:`, `vbscript:`.
- [PASS] B4 No new dependencies; no `ui-common-hooks` import in `src/components/**` slices.
- [PASS] B5 Only CSSOM inline styles (custom properties, Skeleton dimensions); no inline handlers or `<style>`. `window` access is guarded (`Toast.utils.ts:3`, `Drawer/index.tsx:93`).
- [PASS] Modal `confirmLoading` blocks double submit (`Modal/index.tsx:211`).
- [FAIL] B3 Focus security — **the Drawer focus trap only runs while focus is already inside the panel.** The trap is an `onKeyDown` on the panel (`src/components/molecules/Drawer/index.tsx:163-165,194`). The backdrop is a non-focusable sibling (`:174-179`). With `closeOnBackdropClick={false}`, a click on the backdrop moves focus out of the panel (to the body / the sequential-navigation starting point at the backdrop). The next Tab/Shift+Tab is a document keydown that the panel handler never sees, so Shift+Tab lands on page content behind an `aria-modal` dialog. Evidence is a code trace: jsdom does not perform sequential focus navigation, so this needs a browser repro (Storybook "Design System/Molecules/Drawer" Playground, set `closeOnBackdropClick=false`, click the backdrop, press Shift+Tab). Modal does not have this problem because its click target `.modal` is `tabIndex=-1` (`Modal/index.tsx:248`). Fix: `onMouseDown={(e) => e.preventDefault()}` on the backdrop, plus a document `focusin` guard that returns focus to the panel while `modal` is open.
- [ACCEPTED WITH REASON] B3 "no `inert`/`aria-hidden` on background" (Drawer and Modal) — see the open-question verdict below.

## Responsiveness: PASS
- [PASS] C1 Toast region is full width with a 16px gutter at ≤480px (`Toast.css:145-154`). Drawer width uses `min(extent, 100vw)` and becomes `100vw` at ≤480px, with heights capped to `100dvh` (`Drawer.css:56,73-74,220-236`). Modal `fullscreenOnMobile` and outside-scroll scoping (`Modal.css` diff). Pagination wraps and goes compact at ≤480px (`Pagination.css:156-171`). Alert actions wrap via `flex: 1 1 14rem` (`Alert.css:68`). Skeleton `max-width: 100%`.
- [PASS] C5 Touch — every control reaches 44px under `(pointer: coarse)` (Alert/Toast dismiss, Drawer close, Pagination). Fine-pointer sizes are accepted above.
- [PASS] C6 Tokens only (no hex), dark/mist contrast verified, forced-colors blocks in all new CSS, reduced motion covered.
- Note: no real-browser 375/768/1440 sweep was possible (no headless browser installed). This is a static CSS review.

## Verdicts on the producers' open questions
1. **Toast announcement strategy (per-toast role vs live container):** use a **live container**. The region is already mounted empty before the first toast, so make it `aria-live="polite"` and drop per-toast `status`. Keep `role="alert"` (or an assertive sibling region) for danger. Recorded as FAIL A10 above.
2. **Modal now restores focus on close:** **accepted.** It is required by A7/B3, and the opt-out `onCloseAutoFocus={(e) => e.preventDefault()}` exists. AlertDialog tests still pass. Needs a release note ("Modal returns focus to the opener on close"), because consumers that focus something else in their `onClose` will now have focus moved back to the opener.
3. **No `inert` on background:** **accepted with reason, conditional on the B3 trap fix.** `aria-modal` plus a focus trap is the APG-sanctioned pattern and matches the existing Modal, and `inert` on body siblings would disable Popovers that portal to `body` from inside the panel. It is acceptable only once the Drawer trap cannot be escaped (FAIL B3). Track `inert` (excluding descendant portals) as a follow-up.
4. **One Escape closing Modal and Drawer together:** **not accepted, fix it.** It is worse than the handoff states: the Drawer closes first, immediately, while focus is in the Modal. Recorded as FAIL A1 (shared layer stack).
5. **Pagination current page uses brand-primary instead of the theme colour:** **accepted for compliance.** It passes 14.68–19.44:1 in every theme, and the `--button-primary-*` alternative fails in dark (white on #3b82f6 = 3.68:1). The green/custom themes not tinting the current page is a design decision, not a defect. Optional: add `--pagination-current-bg/fg` tokens. The dark `--button-primary-*` 3.68:1 is a repo-wide Button token problem to escalate separately.
6. **`aria-checked="mixed"` on the native checkbox:** axe 4.11.1 does not flag it (it matches `.indeterminate`), so it is **not a blocking defect**. Recommendation (optional, P3): remove it. ARIA in HTML says authors should not set `aria-checked` on `input type=checkbox`; `.indeterminate` is already exposed as "mixed" by all major engines; and the attribute can drift from native state between a click and the parent re-render.

## Ranked fix list (grouped by slice)
**Slice A — component-author (Alert, Toast)**
1. [component-author A] P1 — Toast announcements: make the persistent region the polite live container; remove per-toast `status` (`src/components/molecules/Toast/index.tsx:38,273-280`)
2. [component-author A] P2 — A toast with an `action` defaults to no auto-dismiss (or ≥10s) (`src/components/molecules/Toast/Toast.config.ts:6`, `Toast/index.tsx:109`)
3. [component-author A] P3 optional — when there is no F8 origin, `el.blur()` drops focus to body after Escape (`Toast/index.tsx:205-206`); fall back to the region instead

**Slice B — component-author (Drawer, Modal)**
1. [component-author B] P1 — Shared layer stack so only the top layer handles Escape; Modal respects `defaultPrevented` (`src/components/molecules/Drawer/index.tsx:134-143`, `src/components/molecules/Modal/index.tsx:117-125`)
2. [component-author B] P1 — Drawer trap holds when focus leaves the panel (backdrop `onMouseDown` preventDefault + document `focusin` guard) (`Drawer/index.tsx:163-165,174-179`)
3. [component-author B] P3 — Release note for the Modal focus-return behaviour change

**Slice C — component-author (Spinner, Skeleton, Pagination, Checkbox)**
1. [component-author C] P1 — Checkbox stable DOM when `error` toggles (no input remount / focus loss) (`src/components/atoms/Checkbox/index.tsx:208-217`)
2. [component-author C] P2 — SkeletonGroup: remove `aria-busy` from the status node and document the loading-container pattern (`src/components/atoms/Skeleton/index.tsx:92-93`)
3. [component-author C] P3 optional — drop `aria-checked="mixed"` and rely on `.indeterminate` (`Checkbox/index.tsx:180`)

**Escalated / out of this verdict (unchanged):**
- dark and green-mist `--color-focus-ring` (2.64:1 / 2.33:1; affects Drawer, Modal, Pagination raw rings)
- the `useRipple.tsx` tsc error
- Select blurring on change and Select height
- new: dark `--button-primary-*` white on #3b82f6 = 3.68:1 (found via the Pagination rationale)
