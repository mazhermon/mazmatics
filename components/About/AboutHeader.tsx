import { SineShine } from '../patterns/SineShine'
import styles from './AboutHeader.module.css'

import React from 'react'

export const AboutHeader = () => (
  <div className={styles.aboutHeader}>
    <div className={styles.sineShinePositioner}>
      <SineShine color="purple" version="2" />
    </div>
    <div className={styles.aboutHeader__introText}>
      <h1 className={styles.aboutHeader__heading}>About</h1>
      <p className={styles.subtitle}>Mazmatics Fun Math For Kids</p>
      <p>
        Mazmatics helps you to support the kids in your life with learning at
        home. We create supplementary learning resources to support kids to keep
        practicing what they&apos;re learning in school. If we can help kids to
        develop a healthy attitude towards learning, then they&apos;ll get more
        out of anything they come across. We help kids say &quot;I like
        math&quot;.
      </p>
    </div>
  </div>
)
