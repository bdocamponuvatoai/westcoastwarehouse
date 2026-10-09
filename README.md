# Westcoast Warehousing & Trucking — website

Marketing site for [westcoastwarehouse.com](https://westcoastwarehouse.com). Next.js 16 (App
Router, Turbopack), React 19, Tailwind CSS 4, TypeScript strict. Every route is static.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: only needed to send real form emails
npm run dev                  # http://localhost:3000
```

Node 20.9+ (24 recommended).

## Scripts

| Script                         | What it does                                                   |
| ------------------------------ | -------------------------------------------------------------- |
| `npm run dev`                  | Dev server                                                     |
| `npm run build`                | Production build                                               |
| `npm run check`                | Format, lint, typecheck, unit tests, build, e2e (what CI runs) |
| `npm run test:unit`            | Inquiry service tests (offline, fake gateway)                  |
| `npm run test:e2e`             | Playwright: Chromium, Firefox, WebKit, Pixel 7, iPhone 14      |
| `npm run media -- photo <key>` | Prepare a photo (see `docs/asset-prompts.md`)                  |
| `npm run icons`                | Rebuild favicons from `assets-src/logo-mark.png`               |

On Windows with Smart App Control, Playwright's bundled Chromium may be blocked. Run
`$env:PW_CHANNEL='msedge'; npm run test:e2e` to use the installed Edge instead.

## Editing content

All copy lives in `content/`. Components never contain words.

| File                   | Holds                                                               |
| ---------------------- | ------------------------------------------------------------------- |
| `content/site.ts`      | Name, contact details, navigation, CTAs, every section's copy       |
| `content/offerings.ts` | Warehousing, Trucking, E-commerce: copy, capabilities, technologies |
| `content/process.ts`   | The four process steps                                              |
| `content/faq.ts`       | FAQ (also feeds FAQPage JSON-LD and `/llms.txt`)                    |
| `content/assets.ts`    | Photo registry: file, size, alt text and blur placeholder per photo |
| `content/legal.ts`     | Draft privacy and terms                                             |

Copy comes from the previous westcoastwarehouse.com pages. Adding a capability to
`content/offerings.ts` requires an icon in `components/CapabilityIcon.tsx`; the build fails
otherwise.

## Design system

- Tokens in `app/globals.css`: brand blue `#006199` for dark sections, warm off-white, one accent (the logo's gold,
  `#F6B73C`). Themes: `:root` light, `.theme-dark`, `.theme-block` (one solid gold section per page).
- Type: Barlow Condensed (display, matches the logo wordmark) and Barlow (body).
- Sections alternate dark/light. No glows, gradients behind text or decorative underlines.

## Motion (CSS only)

Everything renders in its final state first. Motion is added only under
`prefers-reduced-motion: no-preference`, and scroll effects only where `animation-timeline` is
supported (Firefox shows the finished static design). Text is moved or clipped, never faded.

| Effect                                          | Where                                   |
| ----------------------------------------------- | --------------------------------------- |
| Opening intro                                   | Once per session, ~2 s                  |
| Hero line rise and drift, slow photo settle     | Home hero                               |
| Photo settle (editorial) / photo reveal (split) | Inner-page heroes                       |
| Van drives in once, then parks                  | Footer (scroll-linked, never loops)     |
| Panels widen, photo wipe                        | Home "What we do"                       |
| Cards drift apart                               | Gold "honest pitch" block (desktop)     |
| Pinned stacking cards                           | Process                                 |
| Icon draw-on, accent wipes, photo unveil        | Throughout                              |
| Page transitions                                | `app/template.tsx` (`<ViewTransition>`) |

## Page heroes

`components/sections/PageIntro.tsx` has two layouts:

- `variant="editorial"` (About, Services, Process): large type, a numbered list of facts on hairlines, and one full-bleed photo strip with a caption line. `focus` sets the photo's focal point.
- `variant="split"` (the three service pages): text on the left, the photo bleeding to the right edge, and a floating location card.

## Responsive and browser support

- Mobile first: base styles are the phone layout; `sm` (40rem), `md` (48rem) and `lg` (64rem) add columns. Tap targets are at least 44px, inputs use 16px text so iOS does not zoom, and safe-area insets are respected.
- Hover effects only apply to real mouse pointers (`@media (hover: hover) and (pointer: fine)`), so nothing sticks after a tap.
- Supported browsers are Next.js 16's defaults: Chrome/Edge 111+, Firefox 111+, Safari 16.4+ (iOS 16.4+).
- Newer CSS is progressive enhancement: scroll-driven animations sit behind `@supports (animation-timeline: view())`, smooth accordions use `interpolate-size` where available, and view transitions are skipped where unsupported. Everything renders in its final state without them, so Firefox and older Safari show the finished design.
- The e2e suite checks every page for sideways scrolling at 320, 375, 768, 1024, 1280 and 1920px.

## Form

`/rate-estimate` (and the band on most pages): three steps with JS, one long form without it.
`lib/inquiry-service.ts` runs honeypot → validation (zod, shared with the client) → configured?
→ rate limit (5/hour/IP, Upstash) → send (Resend). It reports success only when Resend returns
a message id. Every failure is explicit and keeps the visitor's input.

## SEO

Per-page metadata and canonical URLs, generated share image, JSON-LD (Organization +
LocalBusiness, WebSite, WebPage types, Service, BreadcrumbList, FAQPage, HowTo), `sitemap.xml`,
`robots.txt` (AI crawlers welcome; previews blocked), `manifest.webmanifest`, `/llms.txt`.
Old WordPress URLs redirect permanently.

## Quality bar

Zero axe WCAG 2.2 AA violations, no horizontal scroll from 320 px, 44 px touch targets, works
without JavaScript, CLS 0. See `docs/DEPLOYMENT.md` for launch.
