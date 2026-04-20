import type {
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

/** Semantic HTML table wrapper — matches patterns like [shadcn/ui Table](https://ui.shadcn.com/docs/components/radix/table). */
export interface TableRootProps extends HTMLAttributes<HTMLTableElement> {
  /** Class on the outer scroll container (default: `table-ui-wrap`). */
  containerClassName?: string;
}

export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
