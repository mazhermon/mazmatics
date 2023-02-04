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

    <h2>Wholesale discounts</h2>

    <table className={styles.wholesaleTable}>
      <caption className="sr-only">Wholesale Prices</caption>
      <tbody>
        <tr>
          <th scope="row">RRP</th>
          <td>$24.00</td>
        </tr>
        <tr>
          <th scope="row">Purchase price</th>
          <td>$11.99 +GST</td>
        </tr>
        <tr>
          <th scope="row">Consignment price</th>
          <td>$13.50 +GST</td>
        </tr>
      </tbody>
    </table>

    <div className="moreInfo">
      <p>
        Please contact us for more information on minimum orders and consignment
        terms at{' '}
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
  </div>
)

export default Wholesalers
