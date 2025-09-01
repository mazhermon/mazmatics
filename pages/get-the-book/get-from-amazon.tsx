import React, { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/legacy/image'

import { AppContext } from '../../context/appContext'
import bookProductImageClearCut from '../../public/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg'

import styles from './get-the-book.module.css'
import { Button } from '../../components/button'
import { Grain } from '../../components/patterns/Grain'
import { GridPaper } from '../../components/patterns/GridPaper'

const bookProductImageSize = {
  width: 900,
  height: 1350,
}

const GetFromAmazon = () => {
  const { userLang } = useContext(AppContext)

  return (
    <>
      <div className={styles.decorationSquareGrain}>
        <Grain />
      </div>
      <div className={styles.decorationGridPaper}>
        <GridPaper />
      </div>
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
                  variant={userLang !== 'en-US' ? 'primary' : 'secondary'}
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
                  variant={userLang === 'en-US' ? 'primary' : 'secondary'}
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

            {/* // TODO image of lindy thinking */}

            <div className={styles.bookImage}>
              <Image
                alt="Book cover for Mazmatics Fun Math for Kids Volume 1"
                src={bookProductImageClearCut}
                // layout="intrinsic"
                width={bookProductImageSize.width * 0.5}
                height={bookProductImageSize.height * 0.5}
              />
            </div>

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
