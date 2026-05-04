import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/legacy/image'

import styles from './lookInside.module.css'

import mazAPlus001 from '../public/images/Mazmatics-a-plus-001.jpg'
import mazAPlus002 from '../public/images/Mazmatics-a-plus-002.jpg'
import mazAPlus003 from '../public/images/Mazmatics-a-plus-003.jpg'
import mazAPlus004 from '../public/images/Mazmatics-a-plus-004.jpg'
import { trackLookInsideOpen } from '../lib/gtag'

const contentImageSize = {
  width: 1200,
  height: 1200,
}

const PAGES = [
  {
    src: mazAPlus001,
    alt: 'Parent pointing to the map in the fantasy story Lindys Quest',
  },
  {
    src: mazAPlus002,
    alt: 'Parent shows kid the secret code cracker page',
  },
  {
    src: mazAPlus003,
    alt: 'Kid writing in the book for a cookies math question',
  },
  {
    src: mazAPlus004,
    alt: 'A page of practice exercises and drawings',
  },
]

const SHOWCASE_AUTO_ADVANCE_MS = 5000

interface Props {
  /** `grid` (default) renders all pages in a responsive grid (current home-page behavior).
   *  `showcase` renders 3 desktop thumbs in a single row + an auto-scrolling embedded
   *  carousel on mobile with prev/next/pause user controls. Both variants share the
   *  same fullscreen modal lightbox. */
  variant?: 'grid' | 'showcase'
  /** Heading text. Pass `null` to render no heading (e.g. when the host page has its own h1). */
  heading?: string | null
}

export const LookInside: React.FC<Props> = ({
  variant = 'grid',
  heading = 'Look inside',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([])
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const lastTriggerIndex = useRef<number | null>(null)

  const open = useCallback((idx: number) => {
    lastTriggerIndex.current = idx
    setOpenIndex(idx)
    trackLookInsideOpen()
  }, [])

  const close = useCallback(() => {
    setOpenIndex(null)
    const idx = lastTriggerIndex.current
    if (idx !== null) {
      requestAnimationFrame(() => {
        triggerRefs.current[idx]?.focus()
      })
    }
  }, [])

  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % PAGES.length))
  }, [])

  const prev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + PAGES.length) % PAGES.length
    )
  }, [])

  useEffect(() => {
    if (openIndex === null) return
    closeBtnRef.current?.focus()
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [openIndex, close, next, prev])

  // Mobile showcase carousel auto-advance. Skipped when paused, when reduced
  // motion is preferred, or when the modal is open.
  useEffect(() => {
    if (variant !== 'showcase') return
    if (isPaused) return
    if (openIndex !== null) return
    if (typeof window === 'undefined') return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reducedMotion) return

    const interval = window.setInterval(() => {
      setActiveSlide((i) => (i + 1) % PAGES.length)
    }, SHOWCASE_AUTO_ADVANCE_MS)
    return () => window.clearInterval(interval)
  }, [variant, isPaused, openIndex])

  const slidePrev = () => {
    setActiveSlide((i) => (i - 1 + PAGES.length) % PAGES.length)
    setIsPaused(true)
  }

  const slideNext = () => {
    setActiveSlide((i) => (i + 1) % PAGES.length)
    setIsPaused(true)
  }

  const togglePause = () => setIsPaused((p) => !p)

  const desktopThumbs =
    variant === 'showcase' ? PAGES.slice(0, 3) : PAGES

  return (
    <>
      {heading !== null && (
        <h2 className={styles.lookInsideTitle}>{heading}</h2>
      )}

      <div
        className={
          variant === 'showcase' ? styles.showcaseRow : styles.imageGal
        }
      >
        {desktopThumbs.map((page, idx) => (
          <button
            key={idx}
            type="button"
            ref={(el) => {
              triggerRefs.current[idx] = el
            }}
            className={styles.thumbButton}
            onClick={() => open(idx)}
            aria-label={`Open larger view: ${page.alt}`}
          >
            <Image
              alt={page.alt}
              src={page.src}
              width={contentImageSize.width}
              height={contentImageSize.height}
              loading="eager"
            />
          </button>
        ))}
      </div>

      {variant === 'showcase' && (
        <div
          className={styles.showcaseMobile}
          aria-roledescription="carousel"
          aria-label="Sample pages from the book"
        >
          <div
            className={styles.showcaseMobileViewport}
            role="group"
            aria-roledescription="slide"
            aria-label={`${activeSlide + 1} of ${PAGES.length}`}
          >
            <div
              className={styles.showcaseMobileTrack}
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {PAGES.map((page, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={styles.showcaseMobileSlide}
                  onClick={() => open(idx)}
                  aria-hidden={activeSlide !== idx}
                  tabIndex={activeSlide === idx ? 0 : -1}
                  aria-label={`Open larger view: ${page.alt}`}
                >
                  <Image
                    alt={page.alt}
                    src={page.src}
                    width={contentImageSize.width}
                    height={contentImageSize.height}
                    loading="eager"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.showcaseControls}>
            <button
              type="button"
              className={styles.showcaseCtrlBtn}
              onClick={slidePrev}
              aria-label="Previous sample page"
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.showcaseCtrlBtn}
              onClick={togglePause}
              aria-label={
                isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'
              }
              aria-pressed={isPaused}
            >
              {isPaused ? '▶' : '❚❚'}
            </button>
            <button
              type="button"
              className={styles.showcaseCtrlBtn}
              onClick={slideNext}
              aria-label="Next sample page"
            >
              ›
            </button>
          </div>

          <ol className={styles.showcaseDots} aria-hidden="true">
            {PAGES.map((_, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  className={`${styles.showcaseDot} ${
                    activeSlide === idx ? styles.showcaseDotActive : ''
                  }`}
                  onClick={() => {
                    setActiveSlide(idx)
                    setIsPaused(true)
                  }}
                  tabIndex={-1}
                />
              </li>
            ))}
          </ol>

          <p className={styles.srOnly} aria-live="polite">
            Showing {activeSlide + 1} of {PAGES.length}: {PAGES[activeSlide].alt}
          </p>
        </div>
      )}

      {openIndex !== null && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label="Look inside the book — page viewer"
        >
          <button
            type="button"
            className={styles.modalBackdrop}
            onClick={close}
            aria-label="Close look-inside viewer"
            tabIndex={-1}
          />
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.modalClose}
              onClick={close}
              aria-label="Close look-inside viewer"
            >
              ×
            </button>
            <button
              type="button"
              className={`${styles.modalNav} ${styles.modalNavPrev}`}
              onClick={prev}
              aria-label="Previous page"
            >
              ‹
            </button>
            <div className={styles.modalImage}>
              <Image
                alt={PAGES[openIndex].alt}
                src={PAGES[openIndex].src}
                width={contentImageSize.width}
                height={contentImageSize.height}
                priority
              />
            </div>
            <button
              type="button"
              className={`${styles.modalNav} ${styles.modalNavNext}`}
              onClick={next}
              aria-label="Next page"
            >
              ›
            </button>
            <p className={styles.modalCounter} aria-live="polite">
              {openIndex + 1} / {PAGES.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
