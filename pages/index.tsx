import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/button'

import bookProductImage from '../public/images/mazmatics_bookCoverWeb1.jpg'
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
import { FrontPageNews } from '../components/FrontPageNews'

const bookProductImageSize = {
  width: 901,
  height: 901,
}

const contentImageSize = {
  width: 1200,
  height: 1200,
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

        <FrontPageNews />

        <p className={styles.leadCopy}>
          Fun Math 4 Kids is an activity and story book that supports kids to
          practise their maths and have some fun along the way. Do some maths,
          do some drawing, read a story, solve a code...
        </p>

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

 {/* // TODO CUSTOMER TESTIMONIALS HERE <<<< */}

        <h2 className={styles.customerTestimonialsTitle}>
          Customer testimonials
        </h2>

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
          <h2 className="bigTitle">Feedback &amp; testimonials welcome</h2>
          <p>
            We&apos;d love to hear from you with feedback and ideas. Or just say
            hi 😄.
          </p>
          <p>
            If you loved the book, telling others by sending us a customer
            testimonial helps us out a lot. Or just tell your friends.
          </p>
          <a
            className={styles.hitmeLink}
            href="mailto:hello@mazmatics.com?subject=Hi Mazmatics"
          >
            hello@mazmatics.com
          </a>
        </div>

        <div className={styles.insta}>
          <h2>Follow us</h2>
          <p>Share your experience with us on Instagram</p>
          <a
            className={styles.hitmeLink}
            href="https://www.instagram.com/mazmaticsfun4kids/"
          >
            @mazmaticsfun4kids
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
