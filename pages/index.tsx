import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import lindyImage from '../public/images/lindyLarge.png'

import { CharCircleBetty } from '../components/characters/circleBetty'
import { Banner } from '../components/banner'

const lindyImageSize = {
  width: 2213,
  height: 2633,
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.charCircleBettyPositioner}>
        <CharCircleBetty />
      </div>
      <Head>
        <title>Mazmatics fun math 4 kids</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* this could be it's own componentn */}
        <div className={styles.homeHeader}>
          <h1 className={styles.siteTitle}>
            <span className={styles.siteTitle__welcometo}>Welcome to</span>
            <span className={styles.siteTitle__mazmatics}>Mazmatics</span>
            <span className={styles.siteTitle__promise}>
              We help kids say <wbr />
              &quot;I like math&quot;
            </span>
          </h1>
          <div className={styles.product_book1}>
            <h2 className={styles.product_book1__heading}>
              <Banner
                className={styles.homeBanner1}
                title="Fun Math 4 kids play-book"
                size="small"
                color="yellow"
              />
            </h2>
            <p className={styles.product_book1__subtitle}>out soon as!</p>
          </div>

          <div className={styles.lindy}>
            {/* use useState to set the width based on breakpoint in js */}
            <Image
              alt="Giant Girl adventurer sitting down smiling"
              src={lindyImage}
              layout="intrinsic"
              width={lindyImageSize.width / 7}
              height={lindyImageSize.height / 7}
            />
          </div>
        </div>

        <div className={styles.pointer}></div>

        {/* // own component */}
        <div className={styles.signup}>
          <div className="ml-embedded" data-form="ltd6tR"></div>
        </div>

        <Banner
          className={styles.homeBanner1}
          title="Fun Math 4 kids book"
          subtitle="Volume 1 – coming soon"
          size="med"
          color="purple"
        />
        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      <footer className={styles.footer}>footer</footer>
    </div>
  )
}

export default Home
