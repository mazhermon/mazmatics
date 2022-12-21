import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Button } from '../../components/button'
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
          <h1 className={styles.pageHeader}>Get the book</h1>
          <div className={styles.subtitle}>for the kids in your life</div>

          <div className={styles.contentGrid}>
            <div className={styles.contentButtonGroup}>
              <Button
                external={true}
                variant="secondary"
                href="https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations"
              >
                Get direct NZ
              </Button>
              <Button variant="primary" href="/get-the-book/get-from-amazon">
                Get from Amazon <span>International</span>
              </Button>
            </div>

            <div className={styles.bookImage}>
              <Image
                alt="Book cover of Fun Math for Kids volume one by Mazmatics"
                src={bookCoverImage}
                layout="intrinsic"
                width="900"
                height="900"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default GetTheBook
