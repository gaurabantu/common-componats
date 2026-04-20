# Consumer setup guide

Use this file when you share the library with other teams together with:

- the package file in `docs/ui-common-components-0.0.1.tgz` or the published npm package
- the `docs/` folder

This guide explains what users need to install in **React** and **Next.js** projects and how to start using the design system correctly.

## What to share

Give users:

1. the package file: `docs/ui-common-components-0.0.1.tgz`
2. the `docs/` folder
3. this `README_DOC.md`

> The package installs the components.  
> The `docs/` folder explains how to use them and how AI should follow the design system.

## Install

### React app

Make sure the project already has React:

```bash
npm install react react-dom
```

Then install the library from the shared `.tgz` file:

```bash
npm install ./docs/ui-common-components-0.0.1.tgz
```

### Next.js app

Next apps already include `react` and `react-dom`, so install only the library:

```bash
npm install ./docs/ui-common-components-0.0.1.tgz
```

### Optional peer dependency

Install this only if your usage needs the related validation helpers:

```bash
npm install ui-pan-validators
```

## Required imports

Import design tokens once in your app root:

```tsx
import "ui-common-components/design-system/tokens.css";
```

Import component CSS as well:

```tsx
import "ui-common-components/index.css";
```

## Where to add the imports

### React

Add to your app entry file, for example:

- `src/main.tsx`
- `src/index.tsx`

### Next.js

Add to:

- `app/layout.tsx`, or
- `pages/_app.tsx`

## Read these docs first

After installing, read these files in order:

1. `docs/README.md`
2. `docs/UI_COMPONENTS_GUIDE.md`
3. `docs/design-system/DESIGN_SYSTEM.md`
4. `docs/design-system/tokens.md`
5. `docs/AI_USAGE_GUIDE.md`

## What each doc is for

- `docs/README.md` — documentation entry point
- `docs/UI_COMPONENTS_GUIDE.md` — which component to use and key props (forms, `Card` + compound parts, `Table` + `TableRoot` / primitives, `Tabs` / `Accordion` / `ButtonGroup` / `Stepper` / `Breadcrumb`, `Popover` / `DropdownMenu`, `FileUpload`, `Calendar` / `DatePicker`, charts + `ChartTooltip`, `DashboardShell`)
- `docs/design-system/DESIGN_SYSTEM.md` — visual and UX rules
- `docs/design-system/tokens.md` — token import and token usage (including `--color-border-subtle` for soft dividers vs `--color-border-default` for structural borders)
- `docs/AI_USAGE_GUIDE.md` — how AI tools should use the docs together

## Basic usage example

```tsx
import { Button, Card, TextView } from "ui-common-components";

export default function Example() {
  return (
    <Card title="Welcome" subtitle="Get started below">
      <TextView as="p" variant="body">
        Legacy-style card with title props.
      </TextView>
      <Button variant="primary">Continue</Button>
    </Card>
  );
}
```

Compound `Card` (header + content + footer) is documented in `docs/UI_COMPONENTS_GUIDE.md` (`CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`, `size`).

## Dashboard layout (sidebar + top bar + main)

For app-style screens with a left rail, header, and scrolling main area, use **`DashboardShell`** with **`AppSidebar`** and **`AppTopbar`** (see `docs/UI_COMPONENTS_GUIDE.md` for props). Do not use the old name `AppShell` in new code — it is only a backward-compatible alias for the same component.

```tsx
import {
  DashboardShell,
  AppTopbar,
  type AppSidebarSection,
} from "ui-common-components";

const sections: AppSidebarSection[] = [
  {
    id: "primary",
    tier: "primary",
    grouping: "spacing",
    items: [{ id: "home", label: "Home" }],
  },
];

export default function DashboardExample() {
  return (
    <DashboardShell
      sidebar={{
        header: { title: "Workspace" },
        sections,
        activeItemId: "home",
        fixed: true,
      }}
      topbar={<AppTopbar title="Home" actions={[]} />}
      contentStyle={{ padding: 24 }}
    >
      {/* page content scrolls here; top bar and sidebar chrome stay fixed */}
    </DashboardShell>
  );
}
```

## Rules to follow

- Use `ui-common-components` before creating custom UI
- Use **`DashboardShell`** (not `AppShell`) for dashboard-style layouts with sidebar + top bar + main content
- Use tokens instead of hardcoded values
- Keep one primary CTA per screen
- Keep inputs and actions in separate rows
- Preserve accessibility and focus states
- Do not use Bootstrap with this library

## For AI tools

If a team is using Cursor, Claude, Copilot, or another AI tool, give it this instruction:

```md
Use `ui-common-components` and follow the UX Governance design system.

Read these files in order:
1. `docs/README.md`
2. `docs/UI_COMPONENTS_GUIDE.md`
3. `docs/design-system/DESIGN_SYSTEM.md`
4. `docs/design-system/tokens.md`
5. `docs/AI_USAGE_GUIDE.md`

Rules:
- use library components before building custom UI
- for dashboard layouts (sidebar + top bar + main), use `DashboardShell` with `AppSidebar` and `AppTopbar` — do not use the name `AppShell` in new code
- for structured cards, use `Card` compound exports (`CardHeader`, `CardTitle`, `CardContent`, …) per `docs/UI_COMPONENTS_GUIDE.md`
- use tokens instead of hardcoded values
- keep inputs and actions in separate rows
- keep one primary CTA per screen
- preserve accessibility and focus states
```
