# BrickBox (BBX)

Next.js 14 + Tailwind. BBX Token "coming soon", Stripe subscriptions, optional Printify API, Solana links, Supabase logo asset, legal pages.

## Setup
1. `npm install`
2. Copy `.env.example` → `.env.local` and fill with real values (do not commit).
3. `npm run dev`

## Environment Variables
`npm run build` expects several environment variables. When deploying on Cloudflare Pages, set each of these in your project under **Settings → Environment Variables**:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY` (server-side only)
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_MONTHLY`
- `STRIPE_PRICE_YEARLY`
- `STRIPE_WEBHOOK_SECRET`
- `SITE_URL`
- `SOLANA_WALLET`
- `SOLANA_TOKEN`
- `MINT_ADDRESS`
- `BBX_MINT`
- `TOKEN_LINK`
- `BBX_ICON`
- `BBX_METADATA`
- `PRINTIFY_API_KEY`
- `PRINTIFY_SHOP_ID`
- `PRINTIFY_STOREFRONT`

## Deploy
- Push to GitHub → connect on Vercel → set env vars in Vercel to match `.env.local`.

## Notes
- Stripe secrets stay server-side via route handlers.
- Printify API is optional; storefront link works without keys.
- Image domains are whitelisted for Supabase public bucket.
