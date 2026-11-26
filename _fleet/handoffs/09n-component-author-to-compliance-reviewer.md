# Handoff: component-author (Slice N) -> compliance-reviewer

- **Task:** Sprint 5 Slice N: per-theme interaction-state tokens, dark-surface audit, theme isolation, AA token escalations
- **Status:** ready

## Token contract (Slice M consumes these; defined for all 10 themes, see `src/design-system/tokens.css` header lines 29-46)
| Token | Meaning | AA rule (tested) |
|---|---|---|
| `--color-state-hover-bg` / `--color-state-hover-fg` | hover on a row, menu item, tab, option or day (accent tint) / its text (= text-primary) | text-primary and text-secondary ≥ 4.5; hover-bg vs surface luminance ratio ≥ 1.08 |
| `--color-state-active-bg` | pressed / `:active` (a deeper accent tint) | text-primary and text-secondary ≥ 4.5 |
| `--color-state-selected-bg` / `--color-state-selected-fg` | **filled** selection: current page, checked box/radio, selected day, range endpoints, selected segment | fg on bg ≥ 4.5 |
| `--color-state-selected-subtle-bg` | **row** selection tint: list, table, combobox/listbox option, sidebar current item | text-primary and text-secondary ≥ 4.5 |
| `--color-state-selected-border` | selection edge or tab indicator | ≥ 3 vs surface (all non-Infinia themes) |
| `--color-state-selected-text` | selected label on a plain surface (tabs) | ≥ 4.5 on surface and page (all non-Infinia themes) |
| `--color-state-disabled-bg` / `-fg` | aliases of `--color-fill-muted` / `--color-text-disabled` | n/a |
| `--color-focus-ring` | existing token, unchanged name | ≥ 3 vs surface, page and hover-bg |
| `--color-selection-bg` / `-fg` | `::selection` text highlight. In Infinia these are `initial`: Infinia keeps the browser default | ≥ 4.5 (all non-Infinia themes) |

Tailwind classes: `bg-state-hover`, `bg-state-active`, `bg-state-selected`, `text-state-selected-fg`, `bg-state-selected-subtle`, `border-state-selected-border`, `text-state-selected-text`, `bg-state-disabled-bg`, `text-state-disabled-fg`, `ring-focus-ring` / `outline-focus-ring`, `bg-selection-bg` / `text-selection-fg`. They are defined in `tailwind.preset.js:36-48` and `tailwind.config.js:32-44`.

Role tokens are the names components read. They are aliases bound to the contract in the classic block (`tokens.css:435-466`): `--color-theme-surface-hover`, `--color-interactive-row-hover`, `--color-control-hover-bg`, `--color-selected-{bg,fg,text,indicator}`, `--color-border-selected`, `--color-tab-indicator`, `--color-option-{selected,hover,active}-bg`, `--color-row-hover-bg`, `--color-grid-row-hover-bg`, `--color-page-current-{bg,fg}`, `--color-control-checked-{bg,bg-radio,border,fg}`, `--color-day-{selected-bg,selected-fg,hover-bg}`, `--color-range-{endpoint-bg,endpoint-fg,middle-bg}`, `--color-segment-selected-{bg,fg,border}`. Infinia pins each of these to the colour it already used.

