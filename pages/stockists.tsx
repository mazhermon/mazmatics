import Link from 'next/link'
import { BookStore } from '../components/bookstore'
import styles from './stockists.module.css'
import Head from 'next/head'

const Stockists = () => (
  <div className="container copyArea">
    <Head>
      <title>Bookstores and stockists</title>
      <meta
        name="description"
        content="Mazmatics is proud to be available at the following NZ bookstores and also available internationally through Amazon and Ingram Spark"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.stockists}>
      <Link href="/">
        <a aria-label="home" className={styles.backLink}>
          &lt; Back
        </a>
      </Link>
      <h1>NZ Stockists</h1>

      <p className={styles.outsideOfNzInfo}>
        If you&apos;re outside of NZ you can ask at your local bookshop before
        checking on Amazon for your area of the world. International Bookshops
        can now order Fun Math 4 Kids via Ingram Spark.
      </p>
      <p className={styles.nzLocations}>
        Mazmatics is proud to be available at the following NZ locations:
      </p>

      <p>
        Jump to:
        <ul className={styles.jumpToList}>
          <li>
            <a href="#aucklandAnchor">Auckland</a>
          </li>
          <li>
            <a href="#wellingtonAnchor">Wellington</a>
          </li>
          <li>
            <a href="#southIslandAnchor">South Island</a>
          </li>
          <li>
            <a href="#bookstoreBuyerAnchor">Bookstore Buyers</a>
          </li>
        </ul>
      </p>

      <div>
        <h2 id="aucklandAnchor">Auckland</h2>
        <ul className={styles.stockists__list}>
          <li>
            <BookStore
              name="The Dorothy Butler Children's Bookshop"
              location="1 Jervois Road, Ponsonby, Auckland 1011"
              phone="09 376 7283"
              website="dorothybutler.co.nz"
              url="https://dorothybutler.co.nz/p/fun-math-4-for-kids-good-foundations-volume-1?barcode=9780473648916"
            ></BookStore>
          </li>
        </ul>

        <h2 id="wellingtonAnchor">Wellington</h2>
        <ul className={styles.stockists__list}>
          <li>
            <BookStore
              name="Schrödinger's Books"
              location="137 Jackson Street, Petone, Lower Hutt 5012"
              phone="04 260 3777"
              website="schrodingersbooks.co.nz"
              url="https://schrodingersbooks.co.nz/p/fun-math-for-kids-good-foundations?barcode=9780473648916&selected_category=82407"
            ></BookStore>
          </li>
          <li>
            <BookStore
              name="The Children's Bookshop"
              location="Shop 26, Kilbirnie Plaza, Kilbirnie, Wellington 6022"
              phone="+64 4 387 3905"
              website="thechildrensbookshop.co.nz"
              url="https://www.thechildrensbookshop.co.nz/p/fun-math-for-kids-volume-1-good-foundations?barcode=9780473648916"
            ></BookStore>
          </li>
          <li>
            <BookStore
              name="Unity Books"
              location="57 Willis Street, Wellington Central, Wellington 6011"
              phone="04 499 4245"
              website="unitybooksonline.co.nz"
              url="http://unitybooksonline.co.nz/"
            ></BookStore>
          </li>
        </ul>

        <h2 id="southIslandAnchor">South Island</h2>
        <ul className={styles.stockists__list}>
          {/* <li>
            <BookStore
              name="Scorpio Books & Telling Tales"
              location="BNZ Centre - 120 Hereford Street Christchurch 8011"
              phone="03 3778 462"
              website="scorpiobooks.co.nz"
              url="https://scorpiobooks.co.nz/product/fun-math-4-kids-with-mazmatics-vol-1/"
            ></BookStore>
          </li> */}
          <li>
            <BookStore
              name="Timaru Booksellers"
              location="331 Stafford Street, Timaru, NZ 7910"
              phone="03 6831 387"
              website="bayhillbooks.co.nz"
              url="https://bayhillbooks.co.nz/"
            ></BookStore>
          </li>
          <li>
            <BookStore
              name="The Twizel Bookshop"
              location="inside the Hydro Cafe, Twizel"
              phone="03 6831 387"
              website="bayhillbooks.co.nz"
              url="https://bayhillbooks.co.nz/"
            ></BookStore>
          </li>
        </ul>
      </div>
      <h2 id="bookstoreBuyerAnchor">Are you a bookstore buyer?</h2>
      <p className={styles.wholeSaleInfoLink}>
        If you want to stock Mazmatics in your bookshop, check out our{' '}
        <Link href="/wholesalers">Wholesale info</Link>
      </p>
    </div>
  </div>
)

export default Stockists
