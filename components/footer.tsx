import React, { useContext } from 'react'
import Link from 'next/link'

import styles from './footer.module.css'
import { AppContext } from '../context/appContext'
import { ALL_STOREFRONTS } from '../lib/locale'

const COMPACT_REGION_LABEL: Record<string, string> = {
  AU: 'Amazon AU',
  US: 'Amazon US',
  UK: 'Amazon UK',
}

export const Footer = () => {
  const { mathsWord = 'maths' } = useContext(AppContext)
  const year = new Date().getFullYear()

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <span className={styles.brand}>Mazmatics</span>
          <p className={styles.brandLine}>
            © {year} Mazmatics. Sparking joy in {mathsWord} discovery.
          </p>
        </div>

        <ul className={styles.linkRow}>
          {ALL_STOREFRONTS.map((s) => (
            <li key={s.region}>
              <a
                className={styles.link}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                {COMPACT_REGION_LABEL[s.region] ?? s.label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/feedback" className={styles.link}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
