import type { HTMLAttributes, ReactNode } from "react";

export type FileUploadSize = "sm" | "md";

export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onError"> {
  /** Visible title inside the dropzone (also used for the control’s accessible name) */
  label: string;
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
   * Icon above the label. Omit for default upload glyph; pass `null` to hide.
   */
  icon?: ReactNode | null;
  id?: string;
}

/** Alias — same props as `FileUpload` */
export type DropzoneProps = FileUploadProps;
