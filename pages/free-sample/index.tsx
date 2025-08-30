import { useContext } from 'react'
import Head from 'next/head'

import { Container } from '../../components/Container'

import styles from './free-sample.module.css'
import { AppContext } from '../../context/appContext'
import { FreeSampleDownload } from '../../components/freeSample'
import { Banner } from '../../components/banner'
import { GetTheBookLinks } from '../../components/getTheBookLinks'

const FreeSample = () => {
  const { mathsWord } = useContext(AppContext)

  const bannerHelpText = `Will you help your kids with ${mathsWord} today?`
  return (
    <div className={styles.freeSamplePage}>
      <Head>
        <title>Free Sample of Mazmatics</title>
        <meta
          name="description"
          content={`Hello there! Are you looking to make math more exciting for your
        little ones? Wondering how you can lend a helping hand?
        Introducing our "Fun Math for Kids" book, a delightful journey
        into the world of numbers that offers your children positive
        early experiences with math, setting the stage for a lifelong
        love of learning. Curious to explore the magic within? Well,
        we've got a treat for you! Download a free digital sample of our
        paperback edition`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="longCopyLayoutArea"></div>
      <div className={`longCopyLayoutArea ${styles.aboutTextWrapper}`}>
        {/* // TODO make a coloured section area thing? */}
        <section className={`${styles.section1} ${styles.shortStorySection}`}>
          <Container>
            <h1 className={styles.centerMe}>Free sample</h1>
            <FreeSampleDownload />
          </Container>
          <Banner
            className={styles.homeBanner1}
            title={bannerHelpText}
            // size="small"
            color="yellow"
            waves={true}
          ></Banner>
          <Container>
            {/* <p>Have you helped your kids with {mathsWord} today?</p> */}

            <p>
              Hello there! Are you looking to make math more exciting for your
              little ones? Wondering how you can lend a helping hand?
              Introducing our &ldquo;Fun Math for Kids&rdquo; book, a delightful
              journey into the world of numbers that offers your children
              positive early experiences with math, setting the stage for a
              lifelong love of learning.
            </p>
            <p>
              Curious to explore the magic within? Well, we&apos;ve got a treat
              for you! Download a free digital sample of our paperback edition.
              Take a sneak peek before making a decision. We want you to know
              exactly what you&apos;re getting into. For the full 145-page
              adventure, you&apos;ll find the best value by purchasing the
              paperback on mazmatics.com or searching on Amazon. It&apos;s more
              cost-effective than printing and binding the entire book (trust
              us, we&apos;ve done the math)!
            </p>
            <p>
              Now, it&apos;s worth mentioning that this book is designed to be
              tactile and hands-on, something your kids can interact with,
              scribble on, and explore. While this digital sample isn&apos;t
              quite the real deal, you can always print it at home to get a
              taste of the genuine experience. We hope you enjoy this teaser! If
              this free sample piqued your interest, just imagine the excitement
              that awaits in the full paperback version.
            </p>
            <p>
              So, will you consider getting one for the young learners in your
              life? The adventure is just a page-turn away!
            </p>
            <div className={styles.section1__decoration}>
              <GetTheBookLinks />
              {/* <ILikeMaths /> */}
            </div>
          </Container>
        </section>
      </div>
    </div>
  )
}

export default FreeSample
