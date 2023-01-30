import React from 'react'
import Image from 'next/image'

import styles from './lookInside.module.css'

import mazAPlus001 from '../public/images/Mazmatics-a-plus-001.jpg'
import mazAPlus002 from '../public/images/Mazmatics-a-plus-002.jpg'
import mazAPlus003 from '../public/images/Mazmatics-a-plus-003.jpg'
import mazAPlus004 from '../public/images/Mazmatics-a-plus-004.jpg'

const contentImageSize = {
  width: 1200,
  height: 1200,
}

export const LookInside = () => (
  <>
    <h2>Look inside</h2>
    <div className={styles.imageGal}>
      <Image
        alt="Parent pointing to the map in the fantasy story Lindys Quest"
        src={mazAPlus001}
        layout="intrinsic"
        width={contentImageSize.width}
        height={contentImageSize.height}
      />
      <Image
        alt="Parent shows kid teh secret code cracker page"
        src={mazAPlus002}
        layout="intrinsic"
        width={contentImageSize.width}
        height={contentImageSize.height}
      />
      <Image
        alt="kid writing in the book for a cookies math question"
        src={mazAPlus003}
        layout="intrinsic"
        width={contentImageSize.width}
        height={contentImageSize.height}
      />
      <Image
        alt="a page of practice exercises and drawings"
        src={mazAPlus004}
        layout="intrinsic"
        width={contentImageSize.width}
        height={contentImageSize.height}
      />
    </div>
  </>
)
