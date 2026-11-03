# Handoff: component-author (agent H, Sprint 3) -> compliance-reviewer

- **Task:** Slice H: build `SegmentedControl` and `Wizard` (brief `_fleet/handoffs/07-orchestrator-sprint3-brief.md`, conventions `05-orchestrator-sprint1-brief.md`)
- **Status:** ready

## Objective
Review `src/components/molecules/SegmentedControl/` and `src/components/molecules/Wizard/` against `_fleet/QUALITY_CHECKLIST.md` (A accessibility, B security, C responsiveness) plus the Sprint 3 Slice H spec, and return a PASS or FAIL verdict with reproducible evidence.

## Output format
Add a Slice H section to `_fleet/VERDICT-sprint3.md` with one PASS/FAIL line per dimension (A, B, C). Give each defect a severity (P1/P2/P3) and evidence (`file:line` or a command and its output). Label optional or style notes as such.

## Sources and tools
- Code: `src/components/molecules/SegmentedControl/{SegmentedControl.types.ts,SegmentedControl.config.ts,index.tsx,SegmentedControl.css,SegmentedControl.stories.tsx,SegmentedControl.test.tsx}`
- Code: `src/components/molecules/Wizard/{Wizard.types.ts,Wizard.config.ts,index.tsx,Wizard.css,Wizard.stories.tsx,Wizard.test.tsx}`
- Composed (not edited): `src/components/molecules/Stepper/`, `src/components/molecules/Alert/`, `src/components/atoms/Button/`. FormField and Input are used in the stories only.
- Commands: `npx vitest run src/components/molecules/SegmentedControl src/components/molecules/Wizard` gave 33/33. The full `npx vitest run` gave 573/573 across 48 files; this count includes the parallel slices G and I. `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -E "SegmentedControl|Wizard"` printed nothing.
- Stories: `Design System/Molecules/SegmentedControl`, `Design System/Molecules/Wizard`. Check them at 375, 768 and 1440 px, in the dark theme, and with forced colours emulated.

## Boundaries
- Out of scope: the `src/index.tsx` barrel (the orchestrator wires it), `dist/`, `.storybook/`, `package.json`, Slices G and I, and fixes inside Stepper, Alert and Button. Defects in those are listed below and were not fixed.
- Stop after one verdict for Slice H. Do not edit the component files. Route fixes back to component-author.

## Context digest
- **SegmentedControl:** an APG radio group. The root is `role="radiogroup"` with a required `ariaLabel` (index.tsx:161). Each option is a `<button role="radio" aria-checked>` with a roving `tabIndex` (index.tsx:206-208). The tab stop is the selected option if it is enabled, otherwise the first enabled option. Arrow keys move focus and select. They wrap and skip disabled options, and horizontal arrows flip under computed `direction: rtl` (index.tsx:86-122). Home and End jump to the first and last enabled options. `onValueChange` does not fire when the user re-selects the current value.
- **SegmentedControl heights:** segments are 36px for sm and 40px for md (`calc(var(--space-5) - var(--space-0))` and `var(--space-5)`, css:9 and css:26), and 44px on `pointer: coarse` (css:29-33). The track adds 2px padding, so the outer height is 40px or 44px. This does not reuse the Tabs segmented CSS.
- **SegmentedControl indicator:** the sliding indicator is a decorative `<span aria-hidden>` positioned from the selected segment's offset box. It is re-measured on layout and through `ResizeObserver` (index.tsx:130-147). Until it has been measured (SSR, first paint, hidden container), the selected segment draws its own surface (css:140). The indicator has no transition under reduced motion (css:149). In forced-colours mode the indicator is hidden, and the selected segment gets a `Highlight` background, `HighlightText` text and a 2px `Highlight` outline. Focus there uses a `CanvasText` outline (css:157-181).
- **SegmentedControl focus rescue:** if the focused option becomes disabled, focus moves to the new tab stop (index.tsx:149-156). The blur handler keeps the "focus within" flag only when the blurring element is now disabled. This avoids stealing focus after an ordinary blur.
- **Wizard composition:** composes `Stepper` and `StepperStep`. It passes `linear={false}` to Stepper and does the gating itself with the per-step `disabled` prop: a step is disabled when `linear && i > furthest reached`. This means a step the user has already reached can still be clicked forward after going back, which Stepper's own `linear` prop does not allow. A forward jump in linear mode validates the steps in between first (index.tsx:176-185). Back and non-linear jumps do not validate.
- **Wizard focus:** every step change focuses the single `<h2 tabIndex=-1>` heading, which reads "Step x of y" plus the title (index.tsx:89-94 and :251). The check compares against the previous index, so focus is not stolen on mount and the code is safe under StrictMode. A validation failure (false, a string, or a throw/rejection) renders `<Alert variant="danger" live="assertive">` (role=alert). Its `key` changes on each failure so repeated failures are announced again. The heading is also focused (index.tsx:118-123, :262). Finish validates every step in order and jumps to the first failing step.
- **Wizard async validation:** while an async validator runs, the panel is `aria-busy` and a ref guard ignores re-entrant clicks. Next is deliberately not disabled, so focus is not dropped. Stale results are discarded after Back or unmount.
- **Wizard actions and loading:** there is exactly one `variant="primary"` button (Next or Finish), and Back is `outlineSecondary` (index.tsx:298-308). While `loading`, Button's `loading` sets native `disabled`, which would drop focus, so focus is moved to the heading (index.tsx:101-108). An sr-only `role="status"` announces "Submitting…" (index.tsx:314).
- **Wizard content and review:** inactive step content stays mounted with `hidden`, so uncontrolled fields keep their values. The review step is an `<ol>` with one "Edit" `Button variant="link"` per step. Its accessible name is "Edit {title}" through an sr-only span.

