import React from 'react'
// import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import Link from 'next/link'

// import bookBannerImage from '../public/images/emailFunCOver.jpg'
import bookCoverImage from '../../public/images/mazmatics_bookCoverWeb1.jpg'

import styles from './get-the-book.module.css'

const GetFromAmazon = () => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Get from Amazon</title>
          <meta
            name="description"
            content='Get Fun Math for kids paperback activity book today, internationally available. Mazmatics helps kids say "I love math" by providing more opportunities for practising math to be a fun, relatable and enjoyable activity.'
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1>Get from Amazon</h1>
          <p>Internationally available</p>

          <h2>I live in...</h2>

          <ul className={styles.product_book1__linkGroup}>
            <li className={styles.product_book1_buyNowBlock}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.amazon.com.au/dp/0473648911"
                className={styles.product_book1_buyNowLink}
              >
                Australia / NZ
              </a>
              <span>Buy on Amazon Australia</span>
            </li>

            <li className={styles.product_book1_buyNowBlock}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.amazon.com/dp/0473648911"
                className={styles.product_book1_buyNowLink}
              >
                USA
              </a>
              <span>Buy on Amazon.com</span>
            </li>

            <li className={styles.product_book1_buyNowBlock}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.amazon.co.uk/dp/0473648911"
                className={styles.product_book1_buyNowLink}
              >
                UK
              </a>
              <span>Buy on Amazon UK</span>
            </li>
          </ul>

          {/* // TODO iamge of lindy thinking */}
          <Image
            alt="Book cover of Fun Math for Kids volume one by Mazmatics"
            src={bookCoverImage}
            layout="intrinsic"
            width="450"
            height="450"
          />

          <div className={styles.nzShopDetails}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.product_book1_buyNowLink}
              href="https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations"
            >
              Aotearoa&nbsp;
            </a>
            <span>
              or if you&apos;re in Aotearoa NZ you can get a book shipped
              directly from us.
            </span>
          </div>
        </main>
      </div>
    </>
  )
}

export default GetFromAmazon
