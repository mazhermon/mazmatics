import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'

import lindyImage from '../../public/images/lindyLarge.png'
import bookCover from '../../public/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg'
import { AppContext } from '../../context/appContext'
import styles from './homeHeader.module.css'

const lindyImageSize = {
  width: 2213,
  height: 2633,
}

export const HomeHeader = () => {
  const { mathsWord = 'maths' } = useContext(AppContext)

  return (
    <header className={styles.homeHeader}>
      <div className={styles.homeHeader__content}>
        <span className={styles.newReleasePill}>New Release</span>

        <h1 className={styles.heroHeading}>
          <span className={styles.underlinedWord}>Liking {mathsWord}</span> is a
          superpower.
          <br />
          <span className={styles.heroSubline}>
            Help your kids find theirs.
          </span>
        </h1>

        <p className={styles.heroLede}>
          An activity and story book for kids 7&ndash;10 who&apos;d rather
          draw, decode and play their way to &ldquo;I like {mathsWord}.&rdquo;
          We turn {mathsWord} frustration into fascination.
        </p>

        <div className={styles.ctaRow}>
          <Link href="/get-the-book" className={styles.primaryBtn}>
            Get the book
          </Link>
          <Link href="/free-sample" className={styles.secondaryBtn}>
            Look inside
          </Link>
        </div>
      </div>

      <div className={styles.homeHeader__heroImage}>
        <div className={styles.lindy}>
          <div className={styles.bookBackdrop} aria-hidden="true">
            <Image
              alt=""
              src={bookCover}
              width={900}
              height={1350}
            />
          </div>
          <div className={styles.lindyImageWrap}>
            <Image
              alt="Lindy, the giant girl adventurer character from the Mazmatics book, smiling"
              src={lindyImage}
              width={lindyImageSize.width / 3}
              height={lindyImageSize.height / 3}
              priority
            />
          </div>
          <div
            className={`${styles.floatingCard} ${styles.floatingCardEq}`}
            aria-hidden="true"
          >
            4 + 5 = 9!
          </div>
          <div
            className={`${styles.floatingCard} ${styles.floatingCardCalc}`}
            aria-hidden="true"
          >
            ✏︎
          </div>
        </div>
      </div>
    </header>
  )
}
