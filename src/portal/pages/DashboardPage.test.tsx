import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../navigation", () => ({
  portalLinkProps: (title: string) => ({ href: `./?path=/docs/${title}`, target: "_top", onClick: () => {} }),
  managerHref: (t: string) => t,
  docsId: (t: string) => t,
  navigateTo: () => {},
}));

import { DashboardPage } from "./DashboardPage";
import { COMPONENT_TOTAL, STATS } from "../components/dashboardData";
import { COMPLIANCE_REVIEWS, RELEASES, THEMES } from "../data";

describe("DashboardPage", () => {
  it("hero: title, chips and the primary CTA to the Components gallery", () => {
    render(<DashboardPage />);
    expect(screen.getByRole("heading", { level: 2, name: "Infinia Design System" })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Library facts" })).toHaveTextContent(`${THEMES.length} themes`);
    expect(screen.getByRole("link", { name: /Browse components/ })).toHaveAttribute("href", expect.stringContaining("Overview/Components"));
  });

  it("KPI tiles expose the final values to assistive tech (reduced motion in jsdom)", () => {
    render(<DashboardPage />);
    const kpis = screen.getByRole("region", { name: "Key figures" });
    expect(within(kpis).getByText(String(COMPONENT_TOTAL), { selector: ".pt-sr-only" })).toBeInTheDocument();
    expect(within(kpis).getByText(String(RELEASES.length), { selector: ".pt-sr-only" })).toBeInTheDocument();
    expect(within(kpis).getByText(`/ ${COMPLIANCE_REVIEWS.length}`)).toBeInTheDocument();
    if (STATS.tests) expect(within(kpis).getByText(STATS.tests.passed.toLocaleString("en-US"), { selector: ".pt-sr-only" })).toBeInTheDocument();
  });

  it("every chart is a named figure with a data-table fallback and a source line", () => {
    const { container } = render(<DashboardPage />);
    const figures = container.querySelectorAll("figure.pt-chart");
    expect(figures).toHaveLength(5);
    figures.forEach((f) => {
      expect(f.getAttribute("aria-labelledby")).toBeTruthy();
      expect(f.querySelector("table th[scope='col']")).not.toBeNull();
      expect(f.querySelector("figcaption")?.textContent).toMatch(/^Source:/);
      expect(f.querySelector(".pt-chart__frame")).toHaveAttribute("aria-hidden", "true");
    });
    expect(screen.getByRole("figure", { name: "Compliance by dimension" })).toBeInTheDocument();
  });

  it("releases timeline lists the latest releases with the current one marked", () => {
    render(<DashboardPage />);
    const section = screen.getByRole("region", { name: "Recent releases" });
    expect(within(section).getAllByRole("listitem")).toHaveLength(Math.min(5, RELEASES.length));
    expect(within(section).getByText("Current")).toBeInTheDocument();
  });

  it("what's new cards link to component stories", () => {
    render(<DashboardPage />);
    const list = screen.getByRole("list", { name: "New components" });
    const links = within(list).getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    links.forEach((a) => expect(a.getAttribute("href")).toMatch(/Design System\//));
  });
});
