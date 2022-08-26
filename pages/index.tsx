import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import bookBannerImage from '../public/images/emailFunCOver.jpg'

import styles from '../styles/Home.module.css'
import { Banner } from '../components/banner'
import { HomeHeader } from '../components/home/homeHeader'

const bookBannerImageSize = {
  width: 1940,
  height: 600,
}

const Home: NextPage = () => {
  const [isInputFocus, setIsInputFocus] = useState(false)
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

  const handleOnInputFun = () => {
    setIsInputFocus(true)
  }
  const handleOnSignupFun = () => {
    setIsSubmitClicked(true)
  }

  // eslint-disable-next-line
  const onPageClick = (e: any) => {
    if (!e.target.type) return

    if (e.target.type === 'email') {
      handleOnInputFun()
    }
    if (e.target.type === 'submit') {
      handleOnSignupFun()
    }
  }
  return (
    <div onClick={onPageClick} className={styles.container}>
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
          <div className={styles.product_book1_buyNowBlock}>
            <p className={styles.product_book1_buyNowLocation}>
              Live in <strong>NZ or Australia?</strong>
            </p>
            <a
              href="https://www.amazon.com.au/dp/0473648911"
              className={styles.product_book1_buyNowLink}
            >
              Buy now NZ &amp; AU
            </a>
          </div>

          <div className={styles.product_book1_buyNowBlock}>
            <p className={styles.product_book1_buyNowLocation}>
              Live in the <strong>USA?</strong>
            </p>
            <a
              href="https://www.amazon.com/dp/0473648911"
              className={styles.product_book1_buyNowLinkUSA}
            >
              Buy now USA
            </a>
          </div>
        </div>

        <div className={styles.bannerPhoto}>
          <Image
            alt="Giant Girl adventurer sitting down smiling"
            src={bookBannerImage}
            layout="intrinsic"
            width={bookBannerImageSize.width}
            height={bookBannerImageSize.height}
          />
        </div>

        <div className={styles.signup}>
          <div className={styles.signupLoading}>Loading sign up form...</div>
          <div className="ml-embedded" data-form="ltd6tR"></div>
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
