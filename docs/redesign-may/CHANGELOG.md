# Mazmatics redesign — changelog

A human-readable narrative of what's changed on the `redesign-may` branch and why. Paired with focused git commits — `git log` is the technical record, this file is the narrative. New entries at the top.

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
