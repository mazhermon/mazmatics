# Mazmatics — Current Design System

This documents the **current** design system as it exists in the codebase and on the live site (mazmatics.com) as of 2026-04-30. It is the baseline / "before" reference for the redesign on branch `redesign-may`. Treat this as ground truth; the redesign spec will reference and revise it.

---

## 1. Color tokens

Defined in `styles/globals.css` as CSS custom properties on `:root`.

| Token | Hex | Role today |
| --- | --- | --- |
| `--black` | `#3a3a39` | Primary text, button bg |
| `--white` | `#fff` | Card bg, contrast text |
| `--gray-5` | `#3a3a39` | (alias of `--black`) |
| `--gray-4` | `#646461` | Mid grey |
| `--gray-3` | `#a2a29f` | Light grey |
| `--gray-1` | `#f2f2f1` | Page background tints |
| `--yellow-1` | `#fff73e` | "Will you help your kids" hero, accents, button border |
| `--green-2` | `#4ecca3` | (defined, lightly used) |
| `--green-1` | `#6be7bf` | (defined, lightly used) |
| `--blue-1` | `#dff9fc` | Subtle bg |
| `--blue-2` | `#c5f8ff` | Pacman char, focus accents |
| `--blue-4` | `#47a5f1` | Gradient anchor, links |
| `--blue-5` | `#207bc5` | Link hover |
| `--purple-2` | `#ba90ff` | Brand purple, footer bg, banner bg |
| `--purple-3` | `#8c5fd5` | Headings, "Mazmatics" wordmark |

**Validation:**
- `--validation-success-color`: `#affeb8`
- `--validation-error-color`: `rgb(247, 119, 97)` (tomato)

**Gradients:**
- `--gradient-1`: `linear-gradient(to left, var(--purple-2), var(--blue-4))` — used on navbar, primary buttons, h2 text fill, big stripe deco

**Notes / drift:**
- `--gray-5` is identical to `--black` — redundant.
- `--green-1` and `--green-2` are defined but barely used; they're orphan tokens.
- A locally-defined `--gradient-sunshine` is commented out in `globals.css` — dead code.
- Several yellow/blue/purple shades are referenced inline (e.g., `tomato`, `gold`) — palette is not strictly enforced.

## 2. Typography

### Font families
Loaded from `public/fonts/` via `@font-face`:

| Family | Files | CSS variable | Role |
| --- | --- | --- | --- |
| **Outfit** | Regular / Medium 500 / Bold | `--font-headings`, `--font-copy`, `--font-button` | Body, h2/h3, buttons |
| **Daruma** | darumadropone (single weight) | `--font-headings-fun` | Banner "fun" variant |
| **Pacifico** | single weight | `--font-script` | Decorative script ("or" dividers, signup loader) |
| **Bungee Shade** | (referenced in stack only — not actually loaded) | `--font-headings-display` | h1 ("WELCOME TO MAZMATICS", page titles, "FUN MATH 4 KIDS BOOK" footer) |
| Primer | `public/fonts/primer/` exists | (commented out) | Not used; dead asset |

> ✅ **Bungee Shade IS loaded** via Google Fonts in `pages/_document.js` (line 12). The chunky shadowed display type on hero wordmarks renders correctly. (An earlier note here mistakenly said this was broken — corrected 2026-05-01.) Maz has flagged Bungee Shade may be swapped post-Phase-1; keep `--font-headings-display` as the single source of truth so a future swap is a one-line change. Don't hardcode `'Bungee Shade'` in components.

### Type scale (base + breakpoints)
Mobile-first, breakpoints in `rem` (assumes 16px root):

| Element | Base | ≥30rem | ≥50rem | ≥60rem | ≥70rem | ≥80rem |
| --- | --- | --- | --- | --- | --- | --- |
| `body`, `p` | 1.2rem (19.2px) | — | — | 1.4rem | — | — |
| `h1` | 3rem | — | 3.5rem | — | 5.5rem | — |
| `h2` | 3rem | — | — | — | 3.2rem | — |
| `h3` | 1.8rem | — | — | — | 2.5rem | — |
| Banner `.med` mainText | 3.2rem | — | 5.5rem | 6.5rem | — | 9rem |
| Banner `.small` | 2.2rem | 2rem (sic — gets smaller!) | — | — | — | — |
| `.hitmeLink` (CTA email/social) | 2.4rem (globals) / 1.6rem (Home.module) | — | 3rem / 2rem | — | — | — |

