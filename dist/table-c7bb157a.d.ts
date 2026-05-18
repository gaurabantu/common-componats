import * as React from 'react';
import React__default, { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { I as IconSource } from './index-8a491a10.js';

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
    /** §20: default `lg` (2.5rem) — primary screen CTAs; `md` = 2.25rem outlined secondaries */
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
    iconWidth?: number | string;
    iconHeight?: number | string;
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
    /** Press ripple on pointer down. Off when loading or disabled. @default true */
    ripple?: boolean;
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

/** Semantic HTML table wrapper — matches patterns like [shadcn/ui Table](https://ui.shadcn.com/docs/components/radix/table). */
interface TableRootProps extends HTMLAttributes<HTMLTableElement> {
    /** Class on the outer scroll container (default: `table-ui-wrap`). */
    containerClassName?: string;
}
type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;
type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;
type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

/** Right-side action (`showSearchButton`) — icon-filled vs text label. */
type SearchButtonDisplay = "icon" | "text";
/** Passed to trailing `Button` (always rendered as `<button type="button">`, not `<a>`). */
type SearchActionButtonProps = Omit<Partial<Extract<ButtonProps, {
    href?: undefined;
}>>, "onClick" | "disabled" | "loading" | "href" | "type">;
/** Search field with optional trailing action powered by `Button` (colors, variants, icon/text). */
interface TextInputSearchProps {
    id?: string;
    /** Left icon (default: magnifier). Set to `null` to hide. */
    leftIcon?: IconSource | null;
    leftIconHeight?: number | string;
    leftIconWidth?: number | string;
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
    /**
     * Clear control when text exists.
     * When omitted with `showSearchButton`, defaults to `false`. Pass `true` to show both clear and action.
     */
    showClearButton?: boolean;
    /** Show `Button` action on the right (`onSearch` / Enter). */
    showSearchButton?: boolean;
    /**
     * Action content: `icon` — compact icon-only; `text` — label from `searchButtonLabel`.
     * @default "icon"
     */
    searchButtonDisplay?: SearchButtonDisplay;
    searchButtonIcon?: IconSource;
    searchButtonIconWidth?: number | string;
    searchButtonIconHeight?: number | string;
    searchButtonAriaLabel?: string;
    /** @default "Search" */
    searchButtonLabel?: string;
    searchActionButtonProps?: SearchActionButtonProps;
    /** Custom right slot (overrides `showSearchButton`). */
    suffix?: React__default.ReactNode;
    /**
     * Overrides join between field and trailing action. Omit to use **`integrated`** when the built-in
     * search button is shown (single Material-style bar).
     */
    trailingRail?: "default" | "integrated";
    /**
     * Optional whitelist for search input: **`TextInput` `pattern`**, regex tested **per string unit**
     * (`Array.from`); non-matching units are stripped. Omit to allow any characters (spaces included).
     */
    pattern?: RegExp | string;
    /** Enables spell-check + WebKit autocorrect hints on the inner field. Default `false`. */
    autoCorrection?: boolean;
}
declare const TextInputSearch: React__default.FC<TextInputSearchProps>;

interface TableColumn<T = Record<string, unknown>> {
    key: string;
    header: string;
    width?: string | number;
    minWidth?: string | number;
    align?: "left" | "center" | "right";
    sortable?: boolean;
    /** Sort mode for built-in sorting: auto (default), alphabetic, or numeric. */
    sortType?: "auto" | "string" | "number";
    /** Custom sort function. If not provided, uses default string/number compare. */
    sorter?: (a: T, b: T, key: string) => number;
    render?: (value: unknown, row: T, index: number) => React__default.ReactNode;
    /** Header render (e.g. for filter dropdown) */
    headerRender?: (column: TableColumn<T>) => React__default.ReactNode;
    /** Hide column (for column visibility toggle) */
    hidden?: boolean;
    /** Fixed column (sticky left/right) */
    fixed?: "left" | "right";
}
type SelectionMode = "none" | "single" | "multiple";
type TableLayout = "auto" | "fixed";
type TableVariant = "default" | "bordered" | "minimal";
/** Theme: light (default) or dark — for dark backgrounds */
type TableTheme = "light" | "dark";
type TableLoadingVariant = "overlay" | "skeleton";
/** Props passed to the built-in search input (when searchable) */
interface TableSearchProps {
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    maxWidth?: number | string;
    /** Show clear button when value exists */
    showClearButton?: boolean;
    /** Show search/action `Button` on the right */
    showSearchButton?: boolean;
    /** `icon` (default) vs `text` label — see **`InputSearch`** */
    searchButtonDisplay?: SearchButtonDisplay;
    /** Pass-through to the trailing **`Button`** on **`InputSearch`** */
    searchActionButtonProps?: SearchActionButtonProps;
}
interface TableProps<T = Record<string, unknown>> {
    /** Column definitions */
    columns: TableColumn<T>[];
    /** Data rows */
    data: T[];
    /** Unique row key field (default: "id") */
    rowKey?: keyof T | ((row: T, index: number) => string);
    /** Selection mode: none, single (radio), multiple (checkbox) */
    selectionMode?: SelectionMode;
    /** Selected row id(s) - string for single, string[] for multiple */
    selectedRowKeys?: string | string[];
    /** @deprecated Use selectedRowKeys. Legacy single selection. */
    selectedRow?: string;
    /** Called when selection changes */
    onSelectionChange?: (keys: string[], rows: T[]) => void;
    /** Legacy: single selection callback */
    onRowSelect?: (rowId: string) => void;
    /** Click row handler */
    onRowClick?: (row: T, index: number) => void;
    /** Expandable: render expanded content */
    expandable?: {
        expandedRowRender: (row: T, index: number) => React__default.ReactNode;
        expandedRowKeys?: string[];
        onExpandedRowsChange?: (keys: string[]) => void;
        defaultExpandAllRows?: boolean;
    };
    /** Search */
    searchable?: boolean;
    searchPlaceholder?: string;
    /** Search input props (placeholder, size, showClearButton, etc.) */
    searchProps?: TableSearchProps;
    /** Search in specific columns only (keys). Empty = all. */
    searchColumns?: string[];
    /** Custom toolbar slot (replaces search bar when provided) */
    toolbar?: React__default.ReactNode;
    /** Left slot in toolbar (search + filters) */
    toolbarLeft?: React__default.ReactNode;
    /** Right slot in toolbar (actions, filters) */
    toolbarRight?: React__default.ReactNode;
    /** Pagination */
    pagination?: boolean | {
        pageSize?: number;
        pageSizeOptions?: number[];
    };
    /** Loading state */
    loading?: boolean;
    /** Loading UI mode: overlay spinner/text or skeleton rows */
    loadingVariant?: TableLoadingVariant;
    /** Skeleton row count (used when loadingVariant="skeleton") */
    loadingRows?: number;
    /** Empty state when no data */
    emptyText?: React__default.ReactNode;
    /** Custom empty component */
    emptyComponent?: React__default.ReactNode;
    /** Striped rows */
    striped?: boolean;
    /** Bordered cells */
    bordered?: boolean;
    /** Show vertical separators between table columns */
    verticalDivider?: boolean;
    /** Row hover effect */
    hover?: boolean;
    /** Compact padding */
    compact?: boolean;
    /** Header background */
    headerColor?: "primary" | "secondary" | "light" | "dark" | "success" | "warning" | "danger" | "info";
    customHeaderClass?: string;
    /** Sticky header (scroll body, fixed header) */
    stickyHeader?: boolean;
    /** Max height for scrollable body (enables sticky header) */
    scroll?: {
        y?: number | string;
        x?: number | string;
    };
    /** Custom class */
    className?: string;
    /** Footer/summary row */
    footer?: React__default.ReactNode;
    /** Show/hide search (default true when searchable) */
    showSearch?: boolean;
    /** Size */
    size?: "sm" | "md" | "lg";
    /** Table layout: auto (flexible) vs fixed (fixed column widths) */
    tableLayout?: TableLayout;
    /** Visual variant */
    variant?: TableVariant;
    /** Theme for light/dark backgrounds. Use "dark" on dark surfaces. */
    theme?: TableTheme;
}

declare function Table$1<T extends Record<string, unknown>>(props: TableProps<T>): react_jsx_runtime.JSX.Element;

/**
 * Scroll container + native `<table>`.
 * Use with `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`.
 * The default export `Table` from this package is the data-driven table; this is the compositional / markup API.
 */
declare const TableRoot: React.ForwardRefExoticComponent<TableRootProps & React.RefAttributes<HTMLTableElement>>;
declare const TableCaption: React.ForwardRefExoticComponent<TableCaptionProps & React.RefAttributes<HTMLTableCaptionElement>>;
/** Semantic `<thead>` (shadcn name: TableHeader). */
declare const TableHeader: React.ForwardRefExoticComponent<TableHeaderProps & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<TableBodyProps & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React.ForwardRefExoticComponent<TableFooterProps & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<TableRowProps & React.RefAttributes<HTMLTableRowElement>>;
/** Header cell (`<th>`). Defaults `scope` to `col` when omitted. */
declare const TableHead: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
/** Body/footer cell (`<td>`). */
declare const TableCell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;

/** Data-driven table (columns + data). For semantic HTML composition, use `TableRoot`, `TableHeader`, `TableBody`, … or `Table.Root`, `Table.Header`, … */
declare const Table: typeof Table$1 & {
    Root: React.ForwardRefExoticComponent<TableRootProps & React.RefAttributes<HTMLTableElement>>;
    Caption: React.ForwardRefExoticComponent<TableCaptionProps & React.RefAttributes<HTMLTableCaptionElement>>;
    Header: React.ForwardRefExoticComponent<TableHeaderProps & React.RefAttributes<HTMLTableSectionElement>>;
    Body: React.ForwardRefExoticComponent<TableBodyProps & React.RefAttributes<HTMLTableSectionElement>>;
    Footer: React.ForwardRefExoticComponent<TableFooterProps & React.RefAttributes<HTMLTableSectionElement>>;
    Row: React.ForwardRefExoticComponent<TableRowProps & React.RefAttributes<HTMLTableRowElement>>;
    Head: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
    Cell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;
};

export { ButtonProps as B, SearchButtonDisplay as S, Table as T, TableRoot as a, TableCaption as b, TableHeader as c, TableBody as d, TableFooter as e, TableRow as f, TableHead as g, TableCell as h, TextInputSearch as i, TextInputSearchProps as j, SearchActionButtonProps as k, TableColumn as l, TableProps as m, TableSearchProps as n, TableLayout as o, TableVariant as p, TableTheme as q, TableRootProps as r, TableCaptionProps as s, TableHeaderProps as t, TableBodyProps as u, TableFooterProps as v, TableRowProps as w, TableHeadProps as x, TableCellProps as y };