## Objective
Verify Slice N against QUALITY_CHECKLIST A/B/C and the Sprint 5 brief (Slice N plus the user's mid-task correction below). Return a PASS or FAIL verdict with reproducible evidence.

## Output format
`_fleet/VERDICT-sprint5.md`, Slice N section: one PASS/FAIL per dimension (A, B, C, plus "Infinia unchanged" and "theme isolation"). Each defect needs `file:line` or a command and its output.

## Sources and tools
- `src/design-system/tokens.css`: header contract (29-46); nested-theme note (59-63); base selectors (65-70, 316-322); classic contract and role bindings (413-491); green 598; dark 642 (color-scheme), 650-654 (border-strong / interactive / disabled) and 698-708; mist 782; custom 798; blue-mist 820; green-mist 859-887; infinia-light status pins and contract 1167-1200; infinia-dark contract and pins 1405-1431; `::selection` 1479-1488.
- Tests: `npx vitest run src/design-system` covers `interactionStates.test.ts` (new) and `darkThemeFills.test.ts` (regex updated at :43). The new test simulates the cascade for `<html data-theme=x>` and for `<div data-theme=x>` nested in each of the 10 themes.
- Real-browser probe: put a page with `<link rel=stylesheet href=tokens.css>` in headless Chrome, append `<div data-theme=X>` under `<html data-theme=Y>`, and read `getComputedStyle`. I ran this for Y = infinia-dark, dark, classic across all 10 X values. The results match the test model: no Infinia colour in any non-Infinia theme, and `mist` inside `infinia-dark` now gives `#0d0d0d` on `#fafafa` (it was white text on `#fafafa` before).
- Do NOT use `npm run build` (it overwrites the tracked dist). Build Storybook with `npx storybook build -o <tmp>`.

## Boundaries
- Out of scope: `.storybook/**` and portal files (Slice L), `src/ThemeShowcase*` (Slice M), and component APIs (this slice made style-only changes).
- **User decision, relayed mid-task:** infinia-light and infinia-dark must not change. Only alias tokens equal to colours already in use may be added there. The other 8 themes must use their own accent for selected and hover, styled the way Infinia's selected state is, and no Infinia colour may leak. Do not file Infinia's own low-contrast pairs as Slice N defects (see the escalations below).
- Stop once A/B/C and the two isolation checks are verdicted. Do not redesign the palette.

## Context digest
- **Theme isolation (root-cause fix):** the two base blocks (foundations plus the classic palette) now also match `[data-theme]`, `.dark` and `.theme-*`. The green block moved below the classic block so its overrides still win on nested elements. Infinia-only role tokens (badge, scrim, shadow-popover, gradient, and so on) are reset to `initial` in the base, which makes `var()` fall back to the component's own fallback. Before this change, a nested `[data-theme=mist]` inside infinia-dark rendered white text on `#fafafa` with Infinia yellow selection, and nested classic inside dark stayed dark. The tests now assert that nested resolution equals root resolution for all 10×10 combinations.
- **How "styled the same way as Infinia" was interpreted:** I mirrored Infinia per component. Where Infinia uses a filled yellow with ink text (pagination current page, checkbox/radio, Calendar day), the other 8 themes now use a filled accent with white text. Where Infinia uses a tint plus a yellow edge (list, table, combobox, ToggleButton pressed, tabs text/indicator), they use `selected-subtle-bg` plus the accent edge. Hover is an accent tint everywhere. DRP range endpoints and SegmentedControl are neutral in Infinia (inverse fill / surface pill). I gave the 8 themes a filled accent there, because that is the user's stated pattern. Infinia keeps its pins.
- **Accents per theme:** classic/blue/mist `#2563eb`; green and green-mist `#15803d`; custom `#e11d48`; blue-mist `#1a56db`; dark fills with `#2563eb` (`#3b82f6` with white is 3.68:1) and uses edge/text `#60a5fa` / `#93c5fd`.
- **Escalations closed:** dark `--color-border-strong` is now `#9ca3af` (5.70 on surface; it was inherited as `#0d0d0d`), along with `--color-border-interactive` and `--color-text-disabled`. Dark now sets `color-scheme: dark`, so native controls and scrollbars stop rendering as white islands. Light `--color-warning-strong` is `#6f5800` and `--color-success-strong` is `#15663f`: 5.18 / 5.30 on `#e0e0e0`, up from 3.73 / 4.04. `--color-info-strong` was 4.17 on the page and is now `#155a99` (5.38). The accent `*-fg` tokens are unchanged, so the ColorPicker presets still match. Green-mist focus ring `#0e7490` measures 5.13 / 4.58, and its `--color-border-focus` now matches the ring instead of Noir. Dark focus ring (5.77) and the dark primary button (5.17) were already fixed earlier; both are now under test.
- **Infinia proof:** I diffed the resolved tokens before and after (my cascade script). The only differences for infinia-light and infinia-dark are new keys; no existing value changed. Status-strong tokens are pinned in infinia-light to `var(--color-accent-*-fg)` because the classic base now darkens them.

## Contrast table (resolved from tokens.css, WCAG relative luminance)
| theme | selected bg/fg | sel-fg:bg | sel-text:surface / page | edge:surface | focus:surface / page / hover | text-pri:hover | text-sec:active | text-sec:subtle | hover:surface | selection | primary btn | warn / succ strong:page |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| classic | #2563eb / #ffffff | 5.17 | 6.70 / 5.08 | 5.17 | 5.57 / 4.22 / 4.91 | 17.15 | 5.05 | 5.22 | 1.13 | 13.73 | 19.44 | 5.18 / 5.30 |
| blue | #2563eb / #ffffff | 5.17 | 6.70 / 5.08 | 5.17 | 5.57 / 4.22 / 4.91 | 17.15 | 5.05 | 5.22 | 1.13 | 13.73 | 19.44 | 5.18 / 5.30 |
| dark | #2563eb / #ffffff | 5.17 | 8.14 / 9.84 | 5.77 | 5.77 / 6.98 / 4.78 | 11.05 | 4.68 | 4.97 | 1.21 | 6.70 | 5.17 | 10.63 / 9.23 |
| green | #15803d / #ffffff | 5.02 | 7.13 / 5.40 | 5.02 | 19.44 / 14.72 / 17.31 | 17.31 | 5.03 | 5.31 | 1.12 | 16.04 | 5.02 | 5.18 / 5.30 |
| mist | #2563eb / #ffffff | 5.17 | 6.42 / 5.72 | 4.95 | 5.33 / 4.75 / 4.77 | 16.66 | 4.87 | 5.22 | 1.12 | 13.73 | 19.44 | 5.84 / 5.97 |
| custom | #e11d48 / #ffffff | 4.70 | 6.29 / 4.76 | 4.70 | 5.57 / 4.22 / 4.92 | 17.17 | 4.83 | 5.08 | 1.13 | 13.78 | 19.44 | 5.18 / 5.30 |
| blue-mist | #1a56db / #ffffff | 6.18 | 8.36 / 7.45 | 5.92 | 5.46 / 4.87 / 4.81 | 16.39 | 4.75 | 5.07 | 1.14 | 13.12 | 6.18 | 5.84 / 5.97 |
| green-mist | #15803d / #ffffff | 5.02 | 6.83 / 6.09 | 4.81 | 5.13 / 4.58 / 4.59 | 16.66 | 4.89 | 5.16 | 1.12 | 16.04 | 5.02 | 5.84 / 5.97 |
| infinia-light | #ffd400 / #111111 | 13.19 | 6.88 / 6.88 | **1.43** (unchanged, user decision) | 6.88 / 6.88 / 6.31 | 17.32 | 7.83 | 9.21 | 1.09 | browser default | 13.19 | 7.52 / 5.41 |
| infinia-dark | #ffd400 / #111111 | 13.19 | 12.28 / 13.19 | 12.28 | 12.28 / 13.19 / 9.76 | 13.97 | 7.83 | 9.95 | 1.26 | browser default | 13.19 | 12.21 / 12.45 |

Segmented selected fill vs track (1.4.11): classic 4.74, green 4.60, mist 3.92, custom 4.31, blue-mist 4.68, green-mist 3.80. In dark the fill is 1.99 against the track, so the edge `--color-segment-selected-border` = `#60a5fa` provides 4.05.

## Components changed (style-only)
| File:line | Change |
|---|---|
| `src/components/molecules/Combobox/Combobox.css:191` | option hover/focus → `--color-option-hover-bg` |
| `src/components/molecules/CommandPalette/CommandPalette.css:167` | active option → `--color-option-active-bg` |
| `src/components/molecules/Popover/Popover.css:247` | listbox selected → `--color-option-selected-bg` |
| `src/components/molecules/Table/Table.css:253,624` | row hover → `--color-row-hover-bg` / `--color-grid-row-hover-bg` |
| `src/components/molecules/Pagination/Pagination.css:75` | control hover → `--color-control-hover-bg` |
| `src/components/atoms/ToggleButton/ToggleButton.css:28` | pressed:hover → `--color-selected-bg` (was hard lavender-10, which is indigo `#3730A3` in dark) |
| `src/components/molecules/DateRangePicker/DateRangePicker.css:213,353,361-368` | preset hover, range middle, endpoints → range roles |
| `src/components/molecules/SegmentedControl/SegmentedControl.css:4,81,143-145,161` | selected label, indicator fill/edge, pre-measure fallback → segment roles |
| `src/components/molecules/Calendar/Calendar.config.ts:53-57` | day selected / hover / text → day roles |
| No edit needed (bindings cover them) | List, Tabs, Accordion, FileUpload, menu items, Checkbox/Radio, Table selected rows, Pagination current. They already read the role names. |
| `tokens.css` sidebar | dark and mist-family `--app-sidebar-hover/active-bg/nav-icon-active` → state tokens. The classic Noir rail is untouched. |

The audit grep (`#fff|#ffffff|white|bg-white|bg-gray-|text-gray-` plus Tailwind palette classes) turned up no theme-ignoring surfaces in `src/components`. Every hit is `white-space`, ColorPicker swatch data, or the ColorPicker contrast helper.

## Self-check (QUALITY_CHECKLIST A/B/C)
- **A3/A4 contrast and focus:** see the table above, asserted by `src/design-system/interactionStates.test.ts` (selected-fg ≥ 4.5, subtle and hover text ≥ 4.5, edge ≥ 3, focus ≥ 3 vs surface/page/hover, selection ≥ 4.5, status-strong ≥ 4.5 on page and surface, primary button ≥ 4.5). Mutation-checked: breaking `[data-theme]` in the base, or setting custom selected-fg to `#ffd400`, fails 17 tests.
- **A (state not by colour alone):** row selection keeps the inset edge (`List.css:46`, `Table.css:719`). Forced-colors blocks are untouched (`Pagination.css:186`, `Popover.css:256`, `SegmentedControl` forced-colors block).
- **B:** CSS and tokens only. No markup, handlers or `dangerouslySetInnerHTML` touched. `Calendar.config.ts` only changes string values.
- **C:** `color-scheme: dark` on dark (`tokens.css:642`). The mobile `@media (max-width: 640px)` and forced-colors token overrides now also target `[data-theme]`, so nested themes keep the mobile button insets. Reduced-motion rules are untouched.

## Tests
- Baseline before starting: **992 passed / 67 files**.
- After: **1260 passed / 70 files** (includes Slice L/M test files running concurrently). Slice N added `interactionStates.test.ts` (~230 cases); the design-system folder has 234 tests, all green.
- `tsc` is clean for the touched files. `npx storybook build -o <scratch>` succeeds.

## Failed approaches
- The first plan used a blue tint for classic selection with neutral hovers and aliased everything to the new tokens, including Infinia. The user's correction ruled that out, so I switched to role tokens pinned per Infinia.
- Filled-accent rows (list/table) were rejected: white text on a blue row breaks secondary text, links and badges inside cells, and Infinia rows are tinted, not filled.
- The first `::selection` design (revert rule under Infinia plus a re-apply rule for nested themes) failed in Chrome. It only matched descendants, and `revert` computed to transparent. It was replaced by a single `:not(:is(infinia, infinia *))::selection` rule.
- `tailwind.preset.js` could not be `require()`d at HEAD: `dist/**/*.js` inside the `/** */` header closed the comment. I fixed this by splitting the glob string.

## Artifacts
| Path | What it is | State |
|------|-----------|-------|
| src/design-system/tokens.css | state contract, theme isolation, dark fills, status-strong fixes, `::selection`, Infinia pins | final |
| src/design-system/interactionStates.test.ts | cascade-model test: tokens per theme, AA pairs, Infinia aliases, isolation | final |
| src/design-system/darkThemeFills.test.ts | classic-scope regex updated (:43) | final |
| tailwind.preset.js, tailwind.config.js | `state.*`, `focus.ring`, `selection.*` colours; preset comment fix | final |
| 9 component files listed above | role-token wiring | final |

## Acceptance criteria
- `npx vitest run src/design-system` passes 234 tests; the full suite is green.
- Infinia's resolved tokens are identical except for added keys, and its components render the same (spot-check List, Pagination, Calendar day, SegmentedControl and DRP under infinia-light/dark).
- A `<div data-theme=X>` inside any outer theme renders like the root theme X (Chrome probe or the test).
- In the 8 non-Infinia themes, hover and selected states use the theme accent, and every pair in the table is ≥ its threshold.

## Open questions / escalations not closed
1. **Infinia-light selected edge and tab indicator `#ffd400` on white is 1.43:1** (WCAG 1.4.11). Not changed, per the user. The filled controls still pass (13.19).
2. **Infinia-light Calendar selected day:** `--color-text-on-primary` `#ffffff` on `#ffd400` is 1.43:1. This existed before, and the pin preserves it. A fix needs the user to accept a change to Infinia (`--color-day-selected-fg: #111111`).
3. **Text selection inside nested Infinia:** an Infinia region nested inside a non-Infinia page inherits the outer page's `::selection` colour, because Chrome's highlight pseudos inherit from the parent. Infinia at root keeps the browser default.
4. **Interpretation check for the user:** DRP endpoints and SegmentedControl in the 8 themes are now filled accent, while Infinia keeps its neutral style there. If the user wants those to stay neutral everywhere, remove the `--color-range-endpoint-*` and `--color-segment-selected-*` bindings at `tokens.css:461-466`.
5. Not migrated: the Table built-in pagination hover (`Table.css:498,532`, `--color-bg-secondary`), the Tabs `segmented` variant (neutral pill, same in every theme), and the classic Noir sidebar rail (it has its own `--app-sidebar-*` set).
6. Dark `--color-text-on-primary` is still `#ffffff` while dark `--color-brand-primary` is `#FFFFFF`, which leaves the Table `brand` header variant at 1:1 in dark (`Table.css:207-208`). This predates Slice N and needs an on-brand token decision; I did not change it because Spinner and Badge also read that token.

---

## Iteration 2 (fix-list items 1–5 from `_fleet/VERDICT-sprint5.md`), 2026-11-26

**Status:** ready for re-review. Open question 6 above is now closed (fix 1). Items 1, 2, 4 and 5 under "Open questions" are unchanged, because they concern the locked Infinia look or the interpretation.

**Infinia constraint:** I re-ran the before/after resolved-token diff against HEAD `tokens.css`. infinia-light and infinia-dark show **no changed values**; new keys resolve to `initial`, which behaves as undefined. Chrome probe of Button rest colours in all 8 variants: Infinia is identical to HEAD. One rendered difference is intentional (fix 5): Infinia Buttons now show their own existing hover, active and disabled tokens in Storybook, where before they were masked to the resting colours.

| # | Fix | Where | Result |
|---|---|---|---|
| 1 | Dark `--color-text-on-primary` `#111827` (dark fills are light); dark inverse bar `#374151` / `#f3f4f6`. New `--color-on-noir: #ffffff` keeps the `AppTopbar theme="dark"` Noir bar white (Infinia sets it `initial`, so its fallback is unchanged) | `tokens.css:680-683`, `:502`; `AppTopbar.css:49` | on brand-primary 17.74 (was 1.00); Table "dark" header on text-primary 16.12; Stepper complete on success 9.23; inverse 9.37 (was 1.00); Spinner inverse ring on the `#2563eb` primary Button 3.43 (non-text ≥ 3) |
| 2 | Badge role tokens `--color-badge-{neutral,primary,success,warning,danger,info}-{soft,solid,outline}-{fg,bg}` bound in the classic base (soft → `-fill`/`-strong`; solid success → strong fill + surface text; primary → `state-selected-*`; outline → `-strong` / `state-selected-text`). Infinia blocks set them `initial`. Badge.css reads them with the previous expression as fallback | `tokens.css:468-502`, Infinia `:1231`, `:1494`; `Badge.css:45-167` | every tone ≥ 4.5 in all 8 non-Infinia themes; outline is checked on both surface and page (144 cases) |
| 3 | Dark accent `--color-theme-primary #60a5fa` / hover `#93c5fd` / active `#3b82f6` with `--color-theme-text #111827`. The primary Button keeps blue-600 with explicit `#ffffff` text (default and disabled) | `tokens.css:736-741`, `:763`, `:771` | theme-text on primary 6.98 (was 3.68), on hover 9.84, on active 4.82; accent as text on surface 5.77 / page 6.98 (was 3.99), so outline-primary, secondary text and link all pass; outline text on its hover fill 4.95; primary Button 5.17 |
| 4 | Dark `--color-info-strong` `#93c5fd` | `tokens.css:720` | on info-fill 5.94 (was 4.20); surface 8.14 |
| 5 | Resting-state `!important` Button rules (unscoped, `#storybook-root`, `.docblock-preview`, `.btn-base.*`, gradient) now carry `:not(:disabled, [aria-disabled="true"], :hover, :active)`. Hover and active rules are `!important` and set the text colour; gradient hover/active also force a transparent background-color | `tokens.css:1615-1680` (rest), `:1737-1748` (gradient), `:1764-1953` (variants) | Chrome probe (`:hover`/`:active` rewritten to classes, same specificity): classic primary rest `#0d0d0d` / hover `#1a1a1a` / active `#000` / disabled `#2b2b2b`+`#b3b3b3`; dark primary `#2563eb` / `#1d4ed8` / `#1e40af` / disabled `#1e3a8a`. At HEAD all states equalled rest. This also fixed apps: the unscoped `!important` rest rule had masked hover outside Storybook too |

**Tests (`src/design-system/interactionStates.test.ts:282` onward):**
- Fix 1: dark on-primary on brand, text-primary and success; inverse pair; Spinner inverse ring; `--color-on-noir` vs `--color-noir-100` in all 8 themes.
- Fix 2: 144 badge pairs, plus "Badge.css reads the roles" and "Infinia leaves the roles unset".
- Fix 3: accent pair, hover and active, accent-as-text for 5 tokens on surface and page, outline hover, primary Button.
- Fix 4: dark info pair, plus every status `-strong` on its own `-fill` in all 8 themes.
- Fix 5: every `!important` rest selector for 9 variants contains the rest guard; hover and active rules are all `!important` and set `color`.
- Mutation check: run against HEAD `tokens.css` and `Badge.css`, the new tests fail per group (fix1 13, fix2 145, fix3 7, fix4 2, fix5 17).
- Full suite: **1519 passed / 75 files** (includes Slice L/M/O files). tsc is clean for touched files. `npx storybook build -o <scratch>` succeeds.

**New open items (not in the fix list):**
- Classic and dark `--button-success-bg #28a745` with white text is 3.13:1 (status Buttons were never re-tokened for dark, and classic is pre-existing). It is the same class of defect as the Badge fix; I left it because it was outside fix-list 1–5.
- infinia-dark `AppTopbar theme="dark"`: `--color-text-on-primary #111111` on noir `#111111` (pre-existing). Infinia is locked, so the new `--color-on-noir` role is unset there.

**Files touched in iteration 2:** `src/design-system/tokens.css`, `src/design-system/interactionStates.test.ts`, `src/components/atoms/Badge/Badge.css`, `src/components/molecules/AppTopbar/AppTopbar.css`. No portal files or `package.json` (Slice O).
