# Aarmac Life Sciences — website

Static site. No build step. 18 HTML pages + `assets/` (shared CSS/JS) + `vercel.json`.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Vercel → New Project → import the repo.
3. Framework preset: **Other**. Build command: *(leave empty)*. Output directory: *(leave empty / `.`)*.
4. Deploy.

`vercel.json` applies the security headers and cache policy automatically. Brotli and HTTP/3 are on by default on Vercel.

## IMPORTANT — change the domain after deploy

Every canonical, `og:url`, `sitemap.xml` entry and `llms.txt` link is currently:

    https://aarmac-life-sciences.vercel.app

If your live URL differs (a custom domain, or a different Vercel project name), find and replace that string across the whole repo before or right after the first deploy:

```bash
grep -rl "aarmac-life-sciences.vercel.app" . \
  | xargs sed -i 's#https://aarmac-life-sciences.vercel.app#https://YOUR-DOMAIN#g'
```

Wrong canonicals are worse than no canonicals — do this step.

## Post-deploy checklist

- [ ] Replace the domain (above).
- [ ] `https://YOUR-DOMAIN/robots.txt` and `/sitemap.xml` both load.
- [ ] Submit the sitemap in Google Search Console.
- [ ] Check the social card at <https://cards-dev.twitter.com/validator> and Facebook's sharing debugger.
- [ ] Re-run the SEOmator audit and compare against the 84/100 baseline.
- [ ] Have a lawyer review `privacy.html`, `terms.html` and `disclaimer.html` — they are drafted, not legally certified.

## Still open

- No social media profile links (none supplied) — add them to the footer and to the `sameAs` array in the JSON-LD in `index.html` when the accounts exist.
- No certifications / trust badges — add when the certificates come through.
- Contact forms post to FormSubmit (`formsubmit.co`). Verify the address once from the email FormSubmit sends, or submissions will not arrive.

## File map

| Path | What |
|---|---|
| `index.html` | Homepage |
| `products.html` | All twelve therapeutic segments |
| 12 segment pages | One per therapeutic area |
| `careers.html` | Careers + contact forms |
| `privacy.html` `terms.html` `disclaimer.html` | Legal |
| `assets/s-*.css` `assets/s-*.js` | Shared, minified, fingerprinted, cached one year |
| `robots.txt` `sitemap.xml` `llms.txt` | Crawler + AI discovery |
| `og.png` | 1200×630 social share card |
| `vercel.json` | Security headers + cache policy |
