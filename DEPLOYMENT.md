# Deployment Guide - mitchbryant.com

## Prerequisites Checklist

- [ ] GitHub account created
- [ ] Vercel account created (sign up with GitHub at vercel.com)
- [ ] Domain registered (mitchbryant.com)
- [ ] Node.js installed locally (for testing)

## Step 1: Test Locally (Optional but Recommended)

1. Open terminal/command prompt
2. Navigate to project folder:
   ```bash
   cd mitchbryant-website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000 in your browser
6. Verify everything looks good

## Step 2: Push to GitHub

1. Create a new repository on GitHub
   - Go to github.com
   - Click "New repository"
   - Name it: `mitchbryant-website`
   - Set to Public or Private (your choice)
   - DON'T initialize with README (we already have one)
   - Click "Create repository"

2. Connect your local project to GitHub:
   ```bash
   cd mitchbryant-website
   git init
   git add .
   git commit -m "Initial commit: Personal brand website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/mitchbryant-website.git
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository:
   - You'll see a list of your repos
   - Find `mitchbryant-website`
   - Click "Import"

4. Configure project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave as default (`npm run build`)
   - **Output Directory**: `.next` (leave as default)
   - **Install Command**: Leave as default (`npm install`)

5. Click "Deploy"

6. Wait 2-3 minutes for deployment to complete

7. You'll get a URL like: `mitchbryant-website-xyz123.vercel.app`

8. Test this URL to make sure everything works

## Step 4: Connect Custom Domain (mitchbryant.com)

### In Vercel:

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add both domains:
   - `mitchbryant.com`
   - `www.mitchbryant.com`
4. Vercel will show you DNS configuration instructions

### In Your Domain Registrar (e.g., GoDaddy, Namecheap, etc.):

1. Log in to your domain registrar
2. Find DNS settings for mitchbryant.com
3. Add these DNS records:

   **For apex domain (mitchbryant.com):**
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `76.76.21.21`
   - TTL: Automatic or 3600

   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: Automatic or 3600

4. Save DNS changes

5. Wait 24-48 hours for DNS propagation (usually happens much faster, often within 1 hour)

### Verify Domain:

1. Back in Vercel, you should see "Valid Configuration" once DNS propagates
2. Visit https://www.mitchbryant.com
3. Done! 🎉

## Step 5: Enable HTTPS (Automatic)

Vercel automatically provisions SSL certificates. Once your domain is connected:
- HTTPS will be enabled automatically
- HTTP will redirect to HTTPS
- No action required on your part

## Step 6: Set Primary Domain

In Vercel project settings → Domains:
1. Click the three dots next to `www.mitchbryant.com`
2. Select "Set as Primary"
3. This ensures all traffic redirects to www version

OR if you prefer non-www:
1. Click three dots next to `mitchbryant.com`
2. Select "Set as Primary"

## Future Updates

Whenever you make changes to your website:

1. Edit files locally
2. Test with `npm run dev`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. Vercel automatically detects the push and redeploys
5. Changes live in 2-3 minutes

## Adding New Tools

1. Edit `/config/tools.js`
2. Add a new tool object to the array
3. Push to GitHub
4. Automatic deployment

## Troubleshooting

### "npm install" fails
- Make sure you have Node.js 18+ installed
- Try deleting `node_modules` and `package-lock.json`
- Run `npm install` again

### Build fails in Vercel
- Check build logs in Vercel dashboard
- Usually it's a typo in a component file
- Fix locally, test with `npm run dev`, then push

### Domain not working
- DNS changes can take up to 48 hours
- Use https://dnschecker.org to verify DNS propagation
- Make sure you added BOTH A record and CNAME record

### Website looks broken
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Try incognito/private browsing mode
- Check browser console for errors (F12 → Console tab)

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Email: hello@mitchbryant.com
