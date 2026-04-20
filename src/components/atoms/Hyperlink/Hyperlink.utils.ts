export const cls = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");