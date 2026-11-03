# Compliance verdict — Sprint 3 (advanced inputs & flows)

- **Reviewer:** compliance-reviewer (read-only; this file and the LEDGER row are the only writes)
- **Date:** 2026-11-03
- **FINAL:** G PASS · H PASS · I PASS → **Sprint 3 ships** (see "Final round").
- **Brief:** `_fleet/handoffs/07-orchestrator-sprint3-brief.md`; handoffs `07g` (DateRangePicker, NumberInput), `07h` (SegmentedControl, Wizard), `07i` (CommandPalette, Kbd)

**Iteration 1 (history):**

| Slice | Accessibility | Security | Responsiveness | Result |
|---|---|---|---|---|
| G — DateRangePicker, NumberInput | **FAIL** (1 × P2) | PASS | PASS | back to component-author G: 1 a11y P2 + 1 functional P2 |
| H — SegmentedControl, Wizard | PASS* | PASS | PASS | PASS, **pending** the Wizard "Controlled" story crash fix (*Stepper axe failures are escalated, out of scope) |
| I — CommandPalette, Kbd | PASS | PASS | PASS | PASS |

# Final round — slice G iteration 2, slice H iteration 2, Stepper fix (2026-11-03)

| Slice | Accessibility | Security | Responsiveness | Result |
|---|---|---|---|---|
| G — DateRangePicker, NumberInput | PASS | PASS | PASS | **PASS** |
| H — SegmentedControl, Wizard | PASS | PASS | PASS | **PASS** (story crash resolved) |
| I — CommandPalette, Kbd | PASS | PASS | PASS | PASS (unchanged) |

**→ Sprint 3 ships.** Only optional P3 notes remain.

**Evidence**
- `npx vitest run`: **703 passed**, twice in a row with no flake. tsc is clean for all Sprint 3 paths plus Stepper.
- Harness, 62 cases plus a mobile DRP case:
  - **axe on every story** of the 6 Sprint 3 components and all 8 Stepper stories: **0 violations.** The Wizard `aria-allowed-attr` critical is gone. The only hit was my own test markup (a `contenteditable` div with an `aria-label`).
  - Every earlier repro re-run.

## Slice G
- [PASS] The DRP trigger no longer carries `aria-required`. FormField wiring: `aria-labelledby` = label + value, describedby hint + error, `aria-invalid`, no broken IDREFs. The InFormField story is axe-clean.
- [PASS] NumberInput malformed input (en-US, field value 7):

  | Typed | While typing | onChange | After blur |
  |---|---|---|---|
  | `1,2345` | text kept, `aria-invalid="true"` | none | reverts to 7 |
  | `1,234,5` | text kept, `aria-invalid="true"` | none | reverts to 7 |
  | `1-2` | text kept, `aria-invalid="true"` | none | reverts to 7 |
  | `--5` | text kept, `aria-invalid="true"` | none | reverts to 7 |
  | `-5` with `allowNegative={false}` | `aria-invalid="true"` | — | clamps to **0**, or to **3** with `min={3}` |

  Still accepted, as documented heuristics: `1,5` → 1.5, `12,34` → 12.34, `1,234` → 1234, and trailing-minus `5-` → −5. The full parse table is otherwise unchanged from iteration 1.
- [PASS] **Mobile popover portalled.** With matchMedia ≤ 640px, inside a bottom `Sheet`:
  - The popover's parent is `<body>`, outside the transformed panel.
  - Focus lands on today inside it, and the Drawer ownership guard allows it (React-tree portal).
  - Clicks inside don't count as outside (`index.tsx:270-271`).
  - Picking two days fires `onChange` once, closes, and focuses the trigger. The drawer stays open. axe 0.
- [PASS] Escape inside a Drawer still closes only the picker first (drawer 0 → 1 on the second Escape).
- Docs note about `overflow: hidden` ancestors: accepted as the desktop mitigation (open question 1 stays a P3 follow-up).

