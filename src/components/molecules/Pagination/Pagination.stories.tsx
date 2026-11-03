import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./index";
import type { PaginationProps } from "./Pagination.types";
import { PAGINATION_SIZES } from "./Pagination.config";

const meta: Meta<typeof Pagination> = {
  title: "Design System/Molecules/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Controlled page navigation for tables, lists and search results. Pass `page` (1-based) and either `pageCount` or `totalItems` + `pageSize`; handle `onPageChange(page)`. Renders a `<nav>` landmark with `aria-current=\"page\"` on the current page, labelled prev/next, and ellipses that announce which pages they hide. At ≤ 480px (or with `compact`) it collapses to \"Page 3 of 12\" with prev/next. Add `pageSizeOptions` + `onPageSizeChange` for a rows-per-page Select, `showTotal` for a live \"Showing 21–30 of 120\" summary, and `getPageHref` to render real links for SEO / route-based paging.",
      },
    },
  },
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    pageCount: { control: { type: "number", min: 0 } },
    totalItems: { control: { type: "number", min: 0 } },
    pageSize: { control: { type: "number", min: 1 } },
    siblingCount: { control: { type: "number", min: 0, max: 3 } },
    boundaryCount: { control: { type: "number", min: 0, max: 3 } },
    showFirstLast: { control: "boolean" },
    showPrevNext: { control: "boolean" },
    showTotal: { control: "boolean" },
    size: { control: "inline-radio", options: PAGINATION_SIZES },
    compact: { control: "boolean" },
    disabled: { control: "boolean" },
    ariaLabel: { control: "text" },
    onPageChange: { action: "pageChange" },
    onPageSizeChange: { control: false },
    getPageHref: { control: false },
    labels: { control: false },
  },
  args: {
    page: 5,
    pageCount: 20,
    siblingCount: 1,
    boundaryCount: 1,
    showFirstLast: false,
    showPrevNext: true,
    size: "md",
    compact: false,
    disabled: false,
    ariaLabel: "Pagination",
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const Controlled = (args: PaginationProps) => {
  const [page, setPage] = useState(args.page);
  const [pageSize, setPageSize] = useState(args.pageSize);
  useEffect(() => setPage(args.page), [args.page]);
  useEffect(() => setPageSize(args.pageSize), [args.pageSize]);
  return (
    <Pagination
      {...args}
      page={page}
      pageSize={pageSize}
      onPageChange={(p, e) => {
        // Demo only: keep the Storybook iframe from navigating when rendering links.
        if (args.getPageHref) e.preventDefault();
        setPage(p);
        args.onPageChange?.(p, e);
      }}
      onPageSizeChange={
        args.pageSizeOptions
          ? (size) => {
              setPageSize(size);
              setPage(1);
            }
          : undefined
      }
    />
  );
};

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
};

export const WithTotalAndPageSize: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    pageCount: undefined,
    page: 3,
    totalItems: 248,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    showTotal: true,
  },
};

export const FirstAndLast: Story = {
  render: (args) => <Controlled {...args} />,
  args: { page: 10, pageCount: 40, showFirstLast: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="sb-stack">
      {PAGINATION_SIZES.map((size) => (
        <Controlled key={size} {...args} size={size} ariaLabel={`Pagination (${size})`} />
      ))}
    </div>
  ),
};

export const Compact: Story = {
  render: (args) => <Controlled {...args} />,
  args: { compact: true, page: 3, pageCount: 12 },
  parameters: {
    docs: {
      description: {
        story: "Forced compact layout. The same layout is applied automatically below 480px — try the mobile viewport.",
      },
    },
  },
};

export const FewPages: Story = {
  render: (args) => <Controlled {...args} />,
  args: { page: 1, pageCount: 3 },
};

export const Links: Story = {
  render: (args) => <Controlled {...args} />,
  args: { page: 2, pageCount: 8, getPageHref: (p: number) => `?page=${p}` },
  parameters: {
    docs: {
      description: {
        story:
          "`getPageHref` renders anchors so crawlers and middle-click work. Call `event.preventDefault()` in `onPageChange(page, event)` to keep client-side routing.",
      },
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true, page: 4, pageCount: 9 },
};
