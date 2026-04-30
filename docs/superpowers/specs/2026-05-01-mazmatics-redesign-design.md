# Mazmatics redesign — design spec (Phase 1)

**Branch:** `redesign-may`
**Status:** Draft for Maz to review
**Date:** 2026-05-01
**Companion docs:** [`CLAUDE.md`](../../../CLAUDE.md), [`PRODUCT.md`](../../../PRODUCT.md), [`DESIGN.md`](../../../DESIGN.md), [`docs/audit/screenshots/`](../../audit/screenshots/)

---

## 1. Goal

Improve the Mazmatics marketing site so that **referred visitors confirm the book is worth buying and click through to Amazon.** Email capture and brand reinforcement are co-supporting goals; book sales is primary.

**Success looks like (3-day validation gate):** by end of Day 3, sharing `mazmatics.com` to iMessage / Slack produces a properly formatted preview, GA tracks Amazon CTA clicks + mailing-list submits + Look-Inside opens, the Look Inside section actually shows book pages, and `/`, `/about`, `/get-the-book` have the new visual direction applied.

## 2. Scope

### In scope (Tight)
- Redesign **`/`**, **`/about`**, **`/get-the-book`** to the new visual direction with strict register hierarchy.
- Fix the broken **Look Inside** section (simple lightbox carousel of existing page-sample images).
- Add complete **SEO/OG/Twitter/Schema.org Book** metadata across all surviving pages.
- Add **`<html lang="en">`** + alt-text sweep + axe-core green pass on touched pages.
- Configure **Tailwind** properly (no full migration; gradual adoption alongside CSS Modules).
- Verify and expand **Google Analytics** event coverage.
- Remove **`/stockists`**, **`/wholesalers`** pages and any links to them.
- Replace **Pacifico** decorative usage with an editorial alternative (italic / small-caps).
- Delete cruft (`Oldnext.config.js`, `YEAHNAHeslintrc.json`, redundant book-cover image variants).
- **Persistent Buy CTA in the navbar** (Amazon, locale-aware default).
- Per-meaningful-change git commits + a paired `docs/redesign-may/CHANGELOG.md`.

### Light-touch (visual update only, no full redesign)
- **`/free-sample`**, **`/write-a-review`**, **`/feedback`**, **`/join-mailing-list`** — bring into the new token system so they don't feel orphaned, but no structural rework. SEO/OG meta added.

### Out of scope for Phase 1
- App Router migration (stays Pages Router).
- Full Tailwind migration (CSS Modules stay; Tailwind for new work).
- Custom 3D book viewer (lightbox carousel only).
- New photography commissioning.
- Vol 2 / future-book content.
- Direct-purchase / shop integration (deferred until interest justifies it).
- Phase 2 marketing playbook (queued separately — see §13).

## 3. Audience & visual direction

Captured fully in [`PRODUCT.md`](../../../PRODUCT.md). Summary:

- **Primary moment of arrival:** word-of-mouth referrals checking legitimacy. Hero leads with social proof + author warmth.
- **Visual direction:** hybrid — **Editorial** (rulebook), **Scrappy/hand-drawn** (soul), **Retro arcade** (seasoning). Strict role hierarchy; never let one register do another's job.
- **Brand DNA to amplify:** purple→blue gradient, wavy underline emphasis, character illustrations, hand-drawn doodles, grid-paper texture, generous whitespace.
- **No external visual references** — mature what's already there.
- **No handwritten/script fonts** unless a specific candidate is genuinely excellent (current Pacifico use → out).

## 4. Architecture

### Token unification
Source of truth becomes `styles/tokens.css` (extracted from current `globals.css` `:root` block). Tailwind config consumes the same tokens via `theme.extend.colors`, `fontFamily`, `spacing`, etc., so a token change updates both systems. CSS Modules continue to read tokens via `var(--*)`.

