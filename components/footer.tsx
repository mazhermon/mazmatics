import React, { useState } from 'react'

import { CharCircleBetty } from './characters/circleBetty'
import MailingList from './mailinglist'

import styles from './footer.module.css'
import { Banner } from './banner'
import { Button } from './button'

// import bookBannerImage from '../public/images/emailFunCOver.jpg'

// const bookBannerImageSize = {
//   width: 1940,
//   height: 600,
// }

export const Footer = () => {
  const [isInputFocus, setIsInputFocus] = useState(false)
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

  // Fun animation during mailing list sign up - just for a laugh
  const handleOnInputFun = () => {
    setIsInputFocus(true)
  }
  const handleOnInputBlurFun = () => {
    setIsInputFocus(false)
  }

  const handleOnSignupFun = () => {
    setIsSubmitClicked(true)
  }

  return (
    <div className={styles.siteFooter}>
      <div className={styles.signup}>
        <div className={styles.charCircleBettyPositioner}>
          <CharCircleBetty
            isInputFocus={isInputFocus}
            isSubmitClicked={isSubmitClicked}
            small={true}
          />
        </div>
        <MailingList
          onMailingListInputFocused={handleOnInputFun}
          onMailingListFormSubmitted={handleOnSignupFun}
          onMailingListInputBlurred={handleOnInputBlurFun}
        />
      </div>

      <div></div>

      {/* <div className={styles.waves}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div> */}

      <div className={`${styles.footerBanner} footerBannerGlobal`}>
        <Banner
          className={styles.footerBannerInner}
          waves={true}
          title="Fun Math 4 kids book"
          subtitle="Volume 1 – out now"
          size="med"
          color="purple"
          variant="fun"
        >
          <Button variant="secondary" href="/get-the-book">
            Get the book
          </Button>

          <Button
            onClick={() => {
              window.scrollTo({ top: 0 })
            }}
            variant="secondary"
          >
            <span className={styles.backToTopPointer}></span>
            Back to top
          </Button>
        </Banner>
      </div>
    </div>
  )
}
