import dynamic from 'next/dynamic'
import Link from 'next/link'
import styles from './wholesalers.module.css'
import { Container } from '../components/Container'
import Head from 'next/head'

const DynamicSunSprite = dynamic(
  () => import('../components/characters/sunSprite'),
  {
    ssr: false,
  }
)

const Wholesalers = () => (
  <Container>
    <Head>
      <title>Mazmatics wholesale info</title>
      <meta
        name="description"
        content="Mazmatics is proud to be available for bookstores either by direct wholesale or via Ingram Spark"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <DynamicSunSprite />
    <div className={`${styles.wholesalers} copyArea`}>
      <h1>
        <span className="hyphenated">Wholesalers</span> info
      </h1>
      <p>
        Mazmatics Fun Math for Kids is available for your book store. We support
        small businesses by offering initial consignment terms with wholesale
        discounts, as well as bulk ordering options for wholesale purchase.
      </p>
      <p>
        Schools are also welcome to email to make arrangements for bulk purchase
        options for fundraising initiatives.
      </p>

      {/* <h2>Wholesale discounts</h2> */}

      {/* <table className={styles.wholesaleTable}>
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
      </table> */}

      <div className="moreInfo">
        <p>
          Please contact us for more information on wholesale prices, minimum
          orders and consignment terms at{' '}
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
  </Container>
)

export default Wholesalers
