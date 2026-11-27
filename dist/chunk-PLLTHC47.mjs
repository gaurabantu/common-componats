/* ucs:component-css */
import "./styles/components/molecules/FileUpload/FileUpload.css";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";

// src/components/molecules/FileUpload/index.tsx
import React, { useCallback as useCallback2, useId, useRef as useRef2, useState as useState2 } from "react";

// src/components/molecules/FileUpload/useFilePicker.ts
import { useCallback, useMemo, useRef, useState } from "react";

// src/components/molecules/FileUpload/fileUploadSecurity.ts
var DEFAULT_SCAN_BYTES = 256 * 1024;
var SQL_INJECTION_LIKE = [
  /\bUNION\s+(ALL\s+)?SELECT\b/i,
  /\bDROP\s+TABLE\b/i,
  /\bOR\s+['"]?\d+['"]?\s*=\s*['"]?\d+/i,
  /\bEXEC(\s+|\()\s*(xp_|sp_)/i,
  /;\s*--/,
  /('|"|`)\s*;\s*(DROP|DELETE|TRUNCATE|ALTER|EXEC)\b/i
];
var SCRIPT_LIKE = [/<script\b/i, /javascript\s*:/i, /on\w+\s*=\s*["'][^"']*["']/i];
function normalizeExt(ext) {
  const t = ext.trim().toLowerCase();
  return t.startsWith(".") ? t : `.${t}`;
}
function parseAcceptString(accept) {
  if (!accept || !accept.trim())
    return { extensions: [], mimes: [] };
  const extensions = [];
  const mimes = [];
  for (const raw of accept.split(",")) {
    const p = raw.trim().toLowerCase();
    if (!p)
      continue;
    if (p.startsWith("."))
      extensions.push(normalizeExt(p));
    else if (p.includes("/"))
      mimes.push(p);
  }
  return { extensions, mimes };
}
function validateFilename(name) {
  if (!name || !name.trim())
    return "Invalid file name.";
  const base = name.replace(/^.*[/\\]/, "");
  if (base !== name)
    return "File name cannot contain path segments.";
  if (/[\0\x00-\x08\x0b\x0c\x0e-\x1f]/.test(name))
    return "File name contains invalid characters.";
  if (name.includes(".."))
    return "Invalid file name.";
  if (name.length > 240)
    return "File name is too long.";
  return null;
}
function getExtension(filename) {
  const base = filename.replace(/^.*[/\\]/, "");
  const i = base.lastIndexOf(".");
  if (i <= 0)
    return "";
  return normalizeExt(base.slice(i));
}
function detectFileKindFromBuffer(buffer) {
  const u = new Uint8Array(buffer.slice(0, Math.min(32, buffer.byteLength)));
  if (u.length < 4)
    return "unknown";
  if (u[0] === 37 && u[1] === 80 && u[2] === 68 && u[3] === 70)
    return "pdf";
  if (u.length >= 8 && u[0] === 137 && u[1] === 80 && u[2] === 78 && u[3] === 71 && u[4] === 13 && u[5] === 10 && u[6] === 26 && u[7] === 10) {
    return "png";
  }
  if (u[0] === 255 && u[1] === 216 && u[2] === 255)
    return "jpeg";
  if (u.length >= 6 && u[0] === 71 && u[1] === 73 && u[2] === 70 && u[3] === 56)
    return "gif";
  if (u.length >= 12 && u[0] === 82 && u[1] === 73 && u[2] === 70 && u[3] === 70 && u[8] === 87 && u[9] === 69 && u[10] === 66 && u[11] === 80) {
    return "webp";
  }
  if (u[0] === 80 && u[1] === 75 && (u[2] === 3 || u[2] === 5 || u[2] === 7))
    return "zip";
  const head = new TextDecoder("utf-8", { fatal: false }).decode(u.slice(0, Math.min(256, u.length)));
  const trimmed = head.trimStart().toLowerCase();
  const lower = head.toLowerCase();
  if (trimmed.startsWith("<svg") || trimmed.startsWith("<?xml") && lower.includes("<svg"))
    return "svg";
  return "unknown";
}
var KIND_TO_MIMES = {
  pdf: ["application/pdf"],
  png: ["image/png"],
  jpeg: ["image/jpeg", "image/jpg"],
  gif: ["image/gif"],
  webp: ["image/webp"],
  svg: ["image/svg+xml"],
  zip: [
    "application/zip",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ],
  unknown: []
};
var EXT_TO_KIND = {
  ".pdf": "pdf",
  ".png": "png",
  ".jpg": "jpeg",
  ".jpeg": "jpeg",
  ".gif": "gif",
  ".webp": "webp",
  ".svg": "svg",
  ".zip": "zip",
  ".docx": "zip",
  ".xlsx": "zip"
};
function mimeMatchesDeclared(mime, declared) {
  const d = declared.toLowerCase().trim();
  const m = mime.toLowerCase().trim();
  if (!d || !m)
    return true;
  if (d === "*/*")
    return true;
  if (d.endsWith("/*")) {
    const prefix = d.slice(0, -1);
    return m.startsWith(prefix);
  }
  return m === d;
}
function extensionAllowed(ext, allowed) {
  if (allowed.length === 0)
    return true;
  const e = normalizeExt(ext);
  return allowed.some((a) => normalizeExt(a) === e);
}
function mimeInAllowlist(mime, allowed) {
  if (allowed.length === 0)
    return true;
  const m = mime.toLowerCase().trim();
  return allowed.some((a) => mimeMatchesDeclared(m, a));
}
function kindMatchesMimeAllowlist(kind, allowedMimeTypes) {
  if (allowedMimeTypes.length === 0)
    return true;
  if (kind === "unknown")
    return false;
  const expectedMimes = KIND_TO_MIMES[kind];
  return expectedMimes.some((m) => mimeInAllowlist(m, allowedMimeTypes));
}
function scanBufferForSuspiciousPatterns(buf, includeScript) {
  const slice = buf.byteLength > DEFAULT_SCAN_BYTES ? buf.slice(0, DEFAULT_SCAN_BYTES) : buf;
  const text = new TextDecoder("utf-8", { fatal: false }).decode(slice);
  for (const re of SQL_INJECTION_LIKE) {
    if (re.test(text))
      return "File content matched a blocked SQL-like pattern.";
  }
  if (includeScript) {
    for (const re of SCRIPT_LIKE) {
      if (re.test(text))
        return "File content matched a blocked script-like pattern.";
    }
  }
  return null;
}
async function validateFileSecurity(file, options) {
  var _a, _b, _c;
  const fnErr = validateFilename(file.name);
  if (fnErr)
    return fnErr;
  const fromAccept = parseAcceptString(options.accept);
  const allowedExtensions = ((_a = options.allowedExtensions) == null ? void 0 : _a.length) ? options.allowedExtensions.map(normalizeExt) : fromAccept.extensions;
  const allowedMimeTypes = ((_b = options.allowedMimeTypes) == null ? void 0 : _b.length) ? options.allowedMimeTypes.map((m) => m.toLowerCase().trim()) : fromAccept.mimes;
  const hasRestriction = allowedExtensions.length > 0 || allowedMimeTypes.length > 0;
  const verifyMagic = options.verifyMagicBytes !== false && (hasRestriction || options.verifyMagicBytes === true);
  const scanContent = options.scanPdfForSqlInjection === true;
  const ext = getExtension(file.name);
  if (hasRestriction) {
    if (allowedExtensions.length > 0 && !extensionAllowed(ext, allowedExtensions)) {
      return `\u201C${file.name}\u201D has a type that is not allowed.`;
    }
    if (file.type && allowedMimeTypes.length > 0 && !mimeInAllowlist(file.type, allowedMimeTypes)) {
      return `\u201C${file.name}\u201D does not match an allowed file type.`;
    }
  }
  if (!(verifyMagic && hasRestriction || scanContent)) {
    return null;
  }
  const maxScan = Math.min((_c = options.maxScanBytes) != null ? _c : DEFAULT_SCAN_BYTES, DEFAULT_SCAN_BYTES * 4);
  const head = await file.slice(0, maxScan).arrayBuffer();
  if (head.byteLength === 0)
    return "File is empty.";
  const kind = detectFileKindFromBuffer(head);
  if (verifyMagic && hasRestriction) {
    if (kind === "unknown") {
      return `\u201C${file.name}\u201D could not be verified as a supported file format.`;
    }
    if (allowedExtensions.length > 0 && ext) {
      const expectedKind = EXT_TO_KIND[ext];
      if (expectedKind && expectedKind !== kind) {
        return `\u201C${file.name}\u201D content does not match its extension (possible spoofing).`;
      }
    }
    if (allowedMimeTypes.length > 0 && !kindMatchesMimeAllowlist(kind, allowedMimeTypes)) {
      return `\u201C${file.name}\u201D content does not match an allowed type (MIME / magic bytes).`;
    }
  }
  if (scanContent && kind === "pdf") {
    const sqlErr = scanBufferForSuspiciousPatterns(head, false);
    if (sqlErr)
      return `\u201C${file.name}\u201D: ${sqlErr}`;
  }
  if (scanContent && kind === "svg") {
    const xssErr = scanBufferForSuspiciousPatterns(head, true);
    if (xssErr)
      return `\u201C${file.name}\u201D: ${xssErr}`;
  }
  return null;
}
async function validateFilesSecurity(files, options) {
  for (const f of files) {
    const err = await validateFileSecurity(f, options);
    if (err)
      return err;
  }
  return null;
}

// src/components/molecules/FileUpload/useFilePicker.ts
function toArray(list) {
  if (!list || list.length === 0)
    return [];
  return Array.from(list);
}
function formatLimit(maxSizeBytes) {
  return maxSizeBytes >= 1024 * 1024 ? `${(maxSizeBytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(maxSizeBytes / 1024))} KB`;
}
function useFilePicker(options = {}) {
  var _a, _b;
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
    clearInputAfterSelect = true
  } = options;
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const parsedAccept = useMemo(() => parseAcceptString(accept), [accept]);
  const hasAllowlist = ((_a = allowedExtensions == null ? void 0 : allowedExtensions.length) != null ? _a : 0) > 0 || ((_b = allowedMimeTypes == null ? void 0 : allowedMimeTypes.length) != null ? _b : 0) > 0 || parsedAccept.extensions.length > 0 || parsedAccept.mimes.length > 0;
  const securityOptions = useMemo(
    () => ({
      accept,
      allowedExtensions,
      allowedMimeTypes,
      verifyMagicBytes: verifyMagicBytes !== void 0 ? verifyMagicBytes : hasAllowlist,
      scanPdfForSqlInjection,
      maxScanBytes
    }),
    [accept, allowedExtensions, allowedMimeTypes, verifyMagicBytes, hasAllowlist, scanPdfForSqlInjection, maxScanBytes]
  );
  const validateSync = useCallback(
    (files) => {
      if (files.length === 0)
        return null;
      if (multiple && maxFiles != null && files.length > maxFiles) {
        return `You can upload at most ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`;
      }
      if (!multiple && files.length > 1)
        return "Only one file is allowed.";
      if (maxSizeBytes != null) {
        for (const f of files) {
          if (f.size > maxSizeBytes)
            return `\u201C${f.name}\u201D is larger than ${formatLimit(maxSizeBytes)}.`;
        }
      }
      return null;
    },
    [maxFiles, maxSizeBytes, multiple]
  );
  const handleFiles = useCallback(
    async (list) => {
      const files = toArray(list);
      const fail = (msg) => {
        setError(msg);
        onError == null ? void 0 : onError(msg);
        if (clearInputAfterSelect && inputRef.current)
          inputRef.current.value = "";
        return false;
      };
      const syncErr = validateSync(files);
      if (syncErr)
        return fail(syncErr);
      const secErr = await validateFilesSecurity(files, securityOptions);
      if (secErr)
        return fail(secErr);
      setError(null);
      onFiles == null ? void 0 : onFiles(files);
      if (clearInputAfterSelect && inputRef.current)
        inputRef.current.value = "";
      return true;
    },
    [clearInputAfterSelect, onError, onFiles, securityOptions, validateSync]
  );
  const onChange = useCallback(
    (e) => {
      void handleFiles(e.target.files);
    },
    [handleFiles]
  );
  const open = useCallback(() => {
    var _a2;
    if (disabled)
      return;
    (_a2 = inputRef.current) == null ? void 0 : _a2.click();
  }, [disabled]);
  const clearError = useCallback(() => setError(null), []);
  const captureValue = capture === true ? "user" : capture === false || capture == null ? void 0 : capture;
  const inputProps = useMemo(
    () => ({
      ref: inputRef,
      type: "file",
      accept,
      multiple,
      disabled,
      name,
      ...captureValue ? { capture: captureValue } : {},
      hidden: true,
      tabIndex: -1,
      "aria-hidden": true,
      onChange
    }),
    [accept, multiple, disabled, name, captureValue, onChange]
  );
  return { open, inputProps, inputRef, error, clearError, handleFiles };
}

// src/components/molecules/FileUpload/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function SmallUploadIcon() {
  return /* @__PURE__ */ jsx("svg", { width: 16, height: 16, viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx(
    "path",
    {
      fill: "currentColor",
      d: "M18 15v3H6v-3H4v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3h-2ZM7 9l5-5.5L17 9h-4v4H7V9Z"
    }
  ) });
}
function DefaultUploadIcon() {
  return /* @__PURE__ */ jsx("svg", { width: 40, height: 40, viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx(
    "path",
    {
      fill: "currentColor",
      d: "M18 15v3H6v-3H4v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3h-2ZM7 9l5-5.5L17 9h-4v4H7V9Z"
    }
  ) });
}
var FileUpload = React.memo(function FileUpload2({
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
}) {
  var _a;
  const reactId = useId();
  const baseId = idProp != null ? idProp : `file-upload-${reactId.replace(/:/g, "")}`;
  const isButton = variant === "button";
  const inputId = isButton ? `${baseId}-input` : baseId;
  const descId = `${baseId}-desc`;
  const errId = `${baseId}-err`;
  const dragDepth = useRef2(0);
  const [dragging, setDragging] = useState2(false);
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
    clearInputAfterSelect
  });
  const { hidden: _hidden, tabIndex: _tabIndex, "aria-hidden": _ariaHidden, ...visibleInputProps } = picker.inputProps;
  const { handleFiles } = picker;
  const showError = (_a = errorMessage != null ? errorMessage : picker.error) != null ? _a : void 0;
  const describedBy = cls(description && descId, showError && errId) || void 0;
  const onDragEnter = useCallback2((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled)
      return;
    dragDepth.current += 1;
    setDragging(true);
  }, [disabled]);
  const onDragLeave = useCallback2((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled)
      return;
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setDragging(false);
    }
  }, [disabled]);
  const onDragOver = useCallback2((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      e.dataTransfer.dropEffect = "copy";
    }
  }, [disabled]);
  const onDrop = useCallback2(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragDepth.current = 0;
      setDragging(false);
      if (disabled)
        return;
      void handleFiles(e.dataTransfer.files);
    },
    [handleFiles, disabled]
  );
  const messages = /* @__PURE__ */ jsxs(Fragment, { children: [
    isButton && description ? /* @__PURE__ */ jsx("p", { id: descId, className: "ds-file-upload__description", children: description }) : null,
    showError ? /* @__PURE__ */ jsx("p", { id: errId, className: "ds-file-upload__error", role: "alert", children: showError }) : null
  ] });
  if (isButton) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cls("ds-file-upload", "ds-file-upload--button", className),
        "data-size": size,
        "data-variant": "button",
        "data-error": showError ? "true" : void 0,
        "data-disabled": disabled ? "true" : void 0,
        ...rest,
        children: [
          /* @__PURE__ */ jsx("input", { ...picker.inputProps, id: inputId, required }),
          /* @__PURE__ */ jsx(
            Button_default,
            {
              type: "button",
              variant: buttonVariant,
              size: buttonSize,
              ...buttonProps,
              id: baseId,
              disabled,
              onClick: picker.open,
              "aria-describedby": describedBy,
              "aria-invalid": showError ? true : void 0,
              icon: icon === null ? void 0 : icon === void 0 ? /* @__PURE__ */ jsx(SmallUploadIcon, {}) : icon,
              children: label
            }
          ),
          messages
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cls("ds-file-upload", className),
      "data-size": size,
      "data-dragging": dragging ? "true" : void 0,
      "data-error": showError ? "true" : void 0,
      "data-disabled": disabled ? "true" : void 0,
      ...rest,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...visibleInputProps,
            id: inputId,
            className: "ds-file-upload__input",
            required,
            "aria-invalid": showError ? true : void 0,
            "aria-describedby": describedBy,
            "aria-required": required || void 0
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "ds-file-upload__zone",
            "data-disabled": disabled ? "true" : void 0,
            onDragEnter,
            onDragLeave,
            onDragOver,
            onDrop,
            children: /* @__PURE__ */ jsxs("label", { htmlFor: inputId, className: "ds-file-upload__label", children: [
              icon !== null ? /* @__PURE__ */ jsx("span", { className: "ds-file-upload__icon", children: icon === void 0 ? /* @__PURE__ */ jsx(DefaultUploadIcon, {}) : icon }) : null,
              /* @__PURE__ */ jsx("span", { children: label }),
              description ? /* @__PURE__ */ jsx("p", { id: descId, className: "ds-file-upload__description", children: description }) : null
            ] })
          }
        ),
        messages
      ]
    }
  );
});
var FileUpload_default = FileUpload;
var Dropzone = FileUpload;

export {
  parseAcceptString,
  validateFilename,
  detectFileKindFromBuffer,
  validateFileSecurity,
  validateFilesSecurity,
  useFilePicker,
  FileUpload_default,
  Dropzone
};
//# sourceMappingURL=chunk-PLLTHC47.mjs.map