# NZ Direct Shop Re-link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-introduce the NZ-only direct store (`shop.mazmatics.com`) as the primary buy option for visitors detected as being in New Zealand, while keeping Amazon the only visible path for everyone else.

**Architecture:** The site already has a mature, unit-tested locale layer (`lib/locale.ts`) and a client-side geo hook (`context/services/useResolvedCountry.ts`) that returns `'NZ'` for NZ visitors (timezone-first detection — `Pacific/Auckland`). We add the NZ direct-shop as a new data record + a tiny `showNzDirectShop(country)` gate in `lib/locale.ts`, then thread it into the three buy-CTA surfaces (`finalCta`, `GetTheBookLinks`, `NavBarBuyCTA`). The shop block is **gated entirely behind `country === 'NZ'`** so it never renders for international shoppers — no flash, no distraction. Because `useResolvedCountry` returns `null` during SSR and the first client render, the NZ block appears only after hydration and only for NZ users.

**Tech Stack:** Next.js 15.5 (Pages Router), React 19, TypeScript 5.9, CSS Modules, `node:test` + `tsx` for unit tests, Playwright for e2e.

## Background — what was removed and why this is now easy

The NZ direct link was removed in commit `3b94637` ("remove nz only shop link", 2025-09-01). At that time the component hardcoded a single NZ button:

```tsx
<div className={styles.action2}>
  <span className={styles.marketDescription}>Aotearoa / New Zealand</span>
  <Button
    external={true}
    variant="secondary"
    href="https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations"
  >
    NZ Shop
  </Button>
</div>
```

Since then the buy CTAs were rebuilt around `lib/locale.ts` + `useResolvedCountry`, so we do **not** restore the old markup. We re-use the original product URL but wire it through the new locale layer and geo-gating. The leftover `.nzShopDetails` CSS class still exists in `components/getTheBookLinks/getTheBookLinks.module.css` and can be repurposed.

## Global Constraints

- **Shop URL:** `https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations` — the original deep link, confirmed by Maz as still valid (the store was removed and is now being re-added; the slug has not changed). Keep it as a single constant (`NZ_DIRECT_SHOP.url` in `lib/locale.ts`) so any future change is one line.
- **No price/shipping-cost copy:** Price and shipping terms have changed since the store was last linked, but this part of the site never quoted them and must not start now. Keep all copy to evergreen geographic statements (e.g. "Ships within Aotearoa New Zealand" = *who it serves*), never a cost, speed, or price.
- **NZ-only visibility:** The direct-shop block/button renders **only** when the resolved country is `'NZ'`. International visitors (US/UK/AU/unknown) must see no change from today's Amazon-only experience.
- **Amazon stays as fallback for NZ too:** Even for NZ visitors, Amazon Australia must remain reachable (some NZ shoppers prefer Amazon / Prime). NZ direct is *most prominent*, not *exclusive*.
- **"math/maths" word:** Any new user-facing copy that uses the word math/maths MUST route through `AppContext.mathsWord` — never hardcode. (The copy in this plan avoids the word, so no action needed unless you add more.)
- **Accessibility — WCAG 2.2 AA minimum** (per `CLAUDE.md`): every new interactive element needs a discernible accessible name, visible focus state, ≥4.5:1 text contrast, and must not signal "NZ / recommended" by colour alone (pair colour with text). External links keep `target="_blank" rel="noopener noreferrer"` and announce "opens in a new tab" where the existing siblings do.
- **Styling:** Follow the existing per-component convention — these components use **CSS Modules**, so add CSS-Module classes, do not introduce Tailwind on them.
- **Analytics:** Every NZ-shop CTA click fires a dedicated GA event via a new `trackNzShopCTA({ location })` helper (mirrors the existing `trackAmazonCTA` shape) so direct-shop conversions are measurable separately from Amazon.
- **Do not push to `main`.** Commit locally only. `main` auto-deploys; pushing is Maz-gated.
- **Run unit tests with:** `yarn test` (`node --test --import tsx --test-reporter=spec lib/*.test.ts`).
- **Run e2e with:** `yarn test:e2e` (`playwright test`).

