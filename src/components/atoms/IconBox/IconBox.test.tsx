import React from "react";
import { render, screen } from "@testing-library/react";
import IconBox from "./index";

describe("IconBox", () => {
  it("is decorative by default", () => {
    const { container } = render(<IconBox>★</IconBox>);
    const box = container.querySelector(".ds-icon-box");
    expect(box).toHaveAttribute("aria-hidden", "true");
    expect(box).not.toHaveAttribute("role");
  });

  it("exposes an accessible name when label is set", () => {
    render(<IconBox label="Tokens">★</IconBox>);
    expect(screen.getByRole("img", { name: "Tokens" })).toBeInTheDocument();
  });

  it("reflects tone, size, and shape as data attributes", () => {
    const { container } = render(
      <IconBox tone="strong" size="xl" shape="circle">
        ★
      </IconBox>,
    );
    const box = container.querySelector(".ds-icon-box");
    expect(box).toHaveAttribute("data-tone", "strong");
    expect(box).toHaveAttribute("data-size", "xl");
    expect(box).toHaveAttribute("data-shape", "circle");
  });
});
