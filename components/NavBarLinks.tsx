import React from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { useRouter } from 'next/router'

type Props = {
  mode: 'horizontal' | 'stacked'
}

export const NavBarLinks: React.FC<Props> = ({ mode }) => {
  const router = useRouter()

  return (
    <ol
      className={`${styles.navList} ${
        mode === 'horizontal' && styles.navList__horizontal
      } ${mode === 'stacked' && styles.navList__stacked}`}
    >
      <li>
        <Link href="/">
          <a
            className={`${styles.navLink} ${
              router.pathname === '/' && styles.navLink__active
            }`}
          >
            Home
          </a>
        </Link>
      </li>
      <li className={styles.getTheBookCTA}>
        <Link href="/get-the-book">
          <a
            className={`${styles.navLink} ${
              router.pathname.includes('/get-the-book') &&
              styles.navLink__active
            } ${styles.navLinkCTA}`}
          >
            Get the book
          </a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a
            className={`${styles.navLink} ${
              router.pathname === '/about' && styles.navLink__active
            }`}
          >
            About
          </a>
        </Link>
      </li>
      {mode === 'stacked' && (
        <>
          <li>
            <Link href="/write-a-review">
              <a
                className={`${styles.navLink} ${
                  router.pathname === '/write-a-review' &&
                  styles.navLink__active
                }`}
              >
                Write a review
              </a>
            </Link>
          </li>
          <li>
            <Link href="/feedback">
              <a
                className={`${styles.navLink} ${
                  router.pathname === '/feedback' && styles.navLink__active
                }`}
              >
                Feedback
              </a>
            </Link>
          </li>
          {/* <li>
              <Link href="/contact">
                <a className={styles.navLink}>Contact</a>
              </Link>
            </li> */}
          <li>
            <Link href="/join-mailing-list">
              <a
                className={`${styles.navLink} ${
                  router.pathname === '/join-mailing-list' &&
                  styles.navLink__active
                }`}
              >
                Mailing list
              </a>
            </Link>
          </li>
        </>
      )}
    </ol>
  )
}
