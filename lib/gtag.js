export const pageview = (url) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

const send = (action, params = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, params)
}

export const event = ({ action, category, label, value }) => {
  send(action, { event_category: category, event_label: label, value })
}

export const trackAmazonCTA = ({ region, location }) => {
  send('amazon_cta_click', {
    event_category: 'cta',
    event_label: location,
    region,
  })
}

export const trackNzShopCTA = ({ location }) => {
  send('nz_shop_cta_click', {
    event_category: 'cta',
    event_label: location,
    region: 'NZ',
  })
}

export const trackMailingListSubmit = (location) => {
  send('mailing_list_submit', {
    event_category: 'conversion',
    event_label: location,
  })
}

export const trackLookInsideOpen = (location) => {
  send('look_inside_open', {
    event_category: 'engagement',
    event_label: location,
  })
}

export const trackNavBuyClick = () => {
  send('nav_buy_click', {
    event_category: 'cta',
    event_label: 'persistent_nav',
  })
}

export const trackFreeSampleDownload = () => {
  send('free_sample_downloaded', {
    event_category: 'conversion',
    event_label: 'free_sample',
  })
}

export const trackIncentiveDownload = (location) => {
  send('incentive_download_clicked', {
    event_category: 'conversion',
    event_label: location,
  })
}
