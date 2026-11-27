import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardShell, { AppShell } from "./DashboardShell";
import DashboardShellFromIndex from "./index";
import AppTopbar from "../AppTopbar";
import type { AppSidebarSection } from "../AppSidebar/AppSidebar.types";

const sections: AppSidebarSection[] = [
  { id: "s", tier: "primary", grouping: "spacing", items: [{ id: "a", label: "Alpha" }] },
];

function renderShell(props: Partial<React.ComponentProps<typeof DashboardShell>> = {}) {
  return render(
    <DashboardShell sidebar={{ sections, fixed: false }} {...props}>
      <p>Body</p>
    </DashboardShell>,
  );
}

describe("DashboardShell — rendering", () => {
  it("shim path and index export are the same component; AppShell alias still works", () => {
    expect(DashboardShell).toBe(DashboardShellFromIndex);
    expect(AppShell).toBe(DashboardShell);
    expect(DashboardShell.displayName).toBe("DashboardShell");
  });

  it("renders sidebar navigation, topbar and children", () => {
    renderShell({ topbar: <AppTopbar title="Overview" titleAs="h1" /> });
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Overview" })).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("forwards ref and native attributes to the root; className merged last", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <DashboardShell ref={ref} sidebar={{ sections }} className="custom" data-testid="shell">
        x
      </DashboardShell>,
    );
    const root = screen.getByTestId("shell");
    expect(ref.current).toBe(root);
    expect(root).toHaveClass("ds-shell", "custom");
  });

  it("marks fixed rail by default and in-flow when sidebar.fixed=false", () => {
    const { container, rerender } = render(<DashboardShell sidebar={{ sections }}>x</DashboardShell>);
    expect(container.firstElementChild).toHaveAttribute("data-sidebar-fixed", "true");
    expect(container.querySelector(".app-sidebar")).toHaveClass("app-sidebar--fixed");
    rerender(<DashboardShell sidebar={{ sections, fixed: false }}>x</DashboardShell>);
    expect(container.firstElementChild).toHaveAttribute("data-sidebar-fixed", "false");
    expect(container.querySelector(".app-sidebar")).not.toHaveClass("app-sidebar--fixed");
  });

  it("applies legacy slot className/style props", () => {
    const { container } = renderShell({
      topbar: <div>bar</div>,
      insetClassName: "ic",
      insetStyle: { gap: "var(--space-1)" },
      topbarClassName: "tc",
      contentClassName: "cc",
      contentStyle: { padding: "var(--space-2)" },
    });
    expect(container.querySelector(".ds-shell__inset")).toHaveClass("ic");
    expect(container.querySelector(".ds-shell__topbar")).toHaveClass("tc");
    const content = container.querySelector(".ds-shell__content") as HTMLElement;
    expect(content).toHaveClass("cc");
    expect(content.style.padding).toBe("var(--space-2)");
  });

  it("pinTopbar sets sticky=false on AppTopbar; pinTopbar=false leaves it sticky", () => {
    const { container, rerender } = render(
      <DashboardShell sidebar={{ sections }} topbar={<AppTopbar title="T" />}>x</DashboardShell>,
    );
    expect(container.querySelector(".app-topbar")).not.toHaveClass("app-topbar--sticky");
    rerender(
      <DashboardShell sidebar={{ sections }} topbar={<AppTopbar title="T" />} pinTopbar={false}>
        x
      </DashboardShell>,
    );
    expect(container.querySelector(".app-topbar")).toHaveClass("app-topbar--sticky");
  });
});

describe("DashboardShell — a11y", () => {
  it("renders children inside a single main landmark with optional label", () => {
    renderShell({ mainLabel: "Overview page" });
    const main = screen.getByRole("main", { name: "Overview page" });
    expect(main).toContainElement(screen.getByText("Body"));
    expect(screen.getAllByRole("main")).toHaveLength(1);
  });

  it("contentAs='div' drops the landmark (consumer renders its own main)", () => {
    renderShell({ contentAs: "div" });
    expect(screen.queryByRole("main")).toBeNull();
  });

  it("skip link is the first focusable element and targets the main region", () => {
    const { container } = renderShell({ mainId: "page-main" });
    const link = screen.getByRole("link", { name: "Skip to main content" });
    expect(link).toHaveAttribute("href", "#page-main");
    expect(container.querySelector("a, button")).toBe(link);
    expect(screen.getByRole("main")).toHaveAttribute("id", "page-main");
  });

  it("generates a unique main id when mainId is omitted", () => {
    render(
      <>
        <DashboardShell sidebar={{ sections }}>a</DashboardShell>
        <DashboardShell sidebar={{ sections }} contentAs="div">b</DashboardShell>
      </>,
    );
    const links = screen.getAllByRole("link", { name: "Skip to main content" });
    expect(links[0].getAttribute("href")).not.toBe(links[1].getAttribute("href"));
  });

  it("custom label and hideSkipLink", () => {
    const { rerender } = renderShell({ skipLinkLabel: "Skip navigation" });
    expect(screen.getByRole("link", { name: "Skip navigation" })).toBeInTheDocument();
    rerender(
      <DashboardShell sidebar={{ sections }} hideSkipLink>
        x
      </DashboardShell>,
    );
    expect(screen.queryByRole("link", { name: /skip/i })).toBeNull();
  });
});

describe("DashboardShell — interaction", () => {
  it("activating the skip link moves focus to the main region", () => {
    renderShell();
    const link = screen.getByRole("link", { name: "Skip to main content" });
    link.focus();
    fireEvent.click(link);
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("forwards the 768px drawer breakpoint default and respects an override", () => {
    const matchMedia = window.matchMedia;
    const queries: string[] = [];
    window.matchMedia = ((q: string) => {
      queries.push(q);
      return { matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false };
    }) as unknown as typeof window.matchMedia;
    try {
      const { unmount } = render(<DashboardShell sidebar={{ sections }}>x</DashboardShell>);
      expect(queries).toContain("(max-width: 767px)");
      unmount();
      queries.length = 0;
      render(<DashboardShell sidebar={{ sections, drawerOverlayBelowWidth: 640 }}>x</DashboardShell>);
      expect(queries).toContain("(max-width: 639px)");
    } finally {
      window.matchMedia = matchMedia;
    }
  });
});
