# Validate social previews on the live site

Now that the SEO meta + structured data is shipped to production, run each URL through three validators to confirm previews actually render the way they're meant to. This catches issues that the build can't — cached CDN images, malformed JSON-LD, OG image dimensions getting cropped, character escaping issues, etc.

**Time:** 15–20 minutes for all five URLs across all three validators.

**You'll need:** no logins required for any of these tools (some prompt to sign in for advanced features — you can skip).

**The five URLs we're checking:**

```
https://mazmatics.com/
https://mazmatics.com/about
https://mazmatics.com/get-the-book
https://mazmatics.com/free-sample
https://mazmatics.com/write-a-review
```

---

## 1. Facebook Sharing Debugger (~5 min)

**Tool:** https://developers.facebook.com/tools/debug/

This is the one that catches the most issues — Facebook's preview cache is the most aggressive, and it shows you the same preview that LinkedIn, Slack, WhatsApp, Discord, and most messaging apps will use (they all read OG tags the same way).

### For each URL

1. Paste the URL into the input field.
2. Click **"Debug"**.
3. Look at the preview card on the right. You should see:
   - The book cover as the image
   - The page title (matches what you'd see in the browser tab)
   - The meta description (1–2 sentences)
4. **Important:** click **"Scrape Again"** (top-right of the result). Facebook caches the last-fetched OG data for ~24 hours per URL. If you've changed meta tags recently, the cache shows stale data until you force a re-scrape.
5. If anything looks wrong — wrong image, missing title, cropped strangely — let me know.

### What to expect

- All five URLs should render a card with the book cover. The image is **900×1350 portrait** so it'll appear cropped/letterboxed in Facebook's preview (which expects 1200×630 landscape). That's a known issue and not a bug — per-page 1200×630 OG images is a separate task in `founder-actions.md`.
- Titles + descriptions should be specific per page (we wrote them in the SEO commits).
- "og:type" should be `book` for home/get-the-book/free-sample, `profile` for /about, `website` for /write-a-review.

### Common warnings you can ignore

- **"Inferred property"** warnings — Facebook didn't see an explicit tag, so it guessed. We set everything explicitly, so this mostly won't show.
- **"og:image:size too small"** — only if Facebook complains the image is <200×200. Ours is 900×1350, far above the minimum.

### Common errors that matter

- **"Cannot find og:image"** — broken image URL. Fixable.
- **"Image could not be downloaded"** — image URL returns 4xx/5xx. Fixable.
- **"Object type required"** — missing `og:type`. Shouldn't happen — we set it on every page.

---

## 2. Twitter / X Card Validator (~3 min)

**Tool:** https://cards-dev.twitter.com/validator

X (formerly Twitter) renamed but kept the same URL. The validator may prompt for a login — you can dismiss that prompt and use the public preview tool.

### For each URL

1. Paste the URL.
2. Click **"Preview card"**.
3. You should see a `summary_large_image` card with the book cover + title + description.

### What to expect

- All five URLs should show `summary_large_image`. The book cover image will be center-cropped to roughly 16:9 by Twitter — that's their card design, not a bug.
- Description should match what's in the meta tags.

### If the validator is unavailable

X has periodically taken the validator offline or moved it. If `cards-dev.twitter.com/validator` 404s or won't load, the **OpenGraph.xyz** preview tool (https://www.opengraph.xyz/) shows roughly equivalent previews for Twitter and works most of the time.

You can also just paste a URL into Slack, Discord, or LinkedIn and look at the preview — they all use the same OG tags.

---

## 3. Google Rich Results Test (~5 min)

**Tool:** https://search.google.com/test/rich-results

This tests the JSON-LD structured data — the schema we use to tell Google what type of content each page contains. When schemas parse correctly, Google can show enhanced search results (star ratings, book listings, author info).

### For each URL

1. Paste the URL.
2. Click **"Test URL"** (or hit Enter).
3. Wait ~10 seconds for Google to fetch the page and parse the schemas.

### What to expect per page

| Page | Detected items |
|------|----------------|
| `/` (home) | `Book` + `Person` + `WebSite` + `Organization` — 4 entities in our `@graph` |
| `/about` | `Person` (Maz Hermon, with sameAs to Instagram + Facebook) |
| `/get-the-book` | `Book` (with audience, format, page count) |
| `/free-sample` | `Book` (marked `isAccessibleForFree: true`) |
| `/write-a-review` | None — this page deliberately doesn't have structured data (no entity worth describing) |

Each detected item should show:
- **No errors** (red) — would block rich results
- **0 warnings** ideally, but a small number of warnings about optional fields is fine

### Warnings you can ignore

- **"Missing field 'aggregateRating'"** on Book — we don't have AggregateRating yet because it needs your real Amazon review numbers (~~~5 minutes of input from you once you have them~~~ — flagged in `founder-actions.md`).
- **"Missing field 'offers'"** on Book — Amazon's the seller, not us; we don't list a price on our site. Optional field.
- **"Missing recommended field 'image'"** on Person — `/about` Person schema currently uses `lindyLarge.png` which is the character, not Maz's photo. Optional. Could swap to a real photo of you if/when you have one you'd put online.

### Errors that matter

- **"Invalid JSON-LD"** — schema is malformed. Tell me which page and I'll fix.
- **"Parsing error: ..."** — something in the schema can't be read. Same — tell me.

---

## After all three are clean

- [ ] Mark this section ✅ in `founder-actions.md`
- [ ] **Next:** reactivate Instagram + Facebook with the "Mazmatics has a new home" pulse post. See `founder-actions.md` for the post copy.

---

## Cache invalidation reminder

The most common reason a validator shows the *wrong* preview is **caching, not code**. If you change meta tags and re-deploy:

| Validator | How to force refresh |
|-----------|---------------------|
| Facebook | Click **"Scrape Again"** in the debugger |
| Twitter | Preview is fresh each time you paste; rarely caches |
| Google | Click **"Test URL"** again. Search Console's "URL Inspection → Request Indexing" is the next-level option but takes hours |
| LinkedIn | https://www.linkedin.com/post-inspector/ — paste URL, click Inspect, choose "Force re-fetch" |
| WhatsApp | Cache lives on each user's device, ~7 days. No remote invalidation. |

Some platforms (Slack, Discord, Telegram, Messenger) don't have an explicit "re-scrape" — they cache for a few days and refresh on their own schedule.

---

## What I (Claude) can fix if you find issues

- Malformed JSON-LD or missing schema fields
- Wrong OG image dimensions / wrong image URL
- Missing or incorrect titles/descriptions
- New canonical issues
- The 5 URLs all returning identical OG image (per-page custom images is a separate task in `founder-actions.md`)

Paste the error message + which validator + which URL, and I'll patch.
