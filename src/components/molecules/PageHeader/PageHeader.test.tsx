import React from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PageHeader } from "./index";
import Button from "../../atoms/Button";
import { Breadcrumb, BreadcrumbItem } from "../Breadcrumb";

type Listener = () => void;

/** matchMedia mock whose `matches` can be flipped and listeners fired. */
function mockMatchMedia(initial: boolean) {
  const listeners = new Set<Listener>();
  let matches = initial;
  const original = window.matchMedia;
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return matches;
    },
    media: query,
    onchange: null,
    addEventListener: (_: string, l: Listener) => listeners.add(l),
    removeEventListener: (_: string, l: Listener) => listeners.delete(l),
    addListener: (l: Listener) => listeners.add(l),
    removeListener: (l: Listener) => listeners.delete(l),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
  return {
    set(next: boolean) {
      matches = next;
      act(() => listeners.forEach((l) => l()));
    },
    restore() {
      window.matchMedia = original;
    },
  };
}

const actions = (spy = vi.fn()) => [
  { label: "Export", onClick: spy },
  { label: "Duplicate", onClick: spy },
  { label: "Archive", onClick: spy },
  { label: "Docs", href: "https://example.com/docs" },
];

describe("PageHeader — rendering", () => {
  it("renders the title as h1 by default", () => {
    render(<PageHeader title="Invoices" />);
    expect(screen.getByRole("heading", { level: 1, name: "Invoices" })).toBeInTheDocument();
  });

  it("honours titleAs", () => {
    render(<PageHeader title="Invoices" titleAs="h2" />);
    expect(screen.getByRole("heading", { level: 2, name: "Invoices" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  });

  it("renders breadcrumb, status, description, meta and tabs slots", () => {
    render(
      <PageHeader
        title="Invoice INV-104"
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbItem href="/invoices">Invoices</BreadcrumbItem>
            <BreadcrumbItem current>INV-104</BreadcrumbItem>
          </Breadcrumb>
        }
        status={<span>Overdue</span>}
        description="Sent to Acme Ltd."
        meta={<span>Updated 2h ago</span>}
        tabs={<div role="tablist" aria-label="Sections" />}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText("Overdue")).toBeInTheDocument();
    expect(screen.getByText("Sent to Acme Ltd.")).toBeInTheDocument();
    expect(screen.getByText("Updated 2h ago")).toBeInTheDocument();
    expect(screen.getByRole("tablist", { name: "Sections" })).toBeInTheDocument();
  });

  it("does not render an actions area when there are no actions", () => {
    const { container } = render(<PageHeader title="Empty" />);
    expect(container.querySelector(".ds-page-header__actions")).toBeNull();
  });

  it("forwards ref, className and native attributes", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<PageHeader ref={ref} title="T" className="extra" data-testid="ph" />);
    expect(ref.current).toBe(screen.getByTestId("ph"));
    expect(ref.current).toHaveClass("ds-page-header", "extra");
  });
});

