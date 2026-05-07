import React from 'react'
import styles from './AboutHeader.module.css'
import { SineShine } from '../patterns/SineShine'

export const AboutHeader: React.FC = () => (
  <section className={styles.section} aria-labelledby="about-heading">
    <div className={styles.shineDeco} aria-hidden="true">
      <SineShine version="2" color="purple" />
    </div>
    <div className={styles.inner}>
      <p className={styles.eyebrow}>About</p>
      <h1 id="about-heading" className={styles.title}>
        Why this book exists.
      </h1>
      <p className={styles.lede}>
        Mazmatics makes a tactile activity and story book for kids 7–10
        who don’t quite click with how math is taught. Not a replacement
        for school. Practice between lessons, made to be drawn on.
      </p>
    </div>
  </section>
)
