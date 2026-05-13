import Head from 'next/head'
import Link from 'next/link'

import styles from './hero-buttons.module.css'

/**
 * Throwaway WIP page: 20 paired-button variants for the home hero CTAs.
 * Pick one, then port the chosen pair into `components/home/homeHeader.tsx`
 * and delete this page + its module.
 *
 * noindex so it never ranks; not linked from anywhere else.
 */

const PRIMARY_HREF = '/get-the-book'
const SECONDARY_HREF = '/free-sample'
const PRIMARY_LABEL = 'Get the book'
const SECONDARY_LABEL = 'Look inside'

interface VariantProps {
  num: number
  name: string
  primaryClass: string
  secondaryClass: string
  rowClass?: string
}

const Variant = ({
  num,
  name,
  primaryClass,
  secondaryClass,
  rowClass,
}: VariantProps) => (
  <section className={styles.panel}>
    <header className={styles.panelHeader}>
      <span className={styles.panelNum}>{String(num).padStart(2, '0')}</span>
      <h2 className={styles.panelName}>{name}</h2>
    </header>
    <div className={`${styles.row} ${rowClass ?? ''}`}>
      <Link href={PRIMARY_HREF} className={primaryClass}>
        {PRIMARY_LABEL}
      </Link>
      <Link href={SECONDARY_HREF} className={secondaryClass}>
        {SECONDARY_LABEL}
      </Link>
    </div>
  </section>
)

const VARIANTS: VariantProps[] = [
  {
    num: 1,
    name: 'Current — purple solid + ghost',
    primaryClass: styles.v1Primary,
    secondaryClass: styles.v1Secondary,
  },
  {
    num: 2,
    name: 'Yellow primary',
    primaryClass: styles.v2Primary,
    secondaryClass: styles.v2Secondary,
  },
  {
    num: 3,
    name: 'Bold black border',
    primaryClass: styles.v3Primary,
    secondaryClass: styles.v3Secondary,
  },
  {
    num: 4,
    name: 'Retro arcade hard shadow',
    primaryClass: styles.v4Primary,
    secondaryClass: styles.v4Secondary,
  },
  {
    num: 5,
    name: 'Pill rounded',
    primaryClass: styles.v5Primary,
    secondaryClass: styles.v5Secondary,
  },
  {
    num: 6,
    name: 'Outlined primary',
    primaryClass: styles.v6Primary,
    secondaryClass: styles.v6Secondary,
  },
  {
    num: 7,
    name: 'Magazine serif italic',
    primaryClass: styles.v7Primary,
    secondaryClass: styles.v7Secondary,
  },
  {
    num: 8,
    name: 'Sticker tilt + double shadow',
    primaryClass: styles.v8Primary,
    secondaryClass: styles.v8Secondary,
  },
  {
    num: 9,
    name: 'Animated arrow',
    primaryClass: styles.v9Primary,
    secondaryClass: styles.v9Secondary,
  },
  {
    num: 10,
    name: 'Soft purple wash',
    primaryClass: styles.v10Primary,
    secondaryClass: styles.v10Secondary,
  },
  {
    num: 11,
    name: 'Asymmetric — big primary, mini ghost',
    primaryClass: styles.v11Primary,
    secondaryClass: styles.v11Secondary,
  },
  {
    num: 12,
    name: 'Icon prefix',
    primaryClass: styles.v12Primary,
    secondaryClass: styles.v12Secondary,
  },
  {
    num: 13,
    name: 'Underlined text-link (minimal)',
    primaryClass: styles.v13Primary,
    secondaryClass: styles.v13Secondary,
  },
  {
    num: 14,
    name: 'Banner with cut-corner',
    primaryClass: styles.v14Primary,
    secondaryClass: styles.v14Secondary,
  },
  {
    num: 15,
    name: 'Diagonal split fill',
    primaryClass: styles.v15Primary,
    secondaryClass: styles.v15Secondary,
  },
  {
    num: 16,
    name: 'All-caps small + wide spacing',
    primaryClass: styles.v16Primary,
    secondaryClass: styles.v16Secondary,
  },
  {
    num: 17,
    name: 'Numbered magazine TOC',
    primaryClass: styles.v17Primary,
    secondaryClass: styles.v17Secondary,
  },
  {
    num: 18,
    name: 'Dotted-line border',
    primaryClass: styles.v18Primary,
    secondaryClass: styles.v18Secondary,
  },
  {
    num: 19,
    name: 'Asymmetric corners (hand-drawn feel)',
    primaryClass: styles.v19Primary,
    secondaryClass: styles.v19Secondary,
  },
  {
    num: 20,
    name: 'Card with deep elevation',
    primaryClass: styles.v20Primary,
    secondaryClass: styles.v20Secondary,
  },
]

const HeroButtons = () => (
  <>
    <Head>
      <title>WIP — Hero button variants</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
    <main className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>WIP / private</p>
        <h1 className={styles.h1}>Pick a hero-button pair.</h1>
        <p className={styles.lede}>
          Twenty paired variants for the home hero CTAs (Get the book +
          Look inside). Pick a number; we&apos;ll port that pair into
          the real component and delete this page.
        </p>
      </header>

      <div className={styles.grid}>
        {VARIANTS.map((v) => (
          <Variant key={v.num} {...v} />
        ))}
      </div>
    </main>
  </>
)

export default HeroButtons
