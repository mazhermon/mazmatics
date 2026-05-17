import Head from 'next/head'
import Link from 'next/link'

import styles from './privacy.module.css'

const PrivacyPolicy = () => (
  <>
    <Head>
      <title>Privacy — Mazmatics</title>
      <meta
        name="description"
        content="Short, plain-English privacy policy for mazmatics.com — what we collect, what we don't do, and how to opt out."
      />
      <link rel="canonical" href="https://mazmatics.com/privacy" />
      {/* Policy pages aren't useful organic landings — keep out of search. */}
      <meta name="robots" content="noindex" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>The legal bit, in plain English</p>
          <h1 className={styles.h1}>Privacy.</h1>
          <p className={styles.lede}>
            Short version: we count visits anonymously, and if you join
            the mailing list we send emails. We don&apos;t sell your data,
            track individuals, or run advertising. Long version below.
          </p>
          <p className={styles.updated}>Last updated 17 May 2026.</p>
        </header>

        <section className={styles.section}>
          <h2>What we collect</h2>
          <p>
            <strong>Analytics.</strong> We use Google Analytics to count
            page visits in aggregate — how many people landed on the
            home page, which country they came from at a country level,
            which page they came from before ours. This data is
            anonymous; we don&apos;t see who you are.
          </p>
          <p>
            <strong>If you join the mailing list.</strong> We collect
            your email address (and your first name if you give it).
            That&apos;s it. We use MailerLite to store the list and send
            the emails.
          </p>
          <p>
            <strong>If you click a buy link.</strong> Those go to
            Amazon. From that point Amazon&apos;s privacy policy applies,
            not ours. We don&apos;t see what you do on Amazon.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What we don&apos;t do</h2>
          <ul>
            <li>We don&apos;t sell, rent, or share your email with
              anyone outside MailerLite (which we use to send the emails).
            </li>
            <li>We don&apos;t build a profile of you or track you
              across other websites.
            </li>
            <li>We don&apos;t run advertising, retargeting, or
              advertising cookies on this site.
            </li>
            <li>We don&apos;t collect anything from kids. The book is
              for kids; the site is aimed at the parents who buy it.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Cookies</h2>
          <p>
            One anonymous Google Analytics cookie so visits aren&apos;t
            double-counted. Nothing else.
          </p>
          <p>
            If you don&apos;t want Google Analytics, you can install{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s official opt-out browser extension
            </a>
            , or block the cookie in your browser.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Who else touches the data</h2>
          <ul>
            <li>
              <strong>Google LLC</strong> — runs Google Analytics. They
              process visit data on our behalf.
            </li>
            <li>
              <strong>UAB MailerLite</strong> — stores the mailing list
              and sends the emails. Based in the EU.
            </li>
            <li>
              <strong>Vercel Inc.</strong> — hosts the site. They see
              standard server logs (IP, user agent, request URL).
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Your rights</h2>
          <ul>
            <li>
              <strong>Unsubscribe</strong> — every email has a
              one-click unsubscribe link. Use it any time.
            </li>
            <li>
              <strong>See or delete what we hold</strong> — email
              Maz at the address below. We&apos;ll send what we have
              within seven days, or delete it within seven days, your
              call.
            </li>
            <li>
              <strong>Opt out of analytics</strong> — see the cookies
              section above.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Changes</h2>
          <p>
            If we change anything substantive, the date at the top of
            this page will update. We won&apos;t change it quietly.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            Maz Hermon, Wellington, Aotearoa New Zealand.
            <br />
            Email:{' '}
            <a href="mailto:hellomazmatics@gmail.com">
              hellomazmatics@gmail.com
            </a>
          </p>
        </section>

        <p className={styles.back}>
          <Link href="/">&larr; Back to the home page</Link>
        </p>
      </article>
    </main>
  </>
)

export default PrivacyPolicy
