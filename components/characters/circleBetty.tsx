import React from 'react'
import styles from './circleBetty.module.css'

type Props = {
  isInputFocus: boolean
  isSubmitClicked: boolean
  small?: boolean
}

export const CharCircleBetty: React.FC<Props> = ({
  isInputFocus,
  isSubmitClicked,
  small,
}) => (
  <div
    className={`${styles.charCircleBettyAnimationWrapper} ${
      isInputFocus && styles.lookDown
    } ${isSubmitClicked && styles.chomp}`}
  >
    <div className={styles.charCircleBetty}>
      <div className={`${styles.eye} ${small && styles.eye__small}`}></div>
      <div
        className={`${styles.eyeClosed} ${small && styles.eyeClosed__small}`}
      >
        <svg
          width="93"
          height="58"
          viewBox="0 0 93 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 49.0044C8.5 35.5044 18.4 8.60441 46 9.00441C73.6 9.40441 82.8333 35.8377 84 49.0044"
            stroke="#3A3A39"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  </div>
)
