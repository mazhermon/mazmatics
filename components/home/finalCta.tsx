import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'

import styles from './finalCta.module.css'
import { AppContext } from '../../context/appContext'
import {
  ALL_STOREFRONTS,
  STOREFRONTS,
  regionForCountry,
  shippingCopyForCountry,
} from '../../lib/locale'
import { useResolvedCountry } from '../../context/services/useResolvedCountry'
import { trackAmazonCTA } from '../../lib/gtag'
import bookCover from '../../public/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg'

export const FinalCta: React.FC = () => {
  const { mathsWord = 'maths' } = useContext(AppContext)
  const country = useResolvedCountry()
  const region = regionForCountry(country)
  const matched = STOREFRONTS[region]
  const shipping = shippingCopyForCountry(country)
  const others = ALL_STOREFRONTS.filter((s) => s.region !== region)

  const handlePrimary = () =>
    trackAmazonCTA({ region, location: 'home_final_cta' })
  const handleOther = (otherRegion: 'AU' | 'US' | 'UK') => () =>
    trackAmazonCTA({ region: otherRegion, location: 'home_final_cta_other' })

  return (
    <section
      className={styles.section}
      aria-labelledby="final-cta-heading"
    >
      <div className={styles.inner}>
        <div className={styles.cover}>
          <Image
            alt="Mazmatics Fun Math 4 Kids Volume 1, paperback book cover"
            src={bookCover}
            width={900 * 0.55}
            height={1350 * 0.55}
            priority={false}
          />
        </div>

        <div className={styles.copyCol}>
          <p className={styles.eyebrow}>The book</p>
          <h2 id="final-cta-heading" className={styles.title}>
            Volume 1.
            <br />
            Out now.
          </h2>
          <p className={styles.facts}>
            Paperback &middot; 145 pages &middot; kids 7–10 (US grade 2–4)
          </p>

          <a
            href={matched.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primary}
            onClick={handlePrimary}
          >
            <span className={styles.primaryLabel}>{matched.label}</span>
            <span aria-hidden="true" className={styles.primaryArrow}>
              &rarr;
            </span>
          </a>

          {shipping && <p className={styles.shipping}>{shipping}</p>}

          <ul className={styles.otherRegions}>
            {others.map((s) => (
              <li key={s.region}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleOther(s.region)}
                  className={styles.otherLink}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <hr className={styles.divider} aria-hidden="true" />

          <div className={styles.author}>
            <p className={styles.authorEyebrow}>Made by</p>
            <p className={styles.authorBlurb}>
              Hi, I’m Maz. Dad in Aotearoa, the one drawing and writing
              every page. I made this so my kids — and yours — could meet{' '}
              {mathsWord} on friendly ground.
            </p>
            <Link href="/about" className={styles.authorLink}>
              Meet Maz
              <span aria-hidden="true">&nbsp;&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
