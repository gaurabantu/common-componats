import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import Toast, { ToastProvider, useToast } from "./index";
import type { ToastContextValue, ToastProviderProps } from "./Toast.types";

function setup(props: Partial<ToastProviderProps> = {}) {
  const api: { current: ToastContextValue | null } = { current: null };
  function Capture() {
    api.current = useToast();
    return <button type="button">Outside</button>;
  }
  const utils = render(
    <ToastProvider {...props}>
      <Capture />
    </ToastProvider>,
  );
  const show = (opts: Parameters<ToastContextValue["toast"]>[0]) => {
    let id = "";
    act(() => {
      id = api.current!.toast(opts);
    });
    return id;
  };
  return { ...utils, api, show };
}

const region = () => screen.getByRole("region", { name: "Notifications" });
const toastEls = () => Array.from(document.querySelectorAll<HTMLElement>(".ds-toast"));

describe("Toast (presentational)", () => {
  it("renders title and description with no per-toast live role (the region announces)", () => {
    const { container } = render(<Toast title="Saved" description="Your profile was updated." />);
    const el = container.querySelector(".ds-toast")!;
    expect(el).not.toHaveAttribute("role");
    expect(el).not.toHaveAttribute("aria-live");
    expect(screen.queryByRole("status")).toBeNull();
    expect(el).toHaveTextContent("Information: Saved");
    expect(screen.getByText("Your profile was updated.")).toBeInTheDocument();
  });

  it("uses role=alert for danger", () => {
    render(<Toast title="Upload failed" variant="danger" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Error: Upload failed");
  });

  it("renders action and dismiss buttons", () => {
    const onClick = vi.fn();
    const onDismiss = vi.fn();
    render(<Toast title="Archived" action={{ label: "Undo", onClick }} onDismiss={onDismiss} />);
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("hides the close button when not dismissible", () => {
    render(<Toast title="Syncing" dismissible={false} onDismiss={() => {}} />);
    expect(screen.queryByRole("button")).toBeNull();
  });
});

describe("ToastProvider + useToast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("throws outside a provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    function Bad() {
      useToast();
      return null;
    }
    expect(() => render(<Bad />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });

  it("portals a labelled section region into document.body with z-index class and position", () => {
    const { container } = setup({ position: "top-center" });
    const r = region();
    expect(r.tagName).toBe("SECTION");
    expect(container.contains(r)).toBe(false);
    expect(r.parentElement).toBe(document.body);
    expect(r).toHaveAttribute("data-position", "top-center");
  });

  it("the always-mounted region is the polite live container (before any toast exists)", () => {
    const { show } = setup();
    const r = region();
    expect(toastEls()).toHaveLength(0);
    expect(r).toHaveAttribute("aria-live", "polite");
    expect(r).toHaveAttribute("aria-relevant", "additions");
    show({ title: "Saved" });
    expect(region()).toBe(r);
    expect(r).toContainElement(toastEls()[0]);
    expect(toastEls()[0]).not.toHaveAttribute("role");
  });

  it("defaults to bottom-right", () => {
    setup();
    expect(region()).toHaveAttribute("data-position", "bottom-right");
  });

  it("toast() returns an id and renders; auto-dismisses after the default 5000ms", () => {
    const { show } = setup();
    const outside = screen.getByRole("button", { name: "Outside" });
    outside.focus();
    const id = show({ title: "Saved" });
    expect(id).toMatch(/^toast-/);
    expect(region()).toHaveTextContent("Saved");
    expect(outside).toHaveFocus();
    act(() => vi.advanceTimersByTime(4999));
    expect(toastEls()).toHaveLength(1);
    act(() => vi.advanceTimersByTime(1));
    expect(toastEls()[0]).toHaveAttribute("data-state", "closed");
    act(() => vi.advanceTimersByTime(200));
    expect(toastEls()).toHaveLength(0);
  });

  it("honours per-toast duration and Infinity (sticky)", () => {
    const { show } = setup({ duration: 1000 });
    show({ title: "Short", duration: 300 });
    show({ title: "Sticky", duration: Infinity });
    act(() => vi.advanceTimersByTime(600));
    expect(screen.queryByText("Short")).toBeNull();
    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.getByText("Sticky")).toBeInTheDocument();
  });

  it("pauses on hover and resumes with the remaining time", () => {
    const { show } = setup();
    show({ title: "Hover me" });
    act(() => vi.advanceTimersByTime(3000));
    fireEvent.mouseEnter(toastEls()[0]);
    act(() => vi.advanceTimersByTime(10_000));
    expect(toastEls()[0]).toHaveAttribute("data-state", "open");
    fireEvent.mouseLeave(toastEls()[0]);
    act(() => vi.advanceTimersByTime(1999));
    expect(toastEls()[0]).toHaveAttribute("data-state", "open");
    act(() => vi.advanceTimersByTime(1));
    expect(toastEls()[0]).toHaveAttribute("data-state", "closed");
  });

  it("pauses while focus is within the toast", () => {
    const { show } = setup();
    show({ title: "Focus me" });
    const el = toastEls()[0];
    act(() => el.focus());
    act(() => vi.advanceTimersByTime(10_000));
    expect(el).toHaveAttribute("data-state", "open");
    act(() => el.blur());
    act(() => vi.advanceTimersByTime(5000));
    expect(toastEls()[0]).toHaveAttribute("data-state", "closed");
  });

  it("pauses while the document is hidden", () => {
    const { show } = setup();
    show({ title: "Background tab" });
    const spy = vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    act(() => vi.advanceTimersByTime(10_000));
    expect(toastEls()[0]).toHaveAttribute("data-state", "open");
    spy.mockReturnValue("visible");
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    act(() => vi.advanceTimersByTime(5000));
    expect(toastEls()[0]).toHaveAttribute("data-state", "closed");
    spy.mockRestore();
  });

  it("danger toasts are role=alert; others rely on the polite region", () => {
    const { show } = setup();
    show({ title: "Failed", variant: "danger" });
    show({ title: "Done", variant: "success" });
    expect(screen.getByRole("alert")).toHaveTextContent("Failed");
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(screen.queryByRole("status")).toBeNull();
    expect(region()).toHaveTextContent("Done");
  });

  it("a toast with an action and no duration stays open (WCAG 2.2.1)", () => {
    const { show } = setup();
    show({ title: "Archived", action: { label: "Undo", onClick: () => {} } });
    act(() => vi.advanceTimersByTime(60_000));
    expect(toastEls()).toHaveLength(1);
    expect(toastEls()[0]).toHaveAttribute("data-state", "open");
  });

  it("an explicit duration still auto-dismisses a toast with an action", () => {
    const { show } = setup();
    show({ title: "Archived", action: { label: "Undo", onClick: () => {} }, duration: 3000 });
    act(() => vi.advanceTimersByTime(3000));
    expect(toastEls()[0]).toHaveAttribute("data-state", "closed");
  });

  it("limits visible toasts to max and queues the rest", () => {
    const { show, api } = setup({ max: 2 });
    const a = show({ title: "A", duration: Infinity });
    show({ title: "B", duration: Infinity });
    show({ title: "C", duration: Infinity });
    expect(toastEls()).toHaveLength(2);
    expect(screen.queryByText("C")).toBeNull();
    act(() => api.current!.dismiss(a));
    act(() => vi.advanceTimersByTime(200));
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(toastEls()).toHaveLength(2);
  });

  it("dismiss(id) and dismissAll() remove toasts", () => {
    const { show, api } = setup();
    const a = show({ title: "A", duration: Infinity });
    show({ title: "B", duration: Infinity });
    act(() => api.current!.dismiss(a));
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByText("A")).toBeNull();
    act(() => api.current!.dismissAll());
    act(() => vi.advanceTimersByTime(200));
    expect(toastEls()).toHaveLength(0);
  });

  it("updates an existing toast when called with the same id", () => {
    const { show } = setup();
    show({ id: "upload", title: "Uploading…", duration: Infinity });
    show({ id: "upload", title: "Uploaded", variant: "success" });
    expect(toastEls()).toHaveLength(1);
    expect(screen.getByText("Uploaded")).toBeInTheDocument();
  });

  it("close button and action dismiss the toast; action runs its handler", () => {
    const onUndo = vi.fn();
    const { show } = setup();
    show({ title: "Archived", action: { label: "Undo", onClick: onUndo }, duration: Infinity });
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(onUndo).toHaveBeenCalledTimes(1);
    act(() => vi.advanceTimersByTime(200));
    expect(toastEls()).toHaveLength(0);
    show({ title: "Again", duration: Infinity });
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    act(() => vi.advanceTimersByTime(200));
    expect(toastEls()).toHaveLength(0);
  });

  it("dismissible=false hides the close button and ignores Escape", () => {
    const { show } = setup();
    show({ title: "Locked", dismissible: false, duration: Infinity });
    expect(screen.queryByRole("button", { name: "Dismiss" })).toBeNull();
    fireEvent.keyDown(toastEls()[0], { key: "Escape" });
    act(() => vi.advanceTimersByTime(200));
    expect(toastEls()).toHaveLength(1);
  });

  it("F8 focuses the region; Escape dismisses the focused toast and restores focus", () => {
    const { show } = setup();
    const outside = screen.getByRole("button", { name: "Outside" });
    outside.focus();
    show({ title: "One", duration: Infinity });
    show({ title: "Two", duration: Infinity });
    fireEvent.keyDown(document, { key: "F8" });
    expect(region()).toHaveFocus();
    const [first, second] = toastEls();
    act(() => first.focus());
    fireEvent.keyDown(first, { key: "Escape" });
    expect(second).toHaveFocus();
    act(() => vi.advanceTimersByTime(200));
    fireEvent.keyDown(second, { key: "Escape" });
    expect(outside).toHaveFocus();
    act(() => vi.advanceTimersByTime(200));
    expect(toastEls()).toHaveLength(0);
  });

  it("Tabbing in (no F8) still restores focus to the previous element on Escape", () => {
    const { show } = setup();
    const outside = screen.getByRole("button", { name: "Outside" });
    show({ title: "Only", duration: Infinity });
    outside.focus();
    const el = toastEls()[0];
    act(() => {
      fireEvent.focus(el, { relatedTarget: outside });
      el.focus();
    });
    fireEvent.keyDown(el, { key: "Escape" });
    expect(outside).toHaveFocus();
  });

  it("falls back to the region (never body) when there is no previous element", () => {
    const { show } = setup();
    show({ title: "Only", duration: Infinity });
    (document.activeElement as HTMLElement | null)?.blur();
    const el = toastEls()[0];
    act(() => el.focus());
    fireEvent.keyDown(el, { key: "Escape" });
    expect(region()).toHaveFocus();
    expect(document.activeElement).not.toBe(document.body);
  });

  it("toasts are keyboard focusable inside the region", () => {
    const { show } = setup();
    show({ title: "Tab to me" });
    expect(toastEls()[0]).toHaveAttribute("tabindex", "0");
    expect(region()).toHaveAttribute("tabindex", "-1");
  });

  it("removes immediately under prefers-reduced-motion", () => {
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((q: string) => ({
      matches: q.includes("reduce"),
      media: q,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;
    const { show, api } = setup();
    const id = show({ title: "Calm", duration: Infinity });
    act(() => api.current!.dismiss(id));
    expect(toastEls()).toHaveLength(0);
    window.matchMedia = original;
  });

  it("is SSR-safe (renders children, no region, no window access)", () => {
    const html = renderToString(
      <ToastProvider>
        <p>App</p>
      </ToastProvider>,
    );
    expect(html).toContain("App");
    expect(html).not.toContain("Notifications");
  });

  it("marks the region as an allowed focus target for modal overlays", () => {
    render(
      <ToastProvider>
        <span />
      </ToastProvider>,
    );
    expect(document.querySelector(".ds-toast-region")).toHaveAttribute("data-overlay-allow");
  });
});
