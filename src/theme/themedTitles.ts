/**
 * Themed `title` tooltips.
 *
 * The native `title` tooltip is drawn by the browser / OS and ignores `data-theme` (light grey box in
 * dark themes). `enableThemedTitles()` replaces it app-wide with one token-styled tooltip:
 * on hover / keyboard focus the element's `title` is parked in `data-ucs-title` (so the native one
 * cannot appear), a `role="tooltip"` element shows the text and is linked via `aria-describedby`;
 * on leave everything is restored. Apps keep writing plain `title="…"` — no per-component change.
 */
import "./themedTitles.css";

export interface ThemedTitlesOptions {
  /** Hover delay before showing (ms). @default 400 */
  delay?: number;
  /** Elements matching this selector keep the native title. */
  exclude?: string;
}

const PARKED = "data-ucs-title";
const TIP_ID = "ucs-title-tip";

let active: (() => void) | null = null;

export function enableThemedTitles(options: ThemedTitlesOptions = {}): () => void {
  if (typeof document === "undefined") return () => {};
  active?.();
  const delay = options.delay ?? 400;
  const exclude = options.exclude;

  const tip = document.createElement("div");
  tip.id = TIP_ID;
  tip.className = "ucs-title-tip";
  tip.setAttribute("role", "tooltip");
  tip.hidden = true;
  document.body.appendChild(tip);

  let owner: Element | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let prevDescribedBy: string | null = null;

  const restore = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    tip.hidden = true;
    if (!owner) return;
    const text = owner.getAttribute(PARKED);
    if (text !== null && !owner.hasAttribute("title")) owner.setAttribute("title", text);
    owner.removeAttribute(PARKED);
    if (prevDescribedBy) owner.setAttribute("aria-describedby", prevDescribedBy);
    else owner.removeAttribute("aria-describedby");
    owner = null;
    prevDescribedBy = null;
  };

  const place = (x: number, y: number, below: number) => {
    const pad = 8;
    const { innerWidth: vw, innerHeight: vh } = window;
    const r = tip.getBoundingClientRect();
    let left = Math.min(Math.max(pad, x), vw - r.width - pad);
    let top = below;
    if (top + r.height + pad > vh) top = y - r.height - 8;
    left = Math.max(pad, left);
    tip.style.left = `${left}px`;
    tip.style.top = `${Math.max(pad, top)}px`;
  };

  const claim = (el: Element, show: () => void) => {
    if (owner === el) return;
    restore();
    const text = el.getAttribute("title");
    if (!text || !text.trim()) return;
    owner = el;
    el.setAttribute(PARKED, text);
    el.removeAttribute("title");
    prevDescribedBy = el.getAttribute("aria-describedby");
    el.setAttribute("aria-describedby", prevDescribedBy ? `${prevDescribedBy} ${TIP_ID}` : TIP_ID);
    tip.textContent = text;
    timer = setTimeout(() => {
      tip.hidden = false;
      show();
    }, delay);
  };

  const target = (node: EventTarget | null): Element | null => {
    if (!(node instanceof Element)) return null;
    const el = node.closest("[title]");
    if (!el || el === tip) return null;
    if (exclude && el.closest(exclude)) return null;
    return el;
  };

  const onOver = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const el = target(e.target);
    if (!el) return;
    const { clientX, clientY } = e;
    claim(el, () => place(clientX, clientY, clientY + 18));
  };
  const onOut = (e: PointerEvent) => {
    if (!owner) return;
    const to = e.relatedTarget;
    if (to instanceof Node && owner.contains(to)) return;
    restore();
  };
  const onFocus = (e: FocusEvent) => {
    const el = target(e.target);
    if (!el) return;
    claim(el, () => {
      const r = el.getBoundingClientRect();
      place(r.left, r.top, r.bottom + 6);
    });
  };
  const onBlur = () => restore();
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") restore();
  };
  const onDismiss = () => restore();

  document.addEventListener("pointerover", onOver, true);
  document.addEventListener("pointerout", onOut, true);
  document.addEventListener("focusin", onFocus, true);
  document.addEventListener("focusout", onBlur, true);
  document.addEventListener("keydown", onKey, true);
  document.addEventListener("pointerdown", onDismiss, true);
  window.addEventListener("scroll", onDismiss, true);

  const dispose = () => {
    restore();
    document.removeEventListener("pointerover", onOver, true);
    document.removeEventListener("pointerout", onOut, true);
    document.removeEventListener("focusin", onFocus, true);
    document.removeEventListener("focusout", onBlur, true);
    document.removeEventListener("keydown", onKey, true);
    document.removeEventListener("pointerdown", onDismiss, true);
    window.removeEventListener("scroll", onDismiss, true);
    tip.remove();
    if (active === dispose) active = null;
  };
  active = dispose;
  return dispose;
}
