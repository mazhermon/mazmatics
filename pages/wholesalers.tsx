import Link from 'next/link'
import styles from './wholesalers.module.css'

const Wholesalers = () => (
  <div className={`${styles.wholesalers} copyArea`}>
    <h1>Wholesalers info</h1>
    <p>
      Mazmatics Fun Math for Kids is available for your book store. We support
      small businesses by offering initial consignment terms with wholesale
      discounts, as well as bulk ordering options for wholesale purchase.
    </p>
    <p>
      Please contact us for more information on{' '}
      <a
        className={styles.contactEmailLink}
        href="mailto:hello@mazmatics.com?subject=Hi Mazmatics, Wholesaler enquiry"
      >
        hello@mazmatics.com
      </a>{' '}
    </p>
    <p>
      <Link href="/">
        <a aria-label="home" className={styles.backLink}>
          &lt; Back
        </a>
      </Link>
    </p>
  </div>
)

export default Wholesalers