### Self-check (QUALITY_CHECKLIST A / B / C)
- **A keyboard:** SegmentedControl index.tsx:86-122 (arrows, Home, End, roving tabindex at :208). For Wizard, all controls are native buttons and the heading takes programmatic focus at index.tsx:93, :97 and :105.
- **A focus ring:** `--color-focus-ring` is used directly at SegmentedControl.css:88 and Wizard.css:46. Forced-colours outlines are at SegmentedControl.css:166-176 and Wizard.css:153-156.
- **A roles and names:** radiogroup and radio with aria-checked at SegmentedControl index.tsx:161 and :206-207. In Wizard, a `role=group` panel labelled by the heading and described by the description (index.tsx:246-249), the Stepper `nav` named "Progress", Alert role=alert (index.tsx:262), and the polite status (index.tsx:314).
- **A targets:** segments are at least 36px (sm) and 40px (md), and 44px on coarse pointers (SegmentedControl.css:9, :26, :29-33). Wizard footer Buttons use the default `lg` (38px), which passes WCAG 2.5.8 (24px minimum).
- **A contrast:** numbers are below.
- **A motion:** SegmentedControl.css:149 (reduced motion). Wizard has no animation of its own.
- **B security:** no `dangerouslySetInnerHTML`, `eval`, `new Function`, inline HTML handlers or `href` in either directory (grep is clean). Validator errors are rendered as React text. A thrown validator error message is not shown to the user; the default message is shown instead (Wizard.config.ts runValidator).
- **C responsive:** SegmentedControl has `max-width:100%`, segments with `min-width:0`, and labels that wrap with `overflow-wrap:anywhere` (css:15, :110). The `NarrowViewport` story shows 5 options at 343px. Wizard has a full-width column, Stepper's own narrow horizontal scroll, `scrollable` turned on when there are more than 5 steps, footer actions that share the row equally at ≤ 480px (Wizard.css:141), and review items that wrap (`flex: 1 1 12rem`).

### Contrast (computed from tokens.css, WCAG relative luminance)
| Pair | classic | mist / blue-mist / green-mist | dark |
|---|---|---|---|
| Seg unselected label `--color-text-secondary` / track `--color-fill-muted` | 5.95 | 4.91 | 4.71 |
| Seg selected label `--color-text-primary` / `--color-bg-surface` | 19.44 | 18.62 | 13.34 |
| Seg selected-indicator edge `--color-text-secondary` / track (1.4.11) | 5.95 | 4.91 | 4.71 |
| Focus ring / track `--color-fill-muted` | 5.11 | 4.22 / 4.32 / 4.06 | 4.05 |
| Focus ring / `--color-bg-surface` | 5.57 | 5.33 / 5.46 / 5.13 | 5.77 |
| Focus ring / `--color-bg-page` | 4.22 | 4.75 / 4.87 / 4.58 | 6.98 |
| Wizard counter, description and summary `--color-text-secondary` / surface | 6.48 | 6.21 | 6.71 |
| Same / `--color-bg-page` | 4.91 | 5.54 | 8.10 |

