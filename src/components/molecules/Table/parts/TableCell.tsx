import React from "react";
import { cls } from "../Table.utils";

type TableCellProps = {
  align?: "left" | "center" | "right";
  children: React.ReactNode;
};

export default function TableCell({ align = "left", children }: TableCellProps) {
  return (
    <td
      className={cls(
        align === "center" && "text-center",
        align === "right" && "text-end"
      )}
    >
      {children}
    </td>
  );
}
