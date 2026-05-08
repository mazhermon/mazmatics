# Tests

Two layers:

- **Unit tests** — `lib/**/*.test.ts`, run via `node --test` + `tsx`. Fast,
  no browser. Cover pure logic (locale resolution, GA tracking).
- **End-to-end + visual regression** — `tests/**/*.spec.ts`, run via
  Playwright. Cover routing, redirects, locale-aware UI, and pixel snapshots
  of the marketing pages.

## Commands

```bash
# Unit tests
yarn test

# All Playwright tests (smoke + visual snapshots)
yarn test:e2e

# Update snapshots after intentional design changes
yarn test:e2e --update-snapshots

# Run only the smoke tests (no snapshot comparison)
yarn test:e2e tests/smoke.spec.ts

# Run a single project (desktop only)
yarn test:e2e --project=desktop

# Open the last HTML report
npx playwright show-report

# Accessibility — axe-core CLI against a running dev server
yarn dev   # in one terminal
yarn a11y  # in another
```

## Snapshot stability

Playwright's first run on a new machine generates baselines. After that,
diffs against those baselines are what fail the suite.

To keep snapshots deterministic the config pins:

- **Timezone** to `Australia/Sydney` so `useResolvedCountry` always resolves AU
- **Locale** to `en-AU`
- **`reducedMotion: 'reduce'`** so transitions don't paint mid-capture
- **`animations: 'disabled'`** at screenshot time
- **`maxDiffPixelRatio: 0.01`** to absorb subpixel font-rendering variance

The marketing-pages spec masks `<canvas>` elements (the sun-sprite paints
frame-by-frame and ignores reduced-motion).

## When a snapshot diff fails

1. Read the diff in the Playwright HTML report (`npx playwright show-report`).
2. Decide: real regression, or an intentional design change?
   - Real regression → fix the code, snapshots already encode the desired state.
   - Intentional change → `yarn test:e2e --update-snapshots`, then commit the
     updated PNGs alongside the code change.

## What's covered

| Layer | File | What it locks in |
|-------|------|------------------|
| Unit  | `lib/locale.test.ts` | Country detection, region mapping, shipping copy, storefront URLs (buy + review) |
| Unit  | `lib/gtag.test.ts` | Every analytics helper fires the right event with the right params (and silently no-ops without `window.gtag`) |
| E2E   | `tests/smoke.spec.ts` | Redirects (`/feedback`, `/stockists`, `/wholesalers`, `/get-the-book/get-from-amazon`, `/write-a-review/review-on-amazon`); 404 page; locale-aware CTAs visible; modal open + close |
| VR    | `tests/marketing-pages.spec.ts` | Full-page screenshots of `/`, `/about`, `/free-sample`, `/get-the-book`, `/write-a-review` × desktop + mobile |

## What's intentionally NOT covered

- **Per-locale snapshot variants** (US/UK as separate baselines). The current
  suite locks AU only. If a locale-specific bug shows up later, add the variant
  via `test.use({ timezoneId, locale })` in a dedicated spec.
- **React component unit tests.** Components are mostly presentational; VR
  catches visual regressions with much less code. If a component grows
  meaningful internal state, add testing-library coverage at that point.
- **CI workflow.** No GitHub Actions yet. Tests run locally and pre-merge.
