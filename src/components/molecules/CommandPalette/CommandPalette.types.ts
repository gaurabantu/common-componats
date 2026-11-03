import type { ReactNode } from "react";

export interface CommandItem {
  /** Unique within its group. */
  id: string;
  label: string;
  /** Secondary line under the label (also searched, lowest weight). */
  description?: string;
  /** Decorative leading icon (hidden from assistive tech). */
  icon?: ReactNode;
  /** Shortcut hint drawn with `Kbd`, e.g. `["mod", "shift", "p"]`. Display only — the app owns the binding. */
  shortcut?: string[];
  /** Extra search terms (synonyms, ids). Matched after the label. */
  keywords?: string[];
  /** Runs on Enter / click. The palette closes first when `closeOnSelect` (default). */
  onSelect: (item: CommandItem) => void;
  /** Shown (with `aria-disabled`) but skipped by arrow keys and not selectable. */
  disabled?: boolean;
}

export interface CommandGroup {
  /** Unique across groups. */
  id: string;
  label: string;
  items: CommandItem[];
}

/** One option after filtering, flattened in display order. */
export interface CommandOption {
  /** Stable key `groupId::itemId`. */
  key: string;
  groupId: string;
  item: CommandItem;
  /** Ranking score (0 when the query is empty). */
  score: number;
}

export interface RankedGroup {
  group: CommandGroup;
  options: CommandOption[];
}

export interface CommandSearchContext {
  /** Aborted when a newer query supersedes this one or the palette closes. */
  signal: AbortSignal;
}

export interface CommandPaletteProps {
  /** Controlled open state. Omit for uncontrolled (hotkey-driven) use. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Local commands, ranked client-side against the query. */
  groups: CommandGroup[];
  /** Shown first while the query is empty (hidden once the user types). */
  recent?: CommandGroup;
  /** Default `"Type a command or search…"`. */
  placeholder?: string;
  /** Shown when the query matches nothing (and nothing is loading). Default `"No results found."`. */
  emptyState?: ReactNode;
  /**
   * Remote search, debounced by `searchDebounceMs`. Return groups (sync or via a Promise) to append
   * them after the local results — they are shown as returned, not re-ranked. Stale responses are
   * ignored and `signal` is aborted. Return nothing if you feed results through `groups` instead.
   */
  onSearch?: (
    query: string,
    context: CommandSearchContext,
  ) => void | CommandGroup[] | Promise<void | CommandGroup[]>;
  /** Default 200 ms. */
  searchDebounceMs?: number;
  /** External loading flag (e.g. when results arrive through `groups`). OR-ed with the internal one. */
  loading?: boolean;
  /** Rank/filter `groups` locally. Default true. */
  shouldFilter?: boolean;
  /** Default `["mod", "k"]` (⌘K on macOS, Ctrl+K elsewhere). */
  hotkey?: string[];
  /** Default true. Registers a document listener that toggles the palette. */
  enableHotkey?: boolean;
  /** Let the hotkey fire while focus is in an input / textarea / select / contenteditable. Default false. */
  allowInInputs?: boolean;
  /** Default true. */
  closeOnSelect?: boolean;
  /** Return focus to the element focused before opening. Default true. */
  returnFocus?: boolean;
  /** Dialog accessible name. Default `"Command palette"`. */
  ariaLabel?: string;
  /** Search input accessible name. Default `"Search commands"`. */
  inputLabel?: string;
  /** Listbox accessible name. Default `"Commands"`. */
  listLabel?: string;
  /** Close button accessible name. Default `"Close"`. */
  closeLabel?: string;
  /** Live-region text while loading. Default `"Loading results…"`. */
  loadingLabel?: string;
  /** Live-region text for the result count. Default `n === 0 ? "No results" : "n result(s)"`. */
  resultsLabel?: (count: number) => string;
  /** Delay before the result count is announced (avoids one announcement per keystroke). Default 500 ms. */
  announceDelayMs?: number;
  /** Show the ↑↓ / ↵ / Esc hint footer. Default true. */
  showFooter?: boolean;
  className?: string;
  id?: string;
}
