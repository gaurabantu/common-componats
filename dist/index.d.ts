import * as React$1 from 'react';
import React__default, { ReactNode, HTMLAttributes, LiHTMLAttributes, AnchorHTMLAttributes, ButtonHTMLAttributes, TextareaHTMLAttributes, ChangeEvent, RefObject, MouseEvent, ReactElement, InputHTMLAttributes } from 'react';
import { B as ButtonProps, T as TableColumn, a as TableProps } from './table-baec8534.js';
export { k as InputSearch, l as InputSearchProps, m as SearchActionButtonProps, S as SearchButtonDisplay, b as Table, f as TableBody, u as TableBodyProps, d as TableCaption, s as TableCaptionProps, j as TableCell, y as TableCellProps, g as TableFooter, v as TableFooterProps, i as TableHead, x as TableHeadProps, e as TableHeader, t as TableHeaderProps, o as TableLayout, c as TableRoot, r as TableRootProps, h as TableRow, w as TableRowProps, n as TableSearchProps, q as TableTheme, p as TableVariant } from './table-baec8534.js';
import { I as IconSource } from './index-8a491a10.js';
export { a as Icon, b as IconProps } from './index-8a491a10.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { A as AvatarProps } from './shell-81b82aed.js';
export { b as AppShell, e as AppShellProps, a as AppSidebar, p as AppSidebarClassNames, m as AppSidebarFooterAction, q as AppSidebarFooterLayout, k as AppSidebarHeader, g as AppSidebarNavItem, E as AppSidebarPersistPayload, f as AppSidebarProps, h as AppSidebarSection, j as AppSidebarSectionGrouping, i as AppSidebarTier, o as AppSidebarTokens, n as AppSidebarTrailingPreset, l as AppSidebarUser, c as AppTopbar, u as AppTopbarAction, x as AppTopbarClassNames, y as AppTopbarMenuItem, v as AppTopbarProfile, r as AppTopbarProps, t as AppTopbarSearchConfig, s as AppTopbarTheme, w as AppTopbarTokens, D as DashboardShell, d as DashboardShellProps, z as mergeSidebarTokensStyle, F as mergeTopbarTokensStyle, B as readAppSidebarPersist, C as writeAppSidebarPersist } from './shell-81b82aed.js';
export { AreaChart, AreaChartProps, BarChart, BarChartProps, ChartDataPoint, ChartDataSeries, ChartLayoutProps, ChartTheme, ChartTooltip, ChartTooltipItem, ChartTooltipProps, LineChart, LineChartProps, PieChart, PieChartDataPoint, PieChartProps } from './charts.js';

/** Element a Button ref resolves to: `<button>`, or `<a>` when `href` is safe. */
type ButtonElement = HTMLButtonElement | HTMLAnchorElement;
/** Memoised + ref-forwarding: refs reach the rendered `<button>` / `<a>`. */
declare const Button: React__default.NamedExoticComponent<ButtonProps & React__default.RefAttributes<ButtonElement>>;

type TextTag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "small" | "strong" | "em" | "label" | "div" | string;
type TextVariant = "h1" | "h2" | "h3" | "h4" | "body" | "secondary" | "small" | "micro";
type TextColor = "primary" | "secondary" | "hint" | "disabled" | "success" | "warning" | "error" | "inherit";
type TextAlign = "left" | "center" | "right" | "justify";
type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";
type TextDecoration = "none" | "underline" | "line-through";
/** Font size (design token scale). When set, overrides variant size. */
type FontSize = TextVariant;
/** Font weight (matches design system). */
type FontWeight = "normal" | "medium" | "semibold" | "bold" | "extrabold";
/** Line height. */
type LineHeight = "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
/** Letter spacing. */
type LetterSpacing = "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
interface TextViewProps extends React.HTMLAttributes<HTMLElement> {
    /** Element/semantic override (e.g. render body style as a <p>) */
    as?: TextTag | React.ElementType;
    /** Visual style (MUI/AntD-like) */
    variant?: TextVariant;
    /** Text color: semantic token (primary, secondary, …) or any CSS color (e.g. #hex, rgb(), rgba()) */
    color?: TextColor | string;
    /** Font size override: token scale or any CSS size (e.g. 18px, 1.125rem) */
    fontSize?: FontSize | string;
    /** Font weight override: token name or numeric weight (e.g. 600) */
    fontWeight?: FontWeight | number | string;
    /** Line height override */
    lineHeight?: LineHeight;
    /** Letter spacing override */
    letterSpacing?: LetterSpacing;
    /** Alignment */
    align?: TextAlign;
    /** Text transform */
    transform?: TextTransform;
    /** Text decoration */
    decoration?: TextDecoration;
    /** Truncate to single line */
    truncate?: boolean;
}

declare const TextView: React__default.NamedExoticComponent<TextViewProps>;

type ValidationType = "none" | "name" | "email" | "mobile" | "businessPID" | "businessAID" | "businessTAN" | "acknowledgementNumber" | "businessPassport" | "businessTIN" | "alphanumeric" | "numeric" | "pincode" | "custom" | "headerSearch" | "stdCode" | "landline" | "entityName";
type MaskFrom = "start" | "end";
type MaskOptions = Partial<{
    maskChar: string;
    maskFrom: MaskFrom;
    maskPattern: number[];
}>;
type NativeInputProps = Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type" | "maxLength" | "id" | "size" | "pattern" | "prefix" | "suffix">;
/** Ant Design–style: outlined (default) | filled | borderless | underlined */
type InputVariant = "outlined" | "filled" | "borderless" | "underlined";
/** Explicit validation/status display: error | warning | success */
type InputStatus = "error" | "warning" | "success";
interface TextInputProps extends NativeInputProps {
    id?: string;
    label?: string;
    placeholder?: string;
    type?: React$1.HTMLInputTypeAttribute;
    validation?: ValidationType;
    required?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    onErrorChange?: (error: string | null) => void;
    onVerifiedChange?: (verified: boolean) => void;
    errorMessage?: string;
    maxLength?: number;
    /** Ant Design–style size: sm (24px) | md (32px) | lg (40px) */
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    disabled?: boolean;
    borderColorClass?: string;
    className?: string;
    ariaLabel?: string;
    /**
     * - `validation="custom"`: full-value check in `validateInput`.
     * - `validation="headerSearch"` ( **`TextInputSearch`** ): optional **`pattern`** is a regex tested
     *   against each JavaScript **string unit** (`Array.from`); non-matching characters are removed.
     *   Omit both to leave the typed value untouched (spaces and symbols allowed).
     */
    pattern?: RegExp | string;
    /** When `true`, enables spell-check and mobile autocorrect hints (`spellCheck`, WebKit `autoCorrect`). Default `false`. */
    autoCorrection?: boolean;
    rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle";
    showVerifiedStatus?: boolean;
    isVerified?: boolean;
    mask?: boolean;
    maskOptions?: MaskOptions;
    showToggleIcon?: boolean;
    /** Allow clear content with a clear icon (Ant Design allowClear) */
    allowClear?: boolean;
    /** Callback when clear icon is clicked */
    onClear?: () => void;
    /** Prefix content (e.g. icon) inside the input on the left */
    prefix?: React$1.ReactNode;
    /**
     * Suffix content inside the input on the right, before clear/toggle.
     * For `type="search"`, omit or pass `undefined` to get the default trailing search icon;
     * pass `null` to suppress it (e.g. prefix-only search fields).
     */
    suffix?: React$1.ReactNode;
    /** Show character count (e.g. "0 / 200") when maxLength is set */
    showCount?: boolean;
    /** Callback when Enter key is pressed */
    onPressEnter?: (e: React$1.KeyboardEvent<HTMLInputElement>) => void;
    /** Override status display: error | warning | success */
    status?: InputStatus;
    /** Ant Design–style variant: outlined | filled | borderless | underlined */
    variant?: InputVariant;
    /**
     * `integrated` — single outline (Material-style): trailing zone flush to the right edge,
     * no extra gap before the action; clear sits before suffix when both are shown.
     * Most useful with `validation="headerSearch"`.
     */
    trailingRail?: "default" | "integrated";
    toggleIcon?: IconSource;
    toggleOffIcon?: IconSource;
    errorIcon?: IconSource;
    verifiedIcon?: IconSource;
    toggleIconSize?: number;
    statusIconSize?: number;
    disableClipboard?: boolean;
    isdCode?: string;
}

declare const TextInput: React__default.ForwardRefExoticComponent<TextInputProps & React__default.RefAttributes<HTMLInputElement>>;

/** Control + label scale — `sm` 16px box · `md` 18px box (default) · `lg` 22px box. */
type CheckboxSize = "sm" | "md" | "lg";
interface CheckboxProps {
    label: string;
    name: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * "Some but not all" state (e.g. a select-all header). Sets the DOM `indeterminate`
     * property (exposed natively to assistive tech as "mixed") and shows a dash.
     * Takes visual precedence over `checked`.
     * @default false
     */
    indeterminate?: boolean;
    /** Helper text under the label, linked with `aria-describedby`. */
    description?: ReactNode;
    /** @default "md" */
    size?: CheckboxSize;
    /** Error message under the control — sets `aria-invalid` and is linked with `aria-describedby`. */
    error?: string;
    /** Native `required` plus a visible "*" after the label. @default false */
    required?: boolean;
    /** Input id. Generated with `useId` when omitted. */
    id?: string;
    /**
     * Optional classes on the custom checkbox shell (supports Tailwind `peer-checked:` alongside the visually hidden input marked `peer`).
     * @deprecated Style through design tokens / `size` instead; kept for backward compatibility.
     */
    checkboxColorClass?: string;
    /** @deprecated Style through design tokens / `size` instead; kept for backward compatibility. */
    labelColorClass?: string;
    /** @deprecated Use layout on the parent instead; kept for backward compatibility. */
    inputLabelSpacingClass?: string;
    className?: string;
    ariaLabelledBy?: string;
    /**
     * Required for screen readers when `label` is empty (e.g. table row selection).
     * Sets `aria-label` on the input instead of relying on an empty visible label.
     */
    ariaLabel?: string;
    /** Controls design (default or boxed) */
    shape?: "default" | "box";
    /** Rounded size for box mode */
    rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle";
    /** Optional shadow for box mode */
    withShadow?: boolean;
}

declare const Checkbox: React__default.NamedExoticComponent<CheckboxProps & React__default.RefAttributes<HTMLInputElement>>;

type SwitchSize = "sm" | "md";
interface SwitchProps {
    /** Controlled: current on/off state. Omit with `defaultChecked` for uncontrolled. */
    checked?: boolean;
    /** Uncontrolled initial state (ignored when `checked` is set). */
    defaultChecked?: boolean;
    /** Fires after toggle with the new value. */
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    /** Optional id for the switch control (auto-generated if omitted). */
    id?: string;
    /**
     * When set, a hidden input is rendered for native form posts:
     * `value` when on, `uncheckedValue` when off.
     */
    name?: string;
    /** Submitted when the switch is on (default `"on"`). */
    value?: string;
    /** Submitted when the switch is off (default `"off"`). */
    uncheckedValue?: string;
    /** Visible label next to the control. */
    label?: React__default.ReactNode;
    /** Label before or after the track (default `"end"`). */
    labelPosition?: "start" | "end";
    /**
     * Accessible name when there is no visible `label`.
     * If both are omitted, `"Toggle"` is used.
     */
    "aria-label"?: string;
    /** Extra class on the outer wrapper. */
    className?: string;
    /** Extra class on the switch button (track + thumb). */
    switchClassName?: string;
    /** `md` uses a compact 40×22px visual track with ~44×44px touch target; `sm` is denser. */
    size?: SwitchSize;
}

/**
 * Toggle switch — boolean on/off control.
 *
 * Follows the [ARIA switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
 * (same semantics as Radix UI Switch / MUI Switch): `role="switch"`, `aria-checked`,
 * native `<button>` activation (pointer + Space/Enter), visible focus ring.
 */
declare const Switch: React__default.NamedExoticComponent<SwitchProps>;

type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger" | "info";
/** Soft = tinted surface; solid = strong fill; outline = border emphasis */
type BadgeTone = "soft" | "solid" | "outline";
/** `rounded` = tag/badge (token radius-xs); `pill` = chip */
type BadgeShape = "rounded" | "pill";
type BadgeSize = "sm" | "md";
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: BadgeVariant;
    tone?: BadgeTone;
    shape?: BadgeShape;
    size?: BadgeSize;
    /** Subtle elevation (shadow-xs) */
    elevated?: boolean;
    /** Leading status dot (e.g. live / unread) */
    dot?: boolean;
    /** Optional leading icon or node (compact; use with `md` for balance) */
    icon?: ReactNode;
    /** Renders a dismiss control; keep label meaningful for assistive tech */
    onDismiss?: () => void;
    dismissLabel?: string;
}
/** Alias — same props as `Badge` */
type ChipProps = BadgeProps;
/** Alias — same props as `Badge` */
type TagProps = BadgeProps;

/**
 * Badge, tag, or chip — compact label with semantic variants and optional dot or dismiss.
 * Use `shape="pill"` for chips, `shape="rounded"` (default) for tags/badges per design system radii.
 */
declare const Badge: React__default.NamedExoticComponent<BadgeProps>;

/** Same component — use when naming chips in product copy */
declare const Chip: React__default.NamedExoticComponent<BadgeProps>;
/** Same component — use when naming tags in product copy */
declare const Tag: React__default.NamedExoticComponent<BadgeProps>;

interface RadioButtonProps {
    label: string;
    subLabel?: string;
    value: string;
    name: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** Optional classes on the animated radio ring (`peer` works for Tailwind modifiers). */
    radioColorClass?: string;
    labelColorClass?: string;
    shape?: "default" | "box";
    rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle";
    withShadow?: boolean;
}
interface RadioGroupProps {
    options: Omit<RadioButtonProps, "checked" | "onChange" | "name">[];
    name: string;
    selectedValue: string;
    onChange: (value: string) => void;
    layout?: "vertical" | "horizontal" | "grid" | "grid-auto";
    columns?: number;
    minWidth?: string;
    gap?: string;
    radioColorClass?: string;
    labelColorClass?: string;
    ariaLabelledBy?: string;
}

declare const RadioGroup: React__default.FC<RadioGroupProps>;

interface FormProps extends Omit<React__default.FormHTMLAttributes<HTMLFormElement>, "title"> {
    badge?: string;
    title?: string;
    description?: string;
    children: React__default.ReactNode;
    actions?: React__default.ReactNode;
    footer?: React__default.ReactNode;
    layout?: "stacked" | "grid";
    columns?: number;
    gap?: number;
    maxWidth?: number | string;
    shellClassName?: string;
    cardClassName?: string;
    contentClassName?: string;
    fieldsClassName?: string;
    shellStyle?: React__default.CSSProperties;
    cardStyle?: React__default.CSSProperties;
    contentStyle?: React__default.CSSProperties;
    fieldsStyle?: React__default.CSSProperties;
}
declare function Form({ badge, title, description, children, actions, footer, layout, columns, gap, maxWidth, shellClassName, cardClassName, contentClassName, fieldsClassName, shellStyle, cardStyle, contentStyle, fieldsStyle, className, style, ...rest }: FormProps): react_jsx_runtime.JSX.Element;

interface GridProps extends React__default.HTMLAttributes<HTMLDivElement> {
    columns?: number;
    gap?: number | string;
    minItemWidth?: number | string;
    alignItems?: React__default.CSSProperties["alignItems"];
    justifyItems?: React__default.CSSProperties["justifyItems"];
    autoFit?: boolean;
    fullWidth?: boolean;
}
interface GridItemProps extends React__default.HTMLAttributes<HTMLDivElement> {
    span?: number;
    rowSpan?: number;
}
declare function GridItem({ span, rowSpan, style, children, ...rest }: GridItemProps): react_jsx_runtime.JSX.Element;
declare function Grid({ columns, gap, minItemWidth, alignItems, justifyItems, autoFit, fullWidth, style, children, ...rest }: GridProps): react_jsx_runtime.JSX.Element;

type BreadcrumbSeparator = "slash" | "chevron";
interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
    /** Accessible name for the navigation landmark */
    ariaLabel?: string;
    /** Visual separator between items */
    separator?: BreadcrumbSeparator;
    /** Compact vs default text size */
    size?: "sm" | "md";
    children: ReactNode;
}
interface BreadcrumbItemProps extends Omit<LiHTMLAttributes<HTMLLIElement>, "children"> {
    /** When set and not the current page, renders a link */
    href?: string;
    /** Current page segment — use with `href` (self link) or omit `href` for plain text */
    current?: boolean;
    children: ReactNode;
    /** Applied to the inner `<a>` when a link is rendered */
    linkProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">;
}

/**
 * Landmark navigation with ordered list. Pair with `BreadcrumbItem`.
 * Separators are decorative (CSS `::after`); links expose focus rings for keyboard users.
 */
declare const Breadcrumb: React__default.NamedExoticComponent<BreadcrumbProps>;
/**
 * One trail segment. Pass `href` for links; omit `href` or set `current` for the active page.
 */
declare const BreadcrumbItem: React__default.NamedExoticComponent<BreadcrumbItemProps>;

