import * as React$1 from 'react';
import React__default, { HTMLAttributes, ReactNode, LiHTMLAttributes, AnchorHTMLAttributes, ButtonHTMLAttributes, TextareaHTMLAttributes, ChangeEvent } from 'react';
import { I as IconSource, A as AvatarProps } from './shell-e406ed2e.js';
export { c as AppShell, g as AppShellProps, b as AppSidebar, r as AppSidebarClassNames, o as AppSidebarFooterAction, s as AppSidebarFooterLayout, m as AppSidebarHeader, i as AppSidebarNavItem, G as AppSidebarPersistPayload, h as AppSidebarProps, j as AppSidebarSection, l as AppSidebarSectionGrouping, k as AppSidebarTier, q as AppSidebarTokens, p as AppSidebarTrailingPreset, n as AppSidebarUser, d as AppTopbar, w as AppTopbarAction, z as AppTopbarClassNames, B as AppTopbarMenuItem, x as AppTopbarProfile, t as AppTopbarProps, v as AppTopbarSearchConfig, u as AppTopbarTheme, y as AppTopbarTokens, D as DashboardShell, f as DashboardShellProps, a as Icon, e as IconProps, C as mergeSidebarTokensStyle, H as mergeTopbarTokensStyle, E as readAppSidebarPersist, F as writeAppSidebarPersist } from './shell-e406ed2e.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
export { Table, TableBody, TableBodyProps, TableCaption, TableCaptionProps, TableCell, TableCellProps, TableColumn, TableFooter, TableFooterProps, TableHead, TableHeadProps, TableHeader, TableHeaderProps, TableLayout, TableProps, TableRoot, TableRootProps, TableRow, TableRowProps, TableSearchProps, TableTheme, TableVariant } from './table.js';
export { AreaChart, AreaChartProps, BarChart, BarChartProps, ChartDataPoint, ChartDataSeries, ChartLayoutProps, ChartTheme, ChartTooltip, ChartTooltipItem, ChartTooltipProps, LineChart, LineChartProps, PieChart, PieChartDataPoint, PieChartProps } from './charts.js';

interface ClassOverrides {
    variant?: string;
    size?: string;
    border?: string;
    background?: string;
    text?: string;
    radius?: string;
    [key: string]: string | undefined;
}
type ButtonBaseProps = {
    variant?: "default" | "primary" | "secondary" | "outlinePrimary" | "outlineSecondary" | "success" | "danger" | "warning" | "link" | "ghost";
    variantClass?: string;
    /** §20: default `lg` (44px) — primary screen CTAs; `md` = 40px outlined secondaries */
    size?: "xxs" | "xs" | "sm" | "md" | "lg";
    width?: string | number;
    height?: string | number;
    classOverrides?: ClassOverrides;
    borderColor?: string;
    backgroundColor?: string;
    textColor?: string;
    /** Gradient background for the button surface. */
    gradient?: string;
    /** Optional hover gradient override. Falls back to `gradient`. */
    gradientHover?: string;
    /** Optional active gradient override. Falls back to `gradientHover` or `gradient`. */
    gradientActive?: string;
    textSize?: "sm" | "md" | "lg";
    icon?: IconSource;
    iconPosition?: "left" | "right";
    iconWidth?: number;
    iconHeight?: number;
    iconColor?: string;
    iconGap?: number;
    fullWidth?: boolean;
    /** Disabled state (also applies when href is set) */
    disabled?: boolean;
    /** Alias of fullWidth (common API) */
    block?: boolean;
    /** Shows spinner + disables interaction */
    loading?: boolean;
    ariaLabel?: string;
    className?: string;
    enableWhen?: any;
    preserveIconColor?: boolean;
    /**
     * 🔹 Rounded prop for UX4G-style border radius classes
     * e.g. "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle"
     * Defaults to "3" (large radius)
     */
    rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle";
};
type ButtonAsButton = ButtonBaseProps & Omit<React__default.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
    href?: undefined;
};
type ButtonAsLink = ButtonBaseProps & Omit<React__default.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "color" | "type"> & {
    href: string;
};
/** When omitted or "default", uses primary. Custom colors override variant when provided. */
type ButtonProps = ButtonAsButton | ButtonAsLink;

