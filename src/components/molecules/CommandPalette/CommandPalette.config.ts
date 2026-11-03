export const COMMAND_PALETTE_DEFAULTS = {
  placeholder: "Type a command or search…",
  emptyState: "No results found.",
  searchDebounceMs: 200,
  shouldFilter: true,
  hotkey: ["mod", "k"] as string[],
  enableHotkey: true,
  allowInInputs: false,
  closeOnSelect: true,
  returnFocus: true,
  ariaLabel: "Command palette",
  inputLabel: "Search commands",
  listLabel: "Commands",
  closeLabel: "Close",
  loadingLabel: "Loading results…",
  announceDelayMs: 500,
  showFooter: true,
} as const;

export function defaultResultsLabel(count: number): string {
  if (count === 0) return "No results";
  return count === 1 ? "1 result" : `${count} results`;
}

/**
 * Ranking weights (higher wins). Per query token, the best field match counts; every token must
 * match somewhere or the item is dropped. Tiers: prefix > word-start > substring, label > keyword
 * > description.
 */
export const COMMAND_SCORES = {
  labelExact: 120,
  labelPrefix: 100,
  labelWordStart: 70,
  labelSubstring: 40,
  keywordExact: 60,
  keywordPrefix: 50,
  keywordSubstring: 20,
  descriptionWordStart: 15,
  descriptionSubstring: 8,
} as const;