type TabsOrientation = "horizontal" | "vertical";
/**
 * - `line` — underline indicator (default)
 * - `minimal` — soft fill on active tab
 * - `segmented` — single rounded “one box” track, sliding pill + icon/label (shadcn-style)
 */
type TabsVariant = "line" | "minimal" | "segmented";
type TabsSize = "sm" | "md";
/**
 * - `wrap` — tabs flow to multiple rows when needed (default)
 * - `nowrap` — single row; overflow scrolls horizontally
 * - `equal` — tabs share width evenly on one row; long labels wrap inside each tab
 */
type TabsListLayout = "wrap" | "nowrap" | "equal";
/**
 * Icon + label arrangement inside each tab trigger.
 * - `inline` — icon and label on one row (default)
 * - `stacked` — icon above label
 */
type TabsTriggerLayout = "inline" | "stacked";
/**
 * Horizontal alignment of icon+label inside the tab trigger (LTR).
 * @default "center"
 */
type TabsTriggerAlign = "start" | "center" | "end";
/**
 * Keyboard activation (aligned with Radix Tabs).
 * - `automatic` — moving focus with arrows activates that tab (default).
 * - `manual` — arrows only move focus; activate with Enter or Space on the focused tab (or click).
 */
type TabsActivationMode = "automatic" | "manual";
/**
 * Enter animation for the visible tab panel (shadcn-style subtle motion).
 * - `none` — no animation
 * - `fade` — opacity only
 * - `fade-slide` — opacity + short vertical motion
 * - `scale` — opacity + subtle scale
 * - `slide-horizontal` — opacity + slight horizontal motion (entering from the side)
 */
type TabsContentAnimation = "none" | "fade" | "fade-slide" | "scale" | "slide-horizontal";
/** Context value exposed for advanced composition (mirrors common tabs APIs). */
interface TabsContextValue {
    value: string;
    setValue: (v: string) => void;
    baseId: string;
    orientation: TabsOrientation;
    variant: TabsVariant;
    size: TabsSize;
    listLayout: TabsListLayout;
    activationMode: TabsActivationMode;
    triggerLayout: TabsTriggerLayout;
    triggerAlign: TabsTriggerAlign;
}
interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** Selected panel id when controlled */
    value?: string;
    /** Initial panel id when uncontrolled */
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: TabsOrientation;
    /** Visual style of the tab row */
    variant?: TabsVariant;
    size?: TabsSize;
    /** Tab strip layout: wrapped rows, single scrolling row, or equal-width columns */
    listLayout?: TabsListLayout;
    /**
     * Keyboard behavior: automatic (focus = select) vs manual (Enter/Space to select).
     * @default "automatic"
     */
    activationMode?: TabsActivationMode;
    /**
     * Panel enter animation: `fade` | `fade-slide` | `scale` | `slide-horizontal` | `none`.
     * @default "fade"
     */
    contentAnimation?: TabsContentAnimation;
    /**
     * Color of the list divider (horizontal bottom or vertical right border).
     * Selected tab indicator uses the same color unless `indicatorColor` is set.
     */
    dividerColor?: string;
    /** Thickness of the list divider line, e.g. `1` or `"2px"` */
    dividerWidth?: number | string;
    /**
     * Selected-tab indicator color; defaults to `dividerColor` / `--tabs-divider-color`.
     */
    indicatorColor?: string;
    /** Indicator thickness; defaults to `dividerWidth` */
    indicatorWidth?: number | string;
    /** Inactive tab label color */
    inactiveTextColor?: string;
    /**
     * Active tab label color; defaults to the indicator color (same as divider when synced).
     */
    activeTextColor?: string;
    /** Override tab label font size, e.g. `15` or `"0.875rem"` */
    tabFontSize?: number | string;
    /**
     * Icon + label layout for triggers that pass `icon` (ignored for text-only tabs).
     * @default "inline"
     */
    triggerLayout?: TabsTriggerLayout;
    /**
     * Horizontal alignment of icon+label inside each tab (LTR).
     * @default "center"
     */
    triggerAlign?: TabsTriggerAlign;
    children: ReactNode;
}
interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
    /** Accessible name for the tablist (maps to `aria-label`) */
    ariaLabel: string;
    children: ReactNode;
}
interface TabsTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "role"> {
    value: string;
    children: ReactNode;
    /** Optional icon before the label (e.g. lucide icon or `<Icon />`). */
    icon?: ReactNode;
    /** Disable this tab (not focusable, not selectable) */
    disabled?: boolean;
    /** Override parent `Tabs` `triggerLayout` for this tab only */
    triggerLayout?: TabsTriggerLayout;
    /** Override parent `Tabs` `triggerAlign` for this tab only */
    triggerAlign?: TabsTriggerAlign;
}
interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children: ReactNode;
    /** When true, inactive panels stay mounted but hidden (preserves state) */
    forceMount?: boolean;
}

declare const Tabs: React__default.NamedExoticComponent<TabsProps>;
declare const TabsList: React__default.NamedExoticComponent<TabsListProps>;
declare const TabsTrigger: React__default.NamedExoticComponent<TabsTriggerProps>;
declare const TabsContent: React__default.NamedExoticComponent<TabsContentProps>;

type AccordionType = "single" | "multiple";
/** Visual density / chrome */
type AccordionVariant = "default" | "bordered" | "flush";
/**
 * Panel open/close behavior.
 * - `default` — height + fade transitions; closed panels stay mounted for smooth collapse (better for typical FAQ-sized lists).
 * - `none` — instant toggle; closed panels unmount (lighter DOM when many items).
 */
type AccordionMotion = "default" | "none";
type AccordionDensity = "default" | "compact" | "relaxed";
interface AccordionContextValue {
    type: AccordionType;
    collapsible: boolean;
    isOpen: (itemValue: string) => boolean;
    toggle: (itemValue: string) => void;
    baseId: string;
    variant: AccordionVariant;
    motion: AccordionMotion;
    density: AccordionDensity;
}
interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    children: ReactNode;
    type?: AccordionType;
    /**
     * When `type="single"`, allow closing the open item so nothing is expanded.
     * @default true
     */
    collapsible?: boolean;
    /** Controlled: selected item (`single`) or items (`multiple`). */
    value?: string | string[];
    /** Uncontrolled initial value. */
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[] | undefined) => void;
    variant?: AccordionVariant;
    /**
     * Animated expand/collapse vs instant unmount when closed.
     * @default "default"
     */
    motion?: AccordionMotion;
    /**
     * Vertical padding presets for triggers and panel body (`--ds-accordion-*` tokens).
     * @default "default"
     */
    density?: AccordionDensity;
}
interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children: ReactNode;
    disabled?: boolean;
}
interface AccordionTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
    children: ReactNode;
}
interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    /** Keep inactive content mounted (hidden) for stateful panels */
    forceMount?: boolean;
}

declare const Accordion: React__default.NamedExoticComponent<AccordionProps>;
declare const AccordionItem: React__default.NamedExoticComponent<AccordionItemProps>;
declare const AccordionTrigger: React__default.NamedExoticComponent<AccordionTriggerProps>;
declare const AccordionContent: React__default.NamedExoticComponent<AccordionContentProps>;

type ButtonGroupOrientation = "horizontal" | "vertical";
interface ButtonGroupContextValue {
    orientation: ButtonGroupOrientation;
}
interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
    children: ReactNode;
    /**
     * Layout of grouped controls.
     * @default "horizontal"
     */
    orientation?: ButtonGroupOrientation;
}
interface ButtonGroupSeparatorProps extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
    /**
     * Visual axis of the divider line.
     * Defaults to `vertical` when the parent group is horizontal, and `horizontal` when vertical.
     */
    orientation?: ButtonGroupOrientation;
}
interface ButtonGroupTextProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    /**
     * Merge props into a single child element (e.g. `<Label />`) instead of rendering a `<span>`.
     */
    asChild?: boolean;
}

declare const ButtonGroup: React__default.NamedExoticComponent<ButtonGroupProps>;
declare const ButtonGroupSeparator: React__default.NamedExoticComponent<ButtonGroupSeparatorProps>;
declare const ButtonGroupText: React__default.NamedExoticComponent<ButtonGroupTextProps>;

type StepperSize = "sm" | "md";
/** Background line: `continuous` = single fill %; `segments` = per-gap tint only; `none` = neutral gaps only. */
type StepperTrackMode = "none" | "continuous" | "segments";
/**
 * Visual weight of the stem (connector) and marker.
 * - `default` — standard track and circles
 * - `emphasized` — thicker stem, softer gradient fill, slightly stronger current-step ring
 */
type StepperAppearance = "default" | "emphasized";
interface StepperContextValue {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    stepCount: number;
    linear: boolean;
    baseId: string;
    size: StepperSize;
    trackMode: StepperTrackMode;
    appearance: StepperAppearance;
}
interface StepperProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    /** Current step index (0-based). Controlled mode when set. */
    value?: number;
    /** Initial step when uncontrolled. */
    defaultValue?: number;
    onValueChange?: (index: number) => void;
    /**
     * When true, steps ahead of the current step are not navigable by clicking
     * (use app-level “Next” to advance). Previous steps remain clickable.
     */
    linear?: boolean;
    /** Nav landmark label for screen readers. */
    ariaLabel?: string;
    size?: StepperSize;
    /** On wide viewports, allow horizontal scroll when there are many steps (narrow min-width per step). */
    scrollable?: boolean;
    /**
     * How the track between steps is drawn.
     * - `continuous`: one baseline + fill width by completion (see `progressValue`).
     * - `segments`: tint each gap when the step before it is complete.
     * - `none`: neutral gaps only (no completion tint).
     */
    trackMode?: StepperTrackMode;
    /**
     * Completion amount for the continuous track, `0–100`.
     * Default: derived from the active index — `(activeIndex / (stepCount - 1)) * 100`, or `100` when there is one step.
     */
    progressValue?: number;
    /**
     * Heavier stem + marker treatment (gradient fill, thicker track).
     * @default "default"
     */
    appearance?: StepperAppearance;
}
interface StepperStepProps extends Omit<HTMLAttributes<HTMLButtonElement>, "type"> {
    /** Primary label for the step. */
    label: ReactNode;
    /** Optional supporting text under the label. */
    description?: ReactNode;
    /** Disables this step’s control. */
    disabled?: boolean;
    /**
     * Centered inside the round marker for **current** and **upcoming** steps (and for **complete**
     * when `showCheckWhenComplete={false}`). Use for pictograms (e.g. preview eye).
     */
    icon?: ReactNode;
    /**
     * Text or number inside the marker when `icon` is not set (e.g. `"A"`, `"2"`).
     * If omitted, the default is `stepIndex + 1`.
     */
    markerText?: ReactNode;
    /**
     * When `true` (default), completed steps show a checkmark; set `false` to keep `icon` / `markerText` when complete.
     */
    showCheckWhenComplete?: boolean;
    /**
     * @internal Injected by `<Stepper>` when using compound children.
     */
    stepIndex?: number;
    /**
     * @internal `marker` = circle control only; `text` = label block below the track (aligned under the same column).
     */
    stepPart?: "marker" | "text";
}

declare const Stepper: React__default.NamedExoticComponent<StepperProps>;
declare const StepperStep: React__default.NamedExoticComponent<StepperStepProps>;

type FileUploadSize = "sm" | "md";
interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onError"> {
    /** Visible title inside the dropzone (also used for the control’s accessible name) */
    label: string;
    /** Secondary line under the label */
    description?: string;
    /** Shown below the zone; use with `aria-invalid` via `errorMessage` */
    errorMessage?: string;
    name?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    required?: boolean;
    /** When `multiple`, caps how many files are accepted */
    maxFiles?: number;
    /** Per-file maximum size in bytes */
    maxSizeBytes?: number;
    /**
     * Allowed filename extensions (with dot), e.g. `[".pdf", ".png"]`.
     * Combined with `accept` / `allowedMimeTypes` for validation.
     */
    allowedExtensions?: string[];
    /**
     * Allowed MIME types, e.g. `["application/pdf", "image/png"]`.
     * Supports wildcards like `image/*`.
     */
    allowedMimeTypes?: string[];
    /**
     * Verify file content (magic bytes) matches extension/MIME (spoofing defense).
     * Defaults to true when `accept`, `allowedExtensions`, or `allowedMimeTypes` is set.
     */
    verifyMagicBytes?: boolean;
    /**
     * Scan PDF/SVG payloads for SQL-injection-like or script-like ASCII patterns (best-effort).
     * May false-positive on legitimate technical documents — disable if needed.
     * Server-side validation is still required for production.
     */
    scanPdfForSqlInjection?: boolean;
    /** Max bytes read for magic-byte and content scans (default 256 KiB) */
    maxScanBytes?: number;
    /** Passed to the native file input */
    capture?: boolean | "user" | "environment";
    onFilesChange?: (files: File[]) => void;
    onError?: (message: string) => void;
    /** Reset the native input after handling so the same file can be chosen again */
    clearInputAfterSelect?: boolean;
    size?: FileUploadSize;
    /**
     * Icon above the label. Omit for default upload glyph; pass `null` to hide.
     */
    icon?: ReactNode | null;
    id?: string;
}
/** Alias — same props as `FileUpload` */
type DropzoneProps = FileUploadProps;

/**
 * Client-side file validation helpers. Browser checks can be bypassed — always re-validate on the server.
 */
interface FileUploadSecurityOptions {
    /** Lowercase extensions with dot, e.g. [".pdf", ".png"] */
    allowedExtensions?: string[];
    /** e.g. ["application/pdf", "image/png"] */
    allowedMimeTypes?: string[];
    /**
     * When true, file content (magic bytes) must match the declared type.
     * Defaults to true if any allowlist or `accept` is used.
     */
    verifyMagicBytes?: boolean;
    /**
     * Best-effort scan of PDF (and optional text-like) payloads for SQL-injection-like ASCII patterns.
     * Can false-positive on legitimate PDFs with technical text — disable if needed.
     */
    scanPdfForSqlInjection?: boolean;
    /** Bytes read for magic + content scan (default 256 KiB) */
    maxScanBytes?: number;
}
declare function parseAcceptString(accept: string | undefined): {
    extensions: string[];
    mimes: string[];
};
declare function validateFilename(name: string): string | null;
type DetectedKind = "pdf" | "png" | "jpeg" | "gif" | "webp" | "svg" | "zip" | "unknown";
declare function detectFileKindFromBuffer(buffer: ArrayBuffer): DetectedKind;
declare function validateFileSecurity(file: File, options: FileUploadSecurityOptions & {
    accept?: string;
}): Promise<string | null>;
declare function validateFilesSecurity(files: File[], options: FileUploadSecurityOptions & {
    accept?: string;
}): Promise<string | null>;

/**
 * File picker with drag-and-drop. Uses a native `<input type="file">` (focusable, form-friendly)
 * with optional size limits and client-side security checks (magic bytes, MIME, filename, content scan).
 * Always re-validate uploads on the server.
 */
declare const FileUpload: React__default.NamedExoticComponent<FileUploadProps>;

declare const Dropzone: React__default.NamedExoticComponent<FileUploadProps>;

type PopoverPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

interface PopoverProps {
    children: ReactNode;
    /** Controlled open state */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placement?: PopoverPlacement;
}
interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    /** Maps to `aria-haspopup` (menus, dialogs, listbox, etc.). */
    hasPopup?: "dialog" | "menu" | "true" | "listbox";
}
interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    /** Override default role (dialog for generic popover) */
    role?: "dialog" | "region" | "menu" | "none";
    /**
     * Show a small pointer toward the trigger so the panel reads as anchored to the button/icon.
     * @default true — plain box: pass `showPointer={false}`.
     * `DropdownMenuContent` defaults to `false`.
     */
    showPointer?: boolean;
}
interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    /** Called when item is chosen; menu closes after */
    onSelect?: () => void;
    /** Destructive action styling */
    variant?: "default" | "danger";
    disabled?: boolean;
    /** Press ripple; off when disabled. @default true */
    ripple?: boolean;
}

declare const Popover: React__default.NamedExoticComponent<PopoverProps>;
declare const PopoverTrigger: React__default.ForwardRefExoticComponent<PopoverTriggerProps & React__default.RefAttributes<HTMLButtonElement>>;
declare const PopoverContent: React__default.NamedExoticComponent<PopoverContentProps>;
/** Same root as `Popover` — use for action menus (Delete, Resend, …). */
declare const DropdownMenu: React__default.NamedExoticComponent<PopoverProps>;
declare const DropdownMenuTrigger: React__default.ForwardRefExoticComponent<Omit<PopoverTriggerProps, "hasPopup"> & React__default.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuContent: React__default.NamedExoticComponent<Omit<PopoverContentProps, "role">>;
declare const DropdownMenuItem: React__default.NamedExoticComponent<DropdownMenuItemProps>;

/**
 * TextAreaProps
 * - Omit attributes that we manage differently (size, onChange signature).
 * - onChange returns (value, event) for simpler integration.
 */
interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onChange' | 'rows' | 'maxLength'> {
    label?: string;
    /**
     * size: matches UX4G / Bootstrap form-control sizes
     * '' means default
     */
    size?: 'sm' | 'md' | 'lg' | '';
    containerClass?: string;
    rows?: number;
    maxLength?: number;
    fullWidth?: boolean;
    helperText?: string;
    errorMessage?: string;
    showCount?: boolean;
    status?: 'error' | 'warning' | 'success';
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    rounded?: '0' | '1' | '2' | '3' | '4' | '5' | 'pill';
    sanitize?: boolean;
    removeChars?: string;
    removeEmojis?: boolean;
    normalizeAccents?: boolean;
    toCase?: 'U' | 'L' | 'C' | '';
    /**
     * onChange callback signature:
     *  (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void
     * allows easy consumption without reading event.target.value externally
     */
    onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
    defaultValue?: string;
    className?: string;
    ariaLabel?: string;
}

/**
 * UX4G TextArea component
 *
 * - Controlled or uncontrolled usage supported
 * - Optional sanitization via text-validator
 * - Uses size classes consistent with UX4G/Bootstrap
 */
declare const TextArea: React__default.FC<TextAreaProps>;

type ProgressBarType = "line" | "circle";
type ProgressBarSize = "xs" | "sm" | "md" | "lg";
type ProgressBarAnimation = "none" | "smooth" | "pulse" | "stripes-flow";
interface ProgressBarProps {
    value: number;
    type?: ProgressBarType;
    customColor?: string;
    gradient?: string;
    trackColor?: string;
    striped?: boolean;
    animated?: boolean;
    animation?: ProgressBarAnimation;
    showLabel?: boolean;
    label?: string;
    size?: ProgressBarSize;
    className?: string;
    height?: string;
    width?: string;
    ariaLabel?: string;
    stepCount?: number;
    formCount?: number;
    showValue?: boolean;
    strokeWidth?: number;
    rounded?: boolean;
}

declare const ProgressBar: React__default.FC<ProgressBarProps>;

interface GradientTextProps {
    children: React__default.ReactNode;
    /** Render element. Default: span */
    as?: keyof React__default.JSX.IntrinsicElements;
    /** Custom gradient. Defaults to brand primary -> brand secondary. */
    gradient?: string;
    /** Fallback text color for environments without background-clip support. */
    fallbackColor?: string;
    className?: string;
    style?: React__default.CSSProperties;
}

declare const GradientText: React__default.NamedExoticComponent<GradientTextProps>;

type TooltipPlacement = "auto" | "top" | "bottom" | "left" | "right";
interface TooltipIconProps extends Omit<React__default.HTMLAttributes<HTMLSpanElement>, "content"> {
    tooltipText: string;
    content?: React__default.ReactNode;
    children?: React__default.ReactNode;
    placement?: TooltipPlacement;
    tooltipContentIcon?: IconSource;
    delay?: number;
    closeDelay?: number;
    size?: number;
    color?: string;
    className?: string;
    iconToolTip?: IconSource;
    maxWidth?: number | string;
    variant?: "dark" | "light";
}

declare const TooltipIcon: React__default.FC<TooltipIconProps>;

/** §26 — bordered (static), elevated (interactive), withIndicator (selected row). Legacy: outlined, filled */
type CardVariantName = "bordered" | "elevated" | "withIndicator" | "outlined" | "filled";
/** Root padding rhythm — matches common card density patterns (see shadcn Card `size`). */
type CardSize = "default" | "sm";
interface CardProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "title"> {
    /** Compact padding and gaps (`sm`) vs default dashboard density. Ignored when `padding` is set. */
    size?: CardSize;
    title?: React__default.ReactNode;
    subtitle?: React__default.ReactNode;
    extra?: React__default.ReactNode;
    cover?: React__default.ReactNode;
    actions?: React__default.ReactNode;
    actionsAlign?: "left" | "center" | "right" | "between";
    footer?: React__default.ReactNode;
    /** @deprecated Prefer `variant="bordered"` — default true only affects legacy `outlined` */
    bordered?: boolean;
    hoverable?: boolean;
    variant?: CardVariantName;
    /** Shadow tier when elevated / withIndicator */
    elevation?: "none" | "sm" | "md" | "lg";
    /**
     * Selected state. `withIndicator` → left bar (§26). `bordered` → strong 2px outline
     * (option tiles). When `interactive`, also exposed as `aria-pressed`.
     */
    selected?: boolean;
    /**
     * Clickable tile: hover border, pointer cursor, visible focus ring. With `onClick` and no
     * explicit `role`, the card becomes `role="button"` + `tabIndex=0` and activates on Enter/Space.
     * Without `onClick` it is visual only (hover + pointer) — use when the card sits inside a link.
     * Do not nest other interactive controls inside an interactive card.
     */
    interactive?: boolean;
    /** Padding — token string or number (px); overrides `size` default padding */
    padding?: number | string;
    /** Radius token string or number (px) */
    radius?: number | string;
}
interface CardHeaderProps extends React__default.HTMLAttributes<HTMLDivElement> {
}
interface CardTitleProps extends React__default.HTMLAttributes<HTMLHeadingElement> {
    /** Heading level for accessibility (default 3). */
    as?: "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}
interface CardDescriptionProps extends React__default.HTMLAttributes<HTMLParagraphElement> {
    as?: "p" | "div";
}
interface CardActionProps extends React__default.HTMLAttributes<HTMLDivElement> {
}
interface CardContentProps extends React__default.HTMLAttributes<HTMLDivElement> {
    /** Use for full-bleed media — removes horizontal padding (still respects vertical rhythm). */
    noPadding?: boolean;
}
interface CardFooterProps extends React__default.HTMLAttributes<HTMLDivElement> {
    /** When false, footer has no top border (e.g. subtle metadata under content). */
    borderTop?: boolean;
}

declare const CardHeader: React__default.ForwardRefExoticComponent<CardHeaderProps & React__default.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React__default.ForwardRefExoticComponent<CardTitleProps & React__default.RefAttributes<HTMLHeadingElement>>;
declare const CardDescription: React__default.ForwardRefExoticComponent<CardDescriptionProps & React__default.RefAttributes<HTMLParagraphElement>>;
declare const CardAction: React__default.ForwardRefExoticComponent<CardActionProps & React__default.RefAttributes<HTMLDivElement>>;
declare const CardContent: React__default.ForwardRefExoticComponent<CardContentProps & React__default.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React__default.ForwardRefExoticComponent<CardFooterProps & React__default.RefAttributes<HTMLDivElement>>;
declare const Card: React__default.ForwardRefExoticComponent<CardProps & React__default.RefAttributes<HTMLDivElement>> & {
    Header: React__default.ForwardRefExoticComponent<CardHeaderProps & React__default.RefAttributes<HTMLDivElement>>;
    Title: React__default.ForwardRefExoticComponent<CardTitleProps & React__default.RefAttributes<HTMLHeadingElement>>;
    Description: React__default.ForwardRefExoticComponent<CardDescriptionProps & React__default.RefAttributes<HTMLParagraphElement>>;
    Action: React__default.ForwardRefExoticComponent<CardActionProps & React__default.RefAttributes<HTMLDivElement>>;
    Content: React__default.ForwardRefExoticComponent<CardContentProps & React__default.RefAttributes<HTMLDivElement>>;
    Footer: React__default.ForwardRefExoticComponent<CardFooterProps & React__default.RefAttributes<HTMLDivElement>>;
};

declare const Avatar: React__default.FC<AvatarProps>;

interface DatePickerProps {
    value?: string;
    onChange?: (val: string) => void;
    label?: string;
    placeholder?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    range?: boolean;
    className?: string;
    helperText?: string;
    disabled?: boolean;
    /** Display format: DD-MM-YYYY (default), MM/DD/YYYY, YYYY-MM-DD, etc. Input accepts flexible formats; output uses this format. */
    dateFormat?: string;
    minDate?: string;
    maxDate?: string;
    validate?: (val: string) => boolean;
    onValidate?: (valid: boolean) => void;
    error?: string;
    required?: boolean;
    fullWidth?: boolean;
    size?: "sm" | "md" | "lg";
    rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill";
    variant?: "outlined" | "filled" | "underlined";
    status?: "error" | "warning" | "success";
    rangeSeparator?: string;
}

declare const DatePicker: React__default.FC<DatePickerProps>;

type CalendarAnimation = "none" | "slide" | "fade" | "scale";
type CalendarSize = "sm" | "md" | "lg";
/** Card-like elevation levels */
type CalendarElevation = "none" | "sm" | "md" | "lg";
/** Visual variant aligned with Card component */
type CalendarVariant = "outlined" | "elevated" | "filled";
/** Theme tokens for dynamic styling. All values are optional; defaults apply when omitted. */
interface CalendarTheme {
    /** Primary/accent color (selected date, nav hover) */
    primary?: string;
    /** Primary hover state */
    primaryHover?: string;
    /** Text color on primary background */
    primaryText?: string;
    /** Range highlight background */
    rangeBackground?: string;
    /** Today highlight background */
    todayBackground?: string;
    /** Today ring/border color */
    todayRing?: string;
    /** Main text color */
    text?: string;
    /** Secondary text (weekdays, other month) */
    textSecondary?: string;
    /** Disabled text color */
    textDisabled?: string;
    /** Calendar background */
    background?: string;
    /** Border color */
    border?: string;
    /** Select/dropdown border */
    selectBorder?: string;
    /** Focus ring color */
    focusRing?: string;
    /** Container padding (px) */
    padding?: number | string;
    /** Gap between cells (px) */
    gap?: number | string;
    /** Cell min height (px) */
    cellSize?: number | string;
    /** Container border radius (px) */
    borderRadius?: number | string;
    /** Cell border radius (px) */
    cellRadius?: number | string;
    /** Nav button size (px) */
    navButtonSize?: number | string;
    /** Font size for cells */
    cellFontSize?: number | string;
    /** Font size for weekday headers */
    weekdayFontSize?: number | string;
    /** Font family */
    fontFamily?: string;
    /** Max width (px or string) */
    maxWidth?: number | string;
    /** Box shadow (overrides elevation when set) */
    boxShadow?: string;
}
type CalendarCaptionLayout = "label" | "dropdown" | "menus";
interface CalendarProps {
    /**
     * Controlled visible month (first day of month). Pair with `onMonthChange`.
     * When omitted, month follows selection or internal state.
     */
    month?: Date;
    /**
     * Hide caption row navigation and month/year controls (use when embedding in a parent that provides nav).
     */
    hideNavigation?: boolean;
    /**
     * Month/year header: `"label"` (title only), `"dropdown"` (native selects), `"menus"` (button + anchored lists; default — no bordered native selects).
     * @default "menus"
     */
    captionLayout?: CalendarCaptionLayout;
    /** Selected date (controlled) */
    value?: Date | null;
    /** Callback when date is selected */
    onChange?: (date: Date | null) => void;
    /** Default selected date (uncontrolled) */
    defaultValue?: Date | null;
    /** Minimum selectable date */
    minDate?: Date | string;
    /** Maximum selectable date */
    maxDate?: Date | string;
    /** Disable the calendar */
    disabled?: boolean;
    /** Read-only mode (no selection) */
    readOnly?: boolean;
    /** Show week numbers in the first column */
    showWeekNumbers?: boolean;
    /** Full width calendar */
    fullWidth?: boolean;
    /** Additional CSS class */
    className?: string;
    /** Custom render for each date cell */
    dateCellRender?: (date: Date) => React.ReactNode;
    /** Callback when visible month changes */
    onMonthChange?: (date: Date) => void;
    /** Callback when visible year changes */
    onYearChange?: (date: Date) => void;
    /** First day of week: 0 = Sunday, 1 = Monday */
    firstDayOfWeek?: 0 | 1;
    /** Enable date range selection */
    mode?: "single" | "range";
    /** Selected range (for range mode) */
    rangeValue?: [Date | null, Date | null];
    /** Callback when range changes (for range mode) */
    onRangeChange?: (range: [Date | null, Date | null]) => void;
    /** Disable specific dates */
    disabledDate?: (date: Date) => boolean;
    /** Month transition animation: none | slide | fade | scale */
    animation?: CalendarAnimation;
    /** Enable cell hover animations */
    cellHoverAnimation?: boolean;
    /** Visual variant: outlined | elevated | filled (Card-like) */
    variant?: CalendarVariant;
    /** Elevation: none | sm | md | lg (Card-like) */
    elevation?: CalendarElevation;
    /** Show border */
    bordered?: boolean;
    /** Lift on hover (Card-like) */
    hoverable?: boolean;
    /** Border radius (px or string). Overrides theme.borderRadius when set. */
    radius?: number | string;
    /** Size: sm | md | lg */
    size?: CalendarSize;
    /** Theme overrides for colors, spacing, radii, etc. */
    theme?: Partial<CalendarTheme>;
    /** Additional inline styles for root element */
    style?: React.CSSProperties;
    /** Per-part style overrides */
    styles?: {
        root?: React.CSSProperties;
        header?: React.CSSProperties;
        navButton?: React.CSSProperties;
        select?: React.CSSProperties;
        weekday?: React.CSSProperties;
        cell?: React.CSSProperties;
    };
}

declare const Calendar: React__default.FC<CalendarProps>;

type OtpBoxVariant = "outlined" | "filled" | "underlined" | "boxes";
type OtpBoxSize = "sm" | "md" | "lg";
interface OtpBoxProps {
    length?: number;
    mask?: boolean;
    value?: string;
    type?: "numeric" | "alphanumeric" | "alphabet";
    variant?: OtpBoxVariant;
    size?: OtpBoxSize;
    onChange?: (value: string) => void;
    className?: string;
    containerClass?: string;
    disabled?: boolean;
    label?: string;
    error?: string;
    showValidation?: boolean;
}
declare const OtpBox: React__default.FC<OtpBoxProps>;

interface DividerProps {
    children?: React.ReactNode;
    className?: string;
    /** "horizontal" | "vertical" or "row" | "column" (row = horizontal, column = vertical) */
    orientation?: "horizontal" | "vertical" | "row" | "column";
    length?: string;
    thickness?: string | number;
    /** Line colour. Default: `--color-border-subtle` (Ion Mist-60 on light; same token as modal/card/tab separators). */
    color?: string;
    variant?: "solid" | "dashed" | "dotted";
    align?: "start" | "center" | "end";
    /** When children present: "above" = line above text, "center" = lines both sides, "below" = line below text */
    textPosition?: "above" | "center" | "below";
    margin?: string | number;
    inset?: string | number;
    style?: React.CSSProperties;
}

declare const Divider: React__default.FC<DividerProps>;

type FeedbackVisualTone = "neutral" | "info" | "success" | "warning" | "danger";
/** Shared size scale across all feedback shells. */
type FeedbackSize = "sm" | "md" | "lg";
interface EmptyStateProps {
    /** Primary heading ("No results", "Nothing here yet") */
    title: ReactNode;
    /** Supporting copy beneath the heading */
    description?: ReactNode;
    /**
     * Decorative glyph, `<Icon />`, or small illustration.
     * Supply `aria-hidden="true"` on decorative nodes or use `iconLabel` for labelled icons.
     */
    icon?: ReactNode;
    /** Accessible label for the icon when it is not purely decorative */
    iconLabel?: string;
    /** Large illustration or image rendered above the heading */
    image?: ReactNode;
    /** Primary CTA */
    action?: ReactNode;
    /**
     * Secondary CTAs or links rendered below the primary action.
     * Accepts any ReactNode — buttons, hyperlinks, etc.
     */
    extra?: ReactNode;
    className?: string;
    /** @default "status" */
    role?: "status" | "region";
    /** @default "polite" */
    "aria-live"?: "off" | "polite";
    /** Visually subdued treatment for dense layouts */
    compact?: boolean;
    /** @default "md" */
    size?: FeedbackSize;
    /** Text/content alignment — default centered, `"start"` for list panels & drawers */
    align?: "center" | "start";
    tone?: Extract<FeedbackVisualTone, "neutral" | "info" | "success" | "warning">;
    "data-testid"?: string;
}
interface ErrorStateProps {
    /** Default: "Something went wrong" */
    title?: ReactNode;
    /** Default: apology + guidance */
    description?: ReactNode;
    /** Large illustration / animated SVG rendered above the heading */
    image?: ReactNode;
    /** Optional icon override — component supplies a default danger icon when `tone="danger"` */
    icon?: ReactNode;
    /** Hide the default status icon even when the component would show one */
    hideIcon?: boolean;
    /** Optional visible diagnostics for support desks */
    details?: ReactNode;
    /** Label for the primary retry button. Default: "Try again" */
    retryLabel?: string;
    /** When provided, renders a primary retry button */
    onRetry?: () => void;
    /**
     * Additional actions or links rendered below the retry button.
     * Useful for "Go home", "Contact support", etc.
     */
    extra?: ReactNode;
    className?: string;
    tone?: FeedbackVisualTone;
    compact?: boolean;
    /** @default "md" */
    size?: FeedbackSize;
    align?: "center" | "start";
    /**
     * Live politeness — defaults to `"assertive"` when `role="alert"`, `"polite"` when `role="status"`.
     * Override to `"polite"` for non-blocking inline errors.
     */
    "aria-live"?: "off" | "polite" | "assertive";
    /** @default "alert" when `details` or `onRetry` is present, otherwise "status" */
    role?: "alert" | "status";
    "data-testid"?: string;
}
interface OfflineBannerProps {
    /**
     * Primary headline of the banner.
     * Default: "No internet connection."
     */
    headline?: ReactNode;
    /** Secondary guidance line below the headline */
    message?: ReactNode;
    /** Icon/glyph rendered before the text block. Supply `aria-hidden` on decorative nodes. */
    leadingIcon?: ReactNode;
    /**
     * Optional large illustration rendered above the headline (Zone 4 usage).
     * Use `<OfflineAnimation />` for the built-in animated SVG.
     */
    image?: ReactNode;
    /** Label for the retry button. Default: "Retry" */
    actionLabel?: string;
    onRetry?: () => void;
    /** When provided, renders a dismiss (close) button and calls this on click */
    onDismiss?: () => void;
    /** Accessible label for the dismiss button. Default: "Dismiss" */
    dismissLabel?: string;
    className?: string;
    sticky?: boolean;
    tone?: Extract<FeedbackVisualTone, "neutral" | "warning">;
    compact?: boolean;
    /** @default "status" */
    role?: "status";
}
type FeedbackStateVariant = "empty" | "error" | "offline" | "success" | "info";
type FeedbackStateProps = ({
    variant: "empty";
} & EmptyStateProps) | ({
    variant: "error";
} & ErrorStateProps) | ({
    variant: "offline";
} & OfflineBannerProps) | ({
    variant: "success";
} & EmptyStateProps) | ({
    variant: "info";
} & EmptyStateProps);

/**
 * Variant-driven molecule — mirrors the `Card` / `Button` pattern in this kit.
 *
 * | variant   | delegates to  | default tone        |
 * |-----------|---------------|---------------------|
 * | "empty"   | `EmptyState`  | neutral             |
 * | "success" | `EmptyState`  | success (auto-icon) |
 * | "info"    | `EmptyState`  | info    (auto-icon) |
 * | "error"   | `ErrorState`  | danger  (auto-icon) |
 * | "offline" | `OfflineBanner` | warning            |
 *
 * Prefer dedicated imports (`EmptyState`, `ErrorState`, …) for explicit JSX; prefer
 * `FeedbackState variant="…"` for phase-machine switches from `useAsyncContentPhase`.
 */
declare function FeedbackState(props: FeedbackStateProps): react_jsx_runtime.JSX.Element;

declare function ErrorState({ title, description, image, icon, hideIcon, details, retryLabel, onRetry, extra, className, tone, compact, size, align, "aria-live": ariaLive, role, "data-testid": testId, }: ErrorStateProps): react_jsx_runtime.JSX.Element;

declare function OfflineBanner({ headline, message, leadingIcon, image, actionLabel, onRetry, onDismiss, dismissLabel, className, sticky, tone, compact, role, }: OfflineBannerProps): react_jsx_runtime.JSX.Element;

declare function EmptyState({ title, description, icon, iconLabel, image, action, extra, className, role, compact, size, align, tone, "aria-live": ariaLive, "data-testid": testId, }: EmptyStateProps): react_jsx_runtime.JSX.Element;

interface IllustrationProps {
    /** Width & height in px. Default: 120 */
    size?: number;
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
}
/**
 * Animated empty inbox / tray — floats gently and shows dotted empty lines.
 * Used as the default illustration for `EmptyState`.
 */
declare function NoDataAnimation({ size, className, "aria-hidden": ariaHidden }: IllustrationProps): react_jsx_runtime.JSX.Element;
/** Animated magnifier with a ✕ — for "no results found" empty states. */
declare function NoSearchResultsAnimation({ size, className, "aria-hidden": ariaHidden }: IllustrationProps): react_jsx_runtime.JSX.Element;
/** Animated error shield — pulses to draw attention. */
declare function ErrorAnimation({ size, className, "aria-hidden": ariaHidden }: IllustrationProps): react_jsx_runtime.JSX.Element;
/**
 * Animated no-wifi / disconnected illustration.
 * Wifi arcs fade out one-by-one to suggest lost connection.
 */
declare function OfflineAnimation({ size, className, "aria-hidden": ariaHidden }: IllustrationProps): react_jsx_runtime.JSX.Element;
/** Animated checkmark in a circle — for success / confirmed states. */
declare function SuccessAnimation({ size, className, "aria-hidden": ariaHidden }: IllustrationProps): react_jsx_runtime.JSX.Element;
/** Animated info circle — subtle pulse for informational notices. */
declare function InfoAnimation({ size, className, "aria-hidden": ariaHidden }: IllustrationProps): react_jsx_runtime.JSX.Element;
declare const FEEDBACK_ANIMATIONS: {
    readonly empty: typeof NoDataAnimation;
    readonly "no-search": typeof NoSearchResultsAnimation;
    readonly error: typeof ErrorAnimation;
    readonly offline: typeof OfflineAnimation;
    readonly success: typeof SuccessAnimation;
    readonly info: typeof InfoAnimation;
};
type FeedbackAnimationName = keyof typeof FEEDBACK_ANIMATIONS;

interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
    icon?: React__default.ReactNode | string;
    iconPosition?: "left" | "right";
}
/** Native `<optgroup>` section — use with `Select` for grouped plain-text options. */
interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
}
type SelectSize = "sm" | "md" | "lg";
interface SelectProps extends Omit<React__default.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
    label?: string;
    /**
     * Flat option list. Ignored when `groups` is provided.
     * @default []
     */
    options?: SelectOption[];
    /**
     * Grouped options as native `<optgroup>` sections. When set, `options` is ignored.
     */
    groups?: SelectOptionGroup[];
    placeholder?: string;
    /**
     * @deprecated Native `<select>` cannot filter options in the DOM. Use **`Combobox`** with `searchable` for search.
     */
    liveSearch?: boolean;
    customClass?: string;
    /**
     * Error message. Sets `aria-invalid`, forces the error status (wins over `status`) and is linked
     * to the control with `aria-describedby`. Replaces `helperText` while set.
     */
    error?: string;
    helperText?: string;
    showIcons?: boolean;
    onValueChange?: (value: string, option?: SelectOption) => void;
    fullWidth?: boolean;
    /**
     * Control-height tier — matches `Input` sm/md/lg (`--button-height-sm` / `--button-height-lg` / `3rem`).
     * Rendered as `data-size` on the `<select>`.
     * @default "md"
     */
    size?: SelectSize;
    rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill";
    status?: "error" | "warning" | "success";
    allowPlaceholderSelection?: boolean;
    /**
     * When true, an overlay chevron rotates while the native picker is open (tracked from pointer /
     * opener keys, reset on change, blur and other keys). Focus stays on the control after a pick.
     * @default true
     */
    animatedChevron?: boolean;
    /**
     * Native `required`. When Select renders its own `label`, a visible `*` marker is added
     * (the native attribute already announces "required").
     */
    required?: boolean;
}

