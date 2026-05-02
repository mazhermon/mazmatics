# Impeccable audit + critique — 2026-05-03

> Run after the redesign-may reset to original look + technical/SEO foundations + (1) Look Inside lightbox + (2) locale-aware buy CTA. Combined `/audit` and `/critique` against the current state, with controller verification of the most impactful claims before recommending fixes.

## TL;DR

The site **passes** the AI-slop test — Lindy, real interior photos, scrappy decorative grid paper, Pacifico (when re-enabled), Bungee Shade chunk-shadow, and the bespoke purple→blue gradient read as a real indie brand. The honest problem is the inverse: brand voice is *under-applied* in places and there's one real WCAG AA gap that affects every page. **Per Maz's "section-by-section, don't ruin the look" rule, nothing was auto-applied.** Everything below is a discrete proposal he can pick from.

## Verified findings

### Audit P0-1 ("/get-the-book Look Inside thumbnails missing") — NOT a real bug

The full-page screenshot looks empty because Playwright's `fullPage: true` doesn't scroll — `next/legacy/image` lazy-loads, so the actual JPGs never trigger their IntersectionObserver. Repro in dev with manual scroll: all 4 thumbnails load correctly (verified — the four `Mazmatics-a-plus-001..004.jpg` URLs resolve via `/_next/image?url=...`).

That said, lazy-loading the highest-intent conversion element on the buy page is a small UX gap. **Optional:** add `loading="eager"` (or remove the lazy default for these specific thumbs) so they load with the page.
- Where: `components/LookInside.tsx`
- Effort: S
- Risk: tiny — slightly more bytes upfront on /, /about, /get-the-book.

### Audit P1-4 ("hero gradient cascade override") — NOT a bug, this is the original look

The `.iLikeMath` rule has both `color: transparent` and `color: var(--purple-3)` — the second wins, gradient never paints. **Confirmed identical on `main`** — this is how the original site has always rendered "I like maths" (solid purple, no gradient, no Pacifico — both are commented out in `homeHeader.module.css:90,95`).

So this is "the original look" not a bug. If Maz wants the cursive + gradient back on this wordmark, that's a deliberate brand re-introduction (the `.impeccable.md` aesthetic direction reserves Pacifico for exactly this element). Want me to flip it on as a focused commit?
- Where: `components/home/homeHeader.module.css:89-98`
- Effort: S
- Risk: visible change to hero — needs explicit go-ahead.

## Real findings (still open, none auto-applied)

### P0 — affects the AA floor on every page

