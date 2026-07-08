import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import {
  STOREFRONTS,
  ALL_STOREFRONTS,
  storefrontFor,
  shippingCopyFor,
  isHighConfidenceLocale,
  resolveCountry,
  regionForCountry,
  shippingCopyForCountry,
  NZ_DIRECT_SHOP,
  showNzDirectShop,
} from './locale'

test('en-US → amazon.com US storefront', () => {
  assert.equal(storefrontFor('en-US').region, 'US')
  assert.equal(storefrontFor('en-US').url, 'https://www.amazon.com/dp/0473648911')
})

test('en-GB → amazon.co.uk UK storefront', () => {
  assert.equal(storefrontFor('en-GB').region, 'UK')
  assert.equal(storefrontFor('en-GB').url, 'https://www.amazon.co.uk/dp/0473648911')
})

test('en-AU → amazon.com.au AU storefront', () => {
  assert.equal(storefrontFor('en-AU').region, 'AU')
  assert.equal(storefrontFor('en-AU').url, 'https://www.amazon.com.au/dp/0473648911')
})

test('en-NZ → amazon.com.au AU storefront (NZ ships from AU)', () => {
  assert.equal(storefrontFor('en-NZ').region, 'AU')
  assert.equal(storefrontFor('en-NZ').url, 'https://www.amazon.com.au/dp/0473648911')
})

test('unknown locale falls back to AU (most visitors from NZ/AU)', () => {
  assert.equal(storefrontFor('fr-CA').region, 'AU')
  assert.equal(storefrontFor('').region, 'AU')
  assert.equal(storefrontFor(undefined).region, 'AU')
})

test('shipping copy for known locales', () => {
  assert.equal(shippingCopyFor('en-NZ'), 'ships to Aotearoa NZ from Australia')
  assert.equal(shippingCopyFor('en-AU'), 'ships within Australia')
  assert.equal(shippingCopyFor('en-US'), 'Prime eligible')
  assert.equal(shippingCopyFor('en-GB'), 'ships within the UK')
})

test('shipping copy is null for unknown locales', () => {
  assert.equal(shippingCopyFor('fr-CA'), null)
  assert.equal(shippingCopyFor(''), null)
  assert.equal(shippingCopyFor(undefined), null)
})

test('isHighConfidenceLocale recognises the four canonical locales', () => {
  assert.equal(isHighConfidenceLocale('en-NZ'), true)
  assert.equal(isHighConfidenceLocale('en-AU'), true)
  assert.equal(isHighConfidenceLocale('en-US'), true)
  assert.equal(isHighConfidenceLocale('en-GB'), true)
  assert.equal(isHighConfidenceLocale('fr-CA'), false)
  assert.equal(isHighConfidenceLocale(''), false)
})

// resolveCountry — the new, timezone-first detection.

test('resolveCountry: Pacific/Auckland timezone wins over en-GB locale (NZ Mac users)', () => {
  // The actual bug we hit: NZ user, macOS English (UK), navigator.language=en-GB.
  // Timezone is the deciding signal.
  assert.equal(
    resolveCountry({ locale: 'en-GB', languages: ['en-GB', 'en'], timezone: 'Pacific/Auckland' }),
    'NZ',
  )
})

test('resolveCountry: Australia/* timezone → AU regardless of locale', () => {
  assert.equal(
    resolveCountry({ locale: 'en-GB', timezone: 'Australia/Sydney' }),
    'AU',
  )
  assert.equal(
    resolveCountry({ locale: 'en', timezone: 'Australia/Perth' }),
    'AU',
  )
})

test('resolveCountry: Europe/London → GB', () => {
  assert.equal(
    resolveCountry({ locale: 'en-GB', timezone: 'Europe/London' }),
    'GB',
  )
})

test('resolveCountry: America/* → US', () => {
  assert.equal(
    resolveCountry({ locale: 'en-US', timezone: 'America/New_York' }),
    'US',
  )
})

test('resolveCountry: explicit regional locale used when timezone gives no signal', () => {
  assert.equal(
    resolveCountry({ locale: 'en-NZ', timezone: 'Asia/Tokyo' }),
    'NZ',
  )
  assert.equal(
    resolveCountry({ locale: 'en-AU', timezone: 'Asia/Singapore' }),
    'AU',
  )
})

test('resolveCountry: en-GB alone returns null (would misclassify NZ users)', () => {
  // No timezone info; en-GB is too noisy a signal to assume UK.
  // Returns null so the caller falls back to the AU default.
  assert.equal(
    resolveCountry({ locale: 'en-GB', languages: ['en-GB'] }),
    null,
  )
})

