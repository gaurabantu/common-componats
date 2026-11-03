/**
 * Copy text to the clipboard. Uses the async Clipboard API when available (secure contexts),
 * falling back to a hidden textarea + `execCommand("copy")` for older / insecure contexts.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  if (typeof document === "undefined") return false;
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(area);
  return ok;
}

/** Trim one leading/trailing blank line so template literals read naturally. */
export function normalizeCode(code: string): string {
  return code.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
}
