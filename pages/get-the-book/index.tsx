import React, { useContext } from 'react'
import Head from 'next/head'
// import Image from 'next/image'

// import { Button } from '../../components/button'
// import bookCoverImage from '../../public/images/mazmatics_bookCoverWeb1.jpg'
// import bookProductImageClearCut from '../../public/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg'

import styles from './get-the-book.module.css'
import { Grain } from '../../components/patterns/Grain'
import { GridPaper } from '../../components/patterns/GridPaper'
import { LookInside } from '../../components/LookInside'
import { Container } from '../../components/Container'
import { AppContext } from '../../context/appContext'
import { GetTheBookLinks } from '../../components/getTheBookLinks'
// const bookProductImageSize = {
//   width: 900,
//   height: 1350,
// }

const GetTheBook = () => {
  const { mathsWord } = useContext(AppContext)
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Get the book Fun Math 4 Kids</title>
          <meta
            name="description"
            content={`Get Fun Math for kids paperback activity book today, internationally available. Mazmatics helps kids say "I love math" by providing more opportunities for practicing ${mathsWord} to be a fun, relatable and enjoyable activity.`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.pageHeader}>Get the book</h1>
          <div className={styles.subtitle}>for the kids in your life</div>

          <div className={styles.decorationSquareGrain}>
            <Grain />
          </div>
          <div className={styles.decorationGridPaper}>
            <GridPaper />
          </div>

          <GetTheBookLinks />

          <section className={styles.lookInside}>
            <Container>
              <LookInside />
            </Container>
          </section>
        </main>
      </div>
    </>
  )
}

export default GetTheBook
