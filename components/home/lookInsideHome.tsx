import React from 'react'

import styles from './lookInsideHome.module.css'
import { LookInside } from '../LookInside'

export const LookInsideHome: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="look-inside-heading"
    >
      <div className={styles.headerInner}>
        <p className={styles.eyebrow}>Sample pages</p>
        <h2 id="look-inside-heading" className={styles.title}>
          Take a look inside.
        </h2>
        <p className={styles.lede}>
          Six pages from the book — tap any one to read it bigger.
        </p>
      </div>

      <div className={styles.stripWrap}>
        <LookInside variant="strip" heading={null} />
      </div>
    </section>
  )
}
