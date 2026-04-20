import React from "react";
import { render, screen } from "@testing-library/react";
import GradientText from "./index";

describe("GradientText", () => {
  it("renders text content", () => {
    render(<GradientText>Premium</GradientText>);
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  it("applies custom gradient style", () => {
    render(<GradientText gradient="linear-gradient(90deg, red, blue)">Premium</GradientText>);
    expect(screen.getByText("Premium")).toHaveStyle({
      backgroundImage: "linear-gradient(90deg, red, blue)",
    });
  });
});
