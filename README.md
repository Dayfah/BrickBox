# BrickBox (BBX)

Next.js 14 + Tailwind. BBX Token "coming soon", Stripe subscriptions, optional Printify API, Solana links, Supabase logo asset, legal pages.

## Setup
1. `npm install`
2. Copy `.env.example` → `.env.local` and fill with real values (do not commit).
3. `npm run dev`

## Deploy
- Push to GitHub → connect on Vercel → set env vars in Vercel to match `.env.local`.

## Notes
- Stripe secrets stay server-side via route handlers.
- Printify API is optional; storefront link works without keys.
- Image domains are whitelisted for Supabase public bucket.
