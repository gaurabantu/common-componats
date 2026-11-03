# Compliance verdict — Sprint 4 (Button & Select hardening)

- **Reviewer:** compliance-reviewer (read-only; this file and the LEDGER row are the only writes)
- **Date:** 2026-11-03
- **Brief:** `_fleet/handoffs/08-orchestrator-sprint4-brief.md`; handoffs `08j` (Button), `08k` (Select)

| Slice | Accessibility | Security | Responsiveness | Result |
|---|---|---|---|---|
| J — Button | PASS | PASS | PASS | **PASS** — can ship |
| K — Select | **FAIL** (contrast + invalid border; fixes in flight with K) | PASS | PASS | **back to component-author K** |

**FINAL (iteration 3):** J **PASS** · K **PASS** (Accessibility, Security, Responsiveness) → **nothing in Sprint 4 blocks the 0.0.3 release.** One token-level item is escalated and non-blocking (see Iteration 3).

**Iteration 2 (superseded):** J **PASS**. K error state **fixed**; K still **FAIL** on one pre-existing item: warning/success helper text contrast. **The 0.0.3 release can proceed only if the coordinator or user explicitly accepts that item as a known pre-existing issue**, or after a 2-line token fix.

**Iteration 1 ship recommendation (superseded):** **do not tag 0.0.3 with the current Select.** Either wait for K's in-flight fix and my re-check (preferred), or ship Button alone. Release notes must carry the behaviour-change list below; several items can break consumer tests and CSS.

