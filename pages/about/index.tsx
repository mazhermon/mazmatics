import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useContext } from 'react'

import { ILikeMaths } from '../../components/characters/iLikeMaths/ILikeMaths'
import { TestimonialList } from '../../components/testimonials/TestimonialList'
import { CoreValues } from '../../components/CoreValues'
import { AboutHeader } from '../../components/About/AboutHeader'
import { StuffInterview } from '../../components/About/StuffInterview'
import { WriteInThisBook } from '../../components/doodles/writeInThisBook'
import { AppContext } from '../../context/appContext'

import styles from './about.module.css'

const DynamicSunSprite = dynamic(
  () => import('../../components/characters/sunSprite'),
  {
    ssr: false,
  }
)

const TickIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12.5l4.5 4.5L19 7.5"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const About = () => {
  const { mathsWord = 'maths' } = useContext(AppContext)
  const mathsWordCap = mathsWord.charAt(0).toUpperCase() + mathsWord.slice(1)

  return (
    <div className={styles.aboutPage}>
      <Head>
        <title>{`About Mazmatics — Maz Hermon, the dad behind the book`}</title>
        <meta
          name="description"
          content={`About Mazmatics. Why a Wellington dad and web developer wrote an activity and story book to help kids 7-10 say "I like ${mathsWord}".`}
        />
        <link rel="canonical" href="https://www.mazmatics.com/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Mazmatics" />
        <meta
          property="og:title"
          content="About Mazmatics — Maz Hermon, the dad behind the book"
        />
        <meta
          property="og:description"
          content={`Why a Wellington dad and web developer wrote an activity and story book to help kids 7-10 say "I like ${mathsWord}".`}
        />
        <meta property="og:url" content="https://www.mazmatics.com/about" />
        <meta
          property="og:image"
          content="https://www.mazmatics.com/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg"
        />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="1350" />
        <meta
          property="og:image:alt"
          content="Mazmatics Fun Math 4 Kids Vol. 1 book cover"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Mazmatics — Maz Hermon, the dad behind the book"
        />
        <meta
          name="twitter:description"
          content={`Why a Wellington dad wrote an activity book to help kids 7-10 say "I like ${mathsWord}".`}
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
              '@type': 'Person',
              name: 'Maz Hermon',
              jobTitle: 'Author, illustrator, web developer',
              description: `Wellington-based dad, web developer and author of Mazmatics: Fun Math 4 Kids Vol. 1 — an activity and story book for kids 7-10.`,
              url: 'https://www.mazmatics.com/about',
              image:
                'https://www.mazmatics.com/images/lindyLarge.png',
              nationality: 'New Zealand',
              sameAs: [
                'https://www.instagram.com/mazmaticsfun4kids/',
                'https://www.facebook.com/mazmaticsfunforkids',
              ],
              knowsAbout: [
                'Mathematics education',
                'Children\'s books',
                'Illustration',
              ],
            }),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AboutHeader />

      <section className={styles.authorSection}>
        <div className={styles.authorInner}>
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowPurple}`}>
              The author
            </p>
            <h2 className={styles.authorTitle}>
              I&apos;m Maz Hermon, the dad behind Mazmatics.
            </h2>
            <p className={styles.authorBody}>
              Web developer by day, creative hobbyist by night. Writing
              from Aotearoa New Zealand with my little family of four.
              I&apos;m no {mathsWord} expert — I just happily say
              &ldquo;I like {mathsWord}&rdquo; and I want every kid to
              feel that way too.
            </p>
            <p className={styles.authorBody}>
              I made this book with my own kids, as practice between
              lessons. My hope: it helps a few more kids around the world
              say &ldquo;I like math&rdquo; — wherever they are.
            </p>
            <p className={styles.signoff}>— Maz</p>
          </div>
          <div className={styles.authorDecoration} aria-hidden="true">
            <ILikeMaths />
          </div>
        </div>
      </section>

      <StuffInterview />

      <CoreValues
        eyebrow="What we believe"
        title="Our core values"
        subtitle="Three short principles that shape every page in the book."
      />

      <section className={styles.foundationSection}>
        <div className={styles.foundationInner}>
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowBlue}`}>
              The science (and the spirit)
            </p>
            <h2 className={styles.foundationTitle}>
              Building a strong foundation
            </h2>
            <p className={styles.foundationLead}>
              Built from how kids actually learn: by doing, drawing and getting
              it wrong before getting it right. No drill-and-kill. Just enough
              challenge to keep them turning the page.
            </p>
            <ul className={styles.checklist}>
              <li className={styles.checklistItem}>
                <span className={styles.checklistTick} aria-hidden="true">
                  {TickIcon}
                </span>
                <div className={styles.checklistContent}>
                  <h3 className={styles.checklistTitle}>
                    Practice over perfection
                  </h3>
                  <p className={styles.checklistBody}>
                    Like guitar, like dance, like sport. {mathsWordCap} is a
                    skill that grows with use.
                  </p>
                </div>
              </li>
              <li className={styles.checklistItem}>
                <span className={styles.checklistTick} aria-hidden="true">
                  {TickIcon}
                </span>
                <div className={styles.checklistContent}>
                  <h3 className={styles.checklistTitle}>
                    Home play, not homework
                  </h3>
                  <p className={styles.checklistBody}>
                    Supplementary, not a replacement. Kids should listen to
                    their teachers; this is the practice between lessons.
                  </p>
                </div>
              </li>
              <li className={styles.checklistItem}>
                <span className={styles.checklistTick} aria-hidden="true">
                  {TickIcon}
                </span>
                <div className={styles.checklistContent}>
                  <h3 className={styles.checklistTitle}>No answers page</h3>
                  <p className={styles.checklistBody}>
                    Kids need to struggle a little to learn deeply. (We do hint
                    strongly when it counts.)
                  </p>
                </div>
              </li>
              <li className={styles.checklistItem}>
                <span className={styles.checklistTick} aria-hidden="true">
                  {TickIcon}
                </span>
                <div className={styles.checklistContent}>
                  <h3 className={styles.checklistTitle}>
                    Pencil first, screen never
                  </h3>
                  <p className={styles.checklistBody}>
                    Tactile, hands-on, no batteries required. Draw, scribble,
                    fold, repeat.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.foundationDecoration} aria-hidden="true">
            <WriteInThisBook />
          </div>
        </div>
      </section>

      <section className={styles.makeItYoursSection}>
        <div className={styles.sunOrnament} aria-hidden="true">
          <DynamicSunSprite />
        </div>
        <div className={styles.writeOrnament} aria-hidden="true">
          <WriteInThisBook />
        </div>
        <div className={styles.makeItYoursInner}>
          <p className={`${styles.eyebrow} ${styles.eyebrowYellow}`}>
            Permission slip
          </p>
          <h2 className={styles.makeItYoursTitle}>Make it yours.</h2>
          <p className={styles.makeItYoursBody}>
            This book is black and white. It isn&apos;t precious. Draw on it.
            Colour the pictures. Rip a page out and stick it on your wall.
          </p>
        </div>
      </section>

      <section
        id="testimonials"
        className={styles.testimonialsSection}
      >
        <div className={styles.testimonialsInner}>
          <TestimonialList />
        </div>
      </section>
    </div>
  )
}

export default About
