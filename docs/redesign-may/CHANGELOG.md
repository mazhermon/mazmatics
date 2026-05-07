# Mazmatics redesign — changelog

A human-readable narrative of what's changed on the `redesign-may` branch and why. Paired with focused git commits — `git log` is the technical record, this file is the narrative. New entries at the top.

---

## 2026-05-07 → 2026-05-08 — Polish round + press coverage restored + cleanup

**What:** Closing pass on the four-page agency redesign. Tightened the hero, simplified the why-kids-love-it imagery, fixed a modal click-close bug, restored the Stuff.co.nz press coverage as a credibility anchor (split between home and about), and cleared the cleanup items the previous entry flagged (orphans + debug screenshots).

### Hero polish
- **Sun flipped** so the rays read as shining rightward toward Lindy. Single-line `transform: scaleX(-1)` on the canvas inside `.sunCorner`.
- **Floating cards removed** — the white "4 + 5 = 9!" pill and the ✏︎ pencil card were visual noise around Lindy. Stripped from JSX + CSS.
- **Book-backdrop hover** — `.lindy:hover .bookBackdrop` (and `:focus-within` for keyboard parity) lifts the book up-and-left and tilts to `-15deg`, hinged at `transform-origin: bottom left` so the corner stays put while the book pivots toward Lindy. 380ms ease-out-expo. Reduced-motion users keep the rest pose.
- **Initial book position pulled in** — desktop translate goes from `(-100px, -100px)` to `(-50px, -50px)`. Hover travel halved after early overshoot — delta-from-rest cut from -40/-20/-14° to -20/-10/-7° on desktop; -22/-18/-14° to -11/-9/-7° on mobile.

### Why kids love it — image cleanup
The 22rem stretched detail crops were communicating book content well (the function-over-mood call), but the surrounding chrome — `2px solid` ink border + paper-white backing + `overflow: hidden` — was showing as black outlines and white side-gutters wherever the book page's natural aspect didn't fill the container. Stripped all the chrome. The image IS the element now: `filter: drop-shadow(...)` follows the rotated alpha edge, `border-radius: 4px` rounds just the image corners. Capped at 18rem mobile / 20rem desktop, centered in column. Grid rebalanced from `number(3) | copy(4) | detail(5 stretched)` → `number(3) | copy(5) | detail(4 contained)` so copy gets breathing room.

### Look Inside modal — overlay click now actually closes
Root cause: `.modalImage` is `width: 100%; max-width: 1100px` and covered most of the modal viewport. The actual visible image inside it is much narrower (next/legacy/image scales by aspect ratio + max-height). Clicks in the gap between `.modalImage`'s bbox and the visible image were being captured by `.modalImage` (pointer-events: auto, inherited via the `.modalContent > *` rule) and never reached `.modalBackdrop`. Fix: `pointer-events: none` on `.modalImage`, `auto` only on the inner `img` + Next-image span. Gap clicks now pass through and close. Clicks on the actual image stay opaque (don't close) — standard lightbox behaviour.

### Press coverage restored — split home + about
The orphaned `FrontPageNews.tsx` had bundled the Stuff.co.nz / Dom Post press piece AND the YouTube interview into one block. They serve different conversion roles, so split them:

- **Home — `components/home/pressMention.tsx`** between *Parents say it works* and *Why kids love it*. Compact paper-warm band, hairline rules top + bottom. Newspaper front-page thumbnail as a tilted polaroid (matches the why-kids editorial-clip motif). Eyebrow "AS SEEN IN" → h2 "Stuff.co.nz · The Dominion Post" → trimmed pull quote ending on "Answer: Mazmatics." → uppercase "Read the full article →". External press = credibility multiplier for the word-of-mouth-referred parent who's our dominant traffic source.
- **About — `components/About/StuffInterview.tsx`** between author bio and CoreValues. Lite-embed pattern: YouTube `maxresdefault.jpg` thumbnail + styled play overlay; iframe only loads on click. `youtube-nocookie.com` host. Saves ~500KB + the YouTube tracking script for visitors who scroll past without playing. 16:9 frame, drop shadow, eyebrow "FROM THE NEWSROOM" → h2 → context lede → video → caption link out to article. Newspaper-produced quality, so the warmth + credibility loop closes: home says "as seen on Stuff" → /about delivers the actual interview.

