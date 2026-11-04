import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileUpload, { useFilePicker } from "./index";
import type { UseFilePickerOptions } from "./index";

function csv(name = "data.csv", body = "a,b\n1,2\n") {
  return new File([body], name, { type: "text/csv" });
}

describe("FileUpload — dropzone (default)", () => {
  it("renders a labelled file input and calls onFilesChange", async () => {
    const onFilesChange = vi.fn();
    render(<FileUpload label="Upload trial balance" onFilesChange={onFilesChange} />);
    const input = screen.getByLabelText(/upload trial balance/i) as HTMLInputElement;
    expect(input.type).toBe("file");
    expect(input).not.toHaveAttribute("hidden");
    await userEvent.upload(input, csv());
    await waitFor(() => expect(onFilesChange).toHaveBeenCalledTimes(1));
    expect(onFilesChange.mock.calls[0][0][0].name).toBe("data.csv");
  });

  it("rejects files over maxSizeBytes with an alert", async () => {
    const onError = vi.fn();
    const onFilesChange = vi.fn();
    render(
      <FileUpload label="Upload" maxSizeBytes={4} onError={onError} onFilesChange={onFilesChange} />,
    );
    await userEvent.upload(screen.getByLabelText("Upload"), csv());
    await waitFor(() => expect(onError).toHaveBeenCalled());
    expect(onFilesChange).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/larger than/);
  });
});

describe("FileUpload — variant='button'", () => {
  it("renders a Button that opens the hidden picker", async () => {
    const onFilesChange = vi.fn();
    render(
      <FileUpload
        variant="button"
        label="Import CSV"
        accept=".csv"
        verifyMagicBytes={false}
        onFilesChange={onFilesChange}
        buttonProps={{ "data-testid": "import-btn" }}
      />,
    );
    const button = screen.getByRole("button", { name: /import csv/i });
    expect(button).toHaveAttribute("data-testid", "import-btn");
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toHaveAttribute("hidden");
    expect(input).toHaveAttribute("accept", ".csv");
    const clickSpy = vi.spyOn(input, "click");
    await userEvent.click(button);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    await userEvent.upload(input, csv());
    await waitFor(() => expect(onFilesChange).toHaveBeenCalledTimes(1));
  });

  it("puts id on the Button and links description via aria-describedby", () => {
    render(<FileUpload variant="button" id="font-up" label="Upload font" description="TTF or OTF" />);
    const button = screen.getByRole("button", { name: /upload font/i });
    expect(button).toHaveAttribute("id", "font-up");
    expect(button).toHaveAccessibleDescription("TTF or OTF");
    expect(document.getElementById("font-up-input")).toHaveAttribute("type", "file");
  });

  it("does not open when disabled", async () => {
    render(<FileUpload variant="button" label="Import" disabled />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, "click");
    expect(screen.getByRole("button", { name: /import/i })).toBeDisabled();
    expect(clickSpy).not.toHaveBeenCalled();
  });
});

function PickerHarness(props: UseFilePickerOptions) {
  const picker = useFilePicker(props);
  return (
    <>
      <button type="button" onClick={picker.open}>
        Attach
      </button>
      <input data-testid="picker-input" {...picker.inputProps} />
      {picker.error ? <p role="alert">{picker.error}</p> : null}
    </>
  );
}

describe("useFilePicker", () => {
  it("returns hidden, non-focusable input props and opens on demand", async () => {
    render(<PickerHarness accept=".csv" multiple />);
    const input = screen.getByTestId("picker-input") as HTMLInputElement;
    expect(input).toHaveAttribute("hidden");
    expect(input).toHaveAttribute("tabindex", "-1");
    expect(input).toHaveAttribute("aria-hidden", "true");
    expect(input.multiple).toBe(true);
    const clickSpy = vi.spyOn(input, "click");
    await userEvent.click(screen.getByRole("button", { name: "Attach" }));
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it("validates and calls onFiles", async () => {
    const onFiles = vi.fn();
    render(<PickerHarness accept=".csv" verifyMagicBytes={false} onFiles={onFiles} />);
    await userEvent.upload(screen.getByTestId("picker-input"), csv());
    await waitFor(() => expect(onFiles).toHaveBeenCalledTimes(1));
  });

  it("enforces maxSizeBytes and exposes the error", async () => {
    const onFiles = vi.fn();
    const onError = vi.fn();
    render(<PickerHarness maxSizeBytes={2} onFiles={onFiles} onError={onError} />);
    await userEvent.upload(screen.getByTestId("picker-input"), csv());
    await waitFor(() => expect(onError).toHaveBeenCalled());
    expect(onFiles).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/larger than/);
  });

  it("enforces maxFiles when multiple", async () => {
    const onError = vi.fn();
    render(<PickerHarness multiple maxFiles={1} onError={onError} />);
    await userEvent.upload(screen.getByTestId("picker-input"), [csv("a.csv"), csv("b.csv")]);
    await waitFor(() => expect(onError).toHaveBeenCalledWith("You can upload at most 1 file."));
  });

  it("handleFiles validates files from other sources (e.g. drop)", async () => {
    const onFiles = vi.fn();
    let api: ReturnType<typeof useFilePicker> | null = null;
    function Grab() {
      api = useFilePicker({ onFiles });
      return <input {...api.inputProps} />;
    }
    render(<Grab />);
    let ok = false;
    await act(async () => {
      ok = await api!.handleFiles([csv()]);
    });
    expect(ok).toBe(true);
    expect(onFiles).toHaveBeenCalledTimes(1);
  });

  it("open() is a no-op while disabled", async () => {
    render(<PickerHarness disabled />);
    const input = screen.getByTestId("picker-input") as HTMLInputElement;
    const clickSpy = vi.spyOn(input, "click");
    await userEvent.click(screen.getByRole("button", { name: "Attach" }));
    expect(clickSpy).not.toHaveBeenCalled();
  });
});
