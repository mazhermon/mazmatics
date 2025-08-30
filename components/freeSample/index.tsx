import React from 'react'

import styles from './freeSample.module.css'
import { Button } from '../button'

export const FreeSampleDownload = () => {
  const onFreeSampleDownloadAnalytics = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    gtag('event', 'free_sample_downloaded', {
      event_category: 'free_sample_downloaded',
      event_label: 'free_sample_downloaded',
    })
    debugger
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
