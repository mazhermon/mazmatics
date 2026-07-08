# Mazmatics — Claude Code project notes

## What this is
Marketing website for **Mazmatics: Fun Math 4 Kids Vol. 1**, a paperback activity & story book by Maz Hermon (NZ) aimed at kids ~7-10 (US grade 2-4). The book exists; this site sells/promotes it. Primary audience: parents (and gift-buying grandparents/teachers) of kids who need help learning to enjoy math.

The brand voice: warm, playful, growth-mindset, inclusive ("I like math"), home-play-not-homework, hand-drawn / scrappy / kid-friendly. The audience uses both "math" and "maths" — there's an `AppContext` `mathsWord` that swaps the word based on `userLang` so US visitors see "math" and UK/AU/NZ visitors see "maths". Preserve this everywhere.

## Stack
- **Next.js 15.5** (Pages Router — `pages/`), **React 19**, **TypeScript 5.9**
- **Tailwind 3** + CSS Modules (mixed). Existing components mostly use CSS Modules.
- `next/legacy/image` is in use; modern `next/image` should be preferred for new work.
- Yarn (yarn.lock), Husky + lint-staged, ESLint 9 flat config, Prettier 2.
- Hosted on Vercel (per README).

## Repo layout
- `pages/` — routes: `index.tsx`, `about/`, `get-the-book/`, `free-sample/`, `write-a-review/`, `feedback`, `join-mailing-list`, `stockists`, `wholesalers`, `api/`
- `components/` — feature components, each with co-located `*.module.css`
- `context/appContext` — provides `mathsWord` and `userLang`
- `public/images/` — book cover, page samples (`Mazmatics-a-plus-001…006.jpg`), logo, social icons
- `styles/` — global styles
- Legacy/cruft to be aware of: `Oldnext.config.js`, `YEAHNAHeslintrc.json`, `.DS_Store`, scattered commented-out code

## Commands
- `yarn dev` — local dev server (default :3000)
- `yarn build` / `yarn start`
- `yarn lint` / `yarn lint:fix`

## Conventions
- Don't introduce a new styling system unless we agree first. Decide explicitly per component whether to keep CSS Modules or migrate to Tailwind — don't mix on the same component.
- Always route the word "math/maths" through `AppContext.mathsWord` rather than hardcoding.
- Buy-now links live in `lib/locale.ts` (storefront data) + `components/getTheBookLinks`, `components/home/finalCta`, `components/NavBarBuyCTA`. Amazon AU/US/UK for everyone; the NZ-only direct shop (`shop.mazmatics.com`, `NZ_DIRECT_SHOP`) is shown as the primary option only to visitors resolved to NZ via `showNzDirectShop` / `useResolvedCountry`.
- The current branch is `redesign-may` — this is the working branch for the in-progress redesign. `main` is the deployed branch.

## Push / deploy governance
**Pushing to `main` is Maz-controlled.** `main` auto-deploys to mazmatics.com via Vercel. Never `git push` to `main` without an explicit "yes push" / "ship it" / "deploy now" from Maz. Committing locally is fine; pushing is the gate.

When working on multi-commit features, name what's about to land in plain language before push and wait for greenlight. Don't slip prod-bound commits past inside larger batches.

## Local-only experiments
WIP / exploration / variant-comparison pages go in `pages/wip/`, which is gitignored project-wide. Files placed there:
- Route normally during `yarn dev` (e.g. `localhost:3000/wip/hero-variants`)
- Are never tracked, never pushed, never deployed
- Cost zero to throw away

Promote anything worth keeping into the real codebase via a regular commit. Don't put experiments in any other folder under `pages/` — they'll auto-route and end up on prod.

## Accessibility standard
**WCAG 2.2 AA at minimum, AAA where pragmatic.** Every component built or revised must be evaluated against AA criteria (contrast, keyboard, focus, alt text, landmarks, reduced-motion). Don't ship a page until it passes an axe-core / Lighthouse a11y check. This is non-negotiable; document any deliberate AA-not-AAA tradeoffs in the spec or commit message rather than failing silently.

## Display font swap-readiness
Bungee Shade is the current display face (loaded via Google Fonts in `pages/_document.js`) and it works. Maz has flagged he may swap it post-redesign. Keep `--font-headings-display` in `globals.css` as the single source of truth and never hardcode `'Bungee Shade'` in components — a future swap should be a one-line change.

## Active focus
A web design audit and full redesign on branch `redesign-may` to better market the book to parents of kids who need help getting interested in math. **Spec phase: Approach 3 (parallel split) approved 2026-05-01**, scope = "Tight" (3 pages: /, /about, /get-the-book), 3-day validation gate. Stockists & wholesalers pages are being **removed** (no longer in physical bookstores). Phase 2 = marketing playbook (queued post-redesign).
