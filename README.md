# Aarmac Life Sciences — website

Static site. No build step. **Every file sits at the repository root — there are no subfolders, on purpose.**

Live: https://website-two-lyart-12.vercel.app

## Upload rule — read this first

The previous deploy broke because the `assets/` folder did not make it into the repo, so every
`.css` and `.js` file 404'd and the site rendered as unstyled text.

That is why there are no folders any more. When you upload:

1. Extract the zip.
2. Select **all 33 files** (Ctrl+A / Cmd+A inside the extracted folder).
3. Drag them into GitHub → Add file → Upload files.
4. Commit. Vercel redeploys on its own.

After the deploy, open the site and confirm it is styled. If it looks like plain blue links again,
a file is missing — check that all seven `s-*.css` / `s-*.js` files are in the repo.

## Verify after every deploy

```
https://website-two-lyart-12.vercel.app/s-44cbcef4.css   -> must be 200, content-type text/css
https://website-two-lyart-12.vercel.app/robots.txt       -> 200
https://website-two-lyart-12.vercel.app/sitemap.xml      -> 200
```

## If the domain changes

Every canonical, `og:url`, sitemap entry and `llms.txt` link points at
`https://website-two-lyart-12.vercel.app`. On a custom domain, replace it everywhere:

```bash
grep -rl "website-two-lyart-12.vercel.app" . \
  | xargs sed -i 's#https://website-two-lyart-12.vercel.app#https://YOUR-DOMAIN#g'
```

Wrong canonicals are worse than no canonicals — do this step.

## Post-deploy checklist

- [ ] Site renders styled (not plain links).
- [ ] `robots.txt` and `sitemap.xml` both load.
- [ ] Submit the sitemap in Google Search Console.
- [ ] Verify the FormSubmit address from the email it sends, or contact-form submissions never arrive.
- [ ] Have a lawyer review `privacy.html`, `terms.html`, `disclaimer.html` — drafted, not certified.

## Still open

- No social profile links supplied — add them to the footer and to a `sameAs` array in the JSON-LD in `index.html` when the accounts exist.
- No certifications / trust badges — add when the certificates come through.

## File map

| Path | What |
|---|---|
| `index.html` | Homepage |
| `products.html` | All twelve therapeutic segments |
| 12 segment pages | One per therapeutic area |
| `careers.html` | Careers + contact forms |
| `privacy.html` `terms.html` `disclaimer.html` | Legal |
| `s-*.css` `s-*.js` | Shared, minified, fingerprinted, cached one year |
| `robots.txt` `sitemap.xml` `llms.txt` | Crawler + AI discovery |
| `og.png` `logo.png` | Social card + logo |
| `vercel.json` | Security headers, MIME types, cache policy |
