import React from 'react'

import styles from './freeSample.module.css'
import { Button } from '../button'

export const FreeSample = () => (
  <>
    <div className={styles.freeSampleText}>
      <p>Try before you buy with this free sampler digital edition</p>
    </div>
    <Button
      className={styles.homeFreeSampleCTAbutton}
      variant="secondary"
      href="/downloads/Mazmatics_FunMathForKids_vol1_Free_Sample_PDF.pdf"
    >
      Download a free sample
    </Button>
  </>
)
