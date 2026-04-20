import React from "react";
import { render, screen } from "@testing-library/react";
import TextView from "./index";

describe("TextView", () => {
  it("renders children", () => {
    render(<TextView>Hello World</TextView>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders as specified tag when as prop is provided", () => {
    render(<TextView as="h1">Heading</TextView>);
    const heading = screen.getByText("Heading");
    expect(heading.tagName).toBe("H1");
  });

  it("applies variant styling", () => {
    const { container } = render(<TextView variant="h1">Title</TextView>);
    expect(container.firstChild).toBeInTheDocument();
  });
});
