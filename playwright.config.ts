import { defineConfig, devices } from '@playwright/test'

/**
 * Visual regression suite uses two viewports (desktop + mobile) and pins:
 * - timezoneId so `useResolvedCountry` consistently resolves to AU
 * - reducedMotion so animations don't shuffle pixels between runs
 * - animations: disabled at the snapshot level for belt-and-braces
 *
 * Snapshots live alongside their tests in `tests/__screenshots__/`.
 * Run `yarn test:e2e --update-snapshots` after intentional design changes.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Auto-retry once on CI/local — useful for flaky font-loading races on first paint.
  retries: process.env.CI ? 2 : 1,
  reporter: [['list']],

  expect: {
    toHaveScreenshot: {
      // Allow 1% diff to absorb subpixel font rendering variance.
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    },
  },

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    timezoneId: 'Australia/Sydney',
    locale: 'en-AU',
    // Motion stability is handled by `animations: 'disabled'` at the
    // screenshot level (above) plus the settle-page scroll triggering all
    // Reveal IntersectionObservers before capture.
  },

  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['iPhone 13'],
      },
    },
  ],

  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
