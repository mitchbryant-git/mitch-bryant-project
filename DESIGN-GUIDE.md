# Design System & Common Updates Guide

## Brand Colors

Located in: `app/globals.css` and used throughout components

```css
Primary Blue:   #0081CB  (links, highlights)
Coach Violet:   #6A3CFF  (accents, secondary elements)
Mint Accent:    #62FFDA  (primary actions, success states)
Dark Base:      #0D0D0D  (background)
Soft Silver:    #CFCFCF  (body text)
Negative Red:   #FF3366  (errors, warnings)
Off White:      #FAFAFA  (headings, emphasis)
```

### Blue/Mint Gradient Blend
The signature gradient (seen in buttons, hero section):
```css
background: linear-gradient(145deg, #62FFDA, #0081CB);
```

## Typography

**Headers & Bold Text:**
- Font: Montserrat
- Weights: 400, 700, 900
- Usage: Section titles, button text, nav items
- CSS: `font-['Montserrat']`

**Body Text:**
- Font: Lato
- Weights: 400, 700
- Usage: Paragraphs, descriptions, subtitles
- CSS: `font-['Lato']`

## Visual Effects

### Glassmorphism
Used for all card components:
```css
.glass-dark {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(0, 0, 0, 0.5) inset;
  backdrop-filter: blur(22px);
}
```

### Animated Background Blobs
Located in: `app/page.jsx`
- Violet blob (top left) - pulses slowly
- Blue blob (bottom right) - static
- Mint blob (center) - static
- Noise texture overlay

### Shimmer Effect
For "Currently Building" tool cards:
```css
.shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(98, 255, 218, 0.08) 20%,
    rgba(0, 129, 203, 0.08) 40%,
    rgba(255, 255, 255, 0.02) 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 3s infinite linear;
}
```

### Buffering Indicator
Three animated dots for "building" status:
```css
.buffering-dot {
  animation: buffering 1.4s infinite ease-in-out;
}
```

## Common Updates

### 1. Adding a New Tool

**File:** `/config/tools.js`

Add a new object to the array:

```javascript
{
  id: 'unique-id',              // Lowercase, hyphens (e.g., 'budget-planner')
  name: 'Tool Display Name',    // What users see
  status: 'live',               // 'live', 'building', or 'requested'
  description: 'Short pitch',   // 1-2 sentences max
  url: 'https://url.com',       // null if not live yet
  icon: 'IconName',             // Lucide icon (see list below)
}
```

**Available Lucide Icons:**
- Calculator
- Gamepad2
- Users
- MessageSquare
- Sparkles
- Wallet
- TrendingUp
- Calendar
- BarChart
- Book
- Target
- Zap
- Star
- Heart

Full list: https://lucide.dev/icons

### 2. Updating Social Links

**File:** `/components/SocialLinks.jsx`

Edit the `socials` array (around line 30):

```javascript
{
  name: 'Platform Name',
  handle: '@yourhandle',
  url: 'https://full-url.com',
  icon: InstagramIcon,          // or TikTokIcon
  color: 'from-[#6A3CFF] to-[#0081CB]',  // gradient colors
}
```

To add a new platform:
1. Find an SVG icon for the platform
2. Create an icon component similar to TikTokIcon or InstagramIcon
3. Add to socials array

### 3. Editing Hero Tagline

**File:** `/components/Hero.jsx`

Line ~24:
```jsx
<h1 className="...">
  Building tools and frameworks I wish I had at 16-19
</h1>
```

Line ~28:
```jsx
<p className="...">
  Nobody teaches you this stuff. I'm building the tools...
</p>
```

### 4. Updating About Section

**File:** `/components/About.jsx`

Edit paragraphs starting around line 17. Keep the tone:
- Direct address to teens ("you")
- Personal story elements
- No corporate speak
- Conversational but grounded

### 5. Changing Email Address

**Files to update:**
- `/components/Footer.jsx` (line 12)
- `README.md` (bottom contact section)
- `DEPLOYMENT.md` (troubleshooting section)

### 6. SEO Updates

**File:** `/app/layout.tsx`

Update these sections:
```typescript
title: "Your new title",
description: "Your new description",
keywords: ['keyword1', 'keyword2', ...],
```

### 7. Google Analytics (Future)

When ready to add analytics:

1. Get GA4 measurement ID from Google Analytics
2. In `/app/layout.tsx`, uncomment the GoogleAnalytics component (currently not in use)
3. Add your GA ID:
   ```jsx
   <GoogleAnalytics gaId="G-XXXXXXXXXX" />
   ```

## Component Structure

### Page Layout
```
<Nav />                    Sticky header with scroll detection
  <Hero />                 Gradient hero with mission statement
  <About />                Why section in glassmorphism card
  <ToolsGrid />            2-column grid of tool cards
    <ToolCard />           Individual tool with status
  <SocialLinks />          TikTok/Instagram cards
<Footer />                 Copyright and email
```

### Tool Card States

**Live Tool:**
- Full color
- Clickable
- Glow on hover
- "Launch Tool" CTA
- Opens in new tab

**Currently Building:**
- Muted colors
- Shimmer effect
- Buffering dots
- Not clickable
- "Be the first to know" message

**You Decide (Requested):**
- Purple accent
- Clickable (links to TikTok DMs)
- "Send Message" CTA
- Encourages user input

## Responsive Design

Mobile breakpoints:
- Default: Mobile-first (< 768px)
- `md:` - Tablets (768px+)
- `lg:` - Desktop (1024px+)

All sections stack vertically on mobile, side-by-side on desktop.

## File Organization

```
/app                    Next.js app directory
  page.jsx             Main homepage
  layout.tsx           Metadata, fonts, structure
  globals.css          All custom CSS

/components             Reusable UI components
  Nav.jsx              Navigation header
  Hero.jsx             Hero section
  About.jsx            About section
  ToolsGrid.jsx        Tools container
  ToolCard.jsx         Individual tool card
  SocialLinks.jsx      Social media section
  Card.jsx             Glassmorphism wrapper
  Footer.jsx           Footer

/config                 Configuration files
  tools.js             All tool data (easy to update)

/public                 Static assets
  favicon.ico          Browser tab icon
  apple-touch-icon.png App icon
```

## Development Workflow

1. Make changes locally
2. Test with `npm run dev`
3. Check mobile view (Chrome DevTools → Toggle device toolbar)
4. Commit changes: `git add . && git commit -m "Description"`
5. Push: `git push`
6. Vercel auto-deploys (2-3 minutes)

## Best Practices

**DO:**
- Keep tool descriptions short (1-2 sentences)
- Use direct language (talk to teens, not about them)
- Maintain consistent spacing (use Card component)
- Test on mobile first
- Use semantic HTML (h1, h2, nav, section)

**DON'T:**
- Don't use corporate buzzwords
- Don't make the About section too long
- Don't add tools that aren't actually useful
- Don't change color scheme (it's part of your brand)
- Don't skip testing on mobile

## Performance Tips

- Images should be optimized (WebP format, < 200KB)
- Keep components simple
- Avoid unnecessary animations
- Use Next.js Image component for photos
- Minimize JavaScript in client components

## Accessibility

- All interactive elements have hover states
- Color contrast meets WCAG standards
- Semantic HTML used throughout
- Links open in new tabs have rel="noopener noreferrer"
- Alt text on images (when added)

## Questions?

Refer to:
- README.md - Full project overview
- DEPLOYMENT.md - Deployment guide
- This file - Design system & updates
