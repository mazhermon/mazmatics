import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import styles from './navbar.module.css'

import autoAnimate from '@formkit/auto-animate'

import { useRouter } from 'next/router'

import mazmaticsLogo from '../public/images/Mazmatics-logo.png'
import { MenuIcon } from './icons/menu'
import { CrossIcon } from './icons/cross'
import { NavBarLinks } from './NavBarLinks'
import { NavBarBuyCTA } from './NavBarBuyCTA'

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
        <Link href="/" aria-label="Mazmatics — home" className={styles.logo}>
          <Image
            src={mazmaticsLogo}
            alt="Mazmatics"
            width={1001 / 7}
            height={230 / 7}
            priority
          />
        </Link>

        <div className={styles.largeScreenNav}>
          <NavBarLinks mode="horizontal" />
        </div>

        <div className={styles.buyCTAWrap}>
          <NavBarBuyCTA />
        </div>
      </div>

      <div className={styles.navListParent} ref={NavListParentRef}>
        {menuOpen && <NavBarLinks mode="stacked" />}
      </div>
    </nav>
  )
}
