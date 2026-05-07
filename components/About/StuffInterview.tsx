import React, { useState } from 'react'

import styles from './StuffInterview.module.css'

const VIDEO_ID = 'YX0lDhgvFT8'
const ARTICLE_URL =
  'https://www.stuff.co.nz/national/education/130947181/dad-writes-maths-book-designed-for-home-play-not-homework'

/* Lite-embed: show the YouTube thumbnail and a play overlay until the user
   clicks. Only then does the iframe load. Keeps the about page lightweight
   for visitors who scroll past without playing, and avoids loading YouTube's
   tracking on every page view. youtube-nocookie domain is the privacy-respecting
   embed host. */
export const StuffInterview: React.FC = () => {
  const [activated, setActivated] = useState(false)
  const thumbUrl = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`

  return (
    <section
      className={styles.section}
      aria-labelledby="stuff-interview-heading"
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>From the newsroom</p>
        <h2 id="stuff-interview-heading" className={styles.title}>
          The Stuff.co.nz interview.
        </h2>
        <p className={styles.lede}>
          The Stuff team came round to talk about why I made Mazmatics — what
          it means to design a maths book for home play, not homework.
        </p>

        <div className={styles.frame}>
          {activated ? (
            <iframe
              className={styles.iframe}
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Stuff.co.nz interview with Maz Hermon about Mazmatics"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className={styles.playBtn}
              onClick={() => setActivated(true)}
              aria-label="Play video: Stuff.co.nz interview with Maz Hermon"
            >
              {/* Plain <img> so we hit YouTube's CDN directly and don't try to
                  optimise an external host through next/image. Width/height set
                  for layout stability while loading. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbUrl}
                alt=""
                loading="lazy"
                width={1280}
                height={720}
                className={styles.thumb}
              />
              <span className={styles.playIcon} aria-hidden="true">
                <svg viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className={styles.playIconBg}
                    d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  />
                  <path d="M 45,24 27,14 27,34" fill="#fff" />
                </svg>
              </span>
            </button>
          )}
        </div>

        <p className={styles.caption}>
          <a
            className={styles.captionLink}
            href={ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the full Stuff.co.nz article{' '}
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </div>
    </section>
  )
}
