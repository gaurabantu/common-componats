import React from "react";
import { renderToString } from "react-dom/server";
import { render } from "@testing-library/react";
import Kbd, { detectIsMac, formatShortcut, resolveKey, toAriaKeyShortcuts } from "./index";

function setPlatform(value: string) {
  Object.defineProperty(window.navigator, "platform", { value, configurable: true });
}

describe("Kbd rendering", () => {
  it("renders children inside a <kbd>", () => {
    const { container } = render(<Kbd>Esc</Kbd>);
    const kbd = container.querySelector("kbd.ds-kbd");
    expect(kbd).toBeInTheDocument();
    expect(kbd).toHaveTextContent("Esc");
    expect(kbd).toHaveAttribute("data-size", "sm");
  });

  it("renders a combo as nested <kbd> elements with decorative separators", () => {
    const { container } = render(<Kbd keys={["shift", "enter"]} platform="other" size="md" />);
    const outer = container.querySelector("kbd.ds-kbd")!;
    expect(outer).toHaveAttribute("data-size", "md");
    expect(outer.querySelectorAll("kbd.ds-kbd__key")).toHaveLength(2);
    const sep = outer.querySelector(".ds-kbd__sep")!;
    expect(sep).toHaveTextContent("+");
    expect(sep).toHaveAttribute("aria-hidden", "true");
  });

  it("supports a custom separator and none", () => {
    const { container, rerender } = render(<Kbd keys={["mod", "k"]} platform="other" separator="then" />);
    expect(container.querySelector(".ds-kbd__sep")).toHaveTextContent("then");
    rerender(<Kbd keys={["mod", "k"]} platform="other" separator="" />);
    expect(container.querySelector(".ds-kbd__sep")).toBeNull();
  });

  it("forwards ref and merges className", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Kbd ref={ref} className="extra" keys={["k"]} />);
    expect(ref.current?.tagName).toBe("KBD");
    expect(ref.current).toHaveClass("ds-kbd", "extra");
  });
});

describe("Kbd platform awareness", () => {
  const original = window.navigator.platform;
  afterEach(() => setPlatform(original));

  it("mod → ⌘ with spoken 'Command' on mac", () => {
    const { container } = render(<Kbd keys={["mod", "k"]} platform="mac" />);
    const keys = container.querySelectorAll("kbd.ds-kbd__key");
    expect(keys[0].querySelector("[aria-hidden='true']")).toHaveTextContent("⌘");
    expect(keys[0].querySelector(".ds-kbd__sr")).toHaveTextContent("Command");
    expect(keys[1]).toHaveTextContent("K");
    expect(container.querySelector(".ds-kbd")).toHaveAttribute("data-shortcut", "Meta+K");
  });

  it("mod → Ctrl elsewhere", () => {
    const { container } = render(<Kbd keys={["mod", "k"]} platform="other" />);
    expect(container.querySelector(".ds-kbd")).toHaveTextContent(/Ctrl/);
    expect(container.querySelector(".ds-kbd")).toHaveAttribute("data-shortcut", "Control+K");
  });

  it("auto detects mac on the client", () => {
    setPlatform("MacIntel");
    expect(detectIsMac()).toBe(true);
    const { container } = render(<Kbd keys={["mod", "k"]} />);
    expect(container.querySelector(".ds-kbd")).toHaveAttribute("data-platform", "mac");
  });

  it("auto falls back to Ctrl on non-Apple platforms", () => {
    setPlatform("Win32");
    expect(detectIsMac()).toBe(false);
    const { container } = render(<Kbd keys={["mod", "k"]} />);
    expect(container.querySelector(".ds-kbd")).toHaveAttribute("data-platform", "other");
  });

  it("is SSR-safe: server render uses the non-mac snapshot", () => {
    setPlatform("MacIntel");
    const html = renderToString(<Kbd keys={["mod", "k"]} />);
    expect(html).toContain('data-platform="other"');
    expect(html).toContain("Ctrl");
  });
});

describe("Kbd utils", () => {
  it("resolveKey maps named keys and upper-cases letters", () => {
    expect(resolveKey("enter", false)).toEqual({ display: "↵", spoken: "Enter", aria: "Enter" });
    expect(resolveKey("alt", true)).toEqual({ display: "⌥", spoken: "Option", aria: "Alt" });
    expect(resolveKey("p", false)).toEqual({ display: "P", spoken: "P", aria: "P" });
    expect(resolveKey("F5", false).display).toBe("F5");
  });

  it("formatShortcut and toAriaKeyShortcuts", () => {
    expect(formatShortcut(["mod", "shift", "p"], true)).toBe("⌘⇧P");
    expect(formatShortcut(["mod", "shift", "p"], false)).toBe("Ctrl+Shift+P");
    expect(toAriaKeyShortcuts(["mod", "k"], true)).toBe("Meta+K");
    expect(toAriaKeyShortcuts(["mod", "k"], false)).toBe("Control+K");
  });
});
