/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}', './.storybook/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family)'],
      },
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          secondary: 'var(--color-brand-secondary)',
          link: 'var(--color-brand-link)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          'on-accent': 'var(--color-text-on-accent)',
        },
        surface: {
          page: 'var(--color-bg-page)',
          DEFAULT: 'var(--color-bg-surface)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
        },
        state: {
          success: 'var(--color-state-success)',
          warning: 'var(--color-state-warning)',
          error: 'var(--color-state-error)',
        },
        accent: {
          'lavender-10': 'var(--color-accent-lavender-10)',
          'lavender-40': 'var(--color-accent-lavender-40)',
          'sky-10': 'var(--color-accent-sky-10)',
          'mint-10': 'var(--color-accent-mint-10)',
          'amber-10': 'var(--color-accent-amber-10)',
          'rose-10': 'var(--color-accent-rose-10)',
        },
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        base: 'var(--radius-base)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        card: 'var(--radius-card)',
      },
      boxShadow: {
        none: 'var(--shadow-none)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
      fontSize: {
        h1: ['var(--text-h1-size)', { lineHeight: 'var(--text-h1-line-height)', fontWeight: 'var(--text-h1-weight)' }],
        h2: ['var(--text-h2-size)', { lineHeight: 'var(--text-h2-line-height)', fontWeight: 'var(--text-h2-weight)' }],
        h3: ['var(--text-h3-size)', { lineHeight: '1.5', fontWeight: 'var(--text-h3-weight)' }],
        h4: ['var(--text-h4-size)', { lineHeight: '1.5', fontWeight: 'var(--text-h4-weight)' }],
        body: ['var(--text-body-size)', { lineHeight: 'var(--text-body-line-height)', fontWeight: 'var(--text-body-weight)' }],
        secondary: ['var(--text-secondary-size)', { lineHeight: '1.5' }],
        small: ['var(--text-small-size)', { lineHeight: '1.5' }],
        micro: ['var(--text-micro-size)', { lineHeight: '1.2', fontWeight: 'var(--text-micro-weight)' }],
      },
    },
  },
  plugins: [],
};
