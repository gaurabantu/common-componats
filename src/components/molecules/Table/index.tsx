import DataTable from "./Table";
import {
  TableRoot,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "./TablePrimitives";

/** Data-driven table (columns + data). For semantic HTML composition, use `TableRoot`, `TableHeader`, `TableBody`, … or `Table.Root`, `Table.Header`, … */
const Table = Object.assign(DataTable, {
  Root: TableRoot,
  Caption: TableCaption,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
});

export default Table;

export {
  TableRoot,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
};

export type {
  TableProps,
  TableColumn,
  SortDirection,
  SelectionMode,
  TableSearchProps,
  TableLayout,
  TableVariant,
  TableTheme,
} from "./Table.types";
export type {
  TableRootProps,
  TableCaptionProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from "./TablePrimitives.types";
