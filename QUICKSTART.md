# Quick Start Checklist

## Before You Deploy

### Assets Needed
- [ ] Copy your apple-touch-icon.png to `/public/` folder (180x180px PNG)
- [ ] Create og-image.png for social sharing (1200x630px)
- [ ] Verify favicon.ico is present in `/public/`

### Content Review
- [ ] Read through Hero tagline - does it sound like you?
- [ ] Review About section - update if needed
- [ ] Check all tool descriptions in `/config/tools.js`
- [ ] Verify social media handles are correct (@itsmitchbryant)
- [ ] Confirm email address (hello@mitchbryant.com)

### Test Locally (Recommended)
- [ ] Open terminal/command prompt
- [ ] Navigate to project: `cd mitchbryant-website`
- [ ] Install dependencies: `npm install`
- [ ] Run dev server: `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Check mobile view (Chrome DevTools, toggle device toolbar)
- [ ] Click all links to verify they work
- [ ] Test tool cards (especially "You Decide" TikTok link)

## Deploy to Production

### GitHub Setup
- [ ] Create GitHub account (if needed)
- [ ] Create new repository: `mitchbryant-website`
- [ ] Push code to GitHub (see DEPLOYMENT.md for commands)

### Vercel Deployment
- [ ] Sign up for Vercel (use GitHub to sign in)
- [ ] Import your GitHub repository
- [ ] Configure project (Next.js auto-detected)
- [ ] Click Deploy
- [ ] Wait 2-3 minutes
- [ ] Test the preview URL

### Domain Connection
- [ ] Go to Vercel → Settings → Domains
- [ ] Add mitchbryant.com
- [ ] Add www.mitchbryant.com
- [ ] Update DNS at your domain registrar:
  - A record: `@` → `76.76.21.21`
  - CNAME: `www` → `cname.vercel-dns.com`
- [ ] Wait for DNS propagation (usually < 1 hour, max 48 hours)
- [ ] Set primary domain (www or non-www)
- [ ] Verify HTTPS is enabled (automatic)

## Post-Launch

### Verification
- [ ] Visit https://www.mitchbryant.com
- [ ] Test on mobile device
- [ ] Check all tool links work
- [ ] Verify social links open correctly
- [ ] Test email link (hello@mitchbryant.com)
- [ ] Share on social media to test og-image

### Updates to Make Soon
- [ ] Add Google Analytics (when ready)
- [ ] Create og-image.png for social sharing
- [ ] Add apple-touch-icon.png (app icon for iOS)
- [ ] Consider adding a blog section (future)
- [ ] Plan waitlist for "Currently Building" tools

### Link Your Sites Together
- [ ] Verify HELP Loan Calculator links to mitchbryant.com ✓ (already done)
- [ ] When Big Game Playbook launches, add link back to main site
- [ ] Same for The Clubhouse

## Common First Updates

### 1. Adding Your First Live Tool (When Ready)
Edit `/config/tools.js`:
```javascript
{
  id: 'big-game-playbook',
  name: 'The Big Game Playbook',
  status: 'live',  // Changed from 'building'
  description: 'NBA 2K-style self-assessment and life planning system',
  url: 'https://biggame.mitchbryant.com',  // Add real URL
  icon: 'Gamepad2',
}
```

Push to GitHub → Auto-deploys

### 2. Updating Your About Section
Edit `/components/About.jsx`:
- Keep paragraphs short
- Speak directly to teens
- Share your story authentically
- No corporate language

### 3. Changing Hero Tagline
Edit `/components/Hero.jsx`:
- Line 24: Main headline
- Line 28: Supporting text

## Maintenance Routine

### Weekly
- [ ] Check if site is loading correctly
- [ ] Monitor Vercel for any build errors
- [ ] Review analytics (once set up)

### Monthly
- [ ] Update tool statuses as they progress
- [ ] Add new tools to `/config/tools.js`
- [ ] Refresh content if needed
- [ ] Check broken links

### Quarterly
- [ ] Review and update About section
- [ ] Refresh hero messaging if needed
- [ ] Consider new sections/features
- [ ] Review SEO performance

## Resources

📚 **Documentation:**
- README.md - Project overview
- DEPLOYMENT.md - Step-by-step deployment
- DESIGN-GUIDE.md - Design system & updates

🔗 **Important Links:**
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Repo: [your-repo-url]
- Domain Registrar: [your-registrar]

💬 **Support:**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Lucide Icons: https://lucide.dev

## Success Metrics

Track these over time:
- [ ] Number of visitors (add Google Analytics)
- [ ] Tool clicks (especially HELP Loan Calculator)
- [ ] Social media follows from site
- [ ] TikTok DM requests via "You Decide" card
- [ ] Mobile vs. desktop traffic
- [ ] Most popular sections (scroll depth)

## Next Big Features (Future)

Consider adding:
- [ ] Blog/resources section
- [ ] Email waitlist for new tools
- [ ] Testimonials section
- [ ] Video content integration
- [ ] Newsletter signup
- [ ] Member dashboard (for The Clubhouse)

---

**You're Ready to Launch! 🚀**

Follow the deployment steps in DEPLOYMENT.md and you'll be live in under an hour.

Questions? All the answers are in the docs, or reach out: hello@mitchbryant.com
