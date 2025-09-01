import React from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'

import styles from './getTheBookBanner.module.css'

import bookProductImageClearCut from '../public/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg'
import { Button } from './button'
import { Grain } from './patterns/Grain'

const bookProductImageSize = {
  width: 600,
  height: 876,
}

export const GetTheBookBanner = () => {
  return (
    <div className={styles.getTheBookBanner}>
      <Grain />
      <Link
        href="/get-the-book"
        className={`${styles.getTheBookImage}`}
        aria-label="get the book"
      >
        {/* TODO: animate some hands coming in to grab the Book
                crayon style transparent PNGs */}
        <Image
          alt="Book cover for Mazmatics Fun Math for Kids Volume 1"
          src={bookProductImageClearCut}
          // layout="intrinsic"
          width={bookProductImageSize.width * 0.75}
          height={bookProductImageSize.height * 0.75}
        />
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
