import React from 'react'
import { lines1Svg } from './svg/lines1'

import styles from './lines.module.css'

export const Lines = () => {
  // TODO - gather other lines patterns in here and switch via props
  return <div className={styles.linesContainer}>{lines1Svg}</div>
}
