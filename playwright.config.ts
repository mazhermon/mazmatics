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
  // Cap parallel workers so multiple browsers + a single Next dev server
  // don't starve each other on resource-constrained machines. Default
  // (= CPU count) caused 30s settlePage timeouts on this laptop.
  workers: 2,
  reporter: [['list']],

  expect: {
    toHaveScreenshot: {
      // Allow 1% diff to absorb subpixel font rendering variance.
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    },
  },

  use: {
    // Tests run on port 3100 so the developer's `yarn dev` on port 3000
    // (or any other project parked there) never conflicts with the Playwright
    // webServer. Maz's existing dev workflow on 3000 stays untouched.
    baseURL: 'http://localhost:3100',
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
    // Use next dev directly (skip the yarn wrapper) so signal handling
    // is one process tree — yarn's wrapper has been observed to lose the
    // child server mid-run on this machine.
    command: 'node_modules/.bin/next dev -p 3100',
    url: 'http://localhost:3100',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
