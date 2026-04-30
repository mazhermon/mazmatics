# Mazmatics — Product Brief

> Required input for the `impeccable` skill. Captures audience, brand, tone, anti-references, and strategic principles. Confirmed with Maz across the brainstorming session on 2026-04-30 / 2026-05-01. Update in place if anything changes.

## 1. What Mazmatics is

Mazmatics is a paperback **activity & story book for kids ~7–10** (US grade 2–4) that helps them practise core arithmetic — addition, subtraction, multiplication, division, with some fractions — in a way that feels like play, not homework. **Volume 1 is out now**, sold internationally via Amazon AU / US / UK. The brand mission is "to help kids say *I like math*."

The website's job is to:
1. **Convert visitors into book buyers** (Amazon, primarily).
2. **Capture email addresses** for ongoing engagement.
3. **Reinforce the brand** so the book is recommended kid-to-kid, parent-to-parent.

## 2. Target audience

**Primary buyer:** parents (and caregivers) of kids aged ~7–10 who are math-reluctant, math-anxious, or losing interest in maths early in school.
- Often a mum or dad who themselves had a complicated relationship with math.
- Wants a *non-screen* option that doesn't feel like more homework.
- Shops on Amazon and discovers via word-of-mouth, Instagram/Facebook, school networks.

**Secondary buyers:**
- **Grandparents** buying gifts.
- **Teachers** evaluating supplementary classroom resources.
- **Local indie bookshops** (NZ stockists exist).

**Audience the book is *for* (the kid):**
- Ages 7–10, US grade 2–4 — but tone-flexible up to ~12 ("kids and the young at heart of all ages").
- Likes drawing, codes, stories, silly humour ("Who doesn't love a good poop emoji?!" — actual brand copy).
- Doesn't want answers handed to them.

## 3. Core value proposition

> Mazmatics helps kids say "I like math" by making practice *fun*, *relatable*, and something they actually want to do — paper, pencils, no batteries required.

Pillars (from existing About copy):
- **Fun** — silly, playful, low-stakes.
- **Inclusion** — diverse characters, growth mindset, "this is for me too".
- **Growth mindset** — answers aren't given; struggling is part of learning.
- **Interleaved learning** — mixes operations, codes, drawing, stories.
- **Challenge** — kids should have to think.
- **Space** — generous whitespace, room to breathe between hard bits.
- **Home play, not homework** — supplementary, not replacement.
- **Tactile / paper** — deliberately offline; "Make it yours. Rip a page out and stick it on your wall."

## 4. Brand voice & tone

- **Warm, conversational, slightly cheeky.** Speaks like a parent who's been there, not an educator with a clipboard.
- **First-person plural ("we") and second-person ("you").**
- **Emoji okay sparingly** in copy (😄, 🎨), but not in a juvenile way.
- **Locale-aware:** "math" (US) ↔ "maths" (UK/AU/NZ) via `AppContext.mathsWord`. The brand line "I like math" stays fixed; everything else adapts. **Never hardcode either spelling.**
- **Unfussy:** "We haven't included an answers page" — confident in its choices.
- **Author voice (Maz Hermon)** is present and visible — this isn't a faceless edu brand. Lean into that.

### Anti-references — what Mazmatics is NOT
- Not Khan Academy / IXL / Mathnasium — *not* drill-and-kill, not screen-based, not score-driven.
- Not a textbook — no answer keys, no "completion" badges.
- Not over-polished corporate edu (think Komodo, Splash Math) — those feel sterile to this audience.
- Not infantilising — the book respects kids' intelligence; the site should match.
- **No external references.** Maz directed (2026-04-30) that the redesign should amplify what's already in the site rather than reaching for outside aesthetics. Brand DNA (purple→blue gradient, character illustrations, hand-drawn doodles, grid-paper texture, wavy underline emphasis) is the right wheelhouse — the redesign matures and cleans up the execution.

## 5. Strategic principles for the redesign

These are starting points to confirm with Maz:

1. **Conversion-first.** Every page should make it ≤2 clicks to a buy link. The current home page hides Amazon CTAs below the fold.
2. **Mobile is primary.** Most parent traffic to small book sites comes from social → mobile. Currently the mobile home is ~10 screen-heights long with a slow value-prop reveal.
3. **One page can have personality without being long.** The current site equates "playful" with "lots of decorative sections". A redesign can be playful AND tight.
4. **Trust signals before features.** Reviews, testimonials, "as seen in" / stockists, real photos of kids using the book — these belong above the fold or near it.
5. **Author proximity is an asset.** Maz's photo, story, and the book's origin (built with his kids) is the differentiator vs. corporate competitors. Bring it forward, don't hide it on /about.
6. **Primary outcome: book sales.** Email signups and brand recognition are co-supporting goals, not the lead. Every page is evaluated against "does this move someone toward an Amazon click", with email capture as the consolation conversion and brand as the long-term moat. Confirmed 2026-04-30.
7. **Lead the home hero with social proof and author warmth, not a clever cold-acquisition headline.** The #1 audience moment-of-arrival is word-of-mouth referrals checking legitimacy. Testimonials, author photo, real book imagery, "as recommended by" cues — these belong above the fold.

## 6. Success metrics

**Tool: Google Analytics 4.** Already wired in code (`lib/gtag.js` + `pages/_app.tsx`); a measurement ID was previously configured (`G-S2TBPE8RL6` referenced in commented code). Phase 1 needs to (a) verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in production, (b) expand event coverage. A `free_sample_downloaded` event already fires.

**Phase 1 events to add:**
- `amazon_cta_click` — fired on every Amazon buy button (per region: AU / US / UK)
- `mailing_list_submit` — on MailerLite form submit
- `look_inside_open` — when Look Inside lightbox opens
- `nav_buy_click` — for the persistent buy CTA being added to the nav

**KPIs to watch (no historical numbers available; first 30 days post-launch establish baseline):**
- Amazon CTA click-through rate (sessions → amazon_cta_click)
- Email signup rate (sessions → mailing_list_submit)
- Free sample download count (already tracked)
- Pages per session, bounce rate, traffic source breakdown
- OG share previews actually rendering correctly when shared (manual check — not a GA metric)

## 7. Scope notes (constraints / non-goals for the redesign)

- Stack stays Next.js 15 / React 19 / TypeScript / Pages Router. No framework migration.
- Tailwind config will be added properly (currently a dead dependency).
- The book itself is finished and shipping — no product changes.
- Content (testimonials, reviews, copy) can be revised; assume Maz will provide / approve final copy.
- **Timeline:** No hard launch date. Soft validation gate at **3 days of implementation work** — meaningful, visible progress required to confirm continued investment.
- **No Vol 2 hooks** — Vol 2 is not in active production. Don't promise future books on the site.
- **Stockists and wholesalers pages are being removed.** Mazmatics is no longer stocked in physical bookstores; sales path is Amazon AU / US / UK. A direct-purchase option may return later if interest grows.
- **MailerLite stays.** Already integrated, free tier covers current scale.
- **Accessibility standard: WCAG 2.2 AA minimum, AAA where pragmatic.**

## 8. Out of scope for this design pass

- Backend / API changes beyond what marketing pages need.
- A separate shop subdomain (the NZ shopify integration was recently removed).
- Translation / i18n beyond the existing US/UK/AU/NZ word-swap.

---

> Brainstorming phase complete. The redesign spec built from this brief is at `docs/superpowers/specs/2026-05-01-mazmatics-redesign-design.md`.
