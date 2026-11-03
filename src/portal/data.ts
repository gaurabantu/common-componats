/**
 * Portal data — single source for the inventory, KPIs and release notes shown in Storybook.
 * Keep in sync with `src/index.tsx` (exports) when components are added or renamed.
 */

export const PRODUCT = {
  name: "Infinia Design System",
  packageName: "ui-common-components",
  hooksPackage: "ui-common-hooks",
  version: "0.0.3",
  hooksVersion: "0.3.0",
  tokensVersion: "2.0.0",
  owner: "UI Platform team",
  standard: "WCAG 2.2 AA",
} as const;

export type ComponentStatus = "stable" | "new" | "beta" | "legacy";

export interface InventoryItem {
  name: string;
  description: string;
  status: ComponentStatus;
  /** Storybook title for the "View" action (component kind). */
  story?: string;
  /** Import specifier. Default: main entry. */
  from?: string;
  /** Replacement when legacy. */
  replacement?: string;
}

export interface InventoryGroup {
  id: string;
  title: string;
  description: string;
  items: InventoryItem[];
}

const A = "Design System/Atoms/";
const M = "Design System/Molecules/";

export const INVENTORY: InventoryGroup[] = [
  {
    id: "actions",
    title: "Actions",
    description: "Trigger work — one primary CTA per zone, size encodes hierarchy.",
    items: [
      { name: "Button", description: "Primary, outline, ghost, link and semantic variants; 5 size tiers, icon, loading, expand-on-hover.", status: "stable", story: `${A}Button` },
      { name: "ButtonGroup", description: "Segmented actions with separators and inline text.", status: "stable", story: `${M}ButtonGroup` },
      { name: "Hyperlink", description: "Accessible inline link with new-tab handling.", status: "stable", story: `${A}Hyperlink` },
      { name: "DropdownMenu", description: "Menu of actions anchored to a trigger (Popover family).", status: "stable", story: `${M}Popover` },
      { name: "Pagination", description: "Standalone pager with page-size select, compact mobile mode and safe page links.", status: "new", story: `${M}Pagination` },
    ],
  },
  {
    id: "forms",
    title: "Forms & input",
    description: "Labelled, validated controls with consistent heights and error messaging.",
    items: [
      { name: "Input", description: "Text input with validation, masking, clear and verified states.", status: "stable", story: `${A}Input` },
      { name: "InputSearch", description: "Search field with clear and search-action button.", status: "stable", story: `${A}InputSearch` },
      { name: "TextArea", description: "Multi-line input with counter and validation.", status: "stable", story: `${A}TextArea` },
      { name: "Select", description: "Native select with groups, icons and live search.", status: "stable", story: `${A}Select` },
      { name: "Combobox", description: "Searchable single / multi select with icons.", status: "stable", story: `${M}Combobox` },
      { name: "CheckBox", description: "Indeterminate, description, error, required and sizes (upgraded).", status: "stable", story: `${A}Checkbox` },
      { name: "Switch", description: "Binary toggle with label positions and sizes.", status: "stable", story: `${A}Switch` },
      { name: "RadioGroup", description: "Single choice from a small set.", status: "stable", story: `${A}RadioGroup` },
      { name: "OtpBox", description: "One-time-code input with paste support.", status: "stable", story: `${A}OtpBox` },
      { name: "DatePicker", description: "Date input with calendar popover.", status: "stable", story: `${A}DatePicker` },
      { name: "DateRangePicker", description: "Ranges with presets, 2-month grid (1 on mobile), APG keyboard grid, FormField-aware.", status: "new", story: `${M}DateRangePicker` },
      { name: "NumberInput", description: "Locale-aware spinbutton — currency / percent / compact, steppers, full keyboard.", status: "new", story: `${A}NumberInput` },
      { name: "SegmentedControl", description: "Single-choice radio group with sliding indicator; 36 / 40px targets.", status: "new", story: `${M}SegmentedControl` },
      { name: "FileUpload", description: "Upload + Dropzone with magic-byte security validation.", status: "stable", story: `${M}FileUpload` },
      { name: "Form", description: "Form layout with grid-based fields.", status: "stable", story: `${M}Form` },
      { name: "FormField", description: "Label, hint, error, required and counter wired to any control (+ useFormField).", status: "new", story: `${M}FormField` },
    ],
  },
  {
    id: "display",
    title: "Display & content",
    description: "Typography, status and media primitives.",
    items: [
      { name: "TextView", description: "Token-driven typography (h1–micro) with semantic colours.", status: "stable", story: `${A}TextView` },
      { name: "Badge / Chip / Tag", description: "Status labels — soft, solid, outline; dot and dismiss.", status: "stable", story: `${A}Badge` },
      { name: "IconBox", description: "Fixed-size icon container for rows, tiles and stats.", status: "new", story: `${A}IconBox` },
      { name: "StatCard", description: "KPI tile with trend that never relies on colour alone.", status: "new", story: `${M}StatCard` },
      { name: "CodeBlock", description: "Copyable code panel with live-region feedback.", status: "new", story: `${M}CodeBlock` },
      { name: "Icon", description: "SVG/URL icon with tinting and decorative handling.", status: "stable", story: `${A}Icon` },
      { name: "Avatar", description: "Image, initials or icon avatar with status.", status: "stable", story: `${A}Avatar`, replacement: "Exported as Avtar" },
      { name: "ProgressBar", description: "Determinate progress with label.", status: "stable", story: `${A}ProgressBar` },
      { name: "ToolTip", description: "Hover / focus hint with icon trigger.", status: "stable", story: `${A}ToolTip` },
      { name: "Divider", description: "Horizontal / vertical separator with label.", status: "stable", story: `${A}Divider` },
      { name: "GradientText", description: "Brand gradient headline text.", status: "stable", story: `${A}GradientText` },
      { name: "Kbd", description: "Keyboard-shortcut chips; ⌘ on macOS, Ctrl elsewhere; spoken key names.", status: "new", story: `${A}Kbd` },
    ],
  },
  {
    id: "layout",
    title: "Layout & navigation",
    description: "Structure pages and move between views.",
    items: [
      { name: "Card", description: "Bordered / elevated surface, compound header, interactive tiles.", status: "stable", story: `${M}Card` },
      { name: "List", description: "Settings-style rows: icon, title, badge, description, action.", status: "new", story: `${M}List` },
      { name: "Grid", description: "Responsive column / auto-fit grid.", status: "stable", story: `${M}Grid` },
      { name: "Tabs", description: "Line, minimal and segmented tabs with icons (ARIA APG).", status: "stable", story: `${M}Tabs` },
      { name: "Accordion", description: "Disclosure sections, single or multiple.", status: "stable", story: `${M}Accordion` },
      { name: "Stepper", description: "Multi-step progress with icons and markers.", status: "stable", story: `${M}Stepper` },
      { name: "Wizard", description: "Stepper + per-step validation + review step; focus moves to each step heading.", status: "new", story: `${M}Wizard` },
      { name: "CommandPalette", description: "⌘K search & actions — combobox pattern, remote search, focus restore.", status: "new", story: `${M}CommandPalette` },
      { name: "Breadcrumb", description: "Location trail with custom separators.", status: "stable", story: `${M}Breadcrumb` },
      { name: "PageHeader", description: "Zone 3 header — title, breadcrumb, status, one primary action, overflow menu.", status: "new", story: `${M}PageHeader` },
      { name: "Tooltip", description: "Wraps any trigger; hover + focus, Escape, collision flip (WCAG 1.4.13).", status: "new", story: `${M}Tooltip` },
    ],
  },
  {
    id: "overlays",
    title: "Overlays",
    description: "Focus-trapped, dismissable layers.",
    items: [
      { name: "Modal", description: "Dialog with description, initial focus, inside/outside scroll, mobile fullscreen, confirm loading.", status: "stable", story: `${M}Modal` },
      { name: "Drawer / Sheet", description: "Side panel on any edge — focus-trapped, sticky footer, non-modal option.", status: "new", story: `${M}Drawer` },
      { name: "AlertDialog", description: "Confirm / destructive decision dialog.", status: "stable", story: `${M}AlertDialog` },
      { name: "Popover", description: "Anchored floating panel.", status: "stable", story: `${M}Popover` },
      { name: "Calendar", description: "Month grid with keyboard navigation.", status: "stable", story: `${M}Calendar` },
    ],
  },
  {
    id: "feedback",
    title: "Feedback states",
    description: "Messages, notifications, loading and empty / error states.",
    items: [
      { name: "Toast", description: "Stacked notifications with actions, pause-on-hover and F8 focus (ToastProvider + useToast).", status: "new", story: `${M}Toast` },
      { name: "Alert", description: "Inline page / form message — soft, outline or accent; action and dismiss.", status: "new", story: `${M}Alert` },
      { name: "Spinner", description: "Loading indicator with screen-reader label; reduced-motion aware.", status: "new", story: `${A}Spinner` },
      { name: "Skeleton", description: "Loading placeholders + SkeletonGroup with aria-busy.", status: "new", story: `${A}Skeleton` },
      { name: "EmptyState", description: "No data / no results with call to action.", status: "stable", story: `${M}Feedback states/EmptyState` },
      { name: "ErrorState", description: "Recoverable errors with retry.", status: "stable", story: `${M}Feedback states/ErrorState` },
      { name: "OfflineBanner", description: "Connection status banner (role=status).", status: "stable", story: `${M}Feedback states/OfflineBanner` },
      { name: "FeedbackState", description: "Variant-driven union of all states.", status: "stable", story: `${M}Feedback states/FeedbackState` },
    ],
  },
  {
    id: "shell",
    title: "Application shell",
    description: "Dashboard frame — sidebar, top bar and content zones.",
    items: [
      { name: "DashboardShell", description: "Responsive app frame with collapsible sidebar.", status: "stable", story: "Design System/Dashboard/Overview", from: "ui-common-components/shell" },
      { name: "AppSidebar", description: "Sectioned navigation rail with persistence.", status: "stable", story: `${M}AppSidebar`, from: "ui-common-components/shell" },
      { name: "AppTopbar", description: "Page title, search, actions and profile menu.", status: "stable", story: `${M}AppTopbar`, from: "ui-common-components/shell" },
      { name: "AppShell", description: "Legacy alias of DashboardShell.", status: "legacy", replacement: "DashboardShell", from: "ui-common-components/shell" },
    ],
  },
  {
    id: "data",
    title: "Data & charts",
    description: "Tables and native-SVG charts — no chart library dependency.",
    items: [
      { name: "Table", description: "Sorting, selection, search, expandable rows, sticky columns.", status: "stable", story: `${M}Table`, from: "ui-common-components/table" },
      { name: "DataTable", description: "Table + FilterBar + Pagination + bulk actions + column visibility + safe CSV export.", status: "new", story: `${M}DataTable` },
      { name: "FilterBar", description: "Search, filters, active chips, clear all and announced result count.", status: "new", story: `${M}FilterBar` },
      { name: "LineChart · AreaChart", description: "Trends over time with animated draw.", status: "stable", story: `${M}Charts`, from: "ui-common-components/charts" },
      { name: "BarChart · PieChart", description: "Comparisons and composition.", status: "stable", story: `${M}Charts`, from: "ui-common-components/charts" },
    ],
  },
];