**Notes:**
- h1 uses `--purple-3` color until a `background-clip: text` `@supports` block paints it with `--gradient-1` (purple→blue).
- h2 is similarly painted with the gradient via `@supports background-clip: text`.
- h3 underlines `<strong>` with a wavy `--purple-2` decoration — distinctive brand detail.
- Body is set on `body, p` to `1.2rem` mobile / `1.4rem` ≥60rem. Default browser is 16px = 1rem; site copy is intentionally large.
- `.copyArea--med p` bumps to `1.6rem`. `.leadCopy` is `1.8rem`.
- Conflicting `.hitmeLink` definitions exist in both `globals.css` (2.4rem) and `Home.module.css` (1.6rem). Specificity drift.

## 3. Spacing, layout, breakpoints

| Token | Value | Notes |
| --- | --- | --- |
| `--site-container-max-width` | `1200px` | Page max-width |
| `--site-container-padding` | `2rem` mobile / `2rem 5.5rem` ≥50rem | Horizontal padding |
| `--nav-height` | `65px` | Used for `min-height: calc(100vh - var(--nav-height))` on `.main` |

**Breakpoints in use** (rem-based, mobile-first):
- `30rem` / 480px — small tablet adjustments
- `40rem` / 640px — secondary breakpoint
- `50rem` / 800px — primary "tablet+" breakpoint, container padding change
- `60rem` / 960px — desktop body type bump, banner sizing
- `65rem` / 1040px — nav goes horizontal
- `70rem` / 1120px — large h1, h3
- `80rem` / 1280px — XL banner sizing, container behaviour change
- `400rem` — `overflow: visible` fix (defensive, effectively never triggers)

**Vertical rhythm:** very generous. Section margins frequently `5rem`–`17rem` (e.g., `.siteFooter { margin-top: 17rem }`, `.kidsDrawing { margin-top: 9rem }`, `.signup { margin-top: 12rem }`). This contributes to the "very long scroll" feel of the home page.

## 4. Radii, shadows, motion

**Border radii:**
- Buttons: `6px` (`button.module.css`), `9px` (legacy `Home.module.css`)
- Cards / signup: `7px` (top-only)
- Code blocks: `5px`
- Inline pills (hover bg): `3px`

**Box shadows (named):**
- `--box-shadow-1`: `0 4px 16px -6px rgba(0,0,0,0.75)` — navbar
- `--box-shadow-2`: `10px 14px 21px -9px rgba(0,0,0,0.95)` — heavy
- `--box-shadow-3`: `0 4px 16px -6px rgba(0,0,0,0.35)` — light
- `--box-shadow-inset-double`: dual inset shadows, used on `.kidsDrawing` and `.bigStripeDeco` to give pressed/embossed feel

Plus per-component button shadows defined locally (`--boxShadowStart`, `--boxShadowHover`, `--boxShadowActive`).

**Motion:**
- `wavesAnimate` — 1.8s ease-out forwards, slides decorative wave SVG horizontally (in `Home.module.css`). Respects `prefers-reduced-motion`.
- `pointer` keyframe — bouncing triangle pointer animation, 7-iteration alternate (in both home and footer).
- Button hover/active: 1px Y translation + shadow swap, 0.2s ease-out.
- `@formkit/auto-animate` is installed but usage not surveyed — likely on lists/forms.

## 5. Decorative motifs

The brand leans heavily on **scrappy/hand-drawn/kid-friendly** decoration. Catalogued:

