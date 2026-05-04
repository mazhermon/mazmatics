import React, { useContext } from 'react'
import Head from 'next/head'

import styles from './get-the-book.module.css'
import { LookInside } from '../../components/LookInside'
import { AppContext } from '../../context/appContext'
import { GetTheBookLinks } from '../../components/getTheBookLinks'
import { FreeSampleDownload } from '../../components/freeSample'

const GetTheBook = () => {
  const { mathsWord = 'maths' } = useContext(AppContext)

  return (
    <div className={styles.container}>
      <Head>
        <title>Get the book — Mazmatics Fun Math 4 Kids</title>
        <meta
          name="description"
          content={`Get Mazmatics Fun Math 4 Kids Vol. 1 paperback. An activity and story book that helps kids 7-10 build a positive relationship with ${mathsWord}.`}
        />
        <link rel="canonical" href="https://www.mazmatics.com/get-the-book" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.heroSection} aria-labelledby="gtb-heading">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Volume 1 · Out now</p>
          <h1 id="gtb-heading" className={styles.pageTitle}>
            Get the book.
          </h1>
          <p className={styles.lede}>
            Mazmatics Fun Math 4 Kids Volume 1 is a paperback activity and
            story book for kids 7&ndash;10. Pick the storefront that ships
            closest to you.
          </p>
        </div>
      </section>

      <section className={styles.factStrip} aria-label="Book facts">
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <p className={styles.factLabel}>Format</p>
            <p className={styles.factValue}>Paperback, 145 pages</p>
          </div>
          <div className={styles.fact}>
            <p className={styles.factLabel}>Ages</p>
            <p className={styles.factValue}>7&ndash;10 (US grade 2&ndash;4)</p>
          </div>
          <div className={styles.fact}>
            <p className={styles.factLabel}>Covers</p>
            <p className={styles.factValue}>
              +&thinsp;&minus;&thinsp;&times;&thinsp;÷ &amp; some fractions
            </p>
          </div>
          <div className={styles.fact}>
            <p className={styles.factLabel}>Ships from</p>
            <p className={styles.factValue}>Amazon AU · US · UK</p>
          </div>
        </div>
      </section>

      <section className={styles.buyOptions} aria-label="Buy options">
        <div className={styles.buyOptionsInner}>
          <GetTheBookLinks />
        </div>
      </section>

      <section className={styles.lookInsideSection} aria-label="Look inside">
        <div className={styles.lookInsideInner}>
          <h2 className={styles.lookInsideHeading}>A look inside</h2>
          <LookInside variant="showcase" heading={null} />
        </div>
      </section>

      <section className={styles.freeSampleSection} aria-label="Free sample">
        <div className={styles.freeSampleInner}>
          <FreeSampleDownload />
        </div>
      </section>
    </div>
  )
}

export default GetTheBook
