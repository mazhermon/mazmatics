import Head from 'next/head'
import Link from 'next/link'
import styles from './write-a-review.module.css'
import { Reviews } from '../../components/reviews'

const WriteAReview = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Write a review</title>
        <meta
          name="description"
          content="Write a review for Fun Math for Kids vol. one to help us out and help other people find the book."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1>Write a review</h1>
        <p>
          If you love Fun Math 4 Kids, then writing a review and telling your
          friends is the best thing you can do to help more kids find it. We
          really appreciate it.
        </p>

        <Reviews />

        {/* <ul>
            <li>
              <Link href="/write-a-review/review-on-amazon">
                <a>Review on Amazon</a>
              </Link>
            </li>
            <li>
              <Link href="/write-a-review/review-on-google">
                <a>Review on Google</a>
              </Link>
            </li>
          </ul> */}

        <p>
          If you have ideas for how we can get better we&apos;d love to hear
          that too. Check out the
          <Link href="/feedback">
            <a>feedback page</a>
          </Link>
          for more info.
        </p>
      </div>
    </div>
  )
}

export default WriteAReview
