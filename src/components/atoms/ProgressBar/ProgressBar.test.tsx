import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./index";

describe("ProgressBar", () => {
  it("renders with value", () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("renders with max", () => {
    render(<ProgressBar value={25} max={100} />);
    expect(screen.getByText("25%")).toBeInTheDocument();
  });
});
