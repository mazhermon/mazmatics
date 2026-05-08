import React, { useContext } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import { HomeHeader } from '../components/home/homeHeader'
import { ParentsSay } from '../components/home/parentsSay'
import { PressMention } from '../components/home/pressMention'
import { WhyKidsLoveIt } from '../components/home/whyKidsLoveIt'
import { LookInsideHome } from '../components/home/lookInsideHome'
import { FinalCta } from '../components/home/finalCta'
import { AlreadyGotIt } from '../components/home/alreadyGotIt'
import { AppContext } from '../context/appContext'

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
        <ParentsSay />
        <PressMention />
        <WhyKidsLoveIt />
        <LookInsideHome />
        <FinalCta />
        <AlreadyGotIt />
      </main>
    </div>
  )
}

export default Home
