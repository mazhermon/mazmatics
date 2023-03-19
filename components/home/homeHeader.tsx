import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import lindyImage from '../../public/images/lindyLarge.png'
import mazmaticsLogo from '../../public/images/Mazmatics-logo.png'
import { Button } from '../button'
// import { CharCircleBetty } from '../characters/circleBetty'

import styles from './homeHeader.module.css'
import { GridPaper } from '../patterns/GridPaper'
import { SineShine } from '../patterns/SineShine'

const lindyImageSize = {
  width: 2213,
  height: 2633,
}

const logoImageSizes = {
  width: 1001,
  height: 230,
}

export const HomeHeader = () => {
  const [lang, setLang] = useState<string | null>(null)
  useEffect(() => {
    // TODO make a lang context for this
    if (window !== undefined) {
      setLang(window.navigator.language)
    }

    // en-GB
    // console.log(lang)
  }, [])

  return (
    <div className={styles.homeHeader}>
      <GridPaper />
      <div className={styles.sineShineHomePositioner}>
        <SineShine version="2" />
      </div>
      <div className={styles.homeHeader__content}>
        <div className={styles.siteTitle}>
          <h1 className={styles.homeHeading1}>
            <span className={styles.siteTitle__welcometo}>Welcome to</span>
            <span className="sr-only">Mazmatics</span>
          </h1>
          <div className={styles.MainLogo}>
            <Image
              className={styles.siteTitle__logo}
              alt="Mazmatics"
              src={mazmaticsLogo}
              layout="intrinsic"
              width={logoImageSizes.width}
              height={logoImageSizes.height}
            />
          </div>

          <div className={styles.siteTitle__promise}>
            <div>We help kids say...</div>
            <div className={styles.iLikeMath}>
              <span className={`quoteMark ${styles.quoteMark}`}>&ldquo;</span>I
              like math{lang === 'en-GB' && <span>s</span>}
              <span className={`quoteMark ${styles.quoteMark}`}>&rdquo;</span>
            </div>
          </div>
        </div>

        <div className={styles.homeCTAbutton}>
          <Button
            className={styles.homeHeaderCTA}
            variant="primary"
            href="/get-the-book"
          >
            Buy the book
          </Button>
        </div>
      </div>
      <div className={styles.homeHeader__heroImage}>
        <div className={styles.lindy}>
          {/* use useState to set the width based on breakpoint in js */}
          <Image
            alt="Giant Girl adventurer sitting down smiling"
            src={lindyImage}
            layout="intrinsic"
            width={lindyImageSize.width / 3}
            height={lindyImageSize.height / 3}
          />
        </div>
      </div>
    </div>
  )
}
