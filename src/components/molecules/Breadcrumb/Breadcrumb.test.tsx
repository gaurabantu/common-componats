import React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { Breadcrumb, BreadcrumbItem } from "./index";
import type { BreadcrumbItemData } from "./Breadcrumb.types";
import { getCollapseRange } from "./Breadcrumb.utils";

const trail: BreadcrumbItemData[] = [
  { label: "Home", href: "/" },
  { label: "Billing", href: "/billing" },
  { label: "Invoices", href: "/billing/invoices" },
  { label: "2026", href: "/billing/invoices/2026" },
  { label: "INV-104" },
];

function mockNarrow(matches: boolean) {
  (window.matchMedia as unknown as ReturnType<typeof vi.fn>).mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

afterEach(() => mockNarrow(false));

describe("Breadcrumb — children API (backward compatible)", () => {
  it("renders a labelled nav landmark with an ordered list", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Details</BreadcrumbItem>
      </Breadcrumb>,
    );
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toHaveAttribute("data-separator", "slash");
    expect(nav).toHaveAttribute("data-size", "sm");
    expect(container.querySelector("ol.ds-breadcrumb__list")).toBeInTheDocument();
    expect(within(nav).getAllByRole("listitem")).toHaveLength(2);
  });

  it("uses ariaLabel, separator and size props", () => {
    render(
      <Breadcrumb ariaLabel="Location" separator="chevron" size="md">
        <BreadcrumbItem>Only</BreadcrumbItem>
      </Breadcrumb>,
    );
    const nav = screen.getByRole("navigation", { name: "Location" });
    expect(nav).toHaveAttribute("data-separator", "chevron");
    expect(nav).toHaveAttribute("data-size", "md");
  });

  it("marks an item without href as the current page", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Details</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
    expect(screen.getByText("Details").closest("li")).toHaveAttribute("aria-current", "page");
  });

  it("renders a current self-link with aria-current on the anchor", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/docs/api" current>
          API
        </BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole("link", { name: "API" })).toHaveAttribute("aria-current", "page");
  });

  it("forwards linkProps to the anchor", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/x" linkProps={{ title: "Go to X" }}>
          X
        </BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole("link", { name: "X" })).toHaveAttribute("title", "Go to X");
  });

  it("forwards refs to nav and li", () => {
    const navRef = React.createRef<HTMLElement>();
    const liRef = React.createRef<HTMLLIElement>();
    render(
      <Breadcrumb ref={navRef}>
        <BreadcrumbItem ref={liRef}>Here</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(navRef.current?.tagName).toBe("NAV");
    expect(liRef.current?.tagName).toBe("LI");
  });
});

describe("Breadcrumb — items API", () => {
  it("renders links for items with href and marks the last item current by default", () => {
    render(<Breadcrumb items={trail.slice(0, 3)} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Billing" })).toHaveAttribute("href", "/billing");
    const last = screen.getByText("Invoices");
    expect(last.closest("li")).toHaveAttribute("aria-current", "page");
  });

  it("honours an explicit current item and renders non-current text items without aria-current", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Root" },
          { label: "Section", href: "/s", current: true },
          { label: "Tail", href: "/s/t" },
        ]}
      />,
    );
    expect(screen.getByText("Root").closest("li")).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Section" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Tail" })).not.toHaveAttribute("aria-current");
  });

  it("renders a decorative icon", () => {
    const { container } = render(
      <Breadcrumb items={[{ label: "Home", href: "/", icon: <svg data-testid="ico" /> }, { label: "Now" }]} />,
    );
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(container.querySelector(".ds-breadcrumb__icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("ignores children when items are passed", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Breadcrumb items={[{ label: "From items" }]}>
        <BreadcrumbItem>From children</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByText("From items")).toBeInTheDocument();
    expect(screen.queryByText("From children")).not.toBeInTheDocument();
    warn.mockRestore();
  });
});

describe("Breadcrumb — href sanitisation", () => {
  it("drops javascript: hrefs and renders text", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Breadcrumb>
        <BreadcrumbItem href="javascript:alert(1)">Evil</BreadcrumbItem>
        <BreadcrumbItem>Here</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.queryByRole("link", { name: "Evil" })).not.toBeInTheDocument();
    expect(screen.getByText("Evil").closest("li")).not.toHaveAttribute("aria-current");
    warn.mockRestore();
  });

  it("drops unsafe hrefs in the items API", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Breadcrumb items={[{ label: "Bad", href: "data:text/html,x" }, { label: "Now" }]} />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    warn.mockRestore();
  });

  it("drops unsafe hrefs on asChild children", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem asChild>
          <a href="javascript:void(0)">Bad child</a>
        </BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Bad child")).toBeInTheDocument();
  });
});

