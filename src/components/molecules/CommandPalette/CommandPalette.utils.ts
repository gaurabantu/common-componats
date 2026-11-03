import { COMMAND_SCORES as S } from "./CommandPalette.config";
import type { CommandGroup, CommandItem, CommandOption, RankedGroup } from "./CommandPalette.types";

/** Lower-case, strip diacritics, collapse whitespace. */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Split a query into normalised tokens. */
export function tokenize(query: string): string[] {
  const normalized = normalizeText(query);
  return normalized ? normalized.split(" ") : [];
}

/** True when `token` starts a word in `text` (after a space or punctuation), not at index 0. */
function matchesWordStart(text: string, token: string): boolean {
  let from = text.indexOf(token, 1);
  while (from > 0) {
    if (/[\s\-_/.:,()[\]]/.test(text[from - 1])) return true;
    from = text.indexOf(token, from + 1);
  }
  return false;
}

function scoreLabel(label: string, token: string): number {
  if (label.startsWith(token)) return S.labelPrefix;
  if (matchesWordStart(label, token)) return S.labelWordStart;
  if (label.includes(token)) return S.labelSubstring;
  return 0;
}

function scoreKeyword(keyword: string, token: string): number {
  if (keyword === token) return S.keywordExact;
  if (keyword.startsWith(token)) return S.keywordPrefix;
  if (keyword.includes(token)) return S.keywordSubstring;
  return 0;
}

function scoreDescription(description: string, token: string): number {
  if (description.startsWith(token) || matchesWordStart(description, token)) return S.descriptionWordStart;
  if (description.includes(token)) return S.descriptionSubstring;
  return 0;
}

/**
 * Score an item against a query (0 = no match). Each token takes its best field score; all tokens
 * must match. A label equal to the whole query gets the exact bonus. Empty query → 1 (keep all).
 */
export function scoreItem(item: CommandItem, query: string): number {
  const tokens = tokenize(query);
  if (tokens.length === 0) return 1;
  const label = normalizeText(item.label);
  const keywords = (item.keywords ?? []).map(normalizeText).filter(Boolean);
  const description = item.description ? normalizeText(item.description) : "";

  let total = 0;
  for (const token of tokens) {
    let best = scoreLabel(label, token);
    for (const keyword of keywords) best = Math.max(best, scoreKeyword(keyword, token));
    if (description) best = Math.max(best, scoreDescription(description, token));
    if (best === 0) return 0;
    total += best;
  }
  if (label === tokens.join(" ")) total += S.labelExact;
  return total;
}

export function optionKey(groupId: string, itemId: string): string {
  return `${groupId}::${itemId}`;
}

/**
 * Groups unranked, in given order (empty query / filtering disabled). Empty groups dropped.
 * `keyPrefix` namespaces option keys (remote results may reuse local group ids).
 */
export function listGroups(groups: CommandGroup[], keyPrefix = ""): RankedGroup[] {
  return groups
    .filter((group) => group.items.length > 0)
    .map((group) => ({
      group,
      options: group.items.map((item) => ({
        key: keyPrefix + optionKey(group.id, item.id),
        groupId: group.id,
        item,
        score: 0,
      })),
    }));
}

/**
 * Rank and filter groups. Items sort by score (desc), ties keep source order; groups sort by their
 * best item (desc), ties keep source order; groups with no match are dropped.
 */
export function rankGroups(groups: CommandGroup[], query: string): RankedGroup[] {
  if (tokenize(query).length === 0) return listGroups(groups);
  const ranked: Array<RankedGroup & { best: number; index: number }> = [];
  groups.forEach((group, index) => {
    const options: Array<CommandOption & { order: number }> = [];
    group.items.forEach((item, order) => {
      const score = scoreItem(item, query);
      if (score > 0) options.push({ key: optionKey(group.id, item.id), groupId: group.id, item, score, order });
    });
    if (options.length === 0) return;
    options.sort((a, b) => b.score - a.score || a.order - b.order);
    ranked.push({
      group,
      options: options.map(({ order: _order, ...rest }) => rest),
      best: options[0].score,
      index,
    });
  });
  ranked.sort((a, b) => b.best - a.best || a.index - b.index);
  return ranked.map(({ group, options }) => ({ group, options }));
}

/** Flatten ranked groups into display order. */
export function flattenOptions(groups: RankedGroup[]): CommandOption[] {
  return groups.flatMap((g) => g.options);
}

/** Make a string safe for use inside an HTML id (also for `aria-activedescendant`). */
export function toDomId(value: string): string {
  return value.replace(/[^A-Za-z0-9_-]/g, (ch) => `_${ch.charCodeAt(0).toString(16)}`);
}

/** Focus is in a field where typing a letter would edit text. */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || typeof (target as Element).closest !== "function") return false;
  const el = target as HTMLElement;
  if (el.isContentEditable) return true;
  if (el.closest("[contenteditable]:not([contenteditable='false'])")) return true;
  const tag = el.tagName;
  if (tag === "TEXTAREA" || tag === "SELECT") return true;
  if (tag === "INPUT") {
    const type = ((el as HTMLInputElement).type || "text").toLowerCase();
    return !["button", "submit", "reset", "checkbox", "radio", "range", "color", "file", "image"].includes(type);
  }
  return false;
}

const MODIFIERS = new Set(["mod", "ctrl", "control", "meta", "cmd", "alt", "option", "shift"]);

/**
 * Does a keydown match a hotkey like `["mod", "k"]`? Modifiers must match exactly (no extra ones):
 * `mod` = Meta on macOS, Control elsewhere. The key compares against `event.key` (case-insensitive)
 * and falls back to `event.code` (`KeyK`, `Digit1`) so Alt/Option-altered characters still match.
 */
export function matchesHotkey(event: KeyboardEvent, hotkey: string[], isMac: boolean): boolean {
  const parts = hotkey.map((k) => k.trim().toLowerCase()).filter(Boolean);
  const key = parts.find((p) => !MODIFIERS.has(p));
  if (!key) return false;
  let ctrl = false;
  let meta = false;
  let alt = false;
  let shift = false;
  for (const p of parts) {
    if (p === "mod") {
      if (isMac) meta = true;
      else ctrl = true;
    } else if (p === "ctrl" || p === "control") ctrl = true;
    else if (p === "meta" || p === "cmd") meta = true;
    else if (p === "alt" || p === "option") alt = true;
    else if (p === "shift") shift = true;
  }
  if (event.ctrlKey !== ctrl || event.metaKey !== meta || event.altKey !== alt || event.shiftKey !== shift) {
    return false;
  }
  const eventKey = (event.key || "").toLowerCase();
  if (eventKey === key) return true;
  const code = event.code || "";
  if (key.length === 1 && /[a-z]/.test(key)) return code === `Key${key.toUpperCase()}`;
  if (key.length === 1 && /[0-9]/.test(key)) return code === `Digit${key}`;
  return false;
}
