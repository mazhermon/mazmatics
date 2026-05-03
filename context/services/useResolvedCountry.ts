import { useEffect, useState } from 'react'

import { resolveCountry, type Country } from '../../lib/locale'

/**
 * Resolve the user's country client-side from timezone + navigator.languages.
 *
 * Server render returns null. Client effect re-resolves after hydration.
 * Timezone is the strongest signal: NZ macOS users with `navigator.language
 * === 'en-GB'` (UK English with NZ region) get classified as NZ via
 * `Pacific/Auckland`, not misrouted to the UK storefront.
 */
export const useResolvedCountry = (): Country => {
  const [country, setCountry] = useState<Country>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let timezone: string | undefined
    try {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    } catch {
      timezone = undefined
    }
    const languages = window.navigator.languages
    const locale = window.navigator.language
    setCountry(resolveCountry({ locale, languages, timezone }))
  }, [])

  return country
}