declare const Select: React__default.ForwardRefExoticComponent<SelectProps & React__default.RefAttributes<HTMLSelectElement>>;

interface ComboboxOption {
    value: string;
    label: string;
    disabled?: boolean;
    /** Shown in the list and in the trigger when this option is selected (single). */
    icon?: ReactNode;
}
interface ComboboxGroup {
    label: string;
    options: ComboboxOption[];
}
interface ComboboxProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    /** Field label above the control. */
    label?: string;
    /** Flat list. Ignored when `groups` is provided. */
    options?: ComboboxOption[];
    /** Grouped sections (search filters within each group). */
    groups?: ComboboxGroup[];
    searchable?: boolean;
    searchPlaceholder?: string;
    /** When true, value is `string[]` and options toggle on click. */
    multiple?: boolean;
    placeholder?: string;
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[], optionsOrOption?: ComboboxOption | ComboboxOption[]) => void;
    disabled?: boolean;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
    id?: string;
    /** Minimum width of the dropdown panel (matches trigger by default via popover). */
    listMinWidth?: number;
}

declare const Combobox: React__default.NamedExoticComponent<ComboboxProps>;

type ModalAnimation = "none" | "fade" | "slide" | "scale";
type ModalSize = "sm" | "md" | "lg" | "xl" | "xxl";
/**
 * - `"inside"` (default): the dialog is capped to the viewport and only the body scrolls; header and footer stay fixed.
 * - `"outside"`: the dialog grows with its content and the whole dialog scrolls inside the viewport.
 */
type ModalScrollBehavior = "inside" | "outside";
/**
 * Cancelable event passed to `onOpenAutoFocus` / `onCloseAutoFocus`.
 * Call `event.preventDefault()` to stop the Modal's built-in focus move.
 */
type ModalAutoFocusEvent = Event;
/**
 * Focus behaviour: on open, focus moves to `initialFocusRef`, else the first focusable element,
 * else the dialog. Tab is trapped inside. **On close, focus returns to the element that was focused
 * when the modal opened** (added in Sprint 1; earlier versions left focus on `<body>`). Opt out per
 * instance with `onCloseAutoFocus={(e) => e.preventDefault()}`.
 *
 * Stacking: Modal and Drawer share an overlay stack (`overlayStack.ts`). Only the top-most layer
 * handles Escape and backdrop clicks, so one Escape closes one layer.
 */
interface ModalProps {
    /** Whether the modal is open */
    isOpen: boolean;
    /** Called when modal should close (backdrop click, escape, close button) */
    onClose: () => void;
    /** Modal title — the dialog's accessible name (`aria-labelledby`). Rendered as text. */
    title: string;
    /**
     * Supporting text rendered under the title and wired to the dialog's `aria-describedby`.
     * Not rendered when `hideHeader` is set.
     */
    description?: React.ReactNode;
    /** Modal body content */
    children: React.ReactNode;
    /** Called when confirm button is clicked */
    onConfirm?: () => void;
    /** Confirm button text */
    confirmText?: string;
    /** Disable confirm button */
    confirmDisabled?: boolean;
    /**
     * Show the confirm Button's loading state (spinner, `aria-busy`) and ignore further confirm clicks
     * until it is cleared — set it while `onConfirm`'s async work runs. @default false
     */
    confirmLoading?: boolean;
    /** Cancel button text */
    cancelText?: string;
    /** Show cancel button */
    showCancel?: boolean;
    /** Hide footer */
    hideFooter?: boolean;
    /** Custom footer content (fixed below the scrolling body); replaces the Cancel/Confirm pair */
    footer?: React.ReactNode;
    /** Modal size */
    size?: ModalSize;
    /** DOM id for accessibility */
    id?: string;
    /** Show close (X) button in header */
    showCloseButton?: boolean;
    /** Stacked modals: separate backdrop for nested modals */
    isStackedBackground?: boolean;
    /** z-index for modal layer */
    zIndex?: number;
    /** Icon for title: URL, import, or inline React element */
    titleIcon?: React.ReactNode | string | {
        src: string;
    } | {
        default: string;
    };
    /** Title icon size */
    titleIconSize?: number;
    /** Animation: none, fade, slide, scale */
    animation?: ModalAnimation;
    /** Duration in ms for enter/exit */
    animationDuration?: number;
    /** Wait for exit animation before unmounting */
    closeAfterTransition?: boolean;
    /** Whether clicking backdrop closes modal */
    closeOnBackdropClick?: boolean;
    /** Whether pressing Escape closes modal */
    closeOnEscape?: boolean;
    /** Custom class for modal content */
    className?: string;
    /** Hide header (title + close button) - for custom layouts like AlertDialog */
    hideHeader?: boolean;
    /** Element to focus when the modal opens. Defaults to the first focusable element, then the dialog. */
    initialFocusRef?: React.RefObject<HTMLElement | null>;
    /** Where overflow scrolls — see `ModalScrollBehavior`. @default "inside" */
    scrollBehavior?: ModalScrollBehavior;
    /** Fill the whole viewport (no margin, no radius) at ≤ 480px. @default false */
    fullscreenOnMobile?: boolean;
    /**
     * Called when the modal is about to move focus inside on open. `event.preventDefault()` skips the move
     * (you then own focus placement).
     */
    onOpenAutoFocus?: (event: ModalAutoFocusEvent) => void;
    /**
     * Called when the modal closes, before focus returns to the element that was focused when it opened.
     * Returning focus is the default since Sprint 1 (previously focus was dropped to `<body>`);
     * call `event.preventDefault()` to opt out (e.g. to focus something else, or keep the old behaviour).
     */
    onCloseAutoFocus?: (event: ModalAutoFocusEvent) => void;
    /** Confirm button variant: primary, link, ghost, outlinePrimary, danger, etc. */
    confirmButtonVariant?: "primary" | "link" | "ghost" | "outlinePrimary" | "outlineSecondary" | "danger";
    /**
     * Confirm button text color.
     * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `confirmButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
     */
    confirmButtonColor?: string;
    /**
     * Confirm button background (use "transparent" for no background).
     * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `confirmButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
     */
    confirmButtonBackground?: string;
    /**
     * Confirm button border color.
     * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `confirmButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
     */
    confirmButtonBorder?: string;
    /** Cancel button variant */
    cancelButtonVariant?: "primary" | "link" | "ghost" | "outlinePrimary" | "outlineSecondary";
    /**
     * Cancel button text color.
     * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `cancelButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
     */
    cancelButtonColor?: string;
    /**
     * Cancel button background.
     * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `cancelButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
     */
    cancelButtonBackground?: string;
    /**
     * Cancel button border color.
     * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `cancelButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
     */
    cancelButtonBorder?: string;
}

declare function Modal({ isOpen, onClose, title, description, children, onConfirm, confirmText, confirmDisabled, confirmLoading, cancelText, showCancel, hideFooter, footer, size, id, showCloseButton, isStackedBackground, zIndex, titleIcon, titleIconSize, animation, animationDuration, closeAfterTransition, closeOnBackdropClick, closeOnEscape, className, hideHeader, initialFocusRef, scrollBehavior, fullscreenOnMobile, onOpenAutoFocus, onCloseAutoFocus, confirmButtonVariant, confirmButtonColor, confirmButtonBackground, confirmButtonBorder, cancelButtonVariant, cancelButtonColor, cancelButtonBackground, cancelButtonBorder, }: ModalProps): React__default.ReactPortal | null;

type AlertDialogVariant = "info" | "success" | "warning" | "error";
interface AlertDialogProps {
    /** Whether the dialog is open */
    isOpen: boolean;
    /** Called when dialog closes */
    onClose: () => void;
    /** Dialog title */
    title: string;
    /** Dialog description/body */
    description?: React.ReactNode;
    /** Variant: info, success, warning, error (affects icon and colors) */
    variant?: AlertDialogVariant;
    /** Show animated icon */
    iconAnimated?: boolean;
    /** Custom icon (overrides variant icon) */
    icon?: React.ReactNode;
    /** Confirm button text */
    confirmText?: string;
    /** Cancel button text */
    cancelText?: string;
    /** Called when confirm is clicked */
    onConfirm?: () => void;
    /** Called when cancel is clicked */
    onCancel?: () => void;
    /** Show cancel button */
    showCancel?: boolean;
    /** Destructive confirm — §27 uses outlined primary (no red fill); override with `confirmButtonVariant` */
    destructive?: boolean;
    /** Disable confirm button */
    confirmDisabled?: boolean;
    /** Size: sm, md, lg */
    size?: "sm" | "md" | "lg";
    /** Close on backdrop tap/click; defaults to `false` when `destructive` */
    closeOnBackdropClick?: boolean;
    /** Close on Escape */
    closeOnEscape?: boolean;
    /** z-index */
    zIndex?: number;
    /** OK/Confirm button variant: primary, link, ghost, outlinePrimary, danger, etc. */
    confirmButtonVariant?: "primary" | "link" | "ghost" | "outlinePrimary" | "outlineSecondary" | "danger";
    /** OK button text color */
    confirmButtonColor?: string;
    /** OK button background (use "transparent" for no background) */
    confirmButtonBackground?: string;
    /** OK button border color */
    confirmButtonBorder?: string;
    /** Cancel button variant */
    cancelButtonVariant?: "primary" | "link" | "ghost" | "outlinePrimary" | "outlineSecondary";
    /** Cancel button text color */
    cancelButtonColor?: string;
    /** Cancel button background */
    cancelButtonBackground?: string;
    /** Cancel button border color */
    cancelButtonBorder?: string;
}

declare function AlertDialog({ isOpen, onClose, title, description, variant, iconAnimated, icon: customIcon, confirmText, cancelText, onConfirm, onCancel, showCancel, destructive, confirmDisabled, size, closeOnBackdropClick, closeOnEscape, zIndex, confirmButtonVariant, confirmButtonColor, confirmButtonBackground, confirmButtonBorder, cancelButtonVariant, cancelButtonColor, cancelButtonBackground, cancelButtonBorder, }: AlertDialogProps): react_jsx_runtime.JSX.Element;

interface HyperlinkProps {
    children: React.ReactNode;
    href?: string;
    disabled?: boolean;
    className?: string;
    openInNewTab?: boolean;
}

declare const Hyperlink: React__default.FC<HyperlinkProps>;

/**
 * Visual weight of the box.
 * - `neutral` — muted fill, primary icon (default; list rows, secondary tiles)
 * - `strong` — follows the primary filled CTA (Noir on classic, theme colour on green/custom)
 * - `outline` — surface fill with a structural border
 * - semantic tones tint the box with the matching accent family
 */
