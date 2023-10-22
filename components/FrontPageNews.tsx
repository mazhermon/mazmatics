import React from 'react'
import Image from 'next/image'

import frontPageImage from '../public/images/MazmaticsFrontPageNews500web.png'
import styles from './FrontPageNews.module.css'
// import { Container } from './Container'
import { GetTheBookBanner } from './GetTheBookBanner'

const frontPageImageSize = {
  width: 500,
  height: 666,
}

const youTubeEmbedSizeRatioKeeper = {
  width: 560,
  height: 315,
}

export const FrontPageNews = () => (
  <>
    <div className={styles.stuffArticleSection}>
      <div className={styles.youTubeEmbedSmall}>
        <iframe
          width={youTubeEmbedSizeRatioKeeper.width}
          height={youTubeEmbedSizeRatioKeeper.height}
          src="https://www.youtube.com/embed/YX0lDhgvFT8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className={styles.youTubeEmbedLarge}>
        <iframe
          width={youTubeEmbedSizeRatioKeeper.width * 2}
          height={youTubeEmbedSizeRatioKeeper.height * 2}
          src="https://www.youtube.com/embed/YX0lDhgvFT8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.stuffContainerCustomTop}>
        <GetTheBookBanner />
        <div className={styles.stuffLinkTopBannner}>
          <div className={styles.newsPaperImage__overflowWrapper}>
            <div className={styles.newsPaperImage}>
              <Image
                alt="Mazmatics on the front page of the Dom Post NZ"
                src={frontPageImage}
                layout="intrinsic"
                width={frontPageImageSize.width * 0.75}
                height={frontPageImageSize.height * 0.75}
              />
            </div>
          </div>
          <div className={styles.copyWrapper}>
            <p>
              <a
                className={`hitmeLink ${styles.asSeenOnStuff}`}
                href="https://www.stuff.co.nz/national/education/130947181/dad-writes-maths-book-designed-for-home-play-not-homework"
              >
                As seen on Stuff.co.nz & the Dom Post
              </a>
            </p>
            <p>
              <a
                className={styles.stuffLinkSmall}
                href="https://www.stuff.co.nz/national/education/130947181/dad-writes-maths-book-designed-for-home-play-not-homework"
              >
                Check out the front page article article here
              </a>
            </p>
            <p>
              <span className={styles.megaQuoteMark}>&#8220;</span>What do you
              get when you add one Wellington dad with a web developer
              background, two drawing-mad kids and a goal to make maths fun?
              Answer: Mazmatics Maz Hermon​ is no maths expert, but always
              enjoyed the subject and wanted his children to as well. That’s why
              he decided to create, illustrate and publish his own maths
              exercise book “designed for home play, not homework”.
            </p>
            <p>
              <a
                className={styles.stuffLinkSmall}
                href="https://www.stuff.co.nz/national/education/130947181/dad-writes-maths-book-designed-for-home-play-not-homework"
              >
                Continue reading the full article on Stuff.co.nz
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
)
