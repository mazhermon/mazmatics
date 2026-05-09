import React, { useState } from 'react'
import axios from 'axios'

import styles from './mailingSignup.module.css'
import { TickCircle } from './icons/tickCircle'
import { CrossCircle } from './icons/crossCircle'
import { LoaderRing } from './icons/loaders/loaderRing'
import { trackMailingListSubmit } from '../lib/gtag'

type Variant = 'band' | 'inline'

type FormState = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'

interface Props {
  /**
   * 'band' — full-width section with eyebrow + heading + lede + form,
   * intended as a standalone strip on a page.
   * 'inline' — compact heading + form only, intended for footers / sidebars.
   */
  variant?: Variant
  /** Tagged on analytics events so we can see which placement is converting. */
  location?: string
  eyebrow?: string
  heading?: string
  lede?: string
  cta?: string
  successMessage?: string
}

export const MailingSignup: React.FC<Props> = ({
  variant = 'band',
  location = 'unknown',
  eyebrow = 'Stay in the loop',
  heading = 'Be first when Vol. 2 ships.',
  lede = 'A note from Maz when the next book is out, plus the occasional behind-the-scenes from a Wellington dad still drawing maths jokes.',
  cta = 'Sign me up',
  successMessage = "You're in. Welcome aboard.",
}) => {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('IDLE')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('LOADING')
    setErrorMessage(null)
    try {
      await axios.post('/api/mailinglist', { email })
      setState('SUCCESS')
      trackMailingListSubmit(location)
    } catch (err) {
      const fallback =
        'Sorry, something went wrong. Try again, or email hellomazmatics@gmail.com.'
      let msg = fallback
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { error?: string } | undefined
        if (data?.error) msg = data.error
      }
      setErrorMessage(msg)
      setState('ERROR')
    }
  }

  const inputId = `mailing-${variant}-${location}`
  const isInline = variant === 'inline'

  const form = (
    <form
      className={isInline ? styles.formInline : styles.formBand}
      onSubmit={onSubmit}
      noValidate
    >
      <label className={styles.srOnly} htmlFor={inputId}>
        Your email address
      </label>
      <input
        id={inputId}
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`${styles.input} ${state === 'ERROR' ? styles.inputError : ''}`}
        aria-invalid={state === 'ERROR'}
        aria-describedby={state === 'ERROR' ? `${inputId}-error` : undefined}
        disabled={state === 'LOADING' || state === 'SUCCESS'}
      />
      <button
        type="submit"
        className={styles.button}
        disabled={state === 'LOADING' || state === 'SUCCESS'}
      >
        {state === 'LOADING' ? (
          <span className={styles.loader} aria-hidden="true">
            <LoaderRing />
          </span>
        ) : (
          cta
        )}
        <span className="sr-only">
          {state === 'LOADING' ? 'Submitting' : ''}
        </span>
      </button>
    </form>
  )

  const messages = (
    <>
      {state === 'ERROR' && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className={`${styles.message} ${styles.messageError}`}
        >
          <span className={styles.messageIcon} aria-hidden="true">
            <CrossCircle />
          </span>
          {errorMessage}
        </p>
      )}
      {state === 'SUCCESS' && (
        <p role="status" className={`${styles.message} ${styles.messageSuccess}`}>
          <span className={styles.messageIcon} aria-hidden="true">
            <TickCircle />
          </span>
          {successMessage}
        </p>
      )}
    </>
  )

  if (isInline) {
    return (
      <div className={styles.inline}>
        <p className={styles.inlineHeading}>{heading}</p>
        {lede && <p className={styles.inlineLede}>{lede}</p>}
        {form}
        {messages}
      </div>
    )
  }

  return (
    <section className={styles.band} aria-labelledby={`${inputId}-heading`}>
      <div className={styles.bandInner}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id={`${inputId}-heading`} className={styles.title}>
          {heading}
        </h2>
        {lede && <p className={styles.lede}>{lede}</p>}
        {form}
        {messages}
        <p className={styles.fineprint}>
          One short note from Maz, no spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
