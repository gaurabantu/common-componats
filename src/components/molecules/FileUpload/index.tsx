"use client";

import React, { useCallback, useId, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { FileUploadProps } from "./FileUpload.types";
import { parseAcceptString, validateFilesSecurity } from "./fileUploadSecurity";
import "./FileUpload.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function fileListToArray(list: FileList | null): File[] {
  if (!list || list.length === 0) return [];
  return Array.from(list);
}

function DefaultUploadIcon() {
  return (
    <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M18 15v3H6v-3H4v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3h-2ZM7 9l5-5.5L17 9h-4v4H7V9Z"
      />
    </svg>
  );
}

/**
 * File picker with drag-and-drop. Uses a native `<input type="file">` (focusable, form-friendly)
 * with optional size limits and client-side security checks (magic bytes, MIME, filename, content scan).
 * Always re-validate uploads on the server.
 */
const FileUpload = React.memo(function FileUpload({
  label,
  description,
  errorMessage,
  name,
  accept,
  multiple = false,
  disabled = false,
  required = false,
  maxFiles,
  maxSizeBytes,
  allowedExtensions,
  allowedMimeTypes,
  verifyMagicBytes,
  scanPdfForSqlInjection = false,
  maxScanBytes,
  capture,
  onFilesChange,
  onError,
  clearInputAfterSelect = true,
  size = "md",
  icon,
  id: idProp,
  className,
  ...rest
}: FileUploadProps) {
  const reactId = useId();
  const inputId = idProp ?? `file-upload-${reactId.replace(/:/g, "")}`;
  const descId = `${inputId}-desc`;
  const errId = `${inputId}-err`;
  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const showError = errorMessage ?? internalError ?? undefined;
  const describedBy = cls(description && descId, showError && errId) || undefined;

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
      verifyMagicBytes:
        verifyMagicBytes !== undefined
          ? verifyMagicBytes
          : hasAllowlist
            ? true
            : false,
      scanPdfForSqlInjection,
      maxScanBytes,
    }),
    [
      accept,
      allowedExtensions,
      allowedMimeTypes,
      verifyMagicBytes,
      hasAllowlist,
      scanPdfForSqlInjection,
      maxScanBytes,
    ]
  );

  const validateSync = useCallback(
    (files: File[]): string | null => {
      if (files.length === 0) return null;
      if (multiple && maxFiles != null && files.length > maxFiles) {
        return `You can upload at most ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`;
      }
      if (!multiple && files.length > 1) {
        return "Only one file is allowed.";
      }
      if (maxSizeBytes != null) {
        for (const f of files) {
          if (f.size > maxSizeBytes) {
            const limit =
              maxSizeBytes >= 1024 * 1024
                ? `${(maxSizeBytes / (1024 * 1024)).toFixed(1)} MB`
                : `${Math.max(1, Math.round(maxSizeBytes / 1024))} KB`;
            return `“${f.name}” is larger than ${limit}.`;
          }
        }
      }
      return null;
    },
    [maxFiles, maxSizeBytes, multiple]
  );

  const commitFiles = useCallback(
    async (files: File[]) => {
      const syncErr = validateSync(files);
      if (syncErr) {
        setInternalError(syncErr);
        onError?.(syncErr);
        return;
      }

      const secErr = await validateFilesSecurity(files, securityOptions);
      if (secErr) {
        setInternalError(secErr);
        onError?.(secErr);
        return;
      }

      setInternalError(null);
      onFilesChange?.(files);
      if (clearInputAfterSelect && inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [clearInputAfterSelect, onError, onFilesChange, securityOptions, validateSync]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = fileListToArray(e.target.files);
      void commitFiles(files);
    },
    [commitFiles]
  );

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    dragDepth.current += 1;
    setDragging(true);
  }, [disabled]);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setDragging(false);
    }
  }, [disabled]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      e.dataTransfer.dropEffect = "copy";
    }
  }, [disabled]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragDepth.current = 0;
      setDragging(false);
      if (disabled) return;
      const files = fileListToArray(e.dataTransfer.files);
      void commitFiles(files);
    },
    [commitFiles, disabled]
  );

  const captureProp =
    capture === true ? { capture: "user" as const }
    : capture === false ? {}
    : capture != null ? { capture }
    : {};

  return (
    <div
      className={cls("ds-file-upload", className)}
      data-size={size}
      data-dragging={dragging ? "true" : undefined}
      data-error={showError ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      {...rest}
    >
      <input
        ref={inputRef}
        id={inputId}
        name={name}
        type="file"
        className="ds-file-upload__input"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        required={required}
        aria-invalid={showError ? true : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        onChange={handleInputChange}
        {...captureProp}
      />
      <div
        className="ds-file-upload__zone"
        data-disabled={disabled ? "true" : undefined}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <label htmlFor={inputId} className="ds-file-upload__label">
          {icon !== null ? (
            <span className="ds-file-upload__icon">
              {icon === undefined ? <DefaultUploadIcon /> : icon}
            </span>
          ) : null}
          <span>{label}</span>
          {description ? (
            <p id={descId} className="ds-file-upload__description">
              {description}
            </p>
          ) : null}
        </label>
      </div>
      {showError ? (
        <p id={errId} className="ds-file-upload__error" role="alert">
          {showError}
        </p>
      ) : null}
    </div>
  );
});

export default FileUpload;

export const Dropzone = FileUpload;

export type { FileUploadProps, FileUploadSize, DropzoneProps } from "./FileUpload.types";

export {
  validateFilename,
  detectFileKindFromBuffer,
  validateFileSecurity,
  validateFilesSecurity,
  parseAcceptString,
} from "./fileUploadSecurity";
export type { DetectedKind, FileUploadSecurityOptions } from "./fileUploadSecurity";
