import styles from './banner.module.css'

type Props = {
  className: any
}

export const Banner: React.FC<Props> = ({ className }) => (
  <div className={`${styles.banner} ${className}`}>
    <p className={styles.banner__mainText}>Fun Math 4 kids book</p>
    <p>Volume 1 – coming soon</p>
  </div>
)
