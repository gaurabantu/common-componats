export const alertDialogVariantConfig = {
  info: {
    icon: "ℹ",
    iconColor: "var(--color-state-info)",
    bgColor: "color-mix(in srgb, var(--color-state-info) 10%, transparent)",
  },
  success: {
    icon: "✓",
    iconColor: "var(--color-state-success)",
    bgColor: "color-mix(in srgb, var(--color-state-success) 10%, transparent)",
  },
  warning: {
    icon: "⚠",
    iconColor: "var(--color-state-warning)",
    bgColor: "color-mix(in srgb, var(--color-state-warning) 10%, transparent)",
  },
  error: {
    icon: "✕",
    iconColor: "var(--color-state-error)",
    bgColor: "color-mix(in srgb, var(--color-state-error) 10%, transparent)",
  },
} as const;
