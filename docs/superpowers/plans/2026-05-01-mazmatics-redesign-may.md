# Mazmatics redesign-may — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a redesigned, conversion-focused, accessible Mazmatics marketing site (`/`, `/about`, `/get-the-book` plus light-touch updates to secondary pages) within 3 days of focused implementation, replacing the current 3-button Amazon CTA with a single locale-aware pattern, fixing the broken Look Inside, adding complete SEO/OG/Schema metadata, and meeting WCAG 2.2 AA across touched pages.

**Architecture:** Next.js 15 Pages Router stays. Tailwind is configured (gradual adoption alongside existing CSS Modules) and shares its design tokens with a new `styles/tokens.css` source-of-truth. Pure logic (locale → storefront mapping) is extracted to `lib/locale.ts` and unit-tested with `node:test`. Visual/keyboard tests use Playwright (already present as MCP, added as npm dep). Accessibility verified via axe-core CLI. Single shared `<SiteHead>` component owns SEO/OG/Schema for every page. New `<AmazonCTAButton>` component implements the locale-aware CTA pattern across all surfaces.

**Tech Stack:** Next.js 15 (Pages Router), React 19, TypeScript 5.9, Tailwind 3, CSS Modules, MailerLite, Google Analytics 4 (already wired). Adds: `@playwright/test`, `@axe-core/cli`, `next-sitemap` as dev dependencies.

**Companion docs:**
- Spec: `docs/superpowers/specs/2026-05-01-mazmatics-redesign-design.md`
- Audit/screenshots: `docs/audit/screenshots/`
- DESIGN.md, PRODUCT.md, CLAUDE.md at repo root
- Changelog: `docs/redesign-may/CHANGELOG.md`

**Commit cadence:** Per-task commits with concise, focused messages. Update `docs/redesign-may/CHANGELOG.md` at each meaningful chunk (typically every 2-3 commits).

**Auto-mode handoff:** After **Task 11** (Day 1 morning checkpoint) lands and Maz confirms no surprises, switch to auto mode for the rest of execution. Maz reviews per-day at the end of each day's work.

---

## File structure

### New files

| Path | Purpose |
|---|---|
| `styles/tokens.css` | Single source of truth for color/type/spacing custom properties (extracted from `globals.css`) |
| `tailwind.config.ts` | Tailwind config; consumes the same tokens |
| `postcss.config.js` | Required by Tailwind |
| `lib/locale.ts` | Pure functions: locale → Amazon storefront, locale → shipping-copy bool |
| `lib/locale.test.ts` | `node:test` unit tests for locale logic |
| `components/SiteHead.tsx` | Single SEO/OG/Schema head component |
| `components/AmazonCTAButton/index.tsx` | Locale-aware buy CTA (Pattern C) |
| `components/AmazonCTAButton/AmazonCTAButton.module.css` | Styles |
| `components/PersistentBuyCTA/index.tsx` | Compact CTA for navbar slot |
| `components/PersistentBuyCTA/PersistentBuyCTA.module.css` | Styles |
| `components/LookInside/index.tsx` | Lightbox carousel (replaces broken old `LookInside`) |
| `components/LookInside/LookInside.module.css` | Styles |
| `components/SectionDivider/index.tsx` | Consolidated divider component |
| `tests/look-inside.spec.ts` | Playwright keyboard/focus tests |
| `tests/locale.test.ts` (alias) | Re-exports locale tests for unified runner if needed |
| `next-sitemap.config.js` | Sitemap config |
| `public/og/home.png` | Default OG image (1200×630) — placeholder until Maz supplies final |

### Modified files

| Path | What changes |
|---|---|
| `package.json` | Add devDeps + `test`, `test:e2e`, `a11y` scripts |
| `styles/globals.css` | Import `tokens.css`, add `@tailwind` directives, remove tokens that moved, remove Pacifico `@font-face` |
| `pages/_document.js` | Add `lang`, manifest link, apple-touch-icon link |
| `pages/_app.tsx` | Wire SiteHead defaults; add new GA events |
| `pages/index.tsx` | New home hero + restructured below-fold |
| `pages/about/index.tsx` | Re-skinned with editorial structure + scrappy transitions |
| `pages/get-the-book/index.tsx` | Re-skinned + AmazonCTAButton + new LookInside |
| `pages/free-sample/index.tsx` | AmazonCTAButton + SiteHead + remove `debugger` statement |
| `pages/write-a-review/index.tsx` | SiteHead + light token update |
| `pages/feedback.tsx` | SiteHead + light token update |
| `pages/join-mailing-list.tsx` | SiteHead + light token update |
| `components/navbar.tsx` | Add PersistentBuyCTA slot |
| `components/footer.tsx` | Tighten spacing, replace footer wave with SectionDivider |
| `components/getTheBookLinks/index.tsx` | Replace 3 buttons with AmazonCTAButton |
| `components/freeSample/index.tsx` | Replace `Button` with AmazonCTAButton (the buy section); remove `debugger` |
| `lib/gtag.js` | Add helper functions for new events with typed action names |
| `next.config.js` | Add 301 redirects for `/stockists`, `/wholesalers` |
| `.husky/pre-commit` | Remove deprecated v10 lines (small unrelated fix) |

### Deleted files

| Path | Reason |
|---|---|
| `pages/stockists.tsx`, `pages/stockists.module.css` | Page being removed |
| `pages/wholesalers.tsx`, `pages/wholesalers.module.css` | Page being removed |
| `Oldnext.config.js` | Cruft |
| `YEAHNAHeslintrc.json` | Cruft |
| `components/bookstore.tsx`, `components/bookstore.module.css` | Used only by deleted pages (verify) |
| `components/supportYourLocalBookstore.tsx`, `components/supportYourLocalBookstore.module.css` | Used only by deleted pages (verify) |
| `public/fonts/pacifico/pacifico.woff`, `pacifico.woff2` | Pacifico removed (no-handwritten-fonts rule) |
| `public/fonts/primer/` (entire dir) | Already unused (commented-out @font-face) |
| `mazmaticsBookCoverWebSmall-min.png` (if not referenced) | Redundant book-cover variant |

---

## Phase 1A — Day 1 morning (Foundations sprint)

> Goal: every subsequent day's work stands on solid foundations. Runs as one focused block.

### Task 1: Install dev dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add dev dependencies**

Run from project root:
```bash
yarn add -D @playwright/test @axe-core/cli next-sitemap
```

- [ ] **Step 2: Add npm scripts**

Edit `package.json`'s `scripts` block to add:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint --fix .",
    "test": "node --test --import tsx --test-reporter=spec lib/locale.test.ts",
    "test:e2e": "playwright test",
    "a11y": "axe http://localhost:3000 http://localhost:3000/about http://localhost:3000/get-the-book --exit",
    "postbuild": "next-sitemap"
  }
}
```

Also add `tsx` to enable TypeScript test files via `node --test`:
```bash
yarn add -D tsx
```

- [ ] **Step 3: Initialize Playwright config**

Create `playwright.config.ts`:
```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
```

- [ ] **Step 4: Verify install**

Run:
```bash
yarn build && yarn lint
```
Expected: build succeeds, no new lint errors.

- [ ] **Step 5: Commit**

```bash
git add package.json yarn.lock playwright.config.ts
git commit -m "chore(deps): add playwright, axe-core, next-sitemap, tsx for testing"
```

---

### Task 2: Cleanup — delete cruft, dead pages, debugger statement

**Files:**
- Delete: `Oldnext.config.js`, `YEAHNAHeslintrc.json`, `pages/stockists.tsx`, `pages/stockists.module.css`, `pages/wholesalers.tsx`, `pages/wholesalers.module.css`
- Modify: `components/freeSample/index.tsx` (remove `debugger`)

- [ ] **Step 1: Verify no references to dead pages from surviving code**

Run:
```bash
grep -rn 'stockists\|wholesalers\|bookstore' --include='*.tsx' --include='*.ts' --include='*.js' . 2>/dev/null | grep -v node_modules | grep -v .next
```
Expected output: only references *within* the files we're about to delete (`pages/stockists.tsx`, `pages/wholesalers.tsx`, `components/bookstore.tsx`, `components/supportYourLocalBookstore.tsx`, plus possibly `NavBarLinks.tsx` or footer linking to them).

- [ ] **Step 2: Note any links from surviving code**

If `NavBarLinks.tsx` or `footer.tsx` references the dead routes, capture those line numbers — we'll fix them in this same task.

- [ ] **Step 3: Delete cruft files**

```bash
rm Oldnext.config.js YEAHNAHeslintrc.json
rm pages/stockists.tsx pages/stockists.module.css
rm pages/wholesalers.tsx pages/wholesalers.module.css
rm components/bookstore.tsx components/bookstore.module.css
rm components/supportYourLocalBookstore.tsx components/supportYourLocalBookstore.module.css
```

- [ ] **Step 4: Remove the `debugger` statement in freeSample**

In `components/freeSample/index.tsx`, delete line 14 (the `debugger` keyword between the gtag call and the redirect). The result of that block should be:
```tsx
const onFreeSampleDownloadAnalytics = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  gtag('event', 'free_sample_downloaded', {
    event_category: 'free_sample_downloaded',
    event_label: 'free_sample_downloaded',
  })
  window.location.href =
    '/downloads/Mazmatics_FunMathForKids_vol1_Free_Sample_PDF.pdf'
}
```

- [ ] **Step 5: Remove links to deleted pages**

Edit any `NavBarLinks.tsx` / `footer.tsx` lines that point to `/stockists` or `/wholesalers` — delete those nav items / list items entirely.

- [ ] **Step 6: Verify build**

Run:
```bash
yarn build
```
Expected: builds cleanly with no missing-route errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove stockists, wholesalers, cruft files, and stray debugger

Mazmatics is no longer stocked in physical bookstores; sales path is
Amazon-only. Deletes /stockists and /wholesalers pages, the bookstore
and supportYourLocalBookstore components used only by them, and stale
top-level cruft files (Oldnext.config.js, YEAHNAHeslintrc.json).

Also removes a stray debugger statement in freeSample/index.tsx that
was shipping to production."
```

---

### Task 3: Token extraction → `styles/tokens.css`

**Files:**
- Create: `styles/tokens.css`
- Modify: `styles/globals.css`

- [ ] **Step 1: Create `styles/tokens.css`**

