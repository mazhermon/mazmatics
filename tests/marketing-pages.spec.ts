import { test, expect, type Page } from '@playwright/test'

/**
 * Visual snapshot suite for the five marketing pages.
 *
 * Snapshots are deterministic-ish via:
 * - timezone + locale pinned to AU (playwright.config.ts)
 * - reducedMotion: 'reduce' so the redesign's ease-out transitions don't paint
 * - animations: 'disabled' at screenshot time
 * - waiting for `document.fonts.ready` before capture
 * - masking <canvas> elements (the sun-sprite paints frame-by-frame regardless
 *   of reduced-motion preference and would shift pixels between runs)
 *
 * To regenerate baselines after intentional design changes:
 *   yarn test:e2e --update-snapshots
 */

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/free-sample', name: 'free-sample' },
  { path: '/get-the-book', name: 'get-the-book' },
  { path: '/write-a-review', name: 'write-a-review' },
]

async function settlePage(page: Page) {
  // Fonts need to load or the headline reflows mid-screenshot.
  await page.evaluate(() => document.fonts.ready)
  await page.waitForLoadState('networkidle')

  // Force every lazy <img> into view so the browser actually fetches it.
  // Without this, lazy images below the fold (the YouTube thumbnail on
  // /about, sample crops on /free-sample, etc.) never trigger their load
  // event, and the wait below would hang on them.
  await page.evaluate(async () => {
    const height = document.documentElement.scrollHeight
    window.scrollTo(0, height)
    await new Promise((r) => setTimeout(r, 150))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 150))
  })

  await page.waitForLoadState('networkidle')

  // Wait for every <img> to complete, with a per-image timeout cap so a
  // hung external CDN can't block the suite indefinitely.
  await page.evaluate(async () => {
    const imgs = Array.from(document.images)
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete && img.naturalWidth > 0) return resolve()
            const done = () => resolve()
            img.addEventListener('load', done, { once: true })
            img.addEventListener('error', done, { once: true })
            // Hard ceiling — if a third-party image (e.g. YouTube CDN) is
            // slow we accept the partial load rather than timing out the
            // entire test.
            setTimeout(done, 3000)
          }),
      ),
    )
  })

  // One animation frame so any post-load layout settles.
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => resolve(null))),
  )
}

for (const { path, name } of PAGES) {
  test(`${name} — full page snapshot`, async ({ page }) => {
    await page.goto(path)
    await settlePage(page)

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      mask: [page.locator('canvas')],
    })
  })
}
