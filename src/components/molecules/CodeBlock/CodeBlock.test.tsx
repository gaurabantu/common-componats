import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import CodeBlock from "./index";

describe("CodeBlock", () => {
  it("renders code as text (no HTML parsing)", () => {
    const { container } = render(<CodeBlock code={"<b>bold</b>"} />);
    expect(container.querySelector("b")).toBeNull();
    expect(screen.getByText("<b>bold</b>")).toBeInTheDocument();
  });

  it("shows header with title and language", () => {
    render(<CodeBlock code="npm i" title="Install" language="bash" />);
    expect(screen.getByText("Install")).toBeInTheDocument();
    expect(screen.getByText("bash")).toBeInTheDocument();
  });

  it("copies code and announces status", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    const onCopy = vi.fn();
    render(<CodeBlock code={"\nnpm i ui-common-components\n"} onCopy={onCopy} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    });
    expect(writeText).toHaveBeenCalledWith("npm i ui-common-components");
    expect(onCopy).toHaveBeenCalledWith("npm i ui-common-components");
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();
  });

  it("hides copy when showCopy is false", () => {
    render(<CodeBlock code="x" showCopy={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders line numbers", () => {
    const { container } = render(<CodeBlock code={"a\nb\nc"} showLineNumbers />);
    expect(container.querySelectorAll(".ds-code__line")).toHaveLength(3);
  });
});