## File Structure

| File | Responsibility | Change |
|------|----------------|--------|
| `lib/locale.ts` | Single source of truth for storefront data + country logic. Add NZ direct-shop record + `showNzDirectShop` gate. | Modify |
| `lib/locale.test.ts` | Unit tests pinning the new data + gate. | Modify |
| `lib/gtag.js` | Analytics helpers. Add `trackNzShopCTA`. | Modify |
| `components/home/finalCta.tsx` | Home-page final buy block — NZ direct becomes primary for NZ. | Modify |
| `components/home/finalCta.module.css` | Styles for the NZ primary/secondary treatment. | Modify |
| `components/getTheBookLinks/index.tsx` | `/get-the-book` full buy grid — prepend prominent NZ direct row for NZ. | Modify |
| `components/getTheBookLinks/getTheBookLinks.module.css` | Style the NZ direct row (repurpose `.nzShopDetails` / add `.nzRow`). | Modify |
| `components/NavBarBuyCTA.tsx` | Persistent nav buy pill — point at NZ direct for NZ. | Modify |
| `tests/smoke.spec.ts` | e2e: NZ shows direct shop; AU/default does not. | Modify |

---

### Task 1: Add NZ direct-shop data + visibility gate to the locale layer

**Files:**
- Modify: `lib/locale.ts`
- Test: `lib/locale.test.ts`

**Interfaces:**
- Consumes: existing `Country` type from `lib/locale.ts`.
- Produces:
  - `export interface NzDirectShop { url: string; label: string; shipping: string }`
  - `export const NZ_DIRECT_SHOP: NzDirectShop`
  - `export function showNzDirectShop(country: Country): boolean`

- [ ] **Step 1: Write the failing tests**

Add to the end of `lib/locale.test.ts`:

```ts
import {
  // ...existing imports stay...
  NZ_DIRECT_SHOP,
  showNzDirectShop,
} from './locale'

test('NZ_DIRECT_SHOP points at the shop.mazmatics.com subdomain', () => {
  assert.equal(new URL(NZ_DIRECT_SHOP.url).hostname, 'shop.mazmatics.com')
  assert.ok(NZ_DIRECT_SHOP.url.startsWith('https://'))
})

test('NZ_DIRECT_SHOP has non-empty label + shipping copy', () => {
  assert.ok(NZ_DIRECT_SHOP.label.length > 0)
  assert.ok(NZ_DIRECT_SHOP.shipping.length > 0)
})

test('showNzDirectShop is true only when country is NZ', () => {
  assert.equal(showNzDirectShop('NZ'), true)
  assert.equal(showNzDirectShop('AU'), false)
  assert.equal(showNzDirectShop('US'), false)
  assert.equal(showNzDirectShop('GB'), false)
  assert.equal(showNzDirectShop(null), false)
})
```

(Merge the two new names into the existing single `import { ... } from './locale'` block at the top of the file rather than adding a second import statement.)

- [ ] **Step 2: Run tests to verify they fail**

Run: `yarn test`
Expected: FAIL — `NZ_DIRECT_SHOP` / `showNzDirectShop` are `undefined` (e.g. "The argument 'url' ... Received undefined" or "showNzDirectShop is not a function").

- [ ] **Step 3: Add the data + gate to `lib/locale.ts`**

Add after the `ALL_STOREFRONTS` declaration (keep it near the other storefront data):

