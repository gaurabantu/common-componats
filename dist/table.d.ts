import * as React from 'react';
import React__default, { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

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

interface TableColumn<T = Record<string, unknown>> {
    key: string;
    header: string;
    width?: string | number;
    minWidth?: string | number;
    align?: "left" | "center" | "right";
    sortable?: boolean;
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
    /** Show search/action button on right */
    showSearchButton?: boolean;
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

export { Table, TableBody, TableBodyProps, TableCaption, TableCaptionProps, TableCell, TableCellProps, TableColumn, TableFooter, TableFooterProps, TableHead, TableHeadProps, TableHeader, TableHeaderProps, TableLayout, TableProps, TableRoot, TableRootProps, TableRow, TableRowProps, TableSearchProps, TableTheme, TableVariant };
