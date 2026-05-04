import styles from './reviews.module.css'

import { Star } from './icons/star'

const ASIN = '0473648911'

const reviewUrlUS = `https://amazon.com/review/create-review?&asin=${ASIN}`
const reviewUrlAU = `https://amazon.com.au/review/create-review?&asin=${ASIN}`
const reviewUrlUK = `https://amazon.co.uk/review/create-review?&asin=${ASIN}`

export const Reviews = () => (
  <div className={styles.reviewSection}>
    <header className={styles.reviewSection__header}>
      <span
        className={styles.stars}
        role="img"
        aria-label="5 out of 5 stars"
      >
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </span>
      <h2 className={styles.reviewSection__header__heading}>
        A short review goes a long way.
      </h2>
    </header>

    <section className={styles.reviewBlock}>
      <h3 className={styles.reviewSectionHeading}>Email a quick note</h3>
      <p>
        The shortest path. Tell us what worked, what didn&apos;t, and whether
        we&apos;re welcome to quote you.
      </p>
      <a
        className={styles.feedbackButtonLink}
        href="mailto:hellomazmatics@gmail.com?subject=Hi Mazmatics"
      >
        Email hellomazmatics@gmail.com
      </a>
    </section>

    <section className={styles.reviewBlock}>
      <h3 className={styles.reviewSectionHeading}>Review on Amazon</h3>
      <p>
        Reviews on Amazon are the single biggest thing that helps the book
        reach more parents.
      </p>
      <ul className={styles.reviewLinkList}>
        <li>
          <a
            className={styles.feedbackButtonLink}
            href={reviewUrlAU}
            target="_blank"
            rel="noopener noreferrer"
          >
            Amazon AU / NZ
          </a>
        </li>
        <li>
          <a
            className={styles.feedbackButtonLink}
            href={reviewUrlUS}
            target="_blank"
            rel="noopener noreferrer"
          >
            Amazon US
          </a>
        </li>
        <li>
          <a
            className={styles.feedbackButtonLink}
            href={reviewUrlUK}
            target="_blank"
            rel="noopener noreferrer"
          >
            Amazon UK
          </a>
        </li>
      </ul>
    </section>

    <section className={styles.reviewBlock}>
      <h3 className={styles.reviewSectionHeading}>Review on Google</h3>
      <p>Good Google reviews help new readers find us.</p>
      <a
        className={`${styles.feedbackButtonLink} ${styles.feedbackButtonLink__google}`}
        href="https://www.google.com/search?q=mazmatics&authuser=0#lrd=0x6d38afcb99cd153d:0x10ab84faecedf353,3"
        target="_blank"
        rel="noopener noreferrer"
      >
        Write a Google review
      </a>
    </section>
  </div>
)
