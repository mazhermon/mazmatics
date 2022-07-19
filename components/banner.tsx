import styles from './banner.module.css'

type Props = {
  className?: string
  title: string
  subtitle?: string
  size?: 'small' | 'med' | 'large'
  color?: 'yellow' | 'purple'
  children?: React.ReactNode
}

export const Banner: React.FC<Props> = ({
  className,
  title,
  color,
  subtitle,
  size,
  children,
}) => (
  <div
    className={`${styles.banner} ${className} 
        ${size ? styles[size] : styles.med}
        ${color ? styles[color] : styles.yellow}
    `}
  >
    <p className={styles.banner__mainText}>{title}</p>
    <p>{subtitle}</p>
    {children}
  </div>
)
