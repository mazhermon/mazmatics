import styles from './testimonial.module.css'

type Props = {
  quote: string
  person: string
}

export const Testimonial: React.FC<Props> = ({ person, quote }) => (
  <div className={styles.testimonial}>
    <div className={styles.leftQuote}>&ldquo;</div>
    {quote}
    <span className={styles.rightQuote}>&rdquo;</span>
    <div className={styles.footer}>
      – <span className={styles.person}>{person}</span>
    </div>
  </div>
)
