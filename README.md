# UI Common Components

Reusable React components built around the UX Governance design system: token-driven styling, accessible defaults, dark-mode support, and a component surface aimed at SaaS, dashboard, and enterprise applications.

## What this package includes

- **form controls:** `Input`, `InputSearch`, `TextArea`, `Select` (native), `Combobox` (search / icons / multi), `CheckBox`, `Switch`, `RadioGroup`, `OtpBox`, `DatePicker`
- **display:** `Badge`, `Chip`, `Tag`, `TextView`, `GradientText`, `Divider`, `ProgressBar`, `ToolTip`, `Hyperlink`, `Icon`, `Avtar`
- **Card:** default export plus **`CardHeader`**, **`CardTitle`**, **`CardDescription`**, **`CardAction`**, **`CardContent`**, **`CardFooter`** (compound layout), or legacy props (`title`, `subtitle`, `cover`, `actions`, …); **`size`** `"default"` | `"sm"`
- **layout:** `Form`, `Grid`, `GridItem`
- **patterns / molecules:** `Tabs` (+ `TabsList`, `TabsTrigger`, `TabsContent`), `Accordion` (+ item/trigger/content), `ButtonGroup` (+ separator, text), `Stepper` (+ `StepperStep`), `Breadcrumb` (+ `BreadcrumbItem`), `Popover` (+ `PopoverTrigger`, `PopoverContent`), `DropdownMenu` (+ trigger/content/item), `FileUpload` (+ `Dropzone` and security helpers), `Calendar`, `Modal`, `AlertDialog`
- **navigation and shell:** `DashboardShell` (`AppShell` alias), `AppSidebar`, `AppTopbar`
- **data:** `Table` (column-driven grid) and semantic primitives (`TableRoot`, `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`)
- **charts (native SVG):** `LineChart`, `BarChart`, `PieChart`, `AreaChart`, `ChartTooltip` (used internally; exported for advanced use)
- **theming helpers:** `mergeSidebarTokensStyle`, `mergeTopbarTokensStyle`

## Core principles

- token-first styling via `design-system/tokens.css`
- accessibility-first defaults with visible focus states and keyboard support
- dark mode compatibility via `[data-theme="dark"]`
- React 18+ support with ESM, CJS, and TypeScript exports
- dashboard-ready navigation components, not just isolated form fields

## Installation

```bash
npm install ui-common-components
```

### Peer dependencies

| Package | Version | Notes |
|---------|---------|-------|
| `react` | `>=18` | required |
| `react-dom` | `>=18` | required |
| `next` | `>=14` | optional |
| `ui-pan-validators` | `0.0.1` | optional, used by validation-heavy input flows |

## Setup

Import design tokens once in your app root:

```tsx
import "ui-common-components/design-system/tokens.css";
```

Import bundled component styles (required for molecules such as `AppSidebar` / `AppTopbar`, and any CSS shipped beside Tailwind utilities). Either path is valid:

```tsx
import "ui-common-components/index.css";
// or: import "ui-common-components/dist/index.css";
```

`package.json` **exports** explicitly includes these specifiers so Vite, Next.js, and other bundlers can resolve them (the file exists at `dist/index.css` after `npm run build`).

