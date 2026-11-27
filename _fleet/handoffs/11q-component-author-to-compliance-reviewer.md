# Handoff: component-author (Sprint 6 Slice Q) -> compliance-reviewer

- **Task:** Sprint 6 Slice Q: OtpBox, Hyperlink and Spinner. Bring them to the canonical structure and add the props listed in `_fleet/handoffs/11-orchestrator-sprint6-brief.md` → "Slice Q".
- **Status:** ready (barrel lines below still have to be wired by the orchestrator)

## Objective
Review the three upgraded atoms (`src/components/atoms/{OtpBox,Hyperlink,Spinner}/`) against `_fleet/QUALITY_CHECKLIST.md` A/B/C and the Slice Q spec, and give a PASS/FAIL verdict per dimension.

## Output format
Add the verdict to `_fleet/VERDICT-sprint6.md` using the checklist's "Verdict format" (Accessibility / Security / Responsiveness: PASS|FAIL, then `[PASS]/[FAIL] Ax …` bullets with file:line, then a ranked fix list naming the owning agent).

## Sources and tools
- Spec: `_fleet/handoffs/11-orchestrator-sprint6-brief.md` (Slice Q) and `_fleet/handoffs/05-orchestrator-sprint1-brief.md` (conventions).
- Code: the files in **Artifacts**. Tokens: `src/design-system/tokens.css`. Href sanitiser: `src/utils/safeHref.ts` (imported, not changed).
- Commands: `npx vitest run src/components/atoms/OtpBox src/components/atoms/Hyperlink src/components/atoms/Spinner` (91 pass); `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "atoms/(OtpBox|Hyperlink|Spinner)"` prints nothing.
- Storybook: Design System/Atoms/{OtpBox,Hyperlink,Spinner}. Check at 375/768/1440 and in the dark theme.
- Do not run `npm run build`.

## Boundaries
- Scope is these three dirs only. Other slices (P, R, S, T) own every other path.
- `src/index.tsx`, `src/entries/*`, `src/portal/*` and `package.json` were not edited (they belong to the orchestrator).
- The 9 tsc errors elsewhere (useRipple, TimePicker.utils, FeedbackStates stories) and the 2 `src/portal/components/dashboardData.test.ts` failures were not caused by this slice. See Open questions.

## Context digest
- **Backward compatibility:**
  - Every existing export, default export and prop name is unchanged: `OtpBoxProps`, `OtpBoxVariant`, `OtpBoxSize`, `HyperlinkProps`, `SpinnerProps`, `SpinnerSize` and `SpinnerTone` still come from the same paths.
  - Hyperlink still defaults `href="#"`.
  - Spinner defaults are unchanged (`ring`, `md`, `current`, size-derived stroke when `thickness` is omitted).
  - `Hyperlink.config.ts` keeps `defaultLinkColor` and `hyperlinkBaseClass` as `@deprecated` exports. `Hyperlink.utils.ts` `cls` is kept.
  - The existing Spinner (7) and Hyperlink (2) tests were kept unedited. The only change was widening the size `it.each` to include `xl`.
- **OtpBox:**
  - Now `forwardRef<OtpBoxHandle>`, exposing `focus(index?)`, `clear()` and `getValue()`. The old component took no ref, so this cannot break callers.
  - Internal state is a fixed-length array of cells, so clearing a middle cell does not shift the later characters. The value emitted is `cells.join("")`. A `value` prop is re-synced only when it differs from that joined string, so controlled echo-back is stable.
  - The new `defaultValue` prop is additive.
  - The first cell no longer has `maxLength=1`. A cap of 1 would block iOS/Android SMS autofill, which writes the whole code into the first field; a multi-character change event is spread across the cells instead.
  - **Behaviour change (a11y fix):** the built-in "Please enter correct OTP" message (`role="alert"`) used to appear and be announced on every keystroke while the code was incomplete. It now appears only after focus leaves the group (`index.tsx:139-140`). An explicit `error` still shows immediately. The message text is configurable via `incompleteMessage`.
  - `pattern` is dropped when `mask` is on (`index.tsx:291`). Before this, a "•" cell value failed `\d*` and blocked native form submission.
  - The old `OtpBoxVariant` values `"outlined"`/`"filled"` are OtpBox's own API, not the legacy Card variant names. They have to stay for backward compatibility.
