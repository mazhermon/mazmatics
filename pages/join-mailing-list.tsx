import React from 'react'
import Head from 'next/head'

import { MailingSignup } from '../components/mailingSignup'

const JoinMailingList = () => {
  return (
    <>
      <Head>
        <title>Join the mailing list — Mazmatics</title>
        <meta
          name="description"
          content="Join the Mazmatics mailing list — be first when Vol. 2 ships, plus the occasional behind-the-scenes from Maz."
        />
        <link
          rel="canonical"
          href="https://mazmatics.com/join-mailing-list"
        />
        {/* Signup form isn't a useful organic landing page — keep out of search
            so visitors find home/get-the-book first. */}
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MailingSignup
        location="standalone_page"
        eyebrow="Free print + Vol. 2 updates"
        heading="Hang a printable maths mobile in your kid's room."
        lede="Free A4 print, sent to your inbox straight away. You'll also be first to hear when Vol. 2 ships, plus the occasional behind-the-scenes from a Wellington dad still drawing maths jokes. We don't email often."
        cta="Send me the print"
        incentive={{
          downloadUrl: '/downloads/Mazmatics_PrintableMathsMobile.pdf',
          downloadLabel: 'Download the print',
          postSubmitHint: `Print on A4, trim along the cut lines, hang from string or wire.`,
        }}
      />
    </>
  )
}
export default JoinMailingList