export const COMPONENT_COUNT = INVENTORY.reduce((n, g) => n + g.items.length, 0);

/** `packages/ui-common-hooks/src` — one file per hook. */
export const HOOKS = [
  "useAsyncContentPhase", "useAsyncData", "useClientTableState", "useControllableState", "useDebounce",
  "useDebounceClick", "useDebouncedCallback", "useDismissableLayer", "useEventListener", "useFocusTrap", "useIsomorphicLayoutEffect",
  "useLatest", "useLocalStorage", "useLongPress", "useMediaQuery", "useMergedRefs", "useMount",
  "useOnlineStatus", "usePagination", "usePrefersReducedMotion", "usePrevious", "useSelection",
  "useSwipe", "useToggle", "useTouchHandler", "useUnmount",
] as const;

export const THEMES: { id: string; dataTheme: string | null; name: string; description: string }[] = [
  { id: "light", dataTheme: null, name: "Classic", description: "Default — Noir CTAs on white surfaces." },
  { id: "dark", dataTheme: "dark", name: "Dark", description: "Dark neutral surfaces, inverted text." },
  { id: "mist", dataTheme: "mist", name: "Ion Mist", description: "Soft grey page and sidebar shells." },
  { id: "green", dataTheme: "green", name: "Green", description: "Green interaction accents." },
  { id: "blue-mist", dataTheme: "blue-mist", name: "Blue + Mist", description: "Blue interaction on mist surfaces." },
  { id: "green-mist", dataTheme: "green-mist", name: "Green + Mist", description: "Green interaction on mist surfaces." },
  { id: "custom", dataTheme: "custom", name: "Custom brand", description: "Example rose brand via 6 slots." },
  { id: "blue", dataTheme: "blue", name: "Blue (explicit)", description: "Explicit contract, same as Classic." },
];