```ts
/**
 * NZ-only direct store. Shown as the *primary* buy option to visitors
 * resolved to New Zealand (see showNzDirectShop). International visitors
 * never see this — they buy via Amazon. NZ shoppers prefer buying direct.
 *
 * URL is the original product deep link from before the Sept-2025 removal
 * (slug confirmed still valid). Do not add price/shipping-cost copy here —
 * keep `shipping` to an evergreen geographic statement only.
 */
export interface NzDirectShop {
  url: string
  label: string
  shipping: string
}

export const NZ_DIRECT_SHOP: NzDirectShop = {
  url: 'https://shop.mazmatics.com/product/fun-math-for-kids-mazmatics-volume-1-good-foundations',
  label: 'Buy direct from Mazmatics',
  shipping: 'Ships within Aotearoa New Zealand',
}

/**
 * Whether to surface the NZ direct store. Gated strictly to NZ so the
 * option never distracts international shoppers, who buy via Amazon.
 */
export function showNzDirectShop(country: Country): boolean {
  return country === 'NZ'
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `yarn test`
Expected: PASS — all locale tests green (existing + 3 new).

- [ ] **Step 5: Typecheck**

Run: `yarn typecheck`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add lib/locale.ts lib/locale.test.ts
git commit -m "feat(locale): add NZ direct-shop data + showNzDirectShop gate"
```

---

### Task 2: Add the `trackNzShopCTA` analytics helper

**Files:**
- Modify: `lib/gtag.js`

**Interfaces:**
- Produces: `export const trackNzShopCTA = ({ location }: { location: string }) => void` (plain JS, no annotations — mirror the existing `trackAmazonCTA` style).

- [ ] **Step 1: Add the helper to `lib/gtag.js`**

Add directly after the existing `trackAmazonCTA` export:

```js
export const trackNzShopCTA = ({ location }) => {
  send('nz_shop_cta_click', {
    event_category: 'cta',
    event_label: location,
    region: 'NZ',
  })
}
```

(No unit test — `lib/gtag.js` is a thin GA wrapper guarded by `typeof window === 'undefined' || !window.gtag` and is not covered by the `lib/*.test.ts` suite. It is exercised indirectly by the surface components.)

- [ ] **Step 2: Typecheck + lint**

Run: `yarn typecheck && yarn lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/gtag.js
git commit -m "feat(analytics): add trackNzShopCTA event helper"
```

---

### Task 3: Make NZ direct the primary CTA in the home FinalCta block

**Files:**
- Modify: `components/home/finalCta.tsx`
- Modify: `components/home/finalCta.module.css`

**Context:** `FinalCta` currently resolves `matched = STOREFRONTS[region]` and renders it as the primary `<a className={styles.primary}>`, with `others` listed below under `.otherRegions`. For NZ visitors we want the **NZ direct shop** to be the primary link, the NZ-direct shipping copy under it, and **all three** Amazon storefronts demoted into the "other regions" list (so Amazon AU is still one click away). Non-NZ visitors are unchanged.

**Interfaces:**
- Consumes: `NZ_DIRECT_SHOP`, `showNzDirectShop` (Task 1); `trackNzShopCTA` (Task 2); existing `STOREFRONTS`, `ALL_STOREFRONTS`, `regionForCountry`, `shippingCopyForCountry`, `useResolvedCountry`, `trackAmazonCTA`.

- [ ] **Step 1: Update imports in `components/home/finalCta.tsx`**

In the existing `from '../../lib/locale'` import, add `NZ_DIRECT_SHOP` and `showNzDirectShop`. In the existing `from '../../lib/gtag'` import, add `trackNzShopCTA`. Example resulting import blocks:

```tsx
import {
  STOREFRONTS,
  ALL_STOREFRONTS,
  regionForCountry,
  shippingCopyForCountry,
  NZ_DIRECT_SHOP,
  showNzDirectShop,
} from '../../lib/locale'
import { useResolvedCountry } from '../../context/services/useResolvedCountry'
import { trackAmazonCTA, trackNzShopCTA } from '../../lib/gtag'
```

- [ ] **Step 2: Compute the NZ branch in the component body**

Just after the existing `const others = ALL_STOREFRONTS.filter(...)` line, add:

