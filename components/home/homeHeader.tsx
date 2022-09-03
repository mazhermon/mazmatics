import Image from 'next/image'
import lindyImage from '../../public/images/lindyLarge.png'
import mazmaticsLogo from '../../public/images/Mazmatics-logo.png'
import { CharCircleBetty } from '../characters/circleBetty'

import styles from './homeHeader.module.css'

const lindyImageSize = {
  width: 2213,
  height: 2633,
}

const logoImageSizes = {
  width: 1001,
  height: 230,
}

type Props = {
  isInputFocus: boolean
  isSubmitClicked: boolean
}

export const HomeHeader: React.FC<Props> = ({
  isInputFocus,
  isSubmitClicked,
}) => (
  <div className={`${styles.homeHeader} `}>
    <h1 className={styles.siteTitle}>
      <span className={styles.siteTitle__welcometo}>Welcome to</span>
      <Image
        alt="Mazmatics logo"
        src={mazmaticsLogo}
        layout="intrinsic"
        width={logoImageSizes.width / 3}
        height={logoImageSizes.height / 3}
      />

      <span className={styles.siteTitle__promise}>
        We help kids say <wbr />
        &quot;I like math&quot;
      </span>
    </h1>

    <div className={styles.charCircleBettyPositioner}>
      <CharCircleBetty
        isInputFocus={isInputFocus}
        isSubmitClicked={isSubmitClicked}
      />
    </div>

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