## Slice H
- [PASS] The "Controlled" stories render, and all Wizard and SegmentedControl stories are axe-clean in the harness (coordinator: 15 iframes load with no errors in Chrome).
- [PASS] SegmentedControl per-option `ariaLabel` becomes the radio's name (`SegmentedControl/index.tsx:234`), with a dev warning for non-text labels lacking it (`:134-145`). The `IconOnly` story is axe-clean.
- [PASS] Wizard: an `onComplete` thenable sets internal loading until it settles, and controlled `loading` wins (`Wizard/index.tsx:165-183`). Validation Alert plus heading focus re-verified: `role="alert"` "Error: Check this step / Name is required", focus on the `H2` "Step 1 of 2 Account".
- [OPTIONAL, P3] An `onComplete` rejection only logs `console.error` (`Wizard/index.tsx:176-181`). Consider showing the danger `Alert` and focusing the heading, as validation failures do, so screen-reader users learn that submission failed.

## Stepper change (coordinator)
- [PASS] No `aria-posinset`/`aria-setsize` on `<button>` in any of the 8 Stepper stories. The marker button's `aria-labelledby` = a hidden position element plus the label block, which resolves to "Step 1 of 4, completed: Cart …" (`Stepper/index.tsx:197,241-261`). axe is clean in Stepper and in every Wizard story.
- [OPTIONAL] The label block concatenates title and description ("Cart" + "Review items"). Both are flex-column children, so browsers separate them, but adding a trailing `", "` or a separate `aria-describedby` for the description would make the name/description split explicit.

## Final ranked fix list (all optional, non-blocking)
- [component-author G] P3 — portal the desktop DRP popover too (open question 1)
- [component-author H] P3 — surface `onComplete` rejection as an Alert plus heading focus
- [component-author I] P3 — capture-phase ownership guard (shared with Drawer)
- [component-author] P3 — Stepper description via `aria-describedby`

Escalated items stay out, unchanged:
- Button `loading` focus / `aria-busy`
- dark `--color-border-strong`
- FormField CSS side-loading

---

## Evidence run
| Check | Result |
|---|---|
| `npx vitest run` | **661 passed / 51 files** on 4 runs, including 2 under extra tsc CPU load. **One** earlier run, made while tsc ran concurrently, reported 1 failed / 660 passed. I could not reproduce it or capture the test name, so treat it as a possible timing-dependent flake (several suites use timers: press-and-hold, announce delay, debounce). Optional: producers run `npx vitest run --repeat 5` on their slices. |
| tsc for the new paths | clean |
| Barrel `src/index.tsx:118-123,328-333` | resolves (all value exports imported in the harness) |
| axe-core 4.11.1 (jsdom, `color-contrast` off) on **every story** of the 6 components (`composeStories`; none crashed in the harness, so the Wizard "Controlled" crash is Storybook-args-only) plus 9 open-state cases | violations: **DRP InFormField `aria-allowed-attr`** (slice G, below), and **Wizard ×7 stories `aria-allowed-attr`** from Stepper's `aria-posinset`/`aria-setsize` on `<button>` (escalated Stepper item, out of scope). Everything else clean. |
| Behaviour probes (scratch harness) | FormField wiring, DRP-in-Drawer Escape, palette over Modal/Drawer, hotkey in inputs, `aria-activedescendant`, ownership guard, SegmentedControl keys, Wizard validation, NumberInput parse table — below |
| Contrast | All 7 themes parsed from `tokens.css`. Every new text pair ≥ 4.5:1, non-text ≥ 3:1 (below). |
| Security grep (`dangerouslySetInnerHTML\|innerHTML\|eval(\|new Function`, hex in CSS) | clean |
| 375px | Coordinator's Chrome evidence (36 stories docW ≤ 375; DRP popover 8..363; palette 0..371 full-screen with focus inside). Static CSS review agrees. |

## Contrast (all 7 themes; minimum across themes)
| Pair | Min ratio | Theme |
|---|---|---|
| SegmentedControl unselected text / indicator border (`text-secondary` on `fill-muted` track) | 4.71 | dark |
| Kbd text (`text-secondary` on `fill-muted`) | 4.71 | dark |
| CommandPalette active option: label / description / ring on the 8% mix | 10.60 / 5.24 / **4.33** | dark / mist / green-mist |
| NumberInput border / error border on surface | 3.31 / 4.34 | mist |
| DRP ring vs inner `bg-elevated` band / vs `fill-muted` range neighbours | 5.36 / 4.05 | green-mist / dark |
| DRP selected day (`bg-elevated` on `text-primary`) | ≥ 13.34 | dark |

