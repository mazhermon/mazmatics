import React from 'react'

import styles from './container.module.css'

type Props = {
  children: React.ReactNode
  className?: string
  bgColor?: string
}

export const Container: React.FC<Props> = ({
  children,
  className,
  bgColor,
}) => (
  <div
    className={`${styles.container} ${
      bgColor ? styles[bgColor] : 'dog'
    } ${className}`}
  >
    {children}
  </div>
)
