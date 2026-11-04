"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { ChangeEvent, RefObject } from "react";
import { parseAcceptString, validateFilesSecurity } from "./fileUploadSecurity";

/** Validation + picker options shared by `useFilePicker` and `FileUpload`. */
export interface UseFilePickerOptions {
  /** Native `accept` (e.g. `".csv,.xlsx"` or `"image/*"`). Also used for validation. */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** Native `name` on the input (form posts). */
  name?: string;
  /** When `multiple`, caps how many files are accepted. */
  maxFiles?: number;
  /** Per-file maximum size in bytes. */
  maxSizeBytes?: number;
  /** Allowed extensions (with dot), combined with `accept` / `allowedMimeTypes`. */
  allowedExtensions?: string[];
  /** Allowed MIME types (wildcards like `image/*` supported). */
  allowedMimeTypes?: string[];
  /**
   * Verify content (magic bytes) matches extension/MIME. Defaults to `true` when `accept`,
   * `allowedExtensions` or `allowedMimeTypes` is set.
   */
  verifyMagicBytes?: boolean;
  /** Best-effort scan of PDF/SVG payloads for SQL-/script-like patterns. @default false */
  scanPdfForSqlInjection?: boolean;
  /** Max bytes read for magic-byte / content scans (default 256 KiB). */
  maxScanBytes?: number;
  /** Passed to the native input. */
  capture?: boolean | "user" | "environment";
  /** Called with the validated files. */
  onFiles?: (files: File[]) => void;
  /** Called with a human-readable message when validation fails. */
  onError?: (message: string) => void;
  /** Reset the input after handling so the same file can be picked again. @default true */
  clearInputAfterSelect?: boolean;
}

/** Props to spread onto a native `<input>` — a hidden, non-focusable file input by default. */
export interface FilePickerInputProps {
  ref: RefObject<HTMLInputElement | null>;
  type: "file";
  accept?: string;
  multiple: boolean;
  disabled: boolean;
  name?: string;
  capture?: "user" | "environment";
  hidden: boolean;
  tabIndex: number;
  "aria-hidden": boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface UseFilePickerResult {
  /** Opens the native file dialog (no-op while `disabled`). Call from a click handler. */
  open: () => void;
  /** Spread onto `<input {...inputProps} />` (hidden + `tabIndex=-1` + `aria-hidden`). */
  inputProps: FilePickerInputProps;
  /** Same ref as `inputProps.ref`. */
  inputRef: RefObject<HTMLInputElement | null>;
  /** Last validation error, or `null`. */
  error: string | null;
  clearError: () => void;
  /**
   * Validate and commit files from another source (e.g. a drop event). Resolves `true` when
   * the files passed validation and `onFiles` was called.
   */
  handleFiles: (files: File[] | FileList | null) => Promise<boolean>;
}

function toArray(list: File[] | FileList | null | undefined): File[] {
  if (!list || list.length === 0) return [];
  return Array.from(list);
}

function formatLimit(maxSizeBytes: number): string {
  return maxSizeBytes >= 1024 * 1024
    ? `${(maxSizeBytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(maxSizeBytes / 1024))} KB`;
}

/**
 * Headless file picker: hidden native input + `open()` so any existing button can open the dialog,
 * with the same validation as `FileUpload` (count, size, accept/extension/MIME allowlist,
 * magic-byte spoofing check, optional content scan). Always re-validate on the server.
 *
 * ```tsx
 * const picker = useFilePicker({ accept: ".csv", onFiles: ([f]) => importCsv(f) });
 * <Button onClick={picker.open}>Import CSV</Button>
 * <input {...picker.inputProps} />
 * ```
 */
export function useFilePicker(options: UseFilePickerOptions = {}): UseFilePickerResult {
  const {
    accept,
    multiple = false,
    disabled = false,
    name,
    maxFiles,
    maxSizeBytes,
    allowedExtensions,
    allowedMimeTypes,
    verifyMagicBytes,
    scanPdfForSqlInjection = false,
    maxScanBytes,
    capture,
    onFiles,
    onError,
    clearInputAfterSelect = true,
  } = options;

  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const parsedAccept = useMemo(() => parseAcceptString(accept), [accept]);
  const hasAllowlist =
    (allowedExtensions?.length ?? 0) > 0 ||
    (allowedMimeTypes?.length ?? 0) > 0 ||
    parsedAccept.extensions.length > 0 ||
    parsedAccept.mimes.length > 0;

  const securityOptions = useMemo(
    () => ({
      accept,
      allowedExtensions,
      allowedMimeTypes,
      verifyMagicBytes: verifyMagicBytes !== undefined ? verifyMagicBytes : hasAllowlist,
      scanPdfForSqlInjection,
      maxScanBytes,
    }),
    [accept, allowedExtensions, allowedMimeTypes, verifyMagicBytes, hasAllowlist, scanPdfForSqlInjection, maxScanBytes],
  );

  const validateSync = useCallback(
    (files: File[]): string | null => {
      if (files.length === 0) return null;
      if (multiple && maxFiles != null && files.length > maxFiles) {
        return `You can upload at most ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`;
      }
      if (!multiple && files.length > 1) return "Only one file is allowed.";
      if (maxSizeBytes != null) {
        for (const f of files) {
          if (f.size > maxSizeBytes) return `“${f.name}” is larger than ${formatLimit(maxSizeBytes)}.`;
        }
      }
      return null;
    },
    [maxFiles, maxSizeBytes, multiple],
  );

  const handleFiles = useCallback(
    async (list: File[] | FileList | null): Promise<boolean> => {
      const files = toArray(list);
      const fail = (msg: string) => {
        setError(msg);
        onError?.(msg);
        if (clearInputAfterSelect && inputRef.current) inputRef.current.value = "";
        return false;
      };
      const syncErr = validateSync(files);
      if (syncErr) return fail(syncErr);
      const secErr = await validateFilesSecurity(files, securityOptions);
      if (secErr) return fail(secErr);
      setError(null);
      onFiles?.(files);
      if (clearInputAfterSelect && inputRef.current) inputRef.current.value = "";
      return true;
    },
    [clearInputAfterSelect, onError, onFiles, securityOptions, validateSync],
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      void handleFiles(e.target.files);
    },
    [handleFiles],
  );

  const open = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const clearError = useCallback(() => setError(null), []);

  const captureValue: "user" | "environment" | undefined =
    capture === true ? "user" : capture === false || capture == null ? undefined : capture;

  const inputProps = useMemo<FilePickerInputProps>(
    () => ({
      ref: inputRef,
      type: "file",
      accept,
      multiple,
      disabled,
      name,
      ...(captureValue ? { capture: captureValue } : {}),
      hidden: true,
      tabIndex: -1,
      "aria-hidden": true,
      onChange,
    }),
    [accept, multiple, disabled, name, captureValue, onChange],
  );

  return { open, inputProps, inputRef, error, clearError, handleFiles };
}

export default useFilePicker;
