import React from 'react'

import styles from './join-mailing-list-page.module.css'
import { Container } from '../components/Container'
import Head from 'next/head'

const JoinMailingList = () => {
  return (
    <Container className={styles.joinTheMailingListPage}>
      <Head>
        <title>Join the mailing list</title>
        <meta
          name="description"
          content="Join the Mazmatics mailing list for monthly updates and offers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Join us</h1>
      <p className={styles.subtitle}>On our journey</p>
      <p>
        We don&apos;t email often, maybe once a month at most. Sign up and stay
        in the loop for fun things we&apos;ve been up to.
      </p>
    </Container>
  )
}
export default JoinMailingList