Copy the entire `:root { ... }` block currently in `globals.css` (lines ~1-67 covering colors, gradients, shadows, validation, container, fonts) into the new file. Resulting file:

```css
:root {
  --black: #3a3a39;
  --white: #fff;
  --gray-5: #3a3a39;
  --gray-4: #646461;
  --gray-3: #a2a29f;
  --gray-1: #f2f2f1;
  --yellow-1: #fff73e;
  --green-2: #4ecca3;
  --green-1: #6be7bf;
  --blue-1: #dff9fc;
  --blue-2: #c5f8ff;
  --blue-4: #47a5f1;
  --blue-5: #207bc5;
  --purple-2: #ba90ff;
  --purple-3: #8c5fd5;

  --gradient-1: linear-gradient(to left, var(--purple-2), var(--blue-4));

  --box-shadow-1: 0px 4px 16px -6px rgba(0, 0, 0, 0.75);
  --box-shadow-2: 10px 14px 21px -9px rgba(0, 0, 0, 0.95);
  --box-shadow-3: 0px 4px 16px -6px rgba(0, 0, 0, 0.35);
  --box-shadow-inset-double: 1px 13px 10px -2px rgba(0, 0, 0, 0.08) inset,
    1px -9px 10px -2px rgba(0, 0, 0, 0.08) inset;

  --validation-success-color: #affeb8;
  --validation-error-color: rgb(247, 119, 97);

  --site-container-max-width: 1200px;
  --site-container-padding: 2rem;

  --nav-height: 65px;

  --font-headings: 'Outfit', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  --font-button: var(--font-headings);

  --font-headings-fun: 'Daruma', -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  --font-headings-display: 'Bungee Shade', 'Outfit', -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
    Droid Sans, Helvetica Neue, sans-serif;
  --font-copy: 'Outfit', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  --bettySize: 200px;
}

@media screen and (min-width: 50rem) {
  :root {
    --site-container-padding: 2rem 5.5rem;
  }
}
```

Note: `--font-script` (Pacifico) is **deliberately omitted** — Pacifico is being removed in Task 9.

- [ ] **Step 2: Update `styles/globals.css`**

At the very top of `globals.css`, replace the original `:root { ... }` block (and the `@media (min-width: 50rem) { :root { ... } }` block) with:
```css
@import './tokens.css';
```
Leave everything else (font-faces, base styles, h1/h2/h3 rules, etc.) intact, except for these two cleanups in this same task:

1. Remove the `@font-face` block for Pacifico (lines ~78-85 of original `globals.css`).
2. Remove any references to `--font-script` in this file. Replace with `font-style: italic` or `font-variant: small-caps` per usage. (We'll grep for remaining usages in Task 9.)

- [ ] **Step 3: Verify visually**

```bash
yarn dev
```
Open `http://localhost:3000` in browser. Compare against `docs/audit/screenshots/desktop-home.png`. Visually nothing should have changed (color, type, spacing all identical) — this task is a refactor only.

- [ ] **Step 4: Commit**

```bash
git add styles/tokens.css styles/globals.css
git commit -m "refactor(styles): extract design tokens to tokens.css

Single source of truth for color/type/spacing/font tokens. Tailwind
config (next task) will consume these same tokens so the two systems
stay aligned. No visual change."
```

---

### Task 4: Tailwind configuration

**Files:**
- Create: `tailwind.config.ts`, `postcss.config.js`
- Modify: `styles/globals.css`

- [ ] **Step 1: Create `postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 2: Add autoprefixer**

```bash
yarn add -D autoprefixer
```

- [ ] **Step 3: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--black)',
        paper: 'var(--white)',
        gray: {
          100: 'var(--gray-1)',
          300: 'var(--gray-3)',
          400: 'var(--gray-4)',
          500: 'var(--gray-5)',
        },
        yellow: { DEFAULT: 'var(--yellow-1)' },
        blue: {
          50: 'var(--blue-1)',
          100: 'var(--blue-2)',
          400: 'var(--blue-4)',
          500: 'var(--blue-5)',
        },
        purple: {
          400: 'var(--purple-2)',
          600: 'var(--purple-3)',
        },
        green: {
          400: 'var(--green-1)',
          500: 'var(--green-2)',
        },
      },
      fontFamily: {
        heading: ['var(--font-headings)'],
        'heading-fun': ['var(--font-headings-fun)'],
        'heading-display': ['var(--font-headings-display)'],
        copy: ['var(--font-copy)'],
      },
      maxWidth: { container: 'var(--site-container-max-width)' },
      boxShadow: {
        soft: 'var(--box-shadow-3)',
        strong: 'var(--box-shadow-1)',
        heavy: 'var(--box-shadow-2)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Wire Tailwind directives into `globals.css`**

At the **very top** of `globals.css` (above the existing `@import './tokens.css';`), add:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Result:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import './tokens.css';

/* (existing globals: font-face, base, h1-h3 rules, etc.) */
```

- [ ] **Step 5: Smoke-test Tailwind classes**

In `pages/index.tsx`, temporarily add a Tailwind class to an existing element (e.g., add `className="ring-2 ring-purple-400"` to the outer wrapper). Run `yarn dev`. Confirm the ring appears. Remove the test class.

- [ ] **Step 6: Verify no visual regression**

`yarn build` cleanly. Page visuals unchanged from token extraction.

- [ ] **Step 7: Commit**

```bash
git add tailwind.config.ts postcss.config.js styles/globals.css package.json yarn.lock
git commit -m "feat(styles): configure Tailwind to consume project tokens

Tailwind is now properly wired (was installed but inert). Theme.extend
maps Tailwind utilities to the same CSS custom properties used by
existing CSS Modules — Tailwind and CSS Modules share one source of
truth via tokens.css.

New components may use Tailwind utility classes; existing CSS Modules
continue to work unchanged. Gradual adoption only."
```

---

### Task 5: `lib/locale.ts` + tests (TDD)

**Files:**
- Create: `lib/locale.ts`, `lib/locale.test.ts`

- [ ] **Step 1: Write the failing test first**

Create `lib/locale.test.ts`:
```ts
import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { storefrontFor, shippingCopyFor, isHighConfidenceLocale } from './locale'

test('en-US → amazon.com US storefront', () => {
  assert.equal(storefrontFor('en-US').region, 'US')
  assert.equal(storefrontFor('en-US').url, 'https://www.amazon.com/dp/0473648911')
})

test('en-GB → amazon.co.uk UK storefront', () => {
  assert.equal(storefrontFor('en-GB').region, 'UK')
  assert.equal(storefrontFor('en-GB').url, 'https://www.amazon.co.uk/dp/0473648911')
})

test('en-AU → amazon.com.au AU storefront', () => {
  assert.equal(storefrontFor('en-AU').region, 'AU')
  assert.equal(storefrontFor('en-AU').url, 'https://www.amazon.com.au/dp/0473648911')
})

test('en-NZ → amazon.com.au AU storefront (NZ ships from AU)', () => {
  assert.equal(storefrontFor('en-NZ').region, 'AU')
  assert.equal(storefrontFor('en-NZ').url, 'https://www.amazon.com.au/dp/0473648911')
})

test('unknown locale falls back to US', () => {
  assert.equal(storefrontFor('fr-CA').region, 'US')
  assert.equal(storefrontFor('').region, 'US')
  assert.equal(storefrontFor(undefined).region, 'US')
})

test('shipping copy for known locales', () => {
  assert.equal(shippingCopyFor('en-NZ'), 'ships to Aotearoa NZ from Australia')
  assert.equal(shippingCopyFor('en-AU'), 'ships within Australia')
  assert.equal(shippingCopyFor('en-US'), 'Prime eligible')
  assert.equal(shippingCopyFor('en-GB'), 'ships within the UK')
})

test('shipping copy is null for unknown locales', () => {
  assert.equal(shippingCopyFor('fr-CA'), null)
  assert.equal(shippingCopyFor(''), null)
  assert.equal(shippingCopyFor(undefined), null)
})

test('isHighConfidenceLocale recognises the four canonical locales', () => {
  assert.equal(isHighConfidenceLocale('en-NZ'), true)
  assert.equal(isHighConfidenceLocale('en-AU'), true)
  assert.equal(isHighConfidenceLocale('en-US'), true)
  assert.equal(isHighConfidenceLocale('en-GB'), true)
  assert.equal(isHighConfidenceLocale('fr-CA'), false)
  assert.equal(isHighConfidenceLocale(''), false)
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
yarn test
```
Expected: FAIL with "Cannot find module './locale'" (or similar).

- [ ] **Step 3: Implement `lib/locale.ts`**

```ts
export type Region = 'AU' | 'US' | 'UK'

export interface Storefront {
  region: Region
  url: string
  label: string
}

const ASIN = '0473648911'

const STOREFRONTS: Record<Region, Storefront> = {
  AU: {
    region: 'AU',
    url: `https://www.amazon.com.au/dp/${ASIN}`,
    label: 'Buy on Amazon Australia',
  },
  US: {
    region: 'US',
    url: `https://www.amazon.com/dp/${ASIN}`,
    label: 'Buy on Amazon US',
  },
  UK: {
    region: 'UK',
    url: `https://www.amazon.co.uk/dp/${ASIN}`,
    label: 'Buy on Amazon UK',
  },
}

export const ALL_STOREFRONTS: Storefront[] = [STOREFRONTS.AU, STOREFRONTS.US, STOREFRONTS.UK]

export function storefrontFor(locale: string | undefined): Storefront {
  switch (locale) {
    case 'en-AU':
    case 'en-NZ':
      return STOREFRONTS.AU
    case 'en-GB':
      return STOREFRONTS.UK
    case 'en-US':
      return STOREFRONTS.US
    default:
      return STOREFRONTS.US
  }
}

export function shippingCopyFor(locale: string | undefined): string | null {
  switch (locale) {
    case 'en-NZ':
      return 'ships to Aotearoa NZ from Australia'
    case 'en-AU':
      return 'ships within Australia'
    case 'en-US':
      return 'Prime eligible'
    case 'en-GB':
      return 'ships within the UK'
    default:
      return null
  }
}