| Component | Path | What it is |
| --- | --- | --- |
| `GridPaper` | `components/patterns/GridPaper.tsx` | Repeating engineering-grid SVG, used as background pattern across many pages |
| `Grain` | `components/patterns/Grain.tsx` | Noise/grain texture overlay |
| `Banner` (with `Waves`) | `components/banner.tsx`, `components/waves.tsx` | The yellow/purple full-width banner with curved-wave bottom edge |
| `sunSprite` | `components/characters/sunSprite` | Animated sun illustration (used on About page, dynamic-imported, ssr false) |
| `iLikeMaths` | `components/characters/iLikeMaths/ILikeMaths` | "I like maths" character/illustration |
| `WriteInThisBook` | `components/doodles/writeInThisBook` | Hand-drawn doodle |
| Pacman/character circle | `lindyLarge.png`, generic `--bettySize: 200px` token | Top-of-page character mark (the Pac-Man-like shape over signup forms) |
| Footer wave + big "FUN MATH 4 KIDS BOOK" | `components/footer.tsx`, `components/getTheBookBanner` | Site-wide footer banner |

## 6. Component inventory

Found in `components/`:

**Primitives:**
- `Button` (`button.tsx`) — variants: default (black), `primary` (gradient bg). Size variant: `fullWidth`.
- `Container` — max-width wrapper.

**Composite:**
- `Banner` — colored full-width banner with optional waves (yellow + purple variants observed; sizes: `small`, `med`, `large`).
- `Navbar` (`navbar.tsx`, `NavBarLinks.tsx`) — gradient bg, hamburger on mobile, horizontal at `≥65rem`. Active link gets a yellow circle indicator.
- `Footer` — Mailing list signup + giant "FUN MATH 4 KIDS BOOK" banner + back-to-top.
- `JoinMailingList` (`join-mailing-list.tsx`) — embedded MailerLite-styled form.
- `MailingList` (`mailinglist.tsx`) — separate / older variant?
- `LookInside` — book preview area (currently broken on /get-the-book and /free-sample — section is empty in production).
- `FrontPageNews` — home page secondary block.
- `GetTheBookBanner` — footer/CTA banner version.
- `GetTheBookLinks` — Amazon AU / US / UK buy buttons.
- `Bookstore`, `SupportYourLocalBookstore`, `Stockists` — local indie bookstore content.
- `Reviews`, `Testimonials/TestimonialList` — social proof.
- `FreeSampleDownload` — download-the-PDF CTA.
- `Feedback` — feedback form.

**Layout / utility:**
- `layout.tsx`, `Container.tsx`, `waves.tsx`.

**Icons:**
- `icons/facebook`, `icons/insta`.

## 7. Image / illustration assets

In `public/images/`:
- Book covers: `mazmatics_bookCoverWeb1.jpg`, `mazmaticsBookCoverWebSmall-min.png`, `Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg` (multiple versions of the same asset — consolidate).
- "A Plus" page samples 001–006 — book interior previews.
- Brand: `Mazmatics-logo.png`, `MazmaticsFrontPageNews500web.png`, `lindyLarge.png` (character), `sunSingle-min.png`, `sunSprite-min.png`, `emailFunCOver.jpg`.
- Favicons: 16/32/192/512, apple-touch-icon. Manifest is **not linked** (see Audit Findings §3).

## 8. Tailwind status

`tailwindcss@^3.1.8` is installed but **no `tailwind.config.js`/`tailwind.config.ts` exists** at the project root. There is no `@tailwind base/components/utilities` import in `globals.css`. **Tailwind is effectively dead weight in the current build.** Decide during redesign whether to remove it or actually adopt it (recommended: keep, configure properly, migrate gradually with the existing CSS Module tokens).

## 9. Audit findings (live site, 2026-04-30)

Captured via Playwright on `mazmatics.com` (desktop 1440×900, mobile 390×844). Full screenshots in `docs/audit/screenshots/`.

### SEO / meta — CRITICAL gaps
On the home page:
- ❌ **No Open Graph tags** (`og:title`, `og:description`, `og:image`, `og:type`) — link previews on Facebook, iMessage, Slack will be blank/ugly.
- ❌ **No Twitter Card** (`twitter:card`, `twitter:image`).
- ❌ **No canonical URL**.
- ❌ **No structured data** (`application/ld+json`). Should have `Book` Schema.org with author, ISBN, image, offers (Amazon link), aggregateRating.
- ❌ **No `<html lang>`** attribute set.
- ❌ **No `<link rel="manifest">`** despite android-chrome icons being present.
- ❌ **No `apple-touch-icon` link** despite `apple-touch-icon.png` being in `public/`.
- ❌ **9 of 18 images missing `alt` attributes** on the home page.
- ⚠️ **H1 is "Welcome to Mazmatics"** — non-descriptive; should be keyword-rich (e.g., "Fun maths activity book for kids 7–10"). Current H1 wastes the most valuable on-page SEO real estate.
- ⚠️ Meta `description` exists but uses "math" (US spelling) only — fine for US audience, weaker for AU/UK/NZ search.

