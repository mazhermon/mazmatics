# Set up Google Search Console + Bing Webmaster Tools

The single highest-leverage thing on your founder action list. Without these, you're flying blind on what Google sees, which queries you appear for, and — critically — **what's actually pointing in to mazmatics.com from elsewhere on the web.**

**Time:** 40 minutes total (25 for Search Console, 15 for Bing if you import from Search Console).

**You'll need:** a Google account (use the one you already use for Mazmatics — likely `hellomazmatics@gmail.com` since that's your contact email). Access to push to `main` so we can land the verification file.

---

## Part 1 — Google Search Console (25 min)

### Step 1: open the console and start adding the property

1. Go to https://search.google.com/search-console
2. Sign in with your Mazmatics Google account
3. If you've never used Search Console before, you'll see a "Welcome" splash with a property-add prompt. If you've used it for other sites, click the **property selector** (top-left) and choose **"+ Add property"**.

### Step 2: choose the right property type

You'll see two options:

- **Domain** (left) — covers `mazmatics.com`, `www.mazmatics.com`, `m.mazmatics.com`, every subdomain, http + https. Verifies via **DNS TXT record**.
- **URL prefix** (right) — covers exactly the URL you enter, e.g. `https://mazmatics.com/`. Verifies via several methods, easiest of which is an **HTML file**.

**Pick: URL prefix → `https://mazmatics.com`** (no `www`, no trailing slash).

Why: the `www` subdomain redirects to bare in your Vercel setup, so the bare domain is canonical — that's what we want indexed. Domain-level verification needs DNS access which is fiddlier; URL-prefix is the same outcome with less admin.

You'll later have the option to add a separate `https://www.mazmatics.com/` URL-prefix property, but it's optional — Google understands the redirect from `www` → bare and consolidates signals automatically.

### Step 3: verify ownership via the HTML file method

Search Console will offer several verification methods. **Pick "HTML file"**.

1. Google generates a file with a name like `googleXXXXXXXXXXXXXXXX.html` and prompts you to download it.
2. **Don't close that page** — you need it open for step 5 (verify).
3. Send me (Claude) the **filename** (you don't need to send the contents — just the filename). I'll wire it into `public/` so it's served at `https://mazmatics.com/<filename>` and push.
4. Once I confirm the file is live (curl 200 from production), come back to the Search Console tab.
5. Click **"Verify"** in Search Console.
6. Within ~5 seconds you'll see a green "Ownership verified" banner.

**Alternative if you'd rather not wait for me:** download the file, drop it into your local `public/` folder, run `git add public/google*.html && git commit -m "chore: Google Search Console verification" && git push origin main`. Wait ~2 minutes for Vercel to deploy, then click Verify. The pre-commit hook will run the full test suite (~35s) — that's expected.

### Step 4: submit the sitemap

Once verified, you're in the Search Console dashboard.

1. In the left sidebar, click **"Sitemaps"** (under the "Indexing" section).
2. In the **"Add a new sitemap"** field, type just: `sitemap.xml`
3. Click **"Submit"**.
4. Within 30 seconds you'll see a row appear with status "Success" and 5 URLs discovered (the 5 we have in our sitemap: `/`, `/about`, `/free-sample`, `/get-the-book`, `/write-a-review`).

If you see "Couldn't fetch" — the sitemap might be temporarily 404'ing. Run `curl -sI https://mazmatics.com/sitemap.xml` to verify it's serving 200, and try again. We confirmed it was working as of 2026-05-08; standalone-output fix is in production.

### Step 5: wait

Search Console takes **2–4 days** before you start seeing real data. Bookmarks first show up; query data and click-through rates take about a week. Don't panic if everything's empty for the first few days.

---

## Part 2 — Bing Webmaster Tools (15 min)

Bing also feeds DuckDuckGo, Ecosia, and Yahoo. The setup mirrors Google but with a bonus: you can import directly from Search Console after it's verified.

### Step 1: sign in

1. Go to https://www.bing.com/webmasters
2. Click **"Sign in"** — easiest is **"Sign in with Google"** (uses the same Google account you just used for Search Console)

### Step 2: import from Google

1. After sign-in, you'll see two options: **"Add a site manually"** or **"Import sites from Google Search Console"**.
2. **Pick "Import"**.
3. It'll ask for permission to read your Search Console properties. Grant it.
4. Pick `https://mazmatics.com` from the list.
5. Bing imports the verification status from Google — no separate verification needed.
6. The sitemap is imported too; it shows up in Bing's "Sitemaps" view automatically.

### Step 3: explore the Bing dashboard

Bing's dashboard has a few useful things Google doesn't:

- **SEO Reports** — finds technical SEO issues (missing alt text, slow images, etc.). Worth scanning.
- **Backlinks** — separate index from Google's. Sometimes shows links Google missed.
- **Keyword Research** — limited free version of what big SEO tools charge for.

---

## What to look at once data shows up (~1 week later)

**Search Console — the four reports that matter most:**

1. **Performance → Search results.** Total clicks, impressions, CTR, average position. Filter by query to see what people actually searched to find you. Filter by page to see which URLs are pulling traffic.
2. **Indexing → Pages.** Lists what's indexed and what's not (and why). Catches accidentally noindex'd pages or 404s.
3. **Experience → Core Web Vitals.** LCP, FID/INP, CLS — Google's user-experience metrics. Should be green. If any are red, run Lighthouse and we'll fix them.
4. **Links → Top linking sites.** **This is the one you want to see for backlink discovery.** Lists every external site Google sees pointing to you. If anything's pointing to a page we don't have, we add a redirect.

**Bing — same four reports, slightly different names.** Bing's `Backlinks` report is sometimes more current than Google's; check both.

---

## Common gotchas

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Verification fails | File not deployed yet | Wait 2 min after pushing, refresh, retry |
| "Couldn't fetch sitemap" | 404 on `/sitemap.xml` | Curl it; if 404, redeploy. Currently working ✓ |
| 0 impressions after a week | Site too new / no inbound links | Normal for a small site. The `mailing list email asking for reviews` (week 2 of the playbook) is what kicks off discovery. |
| Suddenly 0 clicks one week | Google's reports are sometimes 1–2 days behind | Wait, then check |
| `www.mazmatics.com` shows as "Excluded" in Indexing | Correct — `www` 308s to bare, so Google indexes the bare version only | No action needed |

---

## After both are set up

Update `docs/marketing/founder-actions.md` to mark item #1 done. The next priority becomes **Step 2: validate social previews** (Facebook Sharing Debugger, Twitter Card Validator, Google Rich Results Test). Those tests need the production URL — you've already got it.

You'll also be unblocked on the **monthly measurement check-in** in the playbook — Search Console is the data source for clicks/impressions/queries.

---

## What I (Claude) can help with

- Wire the verification HTML file into `public/` once you have the filename
- Add per-page validations once GSC starts surfacing rich-results issues
- If Search Console flags any specific page as having mobile-usability or Core Web Vitals problems, we can dig into the Lighthouse trace and fix
- Fold any backlink discoveries into `next.config.js` redirects so we preserve link equity from URLs we no longer have
