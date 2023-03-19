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
    </div>

    <div className={styles.whiteOverlay}>
      <h3 className={styles.reviewSectionHeading}>Tell us what you think</h3>
      <p>
        You can email us your review using this link, or check out the other
        options below. We love feedback and hearing from you about what worked
        for your kids and what didn&apos;t
      </p>
      <p>
        Let us know if you&apos;re happy for us to use a quote or two here on
        the site etc.
      </p>
      <p>
        <a
          className={`${styles.emailTopLink} ${styles.feedbackButtonLink} ${styles.feedbackButtonLink__google}`}
          href="mailto:hello@mazmatics.com?subject=Hi Mazmatics"
        >
          email us your review or feedback
        </a>
      </p>
    </div>

    {/* TODO split out more components */}
    <div className={styles.whiteOverlay}>
      <h3 className={styles.reviewSectionHeading}>Review us on Google</h3>
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
    <div className={styles.whiteOverlay}>
      <h3 className={styles.reviewSectionHeading}>Review us on Amazon</h3>
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
