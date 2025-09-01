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
        <Link
          href="/"
          className={`${styles.navLink} ${
            router.pathname === '/' && styles.navLink__active
          }`}
        >
          Home
        </Link>
      </li>
      <li className={styles.getTheBookCTA}>
        <Link
          href="/get-the-book"
          className={`${styles.navLink} ${
            router.pathname.includes('/get-the-book') && styles.navLink__active
          } ${styles.navLinkCTA}`}
        >
          Get the book
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className={`${styles.navLink} ${
            router.pathname === '/about' && styles.navLink__active
          }`}
        >
          About
        </Link>
      </li>
      {mode === 'stacked' && (
        <>
          <li>
            <Link
              href="/write-a-review"
              className={`${styles.navLink} ${
                router.pathname === '/write-a-review' && styles.navLink__active
              }`}
            >
              Write a review
            </Link>
          </li>
          <li>
            <Link
              href="/feedback"
              className={`${styles.navLink} ${
                router.pathname === '/feedback' && styles.navLink__active
              }`}
            >
              Feedback
            </Link>
          </li>

          <li>
            <Link
              href="/join-mailing-list"
              className={`${styles.navLink} ${
                router.pathname === '/join-mailing-list' &&
                styles.navLink__active
              }`}
            >
              Mailing list
            </Link>
          </li>
        </>
      )}
    </ol>
  )
}
