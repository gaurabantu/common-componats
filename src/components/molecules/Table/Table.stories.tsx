import type { Meta, StoryObj } from "@storybook/react";
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
import { useState } from "react";

const meta: Meta<typeof Table> = {
  title: "Design System/Molecules/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    striped: { control: "boolean" },
    bordered: { control: "boolean" },
    hover: { control: "boolean" },
    compact: { control: "boolean" },
    searchable: { control: "boolean" },
    pagination: { control: "boolean" },
    headerColor: {
      control: "select",
      options: ["primary", "secondary", "light", "dark", "success", "warning", "danger", "info"],
    },
    selectionMode: { control: "select", options: ["none", "single", "multiple"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    theme: { control: "select", options: ["light", "dark"] },
    loadingVariant: { control: "select", options: ["overlay", "skeleton"] },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

const sampleColumns: TableColumn[] = [
  { key: "name", header: "Name", width: "30%", sortable: true },
  { key: "email", header: "Email", align: "left", sortable: true },
  { key: "role", header: "Role", align: "center", sortable: true },
  {
    key: "status",
    header: "Status",
    align: "center",
    sortable: true,
    render: (val) => (
      <span
        style={{
          padding: "2px 8px",
          borderRadius: 4,
          fontSize: 12,
          background: val === "Active" ? "#dcfce7" : "#fef3c7",
          color: val === "Active" ? "#166534" : "#92400e",
        }}
      >
        {String(val)}
      </span>
    ),
  },
];

type SampleRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const sampleData: SampleRow[] = [
  { id: "1", name: "Alice", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: "2", name: "Bob", email: "bob@example.com", role: "User", status: "Active" },
  { id: "3", name: "Carol", email: "carol@example.com", role: "User", status: "Inactive" },
  { id: "4", name: "Dave", email: "dave@example.com", role: "Editor", status: "Active" },
  { id: "5", name: "Eve", email: "eve@example.com", role: "Viewer", status: "Inactive" },
  { id: "6", name: "Frank", email: "frank@example.com", role: "Admin", status: "Active" },
  { id: "7", name: "Grace", email: "grace@example.com", role: "User", status: "Active" },
];

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
    hover: true,
    headerColor: "light",
  },
};

export const Sortable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
    hover: true,
    headerColor: "light",
  },
};

export const SingleSelect: Story = {
  render: function SingleSelectStory(args) {
    const [selected, setSelected] = useState<string | undefined>();
    return (
      <Table
        {...args}
        columns={sampleColumns}
        selectionMode="single"
        selectedRow={selected}
        onRowSelect={setSelected}
      />
    );
  },
  args: {
    data: sampleData,
    striped: true,
    hover: true,
    headerColor: "light",
  },
};

export const MultiSelect: Story = {
  render: function MultiSelectStory(args) {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <Table
        {...args}
        columns={sampleColumns}
        selectionMode="multiple"
        selectedRowKeys={selected}
        onSelectionChange={(keys) => setSelected(keys)}
      />
    );
  },
  args: {
    data: sampleData,
    striped: true,
    hover: true,
    headerColor: "light",
  },
};

export const Expandable: Story = {
  render: function ExpandableStory(args) {
    const [expanded, setExpanded] = useState<string[]>([]);
    return (
      <Table
        {...args}
        columns={sampleColumns}
        expandable={{
          expandedRowKeys: expanded,
          onExpandedRowsChange: setExpanded,
          expandedRowRender: (row) => {
            const r = row as SampleRow;
            return (
              <div style={{ padding: 16 }}>
                <strong>Details for {r.name}</strong>
                <p style={{ margin: "8px 0 0", color: "#666" }}>
                  Email: {r.email} | Role: {r.role}
                </p>
              </div>
            );
          },
        }}
      />
    );
  },
  args: {
    data: sampleData,
    striped: true,
    hover: true,
    headerColor: "light",
  },
};

export const Bordered: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    bordered: true,
    headerColor: "dark",
  },
};

export const Compact: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    compact: true,
    striped: true,
    headerColor: "light",
  },
};

export const NoSearch: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    searchable: false,
    showSearch: false,
  },
};

export const NoPagination: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    pagination: false,
  },
};

export const Loading: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    loading: true,
    loadingVariant: "overlay",
  },
};

export const LoadingSkeleton: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    loading: true,
    loadingVariant: "skeleton",
    loadingRows: 5,
  },
};

export const Empty: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    emptyText: "No records found. Add data to get started.",
  },
};

export const StickyHeader: Story = {
  args: {
    columns: sampleColumns,
    data: [...sampleData, ...sampleData.map((r, i) => ({ ...r, id: String(10 + i) }))],
    stickyHeader: true,
    scroll: { y: 300 },
    headerColor: "light",
  },
};

export const MinimalVariant: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: "minimal",
    striped: true,
    hover: true,
    headerColor: "light",
    searchPlaceholder: "Search markets...",
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal variant: cleaner look, less visual noise. Market-standard search (left icon only).",
      },
    },
  },
};

export const CustomToolbar: Story = {
  render: (args) => (
    <Table
      {...args}
      toolbarLeft={
        <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1 }}>
          <input
            type="search"
            placeholder="Search..."
            style={{
              padding: "8px 12px",
              border: "1px solid var(--color-border-default)",
              borderRadius: 6,
              maxWidth: 240,
            }}
          />
          <button
            type="button"
            style={{
              padding: "8px 16px",
              background: "var(--color-brand-primary)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Filter
          </button>
        </div>
      }
      toolbarRight={
        <button
          type="button"
          style={{
            padding: "8px 16px",
            background: "var(--color-state-success)",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Export
        </button>
      }
    />
  ),
  args: {
    columns: sampleColumns,
    data: sampleData,
    searchable: false,
    showSearch: false,
    striped: true,
    hover: true,
    headerColor: "light",
  },
};

/** Compositional `<table>` markup (aligned with shadcn/ui Table structure). Default export `Table` is the data-driven grid above. */
export const SemanticMarkup: Story = {
  render: () => (
    <TableRoot>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead style={{ width: 100 }}>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-end">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-end">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-end">$150.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-end">$400.00</TableCell>
        </TableRow>
      </TableFooter>
    </TableRoot>
  ),
};
