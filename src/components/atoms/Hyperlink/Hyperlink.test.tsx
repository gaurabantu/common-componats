import React from "react";
import { render, screen } from "@testing-library/react";
import Hyperlink from "./index";

describe("Hyperlink", () => {
  it("renders as link with href", () => {
    render(<Hyperlink href="https://example.com">Link</Hyperlink>);
    const link = screen.getByRole("link", { name: /link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("opens in new tab when openInNewTab is true", () => {
    render(
      <Hyperlink href="https://example.com" openInNewTab>
        Link
      </Hyperlink>
    );
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});
