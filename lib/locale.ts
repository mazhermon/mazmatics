export type Region = 'AU' | 'US' | 'UK'
export type Country = 'NZ' | 'AU' | 'US' | 'GB' | null

export interface Storefront {
  region: Region
  url: string
  /** Deep link to Amazon's "write a review" form, scoped to this storefront. */
  reviewUrl: string
  label: string
  reviewLabel: string
}

const ASIN = '0473648911'

export const STOREFRONTS: Record<Region, Storefront> = {
  AU: {
    region: 'AU',
    url: `https://www.amazon.com.au/dp/${ASIN}`,
    reviewUrl: `https://www.amazon.com.au/review/create-review?asin=${ASIN}`,
    label: 'Buy on Amazon Australia',
    reviewLabel: 'Review on Amazon Australia',
  },
  US: {
    region: 'US',
    url: `https://www.amazon.com/dp/${ASIN}`,
    reviewUrl: `https://www.amazon.com/review/create-review?asin=${ASIN}`,
    label: 'Buy on Amazon US',
    reviewLabel: 'Review on Amazon US',
  },
  UK: {
    region: 'UK',
    url: `https://www.amazon.co.uk/dp/${ASIN}`,
    reviewUrl: `https://www.amazon.co.uk/review/create-review?asin=${ASIN}`,
    label: 'Buy on Amazon UK',
    reviewLabel: 'Review on Amazon UK',
  },
}

export const ALL_STOREFRONTS: Storefront[] = [STOREFRONTS.AU, STOREFRONTS.US, STOREFRONTS.UK]

/**
 * NZ-only direct store. Shown as the *primary* buy option to visitors
 * resolved to New Zealand (see showNzDirectShop). International visitors
 * never see this — they buy via Amazon. NZ shoppers prefer buying direct.
 *
 * URL is the original product deep link from before the Sept-2025 removal
 * (slug confirmed still valid). Do not add price/shipping-cost copy here —
 * keep `shipping` to an evergreen geographic statement only.
 */
export interface NzDirectShop {
  url: string
  label: string
  shipping: string
}

export const NZ_DIRECT_SHOP: NzDirectShop = {
  url: 'https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations',
  label: 'Buy direct from Mazmatics',
  shipping: 'Ships within Aotearoa New Zealand',
}

/**
 * Whether to surface the NZ direct store. Gated strictly to NZ so the
 * option never distracts international shoppers, who buy via Amazon.
 */
export function showNzDirectShop(country: Country): boolean {
  return country === 'NZ'
}

/**
 * Resolve the user's country from available signals.
 *
 * Priority is **timezone first**, then explicit-region locale, then en-GB.
 * Why: many NZ/AU macOS users have `navigator.language === 'en-GB'` (UK
 * English with NZ region), so language alone misclassifies them as UK.
 * Timezone is a much stronger signal for actual physical location.
 *
 * Returns null when no signal matches (server-side, or unsupported browser).
 */
export function resolveCountry(input: {
  locale?: string
  languages?: readonly string[]
  timezone?: string
}): Country {
  const { locale, languages, timezone } = input

  // 1. Timezone (most reliable).
  if (timezone) {
    if (timezone === 'Pacific/Auckland' || timezone === 'Pacific/Chatham') return 'NZ'
    if (timezone.startsWith('Australia/')) return 'AU'
    if (timezone === 'Europe/London') return 'GB'
    if (timezone.startsWith('America/')) return 'US'
  }

  // 2. Locale with an explicit, unambiguous region tag.
  const allLangs = [locale, ...(languages || [])].filter(Boolean) as string[]
  for (const l of allLangs) {
    const lower = l.toLowerCase()
    if (lower === 'en-nz') return 'NZ'
    if (lower === 'en-au') return 'AU'
    if (lower === 'en-us') return 'US'
  }

  // 3. en-GB only counts as GB if timezone didn't classify us elsewhere first
  //    (handled above). At this point, no timezone signal — so en-GB is more
  //    likely a NZ/AU macOS user than a UK visitor; fall through.
  if (allLangs.some((l) => l.toLowerCase() === 'en-gb')) return null

  return null
}

export function regionForCountry(country: Country): Region {
  switch (country) {
    case 'NZ':
    case 'AU':
      return 'AU'
    case 'GB':
      return 'UK'
    case 'US':
      return 'US'
    default:
      // Default storefront when we can't tell — NZ/AU is Maz's biggest visitor
      // segment, so AU storefront is the safest fallback (and serves NZ).
      return 'AU'
  }
}

/**
 * Confidence-building shipping copy keyed off detected country, not just locale.
 * NZ users (timezone-detected) get NZ-specific copy even when their browser
 * language is en-GB.
 */
export function shippingCopyForCountry(country: Country): string | null {
  switch (country) {
    case 'NZ':
      return 'Ships to Aotearoa NZ direct from Amazon Australia'
    case 'AU':
      return 'Ships within Australia'
    case 'US':
      return 'Prime eligible · ships within the US'
    case 'GB':
      return 'Ships within the UK'
    default:
      return null
  }
}

export function storefrontFor(locale: string | undefined): Storefront {
  switch (locale) {
    case 'en-AU':
    case 'en-NZ':
      return STOREFRONTS.AU
    case 'en-GB':
      return STOREFRONTS.UK
    case 'en-US':
      return STOREFRONTS.US
    default:
      // Most visitors come from NZ + AU (Maz's home market), so AU is the
      // safest default when the locale is unknown or hasn't hydrated yet.
      return STOREFRONTS.AU
  }
}

export function shippingCopyFor(locale: string | undefined): string | null {
  switch (locale) {
    case 'en-NZ':
      return 'ships to Aotearoa NZ from Australia'
    case 'en-AU':
      return 'ships within Australia'
    case 'en-US':
      return 'Prime eligible'
    case 'en-GB':
      return 'ships within the UK'
    default:
      return null
  }
}

export function isHighConfidenceLocale(locale: string | undefined): boolean {
  return locale === 'en-NZ' || locale === 'en-AU' || locale === 'en-US' || locale === 'en-GB'
}
