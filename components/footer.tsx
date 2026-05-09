import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'

import styles from './footer.module.css'
import { AppContext } from '../context/appContext'
import { ALL_STOREFRONTS } from '../lib/locale'
import { FacebookIcon } from './icons/facebook'
import { InstaIcon } from './icons/insta'
import { MailingSignup } from './mailingSignup'
import mazmaticsLogo from '../public/images/Mazmatics-logo.png'

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
      <div className={styles.signupStrip}>
        <div className={styles.signupStripInner}>
          <MailingSignup
            variant="inline"
            location="footer"
            heading="Be first when Vol. 2 ships."
            lede="Occasional notes from Maz, no spam."
            cta="Join"
          />
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <Link href="/" aria-label="Mazmatics — home" className={styles.brandLogo}>
            <Image
              src={mazmaticsLogo}
              alt="Mazmatics"
              width={1001 / 6}
              height={230 / 6}
            />
          </Link>
          <p className={styles.brandLine}>
            © {year} Mazmatics. Sparking joy in {mathsWord} discovery.
          </p>
        </div>

        <nav aria-label="Buy the book" className={styles.col}>
          <p className={styles.colTitle}>Get the book</p>
          <ul className={styles.linkList}>
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
          </ul>
        </nav>

        <nav aria-label="Connect" className={styles.col}>
          <p className={styles.colTitle}>Say hi</p>
          <ul className={styles.linkList}>
            <li>
              <a
                className={styles.link}
                href="mailto:hellomazmatics@gmail.com?subject=Hi Mazmatics"
              >
                hellomazmatics@gmail.com
              </a>
            </li>
            <li>
              <Link href="/write-a-review" className={styles.link}>
                Write a review or send feedback
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Social" className={styles.col}>
          <p className={styles.colTitle}>Follow</p>
          <ul className={styles.socialList}>
            <li>
              <a
                className={styles.socialLink}
                href="https://www.instagram.com/mazmaticsfun4kids/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mazmatics on Instagram"
              >
                <span className={styles.socialIcon} aria-hidden="true">
                  <InstaIcon />
                </span>
                <span>@mazmaticsfun4kids</span>
              </a>
            </li>
            <li>
              <a
                className={styles.socialLink}
                href="https://www.facebook.com/mazmaticsfunforkids"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mazmatics on Facebook"
              >
                <span className={styles.socialIcon} aria-hidden="true">
                  <FacebookIcon />
                </span>
                <span>Mazmatics</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