export interface Release {
  version: string;
  date: string;
  status: "unreleased" | "current" | "previous";
  summary: string;
  changes: { type: "added" | "changed" | "fixed" | "docs"; text: string }[];
}

export const RELEASES: Release[] = [
  {
    version: "0.0.3",
    date: "3 Nov 2026",
    status: "current",
    summary: "Design System Portal, Sprint 1 feedback & overlay components, and contrast fixes.",
    changes: [
      { type: "changed", text: "⚠ Upgrade note — Button: a loading Button is no longer natively disabled (aria-disabled + aria-busy, focus kept). `:disabled` selectors and toBeDisabled() tests on loading buttons stop matching." },
      { type: "changed", text: "⚠ Upgrade note — Button: a native aria-label is now honoured; on a text button it overrides the visible label (keep it consistent with the text, WCAG 2.5.3)." },
      { type: "changed", text: "⚠ Upgrade note — Button: unsafe href (javascript:, data:, …) now renders a <button>; replace javascript:void(0) links with onClick." },
      { type: "changed", text: "⚠ Upgrade note — Select no longer blurs after a change; onBlur-based validation now runs only when the user leaves the field." },
      { type: "changed", text: "⚠ Upgrade note — Select: consumer style is merged with defaults (was replaced); error now takes precedence over status." },
      { type: "changed", text: "⚠ Upgrade note — Select: any invalid state (own error, status=\"error\", FormField error, aria-invalid) now shows the danger border and data-invalid=\"true\"; status colours use the AA --color-*-strong tokens instead of --color-state-*; the chevron is drawn in CSS (static arrow sits up to 4px further left)." },
      { type: "added", text: "Sprint 4: Button — forwardRef, loadingText, spinner replaces icon, rel=noopener on _blank, shared safeHref. Select — no blur on change, tokenised heights, name / required / FormField, focus ring, AA status colours." },
      { type: "added", text: "IconBox atom — consistent icon footprint for rows, tiles and stats." },
      { type: "added", text: "List / ListItem molecule — settings-style rows with badge, meta and action slots." },
      { type: "added", text: "StatCard molecule — KPI tile with accessible trend." },
      { type: "added", text: "CodeBlock molecule — copyable code with live-region feedback." },
      { type: "added", text: "Sprint 1: Toast (ToastProvider, useToast), Alert, Drawer / Sheet, Spinner, Skeleton, Pagination." },
      { type: "added", text: "Sprint 2: FormField (+ useFormField), PageHeader, FilterBar, DataTable (+ toCsv), generic Tooltip." },
      { type: "added", text: "Sprint 3: DateRangePicker (+ presets), NumberInput (+ locale parse/format), SegmentedControl, Wizard, CommandPalette, Kbd." },
      { type: "changed", text: "Modal — description, initialFocusRef, scrollBehavior, fullscreenOnMobile, confirmLoading, focus return; colour props deprecated." },
      { type: "changed", text: "Behaviour change — Modal now returns focus to the element that opened it when it closes (WCAG). If your onClose moves focus elsewhere, pass onCloseAutoFocus={(e) => e.preventDefault()}." },
      { type: "changed", text: "Checkbox — indeterminate, description, size, error, required, generated id; colour-class props deprecated." },
      { type: "changed", text: "Card — `interactive` prop (keyboard tile) and visible `selected` outline on bordered cards." },
      { type: "changed", text: "Button — `expandOnHover` icon-to-label reveal." },
      { type: "fixed", text: "Contrast tokens — --color-text-secondary #5e5e5e / #a8b0bb (dark), --color-border-default #8a8a8a / #717a86 (dark), --switch-border-off #8a8a8a: all now WCAG AA." },
      { type: "fixed", text: "Tabs active label contrast; danger text on danger fill (light + dark)." },
      { type: "fixed", text: "Focus ring — dark #60a5fa (was 2.64:1) and green-mist #0e7490 (was 2.33:1); dark primary Button fill #2563eb / hover #1d4ed8 / active #1e40af (white label 3.68:1 → 5.17:1+)." },
      { type: "docs", text: "Storybook portal: Welcome, Getting Started, Downloads, Foundations generated from tokens.css, Governance." },
    ],
  },
  {
    version: "0.0.2",
    date: "Previous",
    status: "previous",
    summary: "Compact token scale, token-driven field heights, Modal footer, profile menu.",
    changes: [
      { type: "changed", text: "Compact type and control-height scale (tokens v2.0.0)." },
      { type: "added", text: "Modal footer slot; AppTopbar profile menu." },
      { type: "added", text: "Subpath bundles: /charts, /shell, /table." },
    ],
  },
  {
    version: "0.0.1",
    date: "Initial",
    status: "previous",
    summary: "First shared release of components, tokens and Tailwind preset.",
    changes: [{ type: "added", text: "Atoms, molecules, DashboardShell, FeedbackStates, charts and tokens.css." }],
  },
];