### Performance
- DOM Content Loaded: ~259ms — good.
- Load Event: ~1528ms — acceptable but unoptimised images dominate (`next/legacy/image`, multiple book-cover variants). Modern `<Image>` would help.
- React hydration error #418 logged on /stockists (warning level — likely a server/client text mismatch from the locale-aware `mathsWord`).

### UX / conversion
- 🔴 **`/get-the-book` and `/free-sample` "Look inside" sections are empty** in production (the carousel/preview component renders an empty area). Big chunk of dead space on the most important conversion pages.
- 🔴 **No persistent buy CTA in the navbar** — readers have to scroll to find buy links, especially on the home page.
- 🟡 Hero on home page is doing a lot: navbar, gradient bg, character mark, signup form, decorative grid paper — value proposition isn't immediately legible.
- 🟡 Footer "FUN MATH 4 KIDS BOOK" wordmark is meant to be the chunky display style but renders as Outfit fallback (Bungee Shade not loaded — see Typography note).
- 🟡 Mobile (390px) home is **very long** — appears to scroll for ~10–12 screen-heights before the user reaches the testimonial / sign-up. Hero density is low; emotional/value hooks slow.
- 🟡 Multiple repeated/redundant components (`mailinglist.tsx` vs `join-mailing-list.tsx`, multiple book-cover image files). Suggests refactor opportunity.
- 🟡 Banner has `.small` size that gets *smaller* at `≥30rem` (2.2rem → 2rem) — likely an unintentional inversion.

### Accessibility
- Missing `lang` attribute is a WCAG fail.
- Missing alt text on 9 images is a WCAG fail.
- The decorative wavy underline on `<strong>` inside h3 has acceptable contrast but may not be legible to low-vision users.
- Reduced-motion preference is respected on the `wavesAnimate` keyframe — good.

---

## 10. Accessibility standard for the redesign

**Bar: WCAG 2.2 AA at minimum, AAA where pragmatically appropriate.**

The current site has clear AA failures (no `<html lang>`, missing alt text on 9 of 18 home-page images, reliance on a script font for some decorative copy). The redesign is the moment to fix these and set a higher floor going forward. Every page must pass an axe-core / Lighthouse a11y check before being marked done.

**AA criteria the redesign must hit:**
- Contrast: 4.5:1 normal text, 3:1 large text and meaningful non-text elements
- Keyboard: every interactive element reachable and operable; visible focus state
- Alt text: every meaningful image; decorative images marked `alt=""` or `aria-hidden`
- Semantic landmarks: one `<main>`, named `<nav>`, `<header>`, `<footer>`; proper heading order
- Forms: labelled inputs, errors associated with fields
- Reduced motion: every animation respects `prefers-reduced-motion`
- `<html lang="en">` set
- Targets: ≥24×24 CSS px (AA); reach for ≥44×44 (AAA) where it doesn't break layout

**AAA criteria to reach for when cheap:**
- Body copy contrast 7:1
- Text resizes to 200% without overflow/clipping
- No autoplay motion ≥5s
- Don't rely on color alone to convey state

## 11. What's good (don't lose this in redesign)

- Strong brand voice: warm, playful, growth-mindset.
- Distinctive purple→blue gradient + chunky/scrappy aesthetic differentiates from "generic kids' edu site".
- Locale-aware "math/maths" word swap is a genuinely thoughtful detail.
- Wavy underline on emphasised words is a brand signature.
- Clean type stack (Outfit) with character accents (Daruma, Pacifico) when properly executed.
- Fast initial load (DCL <300ms).
- Hand-drawn illustrations and character marks (sun, "I like maths" doodle, kids drawing) feel personal — don't replace with stock imagery.
