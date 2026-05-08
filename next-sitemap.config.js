/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mazmatics.com',
  generateRobotsTxt: false,
  exclude: [
    // legacy routes — redirected in next.config.js
    '/stockists',
    '/wholesalers',
    '/get-the-book/get-from-amazon',
    '/feedback',
    '/write-a-review/review-on-amazon',
    // form-only routes with no organic-search value (also have noindex meta)
    '/join-mailing-list',
  ],

  /**
   * Differentiate priority + change-frequency so Google understands which
   * pages are most important. Higher priority is a *relative* hint within
   * this site, not an absolute ranking signal — so we surface the routes
   * that drive sales (home + buy + free sample) above secondary content.
   */
  transform: async (config, path) => {
    const PRIORITIES = {
      '/': 1.0,
      '/get-the-book': 0.9,
      '/free-sample': 0.85,
      '/about': 0.8,
      '/write-a-review': 0.6,
    }
    const CHANGEFREQ = {
      '/': 'weekly',
      '/get-the-book': 'monthly',
      '/free-sample': 'monthly',
      '/about': 'monthly',
      '/write-a-review': 'monthly',
    }
    return {
      loc: path,
      changefreq: CHANGEFREQ[path] ?? 'monthly',
      priority: PRIORITIES[path] ?? 0.5,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}
