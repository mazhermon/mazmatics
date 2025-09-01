import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import nextPlugin from 'eslint-plugin-next'

export default [
  {
    // Apply to JS/TS files
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
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
      next: nextPlugin,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Next.js rules
      'next/no-duplicate-head': 'error',
      'next/core-web-vitals': 'warn',
    },
  },

  {
    // Ignore build artifacts
    ignores: ['node_modules/', '.next/', 'out/', 'dist/', 'next-env.d.ts'],
  },
]
