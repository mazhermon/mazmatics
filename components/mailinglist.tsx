import React, { useState } from 'react'
import axios from 'axios'

import styles from './mailinglist.module.css'
import { TickCircle } from './icons/tickCircle'
import { CrossCircle } from './icons/crossCircle'

const MailingList = () => {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('IDLE')
  const [errorMessage, setErrorMessage] = useState(null)

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    subscribeToMailingList()
  }

  const subscribeToMailingList = async () => {
    setState('LOADING')
    setErrorMessage(null)
    try {
      await axios.post('/api/mailinglist', { email })
      setState('SUCCESS')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorMessage(e.response.data.error)
      setState('ERROR')
    }
  }

  return (
    <form className={styles.mailingList} onSubmit={onFormSubmit}>
      <h2 className={styles.mailingListTitle}>Join the mailing list</h2>
      <div className={styles.mailingList__inner}>
        <input
          className={`${styles.emailInput} ${
            state === 'ERROR' && styles.emailInput__error
          }`}
          aria-describedby="formValidation"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {state === 'ERROR' && (
          <div
            id="formValidation"
            className={`${styles.validationMessage} ${styles.validationMessage__error} ${styles.validationMessage__stackedForm}`}
          >
            <CrossCircle /> {errorMessage}
          </div>
        )}

        <button
          className={`${styles.signupButton} ${
            state === 'LOADING' && styles.signupButton__isLoading
          }`}
          type="submit"
          disabled={state === 'LOADING'}
        >
          Join
        </button>
      </div>

      {state === 'ERROR' && (
        <div
          id="formValidation"
          role="alert"
          className={`${styles.validationMessage} ${styles.validationMessage__error} ${styles.validationMessage__wideForm}`}
        >
          <CrossCircle /> {errorMessage}
        </div>
      )}
      {state === 'SUCCESS' && (
        <div
          role="alert"
          className={`${styles.validationMessage} ${styles.validationMessage__success}`}
        >
          <TickCircle />
          Awww yeah! You&apos;re signed up
        </div>
      )}
    </form>
  )
}

export default MailingList
