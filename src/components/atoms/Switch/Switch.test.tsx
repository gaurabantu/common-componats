import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Switch from "./index";

describe("Switch", () => {
  it("toggles with click", async () => {
    const fn = vi.fn();
    render(<Switch defaultChecked={false} onCheckedChange={fn} aria-label="Wi-Fi" />);
    await userEvent.click(screen.getByRole("switch", { name: /wi-fi/i }));
    expect(fn).toHaveBeenCalledWith(true);
  });

  it("respects controlled checked", () => {
    render(<Switch checked aria-label="On" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("is disabled", () => {
    render(<Switch disabled aria-label="Off" />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("associates visible label", () => {
    render(<Switch label="Notifications" defaultChecked />);
    expect(screen.getByRole("switch", { name: /notifications/i })).toHaveAttribute("aria-checked", "true");
  });
});
