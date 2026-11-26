import React from "react";
import fs from "node:fs";
import path from "node:path";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import axe from "axe-core";

const emit = vi.fn();
let channelAvailable = true;
vi.mock("@storybook/preview-api", () => ({
  addons: {
    getChannel: () => {
      if (!channelAvailable) throw new Error("Accessing non-existent addons channel");
      return { emit };
    },
  },
}));
vi.mock("@storybook/core/core-events", () => ({ UPDATE_GLOBALS: "updateGlobals" }));

import {
  SHOWCASE_THEMES,
  SWATCH_GROUPS,
  ThemeScope,
  ThemeShowcase,
  applyGlobalTheme,
  contrastRatio,
  parseCssColor,
  readDocumentTheme,
  resetPendingThemeApply,
  toHex,
} from "./ThemeShowcase.stories";

const ROOT = path.resolve(__dirname, "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

beforeEach(() => {
  resetPendingThemeApply();
  emit.mockClear();
  channelAvailable = true;
  document.documentElement.removeAttribute("data-theme");
});

describe("colour maths", () => {
  it("parses rgb, rgba and color(srgb) computed values", () => {
    expect(parseCssColor("rgb(255, 0, 0)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseCssColor("rgba(0, 0, 0, 0.5)")).toEqual({ r: 0, g: 0, b: 0, a: 0.5 });
    expect(parseCssColor("color(srgb 1 1 1)")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(parseCssColor("color(srgb 0 0.5 1 / 0.25)")).toEqual({ r: 0, g: 128, b: 255, a: 0.25 });
    expect(parseCssColor("var(--x)")).toBeNull();
  });

  it("computes WCAG contrast and hex captions", () => {
    const white = { r: 255, g: 255, b: 255, a: 1 };
    const black = { r: 0, g: 0, b: 0, a: 1 };
    expect(contrastRatio(white, black)).toBeCloseTo(21, 5);
    expect(contrastRatio(white, { r: 0x8a, g: 0x8a, b: 0x8a, a: 1 })).toBeCloseTo(3.45, 1);
    expect(toHex({ r: 13, g: 13, b: 13, a: 1 })).toBe("#0D0D0D");
    expect(toHex({ r: 255, g: 255, b: 255, a: 0.5 })).toBe("#FFFFFF80");
  });
});

describe("ThemeScope", () => {
  it("sets the theme on a nested element (classic for the default theme)", () => {
    const { container, rerender } = render(<ThemeScope theme="infinia-dark">x</ThemeScope>);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute("data-theme", "infinia-dark");
    expect(el).toHaveClass("ts-scope");
    rerender(<ThemeScope theme="light">x</ThemeScope>);
    expect(container.firstElementChild).toHaveAttribute("data-theme", "classic");
  });

  it("renders a span when used inside a button", () => {
    const { container } = render(
      <ThemeScope theme="dark" as="span">
        x
      </ThemeScope>,
    );
    expect(container.firstElementChild!.tagName).toBe("SPAN");
  });

  it("tokens.css re-declares the base palette on any nested [data-theme] (contract the scope relies on)", () => {
    const css = read("src/design-system/tokens.css").replace(/\/\*[\s\S]*?\*\//g, "");
    const base = /([^{}]*)\{[^{}]*--color-bg-page:/.exec(css)?.[1] ?? "";
    expect(base).toMatch(/\[data-theme\]/);
  });
});

describe("ThemeShowcase", () => {
  it("renders all ten themes as tiles and marks the document theme as active", () => {
    document.documentElement.setAttribute("data-theme", "infinia-dark");
    render(<ThemeShowcase sections={["compare"]} />);
    const tiles = screen.getAllByRole("button", { name: /theme, (light|dark)/ });
    expect(tiles).toHaveLength(10);
    expect(SHOWCASE_THEMES.map((t) => t.id)).toEqual([
      "light",
      "blue",
      "dark",
      "green",
      "mist",
      "custom",
      "blue-mist",
      "green-mist",
      "infinia-light",
      "infinia-dark",
    ]);
    const active = tiles.filter((t) => t.getAttribute("aria-pressed") === "true");
    expect(active).toHaveLength(1);
    expect(active[0]).toHaveAccessibleName(/^Infinia dark theme, dark, active/);
    // each tile previews its own theme
    expect(tiles[2].querySelector('[data-ts-scope="dark"]')).not.toBeNull();
  });

  it("selecting a tile updates the Storybook theme global and announces it", async () => {
    render(<ThemeShowcase sections={["compare"]} />);
    fireEvent.click(screen.getByRole("button", { name: /^Dark theme/ }));
    expect(emit).toHaveBeenCalledWith("updateGlobals", { globals: { theme: "dark" } });
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Dark theme applied to every page."));
  });

  it("replays the announcement and tile focus when Storybook remounts the story after a theme change", async () => {
    const first = render(<ThemeShowcase sections={["compare"]} />);
    fireEvent.click(screen.getByRole("button", { name: /^Custom rose theme/ }));
    first.unmount(); // the preview decorator re-creates its wrapper on a globals update
    document.documentElement.setAttribute("data-theme", "custom");
    render(<ThemeShowcase sections={["compare"]} />);
    const tile = screen.getByRole("button", { name: /^Custom rose theme/ });
    expect(tile).toHaveFocus();
    expect(tile).toHaveAttribute("aria-pressed", "true");
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Custom rose theme applied to every page."));
  });

  it("without a Storybook channel it falls back to <html data-theme> and follows the attribute", async () => {
    channelAvailable = false;
    render(<ThemeShowcase sections={["signature", "compare"]} />);
    fireEvent.click(screen.getByRole("button", { name: /^Green \+ mist theme/ }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("green-mist");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /^Green \+ mist theme/ })).toHaveAttribute("aria-pressed", "true"),
    );
    expect(screen.getByRole("heading", { level: 2, name: "Green + mist" })).toBeInTheDocument();
    await act(async () => applyGlobalTheme("light"));
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
    expect(readDocumentTheme()).toBe("light");
  });

  it("swatch click copies the token and confirms in a polite live region", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    render(<ThemeShowcase sections={["palette"]} />);
    const swatch = screen.getByRole("button", { name: /^--color-bg-surface/ });
    fireEvent.click(swatch);
    expect(writeText).toHaveBeenCalledWith("var(--color-bg-surface)");
    expect(swatch).toHaveAttribute("aria-pressed", "true");
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    await waitFor(() => expect(status).toHaveTextContent("Copied var(--color-bg-surface)"));
    expect(within(screen.getByRole("complementary", { name: "Selected token" })).getByText("--color-bg-surface")).toBeInTheDocument();
  });

  it("underline tabs filter the palette groups", () => {
    render(<ThemeShowcase sections={["palette"]} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(SWATCH_GROUPS.length);
    fireEvent.click(screen.getByRole("tab", { name: "Status" }));
    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual(["Status"]);
  });

  it("state matrix covers default, hover, selected, pressed, focus-visible and disabled", () => {
    render(<ThemeShowcase sections={["states"]} />);
    const table = screen.getByRole("table");
    const headers = within(table).getAllByRole("columnheader").map((h) => h.textContent);
    expect(headers).toEqual(["Element", "Default", "Hover", "Selected", "Pressed", "Focus-visible", "Disabled"]);
    // the matrix scroll region is keyboard reachable
    expect(screen.getByRole("region", { name: /Interaction state matrix/ })).toHaveAttribute("tabindex", "0");
    // live library components are present
    expect(screen.getByRole("tablist", { name: "Example sections" })).toBeInTheDocument();
    expect(screen.getByRole("radiogroup", { name: "Date range" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Locked" })).toBeDisabled();
  });

  it("has no axe violations (structure / ARIA; colour is checked in the browser)", async () => {
    const { container } = render(<ThemeShowcase />);
    const res = await axe.run(container, {
      rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
    });
    expect(res.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
});
