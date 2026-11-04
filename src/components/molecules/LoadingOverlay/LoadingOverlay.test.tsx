import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LoadingOverlay from "./index";

describe("LoadingOverlay", () => {
  it("renders nothing when visible={false}", () => {
    const { container } = render(<LoadingOverlay visible={false} />);
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("blocking (default): covers the parent, announces the default label, marks the parent busy", () => {
    const { container, rerender } = render(
      <div data-testid="host" style={{ position: "relative" }}>
        <LoadingOverlay />
      </div>,
    );
    const overlay = container.querySelector(".ds-loading-overlay") as HTMLElement;
    expect(overlay).toHaveAttribute("data-blocking", "true");
    expect(overlay).toHaveAttribute("data-fullscreen", "false");
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
    expect(screen.getByTestId("host")).toHaveAttribute("aria-busy", "true");

    rerender(
      <div data-testid="host" style={{ position: "relative" }}>
        <LoadingOverlay visible={false} />
      </div>,
    );
    expect(screen.getByTestId("host")).not.toHaveAttribute("aria-busy");
  });

  it("restores a pre-existing aria-busy value on the parent", () => {
    const { rerender } = render(
      <div data-testid="host" aria-busy="false">
        <LoadingOverlay />
      </div>,
    );
    expect(screen.getByTestId("host")).toHaveAttribute("aria-busy", "true");
    rerender(
      <div data-testid="host" aria-busy="false">
        <LoadingOverlay visible={false} />
      </div>,
    );
    expect(screen.getByTestId("host")).toHaveAttribute("aria-busy", "false");
  });

  it("shows a visible label as the status text", () => {
    render(<LoadingOverlay label="Loading exclusions…" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading exclusions…");
    expect(screen.getByText("Loading exclusions…")).toHaveClass("ds-loading-overlay__label");
  });

  it("uses ariaLabel as visually hidden text when there is no label", () => {
    render(<LoadingOverlay ariaLabel="Saving" />);
    expect(screen.getByText("Saving")).toHaveClass("sr-only");
  });

  it("non-blocking veil: data-blocking=false, does not mark the parent busy or take focus", () => {
    render(
      <div data-testid="host">
        <button type="button">Cell</button>
        <LoadingOverlay blocking={false} label="Recalculating…" />
      </div>,
    );
    const button = screen.getByRole("button", { name: "Cell" });
    button.focus();
    const overlay = document.querySelector(".ds-loading-overlay") as HTMLElement;
    expect(overlay).toHaveAttribute("data-blocking", "false");
    expect(screen.getByTestId("host")).not.toHaveAttribute("aria-busy");
    expect(document.activeElement).toBe(button);
    expect(overlay.querySelector("[tabindex]")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("Recalculating…");
  });

  it("fullScreen portals to document.body and does not touch the parent", () => {
    render(
      <div data-testid="host">
        <LoadingOverlay fullScreen />
      </div>,
    );
    const overlay = document.querySelector(".ds-loading-overlay") as HTMLElement;
    expect(overlay.parentElement).toBe(document.body);
    expect(overlay).toHaveAttribute("data-fullscreen", "true");
    expect(screen.getByTestId("host")).not.toHaveAttribute("aria-busy");
  });

  it("zIndex sets the layer custom property; backdrop and extra props pass through", () => {
    render(<LoadingOverlay zIndex={12000} backdrop="dim" className="extra" data-testid="ov" />);
    const overlay = screen.getByTestId("ov");
    expect(overlay.style.getPropertyValue("--ds-loading-overlay-z")).toBe("12000");
    expect(overlay).toHaveAttribute("data-backdrop", "dim");
    expect(overlay).toHaveClass("ds-loading-overlay", "extra");
  });

  it("spinner size defaults to lg (blocking) / sm (veil) and is decorative", () => {
    const { rerender } = render(<LoadingOverlay />);
    let spinner = document.querySelector(".ds-spinner")!;
    expect(spinner).toHaveAttribute("data-size", "lg");
    expect(spinner).toHaveAttribute("aria-hidden", "true");
    rerender(<LoadingOverlay blocking={false} />);
    spinner = document.querySelector(".ds-spinner")!;
    expect(spinner).toHaveAttribute("data-size", "sm");
  });

  it("forwards its ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<LoadingOverlay ref={ref} />);
    expect(ref.current).toHaveClass("ds-loading-overlay");
  });
});
