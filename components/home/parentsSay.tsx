import React from 'react'
import Link from 'next/link'

import styles from './parentsSay.module.css'

interface Quote {
  quote: string
  person: string
  role: string
}

const QUOTES: Quote[] = [
  {
    quote:
      "It's written the way people speak so it's super easy to relate to. Real-world examples that are relevant and entertaining. This makes math fun!",
    person: 'Rachel T',
    role: 'Parent',
  },
  {
    quote:
      'I got my nieces and nephews all a Mazmatics book for Christmas and they all loved it. A brilliant resource for kids — it makes math fun, the best way for little brains to learn.',
    person: 'Dee J',
    role: 'Aunt &amp; gift-buyer',
  },
  {
    quote:
      'Starts out with kids jokes to gently and hilariously introduce simple math. The illustrated story contextualises math in a way kids can relate to.',
    person: 'Caro R',
    role: 'Parent',
  },
]

export const ParentsSay: React.FC = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="parents-say-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Word of mouth</p>
          <h2 id="parents-say-heading" className={styles.title}>
            Parents say it works.
          </h2>
        </header>

        <ul className={styles.grid} role="list">
          {QUOTES.map((q, i) => (
            <li key={i} className={styles.card}>
              <span
                className={styles.mark}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote
                className={styles.quote}
                dangerouslySetInnerHTML={{ __html: q.quote }}
              />
              <footer className={styles.attribution}>
                <span className={styles.rule} aria-hidden="true" />
                <span className={styles.person}>{q.person}</span>
                <span
                  className={styles.role}
                  dangerouslySetInnerHTML={{ __html: q.role }}
                />
              </footer>
            </li>
          ))}
        </ul>

        <p className={styles.more}>
          <Link href="/about#testimonials" className={styles.moreLink}>
            Read more from kids and adults
            <span aria-hidden="true">&nbsp;&rarr;</span>
          </Link>
        </p>
      </div>
    </section>
  )
}