/* ------------------------------------------------------------------ */
/* Roadmap                                                            */
/* ------------------------------------------------------------------ */

export type RoadmapStatus = "done" | "in-progress" | "planned" | "backlog";
export type RoadmapKind = "component" | "composite" | "upgrade" | "platform";

export interface RoadmapItem {
  name: string;
  kind: RoadmapKind;
  status: RoadmapStatus;
  description: string;
  /** Storybook title once shipped — enables the "View" link. */
  story?: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  goal: string;
  window: string;
  items: RoadmapItem[];
}

export const ROADMAP: RoadmapPhase[] = [
  {
    id: "s0",
    title: "Foundation release",
    goal: "Design System Portal, governance pages and the building blocks it needs.",
    window: "Nov 2026",
    items: [
      { name: "Design System Portal", kind: "platform", status: "done", description: "15-page Storybook portal: overview, foundations from tokens.css, governance.", story: "Overview/Welcome" },
      { name: "IconBox · List · StatCard · CodeBlock", kind: "component", status: "done", description: "Row, tile, KPI and code building blocks.", story: "Design System/Molecules/List" },
      { name: "Contrast tokens", kind: "platform", status: "done", description: "Secondary text, borders, danger and Tabs indicator brought to WCAG AA in every theme." },
    ],
  },
  {
    id: "s1",
    title: "Sprint 1 — Feedback & overlays",
    goal: "Every screen can confirm, warn, load and page without custom code.",
    window: "Nov 2026",
    items: [
      { name: "Toast / Toaster", kind: "component", status: "done", description: "Transient confirmations with pause-on-hover, actions and live-region announcements." , story: "Design System/Molecules/Toast" },
      { name: "Drawer / Sheet", kind: "component", status: "done", description: "Side panels for detail and edit flows, focus-trapped, any side." , story: "Design System/Molecules/Drawer" },
      { name: "Alert", kind: "component", status: "done", description: "Inline page / form messages with action and dismiss." , story: "Design System/Molecules/Alert" },
      { name: "Skeleton", kind: "component", status: "done", description: "Loading placeholders that respect reduced motion." , story: "Design System/Atoms/Skeleton" },
      { name: "Spinner", kind: "component", status: "done", description: "Standalone loading indicator with screen-reader label." , story: "Design System/Atoms/Spinner" },
      { name: "Pagination", kind: "component", status: "done", description: "Standalone pager with page-size select and compact mobile mode." , story: "Design System/Molecules/Pagination" },
      { name: "Modal upgrade", kind: "upgrade", status: "done", description: "description, initialFocusRef, scrollBehavior, fullscreenOnMobile, confirmLoading; colour props deprecated." , story: "Design System/Molecules/Modal" },
      { name: "Checkbox upgrade", kind: "upgrade", status: "done", description: "indeterminate, description, size, error, required; colour-class props deprecated." , story: "Design System/Atoms/Checkbox" },
    ],
  },
  {
    id: "s2",
    title: "Sprint 2 — Page patterns",
    goal: "Ship the assemblies every product screen rebuilds by hand.",
    window: "Dec 2026",
    items: [
      { name: "FormField", kind: "composite", status: "done", description: "One wrapper for label, hint, error, required and counter — aria wiring automatic." , story: "Design System/Molecules/FormField" },
      { name: "PageHeader", kind: "composite", status: "done", description: "Breadcrumb, title, status and primary / secondary actions with mobile overflow." , story: "Design System/Molecules/PageHeader" },
      { name: "FilterBar", kind: "composite", status: "done", description: "Search, filter chips, more-filters popover, clear all and result count." , story: "Design System/Molecules/FilterBar" },
      { name: "DataTable", kind: "composite", status: "done", description: "Table + FilterBar + bulk actions + column visibility + export + empty/error states." , story: "Design System/Molecules/DataTable" },
      { name: "Tooltip (generic)", kind: "upgrade", status: "done", description: "Wrap any trigger; side, align, delay, controlled open." , story: "Design System/Molecules/Tooltip" },
    ],
  },
  {
    id: "s3",
    title: "Sprint 3 — Advanced inputs & flows",
    goal: "Cover finance-grade inputs and multi-step processes.",
    window: "Jan 2027",
    items: [
      { name: "DateRangePicker", kind: "component", status: "done", description: "Ranges with presets (Last 7 days, This quarter) and min / max." , story: "Design System/Molecules/DateRangePicker" },
      { name: "NumberInput", kind: "component", status: "done", description: "Locale formatting, currency / percent affixes, precision and steppers." , story: "Design System/Atoms/NumberInput" },
      { name: "SegmentedControl", kind: "component", status: "done", description: "Single-choice toggle group for filters and view switches." , story: "Design System/Molecules/SegmentedControl" },
      { name: "Wizard", kind: "composite", status: "done", description: "Stepper + Form with per-step validation and a review step." , story: "Design System/Molecules/Wizard" },
      { name: "CommandPalette", kind: "composite", status: "done", description: "⌘K global search and actions from the top bar." , story: "Design System/Molecules/CommandPalette" },
    ],
  },
  {
    id: "s4",
    title: "Sprint 4 — Button & Select hardening",
    goal: "Fix the two most-used controls so every app inherits correct focus, safety and sizing.",
    window: "Nov 2026",
    items: [
      { name: "Button upgrade", kind: "upgrade", status: "done", description: "loading keeps focus (aria-busy), forwardRef, unsafe href blocked, rel on _blank, icon-only label warning." , story: "Design System/Atoms/Button" },
      { name: "Select upgrade", kind: "upgrade", status: "done", description: "No blur on change, heights aligned with Input/Button, name / required / FormField integration, consistent error state." , story: "Design System/Atoms/Select" },
    ],
  },
  {
    id: "backlog",
    title: "Backlog",
    goal: "Prioritised with product teams as demand appears.",
    window: "2027",
    items: [
      { name: "TreeView", kind: "component", status: "backlog", description: "Entity / ownership hierarchies with lazy loading." },
      { name: "Timeline · DescriptionList · TagInput · Slider", kind: "component", status: "backlog", description: "Detail views, activity feeds and richer inputs." },
      { name: "NotificationCenter · DetailLayout · AuthLayout", kind: "composite", status: "backlog", description: "Top-bar inbox, master–detail and sign-in frames." },
      { name: "Table: virtualisation, column resize, server-side mode", kind: "upgrade", status: "backlog", description: "Large datasets and API-driven paging." },
      { name: "Combobox async, Select name/required, Avatar rename + AvatarGroup", kind: "upgrade", status: "backlog", description: "Form completeness and naming clean-up." },
      { name: "Retire colour-override props", kind: "platform", status: "backlog", description: "Replace *ColorClass / custom colour props with tokens + variants across the library." },
    ],
  },
];
