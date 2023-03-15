import styles from './reviews.module.css'

import { Star } from './icons/star'

const ASIN = '0473648911'

const reviewUrlUS = `http://amazon.com/review/create-review?&asin=${ASIN}`
const reviewUrlAU = `http://amazon.com.au/review/create-review?&asin=${ASIN}`
const reviewUrlUK = `http://amazon.co.uk/review/create-review?&asin=${ASIN}`

export const Reviews = () => (
  <div className={styles.reviewSection}>
    <div className={styles.reviewSection__header}>
      <h2 className={styles.reviewSection__header__heading}>
        Support Mazmatics by writing a review
      </h2>
      <p>
        <a
          className={styles.emailTopLink}
          href="mailto:hello@mazmatics.com?subject=Hi Mazmatics"
        >
          You can email us your review{' '}
        </a>
      </p>
      <p>Or...</p>
    </div>

    {/* TODO split out more components */}
    <h3 className={styles.reviewSectionHeading}>Review us on Google</h3>
    <div className={styles.whiteOverlay}>
      <div className={styles.stars}>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>

      <p>Good reviews really help us by making us easier to find</p>
      <a
        className={`${styles.feedbackButtonLink} ${styles.feedbackButtonLink__google}`}
        href="https://www.google.com/search?q=google+review+mazmatics&rlz=1C5CHFA_enNZ906NZ906&ei=gk8JZOK0BdnA4-EPobOeyAs&ved=0ahUKEwji_cqL8c39AhVZ4DgGHaGZB7kQ4dUDCA4&uact=5&oq=google+review+mazmatics&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQA0oECEEYAFAAWABg7gFoAHABeACAAQCIAQCSAQCYAQCgAQHAAQE&sclient=gws-wiz-serp#lrd=0x6d38afcb99cd153d:0x10ab84faecedf353,3,,,,"
      >
        Write us a Google Review
      </a>
    </div>
    <h3 className={styles.reviewSectionHeading}>Review us on Amazon</h3>
    <div className={styles.whiteOverlay}>
      <div className={styles.stars}>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>

      <p>Write us a review on Amazon to help spread the word.</p>

      <ul className={styles.reviewLinkList}>
        <li>
          <a className={styles.feedbackButtonLink} href={reviewUrlUS}>
            Write a review (US)
          </a>
        </li>
        <li>
          <a className={styles.feedbackButtonLink} href={reviewUrlAU}>
            Write a review (NZ/AU)
          </a>
        </li>
      </ul>
      <a className={styles.ukLink} href={reviewUrlUK}>
        Or even in the UK? Write a review UK
      </a>
    </div>
  </div>
)