type IconBoxTone = "neutral" | "strong" | "outline" | "primary" | "success" | "warning" | "danger" | "info";
/** `sm` 28px · `md` 36px · `lg` 44px · `xl` 56px */
type IconBoxSize = "sm" | "md" | "lg" | "xl";
type IconBoxShape = "rounded" | "circle" | "square";
interface IconBoxProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** Icon element (inline SVG, `<Icon />`, emoji, or initials). */
    children: ReactNode;
    tone?: IconBoxTone;
    size?: IconBoxSize;
    shape?: IconBoxShape;
    /**
     * Accessible name. When set the box is announced as an image (`role="img"`);
     * when omitted it is decorative (`aria-hidden`) — pair with visible text.
     */
    label?: string;
}

/**
 * IconBox — fixed-size container that gives a leading icon a consistent footprint
 * (list rows, option tiles, stat cards, empty states). Decorative unless `label` is set.
 */
declare const IconBox: React__default.NamedExoticComponent<IconBoxProps>;

/** Row density — `sm` 8px · `md` 16px (default) · `lg` 24px vertical rhythm */
type ListSize = "sm" | "md" | "lg";
interface ListProps extends HTMLAttributes<HTMLUListElement> {
    children: ReactNode;
    /** Hairline (`--color-border-subtle`) between rows. @default true */
    divided?: boolean;
    /** Outer structural border + radius (stand-alone list). @default false */
    bordered?: boolean;
    /** Row density. @default "md" */
    size?: ListSize;
    /** Ordered list semantics (`<ol>`) for sequential steps. @default false */
    ordered?: boolean;
}
interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
    /** Leading visual — usually `<IconBox>`, `<Avtar>`, or a step number. */
    leading?: ReactNode;
    /** Primary label. */
    title: ReactNode;
    /** When set, the title renders as a link (`<a href>`). Unsafe schemes (`javascript:`, `data:`) render plain text. */
    href?: string;
    /** Anchor target for `href` — `_blank` automatically adds `rel="noopener noreferrer"`. */
    target?: string;
    /** Inline element(s) after the title — status `<Badge>`, version, tag. */
    badge?: ReactNode;
    /** Secondary line under the title. */
    description?: ReactNode;
    /** Muted right-side metadata shown before `action` (size, date, owner). */
    meta?: ReactNode;
    /** Trailing control(s) — usually an outlined `<Button size="sm">`. */
    action?: ReactNode;
    /** Highlight as the current item (`aria-current="true"`). */
    selected?: boolean;
    /** Dim the row; links lose their href. */
    disabled?: boolean;
}

/**
 * List — vertical collection of settings-style rows. Pair with `ListItem`.
 * Use `bordered` for a stand-alone list; leave it off inside a `Card`.
 */
declare const List: React__default.ForwardRefExoticComponent<ListProps & React__default.RefAttributes<HTMLUListElement>>;
/**
 * ListItem — leading visual · title (+ badge) · description · meta · trailing action.
 * Title becomes a link when `href` is provided; the trailing action stays an independent control.
 */
declare const ListItem: React__default.ForwardRefExoticComponent<ListItemProps & React__default.RefAttributes<HTMLLIElement>>;

type StatTrend = "up" | "down" | "neutral";
interface StatDelta {
    /** Change value as displayed, e.g. `"+12%"` or `"3 new"`. */
    value: ReactNode;
    /** Direction — drives the arrow and tone. Meaning is also carried by text, never colour alone. */
    trend?: StatTrend;
    /** Context after the value, e.g. `"vs last release"`. */
    label?: ReactNode;
    /** Set when "down" is good (e.g. bundle size, error rate). Swaps success/danger tones. */
    invert?: boolean;
}
interface StatCardProps extends Omit<CardProps, "title" | "subtitle" | "extra" | "children"> {
    /** Metric name, e.g. "Components". */
    label: ReactNode;
    /** Headline value, e.g. `36` or `"270+"`. */
    value: ReactNode;
    /** Optional unit rendered beside the value in a lighter weight (e.g. `"KB"`). */
    unit?: ReactNode;
    /** Leading icon element; wrapped in an `IconBox`. */
    icon?: ReactNode;
    /** `IconBox` tone for the icon. @default "neutral" */
    iconTone?: "neutral" | "strong" | "primary" | "success" | "warning" | "danger" | "info";
    /** Trend / change line. */
    delta?: StatDelta;
    /** Supporting sentence under the value. */
    description?: ReactNode;
    /** Optional trailing area (link, sparkline, action). */
    footer?: ReactNode;
}

/**
 * StatCard — KPI tile for dashboards and overview pages. Wraps `Card`, so `variant`,
 * `elevation`, `size`, and `hoverable` behave exactly as on Card.
 */
declare const StatCard: React__default.ForwardRefExoticComponent<StatCardProps & React__default.RefAttributes<HTMLDivElement>>;

/** `dark` — Noir panel (default; reads as "code" on any theme) · `light` — muted surface */
type CodeBlockTone = "dark" | "light";
interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title" | "onCopy"> {
    /** Source text. Rendered as text only (never parsed as HTML). */
    code: string;
    /** Language chip in the header, e.g. `"bash"`, `"tsx"`, `"css"`. */
    language?: string;
    /** Optional header title (file name, step name). */
    title?: ReactNode;
    tone?: CodeBlockTone;
    /** Copy-to-clipboard button. @default true */
    showCopy?: boolean;
    /** Accessible label for the copy button. @default "Copy code" */
    copyLabel?: string;
    /** Status announced after copying. @default "Copied" */
    copiedLabel?: string;
    /** Fired after a successful copy. */
    onCopy?: (code: string) => void;
    /** Number each line. @default false */
    showLineNumbers?: boolean;
    /** Soft-wrap long lines instead of scrolling horizontally. @default false */
    wrap?: boolean;
    /** Max height before vertical scroll, e.g. `320` or `"20rem"`. */
    maxHeight?: number | string;
}

/**
 * CodeBlock — read-only source panel with copy-to-clipboard. Content is rendered as text
 * (no syntax-highlighting HTML), so it is safe for user-provided snippets.
 */
declare const CodeBlock: React__default.ForwardRefExoticComponent<CodeBlockProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Semantic tone shared by `Alert` and `Toast`.
 * - `info` — neutral information (default)
 * - `success` — completed / saved
 * - `warning` — needs attention, not blocking
 * - `danger` — error / failure
 * - `neutral` — muted note with no status meaning
 */
type AlertVariant = "info" | "success" | "warning" | "danger" | "neutral";
/**
 * Surface treatment.
 * - `soft` — tinted fill (`--color-{tone}-fill`) (default)
 * - `outline` — page surface with a tone-coloured border
 * - `solid-accent` — page surface with a 4px tone-coloured left bar
 */
type AlertAppearance = "soft" | "outline" | "solid-accent";
/**
 * Live-region politeness.
 * - `off` — static alert, nothing announced on mount (default; no live role rendered)
 * - `polite` — `role="status"`
 * - `assertive` — `role="alert"` for `danger` / `warning`; `role="status"` + `aria-live="assertive"` otherwise
 */
type AlertLive = "off" | "polite" | "assertive";
interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Semantic tone. @default "info" */
    variant?: AlertVariant;
    /** Surface treatment. @default "soft" */
    appearance?: AlertAppearance;
    /** Bold first line. */
    title?: ReactNode;
    /** Description / body copy. */
    children?: ReactNode;
    /** Replace the default per-variant icon (rendered decoratively). */
    icon?: ReactNode;
    /** Hide the leading icon. The visually-hidden `srPrefix` still carries meaning. */
    hideIcon?: boolean;
    /** Trailing action slot, e.g. a `Button`. */
    action?: ReactNode;
    /** When set, renders a dismiss (close) button that calls this handler. */
    onDismiss?: () => void;
    /** Accessible name of the dismiss button. @default "Dismiss" */
    dismissLabel?: string;
    /** Tighter padding and a single-row layout. */
    compact?: boolean;
    /** Live-region behaviour. @default "off" */
    live?: AlertLive;
    /** Prepend a visually-hidden variant word ("Error:", "Warning:", ...) so meaning never relies on colour. @default true */
    srPrefix?: boolean;
}

/**
 * Alert — inline, persistent message for pages and forms. Static by default (`live="off"`):
 * set `live` only when the alert appears in response to a user action and must be announced.
 */
declare const Alert: React__default.ForwardRefExoticComponent<AlertProps & React__default.RefAttributes<HTMLDivElement>>;

/** Same tone set as `Alert` — icon, colours and SR prefix come from `Alert.config.ts`. */
type ToastVariant = AlertVariant;
type ToastPosition = "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
interface ToastAction {
    /** Visible button label. */
    label: string;
    /** Called on click; the toast is dismissed afterwards. */
    onClick: () => void;
}
interface ToastOptions {
    /** Stable id. Calling `toast()` again with an existing id updates that toast and restarts its timer. */
    id?: string;
    title: ReactNode;
    description?: ReactNode;
    /** @default "info" */
    variant?: ToastVariant;
    /**
     * Single inline action. Keep it non-essential. A toast with an action is **sticky by default**
     * (WCAG 2.2.1 Timing Adjustable) — pass `duration` explicitly to opt back into auto-dismiss.
     */
    action?: ToastAction;
    /**
     * Auto-dismiss delay in ms. `Infinity` = sticky.
     * @default `Infinity` when `action` is set, otherwise provider `duration` (5000)
     */
    duration?: number;
    /** Show a close button and allow Escape to dismiss. @default true */
    dismissible?: boolean;
}
interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title: ReactNode;
    description?: ReactNode;
    /** @default "info" */
    variant?: ToastVariant;
    action?: ToastAction;
    /** Renders the close button (requires `onDismiss`). @default true */
    dismissible?: boolean;
    /** Close-button handler. */
    onDismiss?: () => void;
    /** Accessible name of the close button. @default "Dismiss" */
    dismissLabel?: string;
    /** Visually-hidden variant word before the title ("Error:", ...). @default true */
    srPrefix?: boolean;
}
interface ToastProviderProps {
    children?: ReactNode;
    /** Screen corner / edge for the stack. @default "bottom-right" */
    position?: ToastPosition;
    /** Maximum toasts visible at once; extra toasts queue (FIFO) until a slot frees. @default 3 */
    max?: number;
    /** Default auto-dismiss delay in ms. @default 5000 */
    duration?: number;
    /** Accessible name of the notifications region. @default "Notifications" */
    label?: string;
    /** Accessible name of each toast's close button. @default "Dismiss" */
    dismissLabel?: string;
}
interface ToastContextValue {
    /** Show (or update, when `id` matches) a toast. Returns its id. */
    toast: (options: ToastOptions) => string;
    /** Dismiss one toast (plays the exit animation). */
    dismiss: (id: string) => void;
    /** Dismiss every visible and queued toast. */
    dismissAll: () => void;
}

/**
 * Toast — a single transient notification card. Usually rendered by `ToastProvider` via
 * `useToast().toast(...)`; exported for static previews and custom stacks.
 * Announcement: non-danger toasts carry no live role — they are announced by the always-mounted
 * polite region in `ToastProvider` (a live region must exist before content is inserted into it).
 * `danger` toasts are `role="alert"`: alert insertion is announced reliably on its own and, being its
 * own (assertive) live root, it is not re-announced by the polite ancestor.
 * A standalone `Toast` outside the provider is therefore silent unless it is `danger`.
 */
declare const Toast: React__default.ForwardRefExoticComponent<ToastProps & React__default.RefAttributes<HTMLDivElement>>;
/** Access `toast`, `dismiss`, `dismissAll`. Must be called under `ToastProvider`. */
declare function useToast(): ToastContextValue;
/**
 * ToastProvider — owns the toast queue and renders the notifications region through a portal
 * to `document.body` (after mount, so it is SSR-safe). Toasts never take focus; press F8 to
 * move focus to the region, Tab between toasts, Escape to dismiss the focused one.
 */
declare function ToastProvider({ children, position, max, duration, label, dismissLabel, }: ToastProviderProps): react_jsx_runtime.JSX.Element;
declare namespace ToastProvider {
    var displayName: string;
}

/** Edge the panel slides in from. */
type DrawerSide = "right" | "left" | "top" | "bottom";
/** Panel extent — width for `left`/`right`, height for `top`/`bottom`. Values live in `Drawer.config.ts`. */
type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";
interface DrawerProps {
    /** Controlled open state. */
    open: boolean;
    /** Called with `false` when the drawer asks to close (close button, backdrop click, Escape). */
    onOpenChange: (open: boolean) => void;
    /** Edge the panel is attached to. @default "right" */
    side?: DrawerSide;
    /** Panel width (left/right) or height (top/bottom). At ≤ 480px left/right drawers are always full width. @default "md" */
    size?: DrawerSize;
    /** Heading rendered as the dialog's accessible name (`aria-labelledby`). Rendered as text, never parsed as HTML. */
    title: ReactNode;
    /** Supporting text under the title, wired to `aria-describedby`. */
    description?: ReactNode;
    /** Scrollable body content. The header and footer stay fixed while this scrolls. */
    children?: ReactNode;
    /** Sticky footer area (actions). */
    footer?: ReactNode;
    /** Show the close (X) button in the header. @default true */
    showCloseButton?: boolean;
    /** Accessible name for the close button. @default "Close" */
    closeLabel?: string;
    /** Close when the backdrop is clicked (modal only). @default true */
    closeOnBackdropClick?: boolean;
    /** Close when Escape is pressed. @default true */
    closeOnEscape?: boolean;
    /**
     * Modal drawer: backdrop, body scroll lock, focus trap, `aria-modal`.
     * `false` renders a side panel with none of those that can still be closed with Escape. @default true
     */
    modal?: boolean;
    /** Element focused when the drawer opens. Defaults to the first focusable element, then the panel itself. */
    initialFocusRef?: RefObject<HTMLElement | null>;
    /** Return focus to the element that was focused before opening, once the drawer closes. @default true */
    returnFocus?: boolean;
    /** Extra class on the panel (consumer escape hatch). */
    className?: string;
    /** DOM id for the panel. Title / description ids derive from it. Auto-generated when omitted. */
    id?: string;
}
/** `Sheet` is an alias of `Drawer` with the same props. */
type SheetProps = DrawerProps;

/**
 * Drawer (alias `Sheet`) — a dialog panel attached to a viewport edge. Modal by default
 * (backdrop, scroll lock, focus trap); `modal={false}` gives a non-blocking side panel.
 * Header and sticky footer stay fixed while the body scrolls.
 */
declare const Drawer: React__default.ForwardRefExoticComponent<DrawerProps & React__default.RefAttributes<HTMLDivElement>>;
/** Alias of `Drawer` — same component, for teams that call this pattern a "sheet". */
declare const Sheet: React__default.ForwardRefExoticComponent<DrawerProps & React__default.RefAttributes<HTMLDivElement>>;

/** `xs` 16px · `sm` 20px · `md` 24px · `lg` 32px */
type SpinnerSize = "xs" | "sm" | "md" | "lg";
/**
 * Ring colour.
 * - `current` — inherits `currentColor` (inside text, links, outline buttons)
 * - `primary` — `--color-brand-primary` on `--color-border-subtle` track
 * - `muted` — `--color-text-secondary` on `--color-border-subtle` track
 * - `inverse` — `--color-text-on-primary`, for solid brand / dark surfaces (primary Button)
 */
type SpinnerTone = "current" | "primary" | "muted" | "inverse";
interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** @default "md" */
    size?: SpinnerSize;
    /** @default "current" */
    tone?: SpinnerTone;
    /**
     * Announced text (rendered visually hidden inside a `role="status"` region).
     * Ignored when `decorative`.
     * @default "Loading"
     */
    label?: string;
    /**
     * Hide from assistive tech (`aria-hidden`, no role, no label) — use when the
     * surrounding control already announces the busy state (e.g. a loading `Button`).
     * @default false
     */
    decorative?: boolean;
}

/**
 * Spinner — indeterminate loading indicator.
 * Announces `label` through a `role="status"` region; pass `decorative` when the
 * surrounding control already exposes the busy state (e.g. inside a loading Button).
 */
declare const Spinner: React__default.ForwardRefExoticComponent<SpinnerProps & React__default.RefAttributes<HTMLSpanElement>>;

/**
 * - `text` — one or more line bars (use `lines`; the last line is 60% wide)
 * - `rect` — block placeholder (media, cards, charts)
 * - `circle` — avatar / icon placeholder
 */
type SkeletonShape = "text" | "rect" | "circle";
/** A number is treated as px; a string is used as-is (`"50%"`, `"12rem"`, `"var(--space-8)"`). */
type SkeletonDimension = number | string;
interface SkeletonProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** @default "text" */
    shape?: SkeletonShape;
    /** Number of line bars (only for `shape="text"`). The last one renders at 60% width. @default 1 */
    lines?: number;
    /** Width of the block (or of every full line). Defaults: text/rect `100%`, circle `40px`. */
    width?: SkeletonDimension;
    /** Height of the block (or of each line). Defaults: text `0.875em`, rect `var(--space-8)`, circle = width. */
    height?: SkeletonDimension;
    /** Corner radius override. Defaults: text `--radius-sm`, rect `--radius-md`, circle 50%. */
    radius?: SkeletonDimension;
    /** Shimmer animation (always off under `prefers-reduced-motion`). @default true */
    animated?: boolean;
}
/**
 * `role="status"` wrapper. Does not set `aria-busy` itself — put `aria-busy="true"` on the
 * container whose content is loading.
 */
