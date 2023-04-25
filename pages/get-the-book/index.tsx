import React, { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Button } from '../../components/button'
// import bookCoverImage from '../../public/images/mazmatics_bookCoverWeb1.jpg'
import bookProductImageClearCut from '../../public/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg'

import styles from './get-the-book.module.css'
import { Grain } from '../../components/patterns/Grain'
import { GridPaper } from '../../components/patterns/GridPaper'
import { LookInside } from '../../components/LookInside'
import { Container } from '../../components/Container'
import { AppContext } from '../../context/appContext'
const bookProductImageSize = {
  width: 900,
  height: 1350,
}

const GetTheBook = () => {
  const { mathsWord } = useContext(AppContext)
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Get the book Fun Math 4 Kids</title>
          <meta
            name="description"
            content={`Get Fun Math for kids paperback activity book today, internationally available. Mazmatics helps kids say "I love math" by providing more opportunities for practicing ${mathsWord} to be a fun, relatable and enjoyable activity.`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.pageHeader}>Get the book</h1>
          <div className={styles.subtitle}>for the kids in your life</div>

          <div className={styles.decorationSquareGrain}>
            <Grain />
          </div>
          <div className={styles.decorationGridPaper}>
            <GridPaper />
          </div>

          <Container>
            <div className={styles.contentGrid}>
              <div className={styles.action1}>
                <span className={styles.marketDescription}>International</span>

                <Button variant="primary" href="/get-the-book/get-from-amazon">
                  Get from Amazon <span>International</span>
                </Button>
                <div
                  className={`copyArea copyArea--med ${styles.getTheBookCopy}`}
                >
                  <p className={styles.brandPromise}>
                    <span className={styles.brandName}>Mazmatics</span> &#8212;
                    supporting positive early experiences with {mathsWord}
                  </p>
                  {/* <p>
                    Fun {mathsWord} 4 Kids is an activity &amp; story book that
                    supports kids to practise their {mathsWord} and have some
                    fun along the way. Do some
                    {mathsWord}, do some drawing, read a story, solve a code...
                  </p> */}
                </div>
              </div>
              <div className={styles.action2}>
                <span className={styles.marketDescription}>
                  Aotearoa / New Zealand
                </span>
                <Button
                  external={true}
                  variant="secondary"
                  href="https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations"
                >
                  Get direct
                </Button>
              </div>
              <div className={styles.action3}>
                <Button variant="secondary" href="/stockists">
                  Find a Bookshop
                </Button>
              </div>

              <div className={styles.bookImage}>
                <Image
                  alt="Book cover for Mazmatics Fun Math for Kids Volume 1"
                  src={bookProductImageClearCut}
                  layout="intrinsic"
                  width={bookProductImageSize.width * 0.5}
                  height={bookProductImageSize.height * 0.5}
                />
              </div>
            </div>
          </Container>

          <section className={styles.lookInside}>
            <Container>
              <LookInside />
            </Container>
          </section>
        </main>
      </div>
    </>
  )
}

export default GetTheBook