describe("PageHeader — actions", () => {
  it("renders the primary action and the first two secondaries inline, rest in the menu", () => {
    render(
      <PageHeader
        title="Invoices"
        primaryAction={<Button variant="primary" size="md">New invoice</Button>}
        secondaryActions={actions()}
      />,
    );
    expect(screen.getByRole("button", { name: "New invoice" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Duplicate" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Archive" })).not.toBeInTheDocument();
    const more = screen.getByRole("button", { name: "More actions" });
    expect(more).toHaveAttribute("aria-haspopup", "menu");
    expect(more).toHaveAttribute("aria-expanded", "false");
  });

  it("respects maxVisibleActions and hides the menu when nothing overflows", () => {
    render(<PageHeader title="Invoices" secondaryActions={actions()} maxVisibleActions={4} />);
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "https://example.com/docs");
    expect(screen.queryByRole("button", { name: "More actions" })).not.toBeInTheDocument();
  });

  it("renders inline secondaries as outlined buttons", () => {
    render(<PageHeader title="Invoices" secondaryActions={actions()} />);
    expect(screen.getByRole("button", { name: "Export" })).toHaveClass("btn-outline-secondary");
  });

  it("opens the overflow menu, fires onClick and closes", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<PageHeader title="Invoices" secondaryActions={actions(spy)} moreActionsLabel="More" />);
    await user.click(screen.getByRole("button", { name: "More" }));
    const menu = screen.getByRole("menu");
    const items = within(menu).getAllByRole("menuitem");
    expect(items.map((i) => i.textContent)).toEqual(["Archive", "Docs"]);
    expect(items[1]).toHaveAttribute("href", "https://example.com/docs");
    await user.click(items[0]);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("supports keyboard: Enter opens, arrows move, Escape closes", async () => {
    const user = userEvent.setup();
    render(<PageHeader title="Invoices" secondaryActions={actions()} maxVisibleActions={1} />);
    screen.getByRole("button", { name: "More actions" }).focus();
    await user.keyboard("{Enter}");
    const items = within(screen.getByRole("menu")).getAllByRole("menuitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(items[1]).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("disabled inline action does not fire", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<PageHeader title="T" secondaryActions={[{ label: "Export", onClick: spy, disabled: true }]} />);
    const btn = screen.getByRole("button", { name: "Export" });
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(spy).not.toHaveBeenCalled();
  });

  it("drops unsafe hrefs", async () => {
    const user = userEvent.setup();
    render(
      <PageHeader
        title="T"
        secondaryActions={[{ label: "Bad", href: "javascript:alert(1)" }, { label: "Bad menu", href: "java\tscript:alert(1)" }]}
        maxVisibleActions={1}
      />,
    );
    expect(screen.queryByRole("link", { name: "Bad" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bad" })).not.toHaveAttribute("href");
    await user.click(screen.getByRole("button", { name: "More actions" }));
    const item = screen.getByRole("menuitem", { name: "Bad menu" });
    expect(item).not.toHaveAttribute("href");
  });

  it("collapses every secondary into the menu at ≤ 640px", () => {
    const mm = mockMatchMedia(false);
    try {
      render(
        <PageHeader
          title="Invoices"
          primaryAction={<Button variant="primary" size="md">New invoice</Button>}
          secondaryActions={actions()}
        />,
      );
      expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
      mm.set(true);
      expect(screen.queryByRole("button", { name: "Export" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Duplicate" })).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "More actions" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "New invoice" })).toBeInTheDocument();
      mm.set(false);
      expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument();
    } finally {
      mm.restore();
    }
  });
  it("moves focus to More actions when the focused inline secondary collapses (and back)", () => {
    const mm = mockMatchMedia(false);
    try {
      render(<PageHeader title="Invoices" secondaryActions={actions().slice(0, 2)} />);
      // Desktop: both secondaries inline, no menu.
      expect(screen.queryByRole("button", { name: "More actions" })).not.toBeInTheDocument();
      screen.getByRole("button", { name: "Duplicate" }).focus();
      mm.set(true);
      const more = screen.getByRole("button", { name: "More actions" });
      expect(more).toHaveFocus();
      // Expanding unmounts the trigger → focus lands on the first restored inline secondary.
      mm.set(false);
      expect(screen.queryByRole("button", { name: "More actions" })).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Export" })).toHaveFocus();
    } finally {
      mm.restore();
    }
  });

  it("keeps focus on a surviving More trigger when expanding, and leaves unrelated focus alone", () => {
    const mm = mockMatchMedia(false);
    try {
      render(
        <>
          <input aria-label="Elsewhere" />
          <PageHeader title="Invoices" secondaryActions={actions()} />
        </>,
      );
      screen.getByRole("textbox", { name: "Elsewhere" }).focus();
      mm.set(true);
      expect(screen.getByRole("textbox", { name: "Elsewhere" })).toHaveFocus();
      const more = screen.getByRole("button", { name: "More actions" });
      more.focus();
      mm.set(false);
      expect(screen.getByRole("button", { name: "More actions" })).toHaveFocus();
    } finally {
      mm.restore();
    }
  });
});
