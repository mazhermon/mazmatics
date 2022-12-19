import React, { useState } from 'react'
import MailingList from '../components/mailinglist'
import { CharCircleBetty } from '../components/characters/circleBetty'

import styles from './join-mailing-list-page.module.css'

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
