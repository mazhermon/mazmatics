import React from 'react'
import Link from 'next/link'

import styles from './alreadyGotIt.module.css'

/**
 * Quiet post-CTA band for returning customers. Sits below FinalCta so it
 * doesn't dilute the first-time-buyer momentum, but catches existing readers
 * and routes them to the combined review/feedback page.
 */
export const AlreadyGotIt: React.FC = () => (
  <aside className={styles.section} aria-label="Already got the book?">
    <div className={styles.inner}>
      <p className={styles.copy}>
        <span className={styles.lead}>Already got the book?</span>{' '}
        <Link href="/write-a-review" className={styles.link}>
          Tell us how it landed
          <span aria-hidden="true">&nbsp;&rarr;</span>
        </Link>
      </p>
    </div>
  </aside>
)
