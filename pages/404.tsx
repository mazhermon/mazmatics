import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { useContext } from 'react'

import lindyImage from '../public/images/lindyLarge.png'
import { AppContext } from '../context/appContext'

const NotFoundPage = () => {
  const { mathsWord = 'maths' } = useContext(AppContext)

  return (
    <div style={pageStyle}>
      <Head>
        <title>Page not found · Mazmatics</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div style={contentStyle}>
        <div style={imageStyle} aria-hidden="true">
          <Image
            alt="Lindy the Mazmatics mascot smiling"
            src={lindyImage}
            width={500}
            height={595}
            priority
          />
        </div>

        <p style={eyebrowStyle}>404</p>
        <h1 style={titleStyle}>This page took the day off.</h1>
        <p style={leadStyle}>
          We couldn&apos;t find what you were looking for. The {mathsWord}{' '}
          adventure is still on though.
        </p>
        <div style={ctaRowStyle}>
          <Link href="/" style={primaryBtnStyle}>
            Back to home
          </Link>
          <Link href="/get-the-book" style={secondaryBtnStyle}>
            Get the book
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

const pageStyle: React.CSSProperties = {
  minHeight: 'calc(100dvh - var(--nav-height, 65px))',
  display: 'grid',
  placeItems: 'center',
  padding: '4rem 1.5rem',
  background: 'oklch(0.99 0.005 290)',
  color: 'oklch(0.22 0.015 290)',
}

const contentStyle: React.CSSProperties = {
  maxWidth: '36rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
}

const imageStyle: React.CSSProperties = {
  width: '180px',
  marginBottom: '0.5rem',
}

const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "'Big Shoulders Display', 'Outfit', sans-serif",
  fontWeight: 900,
  fontSize: '0.95rem',
  letterSpacing: '0.32em',
  color: 'oklch(0.5 0.16 295)',
  textTransform: 'uppercase',
}

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "'Fraunces', Georgia, serif",
  fontWeight: 900,
  fontVariationSettings: "'opsz' 144",
  fontSize: 'clamp(2rem, 5vw, 3.2rem)',
  letterSpacing: '-0.025em',
  lineHeight: 1.05,
  maxWidth: '20ch',
}

const leadStyle: React.CSSProperties = {
  margin: '0.5rem 0 1rem',
  maxWidth: '36ch',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1.05rem',
  lineHeight: 1.55,
  color: 'oklch(0.42 0.018 290)',
}

const ctaRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  justifyContent: 'center',
}

const baseBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.75rem 1.4rem',
  borderRadius: '999px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: '0.95rem',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  border: '2px solid transparent',
  borderBottomWidth: '4px',
}

const primaryBtnStyle: React.CSSProperties = {
  ...baseBtn,
  background: '#f6e632',
  color: 'oklch(0.22 0.015 290)',
  borderColor: 'rgba(102, 79, 169, 0.45)',
}

const secondaryBtnStyle: React.CSSProperties = {
  ...baseBtn,
  background: '#f0eded',
  color: 'oklch(0.22 0.015 290)',
  borderColor: 'rgba(73, 69, 81, 0.25)',
}
