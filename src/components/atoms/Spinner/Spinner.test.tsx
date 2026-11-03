import React from "react";
import { render, screen } from "@testing-library/react";
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

  it.each(["xs", "sm", "md", "lg"] as const)("reflects size %s", (size) => {
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
});
