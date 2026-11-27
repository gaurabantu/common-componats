import React from "react";
import { act, render, screen } from "@testing-library/react";
import Spinner from "./index";

describe("Spinner", () => {
  it("renders a status region with the default label", () => {
    render(<Spinner />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Loading");
    expect(status).not.toHaveAttribute("aria-hidden");
  });

  it("uses a custom label as visually hidden text", () => {
    render(<Spinner label="Saving changes" />);
    const label = screen.getByText("Saving changes");
    expect(label).toHaveClass("ds-spinner__label");
    expect(screen.getByRole("status")).toHaveTextContent("Saving changes");
  });

  it("is hidden from assistive tech when decorative", () => {
    const { container } = render(<Spinner decorative label="ignored" />);
    const root = container.querySelector(".ds-spinner");
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root).not.toHaveAttribute("role");
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByText("ignored")).toBeNull();
  });

  it("defaults size and tone", () => {
    render(<Spinner />);
    const root = screen.getByRole("status");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-tone", "current");
  });

  it.each(["xs", "sm", "md", "lg", "xl"] as const)("reflects size %s", (size) => {
    render(<Spinner size={size} />);
    expect(screen.getByRole("status")).toHaveAttribute("data-size", size);
  });

  it.each(["current", "primary", "muted", "inverse"] as const)("reflects tone %s", (tone) => {
    render(<Spinner tone={tone} />);
    expect(screen.getByRole("status")).toHaveAttribute("data-tone", tone);
  });

  it("keeps the ring decorative and forwards ref, className and native attrs", () => {
    const ref = React.createRef<HTMLSpanElement>();
    const { container } = render(<Spinner ref={ref} className="extra" data-testid="sp" />);
    expect(ref.current).toBe(screen.getByTestId("sp"));
    expect(ref.current).toHaveClass("ds-spinner", "extra");
    expect(container.querySelector(".ds-spinner__ring")).toHaveAttribute("aria-hidden", "true");
  });
  it("defaults to the ring variant at normal speed with no thickness override", () => {
    const { container } = render(<Spinner />);
    const root = screen.getByRole("status");
    expect(root).toHaveAttribute("data-variant", "ring");
    expect(root).toHaveAttribute("data-speed", "normal");
    expect(root).not.toHaveAttribute("data-thickness");
    expect(container.querySelector(".ds-spinner__ring")).not.toBeNull();
  });

  it.each(["dots", "bars"] as const)("renders three decorative segments for the %s variant", (variant) => {
    const { container } = render(<Spinner variant={variant} label="Fetching" />);
    const root = screen.getByRole("status");
    expect(root).toHaveAttribute("data-variant", variant);
    const visual = container.querySelector(`.ds-spinner__${variant}`);
    expect(visual).toHaveAttribute("aria-hidden", "true");
    expect(visual?.querySelectorAll(".ds-spinner__segment")).toHaveLength(3);
    expect(container.querySelector(".ds-spinner__ring")).toBeNull();
    expect(root).toHaveTextContent("Fetching");
  });

  it.each(["thin", "regular", "thick"] as const)("reflects thickness %s", (thickness) => {
    render(<Spinner thickness={thickness} />);
    expect(screen.getByRole("status")).toHaveAttribute("data-thickness", thickness);
  });

  it.each(["slow", "normal", "fast"] as const)("reflects speed %s", (speed) => {
    render(<Spinner speed={speed} />);
    expect(screen.getByRole("status")).toHaveAttribute("data-speed", speed);
  });

  describe("delay", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("renders nothing until the delay has elapsed", () => {
      const { container } = render(<Spinner delay={300} />);
      expect(container).toBeEmptyDOMElement();
      act(() => {
        vi.advanceTimersByTime(299);
      });
      expect(screen.queryByRole("status")).toBeNull();
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("status")).toHaveTextContent("Loading");
    });

    it("never renders when unmounted before the delay elapses", () => {
      const { container, unmount } = render(<Spinner delay={500} />);
      expect(container).toBeEmptyDOMElement();
      unmount();
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.queryByRole("status")).toBeNull();
    });

    it("renders immediately when delay is 0", () => {
      render(<Spinner delay={0} />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
});
