# All That’s Next website

The ecosystem front door for All That’s Next: practical tools that help young people understand themselves, price their choices and start shaping what comes next.

## Current state

- Production: `https://allthatsnext.com`
- Framework: Next.js 15 with React 19 and Tailwind CSS 4
- Repository: `mitchbryant-git/mitch-bryant-project` (historical implementation name retained)
- Canonical knowledge: `C:\Users\mitch\Code\mitch-os\04 Products\All That's Next`
- Canonical console masters: `C:\Users\mitch\Code\mitch-brand-system\assets\console\masters`
- Canonical ATN logo master: `C:\Users\mitch\Code\mitch-brand-system\assets\brand\masters\all-thats-next-logo-system-master-v1.png`

The domain switch is complete. `mitchbryant.com` and `www.allthatsnext.com` redirect to the canonical apex domain. The repository and Vercel project remain unchanged. The current branch contains the All That’s Next in-code rebrand while preserving the Life Console, Dream Life Calculator and isolated baby-shower route.

## Routes

- `/`: Life Console brand hub and module library.
- `/dream-life-calculator`: live lifestyle costing utility. Its financial rules require a separate annual evidence audit.
- `/baby-shower`: isolated personal event route. Do not fold it into the brand design system.
- `/sitemap.xml` and `/robots.txt`: search crawler files.

## Product truth

- HELP Loan Calculator: live at `helploancalculator.com`.
- Dream Life Calculator: live as the purple Life Console cartridge.
- Tuesday Type: in development, not deployed or payment-tested.
- Big Game Playbook: early concept.
- The Clubhouse: concept.

Never perform a fake loading ritual for a product that cannot launch.

## Brand direction

- All That’s Next is the umbrella and site brand.
- Mitch Bryant remains the founder and human trust layer.
- Life Console / Future Optimism.
- Warm cream and ink foundation.
- Electric blue, electric mint, acid yellow and hot pink as role-based energy colours.
- Anybody for expressive headlines.
- Archivo Black for product names, labels and compact impact.
- Instrument Sans for body copy and interface text.
- IBM Plex Mono for equipment labels and system readouts.

Gold, gradients, glassmorphism and generic neon creator styling are excluded. Purple is reserved for the Dream Life Calculator module rather than the umbrella brand.

See [DESIGN-GUIDE.md](./DESIGN-GUIDE.md) for implementation rules.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```

The homepage should also be reviewed at compact mobile, large mobile, tablet and desktop widths with reduced motion enabled and disabled.

## Asset rule

Files under `public/assets/console` are web derivatives. Never edit them into new authority or overwrite the master images in `mitch-brand-system`.

The ATN website lockup is a transparent derivative under `public/assets/brand`. The favicon uses transparent corners. The Apple touch icon uses brand cream. No green chroma-key background is a production asset.

## Deployment

GitHub `main` is connected to Vercel. Do not change the Vercel project, repository or domain routing merely because the public brand changed.
