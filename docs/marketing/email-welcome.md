# MailerLite welcome email — ready to paste

A single welcome email that fires the moment someone joins the mailing list. Captures attention while it's highest. Bridges the gap between "they gave you their email" and "they hear from you again in 2 weeks via the playbook rhythm."

**Time to set up in MailerLite:** ~15 minutes.

---

## Why a single email beats a 3-email sequence (for now)

Three-email sequences are the textbook play. They're also where most authors stall — drafting three emails takes 3× the effort, and the second + third often go unwritten while the welcome sits half-done.

A single, warm, useful welcome captures 80% of the value:
- Confirms the signup worked (psychological).
- Reinforces the relationship (you're a person, not a brand).
- Sets one expectation about cadence ("we don't email often").
- Drops one useful link (`/free-sample`) so the email earns its place even if they never see another one.

Build this first. Add a 3-email sequence later, once Vol. 2 is closer.

---

## The email

### Subject line (test these two)

**Option A (warmest, my pick):**
```
Hi from Mazmatics — and the print is on its way
```

**Option B (more functional):**
```
Welcome to Mazmatics — your free print is ready
```

Both work. Option A reads like a real human; Option B is clearer about the value drop. If you can A/B in MailerLite, do; if you can only pick one, go A.

### Pre-header (the gray preview text under the subject)

```
A note from Maz, plus where to find the free sample if you haven't already.
```

### From-name

`Maz Hermon` (NOT "Mazmatics" or "noreply"). Personal-from emails open ~25-40% better than brand-from for small lists.

### Reply-to

Your real personal inbox (whichever you check). If someone replies, you want to actually see it — those are your warmest possible advocates.

### Body

```
Hi —

You just joined the Mazmatics mailing list. Thanks, genuinely.

If you signed up for the free maths-mobile print, it should already be downloading — if it didn't, here it is:

→ https://mazmatics.com/downloads/Mazmatics_PrintableMathsMobile.pdf

Print on A4, trim along the cut lines, hang it above your kid's desk or bed.

Quick context — Mazmatics is an activity-and-story book I made for kids 7–10 who'd rather draw, decode and doodle their way into maths than be drilled in it. It's a paperback, 145 pages, full of silly maths jokes and a character called Lindy who's not very good at maths but very into it. My kid is the reason it exists.

If you haven't seen the book yet, the three-page free sample lives here:

→ https://mazmatics.com/free-sample

That's a real chunk of the book — print it, hand it to your kid, see if it clicks.

I don't email often. When I do, it'll be:
- When Vol. 2 ships (currently in the works)
- Occasionally, a behind-the-scenes from my desk

If that's too much, the unsubscribe link is at the bottom — no hard feelings.

Reply to this email if you want — it lands in my actual inbox, not a noreply void. I read every one.

Cheers,
Maz
Wellington, NZ

PS — if Mazmatics ever clicks for your kid, the single biggest thing you can do for the book is leave a one-line review on Amazon. The link's here whenever you're ready: https://mazmatics.com/write-a-review
```

---

## Variant for non-lead-magnet signups (footer / about-page sign-ups)

If MailerLite supports conditional content blocks or two automations off two different forms, you can swap the second paragraph for non-incentive signups. Otherwise: ship the single version above — the conditional sentence (*"If you signed up for the free maths-mobile print..."*) reads gracefully even for footer signups who didn't get a print, because it implies "you might have, here it is anyway."

If you want a fully separate version for non-incentive signups:

```
Hi —

You just joined the Mazmatics mailing list. Thanks, genuinely.

If you haven't tried the book yet, the three-page free sample is here:

→ https://mazmatics.com/free-sample

[... rest identical from "Quick context" onwards ...]
```

---

## How to set this up in MailerLite (15 min)

1. **Log in** → left sidebar → **Automation** → **Create new workflow** (or "Create new automation").
2. **Trigger:** select "When a subscriber joins a group" → pick your main group (or whatever your form points at — likely just one group).
3. **Add a step:** "Send email."
4. **Email setup:**
   - From name: `Maz Hermon`
   - From email: your real address (MailerLite may require domain auth — they'll prompt you. Worth doing while you're here — improves deliverability significantly.)
   - Reply-to: same as from email.
   - Subject: paste subject line above.
   - Pre-header: paste pre-header above.
5. **Body editor:**
   - Use the **plain-text editor** if available (or "rich text minimum styling"). Avoid the drag-and-drop block builder for this one — it adds visual chrome that fights the personal tone. A plain text-style email reads more like a real human wrote it.
   - Paste the body. Keep line breaks. Don't add a logo banner header. Don't add a stock image.
   - The two URLs should auto-link. If not, manually link them.
6. **Delay:** 0 minutes (fire immediately on signup). Authors sometimes add 5-minute delays "so it feels human"; don't bother — 80% of new signups close the tab and never come back if the welcome doesn't arrive while they're still on the page mentally.
7. **Save → Activate.**

### Domain authentication (optional but recommended)

MailerLite will probably nudge you to verify the domain you send from. Worth doing:
- Improves inbox placement (less spam folder).
- Lets you send from `maz@mazmatics.com` if you'd like.
- Adds SPF + DKIM records to DNS (MailerLite gives you the exact records to paste — same workflow as the Search Console TXT record you've done before).

If MailerLite asks and you're short on time, skip; the welcome still sends from your existing address. Come back when you have a free 15 min.

---

## After it's live

Test it:
1. Sign up via your own site with a personal email address you don't normally use.
2. Confirm the email arrives within ~1 minute.
3. Click both links — confirm they work.
4. Reply to the email — confirm it lands in your inbox.
5. (Optional) Unsubscribe via the footer link — confirm the unsubscribe page works.

Then delete that test subscriber from MailerLite so they don't pollute your list metrics.

---

## What I (Claude) can do next on this front

- **Draft email #2** for the eventual 3-email sequence (review-ask, ~7 days after signup).
- **Draft email #3** for the eventual sequence (Vol. 2 teaser, ~30 days after signup).
- **Draft the "Vol. 2 is shipping" announcement email** when you're 30 days out.
- **Audit your MailerLite signup form embed** if you want to replace the default MailerLite-styled form with one that matches the site exactly (the current `<MailingSignup>` is custom — already done — but if MailerLite's API responses look ugly anywhere, I can clean them up).
