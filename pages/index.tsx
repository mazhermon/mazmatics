import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/button'

import bookProductImage from '../public/images/mazmatics_bookCoverWeb1.jpg'

import styles from '../styles/Home.module.css'
import { Banner } from '../components/banner'
import { HomeHeader } from '../components/home/homeHeader'

const bookProductImageSize = {
  width: 901,
  height: 901,
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mazmatics fun math 4 kids</title>
        <meta
          name="description"
          content='Mazmatics helps kids say "I love math" by providing more opportunities for practising math to be a fun, relatable and enjoyable activity.'
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HomeHeader />
        <div className={styles.product_book1}>
          <h2 className={styles.product_book1__heading}>
            <Banner
              className={styles.homeBanner1}
              title="Fun Math 4 kids play-book"
              size="small"
              color="yellow"
              waves={true}
            />
          </h2>
          <p className={styles.product_book1__subtitle}>out now!</p>
          <div className={styles.pointer}></div>

          {/* <Link href="/get-the-book">Get the book</Link> */}
          <div className={styles.homeCTAbutton}>
            <Button variant="primary" href="/get-the-book">
              Get the book
            </Button>
          </div>

          <div>
            <Link href="/get-the-book">
              <a
                className={`${styles.navLink} ${styles.navLinkCTA}`}
                aria-label="get the book"
              >
                {/* TODO: animate some hands coming in to grab the Book
                crayon style transparent PNGs */}
                <Image
                  alt="Book cover for Mazmatics Fun Math for Kids Volume 1"
                  src={bookProductImage}
                  layout="intrinsic"
                  width={bookProductImageSize.width}
                  height={bookProductImageSize.height}
                />
              </a>
            </Link>
          </div>
        </div>

        {/* // TODO CUSTOMER TESTIMONIALS HERE <<<< */}

        <div className={styles.feedback}>
          <h2>Feedback welcome</h2>
          <p>
            We&apos;d love to hear from you with feedback and ideas. Or just say
            hi 😄
          </p>
          <a
            className={styles.hitmeLink}
            href="mailto:hello@mazmatics.com?subject=Hi Mazmatics"
          >
            hello@mazmatics.com
          </a>
        </div>
      </main>
    </div>
  )
}

export default Home
