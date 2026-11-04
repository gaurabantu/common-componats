import type {
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

/** Semantic HTML table wrapper — matches patterns like [shadcn/ui Table](https://ui.shadcn.com/docs/components/radix/table). */
export interface TableRootProps extends HTMLAttributes<HTMLTableElement> {
  /** Class on the outer scroll container (default: `table-ui-wrap`). Ignored when `scroll={false}`. */
  containerClassName?: string;
  /**
   * `true` (default): wrap the `<table>` in the bordered `overflow-x:auto` container.
   * `false`: render the bare `<table>` with no wrapper — for tables inside an app-owned scroller,
   * page-level sticky headers/columns, or cell popovers that must not be clipped.
   * @default true
   */
  scroll?: boolean;
  /**
   * Sticky `<thead>` cells (`position: sticky; top: var(--table-ui-sticky-top, 0)`). Sticks to the nearest
   * scroll container: the wrapper when it has `maxHeight`, otherwise the app's scroller (`scroll={false}`).
   * Layered above `stickyFirstColumn` cells so both work together.
   */
  stickyHeader?: boolean;
  /** Sticky first column (`th`/`td:first-child`, `left: 0`) with an opaque token background. */
  stickyFirstColumn?: boolean;
  /**
   * Max height of the scroll wrapper (makes it scroll vertically, e.g. with `stickyHeader`).
   * Number = px. Ignored when `scroll={false}`.
   */
  maxHeight?: number | string;
  /** No border, radius or shadow on the wrapper — for tables embedded in a `Card` or panel. */
  flush?: boolean;
}

export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Selected row: sets `aria-selected="true"`, `data-state="selected"` and the token selection background. */
  selected?: boolean;
}

/** Header-cell text casing. `upper` (default) = small uppercase label; `none` = text as authored. */
export type TableHeadCasing = "upper" | "none";

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** @default "upper" */
  casing?: TableHeadCasing;
  /** Allow the header text to wrap (default header cells are `white-space: nowrap`). @default false */
  wrap?: boolean;
}
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
