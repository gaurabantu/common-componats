import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  __resetThemeForTests,
  getThemeState,
  initTheme,
  registerTheme,
  setTheme,
  subscribeTheme,
  toggleThemeMode,
} from "./themeController";
import { ThemeModeIcon, ThemePicker, ThemeToggle, useTheme } from "./ThemeProvider";

const html = () => document.documentElement;

function mockSystemDark(dark: boolean) {
  const listeners = new Set<() => void>();
  const mql = {
    matches: dark,
    media: "(prefers-color-scheme: dark)",
    addEventListener: (_: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
  };
  vi.stubGlobal("matchMedia", vi.fn(() => mql));
  window.matchMedia = globalThis.matchMedia as typeof window.matchMedia;
  return {
    flip(next: boolean) {
      mql.matches = next;
      listeners.forEach((l) => l());
    },
  };
}

function installMemoryStorage() {
  const data = new Map<string, string>();
  const storage = {
    get length() { return data.size; },
    clear: () => data.clear(),
    getItem: (k: string) => (data.has(k) ? data.get(k)! : null),
    setItem: (k: string, v: string) => void data.set(k, String(v)),
    removeItem: (k: string) => void data.delete(k),
    key: (i: number) => [...data.keys()][i] ?? null,
  };
  Object.defineProperty(window, "localStorage", { configurable: true, value: storage });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: storage });
}

beforeEach(() => {
  __resetThemeForTests();
  installMemoryStorage();
  html().removeAttribute("data-theme");
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("theme controller", () => {
  it("applies the default theme as data-theme + color-scheme", () => {
    const s = initTheme({ defaultTheme: "infinia-light" });
    expect(html().getAttribute("data-theme")).toBe("infinia-light");
    expect(html().style.colorScheme).toBe("light");
    expect(s.theme.id).toBe("infinia-light");
  });

  it("classic removes the attribute", () => {
    initTheme({ defaultTheme: "infinia-dark" });
    setTheme("classic");
    expect(html().hasAttribute("data-theme")).toBe(false);
  });

  it("remembers the choice and restores it on the next init", () => {
    initTheme({ defaultTheme: "infinia-light" });
    setTheme("infinia-dark");
    expect(localStorage.getItem("ucs-theme")).toBe("infinia-dark");
    __resetThemeForTests();
    initTheme({ defaultTheme: "infinia-light" });
    expect(html().getAttribute("data-theme")).toBe("infinia-dark");
  });

  it("ignores stored or requested themes outside `allowed`", () => {
    localStorage.setItem("ucs-theme", "custom");
    initTheme({ defaultTheme: "infinia-light", allowed: ["infinia-light", "infinia-dark"] });
    expect(getThemeState().theme.id).toBe("infinia-light");
    setTheme("green");
    expect(getThemeState().theme.id).toBe("infinia-light");
    expect(getThemeState().themes.map((t) => t.id)).toEqual(["infinia-light", "infinia-dark"]);
  });

  it("storageKey null disables persistence", () => {
    initTheme({ defaultTheme: "infinia-light", storageKey: null });
    setTheme("dark");
    expect(localStorage.length).toBe(0);
  });

  it("system follows the OS and the configured pair", () => {
    const os = mockSystemDark(false);
    initTheme({ defaultTheme: "system", system: { light: "infinia-light", dark: "infinia-dark" } });
    expect(html().getAttribute("data-theme")).toBe("infinia-light");
    act(() => os.flip(true));
    expect(html().getAttribute("data-theme")).toBe("infinia-dark");
    expect(getThemeState().preference).toBe("system");
  });

  it("notifies subscribers and keeps a stable snapshot between changes", () => {
    initTheme({ defaultTheme: "infinia-light" });
    const seen: string[] = [];
    const off = subscribeTheme((s) => seen.push(s.theme.id));
    const a = getThemeState();
    expect(getThemeState()).toBe(a);
    setTheme("infinia-dark");
    off();
    setTheme("classic");
    expect(seen).toEqual(["infinia-dark"]);
  });

  it("registerTheme adds an app theme", () => {
    registerTheme({ id: "acme", label: "Acme", mode: "light", dataTheme: "acme" });
    initTheme({ defaultTheme: "acme" });
    expect(html().getAttribute("data-theme")).toBe("acme");
  });
});

describe("ThemePicker / useTheme", () => {
  function Probe() {
    const { theme } = useTheme();
    return <span data-testid="probe">{theme.id}</span>;
  }

  it("lists the offered themes and switches on change", async () => {
    initTheme({ defaultTheme: "infinia-light" });
    render(
      <>
        <ThemePicker themes={["infinia-light", "infinia-dark"]} />
        <Probe />
      </>,
    );
    const select = screen.getByRole("combobox");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Infinia light", "Infinia dark"]);
    await userEvent.selectOptions(select, "infinia-dark");
    expect(html().getAttribute("data-theme")).toBe("infinia-dark");
    expect(screen.getByTestId("probe").textContent).toBe("infinia-dark");
  });
});

describe("light / dark toggle", () => {
  it("flips each theme with its pair", () => {
    initTheme({ defaultTheme: "infinia-light" });
    expect(toggleThemeMode().theme.id).toBe("infinia-dark");
    expect(toggleThemeMode().theme.id).toBe("infinia-light");
    setTheme("green");
    expect(toggleThemeMode().theme.id).toBe("dark");
    expect(toggleThemeMode().theme.id).toBe("classic");
  });

  it("does nothing when the counterpart is not allowed", () => {
    initTheme({ defaultTheme: "infinia-light", allowed: ["infinia-light"] });
    expect(toggleThemeMode().theme.id).toBe("infinia-light");
  });

  it("ThemeToggle switches mode, swaps icon and label; hidden without a counterpart", async () => {
    initTheme({ defaultTheme: "infinia-light", allowed: ["infinia-light", "infinia-dark"] });
    const { container, unmount } = render(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: "Switch to dark theme" });
    expect(container.querySelector("[data-theme-icon]")?.getAttribute("data-theme-icon")).toBe("moon");
    await userEvent.click(btn);
    expect(html().getAttribute("data-theme")).toBe("infinia-dark");
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeTruthy();
    expect(container.querySelector("[data-theme-icon]")?.getAttribute("data-theme-icon")).toBe("sun");
    unmount();

    __resetThemeForTests();
    initTheme({ defaultTheme: "infinia-light", allowed: ["infinia-light"] });
    const { container: c2 } = render(<ThemeToggle />);
    expect(c2.querySelector("button")).toBeNull();
  });

  it("ThemeModeIcon show=current reflects the active mode", () => {
    initTheme({ defaultTheme: "infinia-dark" });
    const { container } = render(<ThemeModeIcon show="current" />);
    expect(container.querySelector("svg")?.getAttribute("data-theme-icon")).toBe("moon");
  });
});