- **Hyperlink:**
  - Implemented with a local Slot (`Hyperlink.slot.tsx`), modelled on `molecules/Popover/slot.tsx`. It is not imported from there, so the atom has no dependency on a molecule.
  - Security and disabled rules run last in `enforce()` (`index.tsx:106-123`), so neither `...rest` nor an `asChild` child can bring back an unsafe href or a click on a disabled link.
  - When `asChild` is used with `disabled`, the child's (sanitised) `href` is kept, because router `<Link>` components throw without one. Clicks are swallowed, the link gets `tabIndex=-1` and `aria-disabled`, and the child's own `onClick` is replaced.
  - A non-new-tab link no longer renders `target="_self"` / `rel=""`.
  - The inline `style={{color}}` was removed.
- **Spinner:**
  - Thickness, speed and size are pure data-attributes plus CSS custom properties.
  - `delay` uses a timer (cleared on unmount), and the component returns `null` until it fires.
  - dots/bars segments use `forced-color-adjust: none; background: CanvasText`, because forced-colors mode strips background fills.

### Self-check — A. Accessibility
- A1 keyboard:
  - OtpBox Backspace/Delete/←/→/Home/End: `OtpBox/index.tsx:183-238`. Paste distribution: `:128-135`. All cells stay in the Tab order (normal OTP pattern).
  - Hyperlink: native `<a href>`. Disabled links are removed from the tab order: `Hyperlink/index.tsx:111-117`.
- A2 targets:
  - OtpBox cells: md 44px `OtpBox.css:4`, lg 48px `:163`, sm 40px `:154` (above the 24px minimum in WCAG 2.2 SC 2.5.8).
  - Hyperlink `standalone` has `min-height: 24px` (`Hyperlink.css:37`). Other link variants are inline text links, which SC 2.5.8 exempts.
- A3 focus:
  - OtpBox `:focus-visible` outline uses `--color-focus-ring` (`OtpBox.css:64-70`).
  - Hyperlink `:focus-visible` (`Hyperlink.css:68-71`).
- A4 contrast (computed from tokens.css):
  - Link `--color-brand-link` on surface: classic 13.91, dark 5.77, mist 13.33, infinia 6.88, infinia-dark 12.28. `subtle` (`--color-text-secondary`): 6.48 / 6.71 / 6.21 / 9.59 / 11.40.
  - OtpBox error text was switched from `--color-state-error` to `--color-danger-strong`, because state-error on the mist surface is only 4.34. danger-strong measures 7.14 / 7.73 / 6.84 / 6.57 / 9.06.
  - OtpBox cell border was switched from `--color-border-default` to `--color-border-interactive`, because border-default on infinia is only 1.88. border-interactive measures 4.61 / 5.78 / 4.41 / 6.10 / 8.11.
  - Focus ring on surface: 5.57 / 5.77 / violet 5.46 / 6.88.
  - Inline links are always underlined (`Hyperlink.config.ts` `HYPERLINK_DEFAULT_UNDERLINE.inline`, `Hyperlink.css:16`), so colour is not the only cue (SC 1.4.1).
- A5 forms:
  - The OtpBox group has `role="group"` with `aria-labelledby` pointing at the visible label, or falls back to `aria-label` (`index.tsx:316-318`).
  - Each cell has an `aria-label` ("Digit n of N") (`:340`).
  - `aria-invalid` and `aria-describedby` point at the error id (`:341-343`). The error has `role="alert"` (`:295`). `aria-required` is set via `required`.
- A9 motion:
  - OtpBox transitions are disabled under `prefers-reduced-motion` (`OtpBox.css:182`); so is the Hyperlink transition (`Hyperlink.css:93`).
  - Spinner does no rotation or scaling under reduced motion, only a slow opacity pulse (`Spinner.css:145-157`).
- A10 SR semantics:
  - Spinner has `role="status"` plus a visually hidden label, and is `aria-hidden` when `decorative` (`Spinner/index.tsx:56-66`).
  - Hyperlink icons are `aria-hidden` (`index.tsx:28,78,84`). The visually hidden " (opens in new tab)" is at `:89`.
- Forced colors: `OtpBox.css:190`, `Hyperlink.css:97`, `Spinner.css:159-169`.

