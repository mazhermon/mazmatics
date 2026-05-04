import Head from 'next/head'

interface ButtonStyle {
  id: string
  name: string
  category: string
  note: string
  primary: React.CSSProperties
  primaryHoverHint?: string
  secondary: React.CSSProperties
  secondaryHoverHint?: string
  /** wrapper (for any pseudo-frame the variant needs) */
  wrap?: React.CSSProperties
}

const STYLES: ButtonStyle[] = [
  {
    id: 'current',
    name: 'Current (yellow + gray)',
    category: 'Reference',
    note: 'What is on the home page right now. Yellow primary, soft gray secondary, both with a chunky bottom border.',
    primary: {
      background: '#f6e632',
      color: 'oklch(0.22 0.015 290)',
      border: '2px solid rgba(102, 79, 169, 0.45)',
      borderBottomWidth: '4px',
      borderRadius: '999px',
      padding: '0.75rem 1.4rem',
    },
    secondary: {
      background: '#f0eded',
      color: 'oklch(0.22 0.015 290)',
      border: '2px solid rgba(73, 69, 81, 0.25)',
      borderBottomWidth: '4px',
      borderRadius: '999px',
      padding: '0.75rem 1.4rem',
    },
  },
  {
    id: 'purple-solid-ghost',
    name: 'Purple solid + ghost outline',
    category: 'Modern',
    note: 'Brand purple primary, outlined ghost secondary. Quiet, professional, clear hierarchy.',
    primary: {
      background: 'oklch(0.5 0.16 295)',
      color: '#fff',
      border: '1.5px solid oklch(0.5 0.16 295)',
      borderRadius: '999px',
      padding: '0.85rem 1.6rem',
    },
    secondary: {
      background: 'transparent',
      color: 'oklch(0.5 0.16 295)',
      border: '1.5px solid oklch(0.5 0.16 295)',
      borderRadius: '999px',
      padding: '0.85rem 1.6rem',
    },
  },
  {
    id: 'yellow-thick-black',
    name: 'Yellow filled + thick black border',
    category: 'Poster / playful',
    note: 'Bold cartoonish energy. High contrast and reads like a kids-book sticker.',
    primary: {
      background: '#f6e632',
      color: 'oklch(0.18 0.01 290)',
      border: '3px solid oklch(0.18 0.01 290)',
      borderRadius: '12px',
      padding: '0.75rem 1.4rem',
      boxShadow: '4px 4px 0 oklch(0.18 0.01 290)',
    },
    secondary: {
      background: '#fff',
      color: 'oklch(0.18 0.01 290)',
      border: '3px solid oklch(0.18 0.01 290)',
      borderRadius: '12px',
      padding: '0.75rem 1.4rem',
      boxShadow: '4px 4px 0 oklch(0.18 0.01 290)',
    },
  },
  {
    id: 'black-filled-text',
    name: 'Black solid primary + text-only secondary',
    category: 'Editorial',
    note: 'Confident editorial pairing. Primary owns the visual weight; secondary is a text link with an arrow.',
    primary: {
      background: 'oklch(0.18 0.01 290)',
      color: '#fff',
      border: 'none',
      borderRadius: '999px',
      padding: '0.85rem 1.6rem',
    },
    secondary: {
      background: 'transparent',
      color: 'oklch(0.5 0.16 295)',
      border: 'none',
      borderRadius: '0',
      padding: '0.85rem 0',
      textDecoration: 'underline',
      textDecorationThickness: '2px',
      textUnderlineOffset: '4px',
    },
  },
  {
    id: 'outline-thick',
    name: 'Outline-only with thick borders',
    category: 'Minimal',
    note: 'No fills, just two outlined buttons. Editorial restraint, full of breathing room.',
    primary: {
      background: 'transparent',
      color: 'oklch(0.5 0.16 295)',
      border: '2.5px solid oklch(0.5 0.16 295)',
      borderRadius: '0',
      padding: '0.85rem 1.6rem',
    },
    secondary: {
      background: 'transparent',
      color: 'oklch(0.18 0.01 290)',
      border: '2.5px solid oklch(0.18 0.01 290)',
      borderRadius: '0',
      padding: '0.85rem 1.6rem',
    },
  },
  {
    id: 'pill-arrow',
    name: 'Purple pill + arrow text link',
    category: 'Modern',
    note: 'Single visual button paired with an inline arrow link. Clean and conversion-focused.',
    primary: {
      background: 'oklch(0.5 0.16 295)',
      color: '#fff',
      border: 'none',
      borderRadius: '999px',
      padding: '0.85rem 1.6rem',
    },
    secondary: {
      background: 'transparent',
      color: 'oklch(0.5 0.16 295)',
      border: 'none',
      borderRadius: '0',
      padding: '0.85rem 0.25rem',
      fontWeight: 600,
    },
    secondaryHoverHint: 'Look inside →',
  },
  {
    id: 'square-shadow',
    name: 'Squared corners + soft shadow',
    category: 'Polished',
    note: 'Slight squircle, soft drop-shadow. Reads like a polished product CTA without going corporate.',
    primary: {
      background: 'oklch(0.5 0.16 295)',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      padding: '0.85rem 1.6rem',
      boxShadow: '0 12px 22px -10px oklch(0.5 0.16 295 / 0.55)',
    },
    secondary: {
      background: '#fff',
      color: 'oklch(0.22 0.015 290)',
      border: '1px solid oklch(0.85 0.03 290)',
      borderRadius: '10px',
      padding: '0.85rem 1.6rem',
      boxShadow: '0 8px 18px -12px oklch(0.18 0.01 290 / 0.25)',
    },
  },
  {
    id: 'text-only',
    name: 'Underlined text-only',
    category: 'Most minimal',
    note: 'No chrome whatsoever. Both actions are typographic links. Strongest editorial restraint.',
    primary: {
      background: 'transparent',
      color: 'oklch(0.5 0.16 295)',
      border: 'none',
      borderRadius: '0',
      padding: '0.5rem 0',
      fontFamily: "'Fraunces', serif",
      fontWeight: 700,
      fontSize: '1.15rem',
      textDecoration: 'underline',
      textDecorationThickness: '3px',
      textDecorationColor: '#f6e632',
      textUnderlineOffset: '5px',
    },
    secondary: {
      background: 'transparent',
      color: 'oklch(0.4 0.018 290)',
      border: 'none',
      borderRadius: '0',
      padding: '0.5rem 0',
      fontFamily: "'Fraunces', serif",
      fontWeight: 500,
      fontSize: '1.05rem',
      textDecoration: 'underline',
      textDecorationThickness: '2px',
      textDecorationColor: 'oklch(0.85 0.03 290)',
      textUnderlineOffset: '5px',
    },
  },
  {
    id: 'gradient-brand',
    name: 'Brand gradient (purple → blue)',
    category: 'Brand revival',
    note: 'Resurrects the existing site purple-to-blue gradient as the primary. Loud, but on-brand.',
    primary: {
      background: 'linear-gradient(to left, #ba90ff, #47a5f1)',
      color: '#fff',
      border: 'none',
      borderRadius: '999px',
      padding: '0.85rem 1.6rem',
      boxShadow: '0 14px 26px -14px oklch(0.45 0.13 245 / 0.6)',
    },
    secondary: {
      background: '#fff',
      color: 'oklch(0.45 0.13 245)',
      border: '1.5px solid oklch(0.45 0.13 245)',
      borderRadius: '999px',
      padding: '0.85rem 1.6rem',
    },
  },
  {
    id: 'two-tone-yellow',
    name: 'Yellow + purple inner border',
    category: 'Mazmatics-flavoured',
    note: 'Yellow body with a thick inner purple border-shadow. Brand-forward, still distinctive.',
    primary: {
      background: '#f6e632',
      color: 'oklch(0.22 0.015 290)',
      border: '2px solid oklch(0.5 0.16 295)',
      borderRadius: '14px',
      padding: '0.85rem 1.6rem',
      boxShadow: 'inset 0 0 0 4px #f6e632, inset 0 0 0 6px oklch(0.5 0.16 295)',
    },
    secondary: {
      background: '#fff',
      color: 'oklch(0.5 0.16 295)',
      border: '2px solid oklch(0.5 0.16 295)',
      borderRadius: '14px',
      padding: '0.85rem 1.6rem',
    },
  },
]

