# Component production-readiness checklist

> **Last verified against library:** 2026-07-02 · `ui-common-components` v0.0.2  
> **Use when:** shipping a new component, reviewing a PR, or validating AI-generated UI before merge.

Run this checklist for every component or screen. Pair with [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md), [`THEMES.md`](./THEMES.md), and [`../FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md).

---

## 1. Tokens & styling

- [ ] No hard-coded hex, px spacing, or font sizes when a token exists (`--space-*`, `--color-*`, `--radius-*`, `--text-*`)
- [ ] `tokens.css` imported once at app root (not duplicated `:root` blocks)
- [ ] Borders use `--color-border-default` (structural) or `--color-border-subtle` (decorative)
- [ ] Focus uses `--color-focus-ring` / `--color-border-focus` — not `--color-brand-secondary` alone
- [ ] Shadows from `--shadow-*` scale only (no tinted custom shadows)
- [ ] Accent colours used only as contained highlights (badges, avatars, status) — not page chrome

---

## 2. Accessibility (WCAG 2.2 AA)

- [ ] Text contrast ≥ 4.5:1 on all backgrounds used by the component
- [ ] Non-text UI (borders, icons, focus ring) ≥ 3:1 against adjacent colours
- [ ] Interactive targets ≥ 44×44px (or equivalent hit area with padding)
- [ ] Keyboard: all actions reachable; visible focus indicator (2px min, `--color-focus-ring`)
- [ ] Screen readers: labels on inputs; `aria-*` on dialogs, live regions, and feedback states
- [ ] Status not conveyed by colour alone (icon + text + weight)
- [ ] `prefers-reduced-motion`: animations respect reduced motion (FeedbackStates SVG animations do)
- [ ] Feedback illustrations: decorative only (`aria-hidden`); static when reduced motion enabled

---

## 3. Dark mode & themes

- [ ] Verified on **`data-theme="dark"`** (text, borders, surfaces, focus ring)
- [ ] Verified on at least one light variant (`blue` default, `green`, or `mist`)
- [ ] No assumptions that page background is white (`--color-bg-page` vs `--color-bg-surface`)
- [ ] Shell components (`AppTopbar`, `AppSidebar`) inherit `--app-shell-*` / `--app-sidebar-*` tokens

See [`THEMES.md`](./THEMES.md) for full theme matrix and QA stories.

---

## 4. Layout & composition

- [ ] Screen uses **5 zones** per **DESIGN_SYSTEM §22a** (primary CTA in Zone 1, alerts in Zone 2)
- [ ] One **`primary`** CTA per zone at the same hierarchy level
- [ ] Inputs and action buttons in separate rows (§22) unless search-with-button exception
- [ ] `DashboardShell` used for admin layouts (not ad-hoc flex + sidebar)

---

## 5. Feedback & async states

- [ ] Loading → empty → error → offline → ready driven by `useAsyncContentPhase` where applicable
- [ ] `EmptyState` / `ErrorState` / `OfflineBanner` from library — not custom panels
- [ ] Zone 2: slim `OfflineBanner` (no `image`); Zone 4: full panel with optional animation
- [ ] No Toast assumed — use §35 interim patterns until Toast ships

---

## 6. Forms & actions

- [ ] Every input has an associated `<label>` or `aria-label`
- [ ] Errors linked via `aria-describedby`
- [ ] Destructive flows use `AlertDialog` with explicit confirm/cancel hierarchy
- [ ] Modals trap focus and restore on close

---

## 7. Performance & API

- [ ] No unnecessary re-renders from inline object/function props in hot paths
- [ ] Exported types match public API in `UI_COMPONENTS_GUIDE.md`
- [ ] Storybook **Playground** story with `argTypes` for all public props
- [ ] Unit tests for non-trivial logic (hooks, state machines, a11y attributes)

---

## 8. Documentation

- [ ] Listed in `UI_COMPONENTS_GUIDE.md` if public
- [ ] Storybook autodocs description mentions tokens and when to use
- [ ] Cross-links to DESIGN_SYSTEM section if governance-specific (modals → §27, feedback → §34)

---

## Quick pass by component category

| Category | Extra checks |
|----------|----------------|
| **Forms** | Validation messages, disabled states, focus order |
| **Data (`Table`)** | Sortable headers, empty state, row actions `ghost sm` |
| **Shell** | Theme tokens on topbar/sidebar; mobile collapse |
| **Charts** | Axis labels readable on dark; tooltip contrast |
| **Feedback** | `tone` prop, `compact`, CTA variants per COMPOSITION_RULES_1 |

---

## Agent discovery scorecard (re-scored 2026-07-07)

> Old scores (5–6/10) reflected a **pre-fix snapshot** — before Playground rollout, `AGENTS.md` intent tables, and Card/Button/Badge guide expansion. Re-score measures **can an agent discover and use props correctly today?**

| Area | Was | **Now** | Evidence |
|------|-----|---------|----------|
| TypeScript prop completeness | 9/10 | **9/10** | `*.types.ts` + `dist/index.d.ts` |
| UI_COMPONENTS_GUIDE prop coverage | 5/10 | **9/10** | Card, Button, Badge full prop tables + Tabs depth; intent tables in `AGENTS.md` |
| Storybook Playground coverage | 6/10 | **10/10** | 38/38 `src/components/**/*.stories.tsx` export Playground + `argTypes` |
| Agent-safe naming | 4/10 | **8/10** | `variant` glossary per component; export alias table (`Input`, `Avtar`). Polymorphic `variant` is intentional — not a doc gap |
| Escape-hatch discipline | 3/10 | **8/10** | Docs tier props (Always / Never for agents); API keeps power-user overrides |
| DESIGN_SYSTEM ↔ code alignment | 6/10 | **9/10** | §26 uses `variant` + `elevation`; Card default `bordered`; Figma `type` mapped in spec |

**What still blocks a literal 10/10:** polymorphic `variant` across components (library design choice) and escape-hatch props still on the public API (intentional for brand overrides). Agents should follow `AGENTS.md` tier rules — not remove API surface.

---

Return to [`README.md`](./README.md) · [`../README.md`](../README.md)
