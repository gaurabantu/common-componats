import React from "react";
import { render } from "@testing-library/react";
import Icon from "./index";

describe("Icon", () => {
  it("renders with src", () => {
    const { container } = render(<Icon src="data:image/svg+xml,<svg/>" alt="Test icon" />);
    // SVG uses mask (span), non-SVG uses img
    const span = container.querySelector("span[role='img']");
    expect(span).toBeInTheDocument();
  });

  it("renders decorative icon with aria-hidden", () => {
    const { container } = render(<Icon src="data:image/svg+xml,<svg/>" decorative />);
    const span = container.querySelector('[aria-hidden="true"]');
    expect(span).toBeInTheDocument();
  });

  it("renders inline SVG element", () => {
    const SvgIcon = () => <svg data-testid="inline-svg" />;
    const { container } = render(<Icon src={<SvgIcon />} width={20} height={20} />);
    const svg = container.querySelector("svg[data-testid='inline-svg']");
    expect(svg).toBeInTheDocument();
  });
});
