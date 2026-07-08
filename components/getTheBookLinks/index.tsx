import Image from 'next/legacy/image'

import { Button } from '../../components/button'
import bookProductImageClearCut from '../../public/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg'

import styles from './getTheBookLinks.module.css'
import { useContext, useId, useState } from 'react'
import { AppContext } from '../../context/appContext'
import {
  ALL_STOREFRONTS,
  STOREFRONTS,
  regionForCountry,
  shippingCopyForCountry,
  NZ_DIRECT_SHOP,
  showNzDirectShop,
  type Storefront,
} from '../../lib/locale'
import { useResolvedCountry } from '../../context/services/useResolvedCountry'
import { trackAmazonCTA, trackNzShopCTA } from '../../lib/gtag'

interface Props {
  /** When true, render a single locale-aware Amazon button + "other regions"
   * expander instead of the full 3-button grid. Default false. */
  compact?: boolean
}

interface RegionRow {
  region: 'AU' | 'US' | 'UK'
  label: string
  shipping: string
  url: string
}

export const GetTheBookLinks: React.FC<Props> = ({ compact = false }) => {
  const bookProductImageSize = {
    width: 900,
    height: 1350,
  }

  const { mathsWord } = useContext(AppContext)
  const country = useResolvedCountry()
  /* `country` is null on SSR and the first client render; it resolves after the
     useEffect in useResolvedCountry runs. We only highlight a matched region
     once it's actually known — otherwise the matched row would briefly
     mis-render (e.g. flashing "US closest to you" for an AU visitor). */
  const region = country ? regionForCountry(country) : null
  const nzDirect = showNzDirectShop(country)

  if (compact) {
    return (
      <CompactBuyBlock
        mathsWord={mathsWord}
        bookProductImageSize={bookProductImageSize}
      />
    )
  }

  const auShipping =
    country === 'NZ'
      ? 'Ships to Aotearoa NZ direct from Amazon Australia'
      : 'Ships within Australia'

  const rows: RegionRow[] = [
    {
      region: 'AU',
      label: 'Buy on Amazon Australia',
      shipping: auShipping,
      url: STOREFRONTS.AU.url,
    },
    {
      region: 'US',
      label: 'Buy on Amazon US',
      shipping: 'Prime eligible · ships within the US',
      url: STOREFRONTS.US.url,
    },
    {
      region: 'UK',
      label: 'Buy on Amazon UK',
      shipping: 'Ships within the UK',
      url: STOREFRONTS.UK.url,
    },
  ]

  const trackBuy = (clickedRegion: 'AU' | 'US' | 'UK') => () =>
    trackAmazonCTA({ region: clickedRegion, location: 'get_the_book' })

  return (
    <div className={styles.buyGrid}>
      <div className={styles.bookImage}>
        <Image
          alt="Book cover for Mazmatics Fun Math for Kids Volume 1"
          src={bookProductImageClearCut}
          width={bookProductImageSize.width * 0.5}
          height={bookProductImageSize.height * 0.5}
        />
      </div>

      <ul className={styles.rowList}>
        {nzDirect && (
          <li className={`${styles.row} ${styles.nzRow}`}>
            <p className={styles.rowEyebrow}>
              Aotearoa New Zealand
              <span className={styles.matchedTag}>Recommended for NZ</span>
            </p>
            <p className={styles.rowShipping}>{NZ_DIRECT_SHOP.shipping}</p>
            <a
              href={NZ_DIRECT_SHOP.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackNzShopCTA({ location: 'get_the_book' })}
              className={styles.rowCta}
            >
              <span className={styles.rowCtaLabel}>{NZ_DIRECT_SHOP.label}</span>
              <span aria-hidden="true" className={styles.rowCtaArrow}>
                &rarr;
              </span>
            </a>
          </li>
        )}
        {rows.map((r) => {
          const matched = r.region === region
          // When the NZ direct row leads, demote Amazon rows to ghost so there
          // is a single clear primary recommendation for NZ visitors.
          const showMatched = matched && !nzDirect
          return (
            <li
              key={r.region}
              className={`${styles.row} ${showMatched ? styles.rowMatched : ''}`}
            >
              <p className={styles.rowEyebrow}>
                Amazon {r.region}
                {showMatched && (
                  <span className={styles.matchedTag}>
                    Closest to you
                  </span>
                )}
              </p>
              <p className={styles.rowShipping}>{r.shipping}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackBuy(r.region)}
                className={styles.rowCta}
              >
                <span className={styles.rowCtaLabel}>{r.label}</span>
                <span aria-hidden="true" className={styles.rowCtaArrow}>
                  &rarr;
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

interface CompactBuyBlockProps {
  mathsWord?: string
  bookProductImageSize: { width: number; height: number }
}

const CompactBuyBlock: React.FC<CompactBuyBlockProps> = ({
  mathsWord,
  bookProductImageSize,
}) => {
  const [showOthers, setShowOthers] = useState(false)
  const country = useResolvedCountry()
  const expanderId = useId()

  const region = regionForCountry(country)
  const matched = STOREFRONTS[region]
  const shipping = shippingCopyForCountry(country)
  const others: Storefront[] = ALL_STOREFRONTS.filter((s) => s.region !== region)

  const handlePrimary = () => trackAmazonCTA({ region, location: 'home_hero' })
  const handleOther = (otherRegion: 'AU' | 'US' | 'UK') => () =>
    trackAmazonCTA({ region: otherRegion, location: 'home_hero_other_region' })

  return (
    <div className={styles.contentGrid}>
      <div className={styles.action1}>
        <ul className={styles.product_book1__linkGroup}>
          <li className={styles.product_book1_buyNowBlock}>
            <Button
              variant="primary"
              external={true}
              href={matched.url}
              onClick={handlePrimary}
            >
              {matched.label}
            </Button>
            {shipping && <span>{shipping}</span>}
          </li>
        </ul>

        <div className={styles.expanderWrap}>
          <button
            type="button"
            className={styles.expanderToggle}
            aria-expanded={showOthers}
            aria-controls={expanderId}
            onClick={() => setShowOthers((v) => !v)}
          >
            Buying from another region?
          </button>
          <ul
            id={expanderId}
            className={styles.otherRegionsList}
            hidden={!showOthers}
          >
            {others.map((s) => (
              <li key={s.region}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleOther(s.region)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={`copyArea copyArea--med ${styles.getTheBookCopy}`}>
          <p className={styles.brandPromise}>
            <span className={styles.brandName}>Mazmatics</span> &#8212;
            supporting positive early experiences with {mathsWord}
          </p>
        </div>
      </div>

      <div className={styles.bookImage}>
        <Image
          alt="Book cover for Mazmatics Fun Math for Kids Volume 1"
          src={bookProductImageClearCut}
          width={bookProductImageSize.width * 0.5}
          height={bookProductImageSize.height * 0.5}
        />
      </div>
    </div>
  )
}
