import Image from 'next/image'
import lindyImage from '../../public/images/lindyLarge.png'
import mazmaticsLogo from '../../public/images/Mazmatics-logo.png'
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
    <h1 className={styles.siteTitle}>
      <span className={styles.siteTitle__welcometo}>Welcome to</span>
      <Image
        className={styles.siteTitle__logo}
        alt="Mazmatics logo"
        src={mazmaticsLogo}
        layout="intrinsic"
        width={logoImageSizes.width}
        height={logoImageSizes.height}
      />

      <span className={styles.siteTitle__promise}>
        We help kids say <br />
        &quot;I like math&quot;
      </span>
    </h1>

    {/* <div className={styles.charCircleBettyPositioner}>
      <CharCircleBetty
        isInputFocus={isInputFocus}
        isSubmitClicked={isSubmitClicked}
      />
    </div> */}

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
)
