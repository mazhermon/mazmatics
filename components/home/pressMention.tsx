import React from 'react'
import Image from 'next/legacy/image'

import frontPageImage from '../../public/images/MazmaticsFrontPageNews500web.png'
import styles from './pressMention.module.css'

const ARTICLE_URL =
  'https://www.stuff.co.nz/national/education/130947181/dad-writes-maths-book-designed-for-home-play-not-homework'

export const PressMention: React.FC = () => (
  <section className={styles.section} aria-labelledby="press-heading">
    <div className={styles.inner}>
      <a
        className={styles.thumbLink}
        href={ARTICLE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the Stuff.co.nz article in a new tab"
      >
        <Image
          alt="Mazmatics on the front page of The Dominion Post / Stuff.co.nz"
          src={frontPageImage}
          width={500}
          height={666}
        />
      </a>

      <div className={styles.copyCol}>
        <p className={styles.eyebrow}>As seen in</p>
        <h2 id="press-heading" className={styles.source}>
          Stuff.co.nz · The Dominion Post
        </h2>

        <blockquote className={styles.quote}>
          <p>
            <span className={styles.openMark} aria-hidden="true">
              &ldquo;
            </span>
            What do you get when you add one Wellington dad with a web developer
            background, two drawing-mad kids and a goal to make maths fun?{' '}
            <strong>Answer: Mazmatics.</strong>
          </p>
        </blockquote>

        <a
          className={styles.readMore}
          href={ARTICLE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the full article on Stuff.co.nz{' '}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
)
