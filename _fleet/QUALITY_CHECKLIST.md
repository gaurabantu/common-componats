# Quality Checklist — componant-ui-harness

The compliance-reviewer agent runs every generated component, screen, hook, and PR diff through this checklist. Each item is testable: it either passes (cite file:line evidence) or fails (cite file:line + the rule violated + the fix).

Three dimensions, each gated: **Accessibility (WCAG 2.2 AA)**, **Security**, **Responsiveness**. A component or screen does not ship until all three sections pass or every failure is explicitly accepted with a reason.

---

## A. Accessibility — WCAG 2.2 AA

Source of truth: `AGENTS.md` → "Accessibility checklist" + `docs/design-system/DESIGN_SYSTEM.md`. This section extends, not replaces, those rules.

### A1. Keyboard operability
- [ ] Every interactive element is reachable via Tab in a logical order
- [ ] `Enter` activates buttons/links; `Space` activates buttons
- [ ] `Escape` closes `Modal`, `AlertDialog`, `Popover`, `DropdownMenu`, `Combobox` (via `useDismissableLayer`)
- [ ] `Tab` cycles within `Modal`/`Popover` (via `useFocusTrap`) — focus does not escape to background
- [ ] No keyboard trap: focus can leave any container via Tab/Escape
- [ ] Custom widgets (Tabs, Combobox, Stepper, Calendar) implement arrow-key navigation per ARIA APG

### A2. Touch targets & spacing
- [ ] All interactive elements ≥ 44×44px touch target (AGENTS.md rule)
- [ ] Adjacent interactive elements have ≥ 8px gap to prevent mis-taps

### A3. Focus visibility
- [ ] Focus rings visible on every focusable element (`--color-focus-ring` token, never `outline: none` without replacement)
- [ ] `:focus-visible` used (not `:focus`) so mouse clicks don't show rings
- [ ] Focus order matches visual order (no positive `tabindex` unless justified)

### A4. Color & contrast
- [ ] Text contrast ≥ 4.5:1 (normal text), ≥ 3:1 (large text ≥ 24px or 19px bold) — WCAG 2.2 AA
- [ ] Non-text UI components (icon buttons, borders) contrast ≥ 3:1 — WCAG 2.2 AA 1.4.11
- [ ] Color is not the sole carrier of meaning (status badges pair color with text/icon)
- [ ] Dark mode (`[data-theme="dark"]`) maintains the same contrast ratios

### A5. Forms & labels
- [ ] Every `Input`, `TextArea`, `Select`, `Combobox`, `OtpBox`, `DatePicker` has a `<label>` (or `aria-label`/`aria-labelledby`) associated via `id`
- [ ] Error messages linked via `aria-describedby` to the input they describe
- [ ] Required fields marked with `aria-required="true"` and visible indicator (not color alone)
- [ ] `aria-live="polite"` on status messages; `"assertive"` on errors (AGENTS.md rule)

### A6. Tables & data
- [ ] `Table` (data-driven) has `TableHead` with column headers (`<th scope="col">`)
- [ ] Row headers present when needed (`<th scope="row">`)
- [ ] Caption or `aria-label` on the table describes its content

### A7. Overlays & dialogs
- [ ] `Modal` / `AlertDialog` have `aria-label` or `aria-labelledby` (AGENTS.md rule)
- [ ] `Popover` / `DropdownMenu` triggers have `aria-haspopup` and `aria-expanded`
- [ ] Background content has `aria-hidden="true"` or `inert` while overlay is open
- [ ] Focus returns to the trigger element when overlay closes

### A8. Feedback states
- [ ] `EmptyState` / `ErrorState` have `aria-labelledby` + `aria-describedby` (built-in via `useId` — verify present)
- [ ] `OfflineBanner` uses `role="status"` + `aria-live="polite"`
- [ ] `FeedbackState` variant router announces state changes to screen readers

