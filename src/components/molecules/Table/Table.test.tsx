import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table, {
  TableRoot,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from ".";
import { TableColumn } from "./Table.types";

const columns: TableColumn[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email" },
];

const data = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

describe("Table", () => {
  it("renders table with data", () => {
    render(<Table columns={columns} data={data} searchable={false} pagination={false} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("renders empty state when no data", () => {
    render(<Table columns={columns} data={[]} searchable={false} pagination={false} emptyText="No records" />);
    expect(screen.getByText("No records")).toBeInTheDocument();
  });

  it("has sortable headers with aria-sort when sorted", async () => {
    const { getByText } = render(<Table columns={columns} data={data} searchable={false} pagination={false} />);
    await userEvent.click(getByText("Name"));
    const nameHeader = getByText("Name").closest("th");
    expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
  });

  it("shows default sort indicator on sortable headers", () => {
    render(<Table columns={columns} data={data} searchable={false} pagination={false} />);
    expect(screen.getByText("↕")).toBeInTheDocument();
  });

  it("has scope=col on header cells", () => {
    const { container } = render(<Table columns={columns} data={data} searchable={false} pagination={false} />);
    const headers = container.querySelectorAll("th[scope='col']");
    expect(headers.length).toBeGreaterThan(0);
  });

  it("applies size class for sm and lg", () => {
    const { container, rerender } = render(
      <Table columns={columns} data={data} searchable={false} pagination={false} size="sm" />
    );
    expect(container.querySelector("table.table-size-sm")).toBeTruthy();
    rerender(<Table columns={columns} data={data} searchable={false} pagination={false} size="lg" />);
    expect(container.querySelector("table.table-size-lg")).toBeTruthy();
  });

  it("applies vertical divider class when enabled", () => {
    const { container } = render(
      <Table columns={columns} data={data} searchable={false} pagination={false} verticalDivider />
    );
    expect(container.querySelector("table.table-vertical-divider")).toBeTruthy();
  });

  it("clamps current page when data shrinks so the prior page is empty", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Table columns={columns} data={data} searchable={false} pagination={{ pageSize: 1 }} />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getByText("Bob")).toBeInTheDocument();
    rerender(<Table columns={columns} data={[data[0]!]} searchable={false} pagination={{ pageSize: 1 }} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });

  it("uses small page-size selector in pagination controls by default", () => {
    render(<Table columns={columns} data={data} searchable={false} pagination={{ pageSize: 1 }} />);
    expect(screen.getByRole("combobox")).toHaveStyle({ minHeight: "36px" });
  });

  it("sorts numeric string values numerically in asc and desc order", async () => {
    const user = userEvent.setup();
    const numericColumns: TableColumn[] = [
      { key: "name", header: "Name" },
      { key: "score", header: "Score", sortable: true, sortType: "number" },
    ];
    const numericData = [
      { id: "1", name: "One", score: "2" },
      { id: "2", name: "Two", score: "10" },
      { id: "3", name: "Three", score: "1" },
    ];

    const { container } = render(
      <Table columns={numericColumns} data={numericData} searchable={false} pagination={false} />
    );
    await user.click(screen.getByText("Score"));

    let scoreCells = Array.from(container.querySelectorAll("tbody tr td:nth-child(2)")).map((cell) =>
      cell.textContent?.trim()
    );
    expect(scoreCells).toEqual(["1", "2", "10"]);

    await user.click(screen.getByText("Score"));
    scoreCells = Array.from(container.querySelectorAll("tbody tr td:nth-child(2)")).map((cell) =>
      cell.textContent?.trim()
    );
    expect(scoreCells).toEqual(["10", "2", "1"]);
  });

  it("renders skeleton rows when loadingVariant is skeleton", () => {
    const { container } = render(
      <Table
        columns={columns}
        data={data}
        searchable={false}
        pagination={false}
        loading
        loadingVariant="skeleton"
        loadingRows={3}
      />
    );
    expect(container.querySelectorAll(".table-skeleton-row").length).toBe(3);
  });

  it("applies minWidth from scroll.x for horizontal scrolling", () => {
    const { container } = render(
      <Table columns={columns} data={data} searchable={false} pagination={false} scroll={{ x: 900 }} />
    );
    const table = container.querySelector("table");
    expect(table).toHaveStyle({ minWidth: "900px" });
  });
});

describe("Table primitives (semantic / shadcn-style)", () => {
  it("renders compositional markup", () => {
    render(
      <TableRoot>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-end">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell className="text-end">$250.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-end">$250.00</TableCell>
          </TableRow>
        </TableFooter>
      </TableRoot>,
    );
    expect(screen.getByText("A list of your recent invoices.")).toBeInTheDocument();
    expect(screen.getByText("INV001")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("exposes Table.Root static namespace", () => {
    render(
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>,
    );
    expect(screen.getByText("Cell")).toBeInTheDocument();
  });
});
