# ACDev Website

Marketing site for ACDev built with Next.js 16 (App Router), React 19, Tailwind CSS v4, MDX content, and a lightweight Decap CMS instance for editing copy.

## Requirements

- Node.js 20+
- npm 10+

## Installation

```bash
npm install
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server at <http://localhost:3000>. |
| `npm run lint` | Run ESLint with the Next.js config. |
| `npm run typecheck` | TypeScript `--noEmit` project check. |
| `npm run build` | Production build/smoke test. |
| `npm run test:visual` | Playwright-powered visual regression tests. |

## Content workflow

- Marketing pages and blog posts live in `content/pages` and `content/blog` (MD/MDX).
- Global marketing UI elements (hero highlights, solution cards, testimonials, etc.) live in `content/settings/site.json` and are editable via the CMS “Site Settings” panel.
- `/admin` hosts Decap CMS for non-technical editing. The area is Basic Auth protected via `CMS_BASIC_AUTH_USER`/`CMS_BASIC_AUTH_PASS` and publishes directly to the filesystem when run locally (`public/uploads` stores assets).
- Runtime MDX rendering is sanitized via `SafeMDX` to prevent untrusted HTML/JS injection.

## Contact pipeline

`/api/contact` now validates submissions (client + server), rate-limits by IP, writes entries to `data/contact-submissions.json`, and forwards them to optional destinations:

- Set `CONTACT_WEBHOOK_URL` (and `CONTACT_WEBHOOK_SECRET` if needed) to push JSON payloads to Slack/CRM/etc.
- Set `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, and (optionally) `CONTACT_EMAIL_FROM` to send email notifications via Resend.

The public form includes a honeypot field and local validation before posting.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (used for metadata + sitemap). |
| `NEXT_PUBLIC_GA_ID` | Optional Google Analytics measurement ID. |
| `RESEND_API_KEY` | API key for Resend email delivery. |
| `CONTACT_EMAIL_TO` | Recipient email for contact notifications. |
| `CONTACT_EMAIL_FROM` | Sender email. Defaults to `notifications@acdev.local`. |
| `CONTACT_WEBHOOK_URL` | Optional webhook endpoint for submissions. |
| `CONTACT_WEBHOOK_SECRET` | Optional bearer token sent with webhook requests. |
| `CONTACT_STORAGE_PATH` | Optional absolute path to store the contact log (defaults to `.data/contact-submissions.json` outside the repo root). |
| `CMS_BASIC_AUTH_USER` / `CMS_BASIC_AUTH_PASS` | Credentials required to access `/admin` (default `Admin` / `Password123`). |
| `AAPI` | User-provided API key for downstream integrations (kept local in `.env.local`). |

> Notifications (webhook/email) remain opt-in and must be configured by each deployment owner on their own system; without those env vars the contact endpoint simply stores submissions locally. Update the CMS credentials above in production to override the default `Admin` / `Password123`.

## Visual regression tests

1. Install browsers once per environment:
   ```bash
   npx playwright install --with-deps
   ```
2. Run the suite (spins up the Next dev server automatically):
   ```bash
   npm run test:visual
   ```
3. To accept intentional UI changes:
   ```bash
   npx playwright test --update-snapshots
   ```

Baseline images live under `tests/__screenshots__`. The config (`playwright.config.ts`) disables motion and captures full-page shots of the major routes in dark mode. Adjust the route list in `tests/visual.spec.ts` as pages are added.
