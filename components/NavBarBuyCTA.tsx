import React from 'react'
import styles from './navbar.module.css'

import { regionForCountry, STOREFRONTS } from '../lib/locale'
import { useResolvedCountry } from '../context/services/useResolvedCountry'
import { trackNavBuyClick } from '../lib/gtag'

/**
 * Persistent locale-aware buy pill for the navbar. Lives at the right
 * edge of the nav row on every page so a 30-second skimmer who never
 * reaches the hero compact-buy block still has a one-click path to the
 * resolved Amazon storefront.
 */
export const NavBarBuyCTA: React.FC = () => {
  const country = useResolvedCountry()
  const region = regionForCountry(country)
  const { url, label } = STOREFRONTS[region]

  return (
    <a
      className={styles.buyCTA}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackNavBuyClick}
      aria-label={label}
    >
      Get the book
    </a>
  )
}
