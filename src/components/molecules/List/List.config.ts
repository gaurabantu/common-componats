import type { ListSize } from "./List.types";

export const LIST_DEFAULTS: { divided: boolean; bordered: boolean; size: ListSize } = {
  divided: true,
  bordered: false,
  size: "md",
};

export const LIST_SIZES: readonly ListSize[] = ["sm", "md", "lg"] as const;
