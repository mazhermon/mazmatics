import Link from 'next/link'
import Head from 'next/head'
import styles from './review-on-amazon.module.css'

const ReviewOnAmazon = () => {
  return (
    <>
      {/* TODO HEAD SEO */}
      <div className={styles.container}>
        <Head>
          <title>Write a review on Amazon</title>
          <meta
            name="description"
            content="Review Fun Math for Kids on Amazon in your area"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1>Write a review on Amazon</h1>
          <p>
            If you love <strong>Fun Math 4 Kids vol. 1</strong>, then writing a
            review and telling your friends is the best thing you can do to help
            more parents and caregivers find it for the kids in their lives. We
            really appreciate you taking the time, thank you :).
          </p>

          <ul className={styles.product_book1__linkGroup}>
            <li className={styles.product_book1_reviewItem}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.amazon.com.au/dp/0473648911"
                className={styles.product_book1_reviewNowLink}
              >
                Australia / NZ
              </a>
              <span>Buy on Amazon Australia</span>
            </li>

            <li className={styles.product_book1_reviewItem}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.amazon.com/dp/0473648911"
                className={styles.product_book1_reviewNowLink}
              >
                USA
              </a>
              <span>Buy on Amazon.com</span>
            </li>

            <li className={styles.product_book1_reviewItem}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.amazon.co.uk/dp/0473648911"
                className={styles.product_book1_reviewNowLink}
              >
                UK
              </a>
              <span>Buy on Amazon UK</span>
            </li>
          </ul>

          <p>
            If you have ideas for how we can get better we&apos;d love to hear
            that too. Check out the
            <Link href="/feedback">
              <a>feedback page</a>
            </Link>
            for more info.
          </p>
        </main>
      </div>
    </>
  )
}

export default ReviewOnAmazon
