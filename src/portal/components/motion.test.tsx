import React from "react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CountUp, MAX_DURATION, MOTION_OK, Reveal } from "./motion";

const originalMatchMedia = window.matchMedia;

/** matchMedia where only the given queries match. */
function mockMedia(matching: string[]) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: matching.includes(query),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe("CountUp", () => {
  it("reduced motion: renders the final value immediately (visual + screen-reader copy)", () => {
    mockMedia(["(prefers-reduced-motion: reduce)"]);
    const { container } = render(<CountUp value={1234} />);
    expect(container.querySelector("[data-countup-digits]")).toHaveTextContent("1,234");
    expect(container.querySelector("[data-countup-digits]")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("1,234", { selector: ".pt-sr-only" })).toBeInTheDocument();
  });

  it("reserves the final width so counting never shifts layout", () => {
    const { container } = render(<CountUp value={72} />);
    expect((container.firstChild as HTMLElement).style.minWidth).toBe("2ch");
  });

  it("motion allowed: starts from 0, screen readers still get the final value, unmount restores it", () => {
    mockMedia([MOTION_OK]);
    const { container, unmount } = render(<CountUp value={500} />);
    const digits = container.querySelector("[data-countup-digits]") as HTMLElement;
    expect(digits.textContent).toBe("0");
    expect(screen.getByText("500", { selector: ".pt-sr-only" })).toBeInTheDocument();
    act(() => unmount());
    expect(digits.textContent).toBe("500");
  });
});

describe("Reveal", () => {
  it("renders content in place (focusable, visible) under reduced motion", () => {
    mockMedia(["(prefers-reduced-motion: reduce)"]);
    render(
      <Reveal as="section" aria-label="Figures" stagger>
        <button data-reveal-item type="button">
          Item
        </button>
      </Reveal>,
    );
    const btn = screen.getByRole("button", { name: "Item" });
    expect(btn.style.opacity).toBe("");
    expect(screen.getByRole("region", { name: "Figures" })).toContainElement(btn);
  });
});

describe("motion budget", () => {
  it("no tween in the portal motion module exceeds MAX_DURATION (≤ 0.6s)", () => {
    expect(MAX_DURATION).toBeLessThanOrEqual(0.6);
    const src = readFileSync(path.join(__dirname, "motion.tsx"), "utf8");
    const durations = [...src.matchAll(/duration:\s*([\d.]+)/g)].map((m) => Number(m[1]));
    expect(durations.length).toBeGreaterThan(0);
    for (const d of durations) expect(d).toBeLessThanOrEqual(MAX_DURATION);
  });

  it("framer transitions in the gallery stay ≤ 0.6s including stagger", () => {
    const src = readFileSync(path.join(__dirname, "../pages/ComponentsPage.tsx"), "utf8");
    const durations = [...src.matchAll(/duration:\s*(?:reduced \? 0 : )?([\d.]+)/g)].map((m) => Number(m[1]));
    expect(durations.length).toBeGreaterThan(0);
    const maxStagger = Number(src.match(/Math\.min\(i, (\d+)\) \* ([\d.]+)/)?.slice(1).reduce((a, b) => String(Number(a) * Number(b))));
    for (const d of durations) expect(d + maxStagger).toBeLessThanOrEqual(0.6);
  });
});
