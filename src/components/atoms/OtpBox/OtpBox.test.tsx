import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OtpBox from "./index";
import type { OtpBoxHandle } from "./OtpBox.types";

const cells = () => screen.getAllByRole("textbox");

function paste(el: HTMLElement, text: string) {
  fireEvent.paste(el, { clipboardData: { getData: () => text } });
}

describe("OtpBox", () => {
  describe("rendering (boxes)", () => {
    it("renders six cells inside a labelled group by default", () => {
      render(<OtpBox label="Verification code" />);
      const group = screen.getByRole("group", { name: "Verification code" });
      expect(group).toContainElement(cells()[0]);
      expect(cells()).toHaveLength(6);
    });

    it("falls back to ariaLabel for the group name when there is no label", () => {
      render(<OtpBox />);
      expect(screen.getByRole("group", { name: "One-time code" })).toBeInTheDocument();
      render(<OtpBox ariaLabel="Bank PIN" />);
      expect(screen.getByRole("group", { name: "Bank PIN" })).toBeInTheDocument();
    });

    it("labels each cell 'Digit n of N' and focuses cell 1 when the label is clicked", async () => {
      render(<OtpBox label="Code" length={4} />);
      expect(screen.getByRole("textbox", { name: "Digit 2 of 4" })).toBeInTheDocument();
      await userEvent.click(screen.getByText("Code"));
      expect(screen.getByRole("textbox", { name: "Digit 1 of 4" })).toHaveFocus();
    });

    it("uses 'Character' labels for non-numeric types and supports getCellLabel", () => {
      const { unmount } = render(<OtpBox type="alphanumeric" length={4} />);
      expect(screen.getByRole("textbox", { name: "Character 3 of 4" })).toBeInTheDocument();
      unmount();
      render(<OtpBox length={4} getCellLabel={(i, n) => `Ziffer ${i + 1} von ${n}`} />);
      expect(screen.getByRole("textbox", { name: "Ziffer 1 von 4" })).toBeInTheDocument();
    });

    it("puts autocomplete=one-time-code on the first cell only and sets inputMode per type", () => {
      const { unmount } = render(<OtpBox />);
      const [first, second] = cells();
      expect(first).toHaveAttribute("autocomplete", "one-time-code");
      expect(second).toHaveAttribute("autocomplete", "off");
      expect(first).toHaveAttribute("inputmode", "numeric");
      unmount();
      render(<OtpBox type="alphabet" />);
      expect(cells()[0]).toHaveAttribute("inputmode", "text");
    });

    it("derives cell ids from id", () => {
      render(<OtpBox id="code" length={3} />);
      expect(cells().map((c) => c.id)).toEqual(["code-0", "code-1", "code-2"]);
    });

    it("renders the initial value and masks it", () => {
      const { unmount } = render(<OtpBox value="12" length={4} />);
      expect(cells().map((c) => (c as HTMLInputElement).value)).toEqual(["1", "2", "", ""]);
      unmount();
      render(<OtpBox defaultValue="12" mask length={4} />);
      expect(cells().map((c) => (c as HTMLInputElement).value)).toEqual(["•", "•", "", ""]);
      expect(cells()[0]).not.toHaveAttribute("pattern");
    });

    it("disables every cell", () => {
      render(<OtpBox disabled />);
      cells().forEach((c) => expect(c).toBeDisabled());
    });

    it("renders a hidden input with the real value for forms", async () => {
      const { container } = render(<OtpBox name="otp" mask length={4} />);
      await userEvent.click(cells()[0]);
      await userEvent.keyboard("1234");
      const hidden = container.querySelector('input[type="hidden"][name="otp"]') as HTMLInputElement;
      expect(hidden.value).toBe("1234");
    });
  });

  describe("a11y — error wiring", () => {
    it("links the error message via aria-describedby and sets aria-invalid", () => {
      render(<OtpBox label="Code" error="Code expired" />);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Code expired");
      cells().forEach((c) => {
        expect(c).toHaveAttribute("aria-invalid", "true");
        expect(c).toHaveAttribute("aria-describedby", alert.id);
      });
      expect(screen.getByRole("group")).toHaveAttribute("aria-describedby", alert.id);
    });

    it("shows the incomplete-code message only after focus leaves the group", async () => {
      render(
        <>
          <OtpBox length={4} incompleteMessage="Enter all 4 digits" />
          <button type="button">Next</button>
        </>
      );
      await userEvent.click(cells()[0]);
      await userEvent.keyboard("12");
      expect(screen.queryByRole("alert")).toBeNull();
      await userEvent.click(screen.getByRole("button", { name: "Next" }));
      expect(screen.getByRole("alert")).toHaveTextContent("Enter all 4 digits");
      expect(cells()[0]).toHaveAttribute("aria-invalid", "true");
    });

    it("sets aria-required when required", () => {
      render(<OtpBox required length={2} />);
      cells().forEach((c) => expect(c).toHaveAttribute("aria-required", "true"));
    });
  });

  describe("interaction (boxes)", () => {
    it("typing advances focus, filters characters and fires onChange / onComplete", async () => {
      const onChange = vi.fn();
      const onComplete = vi.fn();
      render(<OtpBox length={4} onChange={onChange} onComplete={onComplete} />);
      await userEvent.click(cells()[0]);
      await userEvent.keyboard("1a2");
      expect(cells()[2]).toHaveFocus();
      expect(onChange).toHaveBeenLastCalledWith("12");
      expect(onComplete).not.toHaveBeenCalled();
      await userEvent.keyboard("34");
      expect(onComplete).toHaveBeenCalledTimes(1);
      expect(onComplete).toHaveBeenCalledWith("1234");
    });

    it("distributes a full-code paste from the first cell wherever it is pasted", () => {
      const onComplete = vi.fn();
      render(<OtpBox length={6} onComplete={onComplete} />);
      paste(cells()[3], "123-456");
      expect(cells().map((c) => (c as HTMLInputElement).value)).toEqual(["1", "2", "3", "4", "5", "6"]);
      expect(onComplete).toHaveBeenCalledWith("123456");
      expect(cells()[5]).toHaveFocus();
    });

    it("fills a partial paste from the current cell", () => {
      render(<OtpBox length={6} />);
      paste(cells()[2], "78");
      expect(cells().map((c) => (c as HTMLInputElement).value)).toEqual(["", "", "7", "8", "", ""]);
      expect(cells()[4]).toHaveFocus();
    });

    it("distributes SMS autofill that lands in the first cell as one change", () => {
      const onComplete = vi.fn();
      render(<OtpBox length={4} onComplete={onComplete} />);
      fireEvent.change(cells()[0], { target: { value: "9876" } });
      expect(onComplete).toHaveBeenCalledWith("9876");
    });

    it("Backspace clears the current cell, then moves back and clears the previous one", async () => {
      const onChange = vi.fn();
      render(<OtpBox length={4} defaultValue="123" onChange={onChange} />);
      await userEvent.click(cells()[2]);
      await userEvent.keyboard("{Backspace}");
      expect(cells()[2]).toHaveValue("");
      expect(cells()[2]).toHaveFocus();
      await userEvent.keyboard("{Backspace}");
      expect(cells()[1]).toHaveFocus();
      expect(cells()[1]).toHaveValue("");
      expect(onChange).toHaveBeenLastCalledWith("1");
    });

    it("Arrow keys, Home and End move between cells", async () => {
      render(<OtpBox length={5} />);
      await userEvent.click(cells()[2]);
      await userEvent.keyboard("{ArrowRight}");
      expect(cells()[3]).toHaveFocus();
      await userEvent.keyboard("{ArrowLeft}{ArrowLeft}");
      expect(cells()[1]).toHaveFocus();
      await userEvent.keyboard("{End}");
      expect(cells()[4]).toHaveFocus();
      await userEvent.keyboard("{Home}");
      expect(cells()[0]).toHaveFocus();
    });

    it("re-syncs from the value prop", () => {
      const { rerender } = render(<OtpBox length={4} value="12" />);
      rerender(<OtpBox length={4} value="5678" />);
      expect(cells().map((c) => (c as HTMLInputElement).value)).toEqual(["5", "6", "7", "8"]);
    });

    it("autoFocus focuses the first cell", () => {
      render(<OtpBox autoFocus />);
      expect(cells()[0]).toHaveFocus();
    });

    it("exposes focus(), clear() and getValue() through ref", () => {
      const ref = React.createRef<OtpBoxHandle>();
      const onChange = vi.fn();
      render(<OtpBox ref={ref} length={4} defaultValue="12" onChange={onChange} />);
      act(() => ref.current!.focus());
      expect(cells()[2]).toHaveFocus();
      expect(ref.current!.getValue()).toBe("12");
      act(() => ref.current!.clear());
      expect(onChange).toHaveBeenLastCalledWith("");
      expect(cells()[0]).toHaveFocus();
      expect(ref.current!.getValue()).toBe("");
    });
  });

  describe("single-input variants", () => {
    it.each(["outlined", "filled", "underlined"] as const)("%s renders one labelled input", (variant) => {
      render(<OtpBox variant={variant} label="Code" id="sms" />);
      const input = screen.getByRole("textbox", { name: "Code" });
      expect(input).toHaveAttribute("id", "sms");
      expect(input).toHaveAttribute("autocomplete", "one-time-code");
      expect(input).toHaveAttribute("maxlength", "6");
      expect(screen.queryByRole("group")).toBeNull();
    });

    it("filters typing, fires onComplete and accepts a formatted paste", async () => {
      const onComplete = vi.fn();
      render(<OtpBox variant="outlined" length={4} onComplete={onComplete} ariaLabel="Code" />);
      const input = screen.getByRole("textbox", { name: "Code" });
      await userEvent.type(input, "1x2");
      expect(input).toHaveValue("12");
      paste(input, "98-76");
      expect(input).toHaveValue("9876");
      expect(onComplete).toHaveBeenCalledWith("9876");
    });

    it("masks the visible value but emits the real one", async () => {
      const onChange = vi.fn();
      render(<OtpBox variant="outlined" mask length={4} onChange={onChange} ariaLabel="PIN" />);
      const input = screen.getByRole("textbox", { name: "PIN" });
      await userEvent.type(input, "12");
      expect(input).toHaveValue("••");
      expect(onChange).toHaveBeenLastCalledWith("12");
    });

    it("ref.focus() focuses the input", () => {
      const ref = React.createRef<OtpBoxHandle>();
      render(<OtpBox ref={ref} variant="filled" ariaLabel="Code" />);
      act(() => ref.current!.focus());
      expect(screen.getByRole("textbox", { name: "Code" })).toHaveFocus();
    });
  });
});