I rejected `--color-border-default` as the edge of the selected indicator. Against the track it is 2.62 in mist and 2.37 in dark, both below 3:1.

## Failed approaches
- I first put the "Edit" sr-only suffix as `<span> {title}</span>`. The computed accessible name became "EditTeam" with no space, so the space is now a separate `{" "}` text node.
- Making the coarse-pointer height override a bare `.ds-segmented` rule lost on specificity to `[data-size="md"]`, so md stayed at 40px on touch screens. The rule now lists both selectors (css:29-33).
- The first version of the mount-focus guard used a `firstRender` flag. That flag would steal focus under StrictMode's double-invoked effects, so it was replaced with a check against the previous index.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/components/molecules/SegmentedControl/SegmentedControl.types.ts | props, option and size types | final |
| src/components/molecules/SegmentedControl/SegmentedControl.config.ts | defaults and key maps | final |
| src/components/molecules/SegmentedControl/index.tsx | component (forwardRef, displayName) | final |
| src/components/molecules/SegmentedControl/SegmentedControl.css | tokens, reduced motion, forced colours | final |
| src/components/molecules/SegmentedControl/SegmentedControl.stories.tsx | Playground, Sizes, WithIcons, FullWidth, DisabledOption, Controlled, NarrowViewport | final |
| src/components/molecules/SegmentedControl/SegmentedControl.test.tsx | 15 tests | final |
| src/components/molecules/Wizard/Wizard.types.ts | WizardProps, WizardStep, WizardValidationResult, WizardHeadingLevel | final |
| src/components/molecules/Wizard/Wizard.config.ts | defaults, `toValidationError`, `runValidator` | final |
| src/components/molecules/Wizard/index.tsx | component | final |
| src/components/molecules/Wizard/Wizard.css | layout, focus, forced colours, ≤ 480px footer | final |
| src/components/molecules/Wizard/Wizard.stories.tsx | Playground, WithoutReview, NonLinear, Controlled, FinishLoading, Mobile (FormField + Input + sync/async validation) | final |
| src/components/molecules/Wizard/Wizard.test.tsx | 18 tests | final |

## Barrel exports needed
```ts
export { default as SegmentedControl, SEGMENTED_CONTROL_DEFAULTS, SEGMENTED_CONTROL_SIZES } from "./components/molecules/SegmentedControl";
export type { SegmentedControlProps, SegmentedControlOption, SegmentedControlSize } from "./components/molecules/SegmentedControl";
export { default as Wizard, WIZARD_DEFAULTS } from "./components/molecules/Wizard";
export type { WizardProps, WizardStep, WizardValidationResult, WizardHeadingLevel } from "./components/molecules/Wizard";
```

## Defects found in composed components (reported, not fixed)
1. **Button `loading` sets native `disabled`** (`src/components/atoms/Button/index.tsx:183`, `:248`). A focused button that goes busy drops focus to `<body>`, and the button has no `aria-busy`. Wizard works around this (index.tsx:101-108). A better fix is `aria-disabled` plus a click guard while loading. Button is also `React.memo`, not `forwardRef`, so consumers cannot ref it.
2. **Stepper adds `aria-posinset` and `aria-setsize` to a `<button>`** (`src/components/molecules/Stepper/index.tsx:154`). These attributes are not allowed on the button role, so axe may flag `aria-allowed-attr`.
3. **Stepper's label block is a click-only `<div onClick>`** (`Stepper/index.tsx:247-248`). It is a mouse-only target with no role. The marker button next to it covers keyboard access, so the impact is low (P3).
4. **Dark theme does not override `--color-border-strong`** (`src/design-system/tokens.css:350`). It stays `#0d0d0d`, which is close to invisible on dark surfaces. I avoided this token for that reason.

