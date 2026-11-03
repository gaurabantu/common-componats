import type { CheckboxSize } from "./Checkbox.types";

/** Design system tokens — visuals live in `ucs-choice-controls.css`. */
export const defaultCheckboxColorClass = "";

export const defaultLabelColorClass = "text-body text-text-primary cursor-pointer";

/** Extra classes on the custom checkbox face — e.g. margin vs label (`mr-2`). Supports Tailwind `peer-*` modifiers when paired with the hidden `.peer` input. */
export const defaultCheckboxInputLabelSpacing = "";

export const defaultCheckboxItemSpacing = "flex items-start gap-2";

export const CHECKBOX_DEFAULTS: { size: CheckboxSize } = {
  size: "md",
};

export const CHECKBOX_SIZES: readonly CheckboxSize[] = ["sm", "md", "lg"] as const;
