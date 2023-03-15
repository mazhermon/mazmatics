import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'

import autoAnimate from '@formkit/auto-animate'

import { useRouter } from 'next/router'

import { MenuIcon } from './icons/menu'
import { CrossIcon } from './icons/cross'

export const Navbar = () => {
  const router = useRouter()

  const NavListParentRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState)
  }

  useEffect(() => {
    NavListParentRef.current && autoAnimate(NavListParentRef.current)
  }, [NavListParentRef])

  useEffect(() => {
    setMenuOpen(() => false)
  }, [router.asPath])
  return (
    <nav className={`${styles.navbar} ${menuOpen && styles.navbarMenuOpen}`}>
      <div className={styles.navHeader}>
        <button className={styles.menuToggleButton} onClick={toggleMenu}>
          {menuOpen ? <CrossIcon large={true} /> : <MenuIcon />}
          <span className="sr-only">Toggle main navigation</span>
        </button>
        <Link href="/">
          <a aria-label="home" className={styles.logo}>
            Mazmatics
          </a>
        </Link>
        <span className={styles.tagline}>Fun learning for kids</span>
      </div>

      <div ref={NavListParentRef}>
        {menuOpen && (
          <ol className={styles.navList}>
            <li>
              <Link href="/">
                <a className={styles.navLink}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className={styles.navLink}>About</a>
              </Link>
            </li>
            <li>
              <Link href="/write-a-review">
                <a className={styles.navLink}>Write a review</a>
              </Link>
            </li>
            <li>
              <Link href="/feedback">
                <a className={styles.navLink}>Feedback</a>
              </Link>
            </li>
            {/* <li>
          <Link href="/contact">
            <a className={styles.navLink}>Contact</a>
          </Link>
        </li> */}
            <li>
              <Link href="/join-mailing-list">
                <a aria-label="home" className={styles.navLink}>
                  Mailing list
                </a>
              </Link>
            </li>
            <li className={styles.getTheBookCTA}>
              <Link href="/get-the-book">
                <a className={`${styles.navLink} ${styles.navLinkCTA}`}>
                  Get the book
                </a>
              </Link>
            </li>
          </ol>
        )}
      </div>
    </nav>
  )
}
