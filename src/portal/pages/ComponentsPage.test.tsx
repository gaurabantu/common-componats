import React from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../navigation", () => ({
  portalLinkProps: (title: string) => ({ href: `./?path=/docs/${title}`, target: "_top", onClick: () => {} }),
  managerHref: (t: string) => t,
  docsId: (t: string) => t,
  navigateTo: () => {},
}));

import { ComponentsPage, filterItems, importLine, importNames } from "./ComponentsPage";
import { ALL_ITEMS, COMPONENT_TOTAL } from "../components/dashboardData";
import { INVENTORY } from "../data";

/** The gallery's own result-count live region (the search field has its own status too). */
function countRegion() {
  const el = screen.getAllByRole("status").find((n) => /^Showing /.test(n.textContent ?? ""));
  if (!el) throw new Error("no count region");
  return el;
}

function cards() {
  return screen.getAllByRole("button", { pressed: false }).concat(screen.queryAllByRole("button", { pressed: true }));
}

describe("ComponentsPage — rendering", () => {
  it("renders one card per inventory row with name, status and docs link", () => {
    const { container } = render(<ComponentsPage />);
    expect(container.querySelectorAll(".pt-gcard")).toHaveLength(ALL_ITEMS.length);
    expect(screen.getByRole("heading", { level: 1, name: "Components" })).toBeInTheDocument();
    expect(screen.getByText(`${COMPONENT_TOTAL} components`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Button documentation" })).toHaveAttribute("href", expect.stringContaining("Design System/Atoms/Button"));
  });

  it("previews are pictures: inert + aria-hidden, nothing inside is focusable by AT", () => {
    const { container } = render(<ComponentsPage />);
    const previews = container.querySelectorAll(".pt-gcard__preview");
    expect(previews.length).toBe(ALL_ITEMS.length + 1); // + detail panel
    previews.forEach((p) => {
      expect(p).toHaveAttribute("aria-hidden", "true");
      expect(p.hasAttribute("inert")).toBe(true);
    });
  });

  it("first item is selected and shown in the detail panel with props + import", () => {
    render(<ComponentsPage />);
    const panel = screen.getByRole("complementary", { name: ALL_ITEMS[0].name });
    expect(within(panel).getByText(/import \{ Button \} from "ui-common-components";/)).toBeInTheDocument();
    expect(within(panel).getByRole("region", { name: "Button props" })).toBeInTheDocument();
    const props = within(panel).getByRole("region", { name: "Button props" });
    expect(within(props).getByText("variant", { selector: "code" })).toBeInTheDocument();
    expect(within(panel).getByRole("heading", { name: "Variants" })).toBeInTheDocument();
  });
});

describe("ComponentsPage — a11y", () => {
  it("category tabs form an APG tablist with an accessible name", () => {
    render(<ComponentsPage />);
    const list = screen.getByRole("tablist", { name: "Component categories" });
    expect(within(list).getAllByRole("tab")).toHaveLength(INVENTORY.length + 1);
    expect(within(list).getByRole("tab", { name: `All (${ALL_ITEMS.length})` })).toHaveAttribute("aria-selected", "true");
  });

  it("card select buttons expose pressed state and control the detail panel", () => {
    render(<ComponentsPage />);
    const btn = screen.getByRole("button", { name: "Button", pressed: true });
    expect(btn).toHaveAttribute("aria-controls", "pt-detail");
    expect(document.getElementById("pt-detail")).not.toBeNull();
  });

  it("search is labelled and the result count is a polite live region", () => {
    render(<ComponentsPage />);
    expect(screen.getByRole("searchbox", { name: "Search components" })).toBeInTheDocument();
    expect(countRegion()).toHaveTextContent(`Showing ${ALL_ITEMS.length} of ${ALL_ITEMS.length}`);
    expect(countRegion()).toHaveAttribute("aria-live", "polite");
  });
});

describe("ComponentsPage — interaction", () => {
  it("clicking a card selects it and updates the panel", () => {
    render(<ComponentsPage />);
    fireEvent.click(screen.getByRole("button", { name: "Slider", pressed: false }));
    expect(screen.getByRole("button", { name: "Slider", pressed: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Button", pressed: false })).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Slider" })).toBeInTheDocument();
  });

  it("category tab filters the grid and keeps the selection inside it", async () => {
    const { container } = render(<ComponentsPage />);
    fireEvent.click(screen.getByRole("tab", { name: /^Overlays/ }));
    const overlays = INVENTORY.find((g) => g.id === "overlays")!;
    // Framer keeps exiting cards mounted for their (≤ 150ms) exit animation.
    await waitFor(() => expect(container.querySelectorAll(".pt-gcard")).toHaveLength(overlays.items.length));
    expect(countRegion()).toHaveTextContent(`Showing ${overlays.items.length} of ${ALL_ITEMS.length}`);
    expect(screen.getByRole("complementary", { name: overlays.items[0].name })).toBeInTheDocument();
  });

  it("search narrows results; no match shows an empty state whose reset restores all", async () => {
    const { container } = render(<ComponentsPage />);
    const input = screen.getByRole("searchbox", { name: "Search components" });
    fireEvent.change(input, { target: { value: "spinbutton" } });
    await waitFor(() => expect(container.querySelectorAll(".pt-gcard")).toHaveLength(1));
    fireEvent.change(input, { target: { value: "zzzz-no-such-thing" } });
    expect(await screen.findByText("No components match")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    await waitFor(() => expect(container.querySelectorAll(".pt-gcard")).toHaveLength(ALL_ITEMS.length));
  });

  it("keyboard: card buttons are native buttons (Enter / Space activate via click)", () => {
    render(<ComponentsPage />);
    const btn = screen.getByRole("button", { name: "Kbd", pressed: false });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn).toHaveAttribute("type", "button");
    expect(cards().length).toBeGreaterThan(ALL_ITEMS.length - 1);
  });
});

describe("helpers", () => {
  it("importNames splits merged rows", () => {
    expect(importNames("Badge / Chip / Tag")).toEqual(["Badge", "Chip", "Tag"]);
    expect(importNames("LineChart · AreaChart")).toEqual(["LineChart", "AreaChart"]);
  });

  it("importLine uses the subpath and the replacement for legacy aliases", () => {
    const chart = ALL_ITEMS.find((i) => i.name === "ComposedChart")!;
    expect(importLine(chart)).toBe('import { ComposedChart } from "ui-common-components/charts";');
    const legacy = ALL_ITEMS.find((i) => i.status === "legacy")!;
    expect(importLine(legacy)).toContain(legacy.replacement);
  });

  it("filterItems matches name and description, case-insensitive", () => {
    expect(filterItems(ALL_ITEMS, "all", "SPINBUTTON").map((i) => i.name)).toEqual(["NumberInput"]);
    expect(filterItems(ALL_ITEMS, "shell", "").every((i) => i.group === "shell")).toBe(true);
  });
});
