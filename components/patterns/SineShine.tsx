import React from 'react'
import { clsx } from 'clsx'

import { sineShine1 } from './svg/sineShine1'
import { sineShine2 } from './svg/sineShine2'

import styles from './SineShine.module.css'

type Props = {
  version?: '1' | '2'
  color?: 'purple'
}

export const SineShine: React.FC<Props> = ({ version, color = 'yellow' }) => {
  return (
    <div
      className={clsx({
        [styles.sineShine]: true,
        [styles[color]]: !!color,
      })}
    >
      {version === '1' ? (
        <div className={styles.sineShineVersion}>{sineShine1}</div>
      ) : (
        <div className={styles.sineShineVersion}>{sineShine2}</div>
      )}
    </div>
  )
}