describe("Breadcrumb — router links", () => {
  it("asChild merges classes and aria-current onto the child link", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem asChild>
          <a href="/a" className="router-link">
            A
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem asChild current>
          <a href="/b">B</a>
        </BreadcrumbItem>
      </Breadcrumb>,
    );
    const a = screen.getByRole("link", { name: "A" });
    expect(a).toHaveClass("ds-breadcrumb__link", "router-link");
    expect(a).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "B" })).toHaveAttribute("aria-current", "page");
  });

  it("renderLink on Breadcrumb renders every link segment", () => {
    const renderLink = vi.fn(({ href, className, children, ...rest }) => (
      <a data-router="yes" href={href} className={className} {...rest}>
        {children}
      </a>
    ));
    render(<Breadcrumb items={trail.slice(0, 2)} renderLink={renderLink} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("data-router", "yes");
    expect(renderLink).toHaveBeenCalledWith(expect.objectContaining({ href: "/" }));
  });

  it("per-item renderLink wins over the Breadcrumb-level one", () => {
    render(
      <Breadcrumb
        renderLink={({ href, children }) => <a href={href} data-src="nav">{children}</a>}
        items={[
          { label: "Item", href: "/i", renderLink: ({ href, children }) => <a href={href} data-src="item">{children}</a> },
          { label: "Now" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Item" })).toHaveAttribute("data-src", "item");
  });
});

describe("Breadcrumb — collapse", () => {
  it("collapses the middle into a 'Show N more' button when over maxItems", () => {
    render(<Breadcrumb items={trail} maxItems={3} />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Billing" })).not.toBeInTheDocument();
    expect(screen.getByText("INV-104")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show 3 more" })).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toHaveAttribute("data-collapsed", "true");
  });

  it("respects itemsBeforeCollapse / itemsAfterCollapse", () => {
    render(<Breadcrumb items={trail} maxItems={3} itemsBeforeCollapse={2} itemsAfterCollapse={2} />);
    expect(screen.getByRole("link", { name: "Billing" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2026" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show 1 more" })).toBeInTheDocument();
  });

  it("expands on click, calls onExpand and moves focus to the first revealed link", () => {
    const onExpand = vi.fn();
    render(<Breadcrumb items={trail} maxItems={3} onExpand={onExpand} />);
    fireEvent.click(screen.getByRole("button", { name: "Show 3 more" }));
    expect(onExpand).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: /more/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Billing" })).toHaveFocus();
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("expands via keyboard (Enter on a native button)", () => {
    render(<Breadcrumb items={trail} maxItems={2} />);
    const btn = screen.getByRole("button", { name: "Show 3 more" });
    btn.focus();
    // Native <button> turns Enter/Space into click; simulate that activation.
    fireEvent.keyDown(btn, { key: "Enter" });
    fireEvent.click(btn);
    expect(screen.getByRole("link", { name: "Billing" })).toHaveFocus();
  });

  it("collapses children too and supports a custom expandLabel", () => {
    render(
      <Breadcrumb maxItems={2} expandLabel={(n) => `${n} hidden levels`}>
        <BreadcrumbItem href="/">A</BreadcrumbItem>
        <BreadcrumbItem href="/b">B</BreadcrumbItem>
        <BreadcrumbItem href="/c">C</BreadcrumbItem>
        <BreadcrumbItem>D</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole("button", { name: "2 hidden levels" })).toBeInTheDocument();
  });

  it("does not collapse when within maxItems", () => {
    render(<Breadcrumb items={trail.slice(0, 3)} maxItems={3} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("auto-collapses at ≤640px when the trail has more than 3 segments", () => {
    mockNarrow(true);
    render(<Breadcrumb items={trail} />);
    expect(screen.getByRole("button", { name: "Show 3 more" })).toBeInTheDocument();
  });

  it("does not auto-collapse when responsiveCollapse is false", () => {
    mockNarrow(true);
    render(<Breadcrumb items={trail} responsiveCollapse={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("re-collapses after expansion when the trail length changes", () => {
    const { rerender } = render(<Breadcrumb items={trail} maxItems={3} />);
    fireEvent.click(screen.getByRole("button", { name: "Show 3 more" }));
    act(() => {
      rerender(<Breadcrumb items={trail.slice(0, 4)} maxItems={3} />);
    });
    expect(screen.getByRole("button", { name: "Show 2 more" })).toBeInTheDocument();
  });
});

describe("Breadcrumb — separators", () => {
  it("renders a custom separator node aria-hidden and marks data-separator=custom", () => {
    const { container } = render(
      <Breadcrumb separator={<span>›</span>}>
        <BreadcrumbItem href="/">A</BreadcrumbItem>
        <BreadcrumbItem>B</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("data-separator", "custom");
    const seps = container.querySelectorAll(".ds-breadcrumb__separator");
    expect(seps.length).toBe(2);
    seps.forEach((s) => expect(s).toHaveAttribute("aria-hidden", "true"));
  });

  it("built-in separators render no separator nodes", () => {
    const { container } = render(
      <Breadcrumb separator="chevron">
        <BreadcrumbItem href="/">A</BreadcrumbItem>
        <BreadcrumbItem>B</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(container.querySelector(".ds-breadcrumb__separator")).toBeNull();
  });
});

describe("getCollapseRange", () => {
  it("returns no collapse when maxItems is unset or not exceeded", () => {
    expect(getCollapseRange(5, undefined, 1, 1).collapsed).toBe(false);
    expect(getCollapseRange(3, 3, 1, 1).collapsed).toBe(false);
  });
  it("never collapses when before + after covers the trail", () => {
    expect(getCollapseRange(4, 2, 2, 2).collapsed).toBe(false);
  });
  it("computes hidden count", () => {
    expect(getCollapseRange(6, 3, 1, 1)).toEqual({ collapsed: true, before: 1, after: 1, hidden: 4 });
  });
});
