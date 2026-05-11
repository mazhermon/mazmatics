import { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import styles from './free-sample.module.css'
import { AppContext } from '../../context/appContext'
import { LookInside } from '../../components/LookInside'
import { MailingSignup } from '../../components/mailingSignup'
import {
  STOREFRONTS,
  regionForCountry,
  shippingCopyForCountry,
} from '../../lib/locale'
import { useResolvedCountry } from '../../context/services/useResolvedCountry'
import { trackAmazonCTA, trackFreeSampleDownload } from '../../lib/gtag'

const SAMPLE_PDF =
  '/downloads/Mazmatics_FunMathForKids_vol1_Free_Sample_PDF.pdf'

const FreeSample = () => {
  const { mathsWord = 'maths' } = useContext(AppContext)
  const country = useResolvedCountry()
  const region = regionForCountry(country)
  const matched = STOREFRONTS[region]
  const shipping = shippingCopyForCountry(country)

  const onDownload = () => {
    trackFreeSampleDownload()
  }

  const onAmazon = () =>
    trackAmazonCTA({ region, location: 'free_sample_footer' })

  return (
    <div className={styles.page}>
      <Head>
        <title>{`Free sample — Mazmatics Fun Math 4 Kids`}</title>
        <meta
          name="description"
          content={`Three sample pages from Mazmatics Fun Math 4 Kids Vol. 1. Print it or open on a screen — see if it clicks for your kid before you buy.`}
        />
        <link
          rel="canonical"
          href="https://mazmatics.com/free-sample"
        />
        <meta property="og:type" content="book" />
        <meta property="og:site_name" content="Mazmatics" />
        <meta
          property="og:title"
          content={`Free sample — Mazmatics Fun Math 4 Kids`}
        />
        <meta
          property="og:description"
          content={`Three sample pages from the book. Print it or open on a screen — see if it clicks for your kid before you buy.`}
        />
        <meta
          property="og:url"
          content="https://mazmatics.com/free-sample"
        />
        <meta
          property="og:image"
          content="https://mazmatics.com/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg"
        />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="1350" />
        <meta
          property="og:image:alt"
          content="Mazmatics Fun Math 4 Kids Vol. 1 book cover"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Free sample — Mazmatics Fun Math 4 Kids`}
        />
        <meta
          name="twitter:description"
          content="Three free sample pages from the activity book. See if it clicks before you buy."
        />
        <meta
          name="twitter:image"
          content="https://mazmatics.com/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://mazmatics.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Free sample',
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Book',
              name: 'Mazmatics: Fun Math 4 Kids Vol. 1 — Free sample',
              author: {
                '@type': 'Person',
                '@id': 'https://mazmatics.com/about#maz',
                name: 'Maz Hermon',
                url: 'https://mazmatics.com/about',
              },
              inLanguage: 'en',
              bookFormat: 'https://schema.org/EBook',
              isAccessibleForFree: true,
              audience: {
                '@type': 'PeopleAudience',
                suggestedMinAge: 7,
                suggestedMaxAge: 10,
              },
              image:
                'https://mazmatics.com/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg',
              description: `A three-page PDF sample of Mazmatics Fun Math 4 Kids Vol. 1. Free download to try before you buy the paperback.`,
              publisher: { '@type': 'Organization', name: 'Mazmatics' },
              url: 'https://mazmatics.com/free-sample',
            }),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section
        className={styles.hero}
        aria-labelledby="free-sample-heading"
      >
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Try before you buy</p>
          <h1 id="free-sample-heading" className={styles.title}>
            Free sample.
          </h1>
          <p className={styles.lede}>
            A few pages from the book — print them or read on a screen.
            See if it clicks for your kid before you buy.
          </p>

          <a
            href={SAMPLE_PDF}
            download
            onClick={onDownload}
            className={styles.primary}
          >
            <span className={styles.primaryLabel}>
              Download the sample
            </span>
            <span aria-hidden="true" className={styles.primaryArrow}>
              &darr;
            </span>
          </a>
          <p className={styles.fineprint}>
            PDF · A4 &amp; US Letter friendly
          </p>
        </div>
      </section>

      <section
        className={styles.preview}
        aria-labelledby="preview-heading"
      >
        <div className={styles.previewInner}>
          <p className={styles.eyebrowAlt}>What’s in the sample</p>
          <h2 id="preview-heading" className={styles.previewTitle}>
            A taste of the book.
          </h2>
          <p className={styles.previewLede}>
            Tap any page to see it bigger.
          </p>
        </div>
        <div className={styles.previewStripWrap}>
          <LookInside variant="showcase" heading={null} />
        </div>
      </section>

      <section
        className={styles.printNote}
        aria-labelledby="print-note-heading"
      >
        <div className={styles.printInner}>
          <p className={styles.eyebrow}>One small thing</p>
          <h2 id="print-note-heading" className={styles.printTitle}>
            Print it for the real thing.
          </h2>
          <p className={styles.printBody}>
            The book is meant to be drawn on, traced, doodled. The PDF
            works on screen, but a printed copy is much closer to the
            full experience.
          </p>
        </div>
      </section>

      <section
        className={styles.finalCta}
        aria-labelledby="final-cta-heading"
      >
        <div className={styles.finalCtaInner}>
          <p className={styles.eyebrow}>If it clicks</p>
          <h2 id="final-cta-heading" className={styles.finalCtaTitle}>
            Get the whole book.
          </h2>
          <p className={styles.finalCtaBody}>
            Paperback · 145 pages · kids 7–10 (US grade 2–4).
          </p>

          <a
            href={matched.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onAmazon}
            className={styles.amazonBtn}
          >
            <span className={styles.amazonLabel}>{matched.label}</span>
            <span aria-hidden="true" className={styles.amazonArrow}>
              &rarr;
            </span>
          </a>
          {shipping && (
            <p className={styles.shipping}>{shipping}</p>
          )}

          <p className={styles.aboutAuthor}>
            Made by{' '}
            <Link href="/about" className={styles.aboutLink}>
              Maz Hermon
              <span aria-hidden="true">&nbsp;&rarr;</span>
            </Link>
            , a dad in Aotearoa drawing every page so kids can meet{' '}
            {mathsWord} on friendly ground.
          </p>
        </div>
      </section>

      <MailingSignup
        location="free_sample_band"
        eyebrow="One more thing"
        heading={`Want a free printable ${mathsWord} mobile too?`}
        lede="Pop your email in below — we'll send the print straight away, and let you know when Vol. 2 ships."
        cta="Send me the print"
        incentive={{
          downloadUrl: '/downloads/Mazmatics_PrintableMathsMobile.pdf',
          downloadLabel: 'Download the print',
          postSubmitHint: `Print on A4, trim along the cut lines, hang from string or wire above your kid's desk or bed.`,
        }}
      />
    </div>
  )
}

export default FreeSample
