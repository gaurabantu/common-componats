# AppSidebar notes

Internal reference for maintainers working on `AppSidebar` and `DashboardShell`.

## Use this file when

- updating sidebar collapse / drawer behavior
- reviewing shell layout alignment
- checking advanced rail structure not needed by everyday consumers

## Core reminders

- Expanded sidebar width should remain `320px` unless the design system changes.
- Prefer `DashboardShell` when the right column must stay aligned with sidebar collapse / expand.
- Use responsive drawer behavior on narrow viewports instead of custom hacks.
- Visual rules still come from [`../design-system/DESIGN_SYSTEM.md`](../design-system/DESIGN_SYSTEM.md).
- Public API usage belongs in [`../UI_COMPONENTS_GUIDE.md`](../UI_COMPONENTS_GUIDE.md).
