import { useContext } from 'react'
import Head from 'next/head'

import styles from './write-a-review.module.css'
import { AppContext } from '../../context/appContext'
import {
  ALL_STOREFRONTS,
  STOREFRONTS,
  regionForCountry,
} from '../../lib/locale'
import { useResolvedCountry } from '../../context/services/useResolvedCountry'
import { trackAmazonCTA } from '../../lib/gtag'

const FEEDBACK_EMAIL = 'hellomazmatics@gmail.com'
const FEEDBACK_SUBJECT = 'Mazmatics feedback'

const WriteAReview = () => {
  const { mathsWord = 'maths' } = useContext(AppContext)
  const country = useResolvedCountry()
  const region = regionForCountry(country)
  const matched = STOREFRONTS[region]
  const others = ALL_STOREFRONTS.filter((s) => s.region !== region)

  const onPrimary = () =>
    trackAmazonCTA({ region, location: 'write_a_review_primary' })
  const onOther = (otherRegion: 'AU' | 'US' | 'UK') => () =>
    trackAmazonCTA({ region: otherRegion, location: 'write_a_review_other' })

  return (
    <div className={styles.page}>
      <Head>
        <title>{`Write a review or send feedback — Mazmatics Fun ${mathsWord} 4 Kids`}</title>
        <meta
          name="description"
          content={`Share your thoughts on Mazmatics Fun ${mathsWord} 4 Kids Vol. 1 — leave an Amazon review or send Maz a note directly.`}
        />
        <link
          rel="canonical"
          href="https://www.mazmatics.com/write-a-review"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.hero} aria-labelledby="war-heading">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Already got the book?</p>
          <h1 id="war-heading" className={styles.title}>
            Help us help more parents.
          </h1>
          <p className={styles.lede}>
            Two ways to share what you thought — both are huge for a small
            independent book.
          </p>
        </div>
      </section>

      <section
        className={styles.review}
        aria-labelledby="review-heading"
      >
        <div className={styles.reviewInner}>
          <p className={styles.eyebrowAlt}>The biggest help</p>
          <h2 id="review-heading" className={styles.sectionTitle}>
            Leave an Amazon review.
          </h2>
          <p className={styles.sectionLede}>
            Honestly, this is the single best thing — Amazon reviews are how
            other parents discover the book. Even one or two sentences makes
            a real difference.
          </p>

          <a
            href={matched.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primary}
            onClick={onPrimary}
          >
            <span className={styles.primaryLabel}>{matched.reviewLabel}</span>
            <span aria-hidden="true" className={styles.primaryArrow}>
              &rarr;
            </span>
          </a>

          <ul className={styles.otherRegions}>
            {others.map((s) => (
              <li key={s.region}>
                <a
                  href={s.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onOther(s.region)}
                  className={styles.otherLink}
                >
                  {s.reviewLabel}
                </a>
              </li>
            ))}
          </ul>

          <p className={styles.fineprint}>
            Heads up — Amazon has minimum-spend rules for who can post
            reviews. If you hit that wall, the email option below works
            just as well.
          </p>
        </div>
      </section>

      <section
        id="note"
        className={styles.note}
        aria-labelledby="note-heading"
      >
        <div className={styles.noteInner}>
          <p className={styles.eyebrowAlt}>Or, just talk to us</p>
          <h2 id="note-heading" className={styles.sectionTitle}>
            Send Maz a note.
          </h2>
          <p className={styles.sectionLede}>
            Suggestions, kid stories, what worked, what didn&apos;t — Maz reads
            everything. Public reviews are great. Private notes are great too.
          </p>

          <a
            href={`mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(
              FEEDBACK_SUBJECT
            )}`}
            className={styles.secondary}
          >
            <span className={styles.secondaryLabel}>
              Email {FEEDBACK_EMAIL}
            </span>
            <span aria-hidden="true" className={styles.secondaryArrow}>
              &rarr;
            </span>
          </a>
        </div>
      </section>
    </div>
  )
}

export default WriteAReview
