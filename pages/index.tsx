import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import Link from 'next/link'
// import { Button } from '../components/button'

// import bookProductImage from '../public/images/mazmatics_bookCoverWeb1.jpg'

// import bookBannerImage from '../public/images/emailFunCOver.jpg'

// import mazAPlus005 from '../public/images/Mazmatics-a-plus-005.jpg'
import mazAPlus006 from '../public/images/Mazmatics-a-plus-006.jpg'

import styles from '../styles/Home.module.css'
import { Banner } from '../components/banner'
import { HomeHeader } from '../components/home/homeHeader'
import { Reviews } from '../components/reviews'

import { FrontPageNews } from '../components/FrontPageNews'
import JoinMailingList from '../components/join-mailing-list'
//pages/join-mailing-list.tsx
///components/join-mailing-list.tsx
import { Container } from '../components/Container'
import { LookInside } from '../components/LookInside'
import { TestimonialList } from '../components/testimonials/TestimonialList'
import { GridPaper } from '../components/patterns/GridPaper'
import { SineShine } from '../components/patterns/SineShine'
import { FacebookIcon } from '../components/icons/facebook'
import { InstaIcon } from '../components/icons/insta'

// const bookProductImageSize = {
//   width: 901,
//   height: 901,
// }

const contentImageSize = {
  width: 1200,
  height: 1200,
}

const Home: NextPage = () => {
  return (
    <div className={styles.homePageWrapper}>
      <Head>
        <title>Mazmatics fun math 4 kids</title>
        <meta
          name="description"
          content='Mazmatics helps kids say "I love math" by providing more opportunities for practising math to be a fun, relatable and enjoyable activity.'
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.gridPaperHomePageLower}>
          <GridPaper />
        </div>
        <div className={styles.homeHeaderColorWrap}>
          <div className={styles.gridPaperHomePageHeader}>
            <GridPaper />
          </div>
          <HomeHeader />
        </div>
        <div className={styles.product_book1}>
          <h2 className={styles.product_book1__heading}>
            <Banner
              className={styles.homeBanner1}
              title="Fun Math 4 kids play-book"
              // size="small"
              color="yellow"
              waves={true}
            />
          </h2>
          <div className={styles.outNowWrapper}>
            <p className={styles.product_book1__subtitle}>out now!</p>
          </div>
          <div className={styles.pointer}></div>

          {/* <Link href="/get-the-book">Get the book</Link> */}
        </div>
        <FrontPageNews />
        <Container>
          <LookInside />
          <JoinMailingList />
        </Container>

        <Container className="longCopyLayoutArea">
          <TestimonialList />
        </Container>

        <div className={styles.bigStripeDeco}>
          <GridPaper />
        </div>

        <Container>
          <Reviews />
        </Container>

        {/* <div className={styles.decorationPositioner}>
          <SineShine />
        </div> */}

        <div className={styles.kidsDrawing}>
          <Image
            alt="illustration of kids from Mazmatics Fun Math for kids book"
            src={mazAPlus006}
            layout="intrinsic"
            width={contentImageSize.width / 3}
            height={contentImageSize.height / 3}
          />
        </div>
        <Container>
          <div className={styles.feedback}>
            <h2 className="bigTitle">Feedback &amp; testimonials welcome</h2>
            <p>
              We&apos;d love to hear from you with feedback and ideas. Or just
              say hi 😄.
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
            <p>Share your experience with us on Instagram or Facebook</p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.hitmeLink}
              href="https://www.instagram.com/mazmaticsfun4kids/"
            >
              <InstaIcon />
              @mazmaticsfun4kids
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.hitmeLink}
              href="https://www.facebook.com/mazmaticsfunforkids"
            >
              <FacebookIcon />
              Mazmatics
            </a>
            <p>And sign up for very occasional emails below</p>
          </div>
        </Container>
      </main>
    </div>
  )
}

export default Home
