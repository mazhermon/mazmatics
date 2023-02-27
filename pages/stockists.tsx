import Link from 'next/link'
import { BookStore } from '../components/bookstore'
import styles from './stockists.module.css'

const Stockists = () => (
  <div className="container copyArea">
    <div className={styles.stockists}>
      <Link href="/">
        <a aria-label="home" className={styles.backLink}>
          &lt; Back
        </a>
      </Link>
      <h1>NZ Stockists</h1>
      <p>Mazmatics is proud to be available at the following NZ locations:</p>

      <h2>Auckland</h2>
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

      <h2>Wellington</h2>
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
      </ul>

      <h2>South Island</h2>
      <ul className={styles.stockists__list}>
        <li>
          <BookStore
            name="Timaru Booksellers"
            location="331 Stafford Street, Timaru, NZ 7910"
            phone="(03) 6831 387"
            website="bayhillbooks.co.nz"
            url="https://bayhillbooks.co.nz/"
          ></BookStore>
        </li>
        <li>
          <BookStore
            name="The Twizel Bookshop"
            location="inside the Hydro Cafe, Twizel"
            phone="(03) 6831 387"
            website="bayhillbooks.co.nz"
            url="https://bayhillbooks.co.nz/"
          ></BookStore>
        </li>
      </ul>
    </div>
  </div>
)

export default Stockists
