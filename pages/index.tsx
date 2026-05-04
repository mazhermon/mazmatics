import React, { useContext } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/legacy/image'

import mazAPlus006 from '../public/images/Mazmatics-a-plus-006.jpg'
import styles from '../styles/Home.module.css'
import { HomeHeader } from '../components/home/homeHeader'
import { CoreValues } from '../components/CoreValues'
import { StoryBento } from '../components/StoryBento'

import { FrontPageNews } from '../components/FrontPageNews'
import JoinMailingList from '../components/join-mailing-list'

import { Container } from '../components/Container'
import { LookInside } from '../components/LookInside'
import { FeaturedTestimonials } from '../components/testimonials/FeaturedTestimonials'
import { GridPaper } from '../components/patterns/GridPaper'
import { FacebookIcon } from '../components/icons/facebook'
import { InstaIcon } from '../components/icons/insta'
import { AppContext } from '../context/appContext'

const contentImageSize = {
  width: 1200,
  height: 1200,
}

const Home: NextPage = () => {
  const { mathsWord } = useContext(AppContext)

  return (
    <div className={styles.homePageWrapper}>
      <Head>
        <title>{`Mazmatics. Fun ${mathsWord} book for kids 7-10`}</title>
        <meta
          name="description"
          content={`Mazmatics helps kids say "I like math" with activities, stories, codes and drawing prompts that make ${mathsWord} feel fun, relatable and enjoyable.`}
        />
        <link rel="canonical" href="https://www.mazmatics.com/" />
        <meta property="og:type" content="book" />
        <meta property="og:site_name" content="Mazmatics" />
        <meta
          property="og:title"
          content={`Mazmatics. Fun ${mathsWord} book for kids 7-10`}
        />
        <meta
          property="og:description"
          content={`An activity and story book that turns ${mathsWord} frustration into fascination, for kids 7-10 who'd rather draw, decode and play their way to "I like ${mathsWord}".`}
        />
        <meta property="og:url" content="https://www.mazmatics.com/" />
        <meta
          property="og:image"
          content="https://www.mazmatics.com/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg"
        />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="1350" />
        <meta property="og:image:alt" content="Mazmatics Fun Math 4 Kids Vol. 1 book cover" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Mazmatics. Fun ${mathsWord} book for kids 7-10`}
        />
        <meta
          name="twitter:description"
          content={`An activity and story book that turns ${mathsWord} frustration into fascination, for kids 7-10.`}
        />
        <meta
          name="twitter:image"
          content="https://www.mazmatics.com/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Book',
              name: 'Mazmatics: Fun Math 4 Kids Vol. 1',
              author: { '@type': 'Person', name: 'Maz Hermon' },
              inLanguage: 'en',
              bookFormat: 'https://schema.org/Paperback',
              image:
                'https://www.mazmatics.com/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg',
              description: `Activity and story book that helps kids 7-10 build a positive relationship with ${mathsWord}.`,
              publisher: { '@type': 'Organization', name: 'Mazmatics' },
            }),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HomeHeader />

        <FeaturedTestimonials />

        <div className={styles.gridPaperHomePageLower}>
          <GridPaper />
        </div>

        <FrontPageNews />

        <StoryBento />

        <CoreValues />

        <section className={styles.bookCta} aria-labelledby="home-cta-heading">
          <div className={styles.bookCtaInner}>
            <p className={styles.bookCtaEyebrow}>Volume 1 · Out now</p>
            <h2 id="home-cta-heading" className={styles.bookCtaHeading}>
              The book is right here.
            </h2>
            <p className={styles.bookCtaBody}>
              Paperback, 145 pages, kids 7&ndash;10 (US grade 2&ndash;4).
              Available on Amazon AU, US, and UK.
            </p>
            <div className={styles.bookCtaActions}>
              <Link href="/get-the-book" className={styles.bookCtaPrimary}>
                See where to buy
              </Link>
            </div>
          </div>
        </section>
        <Container>
          <LookInside />
          <JoinMailingList />
        </Container>

        <div className={styles.bigStripeDeco}>
          <GridPaper />
        </div>

        <div className={styles.kidsDrawing}>
          <Image
            alt="illustration of kids from Mazmatics Fun Math for kids book"
            src={mazAPlus006}
            // layout="intrinsic"
            width={contentImageSize.width / 3}
            height={contentImageSize.height / 3}
          />
        </div>

        <div className={styles.drawingGridDeco}>
          <GridPaper />
        </div>
        <Container>
          <div className={styles.feedback}>
            <h2 className="bigTitle">Feedback &amp; testimonials welcome</h2>
            <p>
              We&apos;d love to hear from you with feedback and ideas. Or just
              say hi 😄.
            </p>
            <p>
              Loved the book? The single biggest thing you can do to help us is{' '}
              <Link href="/write-a-review" className={styles.inlineReviewLink}>
                write a quick review
              </Link>
              .
            </p>
            <a
              className={styles.hitmeLink}
              href="mailto:hellomazmatics@gmail.com?subject=Hi Mazmatics"
            >
              hellomazmatics@gmail.com
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
