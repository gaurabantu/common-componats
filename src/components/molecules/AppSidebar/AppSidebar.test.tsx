import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import AppSidebar from "./index";
import type { AppSidebarSection } from "./AppSidebar.types";

const sections: AppSidebarSection[] = [
  {
    id: "main",
    tier: "primary",
    grouping: "label",
    label: "Workspace",
    items: [
      { id: "home", label: "Home", href: "/home" },
      { id: "inbox", label: "Inbox" },
      { id: "locked", label: "Billing", disabled: true },
      {
        id: "projects",
        label: "Projects",
        children: [
          { id: "alpha", label: "Alpha" },
          { id: "beta", label: "Beta", href: "/p/beta" },
        ],
        createAction: { label: "Create project", onClick: () => {} },
      },
    ],
  },
  {
    id: "secondary",
    tier: "secondary",
    grouping: "divider",
    items: [{ id: "settings", label: "Settings" }],
  },
];

function mockWidth(narrow: boolean) {
  (window.matchMedia as unknown as ReturnType<typeof vi.fn>).mockImplementation((query: string) => ({
    matches: narrow,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

beforeEach(() => {
  try {
    window.localStorage.removeItem("sb-test");
  } catch {
    /* storage unavailable */
  }
  mockWidth(false);
});

afterEach(() => {
  document.documentElement.style.removeProperty("--app-sidebar-offset");
  document.body.style.overflow = "";
});

describe("AppSidebar — landmarks & names", () => {
  it("renders an aside with a labelled nav and section lists", () => {
    const { container } = render(<AppSidebar sections={sections} />);
    expect(container.querySelector("aside.app-sidebar")).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(within(nav).getAllByRole("list").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Workspace")).toBeInTheDocument();
    expect(within(nav).getByRole("separator")).toBeInTheDocument();
  });

  it("uses a custom navLabel", () => {
    render(<AppSidebar sections={sections} navLabel="Product" />);
    expect(screen.getByRole("navigation", { name: "Product" })).toBeInTheDocument();
  });

  it("wraps legacy flat items into one section", () => {
    render(<AppSidebar items={[{ id: "a", label: "Alpha" }, { id: "b", label: "Beta" }]} />);
    expect(screen.getByRole("button", { name: "Alpha" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Beta" })).toBeInTheDocument();
  });

  it("renders links for href items and buttons otherwise", () => {
    render(<AppSidebar sections={sections} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/home");
    expect(screen.getByRole("button", { name: "Inbox" })).toHaveAttribute("type", "button");
  });

  it("refuses unsafe hrefs (renders a button instead of a javascript: link)", () => {
    render(
      <AppSidebar
        items={[{ id: "x", label: "Evil", href: "javascript:alert(1)" }]}
        footerActions={[{ id: "f", label: "Bad action", icon: <svg />, href: "javascript:void(0)" }]}
      />,
    );
    expect(screen.queryByRole("link", { name: "Evil" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Evil" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Bad action" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bad action" })).toBeInTheDocument();
  });

  it("renders the header title and subtitle", () => {
    render(<AppSidebar sections={sections} header={{ title: "Acme", subtitle: "Pro plan" }} />);
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("Pro plan")).toBeInTheDocument();
  });
});

describe("AppSidebar — selection", () => {
  it("marks the active item with aria-current=page and calls callbacks", () => {
    const onItemSelect = vi.fn();
    render(<AppSidebar sections={sections} defaultActiveItemId="home" onItemSelect={onItemSelect} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    fireEvent.click(screen.getByRole("button", { name: "Inbox" }));
    expect(onItemSelect).toHaveBeenCalledWith("inbox", expect.objectContaining({ id: "inbox" }));
    expect(screen.getByRole("button", { name: "Inbox" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });

  it("controlled activeItemId is not changed internally", () => {
    const onItemSelect = vi.fn();
    render(<AppSidebar sections={sections} activeItemId="home" onItemSelect={onItemSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Inbox" }));
    expect(onItemSelect).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
  });

  it("disabled items are natively disabled and do not select", () => {
    const onItemSelect = vi.fn();
    render(<AppSidebar sections={sections} onItemSelect={onItemSelect} />);
    const billing = screen.getByRole("button", { name: "Billing" });
    expect(billing).toBeDisabled();
    fireEvent.click(billing);
    expect(onItemSelect).not.toHaveBeenCalled();
  });

  it("item.onClick fires on select", () => {
    const onClick = vi.fn();
    render(<AppSidebar items={[{ id: "a", label: "Alpha", onClick }]} />);
    fireEvent.click(screen.getByRole("button", { name: "Alpha" }));
    expect(onClick).toHaveBeenCalledWith("a", expect.objectContaining({ id: "a" }));
  });
});

describe("AppSidebar — nested groups", () => {
  it("parent toggles aria-expanded and reveals its submenu", () => {
    render(<AppSidebar sections={sections} />);
    const parent = screen.getByRole("button", { name: "Projects" });
    expect(parent).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("button", { name: "Alpha" })).not.toBeInTheDocument();
    fireEvent.click(parent);
    expect(parent).toHaveAttribute("aria-expanded", "true");
    const submenu = document.getElementById(parent.getAttribute("aria-controls")!);
    expect(submenu).toBeInTheDocument();
    expect(within(submenu!).getByRole("button", { name: "Alpha" })).toBeInTheDocument();
    expect(within(submenu!).getByRole("button", { name: "Create project" })).toBeInTheDocument();
  });

  it("reports expanded ids in uncontrolled mode", () => {
    const onExpandedChange = vi.fn();
    render(<AppSidebar sections={sections} onExpandedChange={onExpandedChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Projects" }));
    expect(onExpandedChange).toHaveBeenLastCalledWith(["projects"]);
    fireEvent.click(screen.getByRole("button", { name: "Projects" }));
    expect(onExpandedChange).toHaveBeenLastCalledWith([]);
  });

  it("controlled expandedIds drive the submenu", () => {
    const onExpandedChange = vi.fn();
    render(<AppSidebar sections={sections} expandedIds={["projects"]} onExpandedChange={onExpandedChange} />);
    expect(screen.getByRole("button", { name: "Alpha" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Projects" }));
    expect(onExpandedChange).toHaveBeenCalledWith([]);
    expect(screen.getByRole("button", { name: "Alpha" })).toBeInTheDocument();
  });

  it("auto-expands the parent of the active item", () => {
    render(<AppSidebar sections={sections} defaultActiveItemId="beta" />);
    expect(screen.getByRole("button", { name: "Projects" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Beta" })).toHaveAttribute("aria-current", "page");
  });

  it("createAction fires its callback", () => {
    const onCreate = vi.fn();
    render(
      <AppSidebar
        defaultExpandedIds={["p"]}
        items={[{ id: "p", label: "Chats", children: [{ id: "c1", label: "C1" }], createAction: { label: "New chat", onClick: onCreate } }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "New chat" }));
    expect(onCreate).toHaveBeenCalledTimes(1);
  });
});

describe("AppSidebar — collapse", () => {
  it("collapse toggle has a name, flips aria-expanded and calls onCollapsedChange", () => {
    const onCollapsedChange = vi.fn();
    const { container } = render(<AppSidebar sections={sections} onCollapsedChange={onCollapsedChange} />);
    const toggle = screen.getByRole("button", { name: "Toggle sidebar" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(toggle);
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(container.querySelector("aside")).toHaveClass("app-sidebar--collapsed");
  });

  it("collapsed rail keeps accessible names on items (labels visually hidden, not removed)", () => {
    render(<AppSidebar sections={sections} defaultCollapsed />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Inbox" })).toBeInTheDocument();
  });

  it("shows a tooltip on focus when collapsed, wired via aria-describedby, and Escape dismisses it", () => {
    render(<AppSidebar sections={sections} defaultCollapsed />);
    const inbox = screen.getByRole("button", { name: "Inbox" });
    fireEvent.focus(inbox);
    const tip = screen.getByRole("tooltip");
    expect(tip).toHaveTextContent("Inbox");
    expect(inbox).toHaveAttribute("aria-describedby", tip.id);
    fireEvent.keyDown(inbox, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("no tooltip when expanded", () => {
    render(<AppSidebar sections={sections} />);
    fireEvent.focus(screen.getByRole("button", { name: "Inbox" }));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("hides the toggle when showCollapseToggle is false", () => {
    render(<AppSidebar sections={sections} showCollapseToggle={false} />);
    expect(screen.queryByRole("button", { name: "Toggle sidebar" })).not.toBeInTheDocument();
  });

  it("publishes --app-sidebar-offset when fixed", () => {
    render(<AppSidebar sections={sections} fixed widthExpanded={280} />);
    expect(document.documentElement.style.getPropertyValue("--app-sidebar-offset")).toBe("280px");
  });

  it("persists collapsed state with persistenceKey", () => {
    // Node's built-in (file-less) localStorage can shadow jsdom's — use an in-memory stub.
    const store = new Map<string, string>();
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => void store.set(k, v),
        removeItem: (k: string) => void store.delete(k),
        clear: () => store.clear(),
      },
    });
    const { unmount } = render(<AppSidebar sections={sections} persistenceKey="sb-test" />);
    fireEvent.click(screen.getByRole("button", { name: "Toggle sidebar" }));
    expect(JSON.parse(window.localStorage.getItem("sb-test")!)).toMatchObject({ collapsed: true });
    unmount();
    const { container } = render(<AppSidebar sections={sections} persistenceKey="sb-test" />);
    expect(container.querySelector("aside")).toHaveClass("app-sidebar--collapsed");
    if (original) Object.defineProperty(window, "localStorage", original);
  });
});

describe("AppSidebar — mobile drawer", () => {
  it("starts collapsed on narrow viewports", () => {
    mockWidth(true);
    const { container } = render(<AppSidebar sections={sections} fixed />);
    expect(container.querySelector("aside")).toHaveClass("app-sidebar--collapsed", "app-sidebar--narrow");
  });

  it("expanded drawer shows a labelled scrim, locks scroll, and Escape closes it", () => {
    mockWidth(true);
    const onCollapsedChange = vi.fn();
    render(<AppSidebar sections={sections} fixed collapsed={false} onCollapsedChange={onCollapsedChange} />);
    const scrim = screen.getByRole("button", { name: "Close navigation" });
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    fireEvent.click(scrim);
    expect(onCollapsedChange).toHaveBeenCalledTimes(2);
  });

  it("closes after navigating when narrow (closeOnNavigateWhenNarrow)", () => {
    mockWidth(true);
    const onCollapsedChange = vi.fn();
    render(<AppSidebar sections={sections} fixed collapsed={false} onCollapsedChange={onCollapsedChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Inbox" }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
  });
});

describe("AppSidebar — footer", () => {
  it("profile row is a named button when user.onClick is set", () => {
    const onClick = vi.fn();
    render(<AppSidebar sections={sections} user={{ name: "Ada Lovelace", role: "Admin", onClick }} />);
    const profile = screen.getByRole("button", { name: "Ada Lovelace, open account menu" });
    fireEvent.click(profile);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("static profile renders as a labelled group", () => {
    render(<AppSidebar sections={sections} user={{ name: "Ada Lovelace" }} />);
    expect(screen.getByRole("group", { name: "Ada Lovelace" })).toBeInTheDocument();
  });

  it("utility actions are labelled icon buttons, capped by maxFooterActions", () => {
    const onHelp = vi.fn();
    render(
      <AppSidebar
        sections={sections}
        footerActions={[
          { id: "help", label: "Help", icon: <svg />, onClick: onHelp },
          { id: "docs", label: "Docs", icon: <svg />, href: "/docs" },
        ]}
        maxFooterActions={1}
      />,
    );
    const group = screen.getByRole("group", { name: "Utility actions" });
    fireEvent.click(within(group).getByRole("button", { name: "Help" }));
    expect(onHelp).toHaveBeenCalledTimes(1);
    expect(within(group).queryByRole("link", { name: "Docs" })).not.toBeInTheDocument();
  });

  it("footerSlot replaces the built-in footer", () => {
    render(<AppSidebar sections={sections} user={{ name: "Ada" }} footerSlot={<p>Custom footer</p>} />);
    expect(screen.getByText("Custom footer")).toBeInTheDocument();
    expect(screen.queryByRole("group", { name: "Ada" })).not.toBeInTheDocument();
  });
});
