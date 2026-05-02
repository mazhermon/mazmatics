import React from 'react'

import styles from './freeSample.module.css'
import { Button } from '../button'
import { trackFreeSampleDownload } from '../../lib/gtag'

export const FreeSampleDownload = () => {
  const onFreeSampleDownloadAnalytics = () => {
    trackFreeSampleDownload()
    window.location.href =
      '/downloads/Mazmatics_FunMathForKids_vol1_Free_Sample_PDF.pdf'
  }
  return (
    <>
      <div className={styles.freeSampleText}>
        <p>Try before you buy with this free sampler digital edition</p>
      </div>
      <Button
        onClick={onFreeSampleDownloadAnalytics}
        className={styles.homeFreeSampleCTAbutton}
        variant="secondary"
        // href="/downloads/Mazmatics_FunMathForKids_vol1_Free_Sample_PDF.pdf"
      >
        Download a free sample
      </Button>
    </>
  )
}
