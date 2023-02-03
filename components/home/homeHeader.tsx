import Image from 'next/image'
import lindyImage from '../../public/images/lindyLarge.png'
import mazmaticsLogo from '../../public/images/Mazmatics-logo.png'
import { Button } from '../button'
// import { CharCircleBetty } from '../characters/circleBetty'

import styles from './homeHeader.module.css'

const lindyImageSize = {
  width: 2213,
  height: 2633,
}

const logoImageSizes = {
  width: 1001,
  height: 230,
}

export const HomeHeader = () => (
  <div className={`${styles.homeHeader} `}>
    <div className={styles.homeHeader__content}>
      <div className={styles.siteTitle}>
        <h1 className={styles.homeHeading1}>
          <span className={styles.siteTitle__welcometo}>Welcome to</span>
          <span className="sr-only">Mazmatics</span>
        </h1>
        <Image
          className={styles.siteTitle__logo}
          alt="Mazmatics"
          src={mazmaticsLogo}
          layout="intrinsic"
          width={logoImageSizes.width}
          height={logoImageSizes.height}
        />

        <span className={styles.siteTitle__promise}>
          We help kids say <br />
          &quot;I like math&quot;
        </span>
      </div>

      <div className={styles.homeCTAbutton}>
        <Button
          className={styles.homeHeaderCTA}
          variant="primary"
          href="/get-the-book"
        >
          Get the book today
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
