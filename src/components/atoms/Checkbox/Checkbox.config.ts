/** Design system: checkbox uses border-default; checked uses brand primary */
export const defaultCheckboxColorClass =
  "w-5 h-5 rounded-base border-[1.5px] border-[var(--color-border-default)] " +
  "checked:bg-[var(--color-brand-primary)] checked:border-[var(--color-brand-primary)] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--button-primary-focus-ring)] " +
  "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
export const defaultLabelColorClass = "text-body text-text-primary cursor-pointer";
export const defaultCheckboxInputLabelSpacing = "mr-2";
export const defaultCheckboxItemSpacing = "flex items-start gap-2";
