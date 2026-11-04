// packages/ui-components/src/components/TextArea/TextArea.config.ts

/**
 * Default configuration for TextArea component.
 * Put UX4G tokens / defaults here so they are centrally managed.
 */

const defaultConfig = {
  defaultRows: 3,
  /** No limit by default — pass `maxLength` to cap input (0.0.4: was 500, which silently truncated). */
  defaultMaxLength: undefined as number | undefined,
  defaultRemoveChars: '/<>@#',
  /** Only applies when `sanitize` is true (sanitize is off by default, so text is never altered implicitly). */
  defaultRemoveEmojis: true,
  defaultNormalizeAccents: true,
  defaultToCase: '' as '' | 'U' | 'L' | 'C',
};

export default defaultConfig;
