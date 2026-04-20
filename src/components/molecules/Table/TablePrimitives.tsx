"use client";

import { forwardRef } from "react";
import { cls } from "./Table.utils";
import "./Table.css";
import type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableRootProps,
  TableRowProps,
} from "./TablePrimitives.types";

/**
 * Scroll container + native `<table>`.
 * Use with `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`.
 * The default export `Table` from this package is the data-driven table; this is the compositional / markup API.
 */
export const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(function TableRoot(
  { className, containerClassName, children, ...rest },
  ref,
) {
  return (
    <div className={cls("table-ui-wrap", containerClassName)}>
      <table ref={ref} className={cls("table-ui", className)} {...rest}>
        {children}
      </table>
    </div>
  );
});
TableRoot.displayName = "TableRoot";

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ className, ...rest }, ref) {
    return <caption ref={ref} className={cls("table-ui-caption", className)} {...rest} />;
  },
);
TableCaption.displayName = "TableCaption";

/** Semantic `<thead>` (shadcn name: TableHeader). */
export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader({ className, ...rest }, ref) {
    return <thead ref={ref} className={cls("table-ui-thead", className)} {...rest} />;
  },
);
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(function TableBody(
  { className, ...rest },
  ref,
) {
  return <tbody ref={ref} className={cls("table-ui-tbody", className)} {...rest} />;
});
TableBody.displayName = "TableBody";

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  function TableFooter({ className, ...rest }, ref) {
    return <tfoot ref={ref} className={cls("table-ui-tfoot", className)} {...rest} />;
  },
);
TableFooter.displayName = "TableFooter";

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, ...rest },
  ref,
) {
  return <tr ref={ref} className={cls("table-ui-tr", className)} {...rest} />;
});
TableRow.displayName = "TableRow";

/** Header cell (`<th>`). Defaults `scope` to `col` when omitted. */
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, scope = "col", ...rest },
  ref,
) {
  return <th ref={ref} className={cls("table-ui-th", className)} scope={scope} {...rest} />;
});
TableHead.displayName = "TableHead";

/** Body/footer cell (`<td>`). */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...rest },
  ref,
) {
  return <td ref={ref} className={cls("table-ui-td", className)} {...rest} />;
});
TableCell.displayName = "TableCell";
