import Link from 'next/link'
import styles from './navbar.module.css'

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a aria-label="home" className={styles.logo}>
          Mazmatics
        </a>
      </Link>
      <span className={styles.tagline}>for home-play </span>
    </nav>
  )
}
