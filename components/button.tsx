import React from 'react'
import Link from 'next/link'

import styles from './button.module.css'

type Props = {
  href?: string
  external?: boolean
  children?: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export const Button: React.FC<Props> = ({
  children,
  href,
  variant,
  external,
  className,
}) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} ${styles.buttonLinkEl} ${
          variant === 'primary' && styles.primary
        }`}
      >
        {children}
      </a>
    )
  }
  if (href) {
    return (
      <Link href={href}>
        <a
          className={`${className} ${styles.buttonLinkEl} ${
            variant === 'primary' && styles.primary
          }`}
        >
          {children}
        </a>
      </Link>
    )
  }

  return (
    <button
      className={`${className} ${styles.button} ${styles.buttonRealButton}`}
    >
      {children}
    </button>
  )
}
