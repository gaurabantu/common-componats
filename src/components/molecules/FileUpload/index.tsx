"use client";

import React, { useCallback, useId, useRef, useState } from "react";
import type { FileUploadProps } from "./FileUpload.types";
import { useFilePicker } from "./useFilePicker";
import Button from "../../atoms/Button";
import "./FileUpload.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function SmallUploadIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M18 15v3H6v-3H4v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3h-2ZM7 9l5-5.5L17 9h-4v4H7V9Z"
      />
    </svg>
  );
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
  variant = "dropzone",
  buttonVariant = "outlineSecondary",
  buttonSize = "md",
  buttonProps,
  ...rest
}: FileUploadProps) {
  const reactId = useId();
  const baseId = idProp ?? `file-upload-${reactId.replace(/:/g, "")}`;
  const isButton = variant === "button";
  // Dropzone: `id` is the input's (the label targets it). Button: `id` is the Button's (the focusable control).
  const inputId = isButton ? `${baseId}-input` : baseId;
  const descId = `${baseId}-desc`;
  const errId = `${baseId}-err`;
  const dragDepth = useRef(0);
  const [dragging, setDragging] = useState(false);

  const picker = useFilePicker({
    accept,
    multiple,
    disabled,
    name,
    maxFiles,
    maxSizeBytes,
    allowedExtensions,
    allowedMimeTypes,
    verifyMagicBytes,
    scanPdfForSqlInjection,
    maxScanBytes,
    capture,
    onFiles: onFilesChange,
    onError,
    clearInputAfterSelect,
  });
  const { hidden: _hidden, tabIndex: _tabIndex, "aria-hidden": _ariaHidden, ...visibleInputProps } = picker.inputProps;
  const { handleFiles } = picker;

  const showError = errorMessage ?? picker.error ?? undefined;
  const describedBy = cls(description && descId, showError && errId) || undefined;

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
      void handleFiles(e.dataTransfer.files);
    },
    [handleFiles, disabled]
  );

  const messages = (
    <>
      {isButton && description ? (
        <p id={descId} className="ds-file-upload__description">
          {description}
        </p>
      ) : null}
      {showError ? (
        <p id={errId} className="ds-file-upload__error" role="alert">
          {showError}
        </p>
      ) : null}
    </>
  );

  if (isButton) {
    return (
      <div
        className={cls("ds-file-upload", "ds-file-upload--button", className)}
        data-size={size}
        data-variant="button"
        data-error={showError ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        {...rest}
      >
        <input {...picker.inputProps} id={inputId} required={required} />
        <Button
          type="button"
          variant={buttonVariant}
          size={buttonSize}
          {...buttonProps}
          id={baseId}
          disabled={disabled}
          onClick={picker.open}
          aria-describedby={describedBy}
          aria-invalid={showError ? true : undefined}
          icon={icon === null ? undefined : icon === undefined ? <SmallUploadIcon /> : icon}
        >
          {label}
        </Button>
        {messages}
      </div>
    );
  }

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
        {...visibleInputProps}
        id={inputId}
        className="ds-file-upload__input"
        required={required}
        aria-invalid={showError ? true : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
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
      {messages}
    </div>
  );
});

export default FileUpload;

export const Dropzone = FileUpload;

export type { FileUploadProps, FileUploadSize, FileUploadVariant, DropzoneProps } from "./FileUpload.types";
export { useFilePicker } from "./useFilePicker";
export type { UseFilePickerOptions, UseFilePickerResult, FilePickerInputProps } from "./useFilePicker";

export {
  validateFilename,
  detectFileKindFromBuffer,
  validateFileSecurity,
  validateFilesSecurity,
  parseAcceptString,
} from "./fileUploadSecurity";
export type { DetectedKind, FileUploadSecurityOptions } from "./fileUploadSecurity";
