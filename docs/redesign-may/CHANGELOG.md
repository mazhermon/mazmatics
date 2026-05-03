# Mazmatics redesign — changelog

A human-readable narrative of what's changed on the `redesign-may` branch and why. Paired with focused git commits — `git log` is the technical record, this file is the narrative. New entries at the top.

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
