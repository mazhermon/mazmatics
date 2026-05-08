import { test, beforeEach, afterEach } from 'node:test'
import { strict as assert } from 'node:assert'

// Capture every gtag invocation so each test can assert on the exact payload.
const calls: Array<{ command: string; action: string; params: unknown }> = []

function installFakeGtag() {
  ;(globalThis as unknown as { window: { gtag: (...args: unknown[]) => void } }).window = {
    gtag: (...args: unknown[]) => {
      calls.push({
        command: args[0] as string,
        action: args[1] as string,
        params: args[2],
      })
    },
  }
}

function removeWindow() {
  delete (globalThis as { window?: unknown }).window
}

// Importing here so the module sees globalThis.window as undefined at module-eval time.
// All references to window inside gtag.js are at call-time (`if (typeof window === 'undefined')`),
// so they re-check globalThis on each call.
import {
  trackAmazonCTA,
  trackLookInsideOpen,
  trackNavBuyClick,
  trackMailingListSubmit,
  trackFreeSampleDownload,
} from './gtag.js'

beforeEach(() => {
  calls.length = 0
  installFakeGtag()
})

afterEach(() => {
  removeWindow()
})

test('trackAmazonCTA: fires amazon_cta_click with region + location label', () => {
  trackAmazonCTA({ region: 'AU', location: 'home_final_cta' })
  assert.deepEqual(calls, [
    {
      command: 'event',
      action: 'amazon_cta_click',
      params: {
        event_category: 'cta',
        event_label: 'home_final_cta',
        region: 'AU',
      },
    },
  ])
})

test('trackAmazonCTA: region travels through verbatim (US, UK, AU)', () => {
  for (const region of ['US', 'UK', 'AU']) {
    trackAmazonCTA({ region, location: `loc_${region}` })
  }
  assert.equal(calls.length, 3)
  assert.equal(calls[0].params && (calls[0].params as { region: string }).region, 'US')
  assert.equal(calls[1].params && (calls[1].params as { region: string }).region, 'UK')
  assert.equal(calls[2].params && (calls[2].params as { region: string }).region, 'AU')
})

test('trackLookInsideOpen: fires look_inside_open under engagement category', () => {
  trackLookInsideOpen('home_strip')
  assert.equal(calls.length, 1)
  assert.equal(calls[0].action, 'look_inside_open')
  assert.deepEqual(calls[0].params, {
    event_category: 'engagement',
    event_label: 'home_strip',
  })
})

test('trackNavBuyClick: fires nav_buy_click with persistent_nav label', () => {
  trackNavBuyClick()
  assert.equal(calls.length, 1)
  assert.equal(calls[0].action, 'nav_buy_click')
  assert.deepEqual(calls[0].params, {
    event_category: 'cta',
    event_label: 'persistent_nav',
  })
})

test('trackMailingListSubmit: fires mailing_list_submit under conversion category', () => {
  trackMailingListSubmit('footer')
  assert.equal(calls.length, 1)
  assert.equal(calls[0].action, 'mailing_list_submit')
  assert.deepEqual(calls[0].params, {
    event_category: 'conversion',
    event_label: 'footer',
  })
})

test('trackFreeSampleDownload: fires free_sample_downloaded under conversion category', () => {
  trackFreeSampleDownload()
  assert.equal(calls.length, 1)
  assert.equal(calls[0].action, 'free_sample_downloaded')
  assert.deepEqual(calls[0].params, {
    event_category: 'conversion',
    event_label: 'free_sample',
  })
})

test('all helpers: silently no-op when window.gtag is missing (SSR path)', () => {
  removeWindow()
  // No window at all — equivalent to SSR.
  trackAmazonCTA({ region: 'US', location: 'test' })
  trackLookInsideOpen('test')
  trackNavBuyClick()
  trackMailingListSubmit('test')
  trackFreeSampleDownload()
  assert.equal(calls.length, 0)
})

test('all helpers: silently no-op when window exists but gtag is undefined (analytics blocked)', () => {
  ;(globalThis as unknown as { window: object }).window = {} // window present, gtag missing
  trackAmazonCTA({ region: 'US', location: 'test' })
  trackLookInsideOpen('test')
  trackNavBuyClick()
  trackMailingListSubmit('test')
  trackFreeSampleDownload()
  assert.equal(calls.length, 0)
})
