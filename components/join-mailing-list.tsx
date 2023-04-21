import React, { useState } from 'react'
import MailingList from '../components/mailinglist'
import { CharCircleBetty } from '../components/characters/circleBetty'

import styles from './join-mailing-list.module.css'

const JoinMailingList = () => {
  // Fun animation during mailing list sign up - just for a laugh
  const [isInputFocus, setIsInputFocus] = useState(false)
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

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
    <>
      {/* <Container className={styles.joinTheMailingListPage}>
        <h1>Join us</h1>
        <p className={styles.subtitle}>On our journey</p>
        <p>
          We don&apos;t email often, maybe once a month at most. Sign up and
          stay in the loop for fun things we&apos;ve been up to.
        </p>
      </Container> */}

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
    </>
  )
}
export default JoinMailingList
