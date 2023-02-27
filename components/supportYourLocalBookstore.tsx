import Link from 'next/link'
import styles from './supportYourLocalBookstore.module.css'

export const SupportYourLocalBookstore = () => {
  return (
    <div className={`${styles.supportYourLocalBookstore}`}>
      <h2 className={styles.sectionTitle}>
        <Link href="/stockists">
          <a aria-label="home" className={styles.logo}>
            Support your local bookshop
          </a>
        </Link>
      </h2>

      <div className="copyArea">
        <p>
          <Link href="/stockists">
            <a aria-label="home" className={styles.logo}>
              See NZ <strong>bookstores</strong> who stock Mazmatics
            </a>
          </Link>
        </p>

        <p className={styles.bookstoreBuyer}>Are you a bookstore buyer?</p>
        <p>
          <Link href="/wholesalers">
            <a aria-label="home" className={styles.logo}>
              See Wholesaler info
            </a>
          </Link>
        </p>
      </div>
    </div>
  )
}
