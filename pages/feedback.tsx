import Link from 'next/link'
import Head from 'next/head'
import styles from './feedback.module.css'
import { Container } from '../components/Container'

const Feedback = () => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Feedback</title>
          <meta
            name="description"
            content="We love feedback, good or constructive, get in touch with us and let us know how you think we can do better as we progress."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container>
          <div className={styles.main}>
            <h1>Feedback</h1>
            <p className={styles.intro}>
              We love feedback, good or constructive, get in touch with us and
              let us know how you think we can do better as we progress. You can
              either email us directly or use the{' '}
              <a href="#feedbackForm">feedback form below</a>.
            </p>

            <h2>Got ideas on how we can improve?</h2>
            <p>
              Because we believe its ok to fail as long as we&apos;re learning
              as we go, we&apos;re aware that we&apos;ll get things wrong and
              make mistakes on our journey with helping kids to say &apos;I like
              math&apos;. If you&apos;ve got idea ideas on how we can continue
              to improve, we&apos;d love to hear from you.
            </p>
            <h2>Love what we do?</h2>
            <p>
              If you love what we&apos;re doing, we&apos;d really love to hear
              from you. Feedback about how we&apos;re impacting kids lives is
              what energises us to keep going. Thanks so much to everyone who
              gets in touch with us to share your experience. You might like to
              help us spead the word by&nbsp;
              <Link href="/write-a-review">writing a review</Link>
              &nbsp; or sharing a picture on social media and telling your
              besties about us.
            </p>

            <h2 id="feedbackForm" className={styles.formHeading}>
              Feedback form
            </h2>
            <div className={styles.iframeWrapper}>
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd_RoPGduXSusgVbNVpVR-4xYcHA7STWNQ1Z9etkrtHFfM6oQ/viewform?embedded=true">
                Loading…
              </iframe>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Feedback