```tsx
const nzDirect = showNzDirectShop(country)
// When NZ, the direct shop is primary and ALL Amazon storefronts move into
// the "other regions" list so Amazon stays reachable for NZ shoppers too.
const otherStorefronts = nzDirect ? ALL_STOREFRONTS : others
const primaryUrl = nzDirect ? NZ_DIRECT_SHOP.url : matched.url
const primaryLabel = nzDirect ? NZ_DIRECT_SHOP.label : matched.label
const primaryShipping = nzDirect ? NZ_DIRECT_SHOP.shipping : shipping
const handlePrimaryClick = nzDirect
  ? () => trackNzShopCTA({ location: 'home_final_cta' })
  : handlePrimary
```

(`handlePrimary` is the existing `() => trackAmazonCTA({ region, location: 'home_final_cta' })`. Leave it defined; we just choose which handler to attach.)

- [ ] **Step 3: Render the chosen primary + demoted list**

Replace the existing primary `<a>` + `{shipping && ...}` + `<ul className={styles.otherRegions}>` region of the JSX with:

```tsx
<a
  href={primaryUrl}
  target="_blank"
  rel="noopener noreferrer"
  className={styles.primary}
  onClick={handlePrimaryClick}
>
  <span className={styles.primaryLabel}>{primaryLabel}</span>
  <span aria-hidden="true" className={styles.primaryArrow}>
    &rarr;
  </span>
</a>

{nzDirect && <p className={styles.nzBadge}>Aotearoa NZ &middot; direct</p>}

{primaryShipping && <p className={styles.shipping}>{primaryShipping}</p>}

<ul className={styles.otherRegions}>
  {otherStorefronts.map((s) => (
    <li key={s.region}>
      <a
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleOther(s.region)}
        className={styles.otherLink}
      >
        {s.label}
      </a>
    </li>
  ))}
</ul>
```

- [ ] **Step 4: Add the `.nzBadge` style**

Append to `components/home/finalCta.module.css`. Use a text label (not colour alone) and ensure ≥4.5:1 contrast against the section background; match the existing token vocabulary used elsewhere in this file (reuse a CSS var already present in the file rather than a raw hex if one exists):

```css
.nzBadge {
  display: inline-block;
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--color-text-strong, #1a1a1a);
}
```

- [ ] **Step 5: Verify locally for NZ + non-NZ**

