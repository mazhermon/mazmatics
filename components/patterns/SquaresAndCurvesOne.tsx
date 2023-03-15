import React from 'react'
import { squaresAndCurves1 } from './svg/squaresAndCurves1'

import styles from './squaresAndCurves1.module.css'
{
  /* <style>.cls-1{fill:none;stroke:#8c5fd5;stroke-miterlimit:10;stroke-width:9px;}</style> */
}
export const SquaresAndCurvesOne = () => {
  // TODO - gather other lines patterns in here and switch via props
  return (
    <div className={styles.squaresAndCurves1Container}>{squaresAndCurves1}</div>
  )
}
