# Deploying to Cloudflare Workers

This guide will walk you through deploying the Daytona SDK test app to Cloudflare Workers.

## Prerequisites

1. **Cloudflare Account**: Sign up at https://dash.cloudflare.com/sign-up
2. **Node.js**: Already installed in this environment
3. **Wrangler CLI**: Cloudflare's deployment tool

## Step 1: Install Wrangler

```bash
npm install -g wrangler
# or locally in the project
npm install -D wrangler
```

## Step 2: Authenticate with Cloudflare

```bash
npx wrangler login
```

This will open a browser window to authenticate. Follow the prompts.

## Step 3: Configure Environment Variables (Optional)

If you want to test with actual Daytona API credentials, you can either:

### Option A: Add to `wrangler.toml`
```toml
[vars]
DAYTONA_API_KEY = "your-api-key"
DAYTONA_API_URL = "https://api.daytona.io"
DAYTONA_TARGET = "us"
```

### Option B: Use Cloudflare Dashboard
After deployment, go to your Workers dashboard and add environment variables under Settings → Variables.

### Option C: Use Wrangler Secrets (Recommended for API keys)
```bash
npx wrangler secret put DAYTONA_API_KEY
# Enter your API key when prompted
```

## Step 4: Build for Production

```bash
npm run build
```

This creates the optimized production build with the Cloudflare adapter.

## Step 5: Deploy

### Option 1: Deploy to Cloudflare Pages (Recommended)

```bash
npx wrangler pages deploy .svelte-kit/cloudflare
```

Follow the prompts to:
- Choose a project name
- Select your account
- Confirm deployment

### Option 2: Deploy using npm script

Add this to `package.json` scripts:
```json
"deploy": "npm run build && wrangler pages deploy .svelte-kit/cloudflare"
```

Then run:
```bash
npm run deploy
```

## Step 6: Access Your Deployment

After successful deployment, Wrangler will provide:
- **Production URL**: `https://your-project.pages.dev`
- **Dashboard URL**: Where you can manage settings

Example output:
```
✨ Success! Uploaded 1 files (2.5 sec)

✨ Deployment complete! Take a peek over at https://daytona-sdk-test.pages.dev
```

## Testing the Deployment

1. Visit your deployment URL
2. Click "🔧 Basic Import Test" to verify the SDK imports correctly
3. If you configured API credentials, click "🚀 Full Exec Test" to test actual API calls

## Troubleshooting

### Build Errors

If you get Node.js module errors during build:
```bash
# Clean and rebuild
rm -rf .svelte-kit node_modules
npm install
npm run build
```

### Deployment Errors

**Error: "No wrangler.toml found"**
- Make sure you're in the project directory
- Run deployment from `/workspaces/daytona/test-cloudflare-repro/`

**Error: "Not authenticated"**
```bash
npx wrangler login
```

**Error: "Build output not found"**
- Run `npm run build` first
- Check that `.svelte-kit/cloudflare` directory exists

### Runtime Errors

**API calls fail:**
- Check that environment variables are set correctly
- Verify API key is valid
- Check Cloudflare Workers logs: `npx wrangler pages deployment tail`

## Environment Variables After Deployment

To update environment variables after deployment:

1. Go to Cloudflare Dashboard
2. Navigate to Workers & Pages → Your Project
3. Settings → Environment Variables
4. Add/Edit variables
5. Redeploy for changes to take effect

Or use Wrangler:
```bash
npx wrangler secret put DAYTONA_API_KEY
```

## Monitoring & Logs

View real-time logs:
```bash
npx wrangler pages deployment tail
```

View deployment list:
```bash
npx wrangler pages deployments list
```

## Custom Domain (Optional)

1. Go to your Cloudflare Pages project
2. Custom domains → Set up a custom domain
3. Follow the DNS setup instructions

## Local Development vs Production

**Local (npm run dev):**
- Uses Vite dev server
- Hot module reloading
- Development mode
- Uses local environment variables

**Production (deployed):**
- Optimized build
- Runs on Cloudflare Workers
- Uses Cloudflare environment variables
- Edge deployment worldwide

## Cost

Cloudflare Pages free tier includes:
- Unlimited requests
- Unlimited bandwidth
- 500 builds per month
- 100,000 Workers requests per day

Perfect for testing and small projects!

## Next Steps

1. Deploy the test app
2. Verify both test scenarios work
3. Monitor for any edge cases
4. Share the deployment URL with the team
5. Use this as a reference for Cloudflare Workers compatibility

## Need Help?

- Cloudflare Workers Docs: https://developers.cloudflare.com/workers/
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- SvelteKit Cloudflare Adapter: https://kit.svelte.dev/docs/adapter-cloudflare
