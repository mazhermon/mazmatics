import React, { useState, useEffect } from 'react'
// import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import Link from 'next/link'

// import bookBannerImage from '../public/images/emailFunCOver.jpg'
import bookCoverImage from '../../public/images/mazmatics_bookCoverWeb1.jpg'

import styles from './get-the-book.module.css'
import { Button } from '../../components/button'

const GetFromAmazon = () => {
  const [lang, setLang] = useState<string | null>(null)
  useEffect(() => {
    if (window !== undefined) {
      setLang(window.navigator.language)
    }
    // if (/^en\b/.test(navigator.language)) {
    //   doLangSelect(window.navigator.language)
    // }
    console.log(lang)
  }, [])

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
          <div className={styles.getFromAmazonContent}>
            <h1>Get from Amazon</h1>
            <p className={styles.subtitle}>Internationally available</p>

            <h2>I live in...</h2>

            <ul className={styles.product_book1__linkGroup}>
              <li className={styles.product_book1_buyNowBlock}>
                <Button
                  variant={lang === 'en-GB' ? 'primary' : 'secondary'}
                  external={true}
                  href="https://www.amazon.com.au/dp/0473648911"
                >
                  Australia / NZ
                </Button>
                <span>Buy on Amazon Australia</span>
              </li>

              <li className={styles.product_book1_buyNowBlock}>
                <Button
                  external={true}
                  variant={lang === 'en-US' ? 'primary' : 'secondary'}
                  href="https://www.amazon.com/dp/0473648911"
                >
                  USA
                </Button>
                <span>Buy on Amazon.com</span>
              </li>

              <li className={styles.product_book1_buyNowBlock}>
                <Button
                  external={true}
                  href="https://www.amazon.co.uk/dp/0473648911"
                >
                  UK
                </Button>
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
              or if you&apos;re in Aotearoa NZ you can get books shipped
              directly from{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={styles.product_book1_buyNowLink}
                href="https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations"
              >
                our NZ store.
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default GetFromAmazon
