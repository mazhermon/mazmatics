# Marketing copy changes — to be re-applied carefully

> **Why this exists.** The redesign-may visual rebuild went too far and lost the original look-and-feel. We've reset the branch to the pre-redesign visuals while keeping the SEO/technical foundations. This file captures the **content/copy/marketing changes** we made so they can be re-introduced later, **section by section**, without breaking the visual design.
>
> **How to use it.** Pick one section. Apply just the copy change to the existing visual structure on the live site. Verify it still looks right. Ship. Repeat.
>
> Backup branch with the full visual rebuild: `redesign-may-marketing-spike` (preserved for reference).

---

## Audience reminder

- **Primary buyer:** parent (mum or dad) of a math-reluctant kid 7–10, often someone who themselves had a complicated relationship with maths. Discovers via word-of-mouth or social. Mostly mobile.
- **Top moment-of-arrival:** referral checking legitimacy. Hero must lead with social proof + author warmth.
- **Locale-aware word swap:** always route through `AppContext.mathsWord`. Never hardcode "math" or "maths".
- **Brand line:** "I like math" stays fixed (US spelling) — it's the brand's signature phrase.

---

## 1. Home page

### 1a. Hero headline

**Old (current site):**
> "I like math" (or "I like maths" outside US) — used as a standalone bold phrase under "Help your kids to say…"