declare const Button: React__default.NamedExoticComponent<ButtonProps>;

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
    pattern?: RegExp | string;
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

interface CheckboxProps {
    label: string;
    name: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checkboxColorClass?: string;
    labelColorClass?: string;
    inputLabelSpacingClass?: string;
    className?: string;
    ariaLabelledBy?: string;
    /**
     * Required for screen readers when `label` is empty (e.g. table row selection).
     * Sets `aria-label` on the input instead of relying on an empty visible label.
     */
    ariaLabel?: string;
    /** NEW — controls design (default or boxed) */
    shape?: "default" | "box";
    /** NEW — rounded size for box mode */
    rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle";
    /** NEW — optional shadow for box mode */
    withShadow?: boolean;
}

declare const Checkbox: React__default.NamedExoticComponent<CheckboxProps>;

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
    /** `md` meets ~44×44px touch target; `sm` is denser. */
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
 */
type TabsContentAnimation = "none" | "fade" | "fade-slide";
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
     * Animation when a tab panel becomes visible (new panel mount or switch).
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
interface AccordionContextValue {
    type: AccordionType;
    collapsible: boolean;
    isOpen: (itemValue: string) => boolean;
    toggle: (itemValue: string) => void;
    baseId: string;
    variant: AccordionVariant;
    motion: AccordionMotion;
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
     * Default is off (plain box).
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

type TooltipPlacement = "top" | "bottom" | "left" | "right";
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
    /** Left bar — only when `variant` resolves to `withIndicator` and `selected` is true (§26) */
    selected?: boolean;
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
type CalendarCaptionLayout = "label" | "dropdown";
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
     * Month/year presentation: centered label with chevrons (shadcn-like) or dropdown selects.
     * @default "dropdown"
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
    error?: string;
    helperText?: string;
    showIcons?: boolean;
    onValueChange?: (value: string, option?: SelectOption) => void;
    fullWidth?: boolean;
    size?: "sm" | "md" | "lg";
    rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill";
    status?: "error" | "warning" | "success";
    allowPlaceholderSelection?: boolean;
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
interface ModalProps {
    /** Whether the modal is open */
    isOpen: boolean;
    /** Called when modal should close (backdrop click, escape, close button) */
    onClose: () => void;
    /** Modal title */
    title: string;
    /** Modal body content */
    children: React.ReactNode;
    /** Called when confirm button is clicked */
    onConfirm?: () => void;
    /** Confirm button text */
    confirmText?: string;
    /** Disable confirm button */
    confirmDisabled?: boolean;
    /** Cancel button text */
    cancelText?: string;
    /** Show cancel button */
    showCancel?: boolean;
    /** Hide footer */
    hideFooter?: boolean;
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
    /** Confirm button variant: primary, link, ghost, outlinePrimary, danger, etc. */
    confirmButtonVariant?: "primary" | "link" | "ghost" | "outlinePrimary" | "outlineSecondary" | "danger";
    /** Confirm button text color */
    confirmButtonColor?: string;
    /** Confirm button background (use "transparent" for no background) */
    confirmButtonBackground?: string;
    /** Confirm button border color */
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

declare function Modal({ isOpen, onClose, title, children, onConfirm, confirmText, confirmDisabled, cancelText, showCancel, hideFooter, size, id, showCloseButton, isStackedBackground, zIndex, titleIcon, titleIconSize, animation, animationDuration, closeAfterTransition, closeOnBackdropClick, closeOnEscape, className, hideHeader, confirmButtonVariant, confirmButtonColor, confirmButtonBackground, confirmButtonBorder, cancelButtonVariant, cancelButtonColor, cancelButtonBackground, cancelButtonBorder, }: ModalProps): React__default.ReactPortal | null;

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
    /** Close on backdrop click */
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

/** Market-standard search input: left icon only by default. No right-side search/clear unless opted in. */
interface TextInputSearchProps {
    id?: string;
    /** Left icon (default: search magnifier). Set to null to hide. */
    leftIcon?: IconSource | null;
    leftIconHeight?: number;
    leftIconWidth?: number;
    /** Icon color. Default: var(--color-text-primary) for visibility in light/dark themes. */
    leftIconColor?: string;
    placeholder?: string;
    value?: string;
    onChange?: (val: string) => void;
    onSearch?: (val: string) => void;
    errorMessage?: string;
    size?: "sm" | "md" | "lg" | "";
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
    style?: React__default.CSSProperties;
    containerClassName?: string;
    containerStyle?: React__default.CSSProperties;
    ariaLabel?: string;
    /** Show clear (X) button when value exists. Default: false (market standard). Alias: Ant Design `allowClear`. */
    showClearButton?: boolean;
    /**
     * Show Ant-style enter button on the right (text label, not a second search icon).
     * Default: false (prefix icon + Enter only, like common MUI patterns).
     */
    showSearchButton?: boolean;
    /** Label for the optional right search button. Default: "Search". */
    searchButtonLabel?: string;
    /** Custom right action (overrides showSearchButton when provided). */
    suffix?: React__default.ReactNode;
}
declare const TextInputSearch: React__default.FC<TextInputSearchProps>;

export { Accordion, AccordionContent, AccordionContentProps, AccordionContextValue, AccordionItem, AccordionItemProps, AccordionMotion, AccordionProps, AccordionTrigger, AccordionTriggerProps, AccordionType, AccordionVariant, AlertDialog, AlertDialogProps, AlertDialogVariant, AvatarProps, Avatar as Avtar, Badge, BadgeProps, BadgeShape, BadgeSize, BadgeTone, BadgeVariant, Breadcrumb, BreadcrumbItem, BreadcrumbItemProps, BreadcrumbProps, BreadcrumbSeparator, Button, ButtonGroup, ButtonGroupContextValue, ButtonGroupOrientation, ButtonGroupProps, ButtonGroupSeparator, ButtonGroupSeparatorProps, ButtonGroupText, ButtonGroupTextProps, ButtonProps, Calendar, CalendarAnimation, CalendarCaptionLayout, CalendarElevation, CalendarProps, CalendarSize, CalendarTheme, CalendarVariant, Card, CardAction, CardActionProps, CardContent, CardContentProps, CardDescription, CardDescriptionProps, CardFooter, CardFooterProps, CardHeader, CardHeaderProps, CardProps, CardSize, CardTitle, CardTitleProps, CardVariantName, Checkbox as CheckBox, CheckboxProps, Chip, ChipProps, Combobox, ComboboxGroup, ComboboxOption, ComboboxProps, DatePicker, DatePickerProps, DetectedKind, Divider, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemProps, DropdownMenuTrigger, Dropzone, DropzoneProps, FileUpload, FileUploadProps, FileUploadSecurityOptions, FileUploadSize, Form, FormProps, GradientText, GradientTextProps, Grid, GridItem, GridItemProps, GridProps, Hyperlink, HyperlinkProps, IconSource, TextInput as Input, TextInputProps as InputProps, TextInputSearch as InputSearch, TextInputSearchProps as InputSearchProps, Modal, ModalProps, OtpBox, OtpBoxProps, OtpBoxSize, OtpBoxVariant, Popover, PopoverContent, PopoverContentProps, PopoverPlacement, PopoverProps, PopoverTrigger, PopoverTriggerProps, ProgressBar, ProgressBarProps, RadioButtonProps, RadioGroup, Select, SelectOptionGroup, SelectProps, Stepper, StepperAppearance, StepperContextValue, StepperProps, StepperSize, StepperStep, StepperStepProps, StepperTrackMode, Switch, SwitchProps, SwitchSize, Tabs, TabsActivationMode, TabsContent, TabsContentAnimation, TabsContentProps, TabsContextValue, TabsList, TabsListLayout, TabsListProps, TabsOrientation, TabsProps, TabsSize, TabsTrigger, TabsTriggerAlign, TabsTriggerLayout, TabsTriggerProps, TabsVariant, Tag, TagProps, TextArea, TextAreaProps, TextView, TextViewProps, TooltipIcon as ToolTip, TooltipIconProps, detectFileKindFromBuffer, parseAcceptString, validateFileSecurity, validateFilename, validateFilesSecurity };