Optional Tailwind preset:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/ui-common-components/dist/**/*.js",
  ],
  presets: [require("ui-common-components/tailwind.preset.js")],
};
```

Optional dark mode:

```tsx
<html data-theme="dark">
```

## Import paths and bundle size

The package exposes a **main entry** and **focused subpaths** so apps can load less JavaScript when a screen only needs part of the kit.

| Import from | Use when |
|-------------|----------|
| `ui-common-components` | You need components from several areas (e.g. forms + layout), or a single small example. |
| `ui-common-components/charts` | Charts (`LineChart`, `BarChart`, `PieChart`, `AreaChart`), optional `ChartTooltip`, and chart types. |
| `ui-common-components/shell` | Only `DashboardShell`, `AppShell`, `AppSidebar`, `AppTopbar`, and shell helpers/types. |
| `ui-common-components/table` | Data `Table` (`columns` / `data`) and semantic primitives (`TableRoot`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, …), plus types. |

Examples:

```tsx
import { LineChart } from "ui-common-components/charts";
import { DashboardShell, AppTopbar } from "ui-common-components/shell";
import { Table } from "ui-common-components/table";
```

Everything is still available from the main entry for backward compatibility. Prefer subpaths on routes or features that only need charts, shell, or table to keep the shipped bundle smaller.

## Quick start

```tsx
import { Button, Input, Modal, TextView } from "ui-common-components";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
      <TextView as="h1" variant="h2">
        Welcome back
      </TextView>

      <Input
        label="Email"
        value={email}
        onChange={setEmail}
        validation="email"
        placeholder="name@company.com"
      />

      <Button variant="primary" onClick={() => setOpen(true)}>
        Continue
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Submitted">
        Your form was submitted successfully.
      </Modal>
    </div>
  );
}
```

## Dashboard shell example

**Prefer `DashboardShell`** (same component as legacy `AppShell`) when you want the sidebar, top bar, and right-side content area to behave as one responsive layout. It is a **layout helper**, not a visual design rule. Avoid a fixed `marginLeft: 320` — that leaves a gap when the rail is collapsed.

Use **`AppSidebar`** when you only need the left rail. Use **`DashboardShell`** when you want the sidebar, top bar, and right-side content area to stay in sync on collapse/expand. Visual design still comes from [`docs/design-system/DESIGN_SYSTEM.md`](docs/design-system/DESIGN_SYSTEM.md), your page content, and the shell governance docs under `docs/`.

`DashboardShell` gives you a managed **right column** with:

- `topbar` for `<AppTopbar />` or any header block
- `contentClassName` / `contentStyle` for the page section under the top bar
- zero default margin / padding on that content section, so it can stay full width unless you add spacing

```tsx
import {
  DashboardShell,
  AppTopbar,
  type AppSidebarSection,
} from "ui-common-components/shell";

const sections: AppSidebarSection[] = [
  {
    id: "primary",
    tier: "primary",
    grouping: "spacing",
    items: [
      { id: "overview", label: "Overview" },
      { id: "analytics", label: "Analytics" },
    ],
  },
];

export default function DashboardLayout() {
  return (
    <DashboardShell
      sidebar={{
        header: { title: "Workspace" },
        sections,
        activeItemId: "overview",
      }}
      topbar={<AppTopbar title="Overview" search={{ placeholder: "Search..." }} actions={[]} />}
      contentStyle={{ padding: 24, background: "var(--color-bg-page)" }}
    >
      {/* page content */}
    </DashboardShell>
  );
}
```

Manual layout (only if you do not use `DashboardShell`):

```tsx
import { AppSidebar } from "ui-common-components/shell";

export default function ManualLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AppSidebar fixed header={{ title: "Workspace" }} sections={sections} activeItemId="overview" />
      <main
        style={{
          flex: 1,
          minWidth: 0,
          marginInlineStart: "var(--app-sidebar-offset, 0px)",
          transition: "margin-inline-start 200ms ease",
        }}
      >
        …
      </main>
    </div>
  );
}
```

In short:

- `AppSidebar` = left rail component
- `DashboardShell` = left rail + managed right side layout (`AppShell` is the same export)
- `DashboardShell` does **not** choose cards, page spacing, or visual hierarchy for you

## Public exports

### Inputs

- `Input`
- `InputSearch`
- `TextArea`
- `Select`
- `Combobox`
- `CheckBox`
- `Switch`
- `RadioGroup`
- `OtpBox`
- `DatePicker`

### Display

- `Badge`, `Chip`, `Tag`

### Actions and overlays

- `Button`
- `Modal`
- `AlertDialog`
- `Popover`, `PopoverTrigger`, `PopoverContent`
- `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`

### Content and layout

- `TextView`
- `GradientText`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` (see [`docs/UI_COMPONENTS_GUIDE.md`](docs/UI_COMPONENTS_GUIDE.md); static aliases `Card.Header`, `Card.Title`, … on the default export)
- `Form`
- `Grid`
- `GridItem`
- `Divider`
- `ProgressBar`
- `ToolTip`
- `Hyperlink`
- `Icon`
- `Avtar`

### Patterns (molecules)

- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
- `ButtonGroup`, `ButtonGroupSeparator`, `ButtonGroupText`
- `Stepper`, `StepperStep`
- `Breadcrumb`, `BreadcrumbItem`
- `Calendar`
- `FileUpload`, `Dropzone` (and file-validation helpers — see types)

### Navigation and layout shell

- `DashboardShell` (recommended: sidebar + main offset for collapse/expand; `AppShell` alias)
- `AppSidebar`
- `AppTopbar`
- `mergeSidebarTokensStyle`
- `mergeTopbarTokensStyle`

Shell UX rules (dashboard / enterprise): [`docs/internal/SIDEBAR_NAVIGATION_SYSTEM.md`](docs/internal/SIDEBAR_NAVIGATION_SYSTEM.md), [`docs/internal/APP_TOPBAR_SYSTEM.md`](docs/internal/APP_TOPBAR_SYSTEM.md).

### Data and visualization

- `Table` (data-driven: `columns`, `data`, search, pagination, …)
- `TableRoot`, `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell` (compositional HTML table — same role as markup in [shadcn/ui Table](https://ui.shadcn.com/docs/components/radix/table); also `Table.Root`, `Table.Header`, … on the default export)
- `LineChart`
- `BarChart`
- `PieChart`
- `AreaChart`
- `ChartTooltip` (optional advanced composition; charts include interactive tooltips by default)

## Recommended usage patterns

- email field: `Input validation="email"`
- password field: `Input type="password" showToggleIcon`
- sensitive field: `Input mask disableClipboard`
- search bar: `InputSearch onSearch={...}`
- rich dropdown (search, icons, multi): `Combobox`; simple native list or `<optgroup>` sections: `Select` with `options` or `groups` (details in [`docs/UI_COMPONENTS_GUIDE.md`](docs/UI_COMPONENTS_GUIDE.md))
- OTP entry: `OtpBox variant="boxes" length={6}`
- date field: `DatePicker` (popover uses `Calendar`; `Calendar` is also available standalone)
- tabbed UI: `Tabs` + `TabsList` / `TabsTrigger` / `TabsContent` — use `variant` (`line` | `minimal` | `segmented`), `listLayout`, `activationMode`, and `contentAnimation` as needed (see guide)
- expandable FAQ: `Accordion` compound API
- grouped actions: `ButtonGroup` (+ optional `ButtonGroupSeparator`)
- wizard / steps: `Stepper` + `StepperStep` — `trackMode`, `appearance`, `linear`; per-step `icon`, `markerText`, `showCheckWhenComplete` (see guide; Storybook **Stepper · Icons**)
- trail / hierarchy: `Breadcrumb` + `BreadcrumbItem`
- anchored menu: `Popover` or `DropdownMenu`
- file uploads: `FileUpload` / `Dropzone`
- structured surfaces: `Card` with compound subcomponents (`CardHeader` / `CardTitle` / `CardContent` / `CardFooter`, etc.) or legacy `title` / `children` props
- confirmation flow: `Modal` or `AlertDialog`
- data-heavy list: `Table` with `columns` + `data`, or build with `TableRoot` / `TableBody` / `TableRow` / `TableCell` for full control
- dashboard shell: `DashboardShell` with `AppSidebar` + `AppTopbar`
- responsive sections: `Grid` + `GridItem`

## Navigation components

### `AppSidebar`

Use `AppSidebar` for left-side dashboard navigation with:

- data-driven `sections`
- nested navigation via `children`
- collapsed rail mode
- responsive drawer behavior
- footer identity and utility actions
- CSS-variable theming through `tokens`

### `AppTopbar`

Use `AppTopbar` for page context and top-level actions with:

- title-driven page context
- center search
- right-side action icons
- badge support
- profile trigger
- narrow-screen search expansion
- hamburger menu items or sidebar trigger fallback

## Theming

This package is built to be customized primarily through CSS variables.

Common token groups:

- color tokens such as `--color-text-primary`, `--color-bg-surface`, `--color-border-default` (structural outlines), and `--color-border-subtle` (decorative separators — modal/card/tab baseline, `Divider` default, button-group hairline; see [`docs/design-system/tokens.md`](docs/design-system/tokens.md))
- button tokens such as `--button-primary-default-bg`, `--button-primary-focus-ring`
- spacing tokens such as `--space-1` through `--space-8`
- radius tokens such as `--radius-xs`, `--radius-md`, `--radius-lg`
- typography tokens such as `--text-h1-size`, `--text-body-size`, `--font-family`
- shadow tokens such as `--shadow-sm`, `--shadow-md`, `--shadow-lg`

Example override:

```css
:root {
  --color-brand-primary: #16213e;
  --button-primary-default-bg: #16213e;
  --button-primary-hover-bg: #0f3460;
  --radius-md: 8px;
}
```

## Documentation map

Canonical docs live under **`docs/`** (start with [`docs/README.md`](docs/README.md)):

- [`docs/UI_COMPONENTS_GUIDE.md`](docs/UI_COMPONENTS_GUIDE.md): component selection and usage patterns
- [`docs/design-system/DESIGN_SYSTEM.md`](docs/design-system/DESIGN_SYSTEM.md): visual tokens, spacing, typography, accessibility
- [`docs/design-system/tokens.md`](docs/design-system/tokens.md): importing `tokens.css` and token hooks
- [`docs/internal/PACKAGES.md`](docs/internal/PACKAGES.md): dependency rationale

## Storybook

- **Local:** `npm run storybook` — [http://localhost:6006](http://localhost:6006). Use the toolbar for **Theme** (light / dark, sets `data-theme` on `<html>`) and **Viewport** (375, 768, 1440).
- **Story layouts:** reuse `sb-page`, `sb-section-title`, `sb-card`, `sb-card-header`, `sb-inline`, `sb-grid`, `sb-swatch`, `sb-stack`, etc. from [`.storybook/preview.css`](.storybook/preview.css) so Docs/Canvas demos share one token-based pattern (avoids missing layout CSS and overlapping examples).
- **Static build:** `npm run build-storybook` writes to `storybook-static/` (ignored by git).
- **GitHub Pages:** push to `main` runs [`.github/workflows/deploy-storybook.yml`](.github/workflows/deploy-storybook.yml). It runs `storybook build` with default asset paths — for GitHub **project** Pages (`https://<owner>.github.io/<repo>/`), do **not** set webpack `publicPath` to `/<repo>/`; that duplicates the path and breaks preview chunks (infinite “Preparing story” loaders).
  - **One-time setup:** **Settings → Pages → Build and deployment → Source:** **GitHub Actions** (not “Deploy from a branch”). After the first successful run, the live URL appears on that page and in the workflow summary — typically `https://<owner>.github.io/<repo>/`.
  - **Manual build** (match CI): `npx storybook build -o storybook-static` then upload `storybook-static/` to any static host if you do not use GitHub Pages.

## Development scripts

| Command | Description |
|---------|-------------|
| `npm run build` | build library output and types |
| `npm run dev` | watch library build |
| `npm run test` | run unit tests |
| `npm run storybook` | run Storybook locally |
| `npm run build-storybook` | build Storybook static site to `storybook-static/` |
| `npm run next:dev` | run local Next demo app |

## Notes

- the public avatar export is `Avtar`
- the public tooltip export is `ToolTip`
- `Card` supports a compound API (`CardHeader`, `CardTitle`, …) and legacy props; types include `CardSize`, `CardProps`, and subcomponent props
- `Table` default export is the data-driven grid; `TableRoot` + `TableHeader` / `TableBody` / … are the semantic markup API (`Table.Root`, …)
- charts are native SVG; no external charting library is required
- import from `ui-common-components` for the full surface, or from `ui-common-components/charts`, `/shell`, or `/table` when you only need that area (smaller JS)
- TypeScript: `ComboboxProps`, `ComboboxOption`, `ComboboxGroup`; `SelectProps`, `SelectOptionGroup`; `StepperProps`, `StepperStepProps`, `StepperAppearance`, `StepperTrackMode`, and related stepper types are exported from the main entry
- decorative UI lines use **`--color-border-subtle`** where implemented; inputs and strong chrome still use **`--color-border-default`** (see design system)

## License

MIT
