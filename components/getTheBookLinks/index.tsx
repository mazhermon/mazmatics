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
  type Storefront,
} from '../../lib/locale'
import { useResolvedCountry } from '../../context/services/useResolvedCountry'
import { trackAmazonCTA } from '../../lib/gtag'
// import { FreeSampleDownload } from '../freeSample'

interface Props {
  /** When true, render a single locale-aware Amazon button + "other regions"
   * expander instead of the full 3-button grid. Default false. */
  compact?: boolean
}

export const GetTheBookLinks: React.FC<Props> = ({ compact = false }) => {
  const bookProductImageSize = {
    width: 900,
    height: 1350,
  }

  const { mathsWord } = useContext(AppContext)
  const country = useResolvedCountry()
  const region = regionForCountry(country)

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
  const usShipping = 'Prime eligible · ships within the US'
  const ukShipping = 'Ships within the UK'

  const trackBuy = (clickedRegion: 'AU' | 'US' | 'UK') => () =>
    trackAmazonCTA({ region: clickedRegion, location: 'get_the_book' })

  return (
    <div className={styles.contentGrid}>
      <div className={styles.action1}>
        <span className={styles.marketDescription}></span>

        <ul className={styles.product_book1__linkGroup}>
          <li className={styles.product_book1_buyNowBlock}>
            <Button
              variant={region === 'AU' ? 'primary' : 'secondary'}
              external={true}
              href={STOREFRONTS.AU.url}
              onClick={trackBuy('AU')}
            >
              {STOREFRONTS.AU.label}
            </Button>
            <span>{auShipping}</span>
          </li>

          <li className={styles.product_book1_buyNowBlock}>
            <Button
              external={true}
              variant={region === 'US' ? 'primary' : 'secondary'}
              href={STOREFRONTS.US.url}
              onClick={trackBuy('US')}
            >
              {STOREFRONTS.US.label}
            </Button>
            <span>{usShipping}</span>
          </li>

          <li className={styles.product_book1_buyNowBlock}>
            <Button
              external={true}
              variant={region === 'UK' ? 'primary' : 'secondary'}
              href={STOREFRONTS.UK.url}
              onClick={trackBuy('UK')}
            >
              {STOREFRONTS.UK.label}
            </Button>
            <span>{ukShipping}</span>
          </li>
        </ul>

        {/* <Button variant="primary" href="/get-the-book/get-from-amazon">
          Get from Amazon <span>International</span>
        </Button> */}
        <div className={`copyArea copyArea--med ${styles.getTheBookCopy}`}>
          <p className={styles.brandPromise}>
            <span className={styles.brandName}>Mazmatics</span> &#8212;
            supporting positive early experiences with {mathsWord}
          </p>
          {/* <p>
                        Fun {mathsWord} 4 Kids is an activity &amp; story book that
                        supports kids to practise their {mathsWord} and have some
                        fun along the way. Do some
                        {mathsWord}, do some drawing, read a story, solve a code...
                      </p> */}
        </div>
      </div>
      {/* <div className={styles.action2}>
        <span className={styles.marketDescription}>Aotearoa / New Zealand</span>
        <Button
          external={true}
          variant="secondary"
          href="https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations"
        >
          NZ Shop
        </Button>
      </div> */}

      {/* <div className={styles.action3}>
        <Button variant="secondary" href="/stockists">
          Find a Bookshop
        </Button>
      </div> */}
      {/* <div>
        <FreeSampleDownload />
      </div> */}

      {/* <div className={styles.action3}></div> */}

      <div className={styles.bookImage}>
        <Image
          alt="Book cover for Mazmatics Fun Math for Kids Volume 1"
          src={bookProductImageClearCut}
          // layout="intrinsic"
          width={bookProductImageSize.width * 0.5}
          height={bookProductImageSize.height * 0.5}
        />
      </div>
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
