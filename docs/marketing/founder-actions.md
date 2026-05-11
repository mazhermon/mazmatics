# Founder actions

Things only Maz can do. Most are admin/auth tasks that need a real human + a real email account. None require code.

Time-boxed estimates next to each. Aim to clear the **immediate** list this week — they unlock everything else.

---

## Immediate (this week, ~90 minutes total)

### ~~Search Console + Bing — get the site indexed properly (40 min)~~ ✅ DONE 2026-05-11

Full walk-through (kept for reference): [`setup-search-console.md`](./setup-search-console.md)

- [x] **Google Search Console** — verified via Domain property + DNS TXT record. Sitemap submitted.
- [x] **Bing Webmaster Tools** — site added, sitemap submitted.
- [x] **IndexNow key file** — shipped at `public/3a622ef6925e4808a9ef85a5746fc596.txt`. Public by design (the file IS the key — that's how the protocol works).

**Small follow-up after the deploy lands:**
- [ ] In Bing → IndexNow page, click **Verify / Refresh** so Bing fetches the key file and flips IndexNow status from "Not yet set up" to active. Confirm the file is reachable first: `curl -s https://mazmatics.com/3a622ef6925e4808a9ef85a5746fc596.txt` should print just the key.

**What this gives you:** visibility into what's indexed, what queries you appear for, click-through rates, mobile usability, and **a real backlinks report** (so you know who's linking in). Data starts populating ~2–4 days after first crawl; query data takes about a week.

---

### ~~Validate social previews on the live site (15 min)~~ ✅ DONE 2026-05-11 (14/15 + 1 pending re-verify)

Full walk-through (kept for reference): [`setup-social-validators.md`](./setup-social-validators.md)

Verified 14 of 15 acceptance checks via Claude Desktop in browser mode against all 5 marketing URLs:

- [x] **Facebook Sharing Debugger** — 5/5 URLs return clean HTTP 206. og:type correct per page (book / profile / website), og:image bare-domain direct URL, no "Inferred Property" warnings, only the advisory `fb:app_id` "missing" notice which is always present and benign.
- [x] **Twitter / X Card Validator** — 5/5 render `summary_large_image` with the book cover. (Note: X moved inline preview thumbnails to Tweet Composer — the validator log confirms card load status instead of rendering an image; previews still work fine when actually shared.)
- [x] **Google Rich Results Test** — 4 of 5 URLs detect the expected schema:
  - `/about`, `/get-the-book`, `/free-sample`, `/write-a-review` → **Breadcrumbs (1)** each ✅
  - `/` → expected to show **Logo (1)** — first run reported "No items detected" because Google's Logo detector doesn't reliably traverse `@graph` containers. Fix shipped (Organization hoisted out of @graph + width/height added to logo ImageObject). Awaiting one more deploy + re-test to confirm.

