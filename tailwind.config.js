/** Design-system colour token, defined per theme in index.css. */
const token = (name) => `var(--${name})`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
        'sans': ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      // Names follow the Aseryx design system: bg-page, text-ink-secondary,
      // border-border, bg-btn-primary. Radii and spacing use Tailwind's
      // defaults, which already match it (rounded-lg = 8px controls,
      // rounded-2xl = 16px cards, 4px spacing grid).
      colors: {
        brand: {
          DEFAULT: token('brand'),
          strong: token('brand-strong'),
          tint: token('brand-tint'),
          'tint-border': token('brand-tint-border'),
          // Legacy names still used by older markup
          orange: '#FF7A4D',
          dark: '#1A1A1A',
        },
        page: token('bg-page'),
        card: token('bg-card'),
        secondary: token('bg-secondary'),
        hover: token('bg-hover'),
        muted: token('bg-muted'),
        nav: token('bg-nav'),
        ink: {
          DEFAULT: token('ink'),
          secondary: token('ink-secondary'),
          muted: token('ink-muted'),
        },
        border: {
          DEFAULT: token('border'),
          light: token('border-light'),
          strong: token('border-strong'),
          hover: token('border-hover'),
        },
        btn: {
          primary: token('btn-primary-bg'),
          'primary-ink': token('btn-primary-ink'),
          'primary-hover': token('btn-primary-hover'),
          standard: token('btn-standard-bg'),
          'standard-border': token('btn-standard-border'),
          'standard-hover': token('btn-standard-hover'),
          'secondary-border': token('btn-secondary-border'),
          'secondary-ink': token('btn-secondary-ink'),
          'secondary-hover': token('btn-secondary-hover'),
          outline: token('btn-outline-border'),
          'outline-hover': token('btn-outline-hover'),
        },
        pending: token('pending-dot'),
        success: {
          bg: token('success-bg'),
          ink: token('success-ink'),
          border: token('success-border'),
          dot: token('success-dot'),
        },
        neutral: {
          bg: token('neutral-bg'),
          ink: token('neutral-ink'),
        },
      },
      // Design-system type styles. Display sizes are for public pages.
      fontSize: {
        'display-xl': ['3rem', { lineHeight: '1.05', fontWeight: '600' }],
        'display-lg': ['2.25rem', { lineHeight: '1.1', fontWeight: '600' }],
        'page-title': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '500' }],
        'heading-lg': ['1.125rem', { lineHeight: '1.3', fontWeight: '600' }],
        'card-title': ['1.0625rem', { lineHeight: '1.3', letterSpacing: '-0.025em', fontWeight: '600' }],
        'body-lg': ['0.875rem', { lineHeight: '1.7' }],
        'body': ['0.8125rem', { lineHeight: '1.6' }],
        'body-sm': ['0.75rem', { lineHeight: '1.5' }],
        'meta': ['0.6875rem', { lineHeight: '1.4', fontWeight: '500' }],
        'table-head': ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '500' }],
        'button-lg': ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        'button-md': ['0.8125rem', { lineHeight: '1.5', fontWeight: '500' }],
        'data-lg': ['1.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'data': ['0.8125rem', { lineHeight: '1.5' }],
        // Site only: the system is tuned for dense app UI. Marketing ledes and
        // long-form blog reading need a step above body-lg.
        'lede': ['1rem', { lineHeight: '1.6' }],
        'prose': ['1.0625rem', { lineHeight: '1.75' }],
      },
      // Plain `border` draws the design-system hairline, not Tailwind's gray-200
      borderColor: {
        DEFAULT: token('border'),
      },
      boxShadow: {
        // The one container lift; cards are otherwise flat with a border
        lift: token('shadow-lift'),
      },
    },
  },
  plugins: [],
}
