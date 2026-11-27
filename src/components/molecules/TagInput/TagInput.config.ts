import type { BadgeSize } from "../../atoms/Badge/Badge.types";
import type { TagInputLabels, TagInputSize } from "./TagInput.types";

export const TAG_INPUT_DEFAULTS: {
  size: TagInputSize;
  allowDuplicates: boolean;
  addOnBlur: boolean;
  delimiters: string[];
} = {
  size: "md",
  allowDuplicates: false,
  addOnBlur: false,
  delimiters: [","],
};

export const TAG_INPUT_SIZES: readonly TagInputSize[] = ["sm", "md", "lg"] as const;

/** Chip (Badge) size per control size. */
export const TAG_INPUT_CHIP_SIZE: Record<TagInputSize, BadgeSize> = {
  sm: "sm",
  md: "sm",
  lg: "md",
};

export const TAG_INPUT_LABELS: TagInputLabels = {
  remove: (tag) => `Remove ${tag}`,
  added: (tag) => `Added ${tag}`,
  removed: (tag) => `Removed ${tag}`,
  duplicate: (tag) => `"${tag}" is already added`,
  maxReached: (max) => `You can add up to ${max} tags`,
  list: "Selected tags",
  suggestions: "Suggestions",
};

/** Always-on separators for pasted text, in addition to `delimiters`. */
export const TAG_INPUT_PASTE_SEPARATORS = ["\n", "\r", "\t"];
