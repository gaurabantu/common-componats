/**
 * Portal data — single source for the inventory, KPIs and release notes shown in Storybook.
 * Keep in sync with `src/index.tsx` (exports) when components are added or renamed.
 */

export const PRODUCT = {
  name: "Infinia Design System",
  packageName: "ui-common-components",
  hooksPackage: "ui-common-hooks",
  version: "0.0.12",
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
  /**
   * Props interface / type shown in the Components gallery detail panel. Read by
   * `src/portal/components/stats/generate-portal-stats.mjs`, which extracts its members into
   * `portal-stats.json` — keep it a plain double-quoted string literal (the generator matches it with a regex).
   */
  props?: string;
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
      { name: "Button", description: "Primary, outline, ghost, link and semantic variants; 5 size tiers, icon, loading, expand-on-hover.", status: "stable", story: `${A}Button`, props: "ButtonProps" },
      { name: "ButtonGroup", description: "Segmented actions with separators and inline text.", status: "stable", story: `${M}ButtonGroup`, props: "ButtonGroupProps" },
      { name: "Hyperlink", description: "Accessible inline link with new-tab handling.", status: "stable", story: `${A}Hyperlink`, props: "HyperlinkProps" },
      { name: "DropdownMenu", description: "Menu of actions anchored to a trigger (Popover family).", status: "stable", story: `${M}Popover`, props: "DropdownMenuItemProps" },
      { name: "Menu", description: "APG menu button — checkbox/radio items, submenus, typeahead, shortcuts.", status: "new", story: `${M}Menu`, props: "MenuProps" },
      { name: "ContextMenu", description: "Right-click / Shift+F10 menu at the pointer with viewport flip and focus return.", status: "stable", story: `${M}ContextMenu`, props: "ContextMenuProps" },
      { name: "ToggleButton", description: "Pressed / unpressed button for formatting and view toggles.", status: "stable", story: `${A}ToggleButton`, props: "ToggleButtonProps" },
      { name: "ToggleGroup", description: "Single or multiple selection across a row of toggle buttons.", status: "stable", story: `${M}ToggleGroup`, props: "ToggleGroupSingleProps" },
      { name: "Pagination", description: "Standalone pager with page-size select, compact mobile mode and safe page links.", status: "new", story: `${M}Pagination`, props: "PaginationProps" },
    ],
  },
  {
    id: "forms",
    title: "Forms & input",
    description: "Labelled, validated controls with consistent heights and error messaging.",
    items: [
      { name: "Input", description: "Text input with validation, masking, clear and verified states.", status: "stable", story: `${A}Input`, props: "TextInputProps" },
      { name: "InputSearch", description: "Search field with clear and search-action button.", status: "stable", story: `${A}InputSearch`, props: "TextInputSearchProps" },
      { name: "TextArea", description: "Multi-line input with counter and validation.", status: "stable", story: `${A}TextArea`, props: "TextAreaProps" },
      { name: "Select", description: "Native select with groups, icons and live search.", status: "stable", story: `${A}Select`, props: "SelectProps" },
      { name: "Combobox", description: "Searchable single / multi select with icons.", status: "stable", story: `${M}Combobox`, props: "ComboboxProps" },
      { name: "TagInput", description: "Chips + text entry with paste-split, validation and suggestions.", status: "new", story: `${M}TagInput`, props: "TagInputProps" },
      { name: "TimePicker", description: "HH:mm time field with segment keyboard, 12/24h, step and min/max.", status: "new", story: `${M}TimePicker`, props: "TimePickerProps" },
      { name: "Rating", description: "Star rating (radio group), half-star precision, read-only mode.", status: "new", story: `${A}Rating`, props: "RatingProps" },
      { name: "CheckBox", description: "Indeterminate, description, error, required and sizes (upgraded).", status: "stable", story: `${A}Checkbox`, props: "CheckboxProps" },
      { name: "Switch", description: "Binary toggle with label positions and sizes.", status: "stable", story: `${A}Switch`, props: "SwitchProps" },
      { name: "RadioGroup", description: "Single choice from a small set.", status: "stable", story: `${A}RadioGroup`, props: "RadioGroupProps" },
      { name: "Slider", description: "Single value or range with keyboard steps and labelled thumbs.", status: "stable", story: `${A}Slider`, props: "SliderSingleProps" },
      { name: "ColorPicker", description: "Hex value, token palette presets and a validated hex input.", status: "stable", story: `${M}ColorPicker`, props: "ColorPickerProps" },
      { name: "OtpBox", description: "One-time-code input with paste support.", status: "stable", story: `${A}OtpBox`, props: "OtpBoxProps" },
      { name: "DatePicker", description: "Date input with calendar popover.", status: "stable", story: `${A}DatePicker`, props: "DatePickerProps" },
      { name: "DateRangePicker", description: "Ranges with presets, 2-month grid (1 on mobile), APG keyboard grid, FormField-aware.", status: "new", story: `${M}DateRangePicker`, props: "DateRangePickerProps" },
      { name: "NumberInput", description: "Locale-aware spinbutton — currency / percent / compact, steppers, full keyboard.", status: "new", story: `${A}NumberInput`, props: "NumberInputProps" },
      { name: "SegmentedControl", description: "Single-choice radio group with sliding indicator; 36 / 40px targets.", status: "new", story: `${M}SegmentedControl`, props: "SegmentedControlProps" },
      { name: "FileUpload", description: "Upload + Dropzone with magic-byte security validation.", status: "stable", story: `${M}FileUpload`, props: "FileUploadProps" },
      { name: "Form", description: "Form layout with grid-based fields.", status: "stable", story: `${M}Form`, props: "FormProps" },
      { name: "FormField", description: "Label, hint, error, required and counter wired to any control (+ useFormField).", status: "new", story: `${M}FormField`, props: "FormFieldProps" },
    ],
  },
  {
    id: "display",
    title: "Display & content",
    description: "Typography, status and media primitives.",
    items: [
      { name: "TextView", description: "Token-driven typography (h1–micro) with semantic colours.", status: "stable", story: `${A}TextView`, props: "TextViewProps" },
      { name: "Badge / Chip / Tag", description: "Status labels — soft, solid, outline; dot and dismiss.", status: "stable", story: `${A}Badge`, props: "BadgeProps" },
      { name: "IconBox", description: "Fixed-size icon container for rows, tiles and stats.", status: "new", story: `${A}IconBox`, props: "IconBoxProps" },
      { name: "StatCard", description: "KPI tile with trend that never relies on colour alone.", status: "new", story: `${M}StatCard`, props: "StatCardProps" },
      { name: "CodeBlock", description: "Copyable code panel with live-region feedback.", status: "new", story: `${M}CodeBlock`, props: "CodeBlockProps" },
      { name: "Icon", description: "SVG/URL icon with tinting and decorative handling.", status: "stable", story: `${A}Icon`, props: "IconProps" },
      { name: "Avtar", description: "Image, initials or icon avatar with status (the export name is spelled Avtar).", status: "stable", story: `${A}Avatar`, props: "AvatarProps" },
      { name: "ProgressBar", description: "Determinate progress with label.", status: "stable", story: `${A}ProgressBar`, props: "ProgressBarProps" },
      { name: "ToolTip", description: "Hover / focus hint with icon trigger.", status: "stable", story: `${A}ToolTip`, props: "TooltipIconProps" },
      { name: "Divider", description: "Horizontal / vertical separator with label.", status: "stable", story: `${A}Divider`, props: "DividerProps" },
      { name: "GradientText", description: "Brand gradient headline text.", status: "stable", story: `${A}GradientText`, props: "GradientTextProps" },
      { name: "Kbd", description: "Keyboard-shortcut chips; ⌘ on macOS, Ctrl elsewhere; spoken key names.", status: "new", story: `${A}Kbd`, props: "KbdProps" },
      { name: "AvatarGroup", description: "Stacked avatars with +N overflow list.", status: "new", story: `${A}AvatarGroup`, props: "AvatarGroupProps" },
      { name: "Timeline", description: "Ordered events with timestamps, status tones, vertical / horizontal.", status: "new", story: `${M}Timeline`, props: "TimelineProps" },
    ],
  },
  {
    id: "layout",
    title: "Layout & navigation",
    description: "Structure pages and move between views.",
    items: [
      { name: "Card", description: "Bordered / elevated surface, compound header, interactive tiles.", status: "stable", story: `${M}Card`, props: "CardProps" },
      { name: "List", description: "Settings-style rows: icon, title, badge, description, action.", status: "new", story: `${M}List`, props: "ListItemProps" },
      { name: "Grid", description: "Responsive column / auto-fit grid.", status: "stable", story: `${M}Grid`, props: "GridProps" },
      { name: "Tabs", description: "Line, minimal and segmented tabs with icons (ARIA APG).", status: "stable", story: `${M}Tabs`, props: "TabsProps" },
      { name: "Accordion", description: "Disclosure sections, single or multiple.", status: "stable", story: `${M}Accordion`, props: "AccordionProps" },
      { name: "Stepper", description: "Multi-step progress with icons and markers.", status: "stable", story: `${M}Stepper`, props: "StepperProps" },
      { name: "Wizard", description: "Stepper + per-step validation + review step; focus moves to each step heading.", status: "new", story: `${M}Wizard`, props: "WizardProps" },
      { name: "CommandPalette", description: "⌘K search & actions — combobox pattern, remote search, focus restore.", status: "new", story: `${M}CommandPalette`, props: "CommandPaletteProps" },
      { name: "Breadcrumb", description: "Location trail with custom separators.", status: "stable", story: `${M}Breadcrumb`, props: "BreadcrumbProps" },
      { name: "PageHeader", description: "Zone 3 header — title, breadcrumb, status, one primary action, overflow menu.", status: "new", story: `${M}PageHeader`, props: "PageHeaderProps" },
      { name: "Tooltip", description: "Wraps any trigger; hover + focus, Escape, collision flip (WCAG 1.4.13).", status: "new", story: `${M}Tooltip`, props: "TooltipProps" },
    ],
  },
  {
    id: "overlays",
    title: "Overlays",
    description: "Focus-trapped, dismissable layers.",
    items: [
      { name: "Modal", description: "Dialog with description, initial focus, inside/outside scroll, mobile fullscreen, confirm loading.", status: "stable", story: `${M}Modal`, props: "ModalProps" },
      { name: "Drawer / Sheet", description: "Side panel on any edge — focus-trapped, sticky footer, non-modal option.", status: "new", story: `${M}Drawer`, props: "DrawerProps" },
      { name: "AlertDialog", description: "Confirm / destructive decision dialog.", status: "stable", story: `${M}AlertDialog`, props: "AlertDialogProps" },
      { name: "Popover", description: "Anchored floating panel.", status: "stable", story: `${M}Popover`, props: "PopoverProps" },
      { name: "Calendar", description: "Month grid with keyboard navigation.", status: "stable", story: `${M}Calendar`, props: "CalendarProps" },
      { name: "LoadingOverlay", description: "Container or full-screen veil; blocking (aria-busy) or non-blocking.", status: "stable", story: `${M}LoadingOverlay`, props: "LoadingOverlayProps" },
    ],
  },
  {
    id: "feedback",
    title: "Feedback states",
    description: "Messages, notifications, loading and empty / error states.",
    items: [
      { name: "Toast", description: "Stacked notifications with actions, pause-on-hover and F8 focus (ToastProvider + useToast).", status: "new", story: `${M}Toast`, props: "ToastProviderProps" },
      { name: "Alert", description: "Inline page / form message — soft, outline or accent; action and dismiss.", status: "new", story: `${M}Alert`, props: "AlertProps" },
      { name: "Spinner", description: "Loading indicator with screen-reader label; reduced-motion aware.", status: "new", story: `${A}Spinner`, props: "SpinnerProps" },
      { name: "Skeleton", description: "Loading placeholders + SkeletonGroup with aria-busy.", status: "new", story: `${A}Skeleton`, props: "SkeletonProps" },
      { name: "EmptyState", description: "No data / no results with call to action.", status: "stable", story: `${M}Feedback states/EmptyState`, props: "EmptyStateProps" },
      { name: "ErrorState", description: "Recoverable errors with retry.", status: "stable", story: `${M}Feedback states/ErrorState`, props: "ErrorStateProps" },
      { name: "OfflineBanner", description: "Connection status banner (role=status).", status: "stable", story: `${M}Feedback states/OfflineBanner`, props: "OfflineBannerProps" },
      { name: "FeedbackState", description: "Variant-driven union of all states.", status: "stable", story: `${M}Feedback states/FeedbackState`, props: "FeedbackStateProps" },
    ],
  },
  {
    id: "shell",
    title: "Application shell",
    description: "Dashboard frame — sidebar, top bar and content zones.",
    items: [
      { name: "DashboardShell", description: "Responsive app frame with collapsible sidebar.", status: "stable", story: `${M}DashboardShell`, from: "ui-common-components/shell", props: "DashboardShellProps" },
      { name: "AppSidebar", description: "Sectioned navigation rail with persistence.", status: "stable", story: `${M}AppSidebar`, from: "ui-common-components/shell", props: "AppSidebarProps" },
      { name: "AppTopbar", description: "Page title, search, actions and profile menu.", status: "stable", story: `${M}AppTopbar`, from: "ui-common-components/shell", props: "AppTopbarProps" },
      { name: "AppShell", description: "Legacy alias of DashboardShell.", status: "legacy", replacement: "DashboardShell", from: "ui-common-components/shell" },
    ],
  },
  {
    id: "data",
    title: "Data & charts",
    description: "Tables and native-SVG charts — no chart library dependency.",
    items: [
      { name: "Table", description: "Sorting, selection, search, expandable rows, sticky columns.", status: "stable", story: `${M}Table`, from: "ui-common-components/table", props: "TableProps" },
      { name: "DataTable", description: "Table + FilterBar + Pagination + bulk actions + column visibility + safe CSV export.", status: "new", story: `${M}DataTable`, props: "DataTableProps" },
      { name: "FilterBar", description: "Search, filters, active chips, clear all and announced result count.", status: "new", story: `${M}FilterBar`, props: "FilterBarProps" },
      { name: "LineChart · AreaChart", description: "Trends over time with animated draw.", status: "stable", story: `${M}Charts`, from: "ui-common-components/charts", props: "AreaChartProps" },
      { name: "BarChart · PieChart", description: "Comparisons and composition.", status: "stable", story: `${M}Charts`, from: "ui-common-components/charts", props: "BarChartProps" },
      { name: "ComposedChart", description: "Bar + line + area + range band on shared or dual axes.", status: "stable", story: `${M}Charts`, from: "ui-common-components/charts", props: "ComposedChartProps" },
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
  { id: "infinia-light", dataTheme: "infinia-light", name: "Infinia Light", description: "Infinia (Xalion palette) — yellow CTAs, neutral greys, white surfaces." },
  { id: "infinia-dark", dataTheme: "infinia-dark", name: "Infinia Dark", description: "Infinia (Xalion palette) on near-black surfaces." },
  { id: "light", dataTheme: null, name: "Classic", description: "Library default — Noir CTAs on white surfaces." },
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
    version: "0.0.12",
    date: "27 Nov 2026",
    status: "current",
    summary: "React 18 fixes: Accordion inert, DatePicker keeps focus on Enter.",
    changes: [
      { type: "fixed", text: "Accordion — closed animated panels are inert on React 18 too (attribute set on the DOM node; React 18 dropped the boolean `inert` prop, leaving hidden panels focusable)." },
      { type: "fixed", text: "DatePicker — Enter applies the typed date, closes the calendar and keeps focus in the input." },
    ],
  },
  {
    version: "0.0.11",
    date: "27 Nov 2026",
    status: "previous",
    summary: "Sprint 6 review fixes: Rating target size, DatePicker Escape inside overlays, ToolTip role, disabled Form actions, Hyperlink object hrefs.",
    changes: [
      { type: "fixed", text: "Rating — one full-star pointer target per star (half picked from pointer position), 24px+ spacing at `sm`, 44px stars on coarse pointers (WCAG 2.5.8)." },
      { type: "fixed", text: "DatePicker — Escape closes only the calendar (an enclosing Modal / Drawer stays open); Enter applies the typed date and closes the calendar." },
      { type: "fixed", text: "ToolTip trigger has role=button and opens with Enter / Space. Form `disabled` disables its actions; `loading` marks them aria-disabled (focus-safe)." },
      { type: "fixed", text: "Hyperlink `asChild` passes Next.js URL-object hrefs through (unsafe pathname / protocol still dropped)." },
    ],
  },
  {
    version: "0.0.10",
    date: "27 Nov 2026",
    status: "previous",
    summary: "DatePicker works inside FormField.",
    changes: [
      { type: "added", text: "DatePicker — FormField consumer (label, hint, error and required wired by the field); new `id`, `name` and `ariaLabel` props." },
    ],
  },
  {
    version: "0.0.9",
    date: "27 Nov 2026",
    status: "previous",
    summary: "Sprint 6: Menu, AvatarGroup, Rating, Timeline, TagInput, TimePicker, BottomSheet; richer Hyperlink, Spinner, Breadcrumb, ButtonGroup, OtpBox, Form, DashboardShell.",
    changes: [
      { type: "added", text: "Menu (APG menu button, checkbox / radio items, submenus, typeahead), AvatarGroup, Rating, Timeline, TagInput, TimePicker, BottomSheet (Drawer with drag handle, swipe-to-dismiss, snap points)." },
      { type: "changed", text: "Hyperlink (variants, underline, icons, asChild, safe external links), Spinner (variant, thickness, speed, delay), Breadcrumb (items, maxItems collapse, renderLink), ButtonGroup (attached, cascading size / variant / disabled), OtpBox (onComplete, paste, one-time-code autofill, ref)." },
      { type: "changed", text: "⚠ DashboardShell renders a `<main>` landmark and a skip link — pass `contentAs=\"div\"` if your content already has `<main>`. Form gains onSubmitValues, loading, errorSummary, responsive columns. ToolTip is now a deprecated wrapper over Tooltip." },
      { type: "fixed", text: "Calendar keyboard navigation and aria-pressed days; Accordion no longer mutates a controlled array; AppSidebar sanitises hrefs; DatePicker min / max honoured." },
    ],
  },
  {
    version: "0.0.8",
    date: "27 Nov 2026",
    status: "previous",
    summary: "Hotfix: DatePicker accepts YYYY-MM-DD dates.",
    changes: [
      { type: "fixed", text: "`isValidDate` read the day as the year for YYYY-first formats, so every YYYY-MM-DD date was rejected; DatePicker now passes parsed min / max dates to Calendar." },
    ],
  },
  {
    version: "0.0.7",
    date: "25 Nov 2026",
    status: "previous",
    summary: "Stepper: smaller markers and a calmer default style.",
    changes: [
      { type: "changed", text: "Stepper — markers 24px (`sm`) / 32px (`md`) instead of 36 / 44; upcoming steps are a soft filled circle with a 1px border; the current step is a solid brand fill with a soft halo (`--color-step-current-ring` at 45%) instead of a thick double ring; completed steps keep the success fill; connecting lines are 2px and stop short of the circles; tighter marker-to-label gap." },
      { type: "added", text: "Stepper role tokens (all optional, theme-overridable): `--color-step-current-bg`, `--color-step-current-fg`, `--color-step-complete-bg`, `--color-step-complete-fg`, `--color-step-upcoming-bg`, `--color-step-upcoming-border`." },
    ],
  },
  {
    version: "0.0.6",
    date: "19 Nov 2026",
    status: "previous",
    summary: "New `ui-common-components/openui` entry: the design system as an OpenUI library, so AI agents answer with real components.",
    changes: [
      { type: "added", text: "`ui-common-components/openui` — `designSystemLibrary` (OpenUI) with Stack, Grid, Card, StatCard, DataTable, BarChart, LineChart, PieChart, Alert, Badge and ActionButton; `designSystemLibrary.prompt()` builds the agent's system prompt locally; `Renderer` re-exported. `@openuidev/react-lang` and `zod` are dependencies; the main entry does not import them." },
    ],
  },
  {
    version: "0.0.5",
    date: "5 Nov 2026",
    status: "previous",
    summary: "TextView styles itself without the Tailwind preset; Button gains `unstyled` for custom-styled controls.",
    changes: [
      { type: "fixed", text: "TextView — variant sizes and semantic colours are now library CSS (`tv-*` classes) instead of preset-only Tailwind classes, so apps without the preset no longer render every TextView at 16px body colour. A consumer `className` (e.g. `text-xs`) still overrides them." },
      { type: "added", text: "Button — `unstyled` prop: no variant / size / radius / centring surface and no ripple wrapper; the caller's className styles it. Keeps ref, a11y name, loading / disabled handling and the focus ring. For menu rows, tab strips, list rows and corner badges." },
    ],
  },
  {
    version: "0.0.4",
    date: "4 Nov 2026",
    status: "previous",
    summary: "Gaps found migrating ConsolidateAI: overlays & layering, context menu, file picker, table/input/checkbox upgrades, chart formatters + ComposedChart, ColorPicker, Slider, ToggleButton/ToggleGroup, LoadingOverlay.",
    changes: [
      { type: "changed", text: "⚠ Upgrade note — TextArea: no default maxLength (was 500, silently truncating); with showCount and no maxLength the counter shows only the count. `disabled` is now actually applied to the <textarea>." },
      { type: "changed", text: "⚠ Upgrade note — Input: `value` no longer defaults to \"\" — undefined value means uncontrolled (use defaultValue). Consumer `style` is merged into the input style (was replaced)." },
      { type: "changed", text: "⚠ Upgrade note — Popover / DropdownMenu / ContextMenu default to new token --z-popover (450, above --z-modal) and auto-lift above the highest z-index ancestor of their trigger; ToolTip atom uses --z-tooltip-top (was 50)." },
      { type: "changed", text: "⚠ Upgrade note — Popover / DropdownMenu: Escape closes only the innermost panel and no longer closes an enclosing Modal/Drawer; clicks inside nested portals (Select, DatePicker) no longer close the parent panel; focus is only returned on close if it hasn't moved elsewhere; consumer aria-labelledby on content is respected." },
      { type: "changed", text: "⚠ Upgrade note — Modal / Drawer description renders in a <div> (was <p>). BarChart value scale always includes 0; Line/Area tooltips map the pointer through the SVG viewBox (correct point on wide charts). FileUpload clears its input after failed validation." },
      { type: "added", text: "Modal — size=\"fullscreen\", headerActions, ReactNode title + ariaLabel, block description, onBeforeClose guard (sync/async), bodyScroll=false, bodyClassName, animate=false (dnd-safe), rootProps and data-* on the root." },
      { type: "added", text: "Drawer — headerActions, onBeforeClose guard, bodyScroll=false, bodyClassName." },
      { type: "added", text: "LoadingOverlay — container or fullScreen; blocking (pointer-blocking, aria-busy) or non-blocking veil." },
      { type: "added", text: "Popover / DropdownMenu — zIndex, asChild triggers, anchorRef + PopoverAnchor, DropdownMenuLabel / Separator / Group / CheckboxItem / RadioGroup / RadioItem, item icon / description / shortcut / indent / closeOnSelect. Listbox + ListboxOption primitives. Tooltip zIndex." },
      { type: "added", text: "ContextMenu — opens at the pointer (right-click, Shift+F10, Menu key) or controlled with open + position; viewport flip/clamp, no full-screen click-catcher, focus return." },
      { type: "added", text: "FileUpload variant=\"button\" (+ buttonVariant / buttonSize / buttonProps) and headless useFilePicker() hook with the same validation." },
      { type: "added", text: "Input — defaultValue, inputClassName, inputStyle. TextArea and InputSearch forward refs; TextArea label accepts ReactNode." },
      { type: "added", text: "CheckBox — ReactNode label, hideLabel, native prop pass-through (data-testid, aria-*, …). Switch — forwardRef, hideLabel, native prop pass-through." },
      { type: "added", text: "Table — TableRoot scroll=false, stickyHeader, stickyFirstColumn, maxHeight, flush; TableHead casing / wrap; TableRow selected." },
      { type: "added", text: "FormField — group mode (role=group), hideLabel, htmlFor targeting an inner control of a composite child." },
      { type: "added", text: "Charts — valueFormatter, x/y tick formatters, labelFormatter, xTickAngle, xTickInterval, showYAxis, dual Y axes (series.yAxis), dashed series; BarChart stacked, getBarColor / colorKey, orientation; PieChart start/endAngle, centerLabel, labelFormatter (+ pieLabelNamePercent), outside labels, per-slice colour. New ComposedChart (bar + line + area + range band). charts.css exported (ui-common-components/charts.css)." },
      { type: "added", text: "New components: ColorPicker (hex value, token palette, hex input), Slider (single + range), ToggleButton and ToggleGroup." },
    ],
  },
  {
    version: "0.0.3",
    date: "3 Nov 2026",
    status: "previous",
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

/* ------------------------------------------------------------------ */
/* Compliance reviews (Overview/Dashboard)                            */
/* ------------------------------------------------------------------ */

export type ComplianceDimension = "a11y" | "security" | "responsive";
export type ComplianceOutcome = "pass" | "fail";

export interface ComplianceReview {
  id: string;
  title: string;
  /** Verdict file in the repository (`_fleet/`). */
  file: string;
  /** Review rounds until the final verdict. */
  rounds: number;
  /** Outcome of the first review round per dimension (any failing slice = fail). */
  firstRound: Record<ComplianceDimension, ComplianceOutcome>;
  /** Final verdict per dimension. */
  final: Record<ComplianceDimension, ComplianceOutcome>;
  /** `file:line` of the lines the two outcomes are read from. */
  source: string;
  /** `npx vitest run` total recorded in the final round of that review. */
  testsAtFinal: number;
  testsSource: string;
}

/**
 * Summarised from the compliance-reviewer verdict files (`_fleet/VERDICT-*.md`) — one row per
 * completed review. `complianceSources.test.ts` re-reads every cited line and fails if a verdict
 * file stops saying what this table claims. Sprint 5 is still under review and is not listed.
 */
export const COMPLIANCE_REVIEWS: ComplianceReview[] = [
  {
    id: "portal",
    title: "Design System Portal",
    file: "_fleet/VERDICT-portal.md",
    rounds: 3,
    firstRound: { a11y: "fail", security: "pass", responsive: "fail" },
    final: { a11y: "pass", security: "pass", responsive: "pass" },
    source: "_fleet/VERDICT-portal.md:7-8",
    testsAtFinal: 143,
    testsSource: "_fleet/VERDICT-portal.md:14",
  },
  {
    id: "sprint1",
    title: "Sprint 1 — Feedback & overlays",
    file: "_fleet/VERDICT-sprint1.md",
    rounds: 3,
    firstRound: { a11y: "fail", security: "fail", responsive: "pass" },
    final: { a11y: "pass", security: "pass", responsive: "pass" },
    source: "_fleet/VERDICT-sprint1.md:6-7",
    testsAtFinal: 448,
    testsSource: "_fleet/VERDICT-sprint1.md:13",
  },
  {
    id: "sprint2",
    title: "Sprint 2 — Page patterns",
    file: "_fleet/VERDICT-sprint2.md",
    rounds: 3,
    firstRound: { a11y: "fail", security: "fail", responsive: "pass" },
    final: { a11y: "pass", security: "pass", responsive: "pass" },
    source: "_fleet/VERDICT-sprint2.md:6-9",
    testsAtFinal: 474,
    testsSource: "_fleet/VERDICT-sprint2.md:14",
  },
  {
    id: "sprint3",
    title: "Sprint 3 — Advanced inputs & flows",
    file: "_fleet/VERDICT-sprint3.md",
    rounds: 2,
    firstRound: { a11y: "fail", security: "pass", responsive: "pass" },
    final: { a11y: "pass", security: "pass", responsive: "pass" },
    source: "_fleet/VERDICT-sprint3.md:5,12",
    testsAtFinal: 703,
    testsSource: "_fleet/VERDICT-sprint3.md:27",
  },
  {
    id: "sprint4",
    title: "Sprint 4 — Button & Select hardening",
    file: "_fleet/VERDICT-sprint4.md",
    rounds: 3,
    firstRound: { a11y: "fail", security: "pass", responsive: "pass" },
    final: { a11y: "pass", security: "pass", responsive: "pass" },
    source: "_fleet/VERDICT-sprint4.md:9-10,12",
    testsAtFinal: 784,
    testsSource: "_fleet/VERDICT-sprint4.md:127",
  },
];

export const COMPLIANCE_DIMENSIONS: { id: ComplianceDimension; label: string; checklist: string }[] = [
  { id: "a11y", label: "Accessibility", checklist: "A1–A10" },
  { id: "security", label: "Security", checklist: "B1–B7" },
  { id: "responsive", label: "Responsiveness", checklist: "C1–C7" },
];
