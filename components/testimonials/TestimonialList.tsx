import React from 'react'

import styles from './testimonialList.module.css'
import { TESTIMONIAL_DATA, ITestimonial } from './testimonailsData'

const QuoteCard: React.FC<{ item: ITestimonial }> = ({ item }) => (
  <li className={styles.card}>
    <span className={styles.mark} aria-hidden="true">
      &ldquo;
    </span>
    <blockquote className={styles.quote}>{item.quote}</blockquote>
    <footer className={styles.attribution}>
      <span className={styles.rule} aria-hidden="true" />
      <span className={styles.person}>{item.person}</span>
    </footer>
  </li>
)

export const TestimonialList: React.FC = () => {
  return (
    <div className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Word of mouth</p>
        <h2 id="testimonials-heading" className={styles.title}>
          What kids and parents say.
        </h2>
        <p className={styles.lede}>
          Reviews left for the book — kids first, since they’re the
          ones using it.
        </p>
      </header>

      <h3 className={styles.groupHeading}>From kids</h3>
      <ul className={styles.grid} role="list">
        {TESTIMONIAL_DATA.kids.map((t) => (
          <QuoteCard key={t.person.trim().replace(/\s+/g, '')} item={t} />
        ))}
      </ul>

      <h3 className={styles.groupHeading}>From parents and gift-buyers</h3>
      <ul className={styles.grid} role="list">
        {TESTIMONIAL_DATA.adults.map((t) => (
          <QuoteCard key={t.person.trim().replace(/\s+/g, '')} item={t} />
        ))}
      </ul>
    </div>
  )
}
