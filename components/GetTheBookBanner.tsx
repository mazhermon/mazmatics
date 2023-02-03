import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './getTheBookBanner.module.css'

import bookProductImageClearCut from '../public/images/mazmaticsBookCoverWebSmall-min.png'
import { Button } from './button'

const bookProductImageSize = {
  width: 600,
  height: 876,
}

export const GetTheBookBanner = () => {
  return (
    <div className={styles.getTheBookBanner}>
      <Link href="/get-the-book">
        <a
          className={`${styles.navLink} ${styles.navLinkCTA}`}
          aria-label="get the book"
        >
          {/* TODO: animate some hands coming in to grab the Book
                crayon style transparent PNGs */}
          <Image
            alt="Book cover for Mazmatics Fun Math for Kids Volume 1"
            src={bookProductImageClearCut}
            layout="intrinsic"
            width={bookProductImageSize.width * 0.75}
            height={bookProductImageSize.height * 0.75}
          />
        </a>
      </Link>
      <div className={styles.homeCTAbuttonArea}>
        <Button fullWidth={true} variant="primary" href="/get-the-book">
          Get the book
        </Button>

        <div className={styles.leadCopy}>
          <p>
            Fun Math 4 Kids is an activity and story book that supports kids to
            practise their maths and have some fun along the way. Do some maths,
            do some drawing, read a story, solve a code...
          </p>
        </div>
      </div>
    </div>
  )
}
