import React from 'react'

import styles from './container.module.css'

type Props = {
  children: React.ReactNode
}

export const Container: React.FC<Props> = ({ children }) => (
  <div className={styles.container}>{children}</div>
)
