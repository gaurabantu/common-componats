/**
 * Client-side file validation helpers. Browser checks can be bypassed — always re-validate on the server.
 */

export interface FileUploadSecurityOptions {
  /** Lowercase extensions with dot, e.g. [".pdf", ".png"] */
  allowedExtensions?: string[];
  /** e.g. ["application/pdf", "image/png"] */
  allowedMimeTypes?: string[];
  /**
   * When true, file content (magic bytes) must match the declared type.
   * Defaults to true if any allowlist or `accept` is used.
   */
  verifyMagicBytes?: boolean;
  /**
   * Best-effort scan of PDF (and optional text-like) payloads for SQL-injection-like ASCII patterns.
   * Can false-positive on legitimate PDFs with technical text — disable if needed.
   */
  scanPdfForSqlInjection?: boolean;
  /** Bytes read for magic + content scan (default 256 KiB) */
  maxScanBytes?: number;
}

const DEFAULT_SCAN_BYTES = 256 * 1024;

/** SQLi-like patterns in decoded scan window (best-effort; may false-positive on technical PDFs). */
const SQL_INJECTION_LIKE = [
  /\bUNION\s+(ALL\s+)?SELECT\b/i,
  /\bDROP\s+TABLE\b/i,
  /\bOR\s+['"]?\d+['"]?\s*=\s*['"]?\d+/i,
  /\bEXEC(\s+|\()\s*(xp_|sp_)/i,
  /;\s*--/,
  /('|"|`)\s*;\s*(DROP|DELETE|TRUNCATE|ALTER|EXEC)\b/i,
];

const SCRIPT_LIKE = [/<script\b/i, /javascript\s*:/i, /on\w+\s*=\s*["'][^"']*["']/i];

function normalizeExt(ext: string): string {
  const t = ext.trim().toLowerCase();
  return t.startsWith(".") ? t : `.${t}`;
}

export function parseAcceptString(accept: string | undefined): { extensions: string[]; mimes: string[] } {
  if (!accept || !accept.trim()) return { extensions: [], mimes: [] };
  const extensions: string[] = [];
  const mimes: string[] = [];
  for (const raw of accept.split(",")) {
    const p = raw.trim().toLowerCase();
    if (!p) continue;
    if (p.startsWith(".")) extensions.push(normalizeExt(p));
    else if (p.includes("/")) mimes.push(p);
  }
  return { extensions, mimes };
}

export function validateFilename(name: string): string | null {
  if (!name || !name.trim()) return "Invalid file name.";
  const base = name.replace(/^.*[/\\]/, "");
  if (base !== name) return "File name cannot contain path segments.";
  if (/[\0\x00-\x08\x0b\x0c\x0e-\x1f]/.test(name)) return "File name contains invalid characters.";
  if (name.includes("..")) return "Invalid file name.";
  if (name.length > 240) return "File name is too long.";
  return null;
}

function getExtension(filename: string): string {
  const base = filename.replace(/^.*[/\\]/, "");
  const i = base.lastIndexOf(".");
  if (i <= 0) return "";
  return normalizeExt(base.slice(i));
}

export type DetectedKind =
  | "pdf"
  | "png"
  | "jpeg"
  | "gif"
  | "webp"
  | "svg"
  | "zip"
  | "unknown";

export function detectFileKindFromBuffer(buffer: ArrayBuffer): DetectedKind {
  const u = new Uint8Array(buffer.slice(0, Math.min(32, buffer.byteLength)));
  if (u.length < 4) return "unknown";

  // PDF
  if (u[0] === 0x25 && u[1] === 0x50 && u[2] === 0x44 && u[3] === 0x46) return "pdf";

  // PNG
  if (
    u.length >= 8 &&
    u[0] === 0x89 &&
    u[1] === 0x50 &&
    u[2] === 0x4e &&
    u[3] === 0x47 &&
    u[4] === 0x0d &&
    u[5] === 0x0a &&
    u[6] === 0x1a &&
    u[7] === 0x0a
  ) {
    return "png";
  }

  // JPEG
  if (u[0] === 0xff && u[1] === 0xd8 && u[2] === 0xff) return "jpeg";

  // GIF
  if (u.length >= 6 && u[0] === 0x47 && u[1] === 0x49 && u[2] === 0x46 && u[3] === 0x38) return "gif";

  // WEBP (RIFF....WEBP)
  if (
    u.length >= 12 &&
    u[0] === 0x52 &&
    u[1] === 0x49 &&
    u[2] === 0x46 &&
    u[3] === 0x46 &&
    u[8] === 0x57 &&
    u[9] === 0x45 &&
    u[10] === 0x42 &&
    u[11] === 0x50
  ) {
    return "webp";
  }

  // ZIP (docx/xlsx are zip — treat as zip)
  if (u[0] === 0x50 && u[1] === 0x4b && (u[2] === 0x03 || u[2] === 0x05 || u[2] === 0x07)) return "zip";

  // SVG (text)
  const head = new TextDecoder("utf-8", { fatal: false }).decode(u.slice(0, Math.min(256, u.length)));
  const trimmed = head.trimStart().toLowerCase();
  const lower = head.toLowerCase();
  if (trimmed.startsWith("<svg") || (trimmed.startsWith("<?xml") && lower.includes("<svg"))) return "svg";

  return "unknown";
}

const KIND_TO_MIMES: Record<DetectedKind, string[]> = {
  pdf: ["application/pdf"],
  png: ["image/png"],
  jpeg: ["image/jpeg", "image/jpg"],
  gif: ["image/gif"],
  webp: ["image/webp"],
  svg: ["image/svg+xml"],
  zip: [
    "application/zip",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  unknown: [],
};

const EXT_TO_KIND: Record<string, DetectedKind> = {
  ".pdf": "pdf",
  ".png": "png",
  ".jpg": "jpeg",
  ".jpeg": "jpeg",
  ".gif": "gif",
  ".webp": "webp",
  ".svg": "svg",
  ".zip": "zip",
  ".docx": "zip",
  ".xlsx": "zip",
};

function mimeMatchesDeclared(mime: string, declared: string): boolean {
  const d = declared.toLowerCase().trim();
  const m = mime.toLowerCase().trim();
  if (!d || !m) return true;
  if (d === "*/*") return true;
  if (d.endsWith("/*")) {
    const prefix = d.slice(0, -1);
    return m.startsWith(prefix);
  }
  return m === d;
}

function extensionAllowed(ext: string, allowed: string[]): boolean {
  if (allowed.length === 0) return true;
  const e = normalizeExt(ext);
  return allowed.some((a) => normalizeExt(a) === e);
}

function mimeInAllowlist(mime: string, allowed: string[]): boolean {
  if (allowed.length === 0) return true;
  const m = mime.toLowerCase().trim();
  return allowed.some((a) => mimeMatchesDeclared(m, a));
}

function kindMatchesMimeAllowlist(kind: DetectedKind, allowedMimeTypes: string[]): boolean {
  if (allowedMimeTypes.length === 0) return true;
  if (kind === "unknown") return false;
  const expectedMimes = KIND_TO_MIMES[kind];
  return expectedMimes.some((m) => mimeInAllowlist(m, allowedMimeTypes));
}

function scanBufferForSuspiciousPatterns(buf: ArrayBuffer, includeScript: boolean): string | null {
  const slice = buf.byteLength > DEFAULT_SCAN_BYTES ? buf.slice(0, DEFAULT_SCAN_BYTES) : buf;
  const text = new TextDecoder("utf-8", { fatal: false }).decode(slice);
  for (const re of SQL_INJECTION_LIKE) {
    if (re.test(text)) return "File content matched a blocked SQL-like pattern.";
  }
  if (includeScript) {
    for (const re of SCRIPT_LIKE) {
      if (re.test(text)) return "File content matched a blocked script-like pattern.";
    }
  }
  return null;
}

export async function validateFileSecurity(
  file: File,
  options: FileUploadSecurityOptions & { accept?: string }
): Promise<string | null> {
  const fnErr = validateFilename(file.name);
  if (fnErr) return fnErr;

  const fromAccept = parseAcceptString(options.accept);
  const allowedExtensions = options.allowedExtensions?.length
    ? options.allowedExtensions.map(normalizeExt)
    : fromAccept.extensions;
  const allowedMimeTypes = options.allowedMimeTypes?.length
    ? options.allowedMimeTypes.map((m) => m.toLowerCase().trim())
    : fromAccept.mimes;

  const hasRestriction = allowedExtensions.length > 0 || allowedMimeTypes.length > 0;
  const verifyMagic =
    options.verifyMagicBytes !== false && (hasRestriction || options.verifyMagicBytes === true);
  const scanContent = options.scanPdfForSqlInjection === true;

  const ext = getExtension(file.name);
  if (hasRestriction) {
    if (allowedExtensions.length > 0 && !extensionAllowed(ext, allowedExtensions)) {
      return `“${file.name}” has a type that is not allowed.`;
    }
    if (file.type && allowedMimeTypes.length > 0 && !mimeInAllowlist(file.type, allowedMimeTypes)) {
      return `“${file.name}” does not match an allowed file type.`;
    }
  }

  if (!((verifyMagic && hasRestriction) || scanContent)) {
    return null;
  }

  const maxScan = Math.min(options.maxScanBytes ?? DEFAULT_SCAN_BYTES, DEFAULT_SCAN_BYTES * 4);
  const head = await file.slice(0, maxScan).arrayBuffer();

  if (head.byteLength === 0) return "File is empty.";

  const kind = detectFileKindFromBuffer(head);

  if (verifyMagic && hasRestriction) {
    if (kind === "unknown") {
      return `“${file.name}” could not be verified as a supported file format.`;
    }
    if (allowedExtensions.length > 0 && ext) {
      const expectedKind = EXT_TO_KIND[ext];
      if (expectedKind && expectedKind !== kind) {
        return `“${file.name}” content does not match its extension (possible spoofing).`;
      }
    }
    if (allowedMimeTypes.length > 0 && !kindMatchesMimeAllowlist(kind, allowedMimeTypes)) {
      return `“${file.name}” content does not match an allowed type (MIME / magic bytes).`;
    }
  }

  if (scanContent && kind === "pdf") {
    const sqlErr = scanBufferForSuspiciousPatterns(head, false);
    if (sqlErr) return `“${file.name}”: ${sqlErr}`;
  }

  if (scanContent && kind === "svg") {
    const xssErr = scanBufferForSuspiciousPatterns(head, true);
    if (xssErr) return `“${file.name}”: ${xssErr}`;
  }

  return null;
}

export async function validateFilesSecurity(
  files: File[],
  options: FileUploadSecurityOptions & { accept?: string }
): Promise<string | null> {
  for (const f of files) {
    const err = await validateFileSecurity(f, options);
    if (err) return err;
  }
  return null;
}
