import type { HTMLAttributes, ReactNode } from "react";
import type { ButtonProps } from "../../atoms/Button/Button.types";

export type FileUploadSize = "sm" | "md";

/** `dropzone` (default) — dashed drop area; `button` — a library `Button` that opens the picker (no drop area). */
export type FileUploadVariant = "dropzone" | "button";

type ButtonOnlyProps = Extract<ButtonProps, { href?: undefined }>;

export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onError"> {
  /** Visible title inside the dropzone, or the button text when `variant="button"` (accessible name). */
  label: string;
  /**
   * `dropzone` (default) or `button` — renders a library `Button` that opens the native picker
   * (same validation; `description` / errors render below it). In button mode `id` goes on the
   * `Button` (so `FormField htmlFor` / `<label for>` target it) and the hidden input gets `${id}-input`.
   * @default "dropzone"
   */
  variant?: FileUploadVariant;
  /** `variant="button"`: Button variant. @default "outlineSecondary" */
  buttonVariant?: ButtonOnlyProps["variant"];
  /** `variant="button"`: Button size. @default "md" */
  buttonSize?: ButtonOnlyProps["size"];
  /**
   * `variant="button"`: extra props for the `Button` (e.g. `data-testid`, `ariaLabel`, `className`,
   * `iconPosition`). `onClick`, `disabled`, `id` and `children` are managed.
   */
  buttonProps?: Omit<ButtonOnlyProps, "onClick" | "disabled" | "id" | "children" | "href" | "type"> & {
    [dataAttr: `data-${string}`]: string | undefined;
  };
  /** Secondary line under the label */
  description?: string;
  /** Shown below the zone; use with `aria-invalid` via `errorMessage` */
  errorMessage?: string;
  name?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  /** When `multiple`, caps how many files are accepted */
  maxFiles?: number;
  /** Per-file maximum size in bytes */
  maxSizeBytes?: number;
  /**
   * Allowed filename extensions (with dot), e.g. `[".pdf", ".png"]`.
   * Combined with `accept` / `allowedMimeTypes` for validation.
   */
  allowedExtensions?: string[];
  /**
   * Allowed MIME types, e.g. `["application/pdf", "image/png"]`.
   * Supports wildcards like `image/*`.
   */
  allowedMimeTypes?: string[];
  /**
   * Verify file content (magic bytes) matches extension/MIME (spoofing defense).
   * Defaults to true when `accept`, `allowedExtensions`, or `allowedMimeTypes` is set.
   */
  verifyMagicBytes?: boolean;
  /**
   * Scan PDF/SVG payloads for SQL-injection-like or script-like ASCII patterns (best-effort).
   * May false-positive on legitimate technical documents — disable if needed.
   * Server-side validation is still required for production.
   */
  scanPdfForSqlInjection?: boolean;
  /** Max bytes read for magic-byte and content scans (default 256 KiB) */
  maxScanBytes?: number;
  /** Passed to the native file input */
  capture?: boolean | "user" | "environment";
  onFilesChange?: (files: File[]) => void;
  onError?: (message: string) => void;
  /** Reset the native input after handling so the same file can be chosen again */
  clearInputAfterSelect?: boolean;
  size?: FileUploadSize;
  /**
   * Icon above the label (dropzone) or inside the button (`variant="button"`). Omit for the default
   * upload glyph; pass `null` to hide. In button mode it is passed to `Button` `icon` (element / src).
   */
  icon?: ReactNode | null;
  id?: string;
}

/** Alias — same props as `FileUpload` */
export type DropzoneProps = FileUploadProps;
