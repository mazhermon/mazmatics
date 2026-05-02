import Head from 'next/head'
import { useRouter } from 'next/router'

export interface SiteHeadProps {
  title?: string
  description?: string
  ogImage?: string
  noIndex?: boolean
  schemaJsonLd?: Record<string, unknown>
}

const SITE_NAME = 'Mazmatics'
const DEFAULT_TITLE = 'Mazmatics — Fun maths book for kids 7-10'
const DEFAULT_DESCRIPTION =
  'Help kids say "I like math". A paperback activity & story book for ages 7-10, available on Amazon.'
// Placeholder OG image (book cover at 900x1350). Maz to supply a designed
// 1200x630 PNG when convenient; update DEFAULT_OG_IMAGE_WIDTH/HEIGHT then.
const DEFAULT_OG_IMAGE = 'https://mazmatics.com/og/home.jpg'
const DEFAULT_OG_IMAGE_WIDTH = '900'
const DEFAULT_OG_IMAGE_HEIGHT = '1350'
const SITE_ORIGIN = 'https://mazmatics.com'

export const SiteHead: React.FC<SiteHeadProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  schemaJsonLd,
}) => {
  const router = useRouter()
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : DEFAULT_TITLE
  const canonical = `${SITE_ORIGIN}${router.asPath.split('?')[0].split('#')[0]}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={DEFAULT_OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={DEFAULT_OG_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content="Mazmatics: Fun Math 4 Kids Vol. 1 paperback book cover" />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />

      {schemaJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      )}
    </Head>
  )
}
