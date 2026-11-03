# Handoff: component-author (Sprint 1, agent A) -> compliance-reviewer

- **Task:** Review the new `Alert` and `Toast` (provider + hook) molecules against `_fleet/QUALITY_CHECKLIST.md` A/B/C.
- **Status:** ready (iteration 2 — see the final section)

## Objective
Verify that `src/components/molecules/Alert/` and `src/components/molecules/Toast/` pass the checklist's Accessibility, Security and Responsiveness sections (or are explicitly accepted with a reason), using the file:line evidence below as your starting point.

## Output format
`_fleet/VERDICT-sprint1-a.md` (or a section in the shared Sprint 1 verdict): one table per dimension (A1-A10, B1-B7, C1-C7) with PASS / FAIL / N/A, file:line evidence, and for each FAIL the rule plus the fix. End with an overall PASS / FAIL line.

## Sources and tools
- Code: `src/components/molecules/Alert/*`, `src/components/molecules/Toast/*`
- Tokens: `src/design-system/tokens.css` (classic `:root` ~L318-466, dark ~L469-583, mist ~L586-594)
- Checklist: `_fleet/QUALITY_CHECKLIST.md`
- Commands:
  - `npx vitest run src/components/molecules/Alert src/components/molecules/Toast` (43 tests: Alert 16, Toast 27, after iteration 2)
  - `npx vitest run` (full suite: 39 files, 371 tests, all green after iteration 2)
  - `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "molecules/(Alert|Toast)/"` (prints nothing)
  - Contrast was computed with a WCAG relative-luminance script. Re-derive it from the hex values in tokens.css. `color-mix(in srgb, A p%, B)` = per-channel `A*p + B*(1-p)`.
- Do NOT use `ui-common-hooks` (the brief forbids it as a dependency).

## Boundaries
- Out of scope: `src/index.tsx` exports (the orchestrator wires them; see "Barrel exports needed"), `.storybook/*`, `dist/`, `package.json`, and other Sprint 1 slices (B, C).
- Do not run `npm run build`, because it overwrites the tracked dist.
- Out of scope: repo-wide token defects already escalated in `_fleet/VERDICT-portal.md` (the dark focus-ring token). This slice works around that defect locally (see the digest) but does not fix the token.
- The action `Button` inside Alert/Toast is the existing atom, and its own focus ring and colours are owned by Button.