**P0-1. Gradient text on H2s fails WCAG AA on white**
- The global `h2 { background-image: linear-gradient(to left, var(--blue-4), var(--purple-2)) }` paints H2s with stops that hit ~3:1 (`--blue-4` = #47a5f1) and ~4:1 (`--purple-2` = #ba90ff) on white. AA needs 4.5:1 for normal text.
- **Where:** `styles/globals.css:201-208`
- **Fix (proposed):** introduce a `--gradient-text` token using darker stops for *text only* (`linear-gradient(to left, var(--blue-5), var(--purple-3))` — both AA-passing) and use it in the h2 `@supports` block. Keep `--gradient-1` unchanged for the buy CTA pill, banner, `bigStripeDeco` — those are background fills, not text.
- **Visible change:** H2 wordmark color shifts from light-blue/light-purple to a deeper, richer gradient. Same brand vibe, more saturation. **Needs Maz's eyes** before merging.
- **Effort:** S

### P1 — high-value polish

**P1-1. Home H1 is "Welcome to Mazmatics" — wastes prime SEO + audience-fit**
- **Where:** `components/home/homeHeader.tsx:31-34` + `Head` `<title>Mazmatics fun math 4 kids</title>`
- **Why it matters:** word-of-mouth referrals (the #1 arrival vector) skim the hero in 30 seconds asking "is this for my kid?". "Welcome to Mazmatics" answers neither and is also a weak organic-search anchor.
- **Proposed (queued in `MARKETING-COPY-CHANGES.md` §1a):** promote "Help your kids say 'I like maths'" to H1, demote "Mazmatics" to wordmark beside or above. `<title>` becomes `Mazmatics — Fun maths book for kids 7-10`.
- **Effort:** S — text + minor structural change inside HomeHeader.

**P1-2. No persistent buy CTA in the navbar**
- **Where:** `components/navbar.tsx`, `components/NavBarLinks.tsx`
- **Why:** a 30-second skimmer who doesn't reach the hero compact-buy block has no path to convert. Documented as a conversion gap in `DESIGN.md`.
- **Proposed:** add a single locale-aware "Get the book" pill (yellow `--yellow-1` background) to the right of the nav links at desktop, top of the mobile menu stack on smaller screens. Reuse `resolveCountry` from `lib/locale.ts`. Fire `nav_buy_click` GA event (already wired in `lib/gtag.js`).
- **Effort:** M

**P1-3. Reduced-motion isn't gating the home `.pointer` keyframe or the footer back-to-top scroll**
- **Where:** `styles/Home.module.css:138-149` (`.pointer` 7-iteration bounce); `components/footer.tsx:80-89` (`window.scrollTo({ top: 0 })` defaults to smooth without preference check)
- **Why:** WCAG 2.3.3 (AAA) and just plain courteous. The lookInside fade already gates correctly — use it as the template.
- **Proposed:** wrap `.pointer` `animation` declaration in `@media (prefers-reduced-motion: no-preference)`. For scroll-to-top, check `matchMedia('(prefers-reduced-motion: reduce)')` and switch to `behavior: 'auto'` when the user prefers reduced motion.
- **Effort:** S
- **Risk:** zero for users without reduced-motion preference (no visible change).

**P1-5. About page is a wall of paragraphs — author warmth buried 60% down**
- **Where:** `pages/about/index.tsx:137-188` (the long "Good foundations" essay), and "About the author" section at the bottom.
- **Why:** parents skim. The author-warmth differentiator should be the FIRST thing they see after the hero, not after 8 paragraphs of book values.
- **Proposed:** hoist "About the author" to second-on-page (after AboutHeader, before "The short story"). Break the 8-paragraph "Good foundations" into 3 sub-sections with H3s drawn from existing copy. **Restructure only — no new copy.**
- **Effort:** M
- **Risk:** medium — moves visible content blocks. Needs Maz's go-ahead per the section-by-section rule.

**P1-6. /get-the-book buttons have weak shipping-reassurance copy**
- **Where:** `components/getTheBookLinks/index.tsx:46-83` (non-compact mode)
- **Why:** /get-the-book is the page where shipping anxiety peaks. The home hero solved this with `shippingCopyForCountry()`; the full 3-button view falls back to "Use this for shipping to NZ" / "...I'll let you guess what this is for :)" — cute but not reassuring.
- **Proposed:** reuse `shippingCopyForCountry` and `regionForCountry`. Mark the button matching the resolved region with `variant="primary"`; replace the italic span under each with the same `shippingCopyForCountry()` reassurance the home hero uses.
- **Effort:** S

### P2 — nice-to-have

**P2-1. Footer "FUN MATH 4 KIDS BOOK" wordmark — verify Bungee Shade is what's loading**
- `DESIGN.md` §9 flagged it as "renders as Outfit fallback". The `.fun` variant in `banner.module.css:91-95` declares `font-family: var(--font-headings-display)` (Bungee Shade). Worth a 60-second verification pass that the @font-face is resolving — the Banner is the brand's most-seen surface.

**P2-2. `next/legacy/image` is everywhere**
- `CLAUDE.md` notes: "modern `next/image` should be preferred for new work". Real LCP impact on the hero `lindyLarge.png`. **Don't sweep — migrate one image at a time.** Hero first.

**P2-3. `<html lang>` and `apple-touch-icon` / manifest links**
- These were added on the `redesign-may-clean` branch via the cherry-picked `e1d2e3a` commit. Already in this branch. Verify `pages/_document.js` has `<Html lang="en">` and the icon links — likely already done.

**P2-4. Tailwind installed but unconfigured**
- Decision needed: add a config or remove the dependency. Per `CLAUDE.md` the project rule is "no new styling system unless we agree first" — removing it is the lower-risk move.

### P3 — note only

- `--gray-5` is identical to `--black`; `--green-1`/`--green-2` are orphan tokens (`DESIGN.md` §1).
- Conflicting `.hitmeLink` definitions (`globals.css` 2.4rem vs `Home.module.css` 1.6rem).
- Multiple book-cover image variants in `public/images/` — asset cleanup.
- Banner `.small` font-size *shrinks* at ≥30rem (`banner.module.css:73-79`) — almost certainly an inversion bug, but `.small` may be unused.

## Cross-page patterns (one fix, multiple wins)

- **Locale-aware buy CTA logic** is implemented in `CompactBuyBlock` only. Extract to `useResolvedRegion()` in `lib/locale.ts`, reuse on /get-the-book buttons (P1-6) and the navbar (P1-2). One hook, three call sites.
- **Reduced-motion gating** — three keyframes need a single audit pass (`pointer`, `wavesAnimate`, scroll-to-top behavior). The lookInside `lookInsideFadeIn` already gates correctly — use it as the template.

## Out of scope (Phase 2)

- Real author photo / "as recommended by" cues / new testimonial assets — asset production.
- GA4 event verification + dashboard setup — analytics work.
- Marketing copy improvements queued in `docs/redesign-may/MARKETING-COPY-CHANGES.md` — staged track.
- Token palette shift (`--blue-4` darker globally) — would touch every gradient on the site; needs explicit Maz approval.
- Tailwind add-or-remove decision — needs explicit direction.

## Recommended next moves

In ascending visual risk:

1. **P1-3** (reduced-motion gating) — invisible to default users; pure a11y win. **Auto-applicable safely** if Maz wants.
2. **P1-6** (shipping copy on /get-the-book buttons) — reuses logic that already shipped; visual change is just italic-text-under-button gets more useful.
3. **P0-1** ("eager" load on Look Inside thumbs) — invisible until you reach the section.
4. **P0-1 (gradient text contrast)** — visible color shift on all H2s; wants Maz's eyes.
5. **P1-1** (home H1 rewrite) — visible change to hero text.
6. **P1-2** (nav buy CTA) — adds new visible element.
7. **P1-5** (about restructure) — moves visible content.

**My recommendation: P1-3 and the optional Look Inside eager-load are the only fully-safe auto-apply candidates. Everything else should wait for Maz's explicit go-ahead.**
