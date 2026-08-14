# All That’s Next repository instructions

Last updated: 2026-08-11

## Read before changing the site

Canonical product knowledge:

`C:\Users\mitch\Code\mitch-os\04 Products\All That's Next\README.md`

Also read:

- `README.md`
- `PROJECT-OVERVIEW.md`
- `DESIGN-GUIDE.md`
- `C:\Users\mitch\Code\mitch-os\01 Brand\Voice and Tone.md`
- `C:\Users\mitch\Code\mitch-os\01 Brand\Design System Specification.md`

## Brand contract

- All That’s Next is the umbrella and website brand.
- Mitch Bryant is the founder and human trust layer, not the site name.
- Canonical public origin: `https://allthatsnext.com`.
- The GitHub repository and Vercel project keep their historical names unless Mitch explicitly authorises infrastructure migration.
- MB-01 remains the locked console model for now. Do not rename it to ATN-01 without an explicit artwork and ecosystem decision.
- The browser favicon uses a brand cream background so the black ATN mark stays legible at tab size. Never ship chroma green.

## Product truth

- Dream Life Calculator and HECS Debt Calculator are live.
- Tuesday Type is paused after approved Phase 3 and is not deployed or payment-tested.
- Big Game Playbook is an early concept.
- The Clubhouse is a concept.
- Growth Lab has a functional V1 prototype and is a selectable orange cartridge labelled `In development`. It does not receive a launch action until Mitch approves a production release.

Do not create launch actions for products that are not live.

## Coding and copy rules

- Preserve existing route behaviour and calculator data contracts.
- Use Australian English.
- No em dashes or en dashes in user-facing copy.
- No fabricated proof, urgency, availability or product claims.
- Keep TypeScript strict where used.
- Preserve accessible live text even when similar words appear inside artwork.
- Honour reduced motion.
- Do not edit canonical logo or console masters in place.

## Verification

Run:

```text
npm run lint
npm run build
```

Then review the homepage and Dream Life Calculator at mobile and desktop widths. Check the canonical URL, Open Graph site name, favicon, manifest, sitemap and robots output.
