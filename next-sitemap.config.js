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
}