### Self-check — B. Security
- B1: none of `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function` or `console.*` appears in the three dirs (grep clean).
- Hyperlink sanitises the href with `isSafeHref` after all props are merged (`index.tsx:109`); this also covers `asChild` children. New-tab and external links get `rel` containing `noopener noreferrer`, merged into any `rel` the caller passes (`:120`). Tests cover `javascript:`, `java\tscript:`, `data:` and `vbscript:`.
- B2: OtpBox `mask` shows "•", but the real value is still emitted and placed in the hidden `name` input. Nothing is logged.
- B6: OtpBox uses `autocomplete="one-time-code"` on the first cell or single input and `off` on the other cells (`index.tsx:344,385`).

### Self-check — C. Responsiveness
- C1/C4: at ≤420px OtpBox cells become `flex: 1 1 0; aspect-ratio: 1; max-width: cell-size`, so 8 cells fit in 375px without horizontal scroll (`OtpBox.css:208-234`). The single input is `width: min(…, 100%)`.
- C6: all colours come from tokens, so the dark and mist themes work. Spinner `inverse`/`current` tones are unchanged.
- No fixed width breaks below 375px.

## Failed approaches
- A leading space inside the visually hidden " (opens in new tab)" span works in browsers, but jsdom's `dom-accessibility-api` trims it, so tests see the name "Docs(opens in new tab)". The tests use `/Docs\s*\(opens in new tab\)/` and a comment explains why. Moving the space outside the span would add an underlined visible gap, so it stayed inside.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/atoms/OtpBox/OtpBox.types.ts | new — Variant/Size/Type unions, OtpBoxHandle, OtpBoxProps (+onComplete, defaultValue, autoFocus, name, id, ariaLabel, getCellLabel, incompleteMessage, required) | final |
| src/components/atoms/OtpBox/OtpBox.config.ts | new — defaults, option lists, filter/inputMode/pattern maps | final |
| src/components/atoms/OtpBox/OtpBox.utils.ts | new — filterOtp, toCells, defaultCellLabel | final |
| src/components/atoms/OtpBox/index.tsx | rewritten — forwardRef + imperative handle, cell array state, paste/autofill distribution, keyboard nav, group/cell ARIA, hidden input | final |
| src/components/atoms/OtpBox/OtpBox.css | rewritten — tokens only, inline styles removed, focus-visible, forced-colors, fit-to-375 | final |
| src/components/atoms/OtpBox/OtpBox.stories.tsx | updated — inline px removed; new OnCompleteAndImperativeHandle and InAForm stories | final |
| src/components/atoms/OtpBox/OtpBox.test.tsx | new — 27 tests | final |
| src/components/atoms/Hyperlink/Hyperlink.types.ts | rewritten — extends AnchorHTMLAttributes; variant/underline/size unions; icons, external, asChild, newTabLabel | final |
| src/components/atoms/Hyperlink/Hyperlink.config.ts | rewritten — defaults, per-variant underline map, option lists, deprecated legacy consts | final |
| src/components/atoms/Hyperlink/Hyperlink.slot.tsx | new — local asChild Slot | final |
| src/components/atoms/Hyperlink/Hyperlink.css | new — `.ds-hyperlink` token styles | final |
| src/components/atoms/Hyperlink/index.tsx | rewritten — forwardRef, sanitise, external/new-tab, disabled, asChild | final |
| src/components/atoms/Hyperlink/Hyperlink.stories.tsx | rewritten — Playground + Variants/Underline/Sizes/WithIcons/NewTab/External/Disabled/AsChild | final |
| src/components/atoms/Hyperlink/Hyperlink.test.tsx | extended — 38 tests (2 original kept) | final |
| src/components/atoms/Spinner/Spinner.types.ts | + SpinnerVariant/Thickness/Speed, `xl` size, `delay` | final |
| src/components/atoms/Spinner/Spinner.config.ts | + defaults and option lists | final |
| src/components/atoms/Spinner/index.tsx | + variants, delay hook, data attrs | final |
| src/components/atoms/Spinner/Spinner.css | + dots/bars, thickness, speed, xl, reduced-motion, forced-colors | final |
| src/components/atoms/Spinner/Spinner.stories.tsx | + Variants/Thickness/Speeds/Delayed | final |
| src/components/atoms/Spinner/Spinner.test.tsx | extended — 26 tests (7 original kept) | final |
| src/components/atoms/Hyperlink/Hyperlink.utils.ts | unchanged (still used) | final |

