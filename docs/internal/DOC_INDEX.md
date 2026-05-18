# Internal documentation index

Use this folder when you are maintaining the library, consuming it in an app, reviewing quality, or wiring AI tooling.

**Read every Markdown file here** in the order given in [`../README.md`](../README.md). It is part of the required full `docs/` reading path, not a separate optional track.

---

## Primary docs (same repo, `docs/` root)

- [`../README.md`](../README.md) — full documentation flow and numbered list
- [`../AGENTS.md`](../AGENTS.md) — AI memory + export names + CTA hierarchy table
- [`../AI_USAGE_GUIDE.md`](../AI_USAGE_GUIDE.md) — Always/Never rules + AI workflow
- [`../UI_COMPONENTS_GUIDE.md`](../UI_COMPONENTS_GUIDE.md) — full component catalog (patterns, `Card` compound API, `Table` data + semantic primitives, `Select`/`Combobox`, `Tabs`, `Stepper`, forms, shell, charts including `ChartTooltip`)
- [`../FEEDBACK_STATES_GUIDE.md`](../FEEDBACK_STATES_GUIDE.md) — `EmptyState`, `ErrorState`, `OfflineBanner`, `FeedbackState`, animated illustrations, zone mapping
- [`../HOOKS_GUIDE.md`](../HOOKS_GUIDE.md) — all 25 `ui-common-hooks` with examples
- [`../design-system/DESIGN_SYSTEM.md`](../design-system/DESIGN_SYSTEM.md) — visual governance
- [`../design-system/tokens.md`](../design-system/tokens.md) — token import, `--color-border-subtle` vs `--color-border-default`
- [`../../COMPOSITION_RULES_1.md`](../../COMPOSITION_RULES_1.md) — 5 visual zones, CTA hierarchy, information density

---

## Internal docs (this folder)

| File | Use |
|------|-----|
| [`README.md`](./README.md) | What belongs in `internal/` |
| [`APP_TOPBAR_SYSTEM.md`](./APP_TOPBAR_SYSTEM.md) | Top bar notes and implementation reminders |
| [`SIDEBAR_NAVIGATION_SYSTEM.md`](./SIDEBAR_NAVIGATION_SYSTEM.md) | Sidebar notes and implementation reminders |
| [`PACKAGES.md`](./PACKAGES.md) | Dependency explanations |
| [`AI_UNIVERSAL_DESIGN_RULES.md`](./AI_UNIVERSAL_DESIGN_RULES.md) | Portable AI instruction reference |

---

## Package locations

| Path | Package | Notes |
|------|---------|-------|
| `/` | `ui-common-components` (v0.0.2) | Main component library |
| `packages/ui-common-hooks/` | `ui-common-hooks` (v0.3.0) | 25 typed hooks companion |
| `src/components/molecules/FeedbackStates/` | Module | EmptyState, ErrorState, OfflineBanner, FeedbackState, animations |
| `src/stories/` | Storybook | All component + hook stories |
| `dist/` | Build output | Do not edit directly |