## Slice G — DateRangePicker, NumberInput
### Accessibility: FAIL
- [PASS] A5 FormField integration (both). Harness with hint + error + required:
  - **DRP:** `label for` → the trigger `<button>`, `aria-labelledby` = field label + value id, `aria-describedby` = hint + error, `aria-invalid="true"`.
  - **NumberInput:** `label for` → the `<input role="spinbutton">`, describedby / invalid / required set, `aria-valuenow=5`, `aria-valuetext=5`.
  - No broken IDREFs.
- [FAIL] A5/ARIA — **`aria-required` on the DRP trigger `<button>` is not allowed** (axe `aria-allowed-attr`, critical, on the `InFormField` story: `ARIA attribute is not allowed: aria-required="true"`). Set at `src/components/molecules/DateRangePicker/index.tsx:454`. Assistive tech ignores it on a button, so "required" relies on the label's sr text. Fix: don't set `aria-required` on the trigger. Inside a FormField the label already contains sr " required", and the name comes from `aria-labelledby` (label + value). Outside a FormField, append the same sr " required" text to the DRP's own label. Keep `aria-invalid`, which is global.
- [PASS] A1/A7 DRP popover: `role="dialog"` + `aria-modal="true"` + `aria-label`, with a Tab trap (`index.tsx:327`), `aria-haspopup="dialog"` / `aria-expanded` / `aria-controls` on the trigger (`:448-450`), a polite selection announcer (`:558`) and focus on open (harness: "Tuesday, November 3, 2026, today").
- [PASS] **Overlay stack, DRP inside a Drawer:** the first Escape closes only the picker and returns focus to the trigger; the second closes the drawer (`drawerClose` 0 → 1) (`index.tsx:231-250`). In-tree rendering keeps focus inside the Drawer's panel.
- [PASS] **Two-tone day ring** (`DateRangePicker.css:358-369`): `--color-focus-ring` outline plus an inner `--color-bg-elevated` border. The ring is ≥ 5.36:1 against that band and ≥ 4.05:1 against `fill-muted` range neighbours in every theme. In green (ring = `#0d0d0d` = selected fill) the band separates them. forced-colors maps the selection to Highlight (`:425-436`).
- [PASS] NumberInput `role="spinbutton"`, `aria-valuenow/min/max/valuetext`, `aria-readonly`, and Arrow / Shift / PageUp / PageDown / Home / End (`src/components/atoms/NumberInput/index.tsx:261-290,354-369`). The steppers have `aria-label` + `aria-controls` (`:384-398`).

### Functional (stated requirement: "parse locale-formatted input"): FAIL — P2
- **NumberInput silently changes magnitude or sign on malformed input instead of rejecting it.** Harness, `parseLocaleNumber` (`src/components/atoms/NumberInput/NumberInput.utils.ts:134-207`) and the component in en-US:

  | Typed | Result | Expected |
  |---|---|---|
  | `1,2345` | **1.2345** (displays `1.235`) | NaN (bad grouping), or 12345 |
  | `1,234,5` | **12345** | NaN |
  | `1-2` | **−12** (parse); the component emits **12** with `allowNegative={false}` | NaN |
  | `-5` with `allowNegative={false}` | onChange(**5**), a silent sign flip | clamp to 0/min, or reject |
  | `12,34` (en-US) | 12.34 | ambiguous — see below |

  Correct cases: `1.234,56` de-DE → 1234.56; `1 234,5` fr-FR (both NBSP variants) → 1234.5; `(5)` → −5; `−5` (U+2212) → −5; `25%` → 0.25; `$1,234.50` → 1234.5; `1.2K` → 1200; Arabic-Indic `١٢٣` → 123; `1’234.5` de-CH → 1234.5; en-IN `1,23,456` → 123456; `1e3`/`0x10`/`Infinity` → NaN; empty → null.

  Fix:
  1. Return `NaN` (so the field reverts on blur) when a group separator is followed by anything other than exactly 3 digits in a grouping position, unless it is the single-separator decimal heuristic.
  2. Restrict that heuristic to 1–2 trailing digits (`1,5`, `10,25`) and document it.
  3. Accept a minus only as a leading or trailing sign, never interior, and only once.
  4. With `allowNegative={false}`, treat a typed minus as invalid (or clamp to `min`) rather than dropping it.

  Add these strings to `NumberInput.utils.test.ts`.

