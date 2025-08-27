# BrickBox MVP and Scale Stack

This document outlines the concrete tools and services to make BrickBox real.  It is split into two phases: **MVP** (ship fast, keep costs low) and **Scale** (grow and harden once traction hits).  The visual theme is derived from the base64 app icon at `assets/brickbox-icon.b64` (decode with `base64 -d assets/brickbox-icon.b64 > assets/brickbox-icon.png`), using a dark slate background `#111419`, brick red accents `#6A2A29`, and light ivory text `#F5E9D5`.

## MVP – ship in weeks

### Product & Ops
- **Roadmapping/Docs** – Notion for PRDs and roadmaps, Linear or Jira for tickets.
- **Design** – Figma for design system and clickable prototypes.
- **Asset pipeline** – Canva/Photopea for quick graphics, LottieFiles for micro‑animations.

### App Frontend
- **Mobile** – React Native via Expo for rapid iteration, OTA updates, push and camera access.
- **UI kit** – Tamagui or React Native Paper styled with the BrickBox palette.
- **Web** – Optional marketing and read‑only feed using Next.js on Vercel, linking to the [TikTok profile](https://www.tiktok.com/@dayfaa?_t=ZP-8zDjhuOz98p&_r=1).

### Backend & Data
- **Primary backend** – Supabase (Postgres, Auth, RLS, Storage, Realtime).
- **Search** – Meilisearch on Fly.io or Supabase `pgvector` for text search.
- **Vectors** – Pinecone for AI features.
- **Files/CDN** – Supabase Storage or Cloudinary for image transforms.
- **Serverless glue** – Cloudflare Workers for webhooks and scraping.

### Auth & Accounts
- Supabase Auth (email/OTP, social) or Clerk for a polished SSO flow.

### Payments & Monetization
- Stripe Billing for subscriptions and one‑off sales.
- RevenueCat for iOS/Android in‑app purchases.
- Stripe Connect (Standard) for the future marketplace.

### Social & Content
- **Short‑form video** – Mux for upload, thumbnailing, and HLS playback.
- **Live streaming** – Livepeer or Mux Live for RTMP ingest and playback.
- **Comments/Likes** – Native tables; rate‑limit with RLS or Cloudflare Turnstile.

### Comics Data & Release Calendar
- ComicVine and Grand Comics Database for metadata.
- PreviewsWorld, Lunar Distribution, and PRH Comics for release/FOC feeds.
- Seed an internal database and schedule nightly sync jobs to enrich records.

### Barcode Scanning & OCR
- Expo `BarcodeScanner` (or VisionCamera for advanced control).
- Google ML Kit via Firebase ML or VisionCamera‑MLKit plugin for OCR.

### Notifications & Messaging
- Expo Push (MVP) or OneSignal for segmentation.
- Stream Chat or Supabase Realtime for future DMs.

### Automation & Agents
- n8n for orchestration of release calendar ingestion, variant alerts, price tracking, and creator/team change detection.
- Telegram Bot API for admin commands and community alerts.
- AI services (Ollama or hosted LLM) for smart tagging, captions, and recommendations.

### Analytics, Quality & Observability
- PostHog for product analytics and session replay.
- Sentry for crash reporting across mobile and backend.
- Logtail or Supabase logs for centralized logging.

### DevEx, CI/CD & Security
- GitHub + GitHub Actions for lint, test, build, and EAS submit.
- Expo EAS for mobile build and release.
- Doppler or Supabase Vault for secrets.
- Cloudflare for DNS, TLS, and WAF.

### Support & Content
- In‑app help via Crisp (or Intercom later).
- Knowledge base powered by a public Notion site or HelpKit.
- Resend for emails; Twilio for future SMS alerts.

### Minimal Data Model
- `Series(id, title, publisher, universe, debut_year, status)`
- `Issue(id, series_id, number, title, release_date, variant_code, key_flags[], creators[])`
- `User(id, handle, email, role, avatar_url)`
- `Collection(user_id, issue_id, condition, grade, purchase_price, current_value)`
- `Wishlist(user_id, issue_id)`
- `MarketPrice(issue_id, source, price, captured_at)`
- `PullList(user_id, series_id, status)`
- `Alerts(user_id, type, payload, created_at, read_at)`
- `Media(id, owner_id, type, mux_asset_id|livepeer_id, poster_url)`
- `ActivityFeed(id, actor_id, verb, object_id, object_type, created_at)`

### n8n Automations
- **Release Sync (daily 6 am ET)** – Pull distributor feeds → transform → Supabase upsert.
- **FOC Deadline Alert (hourly)** – Query `PullList` for issues with `foc_date = now()+48h` → push notifications.
- **Variant Watcher (daily)** – Scrape retailer exclusives → diff → insert Variant rows → notify watchers.
- **Market Price Pull (daily/on‑demand)** – GoCollect/CovrPrice APIs → update `MarketPrice` → recompute collection values.
- **Smart Tagging (nightly)** – Model inference for missing `key_flags`.
- **Telegram Admin Bot** – Commands like `/refresh_release` or `/stats` trigger the above flows.

## Scale – when growth hits

### Data & Infrastructure
- Supabase Postgres with read replicas; consider TimescaleDB for event history.
- Algolia replaces Meilisearch for managed search.
- S3 + Parquet data lake with DuckDB/Athena for analytical queries.
- Kafka/Redpanda for price ticks and alert streams when needed.

### Performance & Features
- Statsig or LaunchDarkly for feature flags and A/B tests.
- Ably or LiveKit for realtime presence and watch‑along rooms.
- Hive/ActiveFence or tuned OpenAI moderation for content safety.

### Compliance & Trust
- Vanta or Drata for SOC2 readiness.
- Transcend or Ketch for privacy requests and consent management.

### Team Tooling
- BrowserStack/App Live for cross‑device QA.
- Style Dictionary to manage design tokens, automated via GitHub Actions.

## Where Everything Lives
- **Mobile app** – Expo/React Native (iOS App Store, Google Play via EAS).
- **Backend** – Supabase for Postgres/Auth/Storage/Realtime.
- **AI + Vector** – Pinecone plus Ollama or hosted LLMs behind n8n HTTP nodes.
- **Search** – Meilisearch → Algolia.
- **Video** – Mux (VOD + thumbnails) and Livepeer/Mux Live for streams.
- **Payments** – Stripe + RevenueCat.
- **Push** – Expo Push → OneSignal.
- **Analytics** – PostHog + Sentry.
- **Automation** – n8n (cloud) + Telegram Bot API.
- **Security** – Cloudflare (DNS/WAF), Doppler (secrets).
- **Docs/PM** – Notion + Linear.
- **Marketing site** – Next.js on Vercel with a link to the [TikTok profile](https://www.tiktok.com/@dayfaa?_t=ZP-8zDjhuOz98p&_r=1).
