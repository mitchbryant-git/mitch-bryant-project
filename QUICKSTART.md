# All That’s Next quick start

## Local setup

```text
cd C:\Users\mitch\Code\mitch-bryant-project
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Main files

- `app/page.jsx`: homepage content and structure.
- `app/globals.css`: homepage design system and responsive layout.
- `components/homepage/ModuleBay.jsx`: cartridge selection and loading interaction.
- `config/modules.js`: module status, copy and launch URLs.
- `app/layout.tsx`: site metadata, icons and structured data.
- `app/manifest.ts`: web-app name, colours and icons.
- `public/assets/brand`: transparent ATN website assets.

## Verification

```text
npm run lint
npm run build
```

Review mobile and desktop before publishing. The canonical public origin is `https://allthatsnext.com`.

The repository and Vercel project retain their historical Mitch Bryant names. Do not migrate infrastructure for a routine content or design change.
