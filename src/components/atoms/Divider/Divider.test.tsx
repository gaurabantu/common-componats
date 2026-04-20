import React from "react";
import { render, screen } from "@testing-library/react";
import Divider from "./index";

describe("Divider", () => {
  it("renders horizontal divider", () => {
    const { container } = render(<Divider orientation="horizontal" />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("renders vertical divider", () => {
    const { container } = render(<Divider orientation="vertical" />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });

  it("renders with content", () => {
    render(<Divider>OR</Divider>);
    expect(screen.getByText("OR")).toBeInTheDocument();
  });

  it("renders row orientation", () => {
    const { container } = render(<Divider orientation="row" />);
    const separator = container.querySelector('[role="separator"]');
    expect(separator).toBeInTheDocument();
  });
});
