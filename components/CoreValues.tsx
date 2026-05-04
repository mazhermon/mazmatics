import React from 'react'
import styles from './coreValues.module.css'

type Tone = 'purple' | 'yellow' | 'blue'

export interface CoreValueItem {
  title: string
  description: string
  tone?: Tone
}

const TONE_CLASS: Record<Tone, string> = {
  purple: styles.tonePurple,
  yellow: styles.toneYellow,
  blue: styles.toneBlue,
}

const DEFAULT_VALUES: CoreValueItem[] = [
  {
    title: 'Joyful play',
    description:
      'Learning should feel like an adventure, not a chore. We design for smiles and "aha!" moments.',
    tone: 'purple',
  },
  {
    title: 'Inclusive design',
    description:
      'Every mind works differently. Our visual and tactile approaches mean no learner is left behind.',
    tone: 'yellow',
  },
  {
    title: 'Growth mindset',
    description:
      'Mistakes are just steps to understanding. We celebrate effort and resilience over perfection.',
    tone: 'blue',
  },
]

interface CoreValuesProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  values?: CoreValueItem[]
  /** Override the section's id for in-page anchor links. */
  id?: string
}

export const CoreValues: React.FC<CoreValuesProps> = ({
  eyebrow = 'How we make it',
  title = 'Our core values',
  subtitle = 'Three principles that guide everything we put on the page.',
  values = DEFAULT_VALUES,
  id,
}) => {
  const headingId = id ? `${id}-heading` : 'core-values-heading'
  return (
    <section className={styles.section} aria-labelledby={headingId} id={id}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
          </div>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        <ul className={styles.grid}>
          {values.map((value, idx) => {
            const tone = value.tone ?? 'purple'
            const offsetClass = idx === 1 ? styles.valueOffset : ''
            return (
              <li
                key={idx}
                className={`${styles.value} ${TONE_CLASS[tone]} ${offsetClass}`}
              >
                <span className={styles.numberMark} aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueBody}>{value.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
