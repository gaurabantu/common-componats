import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Form from "./index";

function Fields() {
  return (
    <>
      <label htmlFor="f-name">Name</label>
      <input id="f-name" name="name" defaultValue="Ada" />
      <label htmlFor="f-tag">Tag</label>
      <input id="f-tag" name="tag" defaultValue="a" />
      <input aria-label="Tag 2" name="tag" defaultValue="b" />
    </>
  );
}

function submit(container: HTMLElement) {
  fireEvent.submit(container.querySelector("form")!);
}

describe("Form — rendering", () => {
  it("renders a real form with header slots and children", () => {
    const { container } = render(
      <Form badge="Beta" title="Profile" description="Edit it">
        <Fields />
      </Form>,
    );
    expect(container.querySelector("form")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Profile" })).toBeInTheDocument();
    expect(screen.getByText("Beta")).toHaveClass("ds-form-badge");
    expect(screen.getByText("Edit it")).toHaveClass("ds-form-description");
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("titleAs changes the heading level", () => {
    render(<Form title="Address" titleAs="h2">x</Form>);
    expect(screen.getByRole("heading", { level: 2, name: "Address" })).toBeInTheDocument();
  });

  it("forwards ref to the form and passes native attrs (noValidate, id)", () => {
    const ref = React.createRef<HTMLFormElement>();
    render(<Form ref={ref} id="f1" noValidate aria-label="Profile form">x</Form>);
    const form = screen.getByRole("form", { name: "Profile form" });
    expect(ref.current).toBe(form);
    expect(form).toHaveAttribute("id", "f1");
    expect(form).toHaveAttribute("novalidate");
  });

  it("number columns keep legacy behaviour (1 col on phones, n above)", () => {
    const { container } = render(<Form layout="grid" columns={3}>x</Form>);
    const card = container.querySelector(".ds-form-card") as HTMLElement;
    expect(card.style.getPropertyValue("--form-cols-base")).toBe("1");
    expect(card.style.getPropertyValue("--form-cols-sm")).toBe("3");
    expect(card.style.getPropertyValue("--form-columns")).toBe("3");
    expect(container.querySelector(".ds-form-fields")).toHaveClass("ds-form-fields--grid");
  });

  it("responsive columns object sets only the given breakpoints (clamped ≥1)", () => {
    const { container } = render(<Form layout="grid" columns={{ base: 1, md: 2, lg: 0 }}>x</Form>);
    const card = container.querySelector(".ds-form-card") as HTMLElement;
    expect(card.style.getPropertyValue("--form-cols-base")).toBe("1");
    expect(card.style.getPropertyValue("--form-cols-sm")).toBe("");
    expect(card.style.getPropertyValue("--form-cols-md")).toBe("2");
    expect(card.style.getPropertyValue("--form-cols-lg")).toBe("1");
  });

  it("gap: number → px, string passes through, omitted → CSS token default", () => {
    const { container, rerender } = render(<Form gap={12}>x</Form>);
    const card = () => container.querySelector(".ds-form-card") as HTMLElement;
    expect(card().style.getPropertyValue("--form-gap")).toBe("12px");
    rerender(<Form gap="var(--space-3)">x</Form>);
    expect(card().style.getPropertyValue("--form-gap")).toBe("var(--space-3)");
    rerender(<Form>x</Form>);
    expect(card().style.getPropertyValue("--form-gap")).toBe("");
  });

  it("classNames/styles slots merge after the deprecated props", () => {
    const { container } = render(
      <Form
        shellClassName="old-shell"
        cardClassName="old-card"
        contentClassName="old-content"
        fieldsClassName="old-fields"
        shellStyle={{ color: "red", padding: "1px" }}
        fieldsStyle={{ gap: "1px" }}
        classNames={{ shell: "new-shell", card: "new-card", content: "new-content", fields: "new-fields" }}
        styles={{ shell: { color: "blue" }, card: { minWidth: "0" }, content: { margin: "0" }, fields: { gap: "2px" } }}
        className="legacy-form-class"
      >
        x
      </Form>,
    );
    const shell = container.querySelector(".ds-form-shell") as HTMLElement;
    expect(shell).toHaveClass("old-shell", "new-shell");
    expect(shell.style.color).toBe("blue");
    expect(shell.style.padding).toBe("1px");
    expect(container.querySelector(".ds-form-card")).toHaveClass("old-card", "new-card");
    expect(container.querySelector("form")).toHaveClass("old-content", "new-content", "legacy-form-class");
    const fields = container.querySelector(".ds-form-fields") as HTMLElement;
    expect(fields).toHaveClass("old-fields", "new-fields");
    expect(fields.style.gap).toBe("2px");
  });

  it("does not render inline visual styles on header elements (moved to Form.css)", () => {
    render(<Form badge="B" title="T" description="D">x</Form>);
    expect(screen.getByText("B")).not.toHaveAttribute("style");
    expect(screen.getByText("T")).not.toHaveAttribute("style");
    expect(screen.getByText("D")).not.toHaveAttribute("style");
  });
});

describe("Form — a11y", () => {
  it("error summary is a role=alert region named by its heading with in-page links", () => {
    render(
      <Form errorSummary={[{ fieldId: "f-name", message: "Enter a name" }]}>
        <Fields />
      </Form>,
    );
    const alert = screen.getByRole("alert", { name: "There is a problem" });
    const link = screen.getByRole("link", { name: "Enter a name" });
    expect(alert).toContainElement(link);
    expect(link).toHaveAttribute("href", "#f-name");
  });

  it("custom summary title; no summary when the list is empty", () => {
    const { rerender } = render(
      <Form errorSummary={[{ fieldId: "x", message: "m" }]} errorSummaryTitle="Fix these">x</Form>,
    );
    expect(screen.getByRole("alert", { name: "Fix these" })).toBeInTheDocument();
    rerender(<Form errorSummary={[]}>x</Form>);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("loading sets aria-busy, disables fields via fieldset, and announces the label", () => {
    const { container } = render(
      <Form loading loadingLabel="Saving…">
        <Fields />
      </Form>,
    );
    expect(container.querySelector("form")).toHaveAttribute("aria-busy", "true");
    expect(container.querySelector("fieldset")).toBeDisabled();
    expect(screen.getByLabelText("Name")).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("Saving…");
  });

  it("disabled disables fields without aria-busy; status stays empty", () => {
    const { container } = render(
      <Form disabled>
        <Fields />
      </Form>,
    );
    expect(container.querySelector("form")).not.toHaveAttribute("aria-busy");
    expect(screen.getByLabelText("Name")).toBeDisabled();
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("idle form: fields enabled, fieldset kept (no remount when toggling loading)", () => {
    const { container, rerender } = render(
      <Form>
        <Fields />
      </Form>,
    );
    const input = screen.getByLabelText("Name");
    expect(input).toBeEnabled();
    rerender(
      <Form loading>
        <Fields />
      </Form>,
    );
    expect(screen.getByLabelText("Name")).toBe(input);
    expect(container.querySelectorAll("fieldset")).toHaveLength(1);
  });
});

describe("Form — interaction", () => {
  it("calls native onSubmit", () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    const { container } = render(<Form onSubmit={onSubmit}><Fields /></Form>);
    submit(container);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("onSubmitValues receives collected values (repeated names → arrays) and prevents navigation", () => {
    const onSubmitValues = vi.fn();
    const { container } = render(<Form onSubmitValues={onSubmitValues}><Fields /></Form>);
    submit(container);
    expect(onSubmitValues).toHaveBeenCalledTimes(1);
    const [values, event] = onSubmitValues.mock.calls[0];
    expect(values).toEqual({ name: "Ada", tag: ["a", "b"] });
    expect(event.defaultPrevented).toBe(true);
  });

  it("blocks submit while loading or disabled", () => {
    const onSubmit = vi.fn();
    const onSubmitValues = vi.fn();
    const { container, rerender } = render(
      <Form loading onSubmit={onSubmit} onSubmitValues={onSubmitValues}>x</Form>,
    );
    submit(container);
    rerender(<Form disabled onSubmit={onSubmit} onSubmitValues={onSubmitValues}>x</Form>);
    submit(container);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onSubmitValues).not.toHaveBeenCalled();
  });

  it("clicking a summary link focuses the field", () => {
    render(
      <Form errorSummary={[{ fieldId: "f-name", message: "Enter a name" }]}>
        <Fields />
      </Form>,
    );
    fireEvent.click(screen.getByRole("link", { name: "Enter a name" }));
    expect(screen.getByLabelText("Name")).toHaveFocus();
  });

  it("moves focus to the summary when errors appear after mount (not on first render)", () => {
    const { rerender } = render(<Form errorSummary={[{ fieldId: "f-name", message: "A" }]}><Fields /></Form>);
    expect(screen.getByRole("alert")).not.toHaveFocus();
    rerender(<Form errorSummary={[]}><Fields /></Form>);
    act(() => {
      rerender(<Form errorSummary={[{ fieldId: "f-tag", message: "B" }]}><Fields /></Form>);
    });
    expect(screen.getByRole("alert")).toHaveFocus();
  });

  it("autoFocusErrorSummary={false} leaves focus alone", () => {
    const { rerender } = render(<Form autoFocusErrorSummary={false}><Fields /></Form>);
    rerender(
      <Form autoFocusErrorSummary={false} errorSummary={[{ fieldId: "f-name", message: "A" }]}>
        <Fields />
      </Form>,
    );
    expect(screen.getByRole("alert")).not.toHaveFocus();
  });
});

describe("Form — actions follow the form state (iteration 2)", () => {
  const actions = (
    <>
      <button type="submit">Save</button>
      <a href="#help">Help</a>
    </>
  );

  it("disabled: submit and other action buttons are natively disabled", () => {
    const { container } = render(<Form disabled actions={actions}>x</Form>);
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    const group = container.querySelector(".ds-form-actions-fieldset")!;
    expect(group).toBeDisabled();
    expect(group).toHaveAttribute("aria-disabled", "true");
    expect(group).toHaveAttribute("data-state", "disabled");
  });

  it("loading: actions group is aria-disabled but the focused submit keeps focus; submit blocked", () => {
    const onSubmit = vi.fn();
    const { container, rerender } = render(<Form actions={actions} onSubmit={onSubmit}>x</Form>);
    const save = screen.getByRole("button", { name: "Save" });
    save.focus();
    rerender(<Form loading actions={actions} onSubmit={onSubmit}>x</Form>);
    const group = container.querySelector(".ds-form-actions-fieldset")!;
    expect(group).toHaveAttribute("aria-disabled", "true");
    expect(group).toHaveAttribute("data-state", "loading");
    expect(save).not.toBeDisabled();
    expect(save).toHaveFocus();
    fireEvent.click(save);
    submit(container);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("idle: actions enabled, no aria-disabled", () => {
    const { container } = render(<Form actions={actions}>x</Form>);
    expect(screen.getByRole("button", { name: "Save" })).toBeEnabled();
    const group = container.querySelector(".ds-form-actions-fieldset")!;
    expect(group).not.toHaveAttribute("aria-disabled");
    expect(group).not.toHaveAttribute("data-state");
  });
});
