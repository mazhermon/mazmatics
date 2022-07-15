import Link from 'next/link'
import styles from './navbar.module.css'

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a className={styles.logo}>Mazmatics</a>
      </Link>
      <span className={styles.tagline}>for home-play </span>
    </div>
  )
}