### New shared components
- **`components/SiteHead`** — wraps `next/head`; takes `title`, `description`, `path`, `ogImage`, structured-data overrides. Single source of meta on every page.
- **`components/AmazonCTAButton`** — locale-aware buy button; reads `userLang` from `AppContext`, defaults to AU for NZ, etc. Fires `amazon_cta_click` GA event.
- **`components/LookInside`** *(rebuild)* — accessible lightbox carousel of page-sample images. Keyboard-navigable, focus-trapped, esc-closeable. Fires `look_inside_open`.
- **`components/PersistentBuyCTA`** — slot in the navbar; uses `AmazonCTAButton` at small scale.
- **`components/SectionDivider`** — replaces ad-hoc grid-paper sections; consolidates the three different divider patterns currently in use into one canonical scrappy-register dividing element.

### File deletions
- `pages/stockists.tsx`, `pages/stockists.module.css`
- `pages/wholesalers.tsx`, `pages/wholesalers.module.css`
- `Oldnext.config.js`
- `YEAHNAHeslintrc.json`
- Redundant book-cover image variants (keep highest-resolution; delete `mazmaticsBookCoverWebSmall-min.png` if not referenced; `Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg` likely the canonical product shot — verify uses before deleting any)
- Internal links pointing to deleted routes (audit nav, footer, body copy)
- Components used only by deleted pages: `components/bookstore.tsx`, `components/supportYourLocalBookstore.tsx` and their `.module.css` files (verify no references from surviving pages first)

### Tailwind setup
- Add `tailwind.config.ts` with content globs `./pages/**`, `./components/**`.
- Add `@tailwind base; @tailwind components; @tailwind utilities;` to `globals.css` (after the existing reset).
- `theme.extend` mirrors `tokens.css`: colors (`maz-purple`, `maz-yellow`, `maz-blue` palettes), `fontFamily.heading-display`, `fontFamily.heading-fun`, etc.
- Existing CSS Modules untouched. New components may use Tailwind utility classes; old components stay as-is unless they're being modified for the redesign.

## 5. Day 1 — Foundations sprint

> Goal: by end of Day 1 every subsequent change is built on solid foundations. Most of this is invisible to the eye but unblocks Days 2–3.

**1. Cleanup commit** *(focused, ≤30 min)*
- Delete `Oldnext.config.js`, `YEAHNAHeslintrc.json`, `.DS_Store`.
- Delete `pages/stockists.*`, `pages/wholesalers.*` and dead components/images they referenced.
- Remove all internal links to those routes.

**2. Token extraction**
- Create `styles/tokens.css`, move all `:root` custom properties out of `globals.css`.
- Import `tokens.css` first in `globals.css`.
- Verify nothing visually changed.

**3. Tailwind config**
- `tailwind.config.ts` mirroring tokens.
- `@tailwind` directives in `globals.css`.
- Sanity check: a Tailwind class on a throwaway element renders as expected; remove the test.

**4. SEO / OG / Schema scaffold**
- `components/SiteHead` built, accepting per-page overrides.
- Defaults: site title template, locale-aware description, canonical URL, `og:image` (use `Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg` for now), Twitter card, Schema.org `Book` JSON-LD with author, ISBN, image, publisher, offers (Amazon links).
- Add `<html lang="en">` to `pages/_document.js` (note: AppContext locale logic stays in body content; lang stays `en`).
- Add `<link rel="manifest">` and `<link rel="apple-touch-icon">` to `_document.js`.
- Replace existing `<Head>` blocks in `/`, `/about`, `/get-the-book`, `/free-sample`, `/write-a-review`, `/feedback`, `/join-mailing-list` with `<SiteHead>` calls.