### A9. Motion & animation
- [ ] `prefers-reduced-motion` respected (via `usePrefersReducedMotion` or CSS `@media`)
- [ ] No auto-playing motion > 5 seconds without a pause control
- [ ] CSS-only animations (NoDataAnimation, etc.) degrade gracefully when reduced

### A10. Screen reader semantics
- [ ] Icon-only buttons have `ariaLabel` (AGENTS.md: `icon` + `ariaLabel`)
- [ ] Decorative icons have `aria-hidden="true"` or empty `alt`
- [ ] Live regions announce dynamic content changes (search results, async data)

---

## B. Security

For a React component library consumed by SaaS/dashboard/enterprise apps, security means: no XSS vectors, no focus-escape bugs, safe file handling, dependency hygiene, and CSP-friendliness.

### B1. XSS prevention
- [ ] No `dangerouslySetInnerHTML` anywhere in generated code (AGENTS.md Never rule)
- [ ] User-supplied strings rendered as text nodes, not HTML — verify no `innerHTML` / `outerHTML` assignment
- [ ] `TextView`, `GradientText`, `Hyperlink` content is text-interpolated, not raw HTML
- [ ] `Modal` / `AlertDialog` titles and descriptions are text, not parsed HTML

### B2. Input sanitization
- [ ] `Input`, `TextArea`, `Combobox` render values via React's JSX (auto-escaped) — no manual DOM manipulation
- [ ] `OtpBox` with `mask` prop masks sensitive input (PIN/OTP) and does not log values to console
- [ ] `Input` with `disableClipboard` blocks copy on sensitive fields (passwords, tokens)
- [ ] `FileUpload` / `Dropzone` validates file type, size, and count before accepting (see `docs/UI_COMPONENTS_GUIDE.md`)

### B3. Focus security
- [ ] `Modal` / `AlertDialog` trap focus within the dialog (via `useFocusTrap`) — prevents background interaction
- [ ] Focus returns to trigger on close (restores prior context)
- [ ] `Popover` / `DropdownMenu` dismiss on outside click + Escape (via `useDismissableLayer`)
- [ ] No focusable elements in the background while a modal is open (`inert` or `aria-hidden` on siblings)

### B4. Dependency & supply chain
- [ ] No new dependencies added without an entry in `docs/internal/PACKAGES.md` rationale
- [ ] `npm audit` passes with no high/critical vulnerabilities in the dependency tree
- [ ] Peer dependencies declared explicitly in `package.json` (not silently required)
- [ ] No `eval`, `new Function`, or `Function()` constructor in generated code (CSP violation)

### B5. Content Security Policy (CSP) friendliness
- [ ] No inline event handlers (`onclick=`, `onload=` attributes) — use React handlers
- [ ] No inline `<style>` or `<script>` blocks in component output
- [ ] CSS animations use classes/tokens, not inline `style` with dynamic JS strings
- [ ] `window.location` / `document.cookie` access is guarded and justified

### B6. Form & validation security
- [ ] Validation runs client-side (UX) AND is documented as not a substitute for server-side validation
- [ ] `ui-pan-validators` integration (where used) does not leak PII in error messages
- [ ] Password fields use `type="password"` + `showToggleIcon` (never plain text by default)
- [ ] Autocomplete attributes set appropriately (`autocomplete="off"` for OTP, `"current-password"` for login)

### B7. Secrets hygiene
- [ ] No API keys, tokens, passwords, or PII hardcoded in component source, stories, or tests
- [ ] Storybook stories use mock/fictional data only (no real user data)
- [ ] `.env` files not committed; `process.env.*` access is typed and guarded

---

## C. Responsiveness

Source of truth: Storybook viewports (375, 768, 1440), `docs/design-system/DESIGN_SYSTEM.md`, `docs/COMPOSITION_RULES_1.md` (density rules).

### C1. Breakpoints & layout
- [ ] Component/layout tested at 375px (mobile), 768px (tablet), 1440px (desktop) — Storybook viewport toolbar
- [ ] No fixed `width` / `maxWidth` that breaks below 375px
- [ ] `Grid` uses responsive columns (not a fixed count on all breakpoints)
- [ ] `DashboardShell` collapses sidebar to rail/drawer on narrow screens (no fixed `marginLeft: 320` gap — per README warning)

