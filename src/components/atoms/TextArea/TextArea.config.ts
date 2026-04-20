// packages/ui-components/src/components/TextArea/TextArea.config.ts

/**
 * Default configuration for TextArea component.
 * Put UX4G tokens / defaults here so they are centrally managed.
 */

const defaultConfig = {
  defaultRows: 3,
  defaultMaxLength: 500,
  defaultRemoveChars: '/<>@#',
  defaultRemoveEmojis: true,
  defaultNormalizeAccents: true,
  defaultToCase: '' as '' | 'U' | 'L' | 'C',
};

export default defaultConfig;
