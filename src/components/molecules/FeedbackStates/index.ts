export { FeedbackState } from "./FeedbackState";
export { ErrorState } from "./ErrorState";
export { OfflineBanner } from "./OfflineBanner";
export { default as EmptyState } from "./EmptyState";
export { default } from "./EmptyState";

// Animated SVG illustrations (CSS-only, no runtime deps)
export {
  NoDataAnimation,
  NoSearchResultsAnimation,
  ErrorAnimation,
  OfflineAnimation,
  SuccessAnimation,
  InfoAnimation,
  FEEDBACK_ANIMATIONS,
} from "./FeedbackStates.animations";
export type { FeedbackAnimationName } from "./FeedbackStates.animations";

export type {
  EmptyStateProps,
  ErrorStateProps,
  OfflineBannerProps,
  FeedbackVisualTone,
  FeedbackSize,
  FeedbackStateProps,
  FeedbackStateVariant,
} from "./FeedbackStates.types";
