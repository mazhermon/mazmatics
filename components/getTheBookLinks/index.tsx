import Image from 'next/legacy/image'

import { Button } from '../../components/button'
import bookProductImageClearCut from '../../public/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg'

import styles from './getTheBookLinks.module.css'
import { useContext } from 'react'
import { AppContext } from '../../context/appContext'
// import { FreeSampleDownload } from '../freeSample'

export const GetTheBookLinks = () => {
  const bookProductImageSize = {
    width: 900,
    height: 1350,
  }

  const { mathsWord, userLang } = useContext(AppContext)

  return (
    <div className={styles.contentGrid}>
      <div className={styles.action1}>
        <span className={styles.marketDescription}></span>

        <ul className={styles.product_book1__linkGroup}>
          <li className={styles.product_book1_buyNowBlock}>
            <Button
              variant={userLang !== 'en-US' ? 'primary' : 'secondary'}
              external={true}
              href="https://www.amazon.com.au/dp/0473648911"
            >
              Buy on Amazon Australia
            </Button>
            <span>Use this for shipping to NZ</span>
          </li>

          <li className={styles.product_book1_buyNowBlock}>
            <Button
              external={true}
              variant={userLang === 'en-US' ? 'primary' : 'secondary'}
              href="https://www.amazon.com/dp/0473648911"
            >
              Buy on Amazon.com
            </Button>
            <span>For shipping to USA</span>
          </li>

          <li className={styles.product_book1_buyNowBlock}>
            <Button
              external={true}
              href="https://www.amazon.co.uk/dp/0473648911"
            >
              Buy on Amazon UK
            </Button>
            <span>...I&apos;ll let you guess what this is for :)</span>
          </li>
        </ul>

        {/* <Button variant="primary" href="/get-the-book/get-from-amazon">
          Get from Amazon <span>International</span>
        </Button> */}
        <div className={`copyArea copyArea--med ${styles.getTheBookCopy}`}>
          <p className={styles.brandPromise}>
            <span className={styles.brandName}>Mazmatics</span> &#8212;
            supporting positive early experiences with {mathsWord}
          </p>
          {/* <p>
                        Fun {mathsWord} 4 Kids is an activity &amp; story book that
                        supports kids to practise their {mathsWord} and have some
                        fun along the way. Do some
                        {mathsWord}, do some drawing, read a story, solve a code...
                      </p> */}
        </div>
      </div>
      {/* <div className={styles.action2}>
        <span className={styles.marketDescription}>Aotearoa / New Zealand</span>
        <Button
          external={true}
          variant="secondary"
          href="https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations"
        >
          NZ Shop
        </Button>
      </div> */}

      {/* <div className={styles.action3}>
        <Button variant="secondary" href="/stockists">
          Find a Bookshop
        </Button>
      </div> */}
      {/* <div>
        <FreeSampleDownload />
      </div> */}

      {/* <div className={styles.action3}></div> */}

      <div className={styles.bookImage}>
        <Image
          alt="Book cover for Mazmatics Fun Math for Kids Volume 1"
          src={bookProductImageClearCut}
          // layout="intrinsic"
          width={bookProductImageSize.width * 0.5}
          height={bookProductImageSize.height * 0.5}
        />
      </div>
    </div>
  )
}
