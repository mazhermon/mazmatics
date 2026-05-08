import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import nextPlugin from '@next/eslint-plugin-next'

export default [
  {
    // TS/TSX only — JS config files (next.config.js, eslint.config.js,
    // next-sitemap.config.js, pages/_document.js) aren't in tsconfig's
    // project list and shouldn't be linted with the TS parser.
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      // Conventional alias — matches what `eslint-disable-next-line` comments
      // in the codebase use (e.g. `@next/next/no-img-element`).
      '@next/next': nextPlugin,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Next.js rules — `core-web-vitals` in the legacy config is a preset
      // bundling several rules; in flat config we pull individual rules.
      '@next/next/no-duplicate-head': 'error',
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
    },
  },

  {
    // Ignore build artifacts and tooling sandboxes (Claude skills carry their
    // own JS files we don't want to lint as part of this project).
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'dist/',
      'next-env.d.ts',
      '.claude/',
      '.agents/',
      'public/',
      // JSX-in-.js — special Next.js framework file, rarely touched
      'pages/_document.js',
    ],
  },
]
