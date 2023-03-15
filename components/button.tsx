import React from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'

import styles from './button.module.css'

type Props = {
  href?: string
  external?: boolean
  fullWidth?: boolean
  children?: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
}

export const Button: React.FC<Props> = ({
  children,
  fullWidth,
  href,
  variant,
  external,
  className,
  onClick,
}) => {
  const buttonLinkStyles = clsx(className, {
    [styles.buttonLinkEl]: true,
    [styles.primary]: variant === 'primary',
    [styles.fullWidth]: fullWidth,
  })
  console.log('say what')
  // const fullWidthClass = fullWidth ? styles.fullWidth : 'dogs'
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonLinkStyles}
      >
        {children}
      </a>
    )
  }
  if (href) {
    return (
      <Link href={href}>
        <a className={buttonLinkStyles}>{children}</a>
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={buttonLinkStyles}>
      {children}
    </button>
  )
}
