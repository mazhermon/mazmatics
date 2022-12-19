import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/button'

import bookBannerImage from '../public/images/emailFunCOver.jpg'
import bookProductImage from '../public/images/mazmatics_bookCoverWeb1.jpg'

import styles from '../styles/Home.module.css'
import { Banner } from '../components/banner'
import { HomeHeader } from '../components/home/homeHeader'
import { Reviews } from '../components/reviews'
import MailingList from '../components/mailinglist'
import { CharCircleBetty } from '../components/characters/circleBetty'

const bookBannerImageSize = {
  width: 1940,
  height: 600,
}

const bookProductImageSize = {
  width: 901,
  height: 901,
}

const Home: NextPage = () => {
  const [isInputFocus, setIsInputFocus] = useState(false)
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

  // Fun animation during mailing list sign up - just for a laugh
  const handleOnInputFun = () => {
    setIsInputFocus(true)
  }
  const handleOnInputBlurFun = () => {
    setIsInputFocus(false)
  }

  const handleOnSignupFun = () => {
    setIsSubmitClicked(true)
  }

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
        <HomeHeader
          isInputFocus={isInputFocus}
          isSubmitClicked={isSubmitClicked}
        />
        <div className={styles.product_book1}>
          <h2 className={styles.product_book1__heading}>
            <Banner
              className={styles.homeBanner1}
              title="Fun Math 4 kids play-book"
              size="small"
              color="yellow"
            />
          </h2>
          <p className={styles.product_book1__subtitle}>out now!</p>
          <div className={styles.pointer}></div>

          {/* <Link href="/get-the-book">Get the book</Link> */}
          <Button variant="primary" href="/get-the-book">
            Get the book
          </Button>

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

          {/* <div className={styles.nzShopDetails}>
            <h2>Available direct in Aotearoa</h2>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.product_book1_buyNowLink}
              href="https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations"
            >
              NZ Shop
            </a>
          </div> */}

          {/* <p className={styles.orDivider}>or</p> */}

          {/* <h2>Available globally through Amazon</h2> */}

          {/* <div className={styles.product_book1__linkGroup}>
            <div className={styles.product_book1_buyNowBlock}>
              <p className={styles.product_book1_buyNowLocation}>
                Live in the <strong>USA?</strong>
              </p>
              <a
                href="https://www.amazon.com/dp/0473648911"
                className={styles.product_book1_buyNowLink}
              >
                Buy on Amazon.com
              </a>
            </div>

            <div className={styles.product_book1_buyNowBlock}>
              <p className={styles.product_book1_buyNowLocation}>
                Live in <strong>NZ or Australia?</strong>
              </p>
              <a
                href="https://www.amazon.com.au/dp/0473648911"
                className={styles.product_book1_buyNowLink}
              >
                Buy on Amazon Australia
              </a>
            </div>

            <div className={styles.product_book1_buyNowBlock}>
              <p className={styles.product_book1_buyNowLocation}>
                Live in <strong>the UK?</strong>
              </p>
              <a
                href="https://www.amazon.co.uk/dp/0473648911"
                className={styles.product_book1_buyNowLink}
              >
                Buy on Amazon UK
              </a>
            </div>
          </div>
          <p>
            or search &lsquo;Mazmatics&rsquo; on your local Amazon for your
            country
          </p> */}
        </div>

        {/* // TODO CUSTOMER TESTIMONIALS HERE <<<< */}

        <div className={styles.bannerPhoto}>
          <Image
            alt="Banner showing the book cover over a background showing internal pages"
            src={bookBannerImage}
            layout="intrinsic"
            width={bookBannerImageSize.width}
            height={bookBannerImageSize.height}
          />
        </div>

        <Reviews />

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

        <div className={styles.signup}>
          <div className={styles.charCircleBettyPositioner}>
            <CharCircleBetty
              isInputFocus={isInputFocus}
              isSubmitClicked={isSubmitClicked}
              small={true}
            />
          </div>
          <MailingList
            onMailingListInputFocused={handleOnInputFun}
            onMailingListFormSubmitted={handleOnSignupFun}
            onMailingListInputBlurred={handleOnInputBlurFun}
          />
        </div>

        <div className={styles.waves}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>

        <Banner
          className={styles.homeBanner2}
          title="Fun Math 4 kids book"
          subtitle="Volume 1 – out now"
          size="med"
          color="purple"
        />
      </main>
    </div>
  )
}

export default Home
