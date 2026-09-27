# Aarmac Life Sciences — website

Static site. No build step. **Every file sits at the repository root — there are no subfolders, on purpose.**

Live: https://website-aarmaclifesciences26-4161.vercel.app

## Upload rule

An earlier deploy broke because a subfolder did not make it into the repo and every stylesheet 404'd.
That is why there are no folders. When you upload:

1. Extract the zip.
2. Select **all files** (Ctrl+A / Cmd+A inside the extracted folder).
3. GitHub → Add file → Upload files → drop them in → commit.
4. Vercel redeploys on its own.

Then open the site and confirm it is styled. If it looks like plain blue links, a file is missing —
check that all seven `s-*.css` / `s-*.js` files are in the repo.

## Verify after deploy

```
/s-44cbcef4.css   -> 200, content-type text/css
/logo.webp        -> 200, image/webp
/robots.txt       -> 200
/sitemap.xml      -> 200
/llms.txt         -> 200
```

Headers to confirm on any page (browser devtools → Network → Headers):

```
x-robots-tag: index, follow, ...        <- must NOT say noindex
strict-transport-security: max-age=63072000; ...
content-security-policy: default-src 'self'; ...
```

Vercel puts `X-Robots-Tag: noindex` on preview deployments by default. `vercel.json` overrides it.

## If the domain changes

Every canonical, `og:url`, sitemap entry, share link and `llms.txt` line points at
`https://website-aarmaclifesciences26-4161.vercel.app`. On a custom domain, replace it everywhere:

```bash
grep -rl "website-aarmaclifesciences26-4161.vercel.app" . \
  | xargs sed -i 's#https://website-aarmaclifesciences26-4161.vercel.app#https://YOUR-DOMAIN#g'
```

Then redeploy. Do this the same day the domain goes live — a canonical pointing at a dead URL is worse
than no canonical.

**Lock the production domain in Vercel** (Project → Settings → Domains) so the URL stops changing on
every deploy. The URL changed twice already, and each change breaks every canonical on the site.

## Post-deploy checklist

- [ ] Site renders styled.
- [ ] `x-robots-tag` does not say `noindex`.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Verify the FormSubmit address from the email it sends, or form submissions never arrive.
- [ ] Have a lawyer review `privacy.html`, `terms.html`, `disclaimer.html`, `editorial-policy.html`.

## Still open

- **No social media profile links.** Add them to the footer and to a `sameAs` array in the JSON-LD in
  `index.html` when the accounts exist. This is one of the two remaining audit warnings.
- **No certifications or trust badges.** Add when the certificates come through.

## File map

| Path | What |
|---|---|
| `index.html` | Homepage — company, twelve ranges, FAQ, contact, notice |
| `about.html` | Company history, what we make, who publishes the site |
| `editorial-policy.html` | How content is written, checked and corrected |
| `products.html` | All twelve therapeutic segments |
| 12 segment pages | One per therapeutic area |
| `careers.html` | Open roles + application form |
| `privacy.html` `terms.html` `disclaimer.html` | Legal |
| `s-*.css` `s-*.js` | Shared, minified, fingerprinted, cached one year |
| `robots.txt` `sitemap.xml` `llms.txt` | Crawler + AI discovery |
| `og.png` `logo.webp` `logo.png` | Social card, logo (webp served, png kept for favicon) |
| `vercel.json` | Security headers, X-Robots-Tag override, MIME types, cache policy |