## Acceptance criteria
- SegmentedControl: `role=radiogroup` named by `ariaLabel`; radios have `aria-checked` and a roving tabindex; arrows move and select; Home and End work; disabled options are skipped; segment heights are at least 36px (sm) and 40px (md); the indicator honours reduced motion; forced-colours mode outlines the selected item.
- Wizard: composes Stepper, Alert and Button; any step change focuses the new heading; a validation failure shows an assertive Alert and focuses the heading; only one primary button is shown; `showReview` Edit links jump back with focus on the heading; `loading` keeps focus; linear and non-linear modes plus controlled and uncontrolled modes all work.
- The full vitest suite is green and tsc prints nothing for these paths.

## Open questions
- `onComplete` is fire-and-forget. The consumer owns `loading`. Should Wizard manage loading itself when `onComplete` returns a Promise? I left this out of scope.
- Should SegmentedControl support icon-only options with a per-option `ariaLabel`? It is not in the spec and has not been added.
- The pre-measurement fallback uses `box-shadow: inset 0 0 0 1px var(--color-text-secondary)` (SegmentedControl.css:140) to draw a token-coloured edge, not a shadow token. Please confirm this is acceptable.

## Iteration 2 (2026-11-03)

**Storybook crash fixed.** `wizard--controlled` threw "RangeError: Maximum call stack size exceeded" in `safeSortObject`. That is Storybook's JSX source serializer walking the `steps` prop, which the render returned inline. The render now returns `<ControlledDemo {...args} />`, so only args reach the serializer (`Wizard.stories.tsx` `ControlledDemo`). I applied the same wrapper to `SegmentedControl.stories.tsx` `Controlled`, and every other Wizard story already returns `<Demo {...args}/>`.
- **Browser check:** I verified with headless Chrome over CDP (Runtime.exceptionThrown and console error/warn captured, 7s per story). All 15 story iframes (Wizard ×7 and SegmentedControl ×8, including the new ones) and both docs pages load with no error display, no exceptions and no console errors.

**Enhancement 1: icon-only SegmentedControl options.**
- **API:** `SegmentedControlOption.ariaLabel?: string` (types).
- **Accessible name:** when set, `ariaLabel` becomes the radio's `aria-label` (index.tsx:234).
- **Dev warning:** a label that is not a non-empty string or a number, with no `ariaLabel`, triggers a dev-only `console.warn`, once per option value (index.tsx:~132-146).
- **Styling:** icon-only segments get `data-icon-only` (index.tsx:239) and a square minimum footprint of `min-width: var(--ds-seg-height)` (css:99).
- **Coverage:** new story `IconOnly` and 3 new tests.

**Enhancement 2: Promise-driven Wizard loading.**
- **API:** `onComplete` may now return a Promise.
- **Internal loading:** when the `loading` prop is undefined, the wizard sets internal loading (index.tsx:76, :172). The Finish spinner shows, focus moves to the heading, the status announces "Submitting…", and everything clears when the Promise settles.
- **Rejection:** a rejected Promise also clears loading and logs a dev `console.error`, so there is no unhandled rejection.
- **Precedence:** a controlled `loading` (even `false`) takes precedence.
- **Coverage:** new story `AsyncComplete` and 4 new tests.

**Flake fixed.** Running the suite repeatedly exposed an intermittent failure: "works controlled" failed about once in 12 runs. A passive `useEffect` focused the heading after `waitFor` had already observed the new text. The heading-focus effects (step change, validation failure and the loading rescue) are now `useLayoutEffect` (index.tsx:100, :106, :112). Focus now moves in the same commit as the step change, which is also correct in browsers.
- **Results after the fix:** the slice suites passed 15 runs in a row (40/40 each). Vitest 4 has no `--repeat` CLI flag, so I ran them in a shell loop.
- **Full suite:** `npx vitest run` gave 703/703, including the parallel slices. One earlier run showed 2 DateRangePicker failures; those come from slice G's work in progress, not from Slice H. `tsc` grep for my paths printed nothing.

**Barrel exports:** unchanged from above. `SegmentedControlOption` already carries `ariaLabel`.