test('resolveCountry: empty input returns null', () => {
  assert.equal(resolveCountry({}), null)
})

test('regionForCountry: NZ + AU both map to AU storefront', () => {
  assert.equal(regionForCountry('NZ'), 'AU')
  assert.equal(regionForCountry('AU'), 'AU')
  assert.equal(regionForCountry('GB'), 'UK')
  assert.equal(regionForCountry('US'), 'US')
  assert.equal(regionForCountry(null), 'AU')
})

test('shippingCopyForCountry: NZ-specific copy', () => {
  assert.equal(
    shippingCopyForCountry('NZ'),
    'Ships to Aotearoa NZ direct from Amazon Australia',
  )
  assert.equal(shippingCopyForCountry('AU'), 'Ships within Australia')
  assert.equal(shippingCopyForCountry('US'), 'Prime eligible · ships within the US')
  assert.equal(shippingCopyForCountry('GB'), 'Ships within the UK')
  assert.equal(shippingCopyForCountry(null), null)
})

// STOREFRONTS shape — pin the data so accidental edits to URLs/labels surface
// in CI rather than silently breaking the buy / review CTAs.

test('STOREFRONTS: every region has a buy URL pointing at the right Amazon domain', () => {
  assert.match(STOREFRONTS.AU.url, /^https:\/\/www\.amazon\.com\.au\/dp\/0473648911$/)
  assert.match(STOREFRONTS.US.url, /^https:\/\/www\.amazon\.com\/dp\/0473648911$/)
  assert.match(STOREFRONTS.UK.url, /^https:\/\/www\.amazon\.co\.uk\/dp\/0473648911$/)
})

test('STOREFRONTS: every region has a review URL pointing at the right Amazon create-review form', () => {
  assert.match(
    STOREFRONTS.AU.reviewUrl,
    /^https:\/\/www\.amazon\.com\.au\/review\/create-review\?asin=0473648911$/,
  )
  assert.match(
    STOREFRONTS.US.reviewUrl,
    /^https:\/\/www\.amazon\.com\/review\/create-review\?asin=0473648911$/,
  )
  assert.match(
    STOREFRONTS.UK.reviewUrl,
    /^https:\/\/www\.amazon\.co\.uk\/review\/create-review\?asin=0473648911$/,
  )
})

test('STOREFRONTS: review and buy URLs share the same ASIN and host per region', () => {
  for (const region of ['AU', 'US', 'UK'] as const) {
    const s = STOREFRONTS[region]
    const buyHost = new URL(s.url).hostname
    const reviewHost = new URL(s.reviewUrl).hostname
    assert.equal(buyHost, reviewHost, `${region}: buy + review hosts must match`)
    assert.ok(
      s.url.includes('0473648911') && s.reviewUrl.includes('0473648911'),
      `${region}: ASIN must appear in both URLs`,
    )
  }
})

test('STOREFRONTS: every region has non-empty buy + review labels', () => {
  for (const region of ['AU', 'US', 'UK'] as const) {
    const s = STOREFRONTS[region]
    assert.ok(s.label.length > 0, `${region}: buy label is empty`)
    assert.ok(s.reviewLabel.length > 0, `${region}: review label is empty`)
  }
})

test('ALL_STOREFRONTS: contains all three regions in a stable order (AU, US, UK)', () => {
  assert.equal(ALL_STOREFRONTS.length, 3)
  assert.deepEqual(
    ALL_STOREFRONTS.map((s) => s.region),
    ['AU', 'US', 'UK'],
  )
})

test('NZ_DIRECT_SHOP points at the shop.mazmatics.com subdomain', () => {
  assert.equal(new URL(NZ_DIRECT_SHOP.url).hostname, 'shop.mazmatics.com')
  assert.ok(NZ_DIRECT_SHOP.url.startsWith('https://'))
})

test('NZ_DIRECT_SHOP has non-empty label + shipping copy', () => {
  assert.ok(NZ_DIRECT_SHOP.label.length > 0)
  assert.ok(NZ_DIRECT_SHOP.shipping.length > 0)
})

test('showNzDirectShop is true only when country is NZ', () => {
  assert.equal(showNzDirectShop('NZ'), true)
  assert.equal(showNzDirectShop('AU'), false)
  assert.equal(showNzDirectShop('US'), false)
  assert.equal(showNzDirectShop('GB'), false)
  assert.equal(showNzDirectShop(null), false)
})