**5. GA verification + event expansion**
- Confirm `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in `.env.local` and Vercel env.
- If missing, retrieve from Maz (the commented-out `G-S2TBPE8RL6` is likely it).
- Add `amazon_cta_click`, `mailing_list_submit`, `look_inside_open`, `nav_buy_click` event helpers in `lib/gtag.js`.
- Wire events in their components in this same sprint where the components already exist (Amazon links, mailing list form).

**6. Alt-text sweep + accessibility quick wins**
- Audit `<Image>` and `<img>` usages on `/`, `/about`, `/get-the-book`, `/free-sample`. Add meaningful `alt` or `alt=""` for decorative.
- Run axe-core CLI / Lighthouse on `/` baseline; capture score.

**7. Pacifico removal**
- Replace `--font-script` usages with editorial italic or small-caps.
- Delete `@font-face { font-family: 'Pacifico' }` and the woff/woff2 files.

**8. Foundations commit + changelog entry**
- Commit when each chunk is at a stoppable point.
- Update `docs/redesign-may/CHANGELOG.md` with what changed and why.

**Auto-mode handoff:** after the cleanup + token extraction commit lands and Maz has confirmed no surprise breakage, switch to auto for the rest of Day 1.

## 6. Day 2 — Hero rebuild on `/`

> Goal: a redesigned home hero that confirms credibility for referred visitors.

### New home hero structure (above the fold on mobile, ≤390px wide)

```
┌─────────────────────────────────────┐
│ Logo  /  Persistent Buy CTA         │  ← navbar with new CTA
├─────────────────────────────────────┤
│                                     │
│   [Book cover, real, prominent]     │  ← editorial, hero asset
│                                     │
│   "Fun maths book for kids 7–10"    │  ← H1 (keyword-rich, replaces
│                                     │     "Welcome to Mazmatics")
│   ★★★★★ "[short testimonial]" — Name │  ← social proof in hero
│                                     │
│   [Buy on Amazon — locale aware]    │  ← primary CTA
│   [Or get a free sample]            │  ← secondary CTA
│                                     │
│   ✏️ scrappy "I like maths" doodle  │  ← scrappy register, single use
│                                     │
└─────────────────────────────────────┘
```

### Below-fold sections (in order)
1. **Why parents recommend it** — 3 short value pillars with icons (NOT marketing copy; lift from real testimonials).
2. **Look inside** — lightbox carousel of page samples + "Try the free sample" CTA.
3. **Testimonials** — keep existing TestimonialList component but restyle to editorial cards.
4. **Meet the author** — Maz photo + 2 sentences + link to /about. (Author proximity is the differentiator.)
5. **Email capture** — single tight panel (replace the over-decorated current signup block).
6. **Footer** — keep the chunky "FUN MATH 4 KIDS BOOK" wordmark; remove the long bottom-of-page padding.

### Constraints
- Mobile home page must be **≤6 screen-heights** at 390×844 (currently ~10–12).
- Hero (above fold on mobile) must contain: book cover, H1, one testimonial line, Amazon CTA, secondary CTA. Nothing else.
- One scrappy register element in the hero. One arcade element on the page (likely the existing footer wordmark).
- No grid-paper background on more than 2 sections.

### Copy (draft for Maz to approve before Day 3)
- H1: **"Fun maths book that helps kids say *I like maths*"** (or a Maz-approved variant — keep "I like maths" as the brand line; rest is keyword-rich)
- Sub-H1: **"A paperback activity & story book for ages 7–10. Made by a dad and his kids in Aotearoa, New Zealand."**

## 7. Day 3 — Apply hierarchy + Look Inside

### `/about`
- Re-skin to the new tokens.
- Restructure: hero (Maz photo + 2-paragraph origin story), values, "Why we made this", endorsements, mini-testimonial. Currently it's a long single column — split into editorial sections with scrappy transitions.
- Author photo (Maz to supply if not already in `public/images/`).

### `/get-the-book`
- Re-skin to new tokens.
- Hero: book cover + price + Amazon buttons + "Free sample" link.
- Look Inside lightbox carousel below the fold.
- Trust panel: "Returns via Amazon", "Ships internationally", reviewer quote.

### `/free-sample`, `/write-a-review`, `/feedback`, `/join-mailing-list`
- Light visual update only — adopt new tokens, fix any broken book images, ensure SiteHead is in place.

### Look Inside lightbox
- Component takes `images: { src, alt, caption }[]` array.
- Click thumbnail or "Look inside" CTA → opens fullscreen modal with image carousel, prev/next, esc/click-outside to close.
- Keyboard: tab/shift-tab cycle within modal, arrows for prev/next, esc to close. Focus returns to trigger on close.
- Sources: `Mazmatics-a-plus-001…006.jpg` (already in `public/images/`).

### OG image finalisation
- Generate (or have Maz supply) a 1200×630 OG image featuring the book cover + tagline. Save as `public/og/home.png`. Update `SiteHead` defaults.

### End-of-Day-3 axe-core sweep
- Run on `/`, `/about`, `/get-the-book`. Fix all violations before declaring Day 3 done.

## 8. SEO / OG / Schema strategy

### Per-page metadata pattern (via `SiteHead`)

| Page | `<title>` | `<meta description>` |
|---|---|---|
| `/` | `Mazmatics — Fun maths book for kids 7–10` | "Help kids say *I like maths*. A paperback activity & story book for ages 7–10, available on Amazon." |
| `/about` | `About Mazmatics — made by a dad and his kids` | "The story behind Fun Math 4 Kids Vol. 1, an activity book that helps kids practise maths and have fun doing it." |
| `/get-the-book` | `Get Fun Math 4 Kids — Mazmatics on Amazon AU/US/UK` | "Order the Mazmatics Fun Math 4 Kids paperback today. Available on Amazon Australia, US, and UK." |
| `/free-sample` | `Free sample — Mazmatics Fun Math 4 Kids` | "Try a free PDF sampler of Mazmatics Fun Math 4 Kids before you buy." |

### Schema.org `Book`
JSON-LD on `/` and `/get-the-book`:
```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "Fun Math 4 Kids: Volume 1 — Good Foundations",
  "author": { "@type": "Person", "name": "Maz Hermon" },
  "isbn": "<retrieve from Amazon listing>",
  "image": "https://mazmatics.com/og/book-cover.png",
  "publisher": { "@type": "Organization", "name": "Mazmatics" },
  "inLanguage": "en",
  "audience": { "@type": "Audience", "suggestedMinAge": 7, "suggestedMaxAge": 10 },
  "offers": [
    { "@type": "Offer", "url": "https://amazon.com/dp/0473648911", "areaServed": "US" },
    { "@type": "Offer", "url": "https://amazon.com.au/dp/0473648911", "areaServed": "AU" },
    { "@type": "Offer", "url": "https://amazon.co.uk/dp/0473648911", "areaServed": "GB" }
  ]
}
```
ISBN to be confirmed with Maz (can be pulled from the Amazon listing). The ASIN `0473648911` appears in current code as the product identifier.

### OG / Twitter
- Default `og:image`: `public/og/home.png` (1200×630) — book cover + brand mark.
- Per-page overrides for `/about` and `/get-the-book` if Maz wants different imagery.
- `twitter:card` = `summary_large_image`.

### Robots / sitemap
- Keep existing `robots.txt`. Add a `sitemap.xml` (Next.js can generate at build time via `next-sitemap`; small ask, Phase 1 budget allows).

## 9. Accessibility plan

**Bar: WCAG 2.2 AA minimum, AAA where pragmatic.** See [`DESIGN.md` §10](../../../DESIGN.md) and [`CLAUDE.md`](../../../CLAUDE.md) for the full criteria list.

**Phase 1 commitments:**
- `<html lang="en">` set.
- All meaningful images have `alt`; decorative ones have `alt=""`.
- Persistent buy CTA reachable via keyboard with visible focus state.
- Look Inside lightbox: focus trap, esc to close, focus returns to trigger.
- Body copy contrast ≥7:1 on all backgrounds (AAA reach).
- Reduced-motion respected on every animation (existing `wavesAnimate` already does; verify any new motion).
- axe-core / Lighthouse a11y score: `/`, `/about`, `/get-the-book` must hit ≥95.
- No reliance on color alone for state.
- Form fields have associated `<label>`s.

**Skill recommendation (Maz to choose 0 or 1):**
None of these are installed. Pick none and we operate from first principles + Lighthouse + axe-core. Or install one of:

- **AccessLint** ([`accesslint/claude-marketplace`](https://github.com/accesslint/claude-marketplace)) — WCAG 2.2 toolkit; audits, diffs, fixes. Most credible-looking single skill.
- **Community-Access/accessibility-agents** ([repo](https://github.com/Community-Access/accessibility-agents)) — 11 specialists enforcing WCAG 2.2 AA. Heavier; better if a11y becomes a sustained focus.
- **airowe/claude-a11y-skill** ([repo](https://github.com/airowe/claude-a11y-skill)) — axe-core + jsx-a11y audits. Lightweight option.

**My recommendation:** AccessLint if you want skill-driven auditing, otherwise we proceed with axe-core CLI + Lighthouse. Let me know.

## 10. Tooling decisions

| Decision | Choice | Notes |
|---|---|---|
| Stack | Next.js 15 Pages Router, React 19, TypeScript | Unchanged |
| Tailwind | Configure properly; gradual adoption | New components may use Tailwind; existing CSS Modules untouched |
| Analytics | Google Analytics 4 (already wired) | Verify env var, expand event coverage |
| Email | MailerLite | Unchanged |
| Image opt | Migrate `next/legacy/image` → `next/image` for any image touched in the redesign | Don't migrate untouched images in Phase 1 |
| Sitemap | `next-sitemap` package | Small add |
| Deployment | Vercel | Unchanged |

## 11. Asset plan

- **Reuse first:** existing `public/images/` and `components/characters`, `components/doodles`, `components/patterns`. See `DESIGN.md` §7.
- **Maz to supply:** any book artwork from the actual book that isn't on the site yet, when we identify a need (e.g., a hero illustration moment on `/about`).
- **Maz to supply if available:** photos of kids using the book. Goes in trust-signal sections. Optional for Phase 1; great-to-have.
- **No stock photography. No AI-generated decorative imagery.**

## 12. Risks & open questions

| Risk / question | Mitigation / ask |
|---|---|
| ISBN missing from Schema.org JSON-LD | Pull from Amazon listing on Day 1. Ask Maz to confirm. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` may not be set in Vercel | Verify on Day 1; if missing, ask Maz to set it. |
| Book artwork delivery latency | Phase 1 doesn't block on new artwork — only existing assets. New artwork is additive. |
| Day 1 morning is dense | Auto mode kicks in after the first cleanup + token commit lands and Maz confirms. |
| Removing stockists may strand backlinks | Add 301 redirects in `next.config.js` from `/stockists` → `/get-the-book` and `/wholesalers` → `mailto:hellomazmatics@gmail.com`. |
| Pacifico removal might affect a layout I haven't seen | Audit usages before deleting; replacement (italic / small caps) goes in same commit. |
| OG image at 1200×630 — Maz may want to design it himself | Default to a code-composed option (book cover + wordmark on brand bg); Maz can override later. |

