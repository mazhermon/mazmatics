export type Region = 'AU' | 'US' | 'UK'

export interface Storefront {
  region: Region
  url: string
  label: string
}

const ASIN = '0473648911'

const STOREFRONTS: Record<Region, Storefront> = {
  AU: {
    region: 'AU',
    url: `https://www.amazon.com.au/dp/${ASIN}`,
    label: 'Buy on Amazon Australia',
  },
  US: {
    region: 'US',
    url: `https://www.amazon.com/dp/${ASIN}`,
    label: 'Buy on Amazon US',
  },
  UK: {
    region: 'UK',
    url: `https://www.amazon.co.uk/dp/${ASIN}`,
    label: 'Buy on Amazon UK',
  },
}

export const ALL_STOREFRONTS: Storefront[] = [STOREFRONTS.AU, STOREFRONTS.US, STOREFRONTS.UK]

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
      return STOREFRONTS.US
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
