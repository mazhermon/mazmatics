import Head from 'next/head'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'

interface FontCandidate {
  id: string
  name: string
  family: string
  weight: number
  category: string
  note: string
  /** Value to paste into globals.css for `--font-headings-display` if picked. */
  cssValue: string
}

const FONTS: FontCandidate[] = [
  {
    id: 'bungee-shade',
    name: 'Bungee Shade',
    family: "'Bungee Shade', cursive",
    weight: 400,
    category: 'Current',
    note: 'Current pick. Chunky 3D-shadow letterforms. Maximum personality, maximum noise.',
    cssValue: "'Bungee Shade', 'Outfit', sans-serif",
  },
  {
    id: 'bagel-fat-one',
    name: 'Bagel Fat One',
    family: "'Bagel Fat One', sans-serif",
    weight: 400,
    category: 'Round / playful',
    note: 'Round and chunky. Friendly without tipping into childish. Good for a kids-but-not-toddler brand.',
    cssValue: "'Bagel Fat One', 'Outfit', sans-serif",
  },
  {
    id: 'lilita-one',
    name: 'Lilita One',
    family: "'Lilita One', sans-serif",
    weight: 400,
    category: 'Round / playful',
    note: 'Italic-only rounded bold. Slight sporty tilt. Carries warmth.',
    cssValue: "'Lilita One', 'Outfit', sans-serif",
  },
  {
    id: 'caprasimo',
    name: 'Caprasimo',
    family: "'Caprasimo', serif",
    weight: 400,
    category: 'Chunky serif',
    note: 'Chunky display serif. Editorial warmth with character. Reads as confident, not corporate.',
    cssValue: "'Caprasimo', 'Outfit', serif",
  },
  {
    id: 'bowlby-one-sc',
    name: 'Bowlby One SC',
    family: "'Bowlby One SC', sans-serif",
    weight: 400,
    category: 'Heavy / poster',
    note: 'Heavy condensed all-caps. Big newspaper-headline energy. Strong without ornament.',
    cssValue: "'Bowlby One SC', 'Outfit', sans-serif",
  },
  {
    id: 'fraunces-black',
    name: 'Fraunces 900',
    family: "'Fraunces', serif",
    weight: 900,
    category: 'Modern serif',
    note: 'Variable serif with optical-size axis. Black weight feels playful-editorial — sophisticated but not stiff.',
    cssValue: "'Fraunces', 'Outfit', serif",
  },
  {
    id: 'big-shoulders-black',
    name: 'Big Shoulders Display 900',
    family: "'Big Shoulders Display', sans-serif",
    weight: 900,
    category: 'Heavy / poster',
    note: 'Tall tight poster sans. Confident, slightly newsprint, holds up at very large sizes.',
    cssValue: "'Big Shoulders Display', 'Outfit', sans-serif",
  },
  {
    id: 'bricolage-black',
    name: 'Bricolage Grotesque 800',
    family: "'Bricolage Grotesque', sans-serif",
    weight: 800,
    category: 'Modern grotesque',
    note: 'Modern variable sans. Editorial-tight. Quiet enough to live everywhere; bold enough to anchor.',
    cssValue: "'Bricolage Grotesque', 'Outfit', sans-serif",
  },
  {
    id: 'anton',
    name: 'Anton',
    family: "'Anton', sans-serif",
    weight: 400,
    category: 'Condensed',
    note: 'Strong condensed sans. Brutalist poster vibe. Saves horizontal space at huge sizes.',
    cssValue: "'Anton', 'Outfit', sans-serif",
  },
  {
    id: 'unbounded-black',
    name: 'Unbounded 800',
    family: "'Unbounded', sans-serif",
    weight: 800,
    category: 'Geometric',
    note: 'Modern geometric display. Tech-flavoured. Reads as future-facing rather than book-warm.',
    cssValue: "'Unbounded', 'Outfit', sans-serif",
  },
]

const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2' +
  '?family=Bungee+Shade' +
  '&family=Bagel+Fat+One' +
  '&family=Lilita+One' +
  '&family=Caprasimo' +
  '&family=Bowlby+One+SC' +
  '&family=Fraunces:opsz,wght@9..144,400..900' +
  '&family=Big+Shoulders+Display:wght@400..900' +
  '&family=Bricolage+Grotesque:wght@400..800' +
  '&family=Anton' +
  '&family=Unbounded:wght@400..800' +
  '&display=swap'

