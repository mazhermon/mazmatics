import React from 'react'

import { sineShine1 } from './svg/sineShine1'
import { sineShine2 } from './svg/sineShine2'

import styles from './sineShine.module.css'

type Props = {
  version?: '1' | '2'
}

export const SineShine: React.FC<Props> = ({ version }) => {
  return (
    <div className={styles.sineShine}>
      {version === '1' ? (
        <div className={styles.sineShineVersion}>{sineShine1}</div>
      ) : (
        <div className={styles.sineShineVersion}>{sineShine2}</div>
      )}
    </div>
  )
}