### Security: PASS
- No XSS sinks; `Intl` only; no `eval`. Input is `type="text"` with `inputMode="decimal"`, rendered through React.

### Responsiveness: PASS
- DRP: 1 month at ≤ 640px, docked to the bottom with `position: fixed` and `--z-modal`; presets wrap at ≤ 900px; the right-edge flip (`index.tsx:276-284`). Coordinator's Chrome check at 375px: popover 8..363.
- [MANUAL CHECK, not a defect] At ≤ 640px the docked popover is `position: fixed` **inside** the Drawer panel. Drawer's keyframes leave `transform: translateX(0)` applied (`animation-fill-mode: both`, `Drawer.css:37-39`), which makes the panel the containing block. Inside a bottom `Sheet` (or a `sm` side drawer) the "docked" popover would anchor to the panel rather than the viewport. Please check the DRP inside a bottom Sheet at 375px.

## Slice H — SegmentedControl, Wizard
### Accessibility: PASS (Stepper items escalated)
- [PASS] SegmentedControl: `role="radiogroup"` named by `ariaLabel`, `role="radio"` + `aria-checked`, roving tabindex (harness: `List:true:0 Board(disabled):false:-1 Grid:false:-1`). ArrowRight moves **and** selects, skipping the disabled option (`onValueChange("c")`); Home works; RTL flip (`src/components/molecules/SegmentedControl/index.tsx:86-122,161,206-208`). Heights 36 / 40px, 44px on coarse pointers (css:9,26,29-33). Reduced motion and forced-colors Highlight selection plus outline (css:149,157-181).
- [PASS] Selected-state contrast: the indicator border (`text-secondary` on the track) is ≥ 4.71:1 and the text weight/colour also changes, so the state isn't carried by the low-contrast surface pill alone.
- [PASS] Wizard: a validation failure renders `Alert` `role="alert"` ("Error: Check this step / Name is required") and focuses the `<h2 tabIndex=-1>` "Step 1 of 2 Account" (harness). Moving between steps focuses the new heading. There is one primary button, Back is `outlineSecondary`, the review "Edit {title}" names are set, and the async validator guard and `aria-busy` are in place (`src/components/molecules/Wizard/index.tsx:89-123,251-262,298-314`).
- [ESCALATED, out of scope] axe `aria-allowed-attr` (critical) on every Wizard story: `aria-posinset` / `aria-setsize` on Stepper's `<button class="ds-stepper__marker-btn">`. This is the queued "Stepper ARIA on `<button>`" item. Wizard inherits it and does not add it.
- **PENDING:** the Wizard "Controlled" story stack overflow (Storybook `safeSortObject` args hashing). It is story-only: the component renders in `composeStories` without error. Re-check when slice H lands it.

### Security: PASS · Responsiveness: PASS
- No sinks. SegmentedControl `fullWidth`/wrap and the Wizard `Mobile` story are covered by the coordinator's 375px evidence.

## Slice I — CommandPalette, Kbd
### Accessibility: PASS
- [PASS] **`aria-activedescendant` validity.** Harness:
  - Initially it points to a mounted `role="option"` ("Open file").
  - ArrowDown → "Settings".
  - With the query "open", ArrowDown skips the disabled "Open folder" and wraps to "Open file".
  - With no results ("zzz"), `aria-activedescendant` is **absent**, `aria-expanded="false"`, and there are no broken IDREFs; the listbox is `hidden` so `aria-controls` still resolves.
  - Code: `src/components/molecules/CommandPalette/index.tsx:206-210`.
- [PASS] **Hotkey in inputs:** Ctrl+K inside `<input>`, `<textarea>` and `contenteditable` does **not** open it; from a button it does (`index.tsx:239-260`).
- [PASS] **Over a Modal:** the palette opens with focus in its input. The ownership guard pulls focus back from the Modal's button to the input. One Escape closes only the palette (`modalClose=0`), and focus returns to the Modal button (`index.tsx:270-296,323-331`).
- [PASS] **Over a Drawer:** one Escape closes only the palette (`drawerClose=0`) and focus returns to the drawer's previously focused Close button.
- [PASS] Live count is debounced (500ms), with nothing announced on open with an empty query, "Loading results…" while pending, and `aria-busy` on the listbox (`index.tsx:221-238`).
- [PASS] Kbd: nested `<kbd>` per key, glyphs `aria-hidden` with spoken text, SSR-safe platform (`src/components/atoms/Kbd/index.tsx:58-69`, `Kbd.utils.ts:23`).
- [INHERITED, P3] The ownership guard has the same narrow bypass as Drawer (Sprint 1 iteration 3): a background element that stops focus-event propagation keeps focus. Fix both with a capture-phase listener plus a microtask decision.

