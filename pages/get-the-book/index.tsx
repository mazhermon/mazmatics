import React from 'react'
// import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// import bookBannerImage from '../public/images/emailFunCOver.jpg'
import bookCoverImage from '../../public/images/mazmatics_bookCoverWeb1.jpg'

import styles from './get-the-book.module.css'

const GetTheBook = () => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Get the book Fun Math 4 Kids</title>
          <meta
            name="description"
            content='Get Fun Math for kids paperback activity book today, internationally available. Mazmatics helps kids say "I love math" by providing more opportunities for practising math to be a fun, relatable and enjoyable activity.'
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1>Get the book</h1>
          <Image
            alt="Book cover of Fun Math for Kids volume one by Mazmatics"
            src={bookCoverImage}
            layout="intrinsic"
            width="450"
            height="450"
          />

          <Link href="/get-the-book/get-from-amazon">
            <a aria-label="home" className={styles.logo}>
              Get from Amazon <span>International</span>
            </a>
          </Link>

          <div className={styles.nzShopDetails}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.product_book1_buyNowLink}
              href="https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations"
            >
              Get direct NZ
              <span>NZ only</span>
            </a>
          </div>
        </main>
      </div>
    </>
  )
}

export default GetTheBook