### C2. Navigation responsiveness
- [ ] `AppSidebar` collapses to rail mode or drawer on mobile (per `docs/internal/SIDEBAR_NAVIGATION_SYSTEM.md`)
- [ ] `AppTopbar` search expands to full-width on narrow screens; hamburger menu appears (per `docs/internal/APP_TOPBAR_SYSTEM.md`)
- [ ] `Breadcrumb` truncates or wraps gracefully on narrow screens
- [ ] `Stepper` switches to vertical or condensed layout on mobile

### C3. Data display responsiveness
- [ ] `Table` scrolls horizontally on small screens (or stacks columns) — no content clipping
- [ ] `Tabs` with many triggers wrap or scroll horizontally (no overflow off-screen)
- [ ] Charts (`LineChart`, `BarChart`, `PieChart`, `AreaChart`) resize via container width, not fixed pixel dimensions
- [ ] `Card` content reflows; `CardAction` does not overflow on mobile

### C4. Forms responsiveness
- [ ] `Form` stacks fields vertically on mobile (single column) when needed
- [ ] `Input`, `Select`, `Combobox` are full-width on mobile (or constrained with a max-width)
- [ ] `OtpBox` boxes fit within 375px viewport
- [ ] `DatePicker` popover positions within viewport (no off-screen calendar)

### C5. Touch & interaction
- [ ] Touch targets ≥ 44×44px on mobile (same as A2 — doubly enforced)
- [ ] `Button` sizes: `sm` minimum on mobile (not `xxs`/`xs` for primary actions)
- [ ] Hover-only interactions (`ToolTip`, `Popover` hover triggers) have a tap fallback on touch devices
- [ ] `useLongPress`, `useSwipe`, `useTouchHandler` wired where gestures are expected

### C6. Theme & preference support
- [ ] Dark mode (`[data-theme="dark"]`) renders correctly — no hardcoded light-only colors
- [ ] `prefers-reduced-motion` reduces or disables animations (same as A9 — doubly enforced)
- [ ] `useMediaQuery` used for JS-driven responsive logic (not `window.innerWidth` polling)
- [ ] High-contrast mode (`forced-colors`) does not break layout (token borders remain visible)

### C7. Density & composition
- [ ] 5-zone layout (AGENTS.md §22a) holds at all breakpoints — zones stack on mobile, not disappear
- [ ] CTA hierarchy preserved: one `variant="primary"` per zone max (no competing CTAs introduced by responsive reflow)
- [ ] `size="sm"` used for compact density where `COMPOSITION_RULES_1.md` dictates
- [ ] No horizontal scrollbar introduced at 375px (except intentional `Table` scroll)

---

## How to use this checklist

1. **Per component build** (`component-author`): self-check A, B, C before marking the component done. Failures fixed in-place.
2. **Per screen compose** (`screen-composer`): self-check composition-specific items (C1, C7, A5, A7) before handing to review.
3. **Per audit/review** (`compliance-reviewer`): run all of A, B, C against the target. Output a pass/fail verdict per item with `file:line` evidence for every failure and a ranked fix list.
4. **Per PR review** (`compliance-reviewer`): run against the git diff — only check lines touched by the diff, but flag regressions in surrounding code if the change introduces them.

### Verdict format (compliance-reviewer output)
```
## Accessibility: PASS / FAIL
- [PASS] A1 Keyboard — Tab order verified (src/components/X/index.tsx:42)
- [FAIL] A4 Contrast — Button ghost variant text #999 on #fff = 2.85:1 (src/components/X/index.tsx:88) — use token --color-text-secondary

## Security: PASS / FAIL
...

## Responsiveness: PASS / FAIL
...

## Ranked fix list
1. [component-author] Fix contrast in X (src/components/X/index.tsx:88)
2. [screen-composer] Add aria-live to async table (app/dashboard/page.tsx:120)
```
