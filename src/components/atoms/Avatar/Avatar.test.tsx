import React from "react";
import { render } from "@testing-library/react";
import Avatar from "./index";

describe("Avatar", () => {
  it("renders with src", () => {
    const { container } = render(<Avatar src="https://example.com/avatar.png" alt="User" />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", "User");
  });

  it("renders placeholder when no src", () => {
    const { container } = render(<Avatar alt="User" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
