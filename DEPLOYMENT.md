# All That’s Next deployment

Last updated: 2026-08-11

## Current production setup

- Canonical site: `https://allthatsnext.com`
- `https://www.allthatsnext.com` redirects to the apex domain.
- Mitch Bryant domains redirect to the apex domain.
- GitHub repository: `mitchbryant-git/mitch-bryant-project`
- Production branch: `main`
- Hosting: the existing Vercel project connected to GitHub `main`

The public rebrand does not require a repository move, Vercel project rename or new deployment pipeline.

## Before publishing

```text
npm run lint
npm run build
```

Then verify:

- Homepage at desktop and mobile widths.
- Dream Life Calculator still loads and saves correctly.
- Page title and canonical URL use All That’s Next and `https://allthatsnext.com`.
- Open Graph metadata uses the new site name.
- `/favicon.ico`, `/apple-touch-icon.png`, `/manifest.webmanifest`, `/robots.txt` and `/sitemap.xml` load.
- No production logo contains chroma green.
- Product status labels remain honest.

## Publishing

Commit the reviewed changes and push `main`. The existing Vercel integration will deploy from GitHub.

Do not change domain assignments, redirects or DNS unless Mitch explicitly asks. Those are already working.

## Post-deploy checks

- Confirm `https://allthatsnext.com` renders the new identity.
- Confirm `https://www.allthatsnext.com` redirects to the apex origin.
- Confirm `https://mitchbryant.com` redirects to the apex origin.
- Confirm the Dream Life Calculator route and the external HELP launch.
- Inspect the browser tab icon and a social link preview.

The footer temporarily retains `hello@mitchbryant.com` as Mitch’s contact address. Replace it only after an All That’s Next mailbox or forwarding address is confirmed.
