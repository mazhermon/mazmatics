import { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import lindyImage from '../../public/images/lindyLarge.png'
import bookCover from '../../public/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg'
import { AppContext } from '../../context/appContext'
import heroStyles from '../../components/home/homeHeader.module.css'
import buttonStyles from './hero-buttons.module.css'
import styles from './hero-variants.module.css'

/**
 * In-situ experiment page: each of six button variants rendered inside
 * the full home hero (Lindy + book + sun + headline). Picking from the
 * comparison grid was abstract; this page shows what each pair feels
 * like under the real composition.
 *
 * Variants shown: 1, 2, 8, 14, 19, 20 (selected by Maz from
 * /wip/hero-buttons). noindex + not linked from anywhere.
 */

const DynamicSunSprite = dynamic(
  () => import('../../components/characters/sunSprite'),
  { ssr: false }
)

const lindyImageSize = {
  width: 2213,
  height: 2633,
}

interface Variant {
  num: number
  name: string
  primary: string
  secondary: string
}

const VARIANTS: Variant[] = [
  {
    num: 1,
    name: 'Current — purple solid + ghost',
    primary: buttonStyles.v1Primary,
    secondary: buttonStyles.v1Secondary,
  },
  {
    num: 2,
    name: 'Yellow primary',
    primary: buttonStyles.v2Primary,
    secondary: buttonStyles.v2Secondary,
  },
  {
    num: 8,
    name: 'Sticker tilt + double shadow',
    primary: buttonStyles.v8Primary,
    secondary: buttonStyles.v8Secondary,
  },
  {
    num: 14,
    name: 'Banner with cut-corner',
    primary: buttonStyles.v14Primary,
    secondary: buttonStyles.v14Secondary,
  },
  {
    num: 19,
    name: 'Asymmetric corners (hand-drawn feel)',
    primary: buttonStyles.v19Primary,
    secondary: buttonStyles.v19Secondary,
  },
  {
    num: 20,
    name: 'Card with deep elevation',
    primary: buttonStyles.v20Primary,
    secondary: buttonStyles.v20Secondary,
  },
]

interface HeroVariantProps {
  variant: Variant
  mathsWord: string
  showSun: boolean
}

const HeroVariant = ({ variant, mathsWord, showSun }: HeroVariantProps) => (
  <section className={styles.variantBlock}>
    <div className={styles.variantLabel}>
      <span className={styles.variantNum}>{String(variant.num).padStart(2, '0')}</span>
      <h2 className={styles.variantName}>{variant.name}</h2>
    </div>

    <div className={heroStyles.heroBand}>
      <header className={heroStyles.homeHeader}>
        {/* Sun is animated + SSR-disabled; only render in the first card
            to keep the page reasonable. The other cards get a visual stand-in
            via CSS in this module if needed — here we just omit it. */}
        {showSun && (
          <div className={heroStyles.sunCorner} aria-hidden="true">
            <DynamicSunSprite />
          </div>
        )}

        <div className={heroStyles.homeHeader__content}>
          <span className={heroStyles.newReleasePill}>Available now</span>

          <h1 className={heroStyles.heroHeading}>
            <span className={heroStyles.underlinedWord}>Liking {mathsWord}</span>{' '}
            is a superpower.
            <br />
            <span className={heroStyles.heroSubline}>
              Help your kids find theirs.
            </span>
          </h1>

          <p className={heroStyles.heroLede}>
            An activity and story book for kids 7&ndash;10 who&apos;d rather
            draw, decode and play their way to &ldquo;I like {mathsWord}.&rdquo;
            We turn {mathsWord} frustration into fascination.
          </p>

          <div className={heroStyles.ctaRow}>
            <Link href="/get-the-book" className={variant.primary}>
              Get the book
            </Link>
            <Link href="/free-sample" className={variant.secondary}>
              Look inside
            </Link>
          </div>
        </div>

        <div className={heroStyles.homeHeader__heroImage}>
          <div className={heroStyles.lindy}>
            <div className={heroStyles.bookBackdrop} aria-hidden="true">
              <Image
                alt="Mazmatics 1 fun math for kids book cover"
                src={bookCover}
                width={900}
                height={1350}
                sizes="(min-width: 60rem) 260px, 50vw"
              />
            </div>
            <div className={heroStyles.lindyImageWrap}>
              <Image
                alt="Lindy, the giant girl adventurer character from the Mazmatics book, smiling"
                src={lindyImage}
                width={lindyImageSize.width}
                height={lindyImageSize.height}
                sizes="(min-width: 60rem) 480px, 90vw"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  </section>
)

const HeroVariantsPage = () => {
  const { mathsWord = 'maths' } = useContext(AppContext)

  return (
    <>
      <Head>
        <title>WIP — Hero button variants in situ</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main className={styles.page}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>WIP / private</p>
          <h1 className={styles.h1}>
            Six button pairs in the real hero.
          </h1>
          <p className={styles.lede}>
            Same composition as the home page — only the CTA buttons swap.
            Pick the pair that reads best under the actual headline + Lindy
            + book; tell me the number and I&apos;ll port it in.
          </p>
        </header>

        {VARIANTS.map((variant, idx) => (
          <HeroVariant
            key={variant.num}
            variant={variant}
            mathsWord={mathsWord}
            showSun={idx === 0}
          />
        ))}
      </main>
    </>
  )
}

export default HeroVariantsPage
