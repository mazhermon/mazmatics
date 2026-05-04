import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from './featuredTestimonials.module.css'

interface FeaturedItem {
  quote: string
  person: string
  role: string
}

const FEATURED: FeaturedItem[] = [
  {
    quote:
      "When I picked this up I was immediately drawn to the colloquial language and easy to follow format. It's written the way people speak so it's super easy to relate to. It uses real world examples that are relevant and entertaining. This makes math fun! Breath of fresh air. Thank you.",
    person: 'Rachel T',
    role: 'Parent',
  },
  {
    quote:
      "Mazmatics definitely does what it says it will do. I got my nieces and nephews all a Mazmatics book for Christmas and they all loved it. Perfect for ages 6+, and adults will enjoy it too. This is a brilliant resource for kids — it makes math fun for them, which is the best way for little brains to learn.",
    person: 'Dee J',
    role: 'Aunt and gift-buyer',
  },
  {
    quote:
      'Dear Maz, I loved your book. It makes math more fun! If you are going to make another book add some more of those practice doodling pages and another math story. Keep up the great work! Love the characters!',
    person: 'Max C',
    role: 'Reader, age 9',
  },
  {
    quote:
      'This book is excellent, starting out with kids jokes to gently and hilariously introduce simple math. The illustrated story contextualises math in a way that kids can relate to. The math gets more complex relatively quickly but keeps up the same non-pressured conversational style, using drawings to clearly break down the principles.',
    person: 'Caro R',
    role: 'Parent',
  },
]

const AUTO_ADVANCE_MS = 8000

const StarIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.7 6.6 7.1.6-5.4 4.7 1.6 7-6-3.7-6 3.7 1.6-7-5.4-4.7 7.1-.6L12 2.5z" />
  </svg>
)

export const FeaturedTestimonials: React.FC = () => {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % FEATURED.length)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [paused])

  const goPrev = () => {
    setActive((i) => (i - 1 + FEATURED.length) % FEATURED.length)
    setPaused(true)
  }

  const goNext = () => {
    setActive((i) => (i + 1) % FEATURED.length)
    setPaused(true)
  }

  const goTo = (idx: number) => {
    setActive(idx)
    setPaused(true)
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="featured-testimonials-heading"
      aria-roledescription="carousel"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <p
            id="featured-testimonials-heading"
            className={styles.eyebrow}
          >
            What readers say
          </p>
          <span
            className={styles.starRow}
            role="img"
            aria-label="5 out of 5 stars"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i}>{StarIcon}</span>
            ))}
          </span>
        </div>

        <div
          className={styles.viewport}
          role="group"
          aria-roledescription="slide"
          aria-label={`${active + 1} of ${FEATURED.length}`}
        >
          <div
            className={styles.track}
            style={{
              width: `${FEATURED.length * 100}%`,
              transform: `translateX(-${
                active * (100 / FEATURED.length)
              }%)`,
            }}
          >
            {FEATURED.map((item, idx) => (
              <figure
                key={idx}
                className={styles.slide}
                style={{ width: `${100 / FEATURED.length}%` }}
                aria-hidden={active !== idx}
              >
                <blockquote className={styles.quote}>{item.quote}</blockquote>
                <figcaption className={styles.attribution}>
                  {item.person}
                  <span className={styles.attributionRole}>{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={goPrev}
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          <ol className={styles.dots} aria-hidden="true">
            {FEATURED.map((_, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  className={`${styles.dot} ${
                    idx === active ? styles.dotActive : ''
                  }`}
                  onClick={() => goTo(idx)}
                  tabIndex={-1}
                />
              </li>
            ))}
          </ol>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={goNext}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        <Link href="/about#testimonials" className={styles.footerLink}>
          More from kids and adults
        </Link>

        <p className={styles.srOnly} aria-live="polite">
          Showing {active + 1} of {FEATURED.length}: {FEATURED[active].quote}
        </p>
      </div>
    </section>
  )
}