**Proposed new (don't break the visual yet):**
- Keep the "Help your kids to say… 'I like math'" structure exactly as it is.
- Add a small **sub-line** under the hero (one short paragraph) for SEO/skim:
  > A paperback activity & story book for ages 7–10. Made by a dad and his kids in Aotearoa, New Zealand.
- Add a **5-star social-proof line** under the headline:
  > ★★★★★ "This makes math fun! Breath of fresh air. Thank you." — Rachel T

**Why:** Search and skim. The book's domain (paperback, 7–10, NZ) wasn't surfaced at the hero level. The social-proof quote is the highest-converting line we have for cold visitors.

**How to introduce:** drop the sub-line + star line into the existing hero copy block. Don't move Lindy or change typography.

---

### 1b. Free-sample secondary CTA

**Proposed addition to hero:**
> Or try a free sample first →

Linking to `/free-sample`.

**Why:** parents who aren't ready to buy still convert into emails / sample downloads. We have GA wired for `free_sample_downloaded`.

**How to introduce:** add as a small text link below the existing 3-button GetTheBookLinks. Don't replace the buttons.

---

### 1c. "Why parents recommend it" pillars (NEW SECTION)

Three short pillars, scannable. Add this **only after the rest of the existing hero/news block** — don't displace anything.

```
Why parents recommend it

Practice, made fun
Codes, drawings, stories — not drills. Kids actually want to open it,
and keep coming back.

No screens needed
Paper, pencil, room to think. Designed to be drawn on, ripped, and
made theirs.

Growth mindset built in
No answers page. Kids work through — and that's the point.
```

**Why:** parents skimming for "what's in this for my kid" need a 3-line answer. The book copy already says these things in the about page; this surfaces them on the home where the buying decision happens.

**How to introduce:** add as a new section between FrontPageNews and the existing Container content. Style to match the existing brand (purple H2, body Outfit).

---

### 1d. Testimonials — keep what's there

The existing TestimonialList (kids + adults) is good. **Don't change it.** If you want a tighter version, build it as a separate component and use selectively.

---

### 1e. Hidden meta-text we want to preserve

The home page should set these via `<SiteHead>` (already on the redesign-may technical layer):
- `<title>`: `Mazmatics — Fun maths book for kids 7-10`
- `<meta name="description">`: `Help kids say "I like math". A paperback activity & story book for ages 7-10, available on Amazon.`
- OG image, Twitter card, canonical, Schema.org Book JSON-LD.

These are SEO/share-preview improvements that **don't affect visuals** — they should already be in place from the technical commits we kept.

---

## 2. About page (`/about`)

The original about page had a very long-form essay. The redesign restructured it heavily. **Don't restructure it again.** Instead, consider these targeted copy edits over time:

### 2a. Hero one-liner (proposed)

**Add above the existing about copy:**
> Made by a dad and his kids in Aotearoa, New Zealand.
>
> Hi, I'm Maz. I'm a dad of two and a web developer by day. I made this book with my kids because I wanted them to enjoy maths, not just survive it.

**Why:** the moment-of-arrival audience needs author warmth in the first 50 words. The existing essay buries this.

**How to introduce:** add at the very top, before any of the existing structure. Don't delete the long essay — let it live below.

### 2b. Three-pillar summary (proposed insert mid-page)

Optional: between sections, add a 3-pillar grid that mirrors the home version, focused on the *book*:

```
How the book is built

Room to breathe
Generous whitespace between the harder bits.
Kids need space to relax, doodle, and think.

Make it yours
Black-and-white pages, not precious. Draw on it,
colour it in, rip a page out and stick it on your wall.

Good foundations
Vol 1 covers addition, subtraction, multiplication, division
and some fractions — pitched for ages 7-10 (US grade 2-4),
practice alongside school, not a replacement.
```

**Why:** parents who don't want to read the long essay still get the gist.

**How to introduce:** add as one section, don't displace the long essay.

### 2c. Long bio behind a `<details>` summary (proposed)

The current about page essay (~1,200 words) is excellent but skim-fail. Optional improvement:

- Lead with a short 3-paragraph version of the author bio (warm, first-person).
- Wrap the rest of the essay inside `<details><summary>Read the longer story</summary>…</details>`.

This preserves all the content for those who want it but doesn't drown skimmers.

**How to introduce:** content-only, no styling changes needed beyond the default `<details>` element.

---

## 3. Get-the-book page (`/get-the-book`)

### 3a. Page title

**Old:** "Get the book" (just the H1)
**Proposed:**
- `<title>`: `Get Fun Math 4 Kids — Mazmatics on Amazon AU/US/UK`
- `<meta name="description">`: `Order the Mazmatics Fun Math 4 Kids paperback. Internationally available. Helps kids practise maths and enjoy doing it.`

**Why:** SEO — "Get the book" is generic; the new title carries the product name + retailer cues.

**How to introduce:** already handled if `<SiteHead>` is wired on this page (technical layer).

### 3b. Subtitle under H1 (proposed)

> For the kids in your life.

**Why:** warmer, brand-voice-aligned tagline.

**How to introduce:** add as a `<p>` under the H1, no structural change.

### 3c. "What you should know" trust panel (NEW)

Add a small ✓ list under the buy buttons:

```
What you should know

✓ Ships internationally via Amazon
✓ 145 pages, paperback, durable
✓ Designed for ages 7-10 (US grade 2-4)
✓ Returns and customer service handled by Amazon
```

**Why:** answers the four questions every parent asks before buying. Reduces purchase anxiety.

**How to introduce:** drop in as a new section below the buy buttons. Style minimally — green checkmarks on a clean card.

### 3d. Free-sample fallback (proposed)

After the trust panel, a "not ready?" section:

```
Not ready? Try a free sample.

[Download a free sample button]
```

**Why:** captures non-buyers as email list / sample downloads. Already wired through `FreeSampleDownload`.

**How to introduce:** existing component, just place it lower on the page.

### 3e. Schema.org Book JSON-LD (technical, already in)

The technical layer adds Book schema with offers per region. Don't touch.

---

## 4. Removed pages (keep these gone)

- `/stockists` — the book is no longer in physical bookstores. Page deleted; 301 redirects to `/get-the-book`.
- `/wholesalers` — same deletion + redirect.

This is a content/strategy decision Maz made on 2026-04-30 — keep these gone unless physical distribution comes back.

---

## 5. Amazon CTA pattern (stays as-is, don't apply)

The redesign explored a single locale-aware "Buy on Amazon" button (Pattern C) replacing the 3-button AU/US/UK row. **Maz preferred the original 3-button layout.** Do not re-apply this change. Pattern C is preserved on `redesign-may-marketing-spike` for future reference if locale-detection conversion becomes a priority.

---

## 6. Persistent nav Buy CTA (stays as-is, don't apply)

The redesign added a yellow "Buy" pill in the navbar. Visual choice — Maz preferred the original nav. **Do not re-apply.**

---

## 7. Order to roll out (recommended)

When ready to introduce these:

1. **Hero sub-line + star quote** (1c-1a) — lowest risk, biggest skim impact.
2. **Hero free-sample link** (1b) — small text addition.
3. **Get-the-book title + meta** (3a) — invisible to humans, helps Google.
4. **Get-the-book trust panel** (3c) — drop-in section, no layout changes.
5. **About page hero one-liner** (2a) — additive, doesn't displace.
6. **Home "Why parents recommend it" pillars** (1c) — bigger change, do last.
7. **About long bio behind `<details>`** (2c) — only if Maz still wants the bio shortened.

Each step ≤ one focused commit. Visual review after each.

---

## 8. Source of truth

Backup branch with full marketing rebuild (visuals included): **`redesign-may-marketing-spike`**.

To see how a section looked in the rebuild:
```sh
git show redesign-may-marketing-spike:pages/index.tsx
git show redesign-may-marketing-spike:pages/about/index.tsx
git show redesign-may-marketing-spike:pages/get-the-book/index.tsx
```
