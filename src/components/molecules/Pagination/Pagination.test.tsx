import React, { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./index";
import { isSafePageHref } from "./Pagination.utils";

const pageButtons = () =>
  screen
    .getAllByRole("button")
    .filter((b) => /^Page \d+$/.test(b.getAttribute("aria-label") ?? ""))
    .map((b) => Number(b.textContent));

describe("Pagination", () => {
  it("renders a labelled navigation landmark with a list of controls", () => {
    render(<Pagination page={1} pageCount={5} onPageChange={() => {}} />);
    const nav = screen.getByRole("navigation", { name: "Pagination" });
    expect(within(nav).getByRole("list")).toBeInTheDocument();
    expect(pageButtons()).toEqual([1, 2, 3, 4, 5]);
  });

  it("supports a custom landmark label", () => {
    render(<Pagination page={1} pageCount={3} ariaLabel="Invoices pages" />);
    expect(screen.getByRole("navigation", { name: "Invoices pages" })).toBeInTheDocument();
  });

  it("marks only the current page with aria-current", () => {
    render(<Pagination page={3} pageCount={5} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Page 2" })).not.toHaveAttribute("aria-current");
    expect(screen.getAllByRole("button").filter((b) => b.hasAttribute("aria-current"))).toHaveLength(1);
  });

  it("calls onPageChange with the page for page, prev and next", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={5} pageCount={10} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Page 6" }));
    await userEvent.click(screen.getByRole("button", { name: "Previous page" }));
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange.mock.calls.map((c) => c[0])).toEqual([6, 4, 6]);
  });

  it("does not fire for the current page", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} pageCount={4} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("keeps boundary prev/next focusable but aria-disabled and inert", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} pageCount={3} onPageChange={onPageChange} />);
    const prev = screen.getByRole("button", { name: "Previous page" });
    expect(prev).toHaveAttribute("aria-disabled", "true");
    expect(prev).not.toBeDisabled();
    await userEvent.click(prev);
    expect(onPageChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Next page" })).not.toHaveAttribute("aria-disabled");
  });

  it("renders ellipses as non-interactive text with an accessible meaning", () => {
    const { container } = render(<Pagination page={10} pageCount={20} onPageChange={() => {}} />);
    expect(pageButtons()).toEqual([1, 9, 10, 11, 20]);
    const ellipses = container.querySelectorAll('[data-kind="ellipsis"]');
    expect(ellipses).toHaveLength(2);
    expect(ellipses[0].querySelector("button, a")).toBeNull();
    expect(ellipses[0]).toHaveTextContent("Pages 2 to 8 not shown");
    expect(ellipses[0].querySelector('[aria-hidden="true"]')).toHaveTextContent("…");
  });

  it("derives pageCount from totalItems + pageSize", () => {
    render(<Pagination page={1} totalItems={45} pageSize={10} onPageChange={() => {}} />);
    expect(pageButtons()).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles 0 items: no pages and both arrows inert", () => {
    render(<Pagination page={1} totalItems={0} pageSize={10} showTotal onPageChange={() => {}} />);
    expect(pageButtons()).toEqual([]);
    expect(screen.getByRole("button", { name: "Previous page" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "Next page" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("handles a single page", () => {
    render(<Pagination page={1} pageCount={1} onPageChange={() => {}} />);
    expect(pageButtons()).toEqual([1]);
    expect(screen.getByRole("button", { name: "Next page" })).toHaveAttribute("aria-disabled", "true");
  });

  it("renders first/last controls when requested", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={5} pageCount={10} showFirstLast onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "First page" }));
    await userEvent.click(screen.getByRole("button", { name: "Last page" }));
    expect(onPageChange.mock.calls.map((c) => c[0])).toEqual([1, 10]);
  });

  it("can hide prev/next", () => {
    render(<Pagination page={2} pageCount={3} showPrevNext={false} />);
    expect(screen.queryByRole("button", { name: "Previous page" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Next page" })).toBeNull();
  });

  it("is keyboard operable (Tab + Enter / Space)", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} pageCount={3} onPageChange={onPageChange} />);
    await userEvent.tab(); // Previous (aria-disabled, still focusable)
    expect(screen.getByRole("button", { name: "Previous page" })).toHaveFocus();
    await userEvent.tab(); // Page 1
    await userEvent.tab(); // Page 2
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.tab();
    await userEvent.keyboard(" ");
    expect(onPageChange.mock.calls.map((c) => c[0])).toEqual([2, 3]);
  });

  it("shows the default total text in a polite live region", () => {
    render(<Pagination page={3} totalItems={95} pageSize={10} showTotal onPageChange={() => {}} />);
    const total = screen.getByText("Showing 21–30 of 95");
    expect(total).toHaveAttribute("aria-live", "polite");
  });

  it("accepts a showTotal render function", () => {
    render(
      <Pagination
        page={2}
        totalItems={30}
        pageSize={10}
        showTotal={({ from, to, total }) => `${from}-${to} / ${total} rows`}
      />,
    );
    expect(screen.getByText("11-20 / 30 rows")).toBeInTheDocument();
  });

  it("compact shows 'Page X of Y' with prev/next only", () => {
    render(<Pagination page={3} pageCount={12} compact showFirstLast onPageChange={() => {}} />);
    expect(screen.getByText("Page 3 of 12")).toBeInTheDocument();
    expect(pageButtons()).toEqual([]);
    expect(screen.queryByRole("button", { name: "First page" })).toBeNull();
    expect(screen.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toHaveAttribute("data-compact", "true");
  });

  it("disabled disables every control", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} pageCount={3} disabled onPageChange={onPageChange} />);
    screen.getAllByRole("button").forEach((b) => expect(b).toBeDisabled());
    await userEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("renders anchors with getPageHref and passes the event", async () => {
    const onPageChange = vi.fn((_: number, e: React.MouseEvent) => e.preventDefault());
    render(<Pagination page={2} pageCount={5} getPageHref={(p) => `?page=${p}`} onPageChange={onPageChange} />);
    const link = screen.getByRole("link", { name: "Page 3" });
    expect(link).toHaveAttribute("href", "?page=3");
    expect(screen.getByRole("link", { name: "Page 2" })).toHaveAttribute("aria-current", "page");
    await userEvent.click(link);
    expect(onPageChange).toHaveBeenCalledWith(3, expect.anything());
  });

  it("renders boundary links as disabled links without href", () => {
    render(<Pagination page={1} pageCount={5} getPageHref={(p) => `/items/${p}`} />);
    const prev = screen.getByRole("link", { name: "Previous page" });
    expect(prev).not.toHaveAttribute("href");
    expect(prev).toHaveAttribute("aria-disabled", "true");
  });

  it("falls back to buttons for unsafe hrefs", () => {
    // eslint-disable-next-line no-script-url
    render(<Pagination page={1} pageCount={2} getPageHref={() => "javascript:alert(1)"} />);
    expect(screen.queryByRole("link", { name: "Page 2" })).toBeNull();
    expect(screen.getByRole("button", { name: "Page 2" })).toBeInTheDocument();
  });

  it("renders a labelled page-size Select and reports numeric changes", async () => {
    const onPageSizeChange = vi.fn();
    render(
      <Pagination
        page={1}
        totalItems={100}
        pageSize={25}
        pageSizeOptions={[10, 25, 50]}
        onPageSizeChange={onPageSizeChange}
      />,
    );
    const select = screen.getByLabelText("Rows per page") as HTMLSelectElement;
    expect(select.tagName).toBe("SELECT");
    expect(select.value).toBe("25");
    expect(within(select).getAllByRole("option")).toHaveLength(3);
    await userEvent.selectOptions(select, "50");
    expect(onPageSizeChange).toHaveBeenCalledWith(50);
    expect(select).toHaveFocus();
  });

  it("works as a controlled component", async () => {
    const Harness = () => {
      const [page, setPage] = useState(1);
      return <Pagination page={page} pageCount={10} onPageChange={setPage} />;
    };
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute("aria-current", "page");
  });

  it("supports label overrides and forwards ref/attrs", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Pagination
        ref={ref}
        page={1}
        pageCount={3}
        data-testid="pg"
        labels={{ next: "Siguiente", page: (p) => `Página ${p}` }}
      />,
    );
    expect(ref.current).toBe(screen.getByTestId("pg"));
    expect(screen.getByRole("button", { name: "Siguiente" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Página 2" })).toBeInTheDocument();
  });

  it("reflects size as a data attribute", () => {
    render(<Pagination page={1} pageCount={3} size="sm" />);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-size", "sm");
  });
});

describe("isSafePageHref", () => {
  it("allows relative, query, hash and http(s)", () => {
    ["?page=2", "/items/2", "#p2", "https://example.com/?p=2", "http://example.com"].forEach((h) =>
      expect(isSafePageHref(h)).toBe(true),
    );
  });

  it("blocks scripting and data schemes, including obfuscated ones", () => {
    ["javascript:alert(1)", "java\tscript:alert(1)", " JAVASCRIPT:alert(1)", "data:text/html,x", "vbscript:x", "", undefined].forEach(
      (h) => expect(isSafePageHref(h)).toBe(false),
    );
  });
});
