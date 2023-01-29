import styles from './reviews.module.css'

import { Star } from './icons/star'

const ASIN = '0473648911'

const reviewUrlUS = `http://amazon.com/review/create-review?&asin=${ASIN}`
const reviewUrlAU = `http://amazon.com.au/review/create-review?&asin=${ASIN}`
const reviewUrlUK = `http://amazon.co.uk/review/create-review?&asin=${ASIN}`

export const Reviews = () => (
  <div className={styles.reviewSection}>
    <h2 className={styles.reviewSectionHeading}>Review us on Amazon</h2>
    <div className={styles.whiteOverlay}>
      <div className={styles.stars}>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>

      <p>Write us a review on Amazon to help spread the word.</p>
      <p>This is the best way to support the project, thanks team!</p>
      <p>
        (No Amazon account? Just{' '}
        <a
          className={styles.hitmeLink}
          href="mailto:hello@mazmatics.com?subject=Hi Mazmatics"
        >
          email us your review{' '}
        </a>{' '}
        if you like.)
      </p>
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
