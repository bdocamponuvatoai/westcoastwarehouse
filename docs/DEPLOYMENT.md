# Deployment

GitHub → Vercel. Every push to `main` deploys production; every pull request gets a noindexed
preview.

## 1. Push to GitHub

```bash
git add -A
git commit -m "Initial site"
git remote add origin https://github.com/<org>/westcoast-warehouse.git
git push -u origin main
```

Before the first push: the working tree is clean, only `.env.example` is tracked (no real
`.env*`), and no file is over 50 MB.

## 2. Import into Vercel

Vercel → Add New → Project → import the repo. Next.js is detected automatically. Add these
environment variables (Production and Preview):

| Variable                                              | Value                                                                                      |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                                | `https://westcoastwarehouse.com`                                                           |
| `RESEND_API_KEY`                                      | from resend.com                                                                            |
| `INQUIRY_FROM_EMAIL`                                  | `Westcoast Website <website@westcoastwarehouse.com>` (verified domain)                     |
| `INQUIRY_TO_EMAIL`                                    | `info@westcoastwarehouse.com` (comma-separate for several)                                 |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis, or install it from the Vercel Marketplace (`KV_REST_API_*` names also work) |

## 3. Domain, email, search

1. Vercel → Domains → add `westcoastwarehouse.com` and `www`, then update DNS at the registrar.
2. Resend → Domains → add `westcoastwarehouse.com` and create the SPF/DKIM records it shows.
3. Google Search Console → add the domain → submit `/sitemap.xml`.
4. Vercel → Analytics → enable Web Analytics.

The old WordPress URLs (`/index.php/logistics-*`) redirect permanently to the new pages.

## 4. Protect `main`

Require a pull request and the `check` CI job before merging, and block force pushes. Private
repositories need GitHub Pro or Team for this; otherwise rely on CI and Vercel rollbacks.

## 5. Roll back

Vercel → Deployments → pick an earlier deployment → Promote to Production.

## Environment behaviour

| Setting                     | Local (`next start`)         | Vercel preview               | Vercel production |
| --------------------------- | ---------------------------- | ---------------------------- | ----------------- |
| `robots.txt`                | allow                        | disallow all                 | allow             |
| Analytics                   | off                          | off                          | on                |
| Form without email env vars | honest "not connected" error | honest "not connected" error | honest error      |
| Rate limit key              | fixed `local`                | visitor IP                   | visitor IP        |
| `upgrade-insecure-requests` | off                          | on                           | on                |

## Pre-launch checklist

- [ ] Photos generated and added (`docs/asset-prompts.md`); every alt text describes the real photo.
- [ ] High-resolution logo tile at `assets-src/logo-mark.png`, then `npm run icons`.
- [ ] Privacy and Terms replaced with counsel-approved copy (they are noindexed drafts).
- [ ] Environment variables set; a production test inquiry arrives in the inbox.
- [ ] `npm run check` is green locally and in CI.
- [ ] Lighthouse: Accessibility, Best Practices and SEO 100, Performance ≥ 90 desktop, CLS 0.
