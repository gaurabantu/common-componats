import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { enableThemedTitles } from "./themedTitles";

let dispose: () => void;
const tip = () => document.getElementById("ucs-title-tip") as HTMLElement;

function pointer(type: string, target: Element, related?: Element | null) {
  const e = new MouseEvent(type, { bubbles: true, clientX: 10, clientY: 10, relatedTarget: related ?? null });
  Object.defineProperty(e, "pointerType", { value: "mouse" });
  target.dispatchEvent(e);
}

beforeEach(() => {
  vi.useFakeTimers();
  document.body.innerHTML = '<div id="cell" title="Investment Property Depreciation"><span id="inner">Inv…</span></div><p id="other">x</p>';
  dispose = enableThemedTitles({ delay: 100 });
});
afterEach(() => {
  dispose();
  vi.useRealTimers();
});

describe("enableThemedTitles", () => {
  it("swaps the native title for the themed tooltip on hover and restores it on leave", () => {
    const cell = document.getElementById("cell")!;
    pointer("pointerover", document.getElementById("inner")!);
    expect(cell.hasAttribute("title")).toBe(false);
    expect(cell.getAttribute("aria-describedby")).toBe("ucs-title-tip");
    expect(tip().hidden).toBe(true);
    vi.advanceTimersByTime(100);
    expect(tip().hidden).toBe(false);
    expect(tip().textContent).toBe("Investment Property Depreciation");
    expect(tip().getAttribute("role")).toBe("tooltip");

    pointer("pointerout", cell, document.getElementById("other"));
    expect(tip().hidden).toBe(true);
    expect(cell.getAttribute("title")).toBe("Investment Property Depreciation");
    expect(cell.hasAttribute("aria-describedby")).toBe(false);
  });

  it("moving inside the owner keeps it open; Escape closes", () => {
    const cell = document.getElementById("cell")!;
    pointer("pointerover", cell);
    vi.advanceTimersByTime(100);
    pointer("pointerout", cell, document.getElementById("inner"));
    expect(tip().hidden).toBe(false);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(tip().hidden).toBe(true);
    expect(cell.getAttribute("title")).toBe("Investment Property Depreciation");
  });

  it("dispose removes the tooltip element", () => {
    dispose();
    expect(tip()).toBeNull();
    dispose = () => {};
  });
});