### Security: PASS · Responsiveness: PASS
- No sinks; `onSearch` uses `AbortSignal` and discards stale results. Full-screen at ≤ 480px (coordinator: 0..371).

## Verdicts on the open questions
1. **DRP popover not portalled (clipping risk):** **accepted for this sprint**, with a follow-up. In-tree rendering avoids clipping only when no ancestor has `overflow: hidden`. Since Sprint 1 iteration 3 the Drawer and CommandPalette guards use **React-tree ownership**, so a portal rendered from inside a Drawer is already allowed. Portalling is now safe to do (P3): portal to `body`, keep `pushLayer` with the parent id, and position with the Tooltip `computeTooltipPosition`-style viewport clamp. Until then, document "avoid `overflow:hidden` ancestors" in the DRP docs.
2. **NumberInput steppers not in the tab order:** **accepted.** This is APG spinbutton practice: keyboard users have ArrowUp/Down / PageUp/Down / Home/End on the focusable input, and the steppers are reachable to pointer and AT activation (`click` with `detail===0` steps once). A1 is met because every function is keyboard-operable.
3. **Should Wizard auto-manage loading when `onComplete` returns a Promise?** **Yes, as an optional enhancement (P3), not a defect.** If `onComplete` returns a thenable and `loading` is uncontrolled, set internal loading until it settles. On rejection, show the danger Alert and focus the heading. Keep the existing controlled `loading` prop authoritative.
4. **SegmentedControl icon-only options with `ariaLabel`:** **support it (P3 enhancement).** Add `ariaLabel?: string` per option. Require it in the types when `label` is not a string (or warn in dev). Render the icon `aria-hidden`, and recommend pairing with `Tooltip` for sighted users. Today an icon-only label would make an unnamed radio.
5. **SegmentedControl pre-measure `box-shadow: inset 0 0 0 1px var(--color-text-secondary)`:** **accepted.** It is a token-coloured border emulation, not an elevation shadow, so the "shadow tokens only" rule doesn't apply. It gives ≥ 4.71:1 against the track in every theme.
6. **CommandPalette Home/End move the highlight instead of the caret:** **accepted with reason.** The brief mandates it, the query is usually short, and Shift+Home/End plus ArrowLeft/Right still edit text. Document it in the footer hint and the story.
7. **Announce the count on open?** **No.** The dialog and combobox names are announced on open, and adding "N results" for an empty query is noise. Announce only after typing (the current behaviour). Optional: include the count in the combobox's `aria-describedby` hint ("12 commands") so it is discoverable on demand.
8. (07g) "This month" / "This quarter" presets are period-to-date: a product decision; no a11y impact.

## Ranked fix list
**Slice G — component-author**
1. [component-author G] P2 — remove `aria-required` from the DRP trigger `<button>`; convey "required" through the label's sr text (`src/components/molecules/DateRangePicker/index.tsx:454`)
2. [component-author G] P2 — reject malformed grouping, interior or repeated minus, and minus with `allowNegative={false}`; narrow the decimal heuristic; add tests (`src/components/atoms/NumberInput/NumberInput.utils.ts:134-207`)
3. [component-author G] P3 — DRP portal follow-up (open question 1), and a manual check of the docked popover inside a bottom Sheet at 375px

**Slice H — component-author**
1. [component-author H] PENDING — the Wizard "Controlled" story crash (in progress)
2. [component-author H] P3 — Promise-aware `onComplete` loading; per-option `ariaLabel` for icon-only segments

**Slice I — component-author**
1. [component-author I] P3 — capture-phase focus guard (shared with Drawer)

**Possible flake (all slices):** one unreproduced 1/661 failure under concurrent load. Run timer-based suites with `--repeat`.

**Escalated or queued, outside the verdict:**
- Stepper ARIA on `<button>` (now visible as axe-critical on every Wizard story)
- Button `loading` focus / `aria-busy`
- dark `--color-border-strong`
- NumberInput / Combobox side-loading FormField CSS