export function isHighConfidenceLocale(locale: string | undefined): boolean {
  return locale === 'en-NZ' || locale === 'en-AU' || locale === 'en-US' || locale === 'en-GB'
}
```

- [ ] **Step 4: Run tests to verify pass**

```bash
yarn test
```
Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/locale.ts lib/locale.test.ts
git commit -m "feat(locale): add storefront mapping with TDD coverage

Pure functions:
- storefrontFor(locale) → { region, url, label }
- shippingCopyFor(locale) → string | null
- isHighConfidenceLocale(locale) → boolean

en-NZ maps to AU (NZ ships from AU faster than US). Unknown/empty
locales default to US (largest English Amazon catalogue). Tests use
node:test (no test-framework config). This is the basis for the new
AmazonCTAButton component."
```

---

### Task 6: `SiteHead` component

**Files:**
- Create: `components/SiteHead.tsx`

- [ ] **Step 1: Create `components/SiteHead.tsx`**

```tsx
import Head from 'next/head'
import { useRouter } from 'next/router'

export interface SiteHeadProps {
  title?: string
  description?: string
  ogImage?: string
  noIndex?: boolean
  schemaJsonLd?: Record<string, unknown>
}

const SITE_NAME = 'Mazmatics'
const DEFAULT_TITLE = 'Mazmatics — Fun maths book for kids 7-10'
const DEFAULT_DESCRIPTION =
  'Help kids say "I like math". A paperback activity & story book for ages 7-10, available on Amazon.'
const DEFAULT_OG_IMAGE = 'https://mazmatics.com/og/home.png'
const SITE_ORIGIN = 'https://mazmatics.com'

export const SiteHead: React.FC<SiteHeadProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  schemaJsonLd,
}) => {
  const router = useRouter()
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : DEFAULT_TITLE
  const canonical = `${SITE_ORIGIN}${router.asPath.split('?')[0]}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />

      {schemaJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      )}
    </Head>
  )
}
```

- [ ] **Step 2: Confirm import works**

In any page (e.g., `pages/index.tsx`), temporarily add:
```tsx
import { SiteHead } from '../components/SiteHead'
```
Run `yarn build`. Expected: clean build. Remove the test import.

- [ ] **Step 3: Commit**

```bash
git add components/SiteHead.tsx
git commit -m "feat(seo): add SiteHead component with default OG/Twitter/canonical

Single source of meta tags for every page. Defaults cover the home
page; per-page overrides accepted via props. Optional Schema.org
JSON-LD slot for /get-the-book to add Book structured data.

Pages will be migrated from inline <Head> to <SiteHead> in the
upcoming page tasks."
```

---

### Task 7: GA event helpers expansion

**Files:**
- Modify: `lib/gtag.js`

- [ ] **Step 1: Replace `lib/gtag.js` with typed event helpers**

```js
export const pageview = (url) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

const send = (action, params = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, params)
}

export const event = ({ action, category, label, value }) => {
  send(action, { event_category: category, event_label: label, value })
}

export const trackAmazonCTA = ({ region, location }) => {
  send('amazon_cta_click', {
    event_category: 'cta',
    event_label: location,
    region,
  })
}

export const trackMailingListSubmit = (location) => {
  send('mailing_list_submit', {
    event_category: 'conversion',
    event_label: location,
  })
}

export const trackLookInsideOpen = (location) => {
  send('look_inside_open', {
    event_category: 'engagement',
    event_label: location,
  })
}

export const trackNavBuyClick = () => {
  send('nav_buy_click', {
    event_category: 'cta',
    event_label: 'persistent_nav',
  })
}

export const trackFreeSampleDownload = () => {
  send('free_sample_downloaded', {
    event_category: 'conversion',
    event_label: 'free_sample',
  })
}
```

- [ ] **Step 2: Replace the inline gtag call in `freeSample/index.tsx`**

In `components/freeSample/index.tsx`, replace the imperative `gtag(...)` call with:
```tsx
import { trackFreeSampleDownload } from '../../lib/gtag'

// inside the click handler:
trackFreeSampleDownload()
```
Remove the `// @ts-ignore` and `// eslint-disable-next-line` comments since they're no longer needed.

- [ ] **Step 3: Verify build**

```bash
yarn build
```

- [ ] **Step 4: Commit**

```bash
git add lib/gtag.js components/freeSample/index.tsx
git commit -m "feat(analytics): add typed event helpers for redesign metrics

Adds trackAmazonCTA (with region param), trackMailingListSubmit,
trackLookInsideOpen, trackNavBuyClick, trackFreeSampleDownload.
All helpers no-op on the server / when gtag is not yet loaded.

Migrates the existing inline gtag call in freeSample/index.tsx to
use the new helper. Inline @ts-ignore goes away."
```

---

### Task 8: Document language + manifest + apple-touch-icon

**Files:**
- Modify: `pages/_document.js`
- Create: `public/site.webmanifest`

- [ ] **Step 1: Create `public/site.webmanifest`**

```json
{
  "name": "Mazmatics",
  "short_name": "Mazmatics",
  "icons": [
    { "src": "/images/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/images/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#8c5fd5",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

- [ ] **Step 2: Update `pages/_document.js`**

Replace the file with:
```jsx
import React from 'react'

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <meta name="theme-color" content="#8c5fd5" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
yarn dev
```
Open `http://localhost:3000`. Open DevTools → Application → Manifest. Confirm manifest is detected and icons load. Inspect `<html>` element — confirm `lang="en"` is present.

- [ ] **Step 4: Commit**

```bash
git add pages/_document.js public/site.webmanifest
git commit -m "feat(a11y/pwa): add html lang, web manifest, full icon set

Sets <html lang='en'> (WCAG 2.2 AA criterion). Adds web manifest,
apple-touch-icon link, and full favicon set — icons existed in
public/ but were not linked. Theme color matches brand purple."
```

---

### Task 9: Pacifico removal + alt-text sweep

**Files:**
- Modify: `styles/globals.css` (any remaining `--font-script` references)
- Delete: `public/fonts/pacifico/pacifico.woff`, `public/fonts/pacifico/pacifico.woff2`, the directory itself
- Delete: `public/fonts/primer/` (entire directory — already unused)
- Modify: any component using `--font-script`

- [ ] **Step 1: Find Pacifico usages**

```bash
grep -rn 'font-script\|Pacifico\|pacifico' --include='*.tsx' --include='*.ts' --include='*.css' . 2>/dev/null | grep -v node_modules | grep -v .next
```

Likely matches: `Home.module.css` (`.signupLoading`, `.orDivider`), `footer.module.css` (`.signupLoading`).

- [ ] **Step 2: Replace each `--font-script` usage**

For `.orDivider` (in `Home.module.css`):
```css
.orDivider {
  margin: 0;
  font-family: var(--font-headings);
  font-style: italic;
  font-size: 1.6rem;
  color: var(--gray-4);
}
```

For `.signupLoading` (both in `Home.module.css` and `footer.module.css`): replace `font-family: var(--font-script);` with `font-family: var(--font-headings); font-style: italic;`

- [ ] **Step 3: Delete fonts**

```bash
rm -rf public/fonts/pacifico public/fonts/primer
```

- [ ] **Step 4: Alt-text sweep**

Open the home page in DevTools and find images without `alt`. From the audit (DESIGN.md §9), 9 of 18 home images miss alt. Edit each `<Image>` / `<img>` usage in:
- `pages/index.tsx`
- `components/banner.tsx`
- `components/home/homeHeader.tsx`
- `components/FrontPageNews.tsx`
- `components/LookInside.tsx`
- `components/testimonials/TestimonialList.tsx`
- `components/reviews.tsx`

For decorative images (grid paper, waves, sun sprites), set `alt=""` and `aria-hidden="true"`. For meaningful images (book covers, page samples, character marks that convey meaning), provide a descriptive alt. Examples:
- Book cover: `alt="Mazmatics: Fun Math 4 Kids Vol. 1 paperback book cover — yellow cover with kids and equations"`
- Page sample: `alt="Inside the book: a maths puzzle page with hand-drawn illustrations"`
- Decorative: `alt="" aria-hidden="true"`

- [ ] **Step 5: Verify with axe**

Start dev server in another terminal (`yarn dev`), then run:
```bash
yarn a11y
```
Expected: 0 errors related to "image-alt" rule. Other a11y violations are OK at this stage — we'll address them in Task 24.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore(a11y): remove pacifico, add alt text to all home page images

Per the no-handwritten-fonts rule, Pacifico is replaced with italic
treatment of Outfit. Pacifico woff files and the unused primer/
font directory are deleted (recoverable from git if needed).

