# BBX Boost Portal
Verifies a Solana transaction that transfers >= MIN_BBX of the BBX mint to your treasury, then records the claim.

## Setup
1) Copy `.env.example` to `.env` and fill:
   - RPC_URL (can keep default)
   - MINT_ADDRESS (your BBX mainnet mint)
   - TREASURY_ADDRESS (your treasury wallet)
   - MIN_BBX (e.g., 25), DECIMALS=9
   - (optional) SUPABASE_URL or SUPABASE_PROJECT_URL plus SUPABASE_ANON_KEY and SUPABASE_SERVICE_KEY to log claims
2) Install & run:
   ```bash
   cd boost-portal
   npm i
   npm run dev
   ```

## Cloudflare Secrets
Store the following values using `wrangler secret put` before deploying:

- `RPC_URL`
- `MINT_ADDRESS`
- `TREASURY_ADDRESS`
- `SUPABASE_URL`
- `SUPABASE_PROJECT_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY`

Example:

```bash
wrangler secret put RPC_URL
wrangler secret put SUPABASE_ANON_KEY
```
