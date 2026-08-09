# Life Console implementation guide

This file describes the production direction used by `mitchbryant.com`. Mitch OS remains the broader source of truth.

## Brand promise

Make the future feel exciting and buildable. The site should feel optimistic, useful and ownable without becoming gaming cosplay.

## Core tokens

```css
--cream: #e8d8d0;
--ink: #111411;
--blue: #0068d8;
--mint: #08d8b8;
--yellow: #f8d018;
--pink: #f84878;
```

Companion tints may support accessible text and larger reading surfaces. Never infer production tokens by sampling the console JPEGs.

## Colour jobs

- Cream: trust, reading and physical-console material.
- Ink and charcoal: structure, text, console screens and selected contrast moments.
- Mint: live, power, action, completion and money.
- Blue: discovery, navigation and explanation.
- Yellow: planning, prompts and important decisions.
- Pink: people, sharing and expressive emphasis.

One energy colour should lead a component. The other colours should support rather than compete.

## Typography

- Anybody: expressive sentence-case headlines.
- Archivo Black: short product names, commands and labels.
- Instrument Sans: body copy, navigation and controls.
- IBM Plex Mono: small system labels and readouts.

All caps is reserved for short equipment labels. It is not the default for sentences.

## Geometry

- Firm dark borders.
- Tactile offset shadows.
- Rounded physical-product corners.
- Recessed dark screens only where they communicate console or diagnostic function.
- Obvious focus states and large touch targets.

## Console rules

- The MB-01 is the ecosystem object.
- Products are cartridges.
- The front door is the primary home of cartridge selection and loading.
- Direct product visitors bypass the ritual.
- Essential copy and controls remain live HTML even when similar words appear inside artwork.
- Motion and sound enhance a usable static interaction. They never carry the interaction alone.

## Responsive rules

- Mobile is deliberately composed, not a squeezed desktop.
- The hero shows the console before the main headline on mobile.
- Module controls remain readable with status text visible.
- Tap, keyboard and pointer users receive the same choices.
- Reduced-motion preferences must remove non-essential transitions and loading theatre.

## Banned defaults

- Gold.
- Purple as a lead colour.
- Gradients and glow bloom.
- Glassmorphism as the environment.
- Generic vaporwave props.
- Pixel-font overload.
- Fake metrics, social proof or availability.
- Turning every page into a literal console shell.

## Canonical assets

Master images live outside this repository at:

`C:\Users\mitch\Code\mitch-brand-system\assets\console\masters`

This repository receives optimised derivatives under `public/assets/console`. Never overwrite the masters.