const ButtonsPickerPage = () => (
  <div style={pageStyle}>
    <Head>
      <title>Hero button picker (temporary)</title>
      <meta name="robots" content="noindex" />
    </Head>

    <header style={headerStyle}>
      <p style={eyebrowStyle}>Internal · temporary</p>
      <h1 style={pageTitleStyle}>Hero button picker</h1>
      <p style={leadStyle}>
        Ten styles for the &ldquo;Get the book&rdquo; + &ldquo;Look inside&rdquo;
        pair on the home hero. Each row uses the same labels so the visual
        language is the only thing changing. When you pick one, tell me the row
        number and I&apos;ll wire it into{' '}
        <code style={codeStyle}>homeHeader.module.css</code>.
      </p>
    </header>

    <main style={listStyle}>
      {STYLES.map((style, idx) => (
        <article key={style.id} style={rowStyle}>
          <div>
            <p style={rowIndexStyle}>{String(idx + 1).padStart(2, '0')}</p>
            <h2 style={styleNameStyle}>{style.name}</h2>
            <p style={categoryStyle}>{style.category}</p>
            <p style={noteStyle}>{style.note}</p>
          </div>

          <div style={previewWrapStyle}>
            <div style={previewSurfaceStyle}>
              <div style={ctaRowStyle}>
                <span style={{ ...sharedBtn, ...style.primary }}>
                  Get the book
                </span>
                <span style={{ ...sharedBtn, ...style.secondary }}>
                  {style.secondaryHoverHint ?? 'Look inside'}
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </main>
  </div>
)

export default ButtonsPickerPage

const pageStyle: React.CSSProperties = {
  background: 'oklch(0.99 0.005 290)',
  color: 'oklch(0.22 0.015 290)',
  minHeight: '100dvh',
  padding: '4rem 1.5rem 6rem',
  fontFamily: "'Outfit', system-ui, sans-serif",
}

const headerStyle: React.CSSProperties = {
  maxWidth: '880px',
  margin: '0 auto 4rem',
}

const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "'Big Shoulders Display', sans-serif",
  fontWeight: 900,
  fontSize: '0.85rem',
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: 'oklch(0.55 0.14 75)',
}

const pageTitleStyle: React.CSSProperties = {
  margin: '0.5rem 0 1rem',
  fontFamily: "'Fraunces', serif",
  fontWeight: 900,
  fontVariationSettings: "'opsz' 144",
  fontSize: 'clamp(2rem, 5vw, 3.4rem)',
  letterSpacing: '-0.025em',
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
  gap: '3rem',
}

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
  gap: '2rem',
  paddingBottom: '3rem',
  borderBottom: '1px solid oklch(0.92 0.01 290)',
}

const rowIndexStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "'Big Shoulders Display', sans-serif",
  fontWeight: 900,
  fontSize: '1.1rem',
  letterSpacing: '0.18em',
  color: 'oklch(0.55 0.14 75)',
}

const styleNameStyle: React.CSSProperties = {
  margin: '0.25rem 0 0.25rem',
  fontFamily: "'Fraunces', serif",
  fontWeight: 800,
  fontSize: '1.4rem',
  letterSpacing: '-0.01em',
  lineHeight: 1.15,
}

const categoryStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '0.78rem',
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  color: 'oklch(0.5 0.16 295)',
  fontWeight: 600,
}

const noteStyle: React.CSSProperties = {
  margin: '0.6rem 0 0',
  maxWidth: '46ch',
  lineHeight: 1.55,
  color: 'oklch(0.42 0.018 290)',
}

const previewWrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}

const previewSurfaceStyle: React.CSSProperties = {
  width: '100%',
  padding: '2rem 1.5rem',
  background: '#fff',
  border: '1px dashed oklch(0.85 0.03 290)',
  borderRadius: '12px',
}

const ctaRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignItems: 'center',
}

const sharedBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '0.95rem',
  fontWeight: 700,
  letterSpacing: '0.02em',
  cursor: 'default',
}
