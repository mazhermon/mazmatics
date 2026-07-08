import React from 'react'
import styles from './navbar.module.css'

import {
  regionForCountry,
  STOREFRONTS,
  NZ_DIRECT_SHOP,
  showNzDirectShop,
} from '../lib/locale'
import { useResolvedCountry } from '../context/services/useResolvedCountry'
import { trackNavBuyClick, trackNzShopCTA } from '../lib/gtag'

const COMPACT_REGION_LABEL: Record<string, string> = {
  AU: 'Get on Amazon AU',
  US: 'Get on Amazon US',
  UK: 'Get on Amazon UK',
}

/**
 * Persistent locale-aware buy pill for the navbar. Lives at the right
 * edge of the nav row on every page so a 30-second skimmer who never
 * reaches the hero compact-buy block still has a one-click path to the
 * resolved Amazon storefront.
 */
export const NavBarBuyCTA: React.FC = () => {
  const country = useResolvedCountry()
  const region = regionForCountry(country)
  const nzDirect = showNzDirectShop(country)
  const url = nzDirect ? NZ_DIRECT_SHOP.url : STOREFRONTS[region].url
  const visibleLabel = nzDirect
    ? 'Buy direct (NZ)'
    : COMPACT_REGION_LABEL[region] ?? 'Get the book'
  const handleClick = nzDirect
    ? () => trackNzShopCTA({ location: 'persistent_nav' })
    : trackNavBuyClick

  return (
    <a
      className={styles.buyCTA}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`${visibleLabel} (opens in a new tab)`}
    >
      <span>{visibleLabel}</span>
      <svg
        className={styles.buyCTA__icon}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M7 18a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 18zm10 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 17 18zM7.16 14h9.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49a1 1 0 0 0-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 16.37 5.48 18 7 18h12v-2H7.42a.25.25 0 0 1-.22-.37L7.16 14z"
        />
      </svg>
    </a>
  )
}
