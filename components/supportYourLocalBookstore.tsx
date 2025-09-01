import Link from 'next/link'
import styles from './supportYourLocalBookstore.module.css'

export const SupportYourLocalBookstore = () => {
  return (
    <div className={`${styles.supportYourLocalBookstore}`}>
      <h2 className={styles.sectionTitle}>
        <Link href="/stockists" className={styles.logo}>
          Support your local bookshop
        </Link>
      </h2>

      <div className="copyArea">
        <p>
          <Link href="/stockists" className={styles.logo}>
            See NZ <strong>bookstores</strong> who stock Mazmatics
          </Link>
        </p>

        <p className={styles.bookstoreBuyer}>Are you a bookstore buyer?</p>
        <p>
          <Link href="/wholesalers" className={styles.logo}>
            See Wholesaler info
          </Link>
        </p>
      </div>
    </div>
  )
}