interface SkeletonGroupProps extends HTMLAttributes<HTMLDivElement> {
    /** Announced once for the whole loading region (visually hidden). @default "Loading content" */
    label?: string;
    children?: ReactNode;
}

/**
 * Skeleton — placeholder shape shown while content loads. Always `aria-hidden`;
 * wrap a set of skeletons in `SkeletonGroup` so assistive tech hears one "Loading content".
 */
declare const Skeleton: React__default.ForwardRefExoticComponent<SkeletonProps & React__default.RefAttributes<HTMLSpanElement>>;
/**
 * SkeletonGroup — a `role="status"` region that announces `label` around one or more
 * `Skeleton` blocks. It deliberately does NOT set `aria-busy` on itself (that would silence
 * the announcement). Consumers set `aria-busy="true"` on the content container being loaded,
 * e.g. `<section aria-busy={loading}>{loading ? <SkeletonGroup /> : content}</section>`.
 */
declare const SkeletonGroup: React__default.ForwardRefExoticComponent<SkeletonGroupProps & React__default.RefAttributes<HTMLDivElement>>;

/** `sm` ≥ 36px targets · `md` ≥ 40px targets (both grow to 44px on coarse pointers). */
type PaginationSize = "sm" | "md";
/** Item range shown on the current page (1-based, inclusive). `from`/`to` are 0 when `total` is 0. */
interface PaginationRange {
    from: number;
    to: number;
    total: number;
}
/** One entry of the computed page strip. */
type PaginationItem = {
    type: "page";
    page: number;
} | {
    type: "ellipsis";
    key: "start-ellipsis" | "end-ellipsis";
    from: number;
    to: number;
};
/** Overridable strings (i18n). */
interface PaginationLabels {
    previous: string;
    next: string;
    first: string;
    last: string;
    /** Accessible name of a page control, e.g. "Page 3". */
    page: (page: number) => string;
    /** Accessible text for an ellipsis covering pages `from`…`to`. */
    ellipsis: (from: number, to: number) => string;
    /** Compact status, e.g. "Page 3 of 12". */
    status: (page: number, pageCount: number) => string;
    /** Default `showTotal` text. */
    total: (range: PaginationRange) => string;
    /** Label of the page-size select. */
    pageSize: string;
}
interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
    /** Current page, 1-based (controlled). */
    page: number;
    /** Total pages. Takes precedence over `totalItems` / `pageSize`. */
    pageCount?: number;
    /** Total item count — with `pageSize` derives `pageCount` and enables `showTotal`. */
    totalItems?: number;
    /** Items per page (also the selected value of the page-size select). */
    pageSize?: number;
    /**
     * Called with the requested page. The second argument is the click event — call
     * `event.preventDefault()` to keep client-side routing when using `getPageHref`.
     */
    onPageChange?: (page: number, event: MouseEvent<HTMLElement>) => void;
    /** Pages shown either side of the current page. @default 1 */
    siblingCount?: number;
    /** Pages always shown at each end. @default 1 */
    boundaryCount?: number;
    /** First / last page buttons. @default false */
    showFirstLast?: boolean;
    /** Previous / next buttons. @default true */
    showPrevNext?: boolean;
    /** Options for the page-size select (rendered only with `onPageSizeChange`). */
    pageSizeOptions?: number[];
    onPageSizeChange?: (pageSize: number) => void;
    /** `true` → "Showing 21–30 of 120"; a function receives the range and returns custom content. Needs `totalItems`. */
    showTotal?: boolean | ((range: PaginationRange) => ReactNode);
    /** @default "md" */
    size?: PaginationSize;
    /** Force the "Page 3 of 12" + prev/next layout (it is also used automatically at ≤ 480px). @default false */
    compact?: boolean;
    /** Disable every control. @default false */
    disabled?: boolean;
    /** Name of the `<nav>` landmark. @default "Pagination" */
    ariaLabel?: string;
    /** Render page controls as links (SEO / route paging). Unsafe schemes fall back to buttons. */
    getPageHref?: (page: number) => string;
    /** Override any user-facing string. */
    labels?: Partial<PaginationLabels>;
}

/** Pages needed for `totalItems` at `pageSize` (0 when there are no items). */
declare function getPageCount(totalItems: number | undefined, pageSize: number | undefined): number;
/** 1-based inclusive item range shown on `page`. */
declare function getItemRange(page: number, pageSize: number, totalItems: number): PaginationRange;
interface PaginationRangeOptions {
    page: number;
    pageCount: number;
    /** @default 1 */
    siblingCount?: number;
    /** @default 1 */
    boundaryCount?: number;
}
/**
 * Compute the page strip: boundary pages at both ends, `siblingCount` pages around the
 * current page, and ellipses for the gaps. The strip has a constant length
 * (`2*boundary + 2*sibling + 3`) once `pageCount` is large enough, so controls do not
 * jump as the user pages. An ellipsis is only used when it hides at least two pages —
 * a single hidden page is shown as a page instead.
 */
declare function getPaginationRange({ page, pageCount, siblingCount, boundaryCount, }: PaginationRangeOptions): PaginationItem[];

/**
 * Pagination — controlled page navigation (`<nav>` landmark + list of page controls).
 * Pass `pageCount`, or `totalItems` + `pageSize`. Switches to a "Page 3 of 12" layout
 * with prev/next only when `compact` is set or the viewport is ≤ 480px.
 */
declare const Pagination: React__default.ForwardRefExoticComponent<PaginationProps & React__default.RefAttributes<HTMLElement>>;

/** Preferred side of the trigger. Flips to the opposite side when it would overflow the viewport. */
type TooltipSide = "top" | "right" | "bottom" | "left";
/** Alignment along the trigger edge. */
type TooltipAlign = "start" | "center" | "end";
/** `dark` = inverted (text-primary fill) · `light` = elevated surface + border. */
type TooltipVariant = "dark" | "light";
interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "content" | "children" | "role"> {
    /**
     * Exactly one focusable element (Button, link, input…). It is cloned to add hover/focus
     * handlers, a ref and `aria-describedby` — existing handlers and `aria-describedby` are preserved.
     */
    children: ReactElement;
    /** Tooltip body. Short supplementary text — never the only accessible name of the trigger. */
    content: ReactNode;
    /** @default "top" */
    side?: TooltipSide;
    /** @default "center" */
    align?: TooltipAlign;
    /** Hover open delay in ms (keyboard focus opens immediately). @default 300 */
    delay?: number;
    /** Close delay in ms after the pointer leaves trigger + content (lets the pointer cross onto the tooltip). @default 100 */
    closeDelay?: number;
    /** Controlled open state. */
    open?: boolean;
    /** Uncontrolled initial open state. @default false */
    defaultOpen?: boolean;
    /** Called whenever the tooltip wants to open/close (hover, focus, blur, Escape). */
    onOpenChange?: (open: boolean) => void;
    /** Never open and drop `aria-describedby`. @default false */
    disabled?: boolean;
    /** Max inline size of the bubble (number = px). Always capped to the viewport width. @default 240 */
    maxWidth?: number | string;
    /** @default "dark" */
    variant?: TooltipVariant;
}

/**
 * Tooltip — supplementary description for any focusable trigger.
 *
 * WCAG 1.4.13: opens on hover **and** keyboard focus; Escape dismisses without moving focus or
 * pointer; the bubble itself is hoverable (pointer can move onto it); it stays open until hover and
 * focus have both left or the user dismisses it. `role="tooltip"` + `aria-describedby` on the trigger.
 * Not for interactive content — use `Popover` for links/buttons inside the overlay.
 */
declare const Tooltip: React__default.ForwardRefExoticComponent<TooltipProps & React__default.RefAttributes<HTMLDivElement>>;

/** Label placement — `vertical` stacks label over control; `horizontal` puts the label in a column (collapses to vertical at ≤ 640px). */
type FormFieldLayout = "vertical" | "horizontal";
/** Character / item counter shown under the control (`value / max`). Over the limit it switches to the danger tone. */
interface FormFieldCounter {
    value: number;
    max: number;
}
interface FormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Visible label text (rendered in a `<label>`). Required — every control needs an accessible name. */
    label: ReactNode;
    /**
     * Id of the control the label points at. When omitted, the child's own `id` is used,
     * otherwise an id is generated with `useId` and injected into the child.
     */
    htmlFor?: string;
    /** Helper text under the control; linked via `aria-describedby`. */
    hint?: ReactNode;
    /** Error message. Sets `aria-invalid` on the child and is linked via `aria-describedby`. Announced (`role="alert"`) only when it changes after mount. */
    error?: ReactNode;
    /** Shows a visible `*` + screen-reader "required" and sets `aria-required` on the child. */
    required?: boolean;
    /** Shows a muted "(optional)" marker next to the label. Pass a string to change the wording. Ignored when `required`. */
    optional?: boolean | string;
    /** `{ value, max }` counter under the control. */
    counter?: FormFieldCounter;
    /** @default "vertical" */
    layout?: FormFieldLayout;
    /** Exactly one form control. It receives `id`, `aria-describedby`, `aria-invalid`, `aria-required` unless it already sets them. */
    children: ReactElement | ReactNode;
}
/** Value exposed by `useFormField()` so custom controls can wire themselves up. */
interface FormFieldContextValue {
    /** Id the `<label htmlFor>` points at — put it on your focusable element. */
    id: string;
    /** Id of the `<label>` element — use with `aria-labelledby` for non-labelable widgets. */
    labelId: string;
    hintId?: string;
    errorId?: string;
    counterId?: string;
    /** Space-separated ids for `aria-describedby` (hint, error, counter — whichever are rendered), or `undefined`. */
    describedBy?: string;
    invalid: boolean;
    required: boolean;
}

/**
 * Read the ids / state of the enclosing `FormField` so a custom control can wire
 * `id`, `aria-labelledby`, `aria-describedby`, `aria-invalid` and `aria-required` itself.
 * Returns `null` outside a `FormField` (controls stay usable stand-alone).
 */
declare function useFormField(): FormFieldContextValue | null;
/**
 * FormField — label · control · hint · error · counter, with the ARIA wiring done for you.
 * Pass exactly one control as `children`; it receives `id`, `aria-describedby`, `aria-invalid`
 * and `aria-required` unless it already sets them. Custom controls can read the ids via `useFormField()`.
 *
 * Supported children: `Input`, `TextArea`, `Select`, `Combobox` (wires itself from `useFormField()`),
 * native `input` / `select` / `textarea`, and custom controls that read `useFormField()`.
 * In development a `console.warn` fires when, after mount, neither a labelable element carries the
 * field id nor a descendant references the label via `aria-labelledby`.
 *
 * Intentional, beyond the Sprint 2 brief: when `counter` is set its id is added to `aria-describedby`
 * (after hint and error) so "12 of 100" is read on focus; going over the limit is announced once
 * through a separate polite live region.
 */
declare const FormField: React__default.ForwardRefExoticComponent<FormFieldProps & React__default.RefAttributes<HTMLDivElement>>;

/** Heading level for the title. `h1` by default — one per page. */
type PageHeaderTitleAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
/** A secondary page action — rendered as an outlined `Button`, or as a menu item when it overflows. */
interface PageHeaderAction {
    /** Visible label (also the menu item text). */
    label: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    /** Renders a link. Unsafe schemes (`javascript:`, `data:` …) are dropped. */
    href?: string;
    /** Leading icon (inline buttons and menu items). Decorative — the label is the accessible name. */
    icon?: IconSource;
    disabled?: boolean;
}
interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Page title. */
    title: ReactNode;
    /** @default "h1" */
    titleAs?: PageHeaderTitleAs;
    /** One-line summary under the title. */
    description?: ReactNode;
    /** Usually `<Breadcrumb>` — rendered above the title. */
    breadcrumb?: ReactNode;
    /** Inline status next to the title — usually a `<Badge>`. */
    status?: ReactNode;
    /** Muted metadata row under the description (owner, updated at, ids). */
    meta?: ReactNode;
    /** The single primary CTA — usually `<Button variant="primary" size="md">`. Exactly one per page header. */
    primaryAction?: ReactNode;
    /** Secondary actions. The first `maxVisibleActions` render as outlined buttons; the rest go into a "More actions" menu. At ≤ 640px all of them move into the menu. */
    secondaryActions?: PageHeaderAction[];
    /** How many secondary actions stay inline on wider screens. @default 2 */
    maxVisibleActions?: number;
    /** Accessible label + text of the overflow trigger. @default "More actions" */
    moreActionsLabel?: string;
    /** Rendered under the header — usually `<Tabs>` / `<TabsList>`. */
    tabs?: ReactNode;
}

/**
 * PageHeader — Zone 3 of the 5-zone layout: breadcrumb · title (+ status) · description · meta ·
 * actions (secondaries + exactly one primary) · tabs.
 * Secondary actions beyond `maxVisibleActions` overflow into a "More actions" menu; at ≤ 640px all do.
 */
declare const PageHeader: React__default.ForwardRefExoticComponent<PageHeaderProps & React__default.RefAttributes<HTMLDivElement>>;

/** `select` → one value (native `Select`) · `multi` → many values (`Combobox multiple`). */
type FilterBarFilterType = "select" | "multi";
interface FilterBarOption {
    label: string;
    value: string;
    disabled?: boolean;
}
interface FilterBarFilter {
    /** Key in `value.filters`. In `DataTable` client mode it is also the row field that is matched. */
    id: string;
    /** Accessible name of the control and the chip prefix ("Status: Active"). */
    label: string;
    type: FilterBarFilterType;
    options: FilterBarOption[];
    /** Placeholder / "nothing selected" text. Defaults: select `"{label}: All"`, multi `"{label}"`. */
    placeholder?: string;
    /** `multi` only — adds a search box to the option list. */
    searchable?: boolean;
}
type FilterBarFilterValue = string | string[];
interface FilterBarValue {
    search?: string;
    /** Empty string / empty array (or a missing key) means "not filtered". */
    filters: Record<string, FilterBarFilterValue>;
}
/** Overridable strings (i18n). */
interface FilterBarLabels {
    /** Name of the whole group. */
    group: string;
    /** Accessible name of the search field. */
    search: string;
    clearAll: string;
    /** Overflow trigger when some filters stay inline. */
    moreFilters: string;
    /** Overflow trigger when every filter is collapsed (narrow screens). */
    filters: string;
    /** Visually hidden suffix on the overflow trigger, e.g. ", 2 active". */
    activeInOverflow: (count: number) => string;
    /** Name of the active-chip list. */
    activeFilters: string;
    /** Accessible name of a chip's dismiss button. */
    removeFilter: (filterLabel: string, optionLabel: string) => string;
    /** Live-region text for `resultCount`. */
    resultCount: (count: number) => string;
    /** Close button inside the overflow panel. */
    done: string;
}
interface FilterBarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    /** Controlled value. */
    value: FilterBarValue;
    /** Called with the next full value (search is debounced, filters are immediate). */
    onChange: (next: FilterBarValue) => void;
    filters?: FilterBarFilter[];
    /** Render the search field. @default true */
    searchable?: boolean;
    /** @default "Search…" */
    searchPlaceholder?: string;
    /** Debounce for `value.search` updates; clearing and Enter commit immediately. @default 250 */
    searchDebounceMs?: number;
    /** Announced in a polite live region ("24 results"). */
    resultCount?: number;
    /** Right-aligned slot (view toggle, export, column menu…). */
    extra?: ReactNode;
    /** Filters shown inline before the rest move into the "More filters" popover. @default 3 */
    maxInlineFilters?: number;
    /** Collapse overflow (and every filter at ≤ 768px) into a popover. `false` keeps all inline and wraps. @default true */
    moreFilters?: boolean;
    /** Show visible labels above inline controls (otherwise the label is the accessible name + placeholder). @default false */
    showLabels?: boolean;
    /** Override any user-facing string. */
    labels?: Partial<FilterBarLabels>;
}

/**
 * FilterBar — search + filter controls + active-filter chips for list and table pages.
 * Fully controlled (`value` / `onChange`); search is debounced locally.
 */
declare const FilterBar: React__default.ForwardRefExoticComponent<FilterBarProps & React__default.RefAttributes<HTMLDivElement>>;

