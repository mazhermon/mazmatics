import React from 'react'
import Link from 'next/link'

import styles from './button.module.css'

type Props = {
  href?: string
  external?: boolean
  children?: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<Props> = ({ children, href, variant }) => {
  if (href) {
    return (
      <Link href={href}>
        <a
          className={`${styles.buttonLinkEl} ${
            variant === 'primary' && styles.primary
          }`}
        >
          Get the book
        </a>
      </Link>
    )
  }

  return (
    <button className={`${styles.button} ${styles.buttonRealButton}`}>
      {children}
    </button>
  )
}
