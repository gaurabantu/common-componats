import React from "react";
import { render, screen } from "@testing-library/react";
import Modal from "./index";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}} title="Test">
        Content
      </Modal>
    );
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it("renders when open", () => {
    render(
      <Modal isOpen onClose={() => {}} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("renders close button when showCloseButton is true", () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen onClose={handleClose} title="Test" showCloseButton>
        Content
      </Modal>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
