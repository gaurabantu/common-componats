import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FileUpload, { Dropzone, useFilePicker } from "./index";
import Button from "../../atoms/Button";

const meta: Meta<typeof FileUpload> = {
  title: "Design System/Molecules/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    errorMessage: { control: "text" },
    name: { control: "text" },
    accept: { control: "text" },
    size: { control: "radio", options: ["sm", "md"] },
    variant: { control: "radio", options: ["dropzone", "button"] },
    disabled: { control: "boolean" },
    multiple: { control: "boolean" },
    required: { control: "boolean" },
    maxFiles: { control: { type: "number", min: 1, max: 10 } },
    maxSizeBytes: { control: { type: "number", min: 1024, step: 1024 } },
    verifyMagicBytes: { control: "boolean" },
    scanPdfForSqlInjection: { control: "boolean" },
    maxScanBytes: { control: { type: "number", min: 1024, step: 1024 } },
    clearInputAfterSelect: { control: "boolean" },
    capture: { control: "select", options: [undefined, false, true, "user", "environment"] },
    allowedExtensions: { control: "object" },
    allowedMimeTypes: { control: "object" },
    icon: { control: false },
    onFilesChange: { control: false },
    onError: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Playground: Story = {
  args: {
    label: "Drag files here or browse",
    description: "PDF, PNG or JPG up to 10 MB",
    accept: ".pdf,.png,.jpg,.jpeg",
    size: "md",
    multiple: false,
    disabled: false,
    required: false,
    clearInputAfterSelect: true,
  },
};

export const Default: Story = {
  args: {
    label: "Drag files here or browse",
    description: "PDF, PNG or JPG up to 10 MB",
    accept: ".pdf,.png,.jpg,.jpeg",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
    label: "Upload receipt",
    description: "One image or PDF",
  },
};

export const WithValidation: Story = {
  render: function ValidationDemo() {
    const [names, setNames] = useState<string[]>([]);
    return (
      <div style={{ maxWidth: 480 }}>
        <FileUpload
          label="Attach documents"
          description="Max 2 files, 500 KB each"
          multiple
          maxFiles={2}
          maxSizeBytes={500 * 1024}
          onFilesChange={(files) => setNames(files.map((f) => f.name))}
        />
        {names.length > 0 ? (
          <p style={{ marginTop: 12, fontSize: 12 }}>Selected: {names.join(", ")}</p>
        ) : null}
      </div>
    );
  },
};

export const DropzoneAlias: Story = {
  render: () => (
    <Dropzone label="Dropzone export" description="Same component as FileUpload" icon={null} />
  ),
};

/** PDF-only, magic-byte check + optional SQL-like pattern scan (client-side; re-validate on server). */
export const SecurePdf: Story = {
  render: function SecureDemo() {
    const [msg, setMsg] = useState<string>("");
    return (
      <div style={{ maxWidth: 480 }}>
        <FileUpload
          label="Upload PDF"
          description="Max 5 MB. Extension, MIME, and file header must match PDF."
          accept=".pdf,application/pdf"
          allowedExtensions={[".pdf"]}
          allowedMimeTypes={["application/pdf"]}
          maxSizeBytes={5 * 1024 * 1024}
          scanPdfForSqlInjection
          onFilesChange={(files) => setMsg(`Accepted: ${files.map((f) => f.name).join(", ")}`)}
          onError={(e) => setMsg(e)}
        />
        {msg ? (
          <p style={{ marginTop: 12, fontSize: 12 }} role="status">
            {msg}
          </p>
        ) : null}
      </div>
    );
  },
};

/** `variant="button"` — a library `Button` opens the native picker (toolbar "Import" actions). Same validation as the dropzone. */
export const ButtonVariant: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div style={{ display: "grid", gap: "var(--space-1)" }}>
        <FileUpload
          variant="button"
          label="Import CSV"
          description="CSV up to 5 MB"
          accept=".csv"
          maxSizeBytes={5 * 1024 * 1024}
          onFilesChange={setFiles}
          buttonProps={{ "data-testid": "import-csv" }}
        />
        <span style={{ fontSize: "var(--text-small-size)", color: "var(--color-text-secondary)" }}>
          {files.length ? `Selected: ${files.map((f) => f.name).join(", ")}` : "No file selected"}
        </span>
      </div>
    );
  },
};

/** `useFilePicker` — headless: an existing button calls `open()`; spread `inputProps` on a hidden `<input>`. */
export const HeadlessUseFilePicker: Story = {
  render: () => {
    const [msg, setMsg] = useState("No file selected");
    const picker = useFilePicker({
      accept: ".xlsx,.csv",
      multiple: true,
      maxFiles: 3,
      onFiles: (files) => setMsg(`Selected: ${files.map((f) => f.name).join(", ")}`),
    });
    return (
      <div style={{ display: "grid", gap: "var(--space-1)", justifyItems: "start" }}>
        <Button size="sm" variant="outlineSecondary" onClick={picker.open}>
          Attach files
        </Button>
        <input {...picker.inputProps} />
        <span style={{ fontSize: "var(--text-small-size)", color: "var(--color-text-secondary)" }}>{msg}</span>
        {picker.error ? (
          <span role="alert" style={{ fontSize: "var(--text-small-size)", color: "var(--color-state-error)" }}>
            {picker.error}
          </span>
        ) : null}
      </div>
    );
  },
};
