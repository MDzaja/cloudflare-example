# 🚀 Quick Deploy to Cloudflare Workers

## TL;DR - 3 Steps to Deploy

```bash
# 1. Login to Cloudflare
npm run cf:login

# 2. Build the project
npm run build

# 3. Deploy!
npm run deploy
```

That's it! Your app will be live at `https://daytona-sdk-test-xxx.pages.dev`

---

## Detailed Steps

### Step 1: Authenticate with Cloudflare

```bash
npm run cf:login
```

This opens a browser window. Click "Allow" to authenticate Wrangler.

> **Note**: You need a Cloudflare account (free). Sign up at https://dash.cloudflare.com/sign-up

### Step 2: Build the Project

```bash
npm run build
```

This creates an optimized production build with the Cloudflare adapter in `.svelte-kit/cloudflare/`.

### Step 3: Deploy

```bash
npm run deploy
```

First time deployment will ask you:
- **Project name**: Press Enter to use "daytona-sdk-test" or choose your own
- **Production branch**: Press Enter to use "production"

Output will look like:
```
✨ Compiled Worker successfully
✨ Uploading...
✨ Deployment complete! 
🌎 https://daytona-sdk-test-xxx.pages.dev
```

**Visit the URL to see your deployed app!**

---

## Adding Daytona API Credentials (Optional)

If you want to test actual API calls (not just build verification):

### Method 1: Using Wrangler Secrets (Recommended)

```bash
npx wrangler secret put DAYTONA_API_KEY --project-name daytona-sdk-test
# Paste your API key when prompted
```

### Method 2: Via Cloudflare Dashboard

1. Go to https://dash.cloudflare.com
2. Workers & Pages → daytona-sdk-test
3. Settings → Environment Variables
4. Add:
   - `DAYTONA_API_KEY`: your-api-key
   - `DAYTONA_API_URL`: https://api.daytona.io (optional)
   - `DAYTONA_TARGET`: us (optional)

---

## Useful Commands

```bash
# Deploy
npm run deploy              # Deploy to preview
npm run deploy:prod        # Deploy to production

# Authentication
npm run cf:login           # Login to Cloudflare

# Monitoring
npm run cf:tail            # View live logs

# Local development
npm run dev                # Run locally (localhost:5173)
npm run build              # Build for production
```

---

## What Gets Deployed?

- ✅ Interactive web UI with test buttons
- ✅ `/api/test` - Basic SDK import test
- ✅ `/api/exec-test` - Full SDK execution test
- ✅ Optimized for Cloudflare Workers edge runtime
- ✅ All static assets (CSS, JS)

---

## Verify Deployment

1. **Visit your deployment URL**
2. **Click "🔧 Basic Import Test"**
   - Should return success showing SDK imported correctly
3. **Click "🚀 Full Exec Test"** (if you added API credentials)
   - Should create a sandbox and execute commands

---

## Troubleshooting

### "Not logged in"
```bash
npm run cf:login
```

### "Build output not found"
```bash
npm run build
```

### "Deployment failed"
Check you have:
- ✅ Cloudflare account
- ✅ Authenticated with `npm run cf:login`
- ✅ Run `npm run build` first

### View Deployment Logs
```bash
npm run cf:tail
```

---

## Cost

**FREE!** Cloudflare Pages includes:
- ✅ Unlimited requests
- ✅ Unlimited bandwidth  
- ✅ 500 builds/month
- ✅ Global CDN

---

## Next Steps After Deployment

1. ✅ Share the URL with Ivan to show it works!
2. ✅ Test both scenarios (basic import & full exec)
3. ✅ Monitor logs if needed: `npm run cf:tail`
4. ✅ Add to README or documentation

---

## Need More Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed documentation.