Alt-text sweep: 9 missing-alt images on the home page now have
meaningful descriptions or alt='' aria-hidden='true' for decorative
imagery. axe-core image-alt rule passes."
```

---

### Task 10: 301 redirects for deleted routes

**Files:**
- Modify: `next.config.js`

- [ ] **Step 1: Add `redirects()` function**

Edit `next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  experimental: { appDir: false, turbo: false },
  env: { NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL },
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/stockists',
        destination: '/get-the-book',
        permanent: true,
      },
      {
        source: '/wholesalers',
        destination: '/get-the-book',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

- [ ] **Step 2: Verify**

```bash
yarn dev
```
Visit `http://localhost:3000/stockists` — should 301 to `/get-the-book`. Same for `/wholesalers`.

- [ ] **Step 3: Commit**

```bash
git add next.config.js
git commit -m "chore(routes): 301 redirect /stockists and /wholesalers to /get-the-book

Preserves any external backlinks (Google, social posts) to those URLs."
```

---

### Task 11: Day 1 morning checkpoint — auto mode handoff

**Files:**
- Modify: `docs/redesign-may/CHANGELOG.md`

- [ ] **Step 1: Update changelog**

Prepend to `docs/redesign-may/CHANGELOG.md`:
```markdown
## 2026-05-DD (Day 1 morning) — Foundations sprint complete

**What:** Cleanup + tokens + Tailwind + locale logic + SiteHead + GA helpers + lang/manifest + Pacifico removal + redirects. 9 commits, all visible in `git log`.

**Why:** Every following task builds on these foundations. The site now has a single design-token source, a configured Tailwind, a SEO/OG/Schema component, typed analytics helpers, WCAG-compliant `<html lang>` + manifest, and tested locale logic for the new Amazon CTA.

**Auto-mode handoff:** From this point on, execution runs in auto mode through the rest of Day 1 + all of Days 2-3, with end-of-day checkpoints for Maz to review.
```

(Replace `DD` with the actual day-of-month.)

- [ ] **Step 2: Verify dev server runs cleanly**

```bash
yarn dev
```
Open `http://localhost:3000`, `/about`, `/get-the-book`, `/free-sample`. All pages load. No console errors. Visually unchanged from baseline screenshots (foundations are invisible, by design).

- [ ] **Step 3: Commit**

```bash
git add docs/redesign-may/CHANGELOG.md
git commit -m "docs(changelog): Day 1 morning foundations checkpoint"
```

- [ ] **Step 4: Pause for Maz to confirm**

Maz reviews the dev server, confirms nothing surprising broke. Once confirmed, switch to auto mode for all subsequent tasks.

---

## Phase 1B — Day 1 afternoon + Day 2 (Hero rebuild)

### Task 12: AmazonCTAButton component

**Files:**
- Create: `components/AmazonCTAButton/index.tsx`, `components/AmazonCTAButton/AmazonCTAButton.module.css`

- [ ] **Step 1: Create the component**

`components/AmazonCTAButton/index.tsx`:
```tsx
import React, { useContext, useState, useId } from 'react'
import { AppContext } from '../../context/appContext'
import {
  storefrontFor,
  shippingCopyFor,
  isHighConfidenceLocale,
  ALL_STOREFRONTS,
  type Storefront,
} from '../../lib/locale'
import { trackAmazonCTA } from '../../lib/gtag'
import styles from './AmazonCTAButton.module.css'

interface Props {
  /** Where on the site this button is — used as event_label */
  location: string
  /** Visual prominence */
  size?: 'compact' | 'standard' | 'hero'
  className?: string
}

export const AmazonCTAButton: React.FC<Props> = ({
  location,
  size = 'standard',
  className,
}) => {
  const { userLang } = useContext(AppContext)
  const [showOthers, setShowOthers] = useState(false)
  const expanderId = useId()

  // SSR-safe: server renders US default; hydration swaps to detected locale.
  const matched = storefrontFor(userLang)
  const shippingCopy = shippingCopyFor(userLang)
  const highConfidence = isHighConfidenceLocale(userLang)

  const otherStorefronts: Storefront[] = ALL_STOREFRONTS.filter(
    (s) => s.region !== matched.region,
  )

  const handlePrimaryClick = () => {
    trackAmazonCTA({ region: matched.region, location })
  }

  const handleOtherClick = (region: 'AU' | 'US' | 'UK') => () => {
    trackAmazonCTA({ region, location: `${location}_other_region` })
  }

  return (
    <div className={`${styles.wrapper} ${styles[size]} ${className ?? ''}`}>
      <a
        href={matched.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handlePrimaryClick}
        className={styles.primary}
        data-region={matched.region}
      >
        <span className={styles.primaryLabel}>
          {highConfidence && shippingCopy
            ? `Buy on Amazon — ${shippingCopy}`
            : 'Buy on Amazon'}
        </span>
        <span className={styles.regionBadge} aria-hidden="true">
          {matched.region}
        </span>
      </a>

      {highConfidence && (
        <div className={styles.expanderWrap}>
          <button
            type="button"
            className={styles.expanderToggle}
            aria-expanded={showOthers}
            aria-controls={expanderId}
            onClick={() => setShowOthers((v) => !v)}
          >
            Buying from another region?
          </button>
          {showOthers && (
            <ul id={expanderId} className={styles.otherList}>
              {otherStorefronts.map((s) => (
                <li key={s.region}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleOtherClick(s.region)}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create the styles**

`components/AmazonCTAButton/AmazonCTAButton.module.css`:
```css
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  max-width: 28rem;
}

.primary {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 56px; /* AAA target reach */
  padding: 1rem 1.5rem;
  background-image: var(--gradient-1);
  color: var(--white);
  text-decoration: none;
  font-family: var(--font-button);
  font-weight: 600;
  font-size: 1.05rem;
  border-radius: 8px;
  box-shadow: var(--box-shadow-1);
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
}

.primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--box-shadow-2);
}

.primary:active {
  transform: translateY(1px);
}

.primary:focus-visible {
  outline: 3px solid var(--yellow-1);
  outline-offset: 3px;
}

.primaryLabel {
  flex: 1;
  text-align: center;
}