## Evidence run
| Check | Result |
|---|---|
| `npx vitest run` | **776 passed** (with the coordinator's 6 consumer-assertion edits) |
| tsc for Button / Select / utils / List | clean |
| axe-core 4.11.1 on **every** Button and Select story (`composeStories`, dev warnings muted) plus Select-in-FormField | **0 violations** |
| Behaviour probes (scratch harness, `@testing-library/user-event`) | below |
| `expandOnHover` preservation | the `.btn-expand-*` block in `tokens.css` is still the 46-line hunk from session start (untouched by J). The prop is in `Button.types.ts:78`, logic at `index.tsx:80,92,157,170-174,230`, both original tests pass (`Button.test.tsx:65,79`), and a new loading + expandOnHover test passes (`:142-165`). The `ExpandOnHover` story is axe-clean. **Preserved and working.** I had no pre-sprint snapshot of `index.tsx`, so this confirms the behaviour, not byte identity. |
| Coordinator's Chrome evidence | Select keeps focus after change, with a solid ring. Button keeps focus with `aria-busy` and no native `disabled`. Heights are Select/Input/Button 30/30/30, 38/38/38 and 48/48 per tier. |

## Slice J — Button: PASS
- [PASS] **Loading keeps focus.** Harness, toggling `loading` on a focused submit button: same node, still focused, `disabled=false`, `aria-disabled="true"`, `aria-busy="true"`, and the description resolves to "Loading". Mouse click, Enter and Space on the button, and **Enter in a sibling input (implicit submission)**, give **0 onClick and 0 form submits**. With loading off, 1 click → 1 submit (`src/components/atoms/Button/index.tsx:232-247,316-341`).
- [PASS] **Consumer-test edits approved, double activation still blocked:**
  - **Modal `confirmLoading`:** click, Enter and Space on "Confirm" → `onConfirm` called **0** times. The button stays focused with `aria-disabled="true"`.
  - **Wizard Finish with `loading`:** click plus Enter → `onComplete` **0**.
  - **Wizard Promise mode:** three clicks during a pending `onComplete` → called **once**, with `aria-busy` set while pending and `aria-disabled` cleared after it settles.
  - The 6 assertion changes (`Modal.test.tsx:185`, `Wizard.test.tsx:232,247,254,266,268`) correctly track the new contract.
- [PASS] **forwardRef:** refs reach `BUTTON` and `A` (`index.tsx:51,345-347`).
- [PASS] **href safety:** `java\tscript:alert(1)` and ` JAVASCRIPT:alert(1)` with `target="_blank"` render `<button type="button">` with no `href`/`target`, plus a dev warning. The shared `src/utils/safeHref.ts` uses the WHATWG parser with an http/https/mailto/tel allow-list (the same logic verified for List in VERDICT-portal iteration 3). `target="_blank"` gets `rel="noopener noreferrer"`.
- [PASS] **Icon-only without a name** gives a dev warning. Spinner in the icon slot is `aria-hidden`, width is stable (`index.tsx:105-123,190-207`).
- [PASS] B1/B5: no sinks, no inline handlers. C: no new colours or sizes. Reduced motion still applies through the existing `.btn-spinner` rule.
- [OPTIONAL, P3]
  1. While `loading`, only `onClick` is swallowed. Consumer `onPointerDown` / `onMouseDown` / `onKeyDown` still fire, because ripple is off and `restOnPointerDown` is passed straight through (`index.tsx:223,296,328`). Document this: actions must live in `onClick`.
  2. Loading links don't block middle-click/auxclick (`index.tsx:286-301`). Acceptable; document it.
  3. `Pagination.utils.ts:115` keeps its own http/https-only copy. It could import the shared helper with a page-link allow-list option.

## Slice K — Select: FAIL (fixes in flight)
- [PASS] **Focus retention:** mouse (`userEvent.selectOptions`) and keyboard change both keep focus on the `<select>`. No `blur()` remains. The chevron is driven by `data-open` (`src/components/atoms/Select/index.tsx:111-139,273`).
- [PASS] **Native form:** `FormData.get("plan") = "b"`, `required` is native.
- [PASS] **FormField:** `label for` → the `<select>`, describedby = hint + error, `aria-invalid` and `aria-required` set (`index.tsx:98,347-348`). axe-clean.
- [PASS] **error over status:** `status="warning" error="Pick one"` → `aria-invalid="true"`, describedby → "Pick one", `data-status="error"`.
- [PASS] **Focus ring:** 2px `--color-focus-ring` on `:focus-visible`, forced-colors Highlight. Ring ≥ 3.85:1 in every theme (Sprint 2 token table).
- [FAIL] A4 / 1.4.3 — **status message text contrast.** `footerColor` uses the raw state tokens (`index.tsx:170-177`):
  - error `--color-state-error` #dc3545 = **4.34:1** on the mist-theme surface #fafafa and **3.43:1** on the classic page #e0e0e0;
  - warning #ffc107 = **1.63:1** on white;
  - success #28a745 = **3.13:1** on white.

  These colours are pre-existing (identical at HEAD), but slice K's item 4 rebuilt this message, so it is in scope. Fix: text → `--color-{danger|warning|success}-strong`. Those give 7.14 / 4.92 / 5.33:1 on white and 6.84 / 4.71 / 5.11 on the mist surface. On the classic page they are 5.41 / 3.73 / 4.04; warning- and success-strong also fall short there, so keep messages on a surface or use `text-primary` + icon for warning/success. **This extends the coordinator's in-flight item 2.**
- [FAIL] A4 / 1.4.11 + consistency — **the border ignores `field.invalid`.** `borderColor` reads only `resolvedStatus` (`index.tsx:161-168`), so inside a FormField with an error the border stays `--color-border-default` while `aria-invalid="true"` (`:157-158`). This is the coordinator's in-flight item 1. Also, the warning border (#ffc107) is **1.63:1** against the surface, so the control's boundary nearly disappears in the warning state. Fix: derive the visual status from `ariaInvalid`, and use `--color-{tone}-strong` for the borders as well. This matches FormField, Checkbox and Alert (`--color-danger-strong`).
- [PASS] B: no sinks. `liveSearch` is no longer leaked to the DOM.
- [PASS] C: heights are token tiers shared with Input (`Select.config.ts`, `selectHeightTokens`) and verified in Chrome by the coordinator. The 375px layout is unchanged.
- [OPTIONAL, pre-existing] The chevron SVG stroke is hard-coded #757575: 3.19:1 on the dark surface, 4.61 on white. Mask-image + `background-color: var(--color-text-secondary)` would let it follow the theme.

## Consumer impact of the behaviour changes (for the 0.0.3 release notes)
Higher risk (can break consumer tests/CSS or change names):
1. **Button `loading` is no longer natively `disabled`.** `:disabled` CSS, `toBeDisabled()` tests and `button[disabled]` selectors stop matching. Use `[aria-disabled="true"]` / `.btn-loading`. Loading buttons stay in the Tab order, which is intended. Handlers other than `onClick` still run.
2. **A native `aria-label` on Button is now honoured** (it used to be dropped). Apps that pass `aria-label` on a *text* button will now override the visible label. Check WCAG 2.5.3 (label in name) in consumer code (harness: `<Button aria-label="Close dialog">X</Button>` → name "Close dialog").
3. **Unsafe `href` renders a `<button type="button">`.** `href="javascript:void(0)"` patterns lose link semantics and styling and need an `onClick`.
4. **Select no longer blurs on change.** `onBlur`-on-change validation now runs only when the user leaves. Select now draws a visible focus ring.
5. **Select consumer `style` is merged, not replacing.** Callers that passed `style` to wipe the built-in border/padding will see the defaults return.
6. **Select `error` beats `status`.** `status="warning"` + `error` now renders as an error.

Lower risk: `rel="noopener noreferrer"` on `_blank` (only breaks `window.opener` flows), refs now forwarded, spinner-in-slot, `loadingText` description, Select `ds-select` class / `data-size` / `data-open`, the `lg` height `48` → `3rem`, the `*` marker with `required` + own label, and composed handlers.

**Versioning advice:** at 0.0.x any bump is allowed. Given the number of observable changes, consider **0.1.0** so consumers on `^0.0.x` ranges don't pick these up silently. Otherwise call out items 1–6 as "behaviour changes" at the top of the 0.0.3 notes, and merge with the existing 0.0.3 Modal focus-return note (`src/portal/data.ts:197-198`).

## Recommendations requested
- **Pagination `--pagination-target` 36/40 vs Select 30/38:** tokenise Pagination. Set `--pagination-target: var(--button-height-lg)` (38) for md and `var(--button-height-md)` (34) for sm (`Pagination.css:4,18`). Pass `style={{ minHeight: "var(--pagination-target)" }}` to its page-size Select (style now merges), so the page buttons and Select line up per tier. Keep the existing 44px coarse-pointer override. Both values stay ≥ 24px (WCAG 2.5.8). Owner: Pagination (slice C lineage), P3.
- **Can Pagination and FilterBar drop `animatedChevron={false}`?** **Yes, functionally.** Focus retention now holds in the animated mode (my harness used the default animated Select), and K re-ran both suites with the animated chevron forced. Do it as a visual follow-up once the in-flight Select colour fixes land, and re-run axe on the Pagination and FilterBar stories plus a Chrome check of the toolbar row, since the overlay chevron changes the control's right padding. P3.

## Ranked fix list
**Slice K — component-author (in flight)**
1. [component-author K] P1 — status message text and borders → `--color-{tone}-strong`. Error text currently fails in mist (4.34) and on page (3.43); warning (1.63) and success (3.13) fail everywhere in light themes (`src/components/atoms/Select/index.tsx:161-177`)
2. [component-author K] P2 — visual invalid state derived from `ariaInvalid`, so the FormField error turns the border red (`index.tsx:157-168`)
3. [component-author K] P3 — theme-aware chevron (pre-existing)

**Slice J — component-author**
- P3 doc notes: non-`onClick` handlers fire while loading; middle-click on loading links; shared safeHref in `Pagination.utils.ts`.

**Follow-ups:** Pagination tokenised target; drop `animatedChevron={false}` in Pagination/FilterBar after K lands.


# Iteration 2 — Select error-state fixes (2026-11-03)

**Evidence**
- `npx vitest run`: **778 passed**. axe is still 0 on all Button/Select stories plus 5 status variants. The earlier Select repros (focus kept after mouse and keyboard change, FormData, FormField wiring) still pass.
- Harness, one Select per state:

  | Select | `data-invalid` | Border | `aria-invalid` | Message colour |
  |---|---|---|---|---|
  | inside an erroring FormField | `true` | `var(--color-danger-strong)` | `true` | — |
  | own `error="Bad"` | `true` | danger-strong | `true` | `var(--color-danger-strong)` |
  | explicit `aria-invalid="true"` | `true` | danger-strong | `true` | — |
  | `status="warning"` | — | **`var(--color-state-warning)`** | `false` | **`var(--color-state-warning)`** |
  | `status="success"` | — | **`var(--color-state-success)`** | `false` | **`var(--color-state-success)`** |

## Slice K — Select (iteration 2)
- [PASS] Invalid border now follows the resolved invalid state (own error, `status="error"`, FormField error, explicit `aria-invalid`), with a `data-invalid` hook (`src/components/atoms/Select/index.tsx:163-170,284`). The coordinator's item 1 is closed.
- [PASS] Error border and text use `--color-danger-strong`: 7.14:1 classic, 7.73 dark, 6.84 mist surface, 5.41 classic page. The coordinator's item 2 is closed.
- [FAIL — pre-existing, not a regression] A4 / 1.4.3 + 1.4.11 — **warning and success are unchanged** (`index.tsx:166-177`).
  - Helper text: `--color-state-warning` #ffc107 = **1.63:1** on white; `--color-state-success` #28a745 = **3.13:1** on white. Both are below 4.5:1 in every light theme.
  - Warning border: also 1.63:1, so the control's boundary nearly disappears.
  - Dark theme is fine (8.79 / 7.64).
  - These colours are identical at HEAD, so 0.0.3 does not make anything worse. But they are text-contrast failures in a component this sprint rebuilt, and my iteration-1 P1 covered all three tones.
  - Fix (two lines each): text → `--color-warning-strong` / `--color-success-strong` (4.92 / 5.33 on white, 4.71 / 5.11 on the mist surface), and the same tokens for the borders.
  - Under the checklist this item must be **fixed or explicitly accepted with a reason** before ship. Acceptance is the coordinator's or user's call, not the reviewer's.

## Final summary
| Slice | Accessibility | Security | Responsiveness |
|---|---|---|---|
| J — Button | PASS | PASS | PASS |
| K — Select | **FAIL** (warning/success contrast only, pre-existing) | PASS | PASS |

Release gate: **either** apply the warning/success token fix and I re-check (about one more run), **or** record an explicit acceptance ("pre-existing since before 0.0.3; fix in 0.0.4") in the release notes and the LEDGER. With that acceptance recorded, nothing else in Sprint 4 blocks 0.0.3. The behaviour-change list and versioning advice above still apply, now including items 13–14.


# Iteration 3 — Select final (2026-11-03)

**Evidence**
- `npx vitest run`: **784 passed**.
- axe: 0 on all Button and Select stories plus the 5 status variants.
- Every earlier Button and Select repro re-run and still passing:
  - focus is kept through loading;
  - 0 clicks or submits while loading, including implicit submission;
  - Modal `confirmLoading` and Wizard Finish block double activation;
  - Select keeps focus after mouse and keyboard change;
  - FormData and FormField wiring are correct.
- `grep state-error|state-warning|state-success|#757575` in `src/components/atoms/Select/` finds only comments. There is no inline `backgroundImage` chevron left in `index.tsx`.

**Status colours** (harness; `selectStatusTokens`, `src/components/atoms/Select/Select.config.ts:32-36`)

| Select | Border | Message |
|---|---|---|
| FormField error / own error / `aria-invalid` | `--color-danger-strong`, `data-invalid="true"` | `--color-danger-strong` |
| `status="warning"` | `--color-warning-strong` | `--color-warning-strong` |
| `status="success"` | `--color-success-strong` | `--color-success-strong` |

**Contrast** (all 7 themes, computed from `tokens.css`)

| Token | On surface (min) | Theme |
|---|---|---|
| danger-strong | 6.84 | mist themes |
| warning-strong | **4.71** | mist themes |
| success-strong | 5.11 | mist themes |
| chevron (`--color-text-secondary`) | 6.21 | mist themes |

Dark: danger 7.73, warning 8.79, success 7.64, chevron 6.71. The producer's figures (4.92/8.79, 5.33/7.64, 7.14/7.73) match for classic and dark.

## Slice K — Select: PASS
- [PASS] A4 status text ≥ 4.5:1 and borders ≥ 3:1 on every surface in every theme. The invalid state drives the border for every source.
- [PASS] Chevron: a CSS mask painted with `--color-text-secondary` (`Select.css:27-43`), one glyph for both shells. forced-colors paints it `CanvasText` with `forced-color-adjust: none` (`:61-65`), so it can't vanish. Picker-state rotation and reduced motion are unchanged (`:18-24`). The coordinator's Chrome check confirms it in light and dark.
- [ESCALATED, non-blocking — token level] `--color-warning-strong` / `--color-success-strong` **on `--color-bg-page`** in the classic, green and custom themes are **3.73 / 4.04:1**. That only matters if a Select's helper text is placed directly on the page background rather than a surface. It affects every consumer of these shared tokens, not just Select, and the danger tone is fine (5.41). It's the same class of item as the earlier `text-secondary`-on-page escalation. Suggested token fix: darken light `--color-accent-amber-fg` / `--color-accent-mint-fg` slightly (≥ 4.5:1 on #e0e0e0), or document "status text on surfaces".

## Versioning (correction)
The coordinator is right. For `0.0.x`, npm's caret range `^0.0.2` resolves to exactly `0.0.2`, so consumers will **not** pick up 0.0.3 silently. I withdraw the 0.1.0 suggestion; the version is the user's decision. The upgrade notes at the top of RELEASES 0.0.3 (`src/portal/data.ts`) are the right vehicle. Make sure they include the six higher-risk behaviour changes listed above, plus K's 13–16.

## Final summary
| Slice | Accessibility | Security | Responsiveness |
|---|---|---|---|
| J — Button | PASS | PASS | PASS |
| K — Select | PASS | PASS | PASS |

**Sprint 4: PASS.** Release gate cleared from the compliance side.
