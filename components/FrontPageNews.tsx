import React from 'react'
import Image from 'next/image'

import frontPageImage from '../public/images/MazmaticsFrontPageNews500web.png'
import styles from './FrontPageNews.module.css'

const frontPageImageSize = {
  width: 500,
  height: 666,
}

export const FrontPageNews = () => (
  <>
    <div className={styles.stuffArticleSection}>
      <div className={styles.newsPaperImage}>
        <Image
          alt="Mazmatics on the front page of the Dom Post NZ"
          src={frontPageImage}
          layout="intrinsic"
          width={frontPageImageSize.width * 0.75}
          height={frontPageImageSize.height * 0.75}
        />
      </div>
      <p>
        <a
          className="hitmeLink"
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

      <div className={styles.youTubeEmbed}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/YX0lDhgvFT8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </>
)
