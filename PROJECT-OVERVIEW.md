# Project overview

## Purpose

`mitchbryant.com` is the front door to Mitch Bryant's Life Console ecosystem. It needs to explain who Mitch is, make the Life-First Method clear and help a visitor choose a useful next move.

## Homepage architecture

1. Navigation and brand lockup.
2. Empty MB-01 console hero with the locked question `School ends. Then what?`.
3. Honest module library with loaded-console previews.
4. Dream Life Calculator presented as a built-in utility until its cartridge role is decided.
5. Three-step Life-First Method explanation.
6. Mitch's personal story and promise.
7. Clear return to the module bay.

## Interaction model

The first version must work without sound or theatrical loading. Module selection changes the loaded-console state and explains availability. Only live products receive launch actions.

Later work can add insertion, slot illumination, boot animation and sound after explicit user interaction. Reduced-motion and mute treatments are mandatory.

## Current route boundaries

- The homepage receives the full Life Console front-door language.
- The Dream Life Calculator remains operational while its data and visual migration are handled separately.
- The baby-shower page remains isolated from the brand system.

## Source structure

```text
app/
  page.jsx
  layout.tsx
  globals.css
  dream-life-calculator/
  baby-shower/
components/
  homepage/
    ModuleBay.jsx
config/
  modules.js
public/
  assets/console/
```

## Delivery sequence

1. Static Life Console foundation.
2. Responsive review and visual polish.
3. Accessible module insertion and launch ritual.
4. Human photography, metadata and release hardening.
5. Dream Life Calculator evidence audit and redesign.

## Non-negotiables

- Preserve existing live routes.
- Use honest product states.
- Keep claims evidence-backed.
- Do not edit the locked console masters.
- Do not ship fake functionality for concept products.
- Keep mobile intentional and accessible.
