# AppTopbar notes

Internal reference for maintainers working on `AppTopbar`.

## Use this file when

- updating `AppTopbar` behavior
- reviewing sticky header / responsive shell behavior
- checking interaction details not needed by everyday consumers

## Core reminders

- `AppTopbar` is page context plus actions, not full navigation.
- Keep the visible page title clear and accessible.
- Use `search`, `actions`, `profile`, and responsive menu props instead of custom topbar shells when possible.
- Visual rules still come from [`../design-system/DESIGN_SYSTEM.md`](../design-system/DESIGN_SYSTEM.md).
- Public API usage belongs in [`../UI_COMPONENTS_GUIDE.md`](../UI_COMPONENTS_GUIDE.md).