type DataTableRow = Record<string, unknown>;
interface DataTableColumn<T = DataTableRow> extends TableColumn<T> {
    /** Can be turned off in the column-visibility menu. @default true */
    hideable?: boolean;
    /** Included in CSV export (when visible). @default true */
    exportable?: boolean;
    /** CSV header text. Defaults to `header` when it is a string/number, otherwise the column `key`. */
    csvHeader?: string;
    /** CSV cell value. Defaults to `row[key]` (dates → ISO, arrays → "a; b", objects → JSON). */
    csvValue?: (row: T) => unknown;
}
/** Server-side paging: `data` is already the current page. */
interface DataTableServerPagination {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    pageSizeOptions?: number[];
}
type DataTableSortDirection = "asc" | "desc" | null;
interface DataTableSort {
    key: string;
    direction: DataTableSortDirection;
}
interface DataTableBulkActionHelpers {
    clearSelection: () => void;
}
interface DataTableBulkAction<T = DataTableRow> {
    label: string;
    onClick: (selectedRows: T[], helpers: DataTableBulkActionHelpers) => void;
    /** Button variant. Keep at most one `primary` per bar. @default "outlineSecondary" */
    variant?: ButtonProps["variant"];
    disabled?: boolean;
}
interface DataTableError {
    /** @default "Couldn't load data" */
    title?: ReactNode;
    description?: ReactNode;
    /** Renders a retry button in the error state. */
    onRetry?: () => void;
}
interface DataTableExportOptions {
    /** Download name; `.csv` is appended when missing and unsafe characters are replaced. */
    filename?: string;
    /** Button label. @default "Export CSV" */
    label?: string;
    /** Receive the CSV instead of triggering a browser download. */
    onExport?: (csv: string, filename: string) => void;
}
/** `FilterBar` props; `value` / `onChange` are optional — `DataTable` keeps the state when omitted. */
type DataTableFilterBarProps = Omit<FilterBarProps, "value" | "onChange"> & {
    value?: FilterBarValue;
    onChange?: (next: FilterBarValue) => void;
    /** Initial value when uncontrolled. */
    defaultValue?: FilterBarValue;
};
/** Overridable strings (i18n). */
interface DataTableLabels {
    /** Visible bulk-bar count, e.g. "3 selected". */
    selectedCount: (count: number) => string;
    /** Live-region text when the selection changes, e.g. "3 rows selected". */
    selectionStatus: (count: number) => string;
    clearSelection: string;
    clearSelectionAria: string;
    bulkActions: string;
    /** Shown in the reserved bulk-bar slot while nothing is selected. */
    bulkHint: string;
    exportCsv: string;
    columns: string;
    columnsLegend: string;
    loading: string;
    emptyTitle: string;
    emptyDescription: string;
    noResultsTitle: string;
    noResultsDescription: string;
    clearFilters: string;
    errorTitle: string;
    errorDescription: string;
    pagination: string;
}
/** `Table` props that `DataTable` owns (it wires them itself). Everything else passes through. */
type DataTableManagedTableProps = "columns" | "data" | "rowKey" | "selectionMode" | "selectedRowKeys" | "selectedRow" | "onSelectionChange" | "onRowSelect" | "searchable" | "searchPlaceholder" | "searchProps" | "searchColumns" | "showSearch" | "toolbar" | "toolbarLeft" | "toolbarRight" | "pagination" | "loading" | "loadingVariant" | "emptyText" | "emptyComponent" | "className";
interface DataTableProps<T extends DataTableRow = DataTableRow> extends Omit<TableProps<T>, DataTableManagedTableProps> {
    /** Names the table (and its scroll region). Required for accessibility. */
    caption: ReactNode;
    /** Keep the caption for assistive tech only. @default false */
    hideCaption?: boolean;
    columns: DataTableColumn<T>[];
    data: T[];
    /** Stable row id — a field name or a function. */
    rowKey: keyof T | ((row: T) => string);
    /** Skeleton rows; pagination is disabled while loading. */
    loading?: boolean;
    /** Replaces the table with an `ErrorState`. */
    error?: DataTableError | null;
    /** Shown when there is no data and no active search/filter. Defaults to an `EmptyState`. */
    emptyState?: ReactNode;
    /** Shown when search/filters match nothing. Defaults to an `EmptyState` with "Clear filters". */
    noResultsState?: ReactNode;
    /** Renders a `FilterBar` above the table. Client mode filters `data` with it. */
    filterBar?: DataTableFilterBarProps;
    /** Client mode: custom row predicate (default: search over visible columns, filters match `row[filter.id]`). */
    filterFn?: (row: T, value: FilterBarValue) => boolean;
    /**
     * Server-side paging object, `false` for no paging, or omit for client paging.
     * In server mode `data` is used as-is (no client filtering/sorting across pages; listen to `onSortChange`).
     */
    pagination?: DataTableServerPagination | false;
    /** Client paging. @default 10 */
    defaultPageSize?: number;
    /** Client paging. @default [10, 25, 50] */
    pageSizeOptions?: number[];
    /** Name of the pagination landmark. Defaults to "{caption} pagination" when caption is a string. */
    paginationAriaLabel?: string;
    /** Checkbox column + bulk action bar. */
    selectable?: boolean;
    /** Controlled selection (all pages). */
    selectedRowKeys?: string[];
    onSelectionChange?: (keys: string[], rows: T[]) => void;
    /** Keep the selection when search / filters change. Default clears it (and announces "Selection cleared"), because filtered-out rows would stay selected out of view. @default false */
    preserveSelectionOnFilter?: boolean;
    bulkActions?: DataTableBulkAction<T>[];
    /**
     * `true` → column menu with internal state (seeded from `column.hidden`).
     * A record (`{ [columnKey]: visible }`) → controlled; persist it from `onColumnVisibilityChange`.
     */
    columnVisibility?: boolean | Record<string, boolean>;
    onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void;
    /** Client-side CSV of the visible, exportable columns (client: every filtered row; server: `data`). */
    exportCsv?: boolean | DataTableExportOptions;
    /** Extra toolbar content (right side). */
    toolbarRight?: ReactNode;
    /** Sort changes from header clicks. Client mode sorts across all pages; server mode should re-fetch. */
    onSortChange?: (sort: DataTableSort) => void;
    /** Class on the DataTable root. */
    className?: string;
    /** Class on the inner `<table>` (Table's `className`). */
    tableClassName?: string;
    labels?: Partial<DataTableLabels>;
}

/**
 * One RFC 4180 cell, formula-guarded for both comma and semicolon locales:
 * 1. leading trigger → prefix the cell with `'` (comma locales, and the first field in `;` locales);
 * 2. every `;`/`；` followed by a trigger gets a `'` after it (later fields in `;` locales, where the
 *    quoting below is not at field start and therefore does not protect the cell);
 * 3. quote when it contains `"`, `,`, `;`, CR or LF (inner quotes doubled).
 * Real numbers are never changed — `-5` cannot carry a formula.
 */
declare function escapeCsvCell(value: unknown): string;
/** Header row + one line per row, CRLF line endings. Headers are guarded too. */
declare function toCsv<T extends DataTableRow>(columns: DataTableColumn<T>[], rows: T[]): string;

/**
 * DataTable — page-level data grid: `Table` + `FilterBar` + `Pagination` + empty / error states,
 * selection with a bulk action bar, column visibility and CSV export.
 */
declare const DataTable: (<T extends DataTableRow = DataTableRow>(props: DataTableProps<T> & {
    ref?: React__default.Ref<HTMLDivElement>;
}) => React__default.ReactElement | null) & {
    displayName?: string;
};

/** Control height tier. `sm` = 36px segments, `md` = 40px segments (44px on coarse pointers). */
type SegmentedControlSize = "sm" | "md";
interface SegmentedControlOption {
    /** Unique value reported by `onValueChange`. */
    value: string;
    /**
     * Visible label — the radio's accessible name when it is a string / number.
     * For icon-only options pass the icon here (or `null` with `icon`) and set `ariaLabel`.
     */
    label: ReactNode;
    /**
     * Accessible name of the radio. **Required** when `label` is not a string or number
     * (icon-only option); a development warning fires when it is missing. Overrides the label when set.
     */
    ariaLabel?: string;
    /** Optional leading icon — rendered decoratively (`aria-hidden`). */
    icon?: ReactNode;
    /** Skipped by arrow keys and not selectable. */
    disabled?: boolean;
}
interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "role" | "aria-label"> {
    /** The choices, in visual order. */
    options: SegmentedControlOption[];
    /** Selected value (controlled). */
    value?: string;
    /** Initial value when uncontrolled. When omitted nothing is selected until the user picks. */
    defaultValue?: string;
    /** Fires with the newly selected value (never for a re-click on the current value). */
    onValueChange?: (value: string) => void;
    /** @default "md" */
    size?: SegmentedControlSize;
    /** Stretch to the container width; every segment gets an equal share. */
    fullWidth?: boolean;
    /** Accessible name of the radiogroup — required (there is no visible group label). */
    ariaLabel: string;
    /** Disable the whole control. */
    disabled?: boolean;
}

declare const SEGMENTED_CONTROL_DEFAULTS: {
    size: SegmentedControlSize;
    fullWidth: boolean;
};
declare const SEGMENTED_CONTROL_SIZES: readonly SegmentedControlSize[];

/**
 * SegmentedControl — single-choice toggle group (APG radio group).
 * `role="radiogroup"` + `role="radio"` / `aria-checked`, roving tabindex; arrow keys move focus
 * **and** select, Home / End jump to the first / last enabled option. A sliding indicator marks the
 * selection (no animation under `prefers-reduced-motion`; `Highlight` fill + outline in forced colours).
 */
declare const SegmentedControl: React__default.ForwardRefExoticComponent<SegmentedControlProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Result of a step validator.
 * - `true` — valid, the wizard may continue
 * - `false` — invalid, shows the default `validationMessage`
 * - `string` — invalid, the string is shown as the error message (empty string → default message)
 */
type WizardValidationResult = boolean | string;
interface WizardStep {
    /** Stable id (React key + DOM id suffix). */
    id: string;
    /** Step title — Stepper label and the step's focusable heading. */
    title: ReactNode;
    /** Supporting text under the title (Stepper + panel). */
    description?: ReactNode;
    /** Marks the step "Optional" in the Stepper and review list. */
    optional?: boolean;
    /** The step body (usually `FormField`s). */
    content: ReactNode;
    /** Runs before leaving the step forward (Next, forward Stepper jump, Finish). May be async. */
    validate?: () => WizardValidationResult | Promise<WizardValidationResult>;
    /** Optional summary shown under the title on the review step. */
    summary?: ReactNode;
}
type WizardHeadingLevel = 2 | 3 | 4;
interface WizardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
    steps: WizardStep[];
    /** Active step index (controlled). The review step, when shown, is index `steps.length`. */
    activeStep?: number;
    /** Initial step when uncontrolled. @default 0 */
    defaultActiveStep?: number;
    /** Fires with the index the wizard wants to move to. */
    onStepChange?: (index: number) => void;
    /**
     * Fires after every step validated on Finish. If it returns a Promise and `loading` is not
     * passed, the wizard manages the busy state itself until the Promise settles (a rejection
     * clears it too — handle errors inside `onComplete`, e.g. by showing an `Alert`).
     */
    onComplete?: () => void | Promise<unknown>;
    /** When true, steps ahead of the furthest reached step are not navigable from the Stepper. @default true */
    linear?: boolean;
    /** Append an automatic review step listing every step title with an "Edit" link. */
    showReview?: boolean;
    /** @default "Review" */
    reviewTitle?: ReactNode;
    /** Intro copy on the review step. */
    reviewDescription?: ReactNode;
    /** @default "Back" */
    backLabel?: ReactNode;
    /** @default "Next" */
    nextLabel?: ReactNode;
    /** @default "Finish" */
    finishLabel?: ReactNode;
    /** Visible text of the review "Edit" links (the step title is appended for screen readers). @default "Edit" */
    editLabel?: ReactNode;
    /** @default "Optional" */
    optionalLabel?: ReactNode;
    /**
     * Finish is busy (spinner + disabled). Focus moves to the step heading so it is not lost.
     * Controlled — when set (even `false`) it takes precedence over the internal Promise-driven state.
     */
    loading?: boolean;
    /** Announced politely while `loading`. @default "Submitting…" */
    loadingLabel?: string;
    /** Title of the validation-error Alert. @default "Check this step" */
    validationTitle?: ReactNode;
    /** Message when a validator returns `false` (or throws). @default "Some information on this step is missing or invalid." */
    validationMessage?: ReactNode;
    /** Visible "Step x of y" eyebrow above the heading (also read with it). */
    formatStepCounter?: (current: number, total: number) => ReactNode;
    /** Heading level of the step title. @default 2 */
    headingLevel?: WizardHeadingLevel;
    /** Accessible name of the Stepper nav landmark. @default "Progress" */
    stepperAriaLabel?: string;
}

declare const WIZARD_DEFAULTS: {
    readonly defaultActiveStep: 0;
    readonly linear: true;
    readonly showReview: false;
    readonly reviewTitle: "Review";
    readonly backLabel: "Back";
    readonly nextLabel: "Next";
    readonly finishLabel: "Finish";
    readonly editLabel: "Edit";
    readonly optionalLabel: "Optional";
    readonly loadingLabel: "Submitting…";
    readonly validationTitle: "Check this step";
    readonly validationMessage: "Some information on this step is missing or invalid.";
    readonly headingLevel: WizardHeadingLevel;
    readonly stepperAriaLabel: "Progress";
};

/**
 * Wizard — multi-step flow: `Stepper` (progress) + step panel + footer actions.
 * Moving to a step focuses its heading; a validation failure shows an assertive danger `Alert`
 * and focuses the heading. Exactly one primary action (Next or Finish) per footer.
 */
declare const Wizard: React__default.ForwardRefExoticComponent<WizardProps & React__default.RefAttributes<HTMLDivElement>>;

/** `sm` for inline hints inside rows / menus · `md` for prose and documentation. */
type KbdSize = "sm" | "md";
/**
 * Platform used to resolve `mod` (⌘ on macOS, Ctrl elsewhere) and the modifier glyphs.
 * `auto` detects on the client after hydration; the server and first client render use `other`.
 */
type KbdPlatform = "auto" | "mac" | "other";
/** One resolved key: what is drawn and what a screen reader hears. */
interface KbdKeyLabel {
    /** Visible text (may be a glyph such as ⌘ or ↵). */
    display: string;
    /** Spoken name (e.g. "Command", "Enter"). */
    spoken: string;
    /** Token for `aria-keyshortcuts` (e.g. "Meta", "Control", "K"). */
    aria: string;
}
interface KbdProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    /**
     * Key combo, one entry per key: `["mod", "k"]`, `["shift", "enter"]`.
     * Recognised names: mod, cmd/meta, ctrl, alt/option, shift, enter, esc, tab, space,
     * backspace, delete, up/down/left/right (or arrowup…), home, end, pageup, pagedown.
     * Anything else is shown as typed (single letters upper-cased).
     */
    keys?: string[];
    /** Free content when `keys` is not used (e.g. `<Kbd>Esc</Kbd>`). Ignored when `keys` is set. */
    children?: ReactNode;
    /** Drawn between keys of a combo. Default `"+"`. Hidden from assistive tech. */
    separator?: ReactNode;
    size?: KbdSize;
    /** Default `auto` (SSR-safe detection). Force `mac` / `other` for docs or tests. */
    platform?: KbdPlatform;
}

/**
 * True on Apple platforms (macOS, iPadOS, iOS). Returns false when `navigator` is unavailable
 * (SSR, workers) so server output is deterministic.
 */
declare function detectIsMac(): boolean;
/** Plain-text label for a combo: `⌘K` on macOS, `Ctrl+K` elsewhere. */
declare function formatShortcut(keys: string[], isMac: boolean): string;
/** Value for `aria-keyshortcuts` (e.g. `Meta+K` / `Control+K`). */
declare function toAriaKeyShortcuts(keys: string[], isMac: boolean): string;

/**
 * Kbd — keyboard key / shortcut chip rendered as semantic `<kbd>`. With `keys`, each key is a
 * nested `<kbd>` (HTML spec for key combinations) joined by a decorative separator; glyphs such
 * as ⌘ carry a visually-hidden spoken name ("Command"). `mod` resolves to ⌘ on macOS and Ctrl
 * elsewhere — SSR-safe: server + hydration render use Ctrl, the client then corrects it.
 */
declare const Kbd: React__default.ForwardRefExoticComponent<KbdProps & React__default.RefAttributes<HTMLElement>>;