## 13. Phase 2 handoff (informational; not Phase 1 work)

Once Phase 1 ships:
- Marketing playbook (30/60/90-day plan, content pillars, post templates, email welcome sequence).
- Posting cadence Maz can sustain solo.
- Tooling: Anthropic-official Marketing plugin (`/draft-content`, `/campaign-plan`, `/email-sequence`). Maz to install when Phase 2 starts.
- First 30 days post-launch establish the GA baseline that informs Phase 2 priorities.

## 14. Validation gate (end of Day 3)

By close of Day 3, the following must be true (Maz's check):
- [ ] Sharing `mazmatics.com` to iMessage/Slack produces a clean OG preview with book cover.
- [ ] `/`, `/about`, `/get-the-book` show the new visual direction with strict register hierarchy.
- [ ] Look Inside on `/get-the-book` opens a working lightbox carousel of page samples.
- [ ] Persistent Amazon CTA visible in nav on every page.
- [ ] Mobile home page is ≤6 screen-heights at 390×844.
- [ ] axe-core score ≥95 on `/`, `/about`, `/get-the-book`.
- [ ] GA shows events for Amazon CTA clicks, mailing list submits, Look Inside opens.
- [ ] No `/stockists` or `/wholesalers` routes; old links 301 to sensible destinations.
- [ ] `docs/redesign-may/CHANGELOG.md` reads as a coherent narrative of what changed and why.

If any criterion fails, we triage on Day 4 rather than expanding scope.

---

**Next step after Maz approval:** invoke `superpowers:writing-plans` to break this spec into a concrete implementation plan with tasks, commit boundaries, and the auto-mode handoff point.
