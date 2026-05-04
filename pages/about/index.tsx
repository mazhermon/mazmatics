import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useContext } from 'react'

import { ILikeMaths } from '../../components/characters/iLikeMaths/ILikeMaths'
import { TestimonialList } from '../../components/testimonials/TestimonialList'
import { CoreValues } from '../../components/CoreValues'
import { AboutHeader } from '../../components/About/AboutHeader'
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
        <title>About Mazmatics</title>
        <meta
          name="description"
          content={`About Mazmatics. An activity book and learning resource that helps make ${mathsWord} fun and useful for kids and early learners of all ages.`}
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
              I&apos;m a web developer by day and a creative hobbyist by night,
              writing from Aotearoa New Zealand with my little family of four.
              I&apos;m no {mathsWord} expert, but I&apos;ve always enjoyed the
              subject and wanted my kids to enjoy it too. I quite happily say
              &quot;I like {mathsWord},&quot; and I want every kid to feel that
              way.
            </p>
            <p className={styles.authorBody}>
              I made this book with my kids as a supplementary resource that
              sits alongside what they&apos;re already doing at school. My hope
              is it helps a few more kids of the world say &quot;I like math,
              &quot; wherever they are.
            </p>
            <p className={styles.signoff}>Have fun, Maz</p>
          </div>
          <div className={styles.authorDecoration} aria-hidden="true">
            <ILikeMaths />
          </div>
        </div>
      </section>

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
              The educational philosophy behind Mazmatics is rooted in proven
              pedagogical strategies. We move past rote memorisation toward
              genuine, joyful understanding.
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

      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsInner}>
          <TestimonialList />
        </div>
      </section>
    </div>
  )
}

export default About
