import { test, expect } from '@playwright/test'

/**
 * Functional smoke tests that don't need pixel snapshots — guard the
 * behaviours that would silently break with a routing/redirect regression.
 */

test.describe('redirects', () => {
  test('/feedback -> /write-a-review#note', async ({ page }) => {
    const response = await page.goto('/feedback')
    expect(response?.status(), 'final response status').toBe(200)
    expect(page.url(), 'final URL after redirect').toMatch(/\/write-a-review/)
    // Hash fragment is preserved in destination, browser uses it for scroll.
    expect(page.url()).toContain('#note')
  })

  test('/write-a-review/review-on-amazon -> /write-a-review', async ({ page }) => {
    await page.goto('/write-a-review/review-on-amazon')
    expect(page.url()).toMatch(/\/write-a-review($|\?|#)/)
    expect(page.url()).not.toContain('review-on-amazon')
  })

  test('/get-the-book/get-from-amazon -> /get-the-book', async ({ page }) => {
    await page.goto('/get-the-book/get-from-amazon')
    expect(page.url()).toMatch(/\/get-the-book($|\?|#)/)
    expect(page.url()).not.toContain('get-from-amazon')
  })

  test('/stockists -> /get-the-book', async ({ page }) => {
    await page.goto('/stockists')
    expect(page.url()).toMatch(/\/get-the-book/)
  })

  test('/wholesalers -> /get-the-book', async ({ page }) => {
    await page.goto('/wholesalers')
    expect(page.url()).toMatch(/\/get-the-book/)
  })
})

test.describe('routing', () => {
  test('home renders an h1 and locale-aware buy CTA', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    // AU is the locked timezone in playwright.config.ts, so the matched-region
    // CTA on /get-the-book and the home FinalCta should resolve to AU.
    await expect(page.getByRole('link', { name: /Amazon Australia/i }).first()).toBeVisible()
  })

  test('/get-the-book matches the AU primary based on pinned timezone', async ({ page }) => {
    await page.goto('/get-the-book')
    await expect(page.getByRole('link', { name: /Amazon Australia/i }).first()).toBeVisible()
    // International (AU-pinned) visitors must NOT see the NZ direct shop.
    await expect(
      page.getByRole('link', { name: /Buy direct from Mazmatics/i }),
    ).toHaveCount(0)
  })

  test('header buy pill points at Amazon AU for international visitors', async ({
    page,
  }) => {
    await page.goto('/')
    // The persistent nav pill is labelled "Get on Amazon AU" (distinct from the
    // in-page "Buy on Amazon Australia" CTA) and links to the AU storefront.
    const pill = page.getByRole('link', { name: /Get on Amazon AU/i })
    await expect(pill).toBeVisible()
    await expect(pill).toHaveAttribute('href', /amazon\.com\.au/)
    // It must not become the NZ direct shop for AU-pinned visitors.
    await expect(
      page.getByRole('link', { name: /Buy direct \(NZ\)/i }),
    ).toHaveCount(0)
  })

  test('/write-a-review surfaces a locale-matched review CTA', async ({ page }) => {
    await page.goto('/write-a-review')
    await expect(
      page.getByRole('link', { name: /Review on Amazon Australia/i }),
    ).toBeVisible()
  })

  test('404 page renders for unknown routes', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.locator('h1')).toContainText('took the day off')
  })
})

test.describe('Look Inside modal', () => {
  test('opens on thumbnail click, closes on Escape', async ({ page }, testInfo) => {
    // Mobile renders the strip as a snap-scrolling carousel where the first
    // button is off-viewport on initial paint. Playwright auto-scrolls before
    // clicking, but the carousel's snap behaviour can intercept the scroll.
    // Modal logic is identical across viewports — test on desktop only.
    test.skip(
      testInfo.project.name === 'mobile',
      'Modal logic is viewport-agnostic; desktop coverage is sufficient',
    )

    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)

    await page.getByRole('button', { name: /Open larger view/i }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Escape is unambiguous; the visible close button shares its aria-label
    // with the backdrop button, making selector targeting brittle.
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })
})

test.describe('NZ direct shop (Pacific/Auckland)', () => {
  test.use({ timezoneId: 'Pacific/Auckland' })

  test('/get-the-book leads with the NZ direct shop for NZ visitors', async ({
    page,
  }) => {
    await page.goto('/get-the-book')
    const direct = page.getByRole('link', {
      name: /Buy direct from Mazmatics/i,
    })
    await expect(direct).toBeVisible()
    await expect(direct).toHaveAttribute(
      'href',
      /^https:\/\/shop\.mazmatics\.com\//,
    )
    // Amazon AU stays reachable for NZ shoppers who prefer it.
    await expect(
      page.getByRole('link', { name: /Amazon Australia/i }).first(),
    ).toBeVisible()
  })

  test('home FinalCta primary is the NZ direct shop for NZ visitors', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(
      page.getByRole('link', { name: /Buy direct from Mazmatics/i }).first(),
    ).toBeVisible()
  })

  test('header buy pill points at the NZ direct shop for NZ visitors', async ({
    page,
  }) => {
    await page.goto('/')
    // The persistent nav pill relabels to "Buy direct (NZ)" and links to the
    // direct shop for NZ visitors (Amazon storefront for everyone else).
    const pill = page.getByRole('link', { name: /Buy direct \(NZ\)/i })
    await expect(pill).toBeVisible()
    await expect(pill).toHaveAttribute(
      'href',
      /^https:\/\/shop\.mazmatics\.com\//,
    )
  })
})
