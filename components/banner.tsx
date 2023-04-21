import styles from './banner.module.css'
import { Container } from './Container'

type Props = {
  className?: string
  title: string
  subtitle?: string
  size?: 'small' | 'med' | 'large'
  color?: 'yellow' | 'purple'
  children?: React.ReactNode
  waves?: boolean
  variant?: 'fun'
}

export const Banner: React.FC<Props> = ({
  className,
  title,
  color,
  subtitle,
  size,
  children,
  waves,
  variant,
}) => (
  <div
    className={`${styles.banner} ${className} 
        ${size ? styles[size] : styles.med}
        ${color ? styles[color] : styles.yellow}
        ${variant && styles[variant]}
    `}
  >
    {waves && (
      <div className={`${styles.waves}`}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    )}
    <div className={`${styles.banner__content} bannerContent`}>
      <Container>
        <p className={styles.banner__mainText}>{title}</p>
        <p>{subtitle}</p>
        {children}
      </Container>
    </div>
  </div>
)
