/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mazmatics.com',
  generateRobotsTxt: false,
  exclude: [
    // legacy routes — redirected to /get-the-book in next.config.js
    '/stockists',
    '/wholesalers',
    '/get-the-book/get-from-amazon',
    // dev-only style-guide pages (kept in tree for reference, not for search)
    '/buttons',
    '/fonts',
    // form pages with no organic-search value (also have noindex meta)
    '/feedback',
    '/join-mailing-list',
  ],
}