interface CommandItem {
    /** Unique within its group. */
    id: string;
    label: string;
    /** Secondary line under the label (also searched, lowest weight). */
    description?: string;
    /** Decorative leading icon (hidden from assistive tech). */
    icon?: ReactNode;
    /** Shortcut hint drawn with `Kbd`, e.g. `["mod", "shift", "p"]`. Display only — the app owns the binding. */
    shortcut?: string[];
    /** Extra search terms (synonyms, ids). Matched after the label. */
    keywords?: string[];
    /** Runs on Enter / click. The palette closes first when `closeOnSelect` (default). */
    onSelect: (item: CommandItem) => void;
    /** Shown (with `aria-disabled`) but skipped by arrow keys and not selectable. */
    disabled?: boolean;
}
interface CommandGroup {
    /** Unique across groups. */
    id: string;
    label: string;
    items: CommandItem[];
}
interface CommandSearchContext {
    /** Aborted when a newer query supersedes this one or the palette closes. */
    signal: AbortSignal;
}
interface CommandPaletteProps {
    /** Controlled open state. Omit for uncontrolled (hotkey-driven) use. */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Local commands, ranked client-side against the query. */
    groups: CommandGroup[];
    /** Shown first while the query is empty (hidden once the user types). */
    recent?: CommandGroup;
    /** Default `"Type a command or search…"`. */
    placeholder?: string;
    /** Shown when the query matches nothing (and nothing is loading). Default `"No results found."`. */
    emptyState?: ReactNode;
    /**
     * Remote search, debounced by `searchDebounceMs`. Return groups (sync or via a Promise) to append
     * them after the local results — they are shown as returned, not re-ranked. Stale responses are
     * ignored and `signal` is aborted. Return nothing if you feed results through `groups` instead.
     */
    onSearch?: (query: string, context: CommandSearchContext) => void | CommandGroup[] | Promise<void | CommandGroup[]>;
    /** Default 200 ms. */
    searchDebounceMs?: number;
    /** External loading flag (e.g. when results arrive through `groups`). OR-ed with the internal one. */
    loading?: boolean;
    /** Rank/filter `groups` locally. Default true. */
    shouldFilter?: boolean;
    /** Default `["mod", "k"]` (⌘K on macOS, Ctrl+K elsewhere). */
    hotkey?: string[];
    /** Default true. Registers a document listener that toggles the palette. */
    enableHotkey?: boolean;
    /** Let the hotkey fire while focus is in an input / textarea / select / contenteditable. Default false. */
    allowInInputs?: boolean;
    /** Default true. */
    closeOnSelect?: boolean;
    /** Return focus to the element focused before opening. Default true. */
    returnFocus?: boolean;
    /** Dialog accessible name. Default `"Command palette"`. */
    ariaLabel?: string;
    /** Search input accessible name. Default `"Search commands"`. */
    inputLabel?: string;
    /** Listbox accessible name. Default `"Commands"`. */
    listLabel?: string;
    /** Close button accessible name. Default `"Close"`. */
    closeLabel?: string;
    /** Live-region text while loading. Default `"Loading results…"`. */
    loadingLabel?: string;
    /** Live-region text for the result count. Default `n === 0 ? "No results" : "n result(s)"`. */
    resultsLabel?: (count: number) => string;
    /** Delay before the result count is announced (avoids one announcement per keystroke). Default 500 ms. */
    announceDelayMs?: number;
    /** Show the ↑↓ / ↵ / Esc hint footer. Default true. */
    showFooter?: boolean;
    className?: string;
    id?: string;
}

/**
 * CommandPalette — modal command menu (⌘K / Ctrl+K). Combobox pattern: DOM focus stays in the
 * search input (`role="combobox"`), the highlighted option is exposed via `aria-activedescendant`,
 * and the result count is announced through a debounced polite live region. Portal, shared overlay
 * stack (one Escape closes one layer), ownership-based focus guard, Tab trap, shared body scroll
 * lock, focus restored to the opener on close. Full-screen at ≤ 480px.
 */
declare const CommandPalette: React__default.ForwardRefExoticComponent<CommandPaletteProps & React__default.RefAttributes<HTMLDivElement>>;

type NumberInputSize = "sm" | "md" | "lg";
interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "size" | "type" | "min" | "max" | "step" | "prefix" | "inputMode"> {
    /** Controlled value; `null` = empty. `undefined` makes the field uncontrolled. */
    value?: number | null;
    /** Initial value when uncontrolled. */
    defaultValue?: number | null;
    /** Fires with the parsed number (or `null` when emptied) as the user types, steps, or on blur after clamping. Invalid text never fires. */
    onChange?: (value: number | null) => void;
    min?: number;
    max?: number;
    /** Arrow / stepper increment. Shift+Arrow and PageUp / PageDown use 10×. @default 1 */
    step?: number;
    /** Fixed fraction digits for display and rounding (e.g. 2 for money). */
    precision?: number;
    /** BCP 47 locale for parsing and formatting (grouping / decimal separators, digits). */
    locale?: string;
    /**
     * `Intl.NumberFormat` options for the blurred display — currency, percent (`value` is a fraction:
     * 0.25 shows "25%"; use `step={0.01}`), unit, or `notation: "compact"` ("1.2K"; parsed back too).
     */
    formatOptions?: Intl.NumberFormatOptions;
    /** Leading slot (e.g. "$" or an icon). Strings are included in `aria-valuetext`; the slot itself is hidden from AT. */
    prefix?: ReactNode;
    /** Trailing slot (e.g. "kg"). Strings are included in `aria-valuetext`; the slot itself is hidden from AT. */
    suffix?: ReactNode;
    /** − / + buttons (press and hold repeats). @default true */
    showSteppers?: boolean;
    /** When false, minus signs are ignored and the lower bound is at least 0. @default true */
    allowNegative?: boolean;
    /** Clamp to `[min, max]` and round to `precision` on blur / Enter. @default true */
    clampOnBlur?: boolean;
    /** Visible label (outside a `FormField`; inside one, the field label is used). */
    label?: ReactNode;
    /**
     * Error state. A string / node is rendered under the field (outside a `FormField`) and linked via
     * `aria-describedby`; `true` only sets `aria-invalid`. Inside a `FormField`, use the field's `error`.
     */
    error?: ReactNode;
    /** @default "md" */
    size?: NumberInputSize;
    disabled?: boolean;
    readOnly?: boolean;
    /** Accessible name of the + button. @default "Increase" */
    incrementLabel?: string;
    /** Accessible name of the − button. @default "Decrease" */
    decrementLabel?: string;
    /** Class on the root wrapper. */
    className?: string;
}

/**
 * Parses user text in `locale`: grouping and decimal separators (with group positions validated),
 * native digits, one minus sign in a leading or trailing position (any minus variant) or accounting
 * parentheses, currency / percent / unit affixes and compact suffixes ("1.2K").
 *
 * Rejected with `NaN`: misplaced groups ("1,2345", "1,234,5", "12,3,456"), separators in the fraction,
 * interior or repeated signs ("1-2", "--5", "-(5)"), exponents / hex / words.
 *
 * Decimal heuristic: a **single** group-separator char followed by **1–2 digits** and no decimal
 * separator is read as a decimal typed with the other convention ("1,5" / "10,25" in en-US → 1.5 /
 * 10.25; "1.5" in de-DE → 1.5). Three digits after it is grouping ("1,234" → 1234); four or more is
 * rejected.
 */
declare function parseLocaleNumber(text: string, locale?: string, options?: Intl.NumberFormatOptions): number | null;
/** Display format (blurred field). `precision` fixes the fraction digits. Never throws. */
declare function formatLocaleNumber(value: number, locale?: string, options?: Intl.NumberFormatOptions, precision?: number): string;

/**
 * NumberInput — locale-aware numeric field with `role="spinbutton"` semantics. A text input
 * (`inputMode="decimal"`) shows the formatted value when blurred and a plain editable number when
 * focused. ArrowUp/Down ±step (Shift ×10), PageUp/Down ×10, Home/End → min/max, Enter commits.
 * Optional − / + steppers (press and hold repeats). Works inside `FormField`.
 */
declare const NumberInput: React__default.ForwardRefExoticComponent<NumberInputProps & React__default.RefAttributes<HTMLInputElement>>;

/** A (possibly partial) date range. Dates are calendar days (local midnight). */
interface DateRange {
    from?: Date;
    to?: Date;
}
/** A complete range returned by a preset. */
interface CompleteDateRange {
    from: Date;
    to: Date;
}
/** Quick-pick shortcut shown beside the calendar. `range` is evaluated lazily (on render / click). */
interface DateRangePreset {
    label: string;
    range: () => CompleteDateRange;
}
/** First day of the week in the calendar grid: 0 = Sunday, 1 = Monday. */
type DateRangeWeekStart = 0 | 1;
interface DateRangePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "placeholder"> {
    /** Controlled range. Pass `{}` for "no range"; `undefined` makes the picker uncontrolled. */
    value?: DateRange;
    /** Initial range when uncontrolled. */
    defaultValue?: DateRange;
    /**
     * Fires with a **complete** range (`{ from, to }`) when the second day is picked or a preset is chosen,
     * and with `{}` when the range is cleared. The in-progress first click is kept internally.
     */
    onChange?: (range: DateRange) => void;
    /** Quick picks (e.g. `DEFAULT_RANGE_PRESETS`). Presets are clamped to `min` / `max`; fully out-of-range ones are disabled. */
    presets?: DateRangePreset[];
    /** Earliest selectable day. */
    min?: Date;
    /** Latest selectable day. */
    max?: Date;
    /** Months shown side by side. Always 1 at ≤ 640px. @default 2 */
    numberOfMonths?: number;
    /** Visible label (outside a `FormField`; inside one, the field label is used). */
    label?: ReactNode;
    /** Accessible name when there is no visible label (and no enclosing `FormField`). */
    ariaLabel?: string;
    /** Trigger text when no range is selected. @default "Select date range" */
    placeholder?: string;
    /** Formats one day for the trigger and announcements. Default: `Intl.DateTimeFormat(locale, { dateStyle: "medium" })`. */
    format?: (date: Date) => string;
    /** BCP 47 locale for the default formatter, calendar captions, weekday names and day labels. */
    locale?: string;
    /** @default 0 (Sunday) */
    weekStartsOn?: DateRangeWeekStart;
    /** Shows a "Clear dates" button when a range is selected. @default false */
    clearable?: boolean;
    /** @default false */
    disabled?: boolean;
    /**
     * Error state. A string / node is rendered under the trigger (outside a `FormField`) and linked via
     * `aria-describedby`; `true` only sets `aria-invalid`. Inside a `FormField`, use the field's `error`.
     */
    error?: ReactNode;
    /** Accessible name of the popover dialog. @default "Choose date range" */
    dialogLabel?: string;
    /** Accessible name of the clear button. @default "Clear dates" */
    clearLabel?: string;
    /**
     * Marks the picker required in its own label (visible `*` + screen-reader "required"). Inside a
     * `FormField`, use the field's `required` instead. `aria-required` is never set: it is not allowed
     * on the trigger `<button>`.
     */
    required?: boolean;
    /** Id of the trigger button. Inside a `FormField` the field id is used unless this is set. */
    id?: string;
}

/**
 * Standard dashboard presets, relative to "now" at the moment `range()` is called.
 * "This month" / "This quarter" / "Year to date" run from the start of the period **to today**
 * (period-to-date), so they never select future days.
 */
declare function createDefaultRangePresets(now?: () => Date): DateRangePreset[];
/** Today, Last 7 days, Last 30 days, This month, This quarter, Year to date. */
declare const DEFAULT_RANGE_PRESETS: DateRangePreset[];

/**
 * DateRangePicker — button trigger showing the formatted range, opening a popover dialog with
 * optional presets and a react-day-picker range grid (APG date-grid keyboard: arrows, Home/End,
 * PageUp/PageDown, Shift+PageUp/PageDown). First click sets the start, second click completes the
 * range, fires `onChange` and closes; focus always returns to the trigger. Works inside `FormField`.
 *
 * Layout: on desktop the popover renders in-tree under the trigger — avoid `overflow: hidden` ancestors,
 * which clip it (portalling on desktop is a follow-up). At ≤ 640px it is portalled to `<body>` and docked
 * to the viewport bottom, so transformed ancestors (Drawer / Sheet panels) do not reposition it.
 */
declare const DateRangePicker: React__default.ForwardRefExoticComponent<DateRangePickerProps & React__default.RefAttributes<HTMLDivElement>>;

export { Accordion, AccordionContent, AccordionContentProps, AccordionContextValue, AccordionDensity, AccordionItem, AccordionItemProps, AccordionMotion, AccordionProps, AccordionTrigger, AccordionTriggerProps, AccordionType, AccordionVariant, Alert, AlertAppearance, AlertDialog, AlertDialogProps, AlertDialogVariant, AlertLive, AlertProps, AlertVariant, AvatarProps, Avatar as Avtar, Badge, BadgeProps, BadgeShape, BadgeSize, BadgeTone, BadgeVariant, Breadcrumb, BreadcrumbItem, BreadcrumbItemProps, BreadcrumbProps, BreadcrumbSeparator, Button, ButtonElement, ButtonGroup, ButtonGroupContextValue, ButtonGroupOrientation, ButtonGroupProps, ButtonGroupSeparator, ButtonGroupSeparatorProps, ButtonGroupText, ButtonGroupTextProps, ButtonProps, Calendar, CalendarAnimation, CalendarCaptionLayout, CalendarElevation, CalendarProps, CalendarSize, CalendarTheme, CalendarVariant, Card, CardAction, CardActionProps, CardContent, CardContentProps, CardDescription, CardDescriptionProps, CardFooter, CardFooterProps, CardHeader, CardHeaderProps, CardProps, CardSize, CardTitle, CardTitleProps, CardVariantName, Checkbox as CheckBox, CheckboxProps, CheckboxSize, Chip, ChipProps, CodeBlock, CodeBlockProps, CodeBlockTone, Combobox, ComboboxGroup, ComboboxOption, ComboboxProps, CommandGroup, CommandItem, CommandPalette, CommandPaletteProps, CommandSearchContext, CompleteDateRange, DEFAULT_RANGE_PRESETS, DataTable, DataTableBulkAction, DataTableBulkActionHelpers, DataTableColumn, DataTableError, DataTableExportOptions, DataTableFilterBarProps, DataTableLabels, DataTableProps, DataTableRow, DataTableServerPagination, DataTableSort, DataTableSortDirection, DatePicker, DatePickerProps, DateRange, DateRangePicker, DateRangePickerProps, DateRangePreset, DateRangeWeekStart, DetectedKind, Divider, Drawer, DrawerProps, DrawerSide, DrawerSize, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemProps, DropdownMenuTrigger, Dropzone, DropzoneProps, EmptyState, EmptyStateProps, ErrorAnimation, ErrorState, ErrorStateProps, FEEDBACK_ANIMATIONS, FeedbackAnimationName, FeedbackSize, FeedbackState, FeedbackStateProps, FeedbackStateVariant, FeedbackVisualTone, FileUpload, FileUploadProps, FileUploadSecurityOptions, FileUploadSize, FilterBar, FilterBarFilter, FilterBarFilterType, FilterBarFilterValue, FilterBarLabels, FilterBarOption, FilterBarProps, FilterBarValue, Form, FormField, FormFieldContextValue, FormFieldCounter, FormFieldLayout, FormFieldProps, FormProps, GradientText, GradientTextProps, Grid, GridItem, GridItemProps, GridProps, Hyperlink, HyperlinkProps, IconBox, IconBoxProps, IconBoxShape, IconBoxSize, IconBoxTone, IconSource, InfoAnimation, TextInput as Input, TextInputProps as InputProps, Kbd, KbdKeyLabel, KbdPlatform, KbdProps, KbdSize, List, ListItem, ListItemProps, ListProps, ListSize, Modal, ModalAnimation, ModalAutoFocusEvent, ModalProps, ModalScrollBehavior, ModalSize, NoDataAnimation, NoSearchResultsAnimation, NumberInput, NumberInputProps, NumberInputSize, OfflineAnimation, OfflineBanner, OfflineBannerProps, OtpBox, OtpBoxProps, OtpBoxSize, OtpBoxVariant, PageHeader, PageHeaderAction, PageHeaderProps, PageHeaderTitleAs, Pagination, PaginationItem, PaginationLabels, PaginationProps, PaginationRange, PaginationSize, Popover, PopoverContent, PopoverContentProps, PopoverPlacement, PopoverProps, PopoverTrigger, PopoverTriggerProps, ProgressBar, ProgressBarProps, RadioButtonProps, RadioGroup, SEGMENTED_CONTROL_DEFAULTS, SEGMENTED_CONTROL_SIZES, SegmentedControl, SegmentedControlOption, SegmentedControlProps, SegmentedControlSize, Select, SelectOptionGroup, SelectProps, SelectSize, Sheet, SheetProps, Skeleton, SkeletonDimension, SkeletonGroup, SkeletonGroupProps, SkeletonProps, SkeletonShape, Spinner, SpinnerProps, SpinnerSize, SpinnerTone, StatCard, StatCardProps, StatDelta, StatTrend, Stepper, StepperAppearance, StepperContextValue, StepperProps, StepperSize, StepperStep, StepperStepProps, StepperTrackMode, SuccessAnimation, Switch, SwitchProps, SwitchSize, TableColumn, TableProps, Tabs, TabsActivationMode, TabsContent, TabsContentAnimation, TabsContentProps, TabsContextValue, TabsList, TabsListLayout, TabsListProps, TabsOrientation, TabsProps, TabsSize, TabsTrigger, TabsTriggerAlign, TabsTriggerLayout, TabsTriggerProps, TabsVariant, Tag, TagProps, TextArea, TextAreaProps, TextView, TextViewProps, Toast, ToastAction, ToastContextValue, ToastOptions, ToastPosition, ToastProps, ToastProvider, ToastProviderProps, ToastVariant, TooltipIcon as ToolTip, Tooltip, TooltipAlign, TooltipIconProps, TooltipProps, TooltipSide, TooltipVariant, WIZARD_DEFAULTS, Wizard, WizardHeadingLevel, WizardProps, WizardStep, WizardValidationResult, createDefaultRangePresets, detectFileKindFromBuffer, detectIsMac, escapeCsvCell, formatLocaleNumber, formatShortcut, getItemRange, getPageCount, getPaginationRange, parseAcceptString, parseLocaleNumber, toAriaKeyShortcuts, toCsv, useFormField, useToast, validateFileSecurity, validateFilename, validateFilesSecurity };
