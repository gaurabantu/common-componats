import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AlertDialog from "./index";

describe("AlertDialog", () => {
  it("renders when open", () => {
    render(
      <AlertDialog isOpen title="Alert" description="Test message" onClose={() => {}} />
    );
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("Alert")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("calls onClose when OK clicked", async () => {
    const handleClose = vi.fn();
    render(
      <AlertDialog isOpen title="Alert" description="Message" onClose={handleClose} showCancel={false} />
    );
    await userEvent.click(screen.getByText("OK"));
    expect(handleClose).toHaveBeenCalled();
  });
});
