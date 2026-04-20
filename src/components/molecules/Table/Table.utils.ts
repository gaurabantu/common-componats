// Table.utils.ts
export const cls = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};