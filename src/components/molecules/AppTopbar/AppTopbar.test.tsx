import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppTopbar from "./index";

const dot = (
  <svg viewBox="0 0 24 24" aria-hidden>
    <circle cx="12" cy="12" r="4" fill="currentColor" />
  </svg>
);

describe("AppTopbar", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query) =>
        ({
          matches: false,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }) as MediaQueryList
    );
  });

  it("renders title", () => {
    render(<AppTopbar title="Revenue" responsive={false} />);
    expect(screen.getByRole("heading", { level: 1, name: "Revenue" })).toBeInTheDocument();
  });

  it("focuses search on / and Cmd+K", async () => {
    const user = userEvent.setup();
    render(
      <AppTopbar
        title="App"
        search={{ placeholder: "Find…", inputId: "top-search" }}
        responsive={false}
      />
    );
    const input = screen.getByRole("searchbox");
    expect(input).toHaveAttribute("id", "top-search");

    await user.keyboard("/");
    expect(document.activeElement).toBe(input);

    (input as HTMLInputElement).blur();
    await user.keyboard("{Meta>}k{/Meta}");
    expect(document.activeElement).toBe(input);
  });

  it("renders action with badge in accessible name", () => {
    render(
      <AppTopbar
        title="Inbox"
        actions={[{ id: "n", icon: dot, label: "Notifications", badgeCount: 2, onClick: () => {} }]}
        responsive={false}
      />
    );
    expect(screen.getByRole("button", { name: /notifications,\s*2 unread/i })).toBeInTheDocument();
  });

  it("opens popover menu when narrow and mobileMenuItems set", async () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query) =>
        ({
          matches: String(query).includes("1023"),
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }) as MediaQueryList
    );
    const user = userEvent.setup();
    const onPick = vi.fn();
    render(
      <AppTopbar
        title="Labs"
        mobileMenuItems={[
          { id: "a", label: "Account", onClick: onPick },
          { id: "b", label: "Help", href: "/help" },
        ]}
      />
    );
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    await user.click(screen.getByRole("menuitem", { name: "Account" }));
    expect(onPick).toHaveBeenCalledTimes(1);
  });

  it("calls onMobileMenuClick when narrow and no menu items", async () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query) =>
        ({
          matches: String(query).includes("1023"),
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }) as MediaQueryList
    );
    const onMenu = vi.fn();
    const user = userEvent.setup();
    render(
      <AppTopbar title="Labs" onMobileMenuClick={onMenu} collapseCenterBelowWidth={1024} search={{}} />
    );
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(onMenu).toHaveBeenCalledTimes(1);
  });
});
