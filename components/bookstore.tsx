import React from 'react'

import styles from './bookstore.module.css'

type Props = {
  name: string
  location: string
  phone?: string
  website?: string
  image?: string
  children?: React.ReactNode
  url?: string
}

export const BookStore: React.FC<Props> = ({
  name,
  location,
  phone,
  website,
  url,
  image,
  children,
}) => {
  return (
    <div className={styles.bookstore}>
      {image && <div className={styles.bookstore__image}></div>}

      <div className={styles.bookstore__info}>
        <h3 className={styles.name}>
          <a href={url} className={styles.nameLink}>
            {name}
          </a>
        </h3>
        <div className={styles.address}>{location}</div>
        <a href={url} className={styles.website}>
          {website}
        </a>
        <a
          href={`tel:${phone?.trim().replace(' ', '')}`}
          className={styles.phone}
        >
          {phone}
        </a>
        <p className={styles.description}>{children}</p>
      </div>
    </div>
  )
}
