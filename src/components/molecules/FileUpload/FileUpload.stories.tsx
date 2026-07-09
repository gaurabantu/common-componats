import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FileUpload, { Dropzone } from "./index";

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