Run: `yarn dev`, then:
- Default (your machine's timezone): home FinalCta primary should be your matched Amazon storefront (unchanged).
- Simulate NZ: in DevTools > Sensors set timezone to `Pacific/Auckland` (or run Chrome with `--timezone`) and reload. Primary CTA should now read "Buy direct from Mazmatics", show the "Aotearoa NZ · direct" badge + "Ships within Aotearoa New Zealand", and Amazon AU/US/UK should all appear in the list below.

Expected: NZ sees direct-shop primary; non-NZ sees no change.

- [ ] **Step 6: Typecheck + lint**

Run: `yarn typecheck && yarn lint`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add components/home/finalCta.tsx components/home/finalCta.module.css
git commit -m "feat(home): NZ visitors get direct-shop as primary FinalCta"
```

---

### Task 4: Prepend a prominent NZ direct row to the /get-the-book buy grid

**Files:**
- Modify: `components/getTheBookLinks/index.tsx`
- Modify: `components/getTheBookLinks/getTheBookLinks.module.css`

**Context:** The full (non-compact) `GetTheBookLinks` renders `rows` (AU/US/UK) inside `<ul className={styles.rowList}>`, highlighting the matched region with `.rowMatched` + a "Closest to you" `.matchedTag`. For NZ we prepend a distinct, visually-leading NZ direct row at the top of the list. The three Amazon rows stay (Amazon AU still serves NZ), but when the NZ direct row is shown we suppress the "Closest to you" tag on the AU row so there is a single clear recommendation.

**Interfaces:**
- Consumes: `NZ_DIRECT_SHOP`, `showNzDirectShop` (Task 1); `trackNzShopCTA` (Task 2); existing `STOREFRONTS`, `regionForCountry`, `useResolvedCountry`, `trackAmazonCTA`, `useState`/`useId` already imported.

- [ ] **Step 1: Update imports in `components/getTheBookLinks/index.tsx`**

Add `NZ_DIRECT_SHOP` and `showNzDirectShop` to the existing `from '../../lib/locale'` import, and `trackNzShopCTA` to the existing `from '../../lib/gtag'` import:

```tsx
import {
  ALL_STOREFRONTS,
  STOREFRONTS,
  regionForCountry,
  shippingCopyForCountry,
  NZ_DIRECT_SHOP,
  showNzDirectShop,
  type Storefront,
} from '../../lib/locale'
// ...
import { trackAmazonCTA, trackNzShopCTA } from '../../lib/gtag'
```

- [ ] **Step 2: Compute the NZ flag in the full-grid render path**

In the main `GetTheBookLinks` body (the non-compact branch), after `const region = country ? regionForCountry(country) : null`, add:

```tsx
const nzDirect = showNzDirectShop(country)
```

- [ ] **Step 3: Suppress the AU "Closest to you" tag when NZ direct leads**

In the `rows.map(...)` render, the matched flag is `const matched = r.region === region`. Change the tag condition so the AU "Closest to you" tag does not compete with the NZ direct row:

```tsx
const matched = r.region === region
const showMatchedTag = matched && !nzDirect
```

and in the JSX replace `{matched && (` with `{showMatchedTag && (` for the `.matchedTag` span. Keep `${matched ? styles.rowMatched : ''}` on the `<li>` as-is (the subtle highlight is fine), or also gate it on `!nzDirect` if it visually competes — implementer's judgement, but the **tag text** must be suppressed.

- [ ] **Step 4: Render the NZ direct row at the top of the list**

Immediately inside `<ul className={styles.rowList}>`, before `{rows.map(...)}`, add:

```tsx
{nzDirect && (
  <li className={`${styles.row} ${styles.nzRow}`}>
    <p className={styles.rowEyebrow}>
      Aotearoa New Zealand
      <span className={styles.matchedTag}>Recommended for NZ</span>
    </p>
    <p className={styles.rowShipping}>{NZ_DIRECT_SHOP.shipping}</p>
    <a
      href={NZ_DIRECT_SHOP.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackNzShopCTA({ location: 'get_the_book' })}
      className={styles.rowCta}
    >
      <span className={styles.rowCtaLabel}>{NZ_DIRECT_SHOP.label}</span>
      <span aria-hidden="true" className={styles.rowCtaArrow}>
        &rarr;
      </span>
    </a>
  </li>
)}
```

- [ ] **Step 5: Style the NZ row**

Append to `components/getTheBookLinks/getTheBookLinks.module.css`. Give it a clear lead treatment (e.g. accent border) without relying on colour alone — the "Recommended for NZ" text carries the meaning. Reuse the existing accent CSS var if the file already defines one rather than a raw hex:

```css
.nzRow {
  border: 2px solid var(--color-accent, #1a1a1a);
  border-radius: var(--radius-md, 0.75rem);
}
```

(The leftover `.nzShopDetails` class is now unused; you may delete it in this commit to avoid dead CSS.)

- [ ] **Step 6: Verify locally**

Run: `yarn dev` and open `/get-the-book`.
- Default timezone: three Amazon rows, AU shows "Closest to you" (unchanged).
- `Pacific/Auckland` (DevTools Sensors): an NZ direct row appears **first** with "Recommended for NZ", and the AU row no longer shows "Closest to you".

Expected: NZ direct leads for NZ; international unchanged.

- [ ] **Step 7: Typecheck + lint**

Run: `yarn typecheck && yarn lint`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add components/getTheBookLinks/index.tsx components/getTheBookLinks/getTheBookLinks.module.css
git commit -m "feat(get-the-book): lead with NZ direct-shop row for NZ visitors"
```

---

### Task 5: Point the persistent nav buy pill at the NZ direct shop for NZ

**Files:**
- Modify: `components/NavBarBuyCTA.tsx`

**Context:** `NavBarBuyCTA` resolves `region` then links to `STOREFRONTS[region].url` with a region label. For NZ visitors, point it at the direct shop with a distinct label and the NZ analytics event. Non-NZ unchanged.

**Interfaces:**
- Consumes: `NZ_DIRECT_SHOP`, `showNzDirectShop` (Task 1); `trackNzShopCTA` (Task 2); existing `regionForCountry`, `STOREFRONTS`, `useResolvedCountry`, `trackNavBuyClick`.

- [ ] **Step 1: Update imports + branch logic in `components/NavBarBuyCTA.tsx`**

Update imports:

```tsx
import {
  regionForCountry,
  STOREFRONTS,
  NZ_DIRECT_SHOP,
  showNzDirectShop,
} from '../lib/locale'
import { useResolvedCountry } from '../context/services/useResolvedCountry'
import { trackNavBuyClick, trackNzShopCTA } from '../lib/gtag'
```

Replace the body computations:

```tsx
const country = useResolvedCountry()
const region = regionForCountry(country)
const nzDirect = showNzDirectShop(country)
const url = nzDirect ? NZ_DIRECT_SHOP.url : STOREFRONTS[region].url
const visibleLabel = nzDirect
  ? 'Buy direct (NZ)'
  : COMPACT_REGION_LABEL[region] ?? 'Get the book'
const handleClick = nzDirect
  ? () => trackNzShopCTA({ location: 'persistent_nav' })
  : trackNavBuyClick
```

Then change the `<a>`'s `href={url}` (already named `url`) and `onClick={trackNavBuyClick}` → `onClick={handleClick}`. The existing `aria-label={`${visibleLabel} (opens in a new tab)`}` keeps working with the new label.

- [ ] **Step 2: Verify locally**

Run: `yarn dev`. Default timezone: nav pill reads "Get on Amazon AU/US/UK" (unchanged). `Pacific/Auckland`: nav pill reads "Buy direct (NZ)" and links to the shop.

- [ ] **Step 3: Typecheck + lint**

Run: `yarn typecheck && yarn lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/NavBarBuyCTA.tsx
git commit -m "feat(nav): NZ visitors get direct-shop in the persistent buy pill"
```

---

### Task 6: e2e guard — NZ sees the direct shop, AU/default does not

**Files:**
- Modify: `tests/smoke.spec.ts`

**Context:** `playwright.config.ts` pins the project timezone to AU, so the default `routing` block already asserts Amazon AU is visible. We add (a) an assertion in the default (AU) context that the direct shop is **absent**, and (b) a new describe block that overrides the timezone to `Pacific/Auckland` and asserts the direct shop link **is** present on `/get-the-book` and the home page.

**Interfaces:**
- Consumes: nothing new — pure Playwright. The NZ direct link is discoverable by its accessible name "Buy direct from Mazmatics" (get-the-book / home FinalCta) and the shop hostname.

- [ ] **Step 1: Add a negative assertion in the existing AU `/get-the-book` test**

In `tests/smoke.spec.ts`, inside `test('/get-the-book matches the AU primary based on pinned timezone', ...)`, after the existing Amazon-Australia assertion add:

```ts
// International (AU-pinned) visitors must NOT see the NZ direct shop.
await expect(
  page.getByRole('link', { name: /Buy direct from Mazmatics/i }),
).toHaveCount(0)
```

- [ ] **Step 2: Add the NZ describe block**

Append to `tests/smoke.spec.ts`:

```ts
test.describe('NZ direct shop (Pacific/Auckland)', () => {
  test.use({ timezoneId: 'Pacific/Auckland' })

  test('/get-the-book leads with the NZ direct shop for NZ visitors', async ({
    page,
  }) => {
    await page.goto('/get-the-book')
    const direct = page.getByRole('link', {
      name: /Buy direct from Mazmatics/i,
    })
    await expect(direct).toBeVisible()
    await expect(direct).toHaveAttribute(
      'href',
      /^https:\/\/shop\.mazmatics\.com\//,
    )
    // Amazon AU stays reachable for NZ shoppers who prefer it.
    await expect(
      page.getByRole('link', { name: /Amazon Australia/i }).first(),
    ).toBeVisible()
  })

  test('home FinalCta primary is the NZ direct shop for NZ visitors', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(
      page.getByRole('link', { name: /Buy direct from Mazmatics/i }).first(),
    ).toBeVisible()
  })
})
```

- [ ] **Step 3: Run e2e**

Run: `yarn test:e2e tests/smoke.spec.ts`
Expected: PASS — AU context shows no direct shop; NZ context shows the direct shop on both pages and Amazon AU still present.

(If the dev/preview server isn't already running, Playwright's `webServer` in `playwright.config.ts` starts it on port 3100 — no manual server needed.)

- [ ] **Step 4: Commit**

```bash
git add tests/smoke.spec.ts
git commit -m "test(e2e): NZ visitors see direct shop, international do not"
```

---

### Task 7: Full verification pass + accessibility check

**Files:** none (verification only).

- [ ] **Step 1: Run the whole quality gate**

Run: `yarn typecheck && yarn lint && yarn test && yarn test:e2e`
Expected: all green.

- [ ] **Step 2: Accessibility check**

With `yarn dev` running, run `yarn a11y` (axe over `/`, `/about`, `/get-the-book`). Then manually, in `Pacific/Auckland` mode: tab to the NZ direct CTA on `/get-the-book`, the home FinalCta, and the nav pill — confirm visible focus ring, sensible reading order, and that the "Recommended for NZ" / "Aotearoa NZ · direct" meaning is conveyed in text (not colour alone).
Expected: no new axe violations; NZ CTAs keyboard-reachable with visible focus.

- [ ] **Step 3: Update CLAUDE.md note**

`CLAUDE.md` currently says the NZ link "was recently removed (commit `3b94637`)". Update that line in the **Conventions** section to reflect that the NZ direct shop is back and geo-gated:

```md
- Buy-now links live in `lib/locale.ts` (storefront data) + `components/getTheBookLinks`, `components/home/finalCta`, `components/NavBarBuyCTA`. Amazon AU/US/UK for everyone; the NZ-only direct shop (`shop.mazmatics.com`, `NZ_DIRECT_SHOP`) is shown as the primary option only to visitors resolved to NZ via `showNzDirectShop` / `useResolvedCountry`.
```

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: note NZ direct shop reinstated + geo-gated"
```

- [ ] **Step 5: Hand back to Maz for the push decision**

Summarise what landed (NZ direct shop, geo-gated to NZ, primary across FinalCta / get-the-book / nav, analytics + e2e). Do **not** push to `main` — wait for Maz's explicit "ship it".

---

## Self-Review

**Spec coverage:**
- "Re-introduce NZ direct shop link" → Tasks 1, 3, 4, 5.
- "shop.mazmatics.com subdomain" → `NZ_DIRECT_SHOP.url` (Task 1), pinned in test (Task 1) + e2e (Task 6).
- "Only for NZ shipping / others buy from Amazon" → `showNzDirectShop` gate (Task 1), applied on every surface; Amazon untouched for non-NZ.
- "Only visible / most visible to NZ shoppers" → gated render (NZ-only) + primary placement (Tasks 3–5); negative e2e assertion for international (Task 6).
- "Don't distract international shoppers" → block does not render at all for non-NZ.
- WCAG AA → constraint + Task 7 a11y check + text-not-colour signalling.
- Analytics → Task 2 + wired into each surface.

**Placeholder scan:** No TBD/TODO/"handle edge cases" — every code step contains concrete code; CSS uses fallback values. No open items: shop URL is confirmed valid and copy is deliberately free of price/shipping-cost claims.

**Type consistency:** `NZ_DIRECT_SHOP: NzDirectShop` and `showNzDirectShop(country: Country): boolean` are defined in Task 1 and consumed with the same names/signatures in Tasks 3–6. `trackNzShopCTA({ location })` defined in Task 2, called with `{ location: ... }` everywhere.