### Cleanup (the items the previous entry flagged)
- **Orphans deleted.** `components/FrontPageNews.tsx` (+ CSS), `components/StoryBento.tsx` (+ CSS), `components/testimonials/FeaturedTestimonials.tsx` (+ CSS). All three superseded and confirmed unimported. Savepoint `0a28aba` preserves them in history.
- **Debug screenshots gone.** 17 root-level PNGs (`home-r4-hero.png`, `about-r2-hero.png`, etc.) deleted. `.gitignore` now matches `/*.png` so future debug captures don't get tracked.

### Verification
- `tsc --noEmit` clean
- `yarn build` clean (~39s, 11 routes prerender, sitemap regenerates)
- A11y: every new section uses `aria-labelledby` → real h2; decorative elements `aria-hidden` / empty alt; all motion gated behind `prefers-reduced-motion`
- Design tokens referenced (`--paper-warm`, `--ease-out-expo`, `--purple-3`, `--yellow-1`, font stack) verified present in `globals.css`
- YouTube `maxresdefault.jpg` for video `YX0lDhgvFT8` returns 200 — no thumbnail fallback needed
- **Not yet browser-tested.** Build correctness ≠ feature correctness. Recommended manual pass: cold-load /, /about, /free-sample, /get-the-book on desktop + mobile; open the Look Inside modal and click the dim area; click the press strip; click the /about video.

### Known gaps (deferred, not blockers)
- `/about`, `/free-sample`, `/get-the-book` only have `<title>` + `<meta description>`. No `og:*`, `twitter:*`, or `<link rel="canonical">`. Pre-existing — predates this round. Worth a follow-up sprint for shareable previews.
- Lindy eye-blink animation parked. Asset is a flat PNG (2213×2633). Cleanest implementation needs either an SVG version of the character or a sprite-sheet of blink frames. Tabled for later.

---

## 2026-05-06 → 2026-05-07 — Agency-cut redesign of /, /free-sample, /about, /get-the-book (uncommitted on top of savepoint `0a28aba`)

**What:** Full editorial redesign of the four marketing pages, then iterated against Maz's feedback over multiple rounds. All work sits on top of the savepoint commit `0a28aba` and is **uncommitted** at the time of writing — `git reset --hard 0a28aba` is the rollback path if needed.