## Barrel exports needed
Keep the existing lines (`src/index.tsx:95,128,137,352,353,383`) and replace or add the type exports as follows:
```ts
// values: unchanged
export { default as OtpBox } from "./components/atoms/OtpBox";
export { default as Hyperlink } from "./components/atoms/Hyperlink";
export { default as Spinner } from "./components/atoms/Spinner";

// types: replace lines 352, 353, 383 with
export type { HyperlinkProps, HyperlinkVariant, HyperlinkUnderline, HyperlinkSize } from "./components/atoms/Hyperlink";
export type { OtpBoxProps, OtpBoxVariant, OtpBoxSize, OtpBoxType, OtpBoxHandle } from "./components/atoms/OtpBox";
export type { SpinnerProps, SpinnerSize, SpinnerTone, SpinnerVariant, SpinnerThickness, SpinnerSpeed } from "./components/atoms/Spinner";
```
(`./components/atoms/Hyperlink/Hyperlink.types` still exports `HyperlinkProps`, so the current line 352 keeps working if it is left as it is.)

## Acceptance criteria
- `npx vitest run src/components/atoms/OtpBox src/components/atoms/Hyperlink src/components/atoms/Spinner` → 3 files, 91 tests pass (also run with LoadingOverlay and CommandPalette, which consume Spinner: 146 pass).
- Full `npx vitest run` → 1842 pass, 2 fail, both in `src/portal/components/dashboardData.test.ts`, caused by other slices' new story dirs (see Open questions).
- tsc on the slice paths prints nothing.
- Verdict file written with file:line evidence per A/B/C item.

## Open questions
1. `src/portal/components/dashboardData.test.ts` fails on "component folders per layer" (28 vs 26) and on the gallery inventory: new stories from AvatarGroup, Rating, DashboardShell, FeedbackStates, TagInput, TimePicker and Timeline are missing from the gallery (slices P/S/T). The orchestrator needs to run `npm run portal:stats` and update the gallery after wiring. This slice added no new story titles.
2. Product call: is the OtpBox incomplete-message timing change (on blur instead of per keystroke) acceptable as an a11y fix? It changes visible behaviour.
3. Hyperlink `asChild` + `disabled` keeps the child's href (needed for router links). Confirm this is acceptable over removing it.

## Iteration 2 (2026-11-27): fix for P2 from `_fleet/VERDICT-sprint6.md`
- **Finding:** with `asChild`, Hyperlink replaced any non-string href with `undefined`. That broke Next.js `<Link href={{ pathname, query }}>`.
- **Fix:** `sanitizeHref` (`src/components/atoms/Hyperlink/index.tsx:19`) now handles three cases:
  - String hrefs are checked with `isSafeHref`, as before.
  - URL objects are passed to the child unchanged, unless their `href` or `pathname` string, or their `protocol` (normalised to end in `:`), fails `isSafeHref`. In that case the whole href is dropped.
  - Any other type is dropped.
  - The plain `<a>` path is unchanged: `href` is still typed `string`, so a URL object can only arrive via `asChild`.
- **Tests:** 5 new tests in `Hyperlink.test.tsx` (asChild block), using a stand-in that behaves like Next.js `<Link>`:
  - An object href reaches the child and serialises to `/reports?year=2026`.
  - An object with an unsafe `pathname`, `href`, `protocol: "javascript"` or `protocol: "data:"` is dropped.
- **Results:**
  - Slice dirs: 96/96 pass. tsc on the slice paths prints nothing.
  - Full `npx vitest run`: 1953 pass, 4 fail. None of the failures are in Slice Q files:
    - `src/portal/components/dashboardData.test.ts`: package-version growth stat, needs `npm run portal:stats`.
    - `DatePicker.test.tsx` Escape-in-Drawer (Slice R or T).
    - `Rating.test.tsx` (Slice S).
  - A rerun of those three files alone gave a different set of failures (portal growth plus a different Rating test; DatePicker passed). Those files are probably still being edited, or the tests are flaky. Their owners should look.
