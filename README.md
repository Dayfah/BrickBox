# BrickBox

BrickBox — The Modern Vault for Comic Collectors.

This repository currently provides a Flutter demo showcasing the BrickBox dark theme, a feed post tile, and a post composer widget. Backend services such as Appwrite, Meilisearch, and Owncast can be wired in later.

## Run the Demo

```bash
cd app
flutter pub get
flutter run
```

## Assets
The app icon is stored as base64 text at `assets/brickbox-icon.b64`. Decode it if you need the original PNG:

```bash
python scripts/decode_icon.py
```

## Project Structure
```
app/        # Flutter application with demo screens
assets/     # base64 encoded icon and helper script
supabase/   # previous SQL migrations and edge functions (unused in demo)
workers/    # Cloudflare Worker scaffold
```

## Notes on Future Scaling
- Move user‑generated media to an S3/R2 bucket behind a CDN.
- Snapshot Meilisearch indexes and back up Appwrite volumes nightly.
- Introduce server functions for post creation to sanitize text and expand hashtags.
- Replace demo screens with real tabs: Feed | Library | Shorts | Streams | Profile.
