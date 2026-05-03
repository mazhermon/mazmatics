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
  { src: mazAPlus001, alt: 'Parent pointing to the map in the fantasy story Lindys Quest' },
  { src: mazAPlus002, alt: 'Parent shows kid the secret code cracker page' },
  { src: mazAPlus003, alt: 'Kid writing in the book for a cookies math question' },
  { src: mazAPlus004, alt: 'A page of practice exercises and drawings' },
]

export const LookInside = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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
    setOpenIndex((i) => (i === null ? null : (i - 1 + PAGES.length) % PAGES.length))
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

  return (
    <>
      <h2 className={styles.lookInsideTitle}>Look inside</h2>
      <div className={styles.imageGal}>
        {PAGES.map((page, idx) => (
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

      {openIndex !== null && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label="Look inside the book — page viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div className={styles.modalContent}>
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