.regionBadge {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  background: rgba(255, 255, 255, 0.18);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

.compact .primary {
  min-height: 44px;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
}

.hero .primary {
  min-height: 64px;
  font-size: 1.2rem;
  padding: 1.2rem 1.8rem;
}

.expanderWrap {
  text-align: center;
}

.expanderToggle {
  background: none;
  border: none;
  font-family: var(--font-copy);
  font-size: 0.95rem;
  color: var(--blue-5);
  text-decoration: underline;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}

.expanderToggle:focus-visible {
  outline: 2px solid var(--purple-2);
  outline-offset: 2px;
}

.otherList {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.otherList a {
  display: inline-block;
  padding: 0.3rem 0.5rem;
  color: var(--purple-3);
  text-decoration: underline;
  font-size: 0.95rem;
}
```

- [ ] **Step 3: Smoke test**

Temporarily render `<AmazonCTAButton location="smoke-test" />` somewhere in `pages/index.tsx`. `yarn dev`, view at `http://localhost:3000`. In DevTools console:
```js
document.querySelector('[data-region]').dataset.region
```
Expected: matches your browser locale (e.g., `"AU"` if running in NZ).

Click the "Buying from another region?" link → list reveals. Tab order works. Esc doesn't apply here (no modal). Remove the test render.

- [ ] **Step 4: Commit**

```bash
git add components/AmazonCTAButton/
git commit -m "feat(cta): AmazonCTAButton with locale-aware Pattern C

Single primary button matched to browser locale, with shipping
reassurance copy when locale is high-confidence. Other regions
exposed via inline aria-expanded toggle. SSR-safe: server defaults
to US, hydration swaps to detected locale (matches existing
useUserLang behaviour, no extra hydration mismatch surface).

Replaces the 3-button pattern that's been used until now. Fires
amazon_cta_click with a region parameter for Phase 2 analysis."
```

---

### Task 13: Replace 3-button pattern with AmazonCTAButton

**Files:**
- Modify: `components/getTheBookLinks/index.tsx`, `components/freeSample/index.tsx`

- [ ] **Step 1: Replace `getTheBookLinks/index.tsx`**

Full new content:
```tsx
import Image from 'next/image'

import bookProductImageClearCut from '../../public/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg'
import { AmazonCTAButton } from '../AmazonCTAButton'

import styles from './getTheBookLinks.module.css'
import { useContext } from 'react'
import { AppContext } from '../../context/appContext'

export const GetTheBookLinks = () => {
  const { mathsWord } = useContext(AppContext)

  return (
    <div className={styles.contentGrid}>
      <div className={styles.bookImageWrap}>
        <Image
          src={bookProductImageClearCut}
          alt="Mazmatics: Fun Math 4 Kids Vol. 1 paperback book cover — yellow cover featuring kids and illustrated equations"
          width={450}
          height={675}
          priority
        />
      </div>
      <div className={styles.action1}>
        <AmazonCTAButton location="get_the_book" size="hero" />
        <p className={styles.brandPromise}>
          <span className={styles.brandName}>Mazmatics</span> &mdash; supporting
          positive early experiences with {mathsWord}
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Update `getTheBookLinks.module.css`**

Adjust grid for the new content (remove old multi-button styles). Keep `.contentGrid`, add `.bookImageWrap`. Remove `.product_book1__linkGroup`, `.product_book1_buyNowBlock`, etc. (now handled by `AmazonCTAButton`'s own styles).

If the existing CSS is large, simplify. The page-level layout (around the component on `/get-the-book`) is updated in Task 20.

- [ ] **Step 3: Update `components/freeSample/index.tsx`**

The existing FreeSampleDownload component renders only the "Download a free sample" CTA, not buy buttons — leave that part as-is (it's already migrated to `trackFreeSampleDownload` from Task 7). No buy-button replacement needed here. **Verify by reading the file** — only the download CTA should remain in this component.

If the component has any residual 3-button buy block (e.g., in a wrapping page like `pages/free-sample/index.tsx`), that wrapper page is updated in Task 21.

- [ ] **Step 4: Verify**

```bash
yarn dev
```
Visit `/get-the-book`. Confirm: one big buy CTA appears (locale-matched), one "Buying from another region?" link below, click expands. Visit `/free-sample`. Confirm the page still has its download CTA functioning.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor(cta): replace 3-button pattern with AmazonCTAButton

GetTheBookLinks now renders one locale-aware CTA. Visual hierarchy
massively cleaner; mobile screen real estate respected. Free sample
component already used the typed event helper from Task 7."
```

---

### Task 14: PersistentBuyCTA in nav

**Files:**
- Create: `components/PersistentBuyCTA/index.tsx`, `components/PersistentBuyCTA/PersistentBuyCTA.module.css`
- Modify: `components/navbar.tsx`

- [ ] **Step 1: Create `components/PersistentBuyCTA/index.tsx`**

```tsx
import React, { useContext } from 'react'
import { AppContext } from '../../context/appContext'
import { storefrontFor } from '../../lib/locale'
import { trackNavBuyClick } from '../../lib/gtag'
import styles from './PersistentBuyCTA.module.css'

export const PersistentBuyCTA: React.FC = () => {
  const { userLang } = useContext(AppContext)
  const matched = storefrontFor(userLang)

  return (
    <a
      href={matched.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackNavBuyClick}
      className={styles.cta}
      data-region={matched.region}
      aria-label={`Buy on Amazon ${matched.region} (opens in new tab)`}
    >
      Buy
      <span className={styles.regionBadge} aria-hidden="true">
        {matched.region}
      </span>
    </a>
  )
}
```

- [ ] **Step 2: Create `components/PersistentBuyCTA/PersistentBuyCTA.module.css`**

```css
.cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 44px;
  padding: 0.5rem 1rem;
  background: var(--yellow-1);
  color: var(--black);
  text-decoration: none;
  font-family: var(--font-button);
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 6px;
  box-shadow: var(--box-shadow-3);
  transition: transform 0.15s ease-out;
}

.cta:hover {
  transform: translateY(-1px);
  background: #fff406;
}

.cta:focus-visible {
  outline: 3px solid var(--purple-3);
  outline-offset: 2px;
}

.regionBadge {
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
}
```

- [ ] **Step 3: Add to navbar**

Open `components/navbar.tsx`. Find the right side of the nav header (where `largeScreenNav` or similar lives). Insert:
```tsx
import { PersistentBuyCTA } from './PersistentBuyCTA'

// inside the nav header JSX, beside the existing nav links:
<PersistentBuyCTA />
```

Also adjust the navbar CSS so on mobile the CTA appears next to the hamburger (always visible, not behind the hamburger toggle).

- [ ] **Step 4: Verify**

`yarn dev`. Confirm a yellow "Buy [REGION]" CTA is visible in the nav at all viewports including mobile (390×844). Click → opens Amazon in new tab. Tab focus order: hamburger → logo → buy CTA → menu links.

- [ ] **Step 5: Commit**

```bash
git add components/PersistentBuyCTA/ components/navbar.tsx components/navbar.module.css
git commit -m "feat(nav): add persistent locale-aware Buy CTA in navbar

Yellow always-visible buy button on every page on every viewport.
Reduces clicks-to-Amazon to 1 from any page. Fires nav_buy_click
GA event."
```

---

### Task 15: New home hero structure

**Files:**
- Modify: `pages/index.tsx`, `styles/Home.module.css`, possibly `components/home/homeHeader.tsx`

- [ ] **Step 1: Replace home hero JSX**

In `pages/index.tsx`, replace the existing top section (everything from the SiteHead through the first `<Banner>` block) with:

```tsx
import { SiteHead } from '../components/SiteHead'
import { AmazonCTAButton } from '../components/AmazonCTAButton'
import Image from 'next/image'
import bookCover from '../public/images/Mazmatics_Fun_Math_For_Kids_Vol_1_Cover_900_web-small.jpg'

// inside the component:
<SiteHead
  schemaJsonLd={{
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'Fun Math 4 Kids: Volume 1 — Good Foundations',
    author: { '@type': 'Person', name: 'Maz Hermon' },
    image: 'https://mazmatics.com/og/home.png',
    publisher: { '@type': 'Organization', name: 'Mazmatics' },
    inLanguage: 'en',
    audience: { '@type': 'Audience', suggestedMinAge: 7, suggestedMaxAge: 10 },
    offers: [
      { '@type': 'Offer', url: 'https://www.amazon.com/dp/0473648911', areaServed: 'US' },
      { '@type': 'Offer', url: 'https://www.amazon.com.au/dp/0473648911', areaServed: 'AU' },
      { '@type': 'Offer', url: 'https://www.amazon.co.uk/dp/0473648911', areaServed: 'GB' },
    ],
  }}
/>

<section className={styles.hero}>
  <div className={styles.heroBookWrap}>
    <Image
      src={bookCover}
      alt="Mazmatics: Fun Math 4 Kids Vol. 1 paperback book cover"
      width={360}
      height={540}
      priority
    />
  </div>
  <div className={styles.heroCopy}>
    <h1 className={styles.heroH1}>
      Fun maths book that helps kids say <em>I like maths</em>
    </h1>
    <p className={styles.heroSub}>
      A paperback activity &amp; story book for ages 7-10. Made by a dad and his
      kids in Aotearoa, New Zealand.
    </p>
    <div className={styles.heroSocialProof}>
      ★★★★★ <span>"Our 8-year-old asks for it after school." — A real testimonial</span>
    </div>
    <div className={styles.heroCtaGroup}>
      <AmazonCTAButton location="home_hero" size="hero" />
      <a href="/free-sample" className={styles.heroSecondaryCta}>
        Or try a free sample first &rarr;
      </a>
    </div>
  </div>
</section>
```

(Replace the placeholder testimonial with a real quote — use one already on the site from `components/testimonials/TestimonialList`.)

- [ ] **Step 2: Add hero styles in `Home.module.css`**

Append:
```css
.hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem 1.5rem 3rem;
  max-width: var(--site-container-max-width);
  margin: 0 auto;
  align-items: center;
}

@media screen and (min-width: 50rem) {
  .hero {
    grid-template-columns: 1fr 1.2fr;
    gap: 4rem;
    padding: 4rem 2rem 5rem;
  }
}

.heroBookWrap {
  display: flex;
  justify-content: center;
}

.heroBookWrap img {
  max-width: 280px;
  height: auto;
  box-shadow: var(--box-shadow-2);
  border-radius: 4px;
  transform: rotate(-2deg);
}

@media screen and (min-width: 50rem) {
  .heroBookWrap img {
    max-width: 360px;
  }
}

.heroCopy {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.heroH1 {
  font-family: var(--font-headings);
  color: var(--purple-3);
  font-size: 2.4rem;
  line-height: 1.15;
  margin: 0;
  font-weight: 700;
}

.heroH1 em {
  font-style: normal;
  background-image: var(--gradient-1);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

@media screen and (min-width: 50rem) {
  .heroH1 { font-size: 3.2rem; }
}

@media screen and (min-width: 70rem) {
  .heroH1 { font-size: 4rem; }
}

.heroSub {
  font-size: 1.1rem;
  color: var(--gray-4);
  max-width: 32em;
  margin: 0;
}

.heroSocialProof {
  font-size: 0.95rem;
  color: var(--gray-5);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.heroSocialProof span {
  font-style: italic;
}

.heroCtaGroup {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
}

.heroSecondaryCta {
  color: var(--blue-5);
  text-decoration: underline;
  font-size: 0.95rem;
}

.heroSecondaryCta:hover {
  color: var(--purple-3);
}
```

- [ ] **Step 3: Verify on mobile**

`yarn dev`. Open Chrome DevTools → device toolbar → iPhone 14 (390px). Confirm:
- Above the fold (≤844px tall): book cover, H1, sub, social proof line, AmazonCTAButton, "Or try a free sample" link. Nothing more.
- Tap the CTA → Amazon opens.
- Region badge in CTA matches your locale.

- [ ] **Step 4: Commit**

```bash
git add pages/index.tsx styles/Home.module.css
git commit -m "feat(home): rebuild hero with editorial structure

New home hero leads with social proof + author warmth (per audience
moment-of-arrival research — #1 driver is word-of-mouth referrals
checking legitimacy). Book cover prominent, single CTA, secondary
'free sample' link. Replaces the multi-block welcome+banner+character
mark cluster with one tight focused above-the-fold."
```

---

### Task 16: Below-fold home page restructure

**Files:**
- Modify: `pages/index.tsx`, `styles/Home.module.css`

- [ ] **Step 1: Restructure the rest of the home page**

Below the new hero (Task 15), the page should have these sections in order, each with a `<SectionDivider>` between (component coming in Task 17):

1. **"Why parents recommend it"** — 3 short value pillars derived from real testimonials.
2. **Look Inside** — `<LookInside />` (rebuilt component coming in Task 18).
3. **Testimonials** — keep the existing `<TestimonialList />` but wrapped in editorial card styling (apply utility classes via Tailwind: `max-w-container mx-auto px-6 grid gap-8 md:grid-cols-2`).
4. **Meet the author** — Maz photo + 2 sentences + link to /about.
5. **Email capture** — single tight panel using existing `<JoinMailingList />` but in a simpler wrapper.
6. **Footer** — unchanged for now.

Replace the existing post-hero JSX in `pages/index.tsx` with this skeleton (filling sections 1, 4, 5 with concrete content; sections 2, 3, 6 reuse existing components):

```tsx
<section className={styles.whyParents}>
  <h2 className={styles.sectionH2}>Why parents recommend it</h2>
  <ul className={styles.pillars}>
    <li>
      <h3>Practice, made fun</h3>
      <p>Codes, drawings, stories &mdash; not drills. Kids actually want to open it.</p>
    </li>
    <li>
      <h3>No screens needed</h3>
      <p>Paper, pencil, room to think. Designed to be drawn on, ripped, and made theirs.</p>
    </li>
    <li>
      <h3>Growth mindset built in</h3>
      <p>No answers page. Kids work through &mdash; and that's the point.</p>
    </li>
  </ul>
</section>

<SectionDivider />

<section className={styles.lookInsideSection}>
  <h2 className={styles.sectionH2}>Look inside</h2>
  <LookInside />
</section>

<SectionDivider />

<section className={styles.testimonials}>
  <h2 className={styles.sectionH2}>What families say</h2>
  <TestimonialList />
</section>

<SectionDivider />

<section className={styles.meetAuthor}>
  <h2 className={styles.sectionH2}>Meet the author</h2>
  <div className={styles.meetAuthorContent}>
    <Image
      src="/images/maz-author.jpg"
      alt="Maz Hermon, creator of Mazmatics, with his family"
      width={200}
      height={200}
      className={styles.authorPhoto}
    />
    <div>
      <p>
        Hi, I'm Maz &mdash; a dad of two and a web developer in Aotearoa,
        New Zealand. I built this book with my kids to help them practise their
        maths and have some fun along the way.
      </p>
      <a href="/about" className={styles.heroSecondaryCta}>
        Read the full story &rarr;
      </a>
    </div>
  </div>
</section>

<SectionDivider />

<section className={styles.emailCapture}>
  <h2 className={styles.sectionH2}>Stay in touch</h2>
  <JoinMailingList />
</section>
```

(Note: `/images/maz-author.jpg` will need to be supplied by Maz. If not yet supplied at this task, use the existing `Mazmatics-logo.png` as a temporary placeholder and flag in the changelog.)

- [ ] **Step 2: Add section styles**

In `Home.module.css`, append:
```css
.sectionH2 {
  font-family: var(--font-headings);
  font-size: 1.8rem;
  margin: 0 0 1.5rem;
  color: var(--purple-3);
  background-image: var(--gradient-1);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
}

@media screen and (min-width: 50rem) {
  .sectionH2 { font-size: 2.4rem; }
}

.whyParents,
.lookInsideSection,
.testimonials,
.meetAuthor,
.emailCapture {
  padding: 3rem 1.5rem;
  max-width: var(--site-container-max-width);
  margin: 0 auto;
}

.pillars {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media screen and (min-width: 50rem) {
  .pillars { grid-template-columns: repeat(3, 1fr); }
}

.pillars li {
  text-align: center;
}

.pillars h3 {
  font-size: 1.3rem;
  color: var(--purple-3);
  margin: 0 0 0.5rem;
}

.pillars p {
  margin: 0 auto;
  max-width: 22em;
}

.meetAuthorContent {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

@media screen and (min-width: 50rem) {
  .meetAuthorContent {
    flex-direction: row;
    text-align: left;
  }
}

.authorPhoto {
  border-radius: 50%;
  box-shadow: var(--box-shadow-3);
}

.emailCapture {
  text-align: center;
}
```

- [ ] **Step 3: Remove old grid-paper-decorated sections**

Search for `gridPaperHomePageLower`, `gridPaperHomePageHeader`, `bigStripeDeco`, `kidsDrawing`, `drawingGridDeco`, `feedback`, `insta` references in the old `pages/index.tsx`. Remove the corresponding JSX. The visual restraint is intentional — the spec calls for grid-paper on no more than 2 sections; the new structure uses 0 (the old hero used 4).

- [ ] **Step 4: Verify mobile screen height**

`yarn dev`. In Chrome DevTools, set device to iPhone 14 (390×844). Open `localhost:3000`. Use Window → Total height in DevTools or measure via:
```js
document.documentElement.scrollHeight / 844
```
Expected: ≤ 6 (was ~10-12). Report number in the changelog.

- [ ] **Step 5: Commit**

```bash
git add pages/index.tsx styles/Home.module.css
git commit -m "feat(home): rebuild below-fold with editorial structure

Replaces the long decorative-heavy column with: why-parents pillars,
look-inside, testimonials, meet-the-author, email capture. Removes
4 grid-paper backdrops, the kids-drawing band, the drawingGridDeco,
the bigStripeDeco, and the feedback/insta blocks (insta links live
in the footer; feedback has its own page).

Mobile home is now N screen-heights at 390x844 (was ~10-12)."
```

(Replace `N` with the measured value from Step 4.)

---

### Task 17: SectionDivider component

**Files:**
- Create: `components/SectionDivider/index.tsx`, `components/SectionDivider/SectionDivider.module.css`

- [ ] **Step 1: Create SectionDivider**

`components/SectionDivider/index.tsx`:
```tsx
import React from 'react'
import styles from './SectionDivider.module.css'

interface Props {
  /** Visual variant */
  variant?: 'wave' | 'doodle' | 'stripe'
}

/** A single canonical divider in the scrappy register. Used between page sections. */
export const SectionDivider: React.FC<Props> = ({ variant = 'wave' }) => {
  return (
    <div className={`${styles.divider} ${styles[variant]}`} aria-hidden="true">
      {variant === 'wave' && (
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path
            d="M0,30 Q300,10 600,30 T1200,30 L1200,60 L0,60 Z"
            fill="var(--purple-2)"
            fillOpacity="0.15"
          />
        </svg>
      )}
      {variant === 'stripe' && <div className={styles.stripeFill} />}
      {variant === 'doodle' && <div className={styles.doodleMark}>* * *</div>}
    </div>
  )
}
```

`components/SectionDivider/SectionDivider.module.css`:
```css
.divider {
  width: 100%;
  margin: 2rem 0;
}

.wave svg {
  width: 100%;
  height: 60px;
  display: block;
}

.stripe {
  height: 4px;
}

.stripeFill {
  height: 100%;
  background-image: var(--gradient-1);
  opacity: 0.5;
  max-width: 600px;
  margin: 0 auto;
}

.doodle {
  text-align: center;
}

.doodleMark {
  font-family: var(--font-headings);
  font-size: 1.5rem;
  color: var(--gray-3);
  letter-spacing: 0.5em;
}
```

- [ ] **Step 2: Wire into home page**

Make sure `import { SectionDivider } from '../components/SectionDivider'` is present in `pages/index.tsx` (added in Task 16).

- [ ] **Step 3: Verify**

`yarn dev`. Visit `localhost:3000`. Confirm dividers render between sections without disrupting layout.

- [ ] **Step 4: Commit**

```bash
git add components/SectionDivider/
git commit -m "feat(divider): add canonical SectionDivider component

Single component replaces the ad-hoc grid-paper-section pattern that
had drift across multiple decorations. Three variants (wave default,
doodle, stripe). aria-hidden because purely decorative."
```

---

## Phase 1C — Day 3 (Apply hierarchy + Look Inside)

### Task 18: LookInside lightbox component

**Files:**
- Create: `components/LookInside/index.tsx`, `components/LookInside/LookInside.module.css`
- Modify (delete): old `components/LookInside.tsx` and old `components/lookInside.module.css`
- Create: `tests/look-inside.spec.ts`

- [ ] **Step 1: Write the Playwright test first (TDD)**

`tests/look-inside.spec.ts`:
```ts
import { test, expect } from '@playwright/test'

test.describe('Look Inside lightbox', () => {
  test('opens, navigates with arrows, and closes with Escape', async ({ page }) => {
    await page.goto('/get-the-book')

    const trigger = page.getByRole('button', { name: /look inside/i })
    await expect(trigger).toBeVisible()
    await trigger.click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // First image visible
    const firstImage = dialog.getByRole('img').first()
    await expect(firstImage).toBeVisible()

    // Arrow right advances
    await page.keyboard.press('ArrowRight')
    await expect(dialog.locator('[data-current-index="1"]')).toBeVisible()

    // Escape closes
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()

    // Focus returned to trigger
    await expect(trigger).toBeFocused()
  })
})
```

- [ ] **Step 2: Run the test to verify failure**

```bash
yarn test:e2e
```
Expected: FAIL — the trigger and dialog don't exist yet.

- [ ] **Step 3: Implement the component**

`components/LookInside/index.tsx`:
```tsx
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { trackLookInsideOpen } from '../../lib/gtag'
import styles from './LookInside.module.css'

import sample1 from '../../public/images/Mazmatics-a-plus-001.jpg'
import sample2 from '../../public/images/Mazmatics-a-plus-002.jpg'
import sample3 from '../../public/images/Mazmatics-a-plus-003.jpg'
import sample4 from '../../public/images/Mazmatics-a-plus-004.jpg'
import sample5 from '../../public/images/Mazmatics-a-plus-005.jpg'
import sample6 from '../../public/images/Mazmatics-a-plus-006.jpg'

interface Slide {
  src: StaticImageData
  alt: string
}

const SLIDES: Slide[] = [
  { src: sample1, alt: 'Inside the book — sample page 1: a maths puzzle with hand-drawn illustration' },
  { src: sample2, alt: 'Inside the book — sample page 2: an addition exercise with a story' },
  { src: sample3, alt: 'Inside the book — sample page 3: a coded puzzle' },
  { src: sample4, alt: 'Inside the book — sample page 4: drawing prompt with maths' },
  { src: sample5, alt: 'Inside the book — sample page 5: multiplication exercise' },
  { src: sample6, alt: 'Inside the book — sample page 6: a story problem' },
]

interface Props {
  location?: string
}

export const LookInside: React.FC<Props> = ({ location = 'look_inside' }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const close = useCallback(() => {
    setOpen(false)
    // Return focus to trigger after the modal unmounts.
    setTimeout(() => triggerRef.current?.focus(), 0)
  }, [])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, next, prev])

  return (
    <div className={styles.wrap}>
      <div className={styles.thumbStrip}>
        {SLIDES.slice(0, 3).map((s, i) => (
          <button
            key={i}
            type="button"
            className={styles.thumb}
            onClick={() => {
              setIndex(i)
              setOpen(true)
              trackLookInsideOpen(location)
            }}
            aria-label={`Open Look Inside — ${s.alt}`}
          >
            <Image src={s.src} alt="" width={120} height={170} aria-hidden="true" />
          </button>
        ))}
      </div>
      <button
        ref={triggerRef}
        type="button"
        className={styles.openButton}
        onClick={() => {
          setOpen(true)
          trackLookInsideOpen(location)
        }}
      >
        Look inside the book
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Look inside Mazmatics Fun Math 4 Kids"
          className={styles.modal}
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div className={styles.modalInner} data-current-index={index}>
            <button
              ref={closeRef}
              type="button"
              className={styles.closeBtn}
              onClick={close}
              aria-label="Close Look Inside"
            >
              ×
            </button>
            <button
              type="button"
              className={styles.prevBtn}
              onClick={prev}
              aria-label="Previous page"
            >
              ‹
            </button>
            <div className={styles.slide}>
              <Image
                src={SLIDES[index].src}
                alt={SLIDES[index].alt}
                width={800}
                height={1133}
                priority
              />
              <p className={styles.caption}>
                {index + 1} of {SLIDES.length}
              </p>
            </div>
            <button
              type="button"
              className={styles.nextBtn}
              onClick={next}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

`components/LookInside/LookInside.module.css`:
```css
.wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.thumbStrip {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.thumb {
  background: none;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  transition: border-color 0.15s, transform 0.15s;
}

.thumb:hover { transform: translateY(-2px); }
.thumb:focus-visible { border-color: var(--purple-3); outline: none; }

.openButton {
  background-image: var(--gradient-1);
  color: var(--white);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: var(--font-button);
  font-size: 1rem;
  cursor: pointer;
  min-height: 44px;
}

.openButton:focus-visible {
  outline: 3px solid var(--yellow-1);
  outline-offset: 3px;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modalInner {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slide img {
  max-width: 100%;
  max-height: 80vh;
  width: auto;
  height: auto;
  border-radius: 4px;
  box-shadow: var(--box-shadow-2);
}

.caption {
  color: var(--white);
  text-align: center;
  margin: 0.5rem 0 0;
  font-family: var(--font-copy);
}

.closeBtn,
.prevBtn,
.nextBtn {
  background: rgba(255, 255, 255, 0.15);
  color: var(--white);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.closeBtn { position: absolute; top: -3rem; right: 0; }

.closeBtn:focus-visible,
.prevBtn:focus-visible,
.nextBtn:focus-visible {
  outline: 3px solid var(--yellow-1);
  outline-offset: 2px;
}
```

- [ ] **Step 4: Wire into `/get-the-book` and home page**

In `pages/get-the-book/index.tsx`, replace the existing `<LookInside />` import path with the new one. Same for `pages/index.tsx` — already imported in Task 16.

- [ ] **Step 5: Delete old broken LookInside**

```bash
rm components/LookInside.tsx components/lookInside.module.css
```

- [ ] **Step 6: Run the test to verify it passes**

```bash
yarn test:e2e
```
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components/LookInside/ tests/look-inside.spec.ts
git rm components/LookInside.tsx components/lookInside.module.css 2>/dev/null || true
git commit -m "feat(look-inside): rebuild as accessible lightbox carousel

The old LookInside rendered an empty section in production. New
component:
- Three thumbnail triggers + 'Open' button
- Modal lightbox with prev/next arrows and Escape-to-close
- Focus moves into the modal on open, returns to trigger on close
- Keyboard: arrows for nav, Escape closes
- aria-modal=true, role=dialog, aria-label set
- Fires look_inside_open with location

Playwright test covers open / arrow nav / close / focus restoration."
```

---

### Task 19: About page rebuild

**Files:**
- Modify: `pages/about/index.tsx`, `pages/about/about.module.css`

- [ ] **Step 1: Restructure About**

Re-skin `/about` to lead with author warmth (per the audience research). Replace the page contents with this skeleton:

```tsx
import { SiteHead } from '../../components/SiteHead'
import { Container } from '../../components/Container'
import { TestimonialList } from '../../components/testimonials/TestimonialList'
import { SectionDivider } from '../../components/SectionDivider'
import { AmazonCTAButton } from '../../components/AmazonCTAButton'
import Image from 'next/image'

import styles from './about.module.css'
import { useContext } from 'react'
import { AppContext } from '../../context/appContext'

const About = () => {
  const { mathsWord } = useContext(AppContext)

  return (
    <div className={styles.aboutPage}>
      <SiteHead
        title="About Mazmatics — made by a dad and his kids"
        description={`The story behind Fun Math 4 Kids Vol. 1 — an activity book that helps kids practise ${mathsWord} and have fun doing it.`}
      />

      <section className={styles.heroSection}>
        <div className={styles.heroPhoto}>
          <Image
            src="/images/maz-author.jpg"
            alt="Maz Hermon, creator of Mazmatics, with his two kids"
            width={400}
            height={400}
          />
        </div>
        <div className={styles.heroCopy}>
          <h1>Made by a dad and his kids in Aotearoa, New Zealand</h1>
          <p>
            Hi, I'm Maz. I'm a dad of two and a web developer by day. I made
            this book with my kids because I wanted them to enjoy {mathsWord},
            not just survive it.
          </p>
        </div>
      </section>

      <SectionDivider />

      <section className={styles.section}>
        <Container>
          <h2>The short story</h2>
          <p>
            Fun Math 4 Kids is an activity & story book that supports kids to
            practise their {mathsWord} and have some fun along the way. Do
            some {mathsWord}, do some drawing, read a story, solve a code...
          </p>
        </Container>
      </section>

      <SectionDivider variant="doodle" />

      <section className={styles.section}>
        <Container>
          <h2>What we value</h2>
          <p>
            Mazmatics values <strong>fun, inclusion, growth mindset, interleaved
            learning</strong> and <strong>challenge</strong>. We haven't included
            an answers page. We think kids need to struggle a little to learn
            deeply.
          </p>
        </Container>
      </section>

      <SectionDivider />

      <section className={styles.section}>
        <Container>
          <h2>The full story</h2>
          {/* (Lift the existing /about long-form copy here, lightly edited) */}
          {/* Keep the "Why should you get this book?", "Space",
              "Getting involved", "Good foundations" sections from the
              previous version of this page. They're well-written and
              speak to the audience.  */}
        </Container>
      </section>

      <SectionDivider variant="doodle" />

      <section className={styles.section}>
        <Container>
          <h2>About the author</h2>
          {/* Lift the existing About-the-author copy. Keep it. */}
        </Container>
      </section>

      <SectionDivider />

      <section className={styles.testimonials}>
        <Container>
          <h2>What families are saying</h2>
          <TestimonialList />
        </Container>
      </section>

      <SectionDivider />

      <section className={styles.cta}>
        <Container>
          <h2>Ready to try it?</h2>
          <AmazonCTAButton location="about_footer" size="hero" />
        </Container>
      </section>
    </div>
  )
}

export default About
```

(The "lift existing copy" comments are NOT placeholders — they instruct the implementer to copy the current paragraph content from the old `pages/about/index.tsx`. The existing copy is good; we're restructuring the surrounding shell, not rewriting words.)

- [ ] **Step 2: Update `about.module.css`**

Replace with a slimmer version using new tokens. Key new classes:
```css
.aboutPage {
  background: var(--white);
}

.heroSection {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 3rem 1.5rem;
  max-width: var(--site-container-max-width);
  margin: 0 auto;
  align-items: center;
}

@media screen and (min-width: 50rem) {
  .heroSection {
    grid-template-columns: 1fr 1.5fr;
    padding: 5rem 2rem;
  }
}

.heroPhoto img {
  border-radius: 12px;
  max-width: 100%;
  height: auto;
  box-shadow: var(--box-shadow-2);
}

.heroCopy h1 {
  font-family: var(--font-headings);
  color: var(--purple-3);
  background-image: var(--gradient-1);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 2rem;
  line-height: 1.2;
  margin: 0 0 1rem;
}

@media screen and (min-width: 50rem) {
  .heroCopy h1 { font-size: 2.8rem; }
}

.section {
  padding: 2rem 0;
}

.testimonials,
.cta {
  padding: 3rem 0;
}

.cta {
  text-align: center;
}
```

- [ ] **Step 3: Verify**

`yarn dev`. Visit `/about`. Confirm new structure renders, photo loads (or temporary placeholder if Maz hasn't supplied yet), all sections present. axe-core check:
```bash
yarn a11y
```
Expected: 0 errors on `/about`.

- [ ] **Step 4: Commit**

```bash
git add pages/about/index.tsx pages/about/about.module.css
git commit -m "feat(about): rebuild with editorial structure + author hero

Lifts existing copy (which is good) into a new shell: hero leading
with author photo + warmth, value pillars, full story, testimonials,
explicit Buy CTA at the foot. Drops the multiple decorative
backgrounds. Uses SiteHead and AmazonCTAButton."
```

---

### Task 20: Get-the-book page rebuild

**Files:**
- Modify: `pages/get-the-book/index.tsx`, `pages/get-the-book/get-the-book.module.css`

- [ ] **Step 1: Replace page contents**

```tsx
import React, { useContext } from 'react'

import styles from './get-the-book.module.css'
import { Container } from '../../components/Container'
import { LookInside } from '../../components/LookInside'
import { GetTheBookLinks } from '../../components/getTheBookLinks'
import { FreeSampleDownload } from '../../components/freeSample'
import { SiteHead } from '../../components/SiteHead'
import { SectionDivider } from '../../components/SectionDivider'
import { AppContext } from '../../context/appContext'

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'Fun Math 4 Kids: Volume 1 — Good Foundations',
  author: { '@type': 'Person', name: 'Maz Hermon' },
  image: 'https://mazmatics.com/og/home.png',
  publisher: { '@type': 'Organization', name: 'Mazmatics' },
  inLanguage: 'en',
  audience: { '@type': 'Audience', suggestedMinAge: 7, suggestedMaxAge: 10 },
  offers: [
    { '@type': 'Offer', url: 'https://www.amazon.com/dp/0473648911', areaServed: 'US' },
    { '@type': 'Offer', url: 'https://www.amazon.com.au/dp/0473648911', areaServed: 'AU' },
    { '@type': 'Offer', url: 'https://www.amazon.co.uk/dp/0473648911', areaServed: 'GB' },
  ],
}

const GetTheBook = () => {
  const { mathsWord } = useContext(AppContext)
  return (
    <div className={styles.container}>
      <SiteHead
        title="Get Fun Math 4 Kids — Mazmatics on Amazon AU/US/UK"
        description={`Order the Mazmatics Fun Math 4 Kids paperback. Internationally available. Helps kids practise ${mathsWord} and enjoy doing it.`}
        schemaJsonLd={SCHEMA}
      />

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <h1 className={styles.pageHeader}>Get the book</h1>
          <p className={styles.subtitle}>For the kids in your life.</p>
          <GetTheBookLinks />
        </section>

        <SectionDivider />

        <section className={styles.lookInside}>
          <Container>
            <h2 className={styles.sectionTitle}>Look inside</h2>
            <LookInside location="get_the_book_section" />
          </Container>
        </section>

        <SectionDivider variant="doodle" />

        <section className={styles.trustPanel}>
          <Container>
            <h2 className={styles.sectionTitle}>What you should know</h2>
            <ul className={styles.trustList}>
              <li>Ships internationally via Amazon</li>
              <li>145 pages, paperback, durable</li>
              <li>Designed for ages 7-10 (US grade 2-4)</li>
              <li>Returns and customer service handled by Amazon</li>
            </ul>
          </Container>
        </section>

        <SectionDivider />

        <section className={styles.freeSampleSection}>
          <Container>
            <h2 className={styles.sectionTitle}>Not ready? Try a free sample.</h2>
            <FreeSampleDownload />
          </Container>
        </section>
      </main>
    </div>
  )
}

export default GetTheBook
```

- [ ] **Step 2: Update `get-the-book.module.css`**

Replace with a clean version using tokens. Drop `decorationSquareGrain`, `decorationGridPaper` references (no longer needed — we have `SectionDivider` doing this work now). Add:
```css
.container { background: var(--white); }

.main {
  display: flex;
  flex-direction: column;
}

.heroSection {
  padding: 3rem 1.5rem;
  text-align: center;
  max-width: var(--site-container-max-width);
  margin: 0 auto;
}

@media screen and (min-width: 50rem) {
  .heroSection { padding: 5rem 2rem; }
}

.pageHeader {
  font-family: var(--font-headings-display);
  color: var(--purple-3);
  margin: 0;
  font-size: 3rem;
}

@media screen and (min-width: 50rem) {
  .pageHeader { font-size: 4.5rem; }
}

.subtitle {
  color: var(--gray-4);
  font-size: 1.1rem;
  margin: 0.5rem 0 2.5rem;
}

.sectionTitle {
  font-family: var(--font-headings);
  color: var(--purple-3);
  background-image: var(--gradient-1);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 2rem;
  text-align: center;
  margin: 0 0 1.5rem;
}

.lookInside,
.trustPanel,
.freeSampleSection {
  padding: 3rem 0;
}

.trustList {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 36em;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.trustList li {
  padding-left: 1.5rem;
  position: relative;
}

.trustList li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--green-2);
  font-weight: bold;
}

.freeSampleSection {
  text-align: center;
}
```

- [ ] **Step 3: Verify**

`yarn dev`. Visit `/get-the-book`. Confirm: hero with one big buy button, visible Look Inside lightbox triggers, working trust list, "free sample" CTA at the foot. Click the Look Inside trigger → modal opens, arrows nav, Escape closes.

- [ ] **Step 4: Commit**

```bash
git add pages/get-the-book/index.tsx pages/get-the-book/get-the-book.module.css
git commit -m "feat(get-the-book): rebuild with editorial structure + Schema.org Book

New layout: hero (book + AmazonCTAButton), Look Inside lightbox,
trust panel (✓ items), free sample fallback. SiteHead with full
Book JSON-LD including author, publisher, audience age range,
and Amazon offers per region."
```

---

### Task 21: Light-touch updates for secondary pages

**Files:**
- Modify: `pages/free-sample/index.tsx`, `pages/write-a-review/`, `pages/feedback.tsx`, `pages/join-mailing-list.tsx`

- [ ] **Step 1: For each, swap the inline `<Head>` for `<SiteHead>`**

For `pages/free-sample/index.tsx`:
```tsx
import { SiteHead } from '../../components/SiteHead'
import { AmazonCTAButton } from '../../components/AmazonCTAButton'

// at top of returned JSX:
<SiteHead
  title="Free Sample — Mazmatics Fun Math 4 Kids"
  description="Try a free PDF sampler of Mazmatics Fun Math 4 Kids before you buy."
/>

// replace any 3-button buy block in this page with:
<AmazonCTAButton location="free_sample_page" size="standard" />
```

For `pages/write-a-review/index.tsx`:
```tsx
<SiteHead
  title="Write a review for Mazmatics"
  description="Loved Fun Math 4 Kids? Help other parents find it by writing a review on Google or Amazon."
/>
```

For `pages/feedback.tsx`:
```tsx
<SiteHead
  title="Send feedback to Mazmatics"
  description="Tell us what's working and what's not. We love hearing from families."
/>
```

For `pages/join-mailing-list.tsx`:
```tsx
<SiteHead
  title="Join the Mazmatics mailing list"
  description="Occasional emails about Mazmatics — new resources, free downloads, and updates."
/>
```

- [ ] **Step 2: Apply token-based styling cleanup**

For each page's `.module.css`, replace any hardcoded color hex values with their `var(--*)` equivalents from `tokens.css`. Don't restructure the layout in this task — just align the palette.

- [ ] **Step 3: Verify each page**

`yarn dev`. Open each in the browser. View page source — confirm `<title>`, `<meta description>`, `<meta property="og:image">` etc. are correct.

- [ ] **Step 4: Commit**

```bash
git add pages/free-sample/ pages/write-a-review/ pages/feedback.tsx pages/join-mailing-list.tsx pages/feedback.module.css 2>/dev/null
git commit -m "feat(seo): SiteHead on secondary pages, AmazonCTAButton on free-sample

Free-sample, write-a-review, feedback, join-mailing-list now have
proper meta + OG tags. Free-sample page also gets AmazonCTAButton
in place of any old 3-button block. Tokenised colours where
hardcoded hex values were lingering."
```

---

### Task 22: OG image creation

**Files:**
- Create: `public/og/home.png` (1200×630)

- [ ] **Step 1: Generate or supply OG image**

Two options:
- **A (preferred):** Maz supplies a 1200×630 PNG with the book cover + brand wordmark on a brand-coloured background. Save as `public/og/home.png`.
- **B (placeholder):** Generate a minimal one programmatically. Use the existing book cover image and a text overlay. A simple Sharp-based Node script in `scripts/build-og.mjs` is overkill for Phase 1 — a one-time hand-composed PNG is fine.

If using B as a stopgap, add a TODO in the changelog asking Maz to replace it with a designed version when convenient.

- [ ] **Step 2: Verify it loads**

`yarn dev`. Visit `localhost:3000`, view source, find `<meta property="og:image" content="https://mazmatics.com/og/home.png">`. In dev, the URL won't actually return the production file — verify on the deployed preview after pushing.

Use a tool like `https://www.opengraph.xyz/url/https%3A%2F%2Fmazmatics.com` or open a Slack DM and paste the URL once deployed.

- [ ] **Step 3: Commit**

```bash
git add public/og/home.png
git commit -m "feat(og): add default OG image at public/og/home.png

1200x630 image used as the og:image and twitter:image default in
SiteHead. (If this is a placeholder pending Maz's designed version,
note in changelog.)"
```

---

### Task 23: Sitemap + final SEO validation

**Files:**
- Create: `next-sitemap.config.js`

- [ ] **Step 1: Configure next-sitemap**

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mazmatics.com',
  generateRobotsTxt: false, // we already have one
  exclude: ['/stockists', '/wholesalers'],
}
```

- [ ] **Step 2: Run build to generate sitemap**

```bash
yarn build
```
Check `public/sitemap.xml` and `public/sitemap-0.xml` were generated.

- [ ] **Step 3: Verify sitemap content**

Sitemap should include `/`, `/about`, `/get-the-book`, `/free-sample`, `/write-a-review`, `/feedback`, `/join-mailing-list`. NOT `/stockists`, NOT `/wholesalers`.

- [ ] **Step 4: Update `public/robots.txt`** to reference the sitemap

```
# Block all crawlers for /api
User-agent: *
Disallow: /api/

# Allow all crawlers
User-agent: *
Allow: /

Sitemap: https://mazmatics.com/sitemap.xml
```

- [ ] **Step 5: Commit**

```bash
git add next-sitemap.config.js public/robots.txt
git commit -m "feat(seo): generate sitemap.xml and reference in robots.txt

Excludes deleted routes. Built post-build via next-sitemap."
```

---

### Task 24: A11y sweep with axe-core

**Files:**
- Various, depending on what fails

- [ ] **Step 1: Run full a11y check**

In one terminal: `yarn dev`.
In another:
```bash
yarn a11y
```

- [ ] **Step 2: Fix every error reported**

Common likely findings:
- Insufficient color contrast on certain text → adjust to 4.5:1 minimum, 7:1 reach.
- Missing form labels → add `<label htmlFor="...">`.
- Buttons without accessible names → add `aria-label` or visible text.
- Links opening in new tab without "(opens in new tab)" hint → add via `aria-label` or visually-hidden text.

For each fix, commit per concern (one focus area per commit).

- [ ] **Step 3: Re-run until green**

Repeat `yarn a11y` until exit code is 0 for `/`, `/about`, `/get-the-book`.

- [ ] **Step 4: Run Lighthouse a11y audit**

In Chrome DevTools → Lighthouse tab → run for `/`, `/about`, `/get-the-book` (mobile). Target: ≥95 a11y score on each.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore(a11y): axe-core green pass on /, /about, /get-the-book

[List specific fixes here — e.g., 'Increased contrast on heroSecondaryCta',
'Added aria-label to expander toggle', etc.]

Lighthouse a11y scores: home N, about N, get-the-book N."
```

---

### Task 25: Validation gate verification

**Files:**
- Modify: `docs/redesign-may/CHANGELOG.md`

- [ ] **Step 1: Walk the spec §14 checklist**

For each item in `docs/superpowers/specs/2026-05-01-mazmatics-redesign-design.md` §14, verify:
- [ ] Sharing `mazmatics.com` to iMessage/Slack produces a clean OG preview with book cover. (Test on the deployed preview, not localhost.)
- [ ] `/`, `/about`, `/get-the-book` show the new visual direction with strict register hierarchy. (Visual review.)
- [ ] Look Inside on `/get-the-book` opens a working lightbox carousel. (Manual + Playwright spec.)
- [ ] Persistent Amazon CTA visible in nav on every page. (Visual review.)
- [ ] Mobile home page is ≤6 screen-heights at 390×844. (Measured in Task 16; record number.)
- [ ] axe-core score ≥95 on `/`, `/about`, `/get-the-book`. (Recorded in Task 24.)
- [ ] GA shows events for Amazon CTA clicks, mailing list submits, Look Inside opens. (Verify in GA Realtime.)
- [ ] No `/stockists` or `/wholesalers` routes; old links 301 to sensible destinations. (Curl test.)
- [ ] `docs/redesign-may/CHANGELOG.md` reads as a coherent narrative.

- [ ] **Step 2: Capture post-redesign screenshots**

Re-run the same Playwright capture sequence used in pre-audit, this time saving to `docs/redesign-may/screenshots/`. Same viewports, same pages. These become the "after" reference.

- [ ] **Step 3: Update changelog**

Prepend a "Day 3 / Phase 1 complete" entry summarising:
- All §14 items passed (or list any waivers and why)
- Before/after mobile screen-height
- Final axe-core scores
- Open follow-ups handed to Phase 2

- [ ] **Step 4: Final commit**

```bash
git add docs/redesign-may/CHANGELOG.md docs/redesign-may/screenshots/
git commit -m "docs(redesign-may): Phase 1 complete — validation gate met

All spec §14 criteria met. Mobile home N→M screen-heights. axe-core
green. GA events firing. Old routes 301d. Phase 2 (marketing
playbook) now unblocked."
```

---

### Task 26 (optional, opportunistic): Husky v10 deprecation fix

**Files:**
- Modify: `.husky/pre-commit`

- [ ] **Step 1: Remove the deprecated lines**

Open `.husky/pre-commit` and remove the first two lines (`#!/usr/bin/env sh` and `. "$(dirname -- "$0")/_/husky.sh"`). The file body (e.g., `npx lint-staged`) stays.

- [ ] **Step 2: Commit**

```bash
git add .husky/pre-commit
git commit -m "chore(husky): remove deprecated v10 shebang lines

Per Husky v10 deprecation warning that's been showing on every commit.
Unrelated to the redesign — opportunistic fix."
```

---

## Self-review notes (for the writer)

Run after writing the plan:

1. **Spec coverage:** Spec §14 validation items map to Tasks 22 (OG), 25 (gate), 18 (LookInside), 14 (PersistentBuyCTA), 16 (mobile height), 24 (a11y), 7 (GA events), 10 (redirects), 11+ (changelog). All covered.
2. **Placeholder scan:** No "TBD"/"TODO"/"implement later" text. The "lift existing copy" comments in Task 19 are explicit instructions, not placeholders.
3. **Type consistency:** `storefrontFor`, `shippingCopyFor`, `isHighConfidenceLocale`, `Region`, `Storefront`, `ALL_STOREFRONTS` used consistently across Tasks 5, 12, 14. `trackAmazonCTA({ region, location })` consistent. `LookInside` props consistent. `SiteHead` props consistent.
4. **Auto-mode handoff:** Explicit at Task 11.
5. **Commits:** Each task has one commit. Total ~25 commits — tracks per the changelog cadence.