## Context digest
- **One shared config:** `Alert/Alert.config.ts` is the single source for the tone → icon (inline SVG via `React.createElement`, `aria-hidden`, `focusable="false"`), the tone → colour tokens (`ALERT_TONE_TOKENS`), the SR prefix words (`ALERT_SR_PREFIX`), and the live-role logic (`getLiveProps`). Toast imports it along with `Alert.css`, which holds the shared dismiss-button and `.ds-alert__sr` rules. Colours reach the CSS as inline custom properties `--ds-feedback-strong` / `--ds-feedback-fill` (`getToneStyle`), so neither CSS file names a tone.
- **Title colour deviates from the brief on purpose.** Raw `--color-info-strong` (#60a5fa) on the dark info fill (#2b3f5a) is only **4.21:1**. Titles therefore use `--ds-feedback-fg: color-mix(strong 80%, --color-text-primary)` (Alert.css:8, Toast.css:58). Icons, borders and the accent bar use raw `strong`, which only needs 3:1 as non-text. Description text is `--color-text-primary`.
- **Focus ring workaround:** `--color-focus-ring` #0066cc is 1.76-2.64:1 on dark surfaces and fills. Alert/Toast use `--ds-feedback-ring: color-mix(focus-ring 60%, text-primary)` (Alert.css:11, Toast.css:7/59). That gives ≥ 3.50:1 in dark and ≥ 7.58:1 in classic/mist.
- **Alert live semantics:** the default `live="off"` renders no role and no aria-live. `assertive` + danger/warning renders `role="alert"`. Every other combination renders `role="status"` with an explicit `aria-live` set to the `live` value, so `assertive` + info gives `status` + `aria-live="assertive"` (Alert.config.ts:49-56).
- **Toast semantics (superseded in iteration 2):** the always-mounted region is now the polite live container. Non-danger toasts have no role, and danger toasts are `role="alert"`. See Iteration 2. The region is `<section aria-label="Notifications" tabIndex=-1>`, portalled to `document.body` only after mount, which makes it SSR-safe; a test covers this with `renderToString`. The region is always rendered once mounted, even when empty (`data-empty`, zero padding, `pointer-events: none`), so it already exists when the first toast is inserted.
- **Focus:** toasts never take focus. F8 (document keydown, only while toasts exist) focuses the region and remembers the previously focused element. Toasts are `tabIndex=0`. Escape on a focused toast dismisses it (unless `dismissible: false`) and moves focus to the next or previous toast, or back to the element that had focus before F8. The close and action buttons follow the same focus handoff.
- **Timers:** each toast pauses on its own hover and focus-within, and every toast pauses while `document.visibilityState === "hidden"`. On resume the timer continues with the remaining time rather than restarting. `duration: Infinity` makes a toast sticky. Toasts beyond `max` queue FIFO and start their timers only once visible. Calling `toast({id})` with an existing id updates that toast and restarts its timer. An action click runs the handler, then dismisses. The exit animation lasts 200ms (`TOAST_EXIT_MS`, mirrors `--duration-fast`); removal is immediate when `prefers-reduced-motion: reduce` matches.
- **Stack order:** DOM and Tab order are chronological. CSS uses `column-reverse` for top positions so the newest toast sits nearest the screen edge.

## Contrast numbers (WCAG ratio, from tokens.css)
| Pair | classic | mist | dark |
|---|---|---|---|
| title fg (mix) on soft fill: info / success / warning / danger | 6.49 / 6.83 / 6.15 / 7.93 | same fills: 6.49 / 6.83 / 6.15 / 7.93 | 5.02 / 5.76 / 6.34 / 6.43 |
| title fg (mix) on surface (outline, solid-accent, toast): info / success / warning / danger | 7.36 / 7.15 / 6.63 / 9.19 | 7.05 / 6.85 / 6.36 / 8.80 | 6.88 / 8.43 / 9.50 / 8.63 |
| text-primary (description) on fills | ≥ 16.77 | ≥ 16.77 | ≥ 8.90 |
| neutral: text-primary on fill-muted | 17.83 | 14.72 | 9.37 |
| raw strong (icons/border/bar, need 3:1) on fill: info / success / warning / danger | 4.85 / 5.09 / 4.56 / 6.16 | same | 4.21 / 5.22 / 5.87 / 5.77 |
| neutral outline border-default on surface | 3.45 | 3.31 | 3.38 |
| focus ring (mix) on surfaces/fills, minimum | 7.58 | 7.58 | 3.50 |
Notes: toast surface is `--color-bg-elevated`, which is #fff in classic and mist and #1f2937 in dark. Dark fills are `color-mix(state 18%/20%, #1f2937)`, which gives info #2b3f5a, success #234849, warning #474434, danger #4a3743.

## Self-check evidence (QUALITY_CHECKLIST)
**A — Accessibility**
- A1 keyboard: the dismiss controls are native `<button type="button">` (Alert/index.tsx:76, Toast/index.tsx:67). F8 → region (Toast/index.tsx:256), toasts `tabIndex=0` (Toast/index.tsx:133), Escape (Toast/index.tsx:143). Tests cover these: Toast.test.tsx "F8 focuses the region…", Alert.test.tsx "keyboard reachable".
- A2 targets: the dismiss button is `--space-4` (32px) on fine pointers and 44px under `(pointer: coarse)` (Alert/Alert.css:148). This matches the precedent accepted in VERDICT-portal (≥ 24px WCAG 2.5.8). The action Button is `size="sm"`, a 1.875rem (30px) min-height.
- A3 focus: `:focus-visible` rings on the dismiss button (Alert.css ~L142-145), the toast (Toast.css:86) and the region (Toast.css:28), using `--ds-feedback-ring`.
- A4 contrast: see the table above. Meaning is never carried by colour alone: icon plus SR prefix (Alert/index.tsx:39, Toast/index.tsx:54, Alert.config.ts:19).
- A5 live: Alert `getLiveProps` (Alert.config.ts:49), wired at Alert/index.tsx:50. Toast roles at Toast/index.tsx:38.
- A7 overlays: N/A. Toasts are non-modal and do not move focus, by design.
- A9 motion: Toast.css:156 sets `animation: none` under reduced motion; JS removes immediately (Toast/index.tsx:215). Alert has transitions only on dismiss hover (Alert.css:156). There is no auto-playing motion over 5s.
- A10: icons are `aria-hidden` (Alert/index.tsx:54, Toast/index.tsx:49). The dismiss button gets its name from `dismissLabel`.

**B — Security**
- B1: no `dangerouslySetInnerHTML`, `innerHTML` or `eval` (grep is clean). Title, description and the action label render as React text and nodes.
- No inline event-handler strings. Inline `style` is used only for CSS custom properties set through React's CSSOM, which is CSP-safe.
- Listeners (`visibilitychange`, `keydown`) and exit timers are cleaned up on unmount (Toast/index.tsx:176-182 and the F8 effect).

**C — Responsiveness**
- The Alert body uses `flex: 1 1 14rem` with wrap, so actions drop onto their own row at 375px (Alert.css:67-68). Copy uses `overflow-wrap: anywhere`.
- The toast region is 24rem wide (Toast.css:14) with `max-width: 100%`. At ≤ 480px it is full width with a `--space-2` (16px) gutter (Toast.css:145).
- `z-index: var(--z-toast)` (Toast.css:9). `forced-colors` blocks are at Alert.css:163 and Toast.css:163.
- Dark contrast: see the table above.

## Failed approaches
- Raw `--color-{tone}-strong` as title text, as the brief specified, failed in dark info (4.21:1). It was replaced by the 80% mix toward text-primary, which passes everywhere; see the digest.
- Raw `--color-focus-ring` failed 3:1 on every dark surface and fill (1.76-2.64:1). It was replaced by the 60% mix toward text-primary.
- A first `dismissAll` called `close()` from inside a `setState` updater using `queueMicrotask`. That approach is impure under StrictMode, so it was replaced with a `recordsRef` mirror.
- An earlier `@media (max-width: 480px)` flex-basis hack for Alert was replaced by intrinsic `flex: 1 1 14rem` wrapping.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/molecules/Alert/Alert.types.ts | AlertVariant / AlertAppearance / AlertLive / AlertProps | final |
| src/components/molecules/Alert/Alert.config.ts | Shared tone config: defaults, SR prefixes, tone tokens, getToneStyle, getLiveProps, getAlertIcon, getCloseIcon | final |
| src/components/molecules/Alert/index.tsx | Alert (forwardRef, displayName) | final |
| src/components/molecules/Alert/Alert.css | Alert styles plus shared dismiss/sr rules (imported by Toast) | final |
| src/components/molecules/Alert/Alert.stories.tsx | Playground, Variants, Appearances, WithActionAndDismiss, Compact, LiveOnSubmit | final |
| src/components/molecules/Alert/Alert.test.tsx | 16 tests (rendering / a11y / interaction) | final |
| src/components/molecules/Toast/Toast.types.ts | ToastVariant / ToastPosition / ToastAction / ToastOptions / ToastProps / ToastProviderProps / ToastContextValue | final |
| src/components/molecules/Toast/Toast.config.ts | TOAST_DEFAULTS, TOAST_HOTKEY ("F8"), TOAST_EXIT_MS | final |
| src/components/molecules/Toast/Toast.utils.ts | SSR-safe prefersReducedMotion / isDocumentHidden, nextToastId | final |
| src/components/molecules/Toast/index.tsx | Toast (presentational), ToastProvider, useToast | final |
| src/components/molecules/Toast/Toast.css | Region positions, toast card, animations, ≤480px, reduced-motion, forced-colors | final |
| src/components/molecules/Toast/Toast.stories.tsx | Playground, Variants, WithProvider (documents F8/Tab/Escape) | final |
| src/components/molecules/Toast/Toast.test.tsx | 22 tests, fake timers for auto-dismiss / hover / focus / hidden pause | final |

## Barrel exports needed
```ts
export { default as Alert } from "./components/molecules/Alert";
export type { AlertProps, AlertVariant, AlertAppearance, AlertLive } from "./components/molecules/Alert";
export { default as Toast, ToastProvider, useToast } from "./components/molecules/Toast";
export type {
  ToastProps,
  ToastOptions,
  ToastAction,
  ToastPosition,
  ToastVariant,
  ToastProviderProps,
  ToastContextValue,
} from "./components/molecules/Toast";
```
(`Alert/index.tsx` also re-exports `ALERT_SR_PREFIX`, `ALERT_TONE_TOKENS`, `getAlertIcon`, `getLiveProps` and `getToneStyle`. Barrel-exporting them is optional; I recommend keeping them internal.) The existing `AlertDialog` export does not collide.

## Acceptance criteria
- Every A/B/C item is PASS or explicitly accepted, with file:line evidence.
- The contrast table above is re-derived from tokens.css and matches within ±0.02.
- The 38 slice tests pass, the full `npx vitest run` passes, and tsc prints nothing for these paths.
- Grep finds no legacy aliases (AppShell / Avatar / Tooltip / TextInput / "outlined" / "filled") in the two dirs. It is clean at handoff.

## Open questions
- **Toast announcement reliability:** `role="status"` elements inserted into a non-live container are announced inconsistently by some screen readers (for example VoiceOver and older NVDA). The brief mandates the per-toast roles, and I followed it. Before ship, test manually with NVDA and VoiceOver. If announcements are missed, a fallback is to make the region a polite live container.
- **Title colour:** the brief asked for `--color-{tone}-strong` text, and the mix deviates from that. Accept the mix, or fix `--color-info-strong` in dark at the token level (repo-wide, out of this slice).
- **Pause scope:** pausing is per toast on hover/focus (and global while the document is hidden). Some systems pause the whole stack on hover instead; this is a product decision.
- **Queue policy:** overflow beyond `max` queues FIFO, so a new toast waits for a slot. The alternative is newest-wins, evicting the oldest.

## Iteration 2 (fixes for VERDICT-sprint1.md, Slice A)
| # | Finding | Fix | Evidence |
|---|---|---|---|
| P1 | A10 / 4.1.3: toasts were inserted into a region that is not live | The always-mounted `<section aria-label="Notifications">` is now `aria-live="polite" aria-relevant="additions"`. The per-toast `role="status"`/`aria-live` is removed. Danger keeps `role="alert"` (plus `aria-atomic`) on the toast itself. | Toast/index.tsx:289-290 (region), :42 (per-toast live props), :20-24 (doc comment); tests Toast.test.tsx:32, :90, :177 |
| P2 | WCAG 2.2.1: action toasts timed out after 5s | `remaining = record.duration ?? (action ? Infinity : defaultDuration)`. An explicit `duration` still applies. | Toast/index.tsx:114; documented at Toast.types.ts:30-37 and in the Toast.stories.tsx docs paragraph (L18); tests Toast.test.tsx:187 (sticky), :195 (explicit duration) |
| P3 | Focus could fall to body after Escape | Focus moves to the next or previous toast. If none is left, it returns to the element focused before entering the region, which is recorded both by F8 and by the region `onFocus` relatedTarget, so Tab-in also works. Only if that element is gone or unfocusable does focus go to the region (tabIndex -1). The `el.blur()` path is removed. | Toast/index.tsx:194-220 (moveFocusFrom; region fallback :219), :291-295 (restore point on Tab-in); tests Toast.test.tsx:277, :291, plus the existing F8/Escape test |

**Why `role="alert"` on the danger toast rather than a second assertive region:**
- Inserting a `role="alert"` element is the one dynamic-insertion pattern that browsers and screen readers announce reliably. It fires a system alert event, so it does not depend on a pre-existing container.
- `alert` implies `aria-live="assertive"` on the element itself. The live root of the inserted node therefore resolves to the alert, not to the polite ancestor, so it is announced once and assertively.
- A second region would have required either moving danger toasts into a separate DOM stack, which breaks chronological visual and Tab order inside one positioned stack, or mirroring their content into a hidden node. Mirroring produces duplicate text for virtual-cursor users, and the visible copy would still be an addition to the polite region.
- **Residual risk:** this needs a manual NVDA/JAWS/VoiceOver smoke test, because the double-announcement behaviour of an alert nested in a polite region cannot be asserted in jsdom.

**Choice on focus-fallback order:** the coordinator listed "region if stack empty" and "previously focused element". I put the previously focused element first and the region last. Returning the user to where they were is the APG-recommended behaviour, and an empty focused region announces nothing useful. Either way focus never reaches `<body>`.

Gates after iteration 2: `npx vitest run` gives 39 files / 371 tests, all passing. The tsc grep for Alert/Toast prints nothing. Alert files are unchanged in this iteration.
