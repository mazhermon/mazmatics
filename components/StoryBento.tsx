import React, { useContext } from 'react'
import styles from './storyBento.module.css'
import { AppContext } from '../context/appContext'

type Tone = 'purple' | 'blue'

export interface StoryBentoCard {
  title: string
  body: string
  tone: Tone
  /** Optional decorative SVG node placed lightly behind the story copy. */
  deco?: React.ReactNode
}

const PuzzleDeco = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 3a2 2 0 0 1 2 2v1h2V5a2 2 0 1 1 4 0v1h2a1 1 0 0 1 1 1v3h-1a2 2 0 1 0 0 4h1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 1 0-4 0v1H8a1 1 0 0 1-1-1v-3H6a2 2 0 1 1 0-4h1V8a1 1 0 0 1 1-1h1V5a2 2 0 0 1 0-2z" />
  </svg>
)

interface StoryBentoProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  cards?: StoryBentoCard[]
  id?: string
}

export const StoryBento: React.FC<StoryBentoProps> = ({
  eyebrow = 'Why Mazmatics',
  title = 'The story behind the numbers',
  subtitle,
  cards,
  id,
}) => {
  const { mathsWord = 'maths' } = useContext(AppContext)

  const defaultSubtitle = `We believe every child is naturally curious. Mazmatics translates the abstract language of ${mathsWord} into tactile, joyful experiences.`

  const defaultCards: StoryBentoCard[] = [
    {
      title: 'Sparking joy, not anxiety',
      body: `${
        mathsWord.charAt(0).toUpperCase() + mathsWord.slice(1)
      } anxiety is real, but it doesn't have to stay. Stories, puzzles and relatable scenarios replace pressure with curiosity.`,
      tone: 'purple',
      deco: PuzzleDeco,
    },
    {
      title: 'Tactile learning',
      body: 'Physical layouts encourage drawing, tracing and interacting directly with the page. Pencil first, screen never.',
      tone: 'blue',
    },
  ]

  const resolved = cards ?? defaultCards
  const headingId = id ? `${id}-heading` : 'story-bento-heading'

  return (
    <section
      className={styles.section}
      aria-labelledby={headingId}
      id={id}
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        <p className={styles.subtitle}>{subtitle ?? defaultSubtitle}</p>

        <div className={styles.spread}>
          {resolved.map((card, idx) => {
            const tonePurple = card.tone === 'purple'
            const numberClass = tonePurple
              ? styles.numberMarkPurple
              : styles.numberMarkBlue
            const titleClass = tonePurple
              ? styles.storyTitlePurple
              : styles.storyTitleBlue
            const offsetClass = idx === 1 ? styles.spreadOffset : ''
            return (
              <article
                key={idx}
                className={`${styles.story} ${offsetClass}`}
              >
                <span
                  className={`${styles.numberMark} ${numberClass}`}
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className={`${styles.storyTitle} ${titleClass}`}>
                  {card.title}
                </h3>
                <p className={styles.storyBody}>{card.body}</p>
                {card.deco && (
                  <span className={styles.storyDeco} aria-hidden="true">
                    {card.deco}
                  </span>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