### / (home) — 5-section structure replacing 10
- **Hero** kept and polished. Pale brand-blue band (`oklch(0.95 0.04 235)`) with hairline border-bottom, `--paper-warm` body in older revs replaced after Maz asked for "brighter". Sun-sprite (the existing frame-by-frame canvas) wired in **top-left of the hero, behind the headline** (was: top-right corner → above-the-book → settled top-left adjacent to the hero text, sized 9–16rem responsive). Book backdrop **mirrored to the LEFT of Lindy** with `transform: rotate(-8deg)` + a `translate(-100px, -100px)` desktop nudge so the sun reads as shining down onto the character. The "Liking maths" underline moved **behind** the glyphs via `z-index: -1` on `::after` (highlighter-swipe effect, not under-the-text). Eyebrow copy: **"New Release" → "Available now"** (book has been out a while; wording mustn't mislead returning customers).
- **Parents say it works** (new `components/home/parentsSay.tsx`). Three pull-quotes shown together with asymmetric column heights, big yellow opening marks, purple rules under attribution, "Read more from kids and adults →" out to /about#testimonials. Replaces the auto-advance carousel.
- **Why kids love it** (new `components/home/whyKidsLoveIt.tsx`). Drenched yellow band (`var(--yellow-1)`) collapsing the old StoryBento + CoreValues into one section. Three numbered rows (01 Joyful play, 02 Pencil first, 03 Wins not tests). Detail crops sized to **22rem max / 100% column** after Maz asked for bigger images — earlier "scrappy clipping" 14rem felt mood-first, function lost.
- **Take a look inside** (new `components/home/lookInsideHome.tsx` wrapping `LookInside` with a new `variant="strip"`). All six A+ sample pages in a full-bleed editorial strip; mobile = snap-scrolling carousel. Modal lightbox reused unchanged.
- **Volume 1. Out now.** (new `components/home/finalCta.tsx`). Asymmetric split: book cover left (slight rotate, lifts on hover), big serif headline + locale-aware Amazon CTA + "other regions" links + thin divider + author intro + "Meet Maz →" out to /about.

**Dropped from home:** `FrontPageNews`, the standalone `bookCta` section, the kids-drawing/grid-paper rail (`bigStripeDeco`), the bottom Feedback/Insta block, the in-body `JoinMailingList` (moved to footer instead).

### /free-sample — single-purpose conversion page
Restructured top-to-bottom so the download is the first big CTA, not buried under chatty copy. Hero with the primary download → yellow band with the existing 3-thumb showcase → tight one-paragraph "print it for the real thing" note → quiet final Amazon CTA + Meet Maz line. Removed: 4 paragraphs of "hello there are you looking…" marketing fluff, the duplicate yellow Banner, the 3-button Amazon grid, the unused `Container`/`Banner` imports.

### /about — kept the bones, refreshed the surface
- `AboutHeader` rewritten on **pale lavender bg** (`oklch(0.94 0.06 295)`) with the **SineShine purple squiggle pattern** brought back in the upper-right corner (the "cool squiggly lines" Maz had on the original home page). Eyebrow + big Fraunces `Why this book exists.` + serif lede.
- Author intro tightened: 3 paragraphs → 2, dropped Pacifico `Have fun, Maz` signoff in favour of `— MAZ` in caps Big Shoulders (per the no-handwritten-fonts rule).
- Foundation section moved from pale blue to plain paper with a hairline top border.
- Make-it-yours: switched from muted `--abt-yellow` to brand `var(--yellow-1)` so the page has one drenched yellow moment matching the home.
- `TestimonialList` rebuilt as the editorial pull-quote pattern (kids first, then parents/gift-buyers groups) — drops the centered "Customer testimonials" + chatty intro + boxed Testimonial cards.

### /get-the-book — buy block redone
Replaced the legacy 3-stacked-button + italic-centered-shipping mess with three clean editorial rows (eyebrow `AMAZON XX` + shipping + CTA, all left-aligned, no italics, hairline rules between). Per Maz's iteration: **only the matched region's button is the primary purple — the other two are quiet ghost/outline secondaries**. The "Closest to you" pill + primary-purple weighting waits for `useResolvedCountry` to resolve, so SSR no longer flashes the wrong matched region (previously `null country → regionForCountry → 'US'` would briefly mis-highlight US for AU/UK visitors).

### Footer — full rebuild
Four-column on desktop (brand block + Get the book + Say hi + Follow) collapsing to 2 / 1 column responsively. **Brand block now uses `Mazmatics-logo.png`** (same asset as nav) rather than the Big Shoulders wordmark, per Maz's preference. Picked up the orphaned email + socials + feedback/review links so they're available everywhere, not just home-bottom.

### Foundations
- Design tokens added to `globals.css`: `--space-1..10`, `--radius-sm..pill`, `--shadow-1..4`, `--ease-out`, `--ease-out-expo`, `--ease-out-quart`, `--paper`, `--paper-warm`. Body bg switched from `#fff` → `var(--paper)`. Body grain overlay (purple-tinted SVG noise) gated by `prefers-reduced-data`.
- `<Reveal>` component (`components/Reveal.tsx`) for scroll-revealed entries. IntersectionObserver single-fire, GPU-friendly transitions, respects `prefers-reduced-motion`. Used sparingly in the final layout.
- `Button` component refreshed: dropped the gradient, dropped the inset-gloss trick, solid colors with tinted purple shadows + ease-out-expo transitions.
- Globals h1: added `font-variation-settings: 'opsz' 144` and `letter-spacing: -0.01em` so Fraunces uses its display optical-size cut at headline scale.
- `LookInside` extended with all six A+ pages (was 4) and a new `strip` variant. `grid` and `showcase` variants unchanged so /get-the-book and the legacy callsite render identically.

### Decisions captured
- **Pacifico subline kept** on the home hero (`Help your kids find theirs.`) despite the no-handwritten-fonts memory — Maz explicitly said "I only like the hero area, leave it as-is".
- **Detail-crop sizing on Why-kids-love-it: function over mood.** Original 14rem max worked as editorial texture but didn't communicate book content. Bumped to 22rem / 100% col-fill, kept rotation + paper border + shadow so the editorial mood survives.
- **Locale matched-region differentiation = pill + button hierarchy.** Pill alone wasn't loud enough; equal buttons across all 3 made the page feel uncommitted. Final pattern: only matched region gets the primary purple, others ghost.
- **Mobile lazy-loading on Why-kids-love-it imgs** was hiding screenshots behind unloaded images. Forced `loading="eager"` on the three detail crops since they're load-bearing content on a short page.

### Orphans (left in tree, not imported anywhere)
- `components/StoryBento.tsx` + `storyBento.module.css`
- `components/testimonials/FeaturedTestimonials.tsx` (the carousel) — superseded by `parentsSay`
- `components/FrontPageNews.tsx` — no longer used on home
- The page hero version of `Banner` on free-sample (the `<Banner>` import is gone)

Pending Maz's call on whether to delete or keep around. `CoreValues` is **still imported** by /about, so it stays.

### Verification
`yarn build` clean, `tsc --noEmit` clean, desktop + mobile both render the way I'd expect on the four pages. Screenshots were generated as debug artefacts at the repo root (`home-r4-hero.png`, `about-r2-hero.png`, etc.) — these are gitignored-shaped (PNGs at root) but currently untracked; either delete before commit or add to `.gitignore`.

---

## 2026-05-03 — Impeccable findings applied (9 focused commits)

**What:** Worked through every P0/P1/P2 item in `IMPECCABLE-REVIEW.md` as separate commits so any single visible change is revertable on its own. Order was: invisible/safe first, then visual, biggest blast-radius last.

- **a11y: gate motion behind prefers-reduced-motion** — `.pointer` keyframe and footer back-to-top scroll now respect `prefers-reduced-motion`. Invisible to default users.
- **perf: eager-load Look Inside thumbnails** — the four buy-page thumbs paint with the page instead of waiting for IntersectionObserver.
- **refactor: extract `useResolvedCountry` hook** — timezone+languages detection moved out of `CompactBuyBlock` so /get-the-book buttons and the new nav CTA can reuse it.
- **chore: remove unused Tailwind dependency** — installed but never configured; removed cleanly. Project stays on CSS Modules.
- **a11y: AA-passing gradient on text-clip letterforms** — new `--gradient-text` token using `--blue-5 + --purple-3` (both AA on white) applied to global h2 and the various `.hitmeLink` / `.ukLink` letterforms. `--gradient-1` keeps its lighter stops for fills.
- **feat(get-the-book): locale-aware primary + shipping copy** — replaces "...I'll let you guess what this is for :)" cute placeholders with explicit shipping reassurance per region.
- **feat(home): promote value-prop to H1 + locale-aware title** — H1 is now "Help your kids to say 'I like math/maths'" instead of the brand wordmark "Mazmatics". `<title>` becomes locale-aware via `mathsWord`.
- **feat(nav): persistent locale-aware buy CTA pill** — yellow "Get the book" pill in the nav row of every page, links direct to the matched Amazon storefront, fires `nav_buy_click`.
- **refactor(about): hoist author bio + split Good foundations into H3s** — author warmth was buried 60% down; now sits second-on-page. The 8-paragraph "Good foundations" block becomes 3 H3 sub-sections drawn from existing copy (no new copy).

**Why:** The impeccable audit verified what was real vs. screenshot artifact, then graded each finding by visual blast radius. We applied invisible/safe fixes silently and visible ones as their own commits per Maz's "section-by-section, easy to revert" rule.

**Verification:** 17/17 locale tests pass, `yarn build` clean, no TypeScript errors. Everything else is "needs Maz's eyes in the browser."

---

## 2026-05-03 — Stitch MCP connected

**What:** Registered the official Google Stitch MCP at `https://stitch.googleapis.com/mcp` (HTTP transport with `X-Goog-Api-Key` header) so coding agents can pull AI-generated UI references directly from Stitch projects without manual export.

**Why:** Maz wants to use Stitch as a visual reference channel — paste a screen ID and have the agent fetch the HTML/screenshot to inform redesign work, instead of describing visuals in text.

**Auth model:** API key in `~/.claude.json` headers, scoped to the local project entry. Not in repo `.env`. Not in shell rc.

---

## 2026-05-01 — Implementation plan written

**What:** Wrote the bite-sized implementation plan at `docs/superpowers/plans/2026-05-01-mazmatics-redesign-may.md` — 26 tasks (25 core + 1 opportunistic), each with exact file paths, complete code blocks, expected commands and outputs, and a dedicated commit message. Plan covers Day 1 morning foundations (Tasks 1-11), Day 1pm + Day 2 hero rebuild (Tasks 12-17), and Day 3 hierarchy + Look Inside + a11y (Tasks 18-25).

**Why:** Spec → plan handoff per the superpowers workflow. The plan assumes an executor with no prior project context — every step has the code or command they need.

**Auto-mode handoff is at Task 11.** Tasks 1-11 run with Maz watching the first focused block; once that lands cleanly, auto mode through to Task 25.

---

## 2026-05-01 — Amazon CTA pattern locked in (Pattern C)

**What:** Added §8.5 to the spec specifying the Amazon CTA pattern. Replaces the current 3-button (AU / US / UK) layout with a single locale-aware primary button that includes shipping reassurance copy ("ships to Aotearoa NZ"), plus an inline "other regions" expander. Server renders a US default; client-side hydration swaps to detected locale to avoid hydration mismatches and layout shift. `amazon_cta_click` GA event gains a `region` parameter for future analysis.

**Why:** Maz flagged the 3-button approach as a specific conversion concern. With referred parents on mobile and book sales as the primary goal, decision speed beats option visibility — and explicit shipping copy is a meaningful purchase-friction killer for international book sales.

---

## 2026-05-01 — Brainstorming + spec phase complete

**What:** Set up the project for the redesign. Wrote `CLAUDE.md`, `DESIGN.md` (current design system audit + findings), `PRODUCT.md` (audience, brand, voice), and the implementation spec at `docs/superpowers/specs/2026-05-01-mazmatics-redesign-design.md`. Captured 10 baseline screenshots of the live site at `docs/audit/screenshots/`.

**Why:** The redesign is anchored in evidence rather than guesswork. Audit findings (broken Look Inside, missing OG/SEO, accessibility gaps, dead Tailwind config, redundant assets) drive Day 1's foundations sprint. The visual direction is locked in: hybrid editorial + scrappy + arcade with strict role hierarchy.

**Decisions captured:**
- Phase 1 scope = Tight (3 pages: /, /about, /get-the-book), 3-day validation gate.
- Phase 2 = marketing playbook, queued post-redesign.
- Stockists & wholesalers pages will be removed (no longer in physical bookstores).
- Tailwind to be configured properly (gradual adoption, CSS Modules stay).
- Google Analytics already wired; Phase 1 expands event coverage.
- MailerLite stays.
- Accessibility bar = WCAG 2.2 AA minimum, AAA where pragmatic.
- No handwritten/script fonts (Pacifico out).
- Bungee Shade kept for Phase 1; swap-readiness preserved for post-Phase-1.
- No external visual references — amplify existing brand.

**Next:** Maz reviews the spec. After approval, invoke `superpowers:writing-plans` to break it into the implementation plan, then switch to auto mode for execution.
