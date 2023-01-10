import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import bookBannerImage from '../public/images/emailFunCOver.jpg'
import mazAPlus001 from '../public/images/Mazmatics-a-plus-001.jpg'
import mazAPlus002 from '../public/images/Mazmatics-a-plus-002.jpg'
import mazAPlus003 from '../public/images/Mazmatics-a-plus-003.jpg'
import mazAPlus004 from '../public/images/Mazmatics-a-plus-004.jpg'
// import mazAPlus005 from '../public/images/Mazmatics-a-plus-005.jpg'
import mazAPlus006 from '../public/images/Mazmatics-a-plus-006.jpg'

import styles from '../styles/Home.module.css'
import { Banner } from '../components/banner'
import { HomeHeader } from '../components/home/homeHeader'
import { Reviews } from '../components/reviews'
import MailingList from '../components/mailinglist'
import { CharCircleBetty } from '../components/characters/circleBetty'
import {
  TESTIMONIAL_DATA,
  ITestimonial,
} from '../components/testimonials/testimonailsData'
import { Testimonial } from '../components/testimonials/testimonial'

const bookBannerImageSize = {
  width: 1940,
  height: 600,
}

const contentImageSize = {
  width: 1200,
  height: 1200,
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

          <div className={styles.nzShopDetails}>
            <h2>Available direct for NZ only</h2>

            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.product_book1_buyNowLink}
              href="https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations"
            >
              NZ Shop
            </a>
          </div>

          <p className={styles.orDivider}>or</p>

          <h2>Available globally through Amazon</h2>

          <div className={styles.product_book1__linkGroup}>
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
          </p>
        </div>

        <div className={styles.bannerPhoto}>
          <Image
            alt="Banner showing the book cover over a background showing internal pages"
            src={bookBannerImage}
            layout="intrinsic"
            width={bookBannerImageSize.width}
            height={bookBannerImageSize.height}
          />
        </div>

        <h2>Customer testimonials</h2>

        <h3>
          Feedback from <strong>kids</strong>
        </h3>
        {TESTIMONIAL_DATA.kids.map((testimonial: ITestimonial) => {
          const { person, quote } = testimonial
          return (
            <Testimonial
              key={person.trim().replace(' ', '')}
              person={person}
              quote={quote}
            />
          )
        })}
        <h3>
          Feedback from <strong>adults</strong>
        </h3>
        {TESTIMONIAL_DATA.adults.map((testimonial: ITestimonial) => {
          const { person, quote } = testimonial
          return (
            <Testimonial
              key={person.trim().replace(' ', '')}
              person={person}
              quote={quote}
            />
          )
        })}

        <Reviews />

        <Image
          alt="illustration of kids from Mazmatics Fun Math for kids book"
          src={mazAPlus006}
          layout="intrinsic"
          width={contentImageSize.width / 3}
          height={contentImageSize.height / 3}
        />

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

        <h2>Look inside</h2>
        <div className={styles.imageGal}>
          <Image
            alt="Parent pointing to the map in the fantasy story Lindys Quest"
            src={mazAPlus001}
            layout="intrinsic"
            width={contentImageSize.width}
            height={contentImageSize.height}
          />
          <Image
            alt="Parent shows kid teh secret code cracker page"
            src={mazAPlus002}
            layout="intrinsic"
            width={contentImageSize.width}
            height={contentImageSize.height}
          />
          <Image
            alt="kid writing in the book for a cookies math question"
            src={mazAPlus003}
            layout="intrinsic"
            width={contentImageSize.width}
            height={contentImageSize.height}
          />
          <Image
            alt="a page of practice exercises and drawings"
            src={mazAPlus004}
            layout="intrinsic"
            width={contentImageSize.width}
            height={contentImageSize.height}
          />
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
