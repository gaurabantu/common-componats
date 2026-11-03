import React from "react";
import { render, screen } from "@testing-library/react";
import StatCard from "./index";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Components" value={36} />);
    expect(screen.getByText("Components")).toBeInTheDocument();
    expect(screen.getByText("36")).toBeInTheDocument();
  });

  it("announces trend in text, not colour alone", () => {
    const { container } = render(
      <StatCard label="Tokens" value="270+" delta={{ value: "+45", trend: "up", label: "since v1" }} />,
    );
    expect(screen.getByText("Increased")).toBeInTheDocument();
    expect(screen.getByText("since v1")).toBeInTheDocument();
    expect(container.querySelector(".ds-stat__delta-value")).toHaveAttribute("data-tone", "success");
  });

  it("inverts tone when down is good", () => {
    const { container } = render(
      <StatCard label="Bundle" value="48" unit="KB" delta={{ value: "-6%", trend: "down", invert: true }} />,
    );
    expect(container.querySelector(".ds-stat__delta-value")).toHaveAttribute("data-tone", "success");
    expect(screen.getByText("KB")).toBeInTheDocument();
  });

  it("renders the icon decoratively", () => {
    const { container } = render(<StatCard label="Hooks" value={25} icon={<svg />} />);
    expect(container.querySelector(".ds-icon-box")).toHaveAttribute("aria-hidden", "true");
  });
});