const FontsPickerPage = () => {
  const { mathsWord = 'maths' } = useContext(AppContext)

  return (
    <div style={pageStyle}>
      <Head>
        <title>Display font picker (temporary)</title>
        <meta name="robots" content="noindex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
      </Head>

      <header style={headerStyle}>
        <p style={eyebrowStyle}>Internal · temporary</p>
        <h1 style={pageTitleStyle}>Display font picker</h1>
        <p style={leadStyle}>
          Ten candidates to replace Bungee Shade as{' '}
          <code style={codeStyle}>--font-headings-display</code>. Each row
          previews the same hero phrase, the &ldquo;01&rdquo; numeric mark, and
          the &ldquo;Mazmatics&rdquo; wordmark, so you can compare like-for-like.
          When you pick one, change the variable in{' '}
          <code style={codeStyle}>styles/globals.css</code> and update{' '}
          <code style={codeStyle}>pages/_document.js</code>&apos;s{' '}
          <code style={codeStyle}>&lt;link&gt;</code> to load it instead of
          Bungee Shade.
        </p>
      </header>

      <main style={listStyle}>
        {FONTS.map((font, idx) => (
          <article key={font.id} style={rowStyle}>
            <div style={metaColStyle}>
              <p style={rowIndexStyle}>
                {String(idx + 1).padStart(2, '0')}
              </p>
              <h2 style={fontNameStyle}>{font.name}</h2>
              <p style={categoryStyle}>{font.category}</p>
              <p style={noteStyle}>{font.note}</p>
              <pre style={codeBlockStyle}>{`--font-headings-display: ${font.cssValue};`}</pre>
            </div>

            <div style={previewColStyle}>
              <span
                style={{
                  ...wordmarkStyle,
                  fontFamily: font.family,
                  fontWeight: font.weight,
                }}
              >
                Mazmatics
              </span>

              <p
                style={{
                  ...numberSampleStyle,
                  fontFamily: font.family,
                  fontWeight: font.weight,
                }}
                aria-hidden="true"
              >
                01
              </p>

              <p
                style={{
                  ...heroSampleStyle,
                  fontFamily: font.family,
                  fontWeight: font.weight,
                }}
              >
                Liking {mathsWord} is a superpower.
              </p>
            </div>
          </article>
        ))}
      </main>

      <footer style={footerStyle}>
        <p>
          Once you pick: replace the <code style={codeStyle}>'Bungee Shade'</code>{' '}
          family in <code style={codeStyle}>styles/globals.css</code> with the
          chosen one, and swap the Google Fonts <code style={codeStyle}>&lt;link&gt;</code>{' '}
          in <code style={codeStyle}>pages/_document.js</code>. Then delete this
          page.
        </p>
      </footer>
    </div>
  )
}

export default FontsPickerPage

// --- Inline styles (page is throwaway; no need to spawn a CSS module) ---

const pageStyle: React.CSSProperties = {
  background: 'oklch(0.99 0.005 290)',
  color: 'oklch(0.22 0.015 290)',
  minHeight: '100vh',
  padding: '4rem 1.5rem 6rem',
  fontFamily: "'Outfit', system-ui, sans-serif",
}

const headerStyle: React.CSSProperties = {
  maxWidth: '880px',
  margin: '0 auto 4rem',
}

const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'oklch(0.55 0.14 75)',
}

const pageTitleStyle: React.CSSProperties = {
  margin: '0.5rem 0 1rem',
  fontSize: 'clamp(2rem, 5vw, 3.4rem)',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  lineHeight: 1.05,
}

const leadStyle: React.CSSProperties = {
  margin: 0,
  maxWidth: '60ch',
  fontSize: '1.05rem',
  lineHeight: 1.6,
  color: 'oklch(0.42 0.018 290)',
}

const codeStyle: React.CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '0.92em',
  background: 'oklch(0.95 0.012 290)',
  padding: '0.1em 0.35em',
  borderRadius: '4px',
}

const listStyle: React.CSSProperties = {
  maxWidth: '1180px',
  margin: '0 auto',
  display: 'grid',
  gap: '4rem',
}

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
  gap: '2.5rem',
  paddingBottom: '4rem',
  borderBottom: '1px solid oklch(0.92 0.01 290)',
}

const metaColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.45rem',
}

const previewColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  alignItems: 'flex-start',
}

const rowIndexStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'oklch(0.55 0.14 75)',
  letterSpacing: '0.18em',
}

const fontNameStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.4rem',
  fontWeight: 700,
  letterSpacing: '-0.01em',
}

const categoryStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '0.82rem',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'oklch(0.5 0.16 295)',
}

const noteStyle: React.CSSProperties = {
  margin: 0,
  maxWidth: '52ch',
  lineHeight: 1.6,
  color: 'oklch(0.42 0.018 290)',
}

const codeBlockStyle: React.CSSProperties = {
  margin: '0.75rem 0 0',
  padding: '0.75rem 1rem',
  background: 'oklch(0.97 0.01 290)',
  borderRadius: '6px',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '0.85rem',
  overflowX: 'auto',
  whiteSpace: 'pre',
}

const wordmarkStyle: React.CSSProperties = {
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  letterSpacing: '-0.02em',
  color: 'oklch(0.5 0.16 295)',
  lineHeight: 1,
}

const numberSampleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 'clamp(4rem, 12vw, 9rem)',
  letterSpacing: '-0.04em',
  color: 'oklch(0.55 0.14 75)',
  lineHeight: 0.85,
}

const heroSampleStyle: React.CSSProperties = {
  margin: 0,
  maxWidth: '20ch',
  fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
  letterSpacing: '-0.02em',
  lineHeight: 1.05,
  color: 'oklch(0.22 0.015 290)',
}

const footerStyle: React.CSSProperties = {
  maxWidth: '880px',
  margin: '4rem auto 0',
  paddingTop: '2rem',
  borderTop: '1px solid oklch(0.92 0.01 290)',
  fontSize: '0.95rem',
  color: 'oklch(0.42 0.018 290)',
  lineHeight: 1.6,
}
