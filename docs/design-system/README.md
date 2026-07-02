# Design system

This folder is the **canonical source of truth** for design rules.

| File | Purpose |
|------|---------|
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | **Principles + rules** — §22a canonical zones, §34 FeedbackStates, §35 Toast (spec), §35a agent routing |
| [`DESIGN_SYSTEM_TOKENS_REFERENCE.md`](./DESIGN_SYSTEM_TOKENS_REFERENCE.md) | **Token/CSS tables** — summary §1–14 tables + `:root` snapshot (runtime: `tokens.css`) |
| [`THEMES.md`](./THEMES.md) | Theme enable syntax, contrast matrix, component QA, Storybook manager sync |
| [`COMPONENT_AUDIT.md`](./COMPONENT_AUDIT.md) | Production checklist — a11y, tokens, dark mode, zones |
| [`tokens.md`](./tokens.md) | Quick token import and implementation reference |
| [`../FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md) | Shipped `EmptyState` / `ErrorState` / `OfflineBanner` / `FeedbackState` API |
| [`UX-Governance-Design-System.md`](./UX-Governance-Design-System.md) | Stable link alias → canonical content in `DESIGN_SYSTEM.md` |

Runtime token values live in **`src/design-system/tokens.css`** and are published as **`ui-common-components/design-system/tokens.css`**.

Return to **[`../README.md`](../README.md)** for the full `docs/` reading order, inventory, and flow diagrams (includes `internal/`).
