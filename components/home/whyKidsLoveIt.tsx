import React, { useContext } from 'react'
import Image from 'next/legacy/image'

import styles from './whyKidsLoveIt.module.css'
import { AppContext } from '../../context/appContext'

import detailA from '../../public/images/Mazmatics-a-plus-001.jpg'
import detailB from '../../public/images/Mazmatics-a-plus-003.jpg'
import detailC from '../../public/images/Mazmatics-a-plus-005.jpg'

interface Item {
  number: string
  title: string
  body: string
  image: typeof detailA
  imageAlt: string
}

export const WhyKidsLoveIt: React.FC = () => {
  const { mathsWord = 'maths' } = useContext(AppContext)
  const M = mathsWord
  const Mc = M.charAt(0).toUpperCase() + M.slice(1)

  const items: Item[] = [
    {
      number: '01',
      title: 'Joyful play.',
      body: `${Mc} anxiety is real, but it doesn't have to stay. Stories, codes and silly jokes replace pressure with curiosity, so kids meet ${M} on friendly ground.`,
      image: detailA,
      imageAlt: 'Sample page from Lindy’s Quest, the illustrated story',
    },
    {
      number: '02',
      title: 'Pencil first.',
      body: `Drawing, tracing, doodling, decoding. The page invites kids to mark it up. ${Mc} sticks when their hands are busy, not when a screen blinks at them.`,
      image: detailB,
      imageAlt: 'A kid writing answers in the cookies math activity',
    },
    {
      number: '03',
      title: 'Wins, not tests.',
      body: `Mistakes are landings, not failures. Each page is a small win to celebrate, building the quiet confidence that turns "I can’t" into "let me try".`,
      image: detailC,
      imageAlt: 'Sample interior page with practice exercises and drawings',
    },
  ]

  return (
    <section
      className={styles.section}
      aria-labelledby="why-kids-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>What’s in the book</p>
          <h2 id="why-kids-heading" className={styles.title}>
            Why kids love it.
          </h2>
          <p className={styles.lede}>
            Three things every page is built around.
          </p>
        </header>

        <ol className={styles.list}>
          {items.map((it, idx) => (
            <li key={it.number} className={styles.row}>
              <span
                className={styles.bigNumber}
                aria-hidden="true"
                data-position={idx % 2 === 0 ? 'left' : 'right'}
              >
                {it.number}
              </span>

              <div className={styles.copy}>
                <h3 className={styles.itemTitle}>{it.title}</h3>
                <p className={styles.itemBody}>{it.body}</p>
              </div>

              <div className={styles.detail}>
                <Image
                  alt={it.imageAlt}
                  src={it.image}
                  width={600}
                  height={600}
                  loading="eager"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