**Small follow-up after the next push lands:**
- [ ] Re-run **only** `https://mazmatics.com/` in Google Rich Results Test (https://search.google.com/test/rich-results). Should now detect **Logo (1)**. Once confirmed, this section is fully ✅.

**Side findings (no action needed):**
- The homepage `og:title` shows "Mazmatics. Fun maths book for kids 7-10" with lowercase 'maths'. Intentional — that's descriptive prose ("a fun maths book"), not the book's proper title. The book's proper title ("Fun Math 4 Kids") is locked in title-context on `/get-the-book`, `/free-sample`, `/write-a-review`.
- 900×1350 portrait image gets cropped in social previews. Per-page custom 1200×630 OG images is a separate deferred task (see further down this doc).

### Reactivate Instagram + Facebook (20 min) — NEXT

Full walk-through: [`setup-social-relaunch.md`](./setup-social-relaunch.md)

- [ ] **Instagram (`@mazmaticsfun4kids`)** — single "we're back" post + bio update
- [ ] **Facebook (`mazmaticsfunforkids`)** — same post mirrored + bio update

The walk-through has 4 post-copy variants to choose from, image-pick guidance, bio copy, hashtag suggestions, and best-time-to-post notes. Pick the variant that sounds most like you and ship it — done in under 20 minutes.

### MailerLite welcome email (15 min)

- [ ] Create a 1-email automation that fires when someone joins the mailing list. Subject line: *"Hi from Mazmatics — and a free sample for your kid"*. Body: 4–6 sentences welcoming them, explaining what Mazmatics is, linking to `/free-sample`. Set the subject + reply-to as your own name (Maz Hermon), not "noreply@".

The 3-email sequence proper can come later. The single welcome covers 80% of the value.

---

## This month (~3 hours total, spread across weeks)

### Decisions to make (think for an evening, then pick)

- [ ] **Privacy policy page?** — you load Google Analytics, which means you arguably need a privacy notice. NZ/AU don't legally require one for a small static site, but the EU does (anyone visiting from EU sees GDPR rules). **Recommendation:** add a 1-page privacy policy at `/privacy` that says, in plain English: "We use Google Analytics to count visits. We don't sell your data. We don't track individuals. If you join our mailing list, we use MailerLite to send emails." Link from footer. I can wire this up — just say go.
- [ ] **Cookie banner?** — only strictly required for EU traffic. Most NZ/AU/US sites of this size skip it. **Recommendation:** skip for now; if EU traffic ever reaches >5% (you'll see this in GSC), revisit.
- [ ] **AggregateRating in JSON-LD** — adds star ratings to your search snippet. Needs honest input: how many Amazon reviews, what's the average. **Send me the numbers (e.g. "12 reviews, 4.8 average") and I'll wire it in.**
- [ ] **Vol. 2 timeline** — what's a realistic ship date? Even "Q4 2026" is enough for me to start drafting the Vol. 2 mailing list signup form and the teaser content.

### Outreach (low-pressure, 30 min/week)

- [ ] **3 NZ/AU parenting accounts** — Instagram. Send a polite DM with the free PDF sample attached. No ask. Just "hi, you might find this useful for your audience."
- [ ] **3 teacher resource sites** (NZmaths.co.nz, AustralianTeachersOfMaths, BBCBitesizeBlog) — short email, 4 sentences, attach the free PDF.
- [ ] **Personal email to the 5–10 friends/family who first championed Vol. 1** — *"Vol. 2 is in the works. Want to be the first to know when it ships?"* — get them on a separate Vol. 2 list.

---

## Optional but high-leverage (when you have a free Saturday)

### Per-page OG images (1200×630)

Right now every page reuses the 900×1350 book cover for OG previews. That gets cropped on Facebook (wants 1200×630) and Twitter (wants 1200×675). Five purpose-built OG images would noticeably improve social sharing aesthetics.

Per page, the image needs:
- 1200×630 px
- Big readable title (book title or page-specific headline)
- The book cover or a hero illustration (Lindy works for `/about`)
- The wordmark or logo
- Brand-typical warmth (yellow accent, scrappy edges)

You could draft these in Figma in 2 hours. When ready, drop them in `public/og/` and tell me — I'll wire them into each page's `<meta property="og:image">`.

### Long-form story post

Pick one of these and write 600 words on it (a Substack post, a blog page on the site, or a long Instagram caption):

1. **Why I made Mazmatics** — the personal origin story. Even better than the press piece because it's in your voice.
2. **The page that didn't make Vol. 1** — show the cut page, explain why it didn't fit, what replaced it. Process is interesting.
3. **What I tell people about home maths play vs school maths** — opinionated, parent-helpful, sharable.

Long-form posts get reshared by parents who have to send them to their partner. They sit in DMs. They're durable.

---

## Things to track (monthly, 15 min)

A persistent log somewhere (Notion, a Google Doc, a markdown file in `docs/marketing/`) with month-over-month numbers from:

| Source | What to log |
|--------|-------------|
| Search Console | Total clicks, impressions, top 5 queries, top 5 pages |
| Google Analytics | Total sessions, conversion events (`amazon_cta_click`, `free_sample_downloaded`, `mailing_list_submit`) |
| MailerLite | List size, average open rate |
| Amazon Author Central | Review count, average rating, BSR / category rank |
| Instagram | Saves + shares per post (NOT followers) |
| Facebook | Same |

Don't optimize the dashboard before the data exists. Log the numbers; pattern-match later.

---

## What I (Claude) can do for you anytime

You don't need to ask first for any of these — just tell me you want it done:

- Wire any HTML / verification file you receive from a third-party (Search Console, Bing, MailerLite domain auth, etc.) into `public/`
- Add new pages (privacy, terms, about-the-author long-form)
- Update meta tags, JSON-LD, OG images, sitemap when content changes
- Set up the Vol. 2 separate mailing list / teaser landing page when you're ready
- Write the email-sequence drafts (welcome, review push, Vol. 2 announce) — *you* still send them, but I can draft
- Add an in-page mailing list signup form anywhere on the site
- Build a blog/updates section if you decide to write long-form
- Migrate to per-page OG images once you have the artwork
- Wire up `AggregateRating` once you have review numbers
- Audit performance with Lighthouse and propose fixes

---

## The mindset

This is a 12–24 month build, not a 12–24 week build. The work compounds. Two posts a week sustained for a year beats six posts a week sustained for a month.

Good Saturdays beat heroic Tuesdays. Don't burn out. The book is already in the world. The site already works. The only failure mode is stopping.
